// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/* Imports */
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./NFT.sol";

/* Errors */
error AUDIOALLEYMarketplace__ItemPriceIsLessThenZero();
error AUDIOALLEYMarketplace__ItemPriceNotMet();
error AUDIOALLEYMarketplace__YouAreNotOwnerOfThisItem();
error AUDIOALLEYMarketplace__YouAreTheOwnerOfThisItem();

contract AUDIOALLEY is ReentrancyGuard {
    /* State Variables */

    using Counters for Counters.Counter;
    Counters.Counter private s_nftIds;
    Counters.Counter private s_nftSold; // To count how many nfts are sold
    Counters.Counter private _itemsDeleted;

    address payable private owner;
    uint256 listingPrice = 0.025 ether; // This is the base price every seller has to pay for every listing.
    uint256 public subscriptionPrice = 0.03 ether;
    uint256 public constant subscriptionDuration = 30 days;

    /* Constructor */
    constructor() {
        owner = payable(msg.sender);
    }

    /* Structs */

    struct Item {
        uint itemId;
        address nftAddress;
        uint256 tokenId;
        address payable creator;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    struct Listing {
        uint256 price;
        address seller;
    }

    struct Offer {
        address payable buyer;
        uint256 price;
    }

    // Mapping to keep track of NFT offers
    mapping(uint256 => Offer[]) public nftOffers;
    mapping(uint256 => Item) private Items; // Main Mapping of all Items with tokenId
    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) public subscriptionExpiry; // mapping of user addresses to their subscription expiry timestamp

    /* Events */
    //Subscription
    event Subscription(
        address indexed subscriber,
        address indexed profileAddress
    );

    event SubscriptionRenewed(address indexed user, uint256 expiry);
    event SubscriptionExtended(address indexed user, uint256 expiryDate);

    event ItemList(
        uint indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        address creator,
        address owner,
        uint256 price,
        bool sold
    );

    event ItemBought(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event ProductUpdated(
        uint256 indexed itemId,
        uint256 indexed oldPrice,
        uint256 indexed newPrice
    );

    event MarketItemDeleted(uint256 itemId);

   
    event ListingCanceled(
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller
    );
    event ProductListed(uint256 indexed itemId);

    event ItemSold(
        uint256 indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price
    );

    event OfferReceived(
        uint256 itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        uint256 price
    );
    event OfferAccepted(
        uint indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price
    );

    event OfferDeclined(
        uint indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    modifier onlyProductOrMarketPlaceOwner(uint256 id) {
        if (Items[id].owner != address(0)) {
            require(Items[id].owner == msg.sender);
        } else {
            require(Items[id].seller == msg.sender || msg.sender == owner);
        }
        _;
    }

    modifier onlyProductSeller(uint256 id) {
        require(
            Items[id].owner == address(0) && Items[id].seller == msg.sender,
            "Only the product can do this operation"
        );
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyItemOwner(uint256 id) {
        require(
            Items[id].owner == msg.sender,
            "Only product owner can do this operation"
        );
        _;
    }

    /* Logics */
    function getSubscriptionPrice() external view returns (uint256) {
        return subscriptionPrice;
    }

    // Subscribe to user address
    function subscribe(address user) external payable {
        require(
            msg.value == subscriptionPrice,
            "AUDIOALLEYMarketplace__InvalidSubscriptionPrice"
        );
        subscriptionExpiry[user] = block.timestamp + subscriptionDuration;
        uint256 ownerCut = (subscriptionPrice * 5) / 100;
        payable(owner).transfer(ownerCut);
        emit SubscriptionRenewed(user, subscriptionExpiry[user]);
    }

    // Extend subscription for user
    function extendSubscription(address user) external payable {
        require(
            msg.value == subscriptionPrice,
            "AUDIOALLEYMarketplace__InvalidSubscriptionPrice"
        );
        require(
            subscriptionExpiry[user] > block.timestamp,
            "AUDIOALLEYMarketplace__SubscriptionExpired"
        );
        subscriptionExpiry[user] += subscriptionDuration;
        uint256 ownerCut = (subscriptionPrice * 5) / 100;
        payable(owner).transfer(ownerCut);
        emit SubscriptionExtended(user, subscriptionExpiry[user]);
    }

    // Check if subscription is active for user
    function isSubscriptionActive(address user) public view returns (bool) {
        if (subscriptionExpiry[user] > block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    // Get user's subscription expiry date
    function getSubscriptionExpiry(address user) public view returns (uint256) {
        return subscriptionExpiry[user];
    }

    function offerToBuyNFT(uint256 _itemId, uint256 price) external payable {
        require(price > 0, "Price cannot be zero");
        require(msg.value == price, "Price should match sent value");

        Item storage item = Items[_itemId];

        require(item.itemId == _itemId, "Item not found");
        require(!item.sold, "Item is already sold");

        nftOffers[_itemId].push(Offer(payable(msg.sender), price));

        emit OfferReceived(
            _itemId,
            item.nftAddress,
            item.tokenId,
            item.seller,
            msg.sender,
            price
        );
    }

    function declineOffer(uint256 itemId, uint256 offerIndex) public {
        require(offerIndex < nftOffers[itemId].length, "Invalid offer index");

        Item storage item = Items[itemId];
        Offer storage offer = nftOffers[itemId][offerIndex];

        require(msg.sender == item.owner, "You are not the owner of this item");

        nftOffers[itemId][offerIndex] = nftOffers[itemId][
            nftOffers[itemId].length - 1
        ];
        nftOffers[itemId].pop();

        emit OfferDeclined(
            itemId,
            item.nftAddress,
            item.tokenId,
            item.seller,
            offer.price
        );
    }

    function acceptOffer(
        uint256 itemId,
        uint256 offerIndex
    ) public nonReentrant {
        require(offerIndex < nftOffers[itemId].length, "Invalid offer index");

        Item storage item = Items[itemId];
        Offer storage offer = nftOffers[itemId][offerIndex];

        require(msg.sender == item.owner, "You are not the owner of this item");
        require(
            offer.price == item.price,
            "Offered price is not equal to item price"
        );

        item.owner = offer.buyer;
        item.seller.transfer(offer.price);
        item.sold = true;
        s_nftSold.increment();

        nftOffers[itemId][offerIndex] = nftOffers[itemId][
            nftOffers[itemId].length - 1
        ];
        nftOffers[itemId].pop();

        emit OfferAccepted(
            itemId,
            item.nftAddress,
            item.tokenId,
            item.seller,
            offer.buyer,
            offer.price
        );
    }

    function getListingPrice() external view returns (uint256) {
        return listingPrice;
    }

    // Get all Listed Items
    function getAllListedItems() external view returns (Item[] memory) {
        uint itemCount = s_nftIds.current();
        uint unSoldItemsCount = s_nftIds.current() - s_nftSold.current();
        uint currentIndex = 0;

        Item[] memory items = new Item[](unSoldItemsCount);
        for (uint i = 0; i < itemCount; i++) {
            if (Items[i + 1].owner == address(0)) {
                uint currentId = Items[i + 1].itemId;
                Item storage currentItem = Items[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // Get Items of the owner who have purchased the items;
    function getOwnerListedItems() external view returns (Item[] memory) {
        uint totalListedItems = s_nftIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint256 i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        Item[] memory items = new Item[](itemCount);
        for (uint i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].owner == msg.sender) {
                uint currentId = Items[i + 1].itemId;
                Item storage currentItem = Items[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // Get Items of the seller who have listed items;
    function getSellerListedItems() external view returns (Item[] memory) {
        uint totalListedItems = s_nftIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint256 i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        Item[] memory items = new Item[](itemCount);
        for (uint i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].seller == msg.sender) {
                uint currentId = Items[i + 1].itemId;
                Item storage currentItem = Items[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function getPerticularItem(
        uint256 _itemId
    ) external view returns (Item memory) {
        return Items[_itemId];
    }

    // List a item;
    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        if (_price < 0) {
            revert AUDIOALLEYMarketplace__ItemPriceIsLessThenZero();
        }

        s_nftIds.increment();
        uint newNftId = s_nftIds.current();

        Items[newNftId] = Item(
            newNftId,
            _nftAddress,
            _tokenId,
            payable(msg.sender),
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );

        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);

        emit ItemList(
            newNftId,
            _nftAddress,
            _tokenId,
            msg.sender,
            msg.sender,
            address(0),
            _price,
            false
        );
    }

    // Update Price
    function updateItemPrice(uint256 _itemId, uint256 _price) external {
        if (msg.sender != Items[_itemId].seller) {
            revert AUDIOALLEYMarketplace__YouAreNotOwnerOfThisItem();
        }

        if (_price <= 0) {
            revert AUDIOALLEYMarketplace__ItemPriceIsLessThenZero();
        }

        Items[_itemId].price = _price;
    }

    function updateMarketItemPrice(
        uint256 id,
        uint256 newPrice
    ) public payable onlyProductSeller(id) {
        Item storage item = Items[id];
        uint256 oldPrice = item.price;
        item.price = newPrice;

        emit ProductUpdated(id, oldPrice, newPrice);
    }

    // Buy Item
    function buyItem(
        address _nftAddress,
        uint256 _itemId
    ) external payable nonReentrant {
        uint256 price = Items[_itemId].price;
        uint256 tokenId = Items[_itemId].tokenId;
        address payable seller = Items[_itemId].seller;
        if (msg.value != price) {
            revert AUDIOALLEYMarketplace__ItemPriceNotMet();
        }

        // Check if buyer has an active subscription
        require(
            subscriptionExpiry[msg.sender] >= block.timestamp,
            "AUDIOALLEYMarketplace__SubscriptionRequired"
        );

        // Items[_itemId].seller.transfer(msg.value);
        seller.transfer(msg.value);
        IERC721(_nftAddress).transferFrom(address(this), msg.sender, tokenId);
        Items[_itemId].owner = payable(msg.sender);
        Items[_itemId].sold = true;
        s_nftSold.increment();

        emit ItemBought(
            _nftAddress,
            tokenId,
            address(0),
            msg.sender,
            price,
            true
        );
        payable(owner).transfer(listingPrice);
    }

    // Resell
    function resellItem(
        address nftAddress,
        uint256 itemId,
        uint256 newPrice
    ) public payable nonReentrant onlyItemOwner(itemId) {
        uint256 tokenId = Items[itemId].tokenId;
        require(newPrice > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        NFT tokenContract = NFT(nftAddress);

        tokenContract.transferToken(msg.sender, address(this), tokenId);

        address payable oldOwner = Items[itemId].owner;
        Items[itemId].owner = payable(address(0));
        Items[itemId].seller = oldOwner;
        Items[itemId].price = newPrice;
        Items[itemId].sold = false;
        s_nftSold.decrement();

        emit ProductListed(itemId);
    }

    function cancelListing(
        uint256 _itemId,
        uint256 _tokenId,
        address _nftAddress
    ) external payable {
        if (msg.sender != Items[_itemId].seller) {
            revert AUDIOALLEYMarketplace__YouAreNotOwnerOfThisItem();
        }

        if (msg.value != listingPrice) {
            revert AUDIOALLEYMarketplace__ItemPriceNotMet();
        }

        delete listings[_nftAddress][_tokenId];
        emit ListingCanceled(_nftAddress, _tokenId, msg.sender);
    }

    function withdraw() public onlyOwner nonReentrant {
        address _owner = owner;
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
