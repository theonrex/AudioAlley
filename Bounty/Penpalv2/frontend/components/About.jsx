import React from "react";
import Theon from "../public/assets/theon.png"

function About() {
  return (
    <div className="forth-section ">


      <div className="create_and_sell container">
        <header>Create and sell your NFTs</header>

        <div className="rowx ">
          <div className="col30">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAEDElEQVR4nO2cPYgdVRTH/9ciC7pbBCVxo1Z2IRJFTUQwYGz8SLRRC+0Eg1oZKyv7WES0CVkIFpJVuyCLIChIrASFXT+ITRRlFcGIwTxNNl8/i/sWNjJ3Zu7NfXfee3N+zcLOnDtnfnv3zHlz541kGIZhGIZhGIYxpriuEwgBzEl6VNKTkrZLmpe0RdJA0qqkZUmfSDrhnDvXVZ4TC7AZOAT8Szv+Bt4ENned+8QAPA382VLw//kdeLzrcxhrAAe8AVxNlLzOZeCFDeNuBV4FPgJ+wf+XDIBTwMfAK8BtXZ57UYaSc3EVeB04Alxssf+l4b63du1hpODLxfXO5BycBR7r2sdIwF/46mryFeA4sA+YBzYNf+4H3h9uz8ll4KWuvWQH312EOA3c0xB/L/DjCGRPz8wG5gi3cKeBLS3H2Qr8lFn2WcaxZgMPAwv4q/lgY8Y1Mc8ETvIKDTO5Yqz7CJeRS8C7wP3AjcBNwC7gMHC+RvaR6zeTCeBO4LO6qVET+14gZDExlw8C4x2ridkB/FzzB9qWkktWgAeBM3WSG0R/FQjZn5jPU4Hxvm6I20F4Zr+ckks28DO5UXKD6N8CIfOJOW0LjPdHi9i3ArFLKblkg4Zy0VL0WiBkU2JOM4Hx1lrE7grEnkrJpYobYgOAvZL2Zjj2mcDvb0kc7+bI42wkJLS7j+f47qKK88BBxrEtmkSAHwKiD3ad21QBnAuItplcQ3SNljSbPYsekCI6xHMZxzICZWP9YvgaiX3wtBO9OAvh3nhK+UfSd5IWJR11zjX25VWY6DhWJO1zzq3GBproeFYk7Y6d2Tkvhn1hp6QDsUEmOo3oDstKRxoD59xcTICJTsQ5F+XOSkchTHQhTHQhTHQhTHQhTHQhTHQhTHQhTHQhTHQhTHQh+iz6gqS3Je2WX3CelfSApHckJa2i1NHXm0qrkp5wzn1TtRHYKWlJ0u2hAWJvKvVR9AX5FZJKyesMZX8paaZqu929a+Zok2RJcs6tSFrIddA+io550D3pofgq+lg65pxzgzY7ArOSKr9nbqUjL9n89FH09hHtW0sfRT8/on1r6WONXpNv71bqdgLulm/vKr/qYTW6mRlJS8M+uZKh5CUFJKfQxxm9zpp8n7wo/xCjJN0l/3DMATVItk+GhbDSMaaY6EKY6EKY6EKY6EKY6EKY6EKY6EKkiG51L9e4lhTRv2bPogekiP4iexY9IEX0h9mzmDyiX6McLdo596mkk7FxU8b3sQGpXceLkv5KjJ0GjscGJL8RHdgj6YSkvr0ge1l+heZiTFByH+2cOyn/3NrnqWNMIMvyX7qPkixlesc/8IikZyU9JOkOTddbagaSvpVfiVlIkWwYhmEYhmEYhmEYhjFt/AfpoAj0mT/zNwAAAABJRU5ErkJggg==" />

            <h1>Set up your wallet</h1>
            <p>
              Sign up for Penpal to become a member of the community. Once
              you've created an account, you'll be able to create your writer
              profile and start publishing your work.
            </p>
          </div>{" "}
          <div className="col30">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAC2UlEQVR4nO3dv04UQQDH8d8QqSC+ASU2FuKfqLyD3hm107fQAqOWnIUVUV/A2HtB30KtVSxFH0AoJCT3s7jVwHCXm9kb1t/d/j7dEnZ2M1+WZS8bBjAzMzMzM2tWqLMTyUUAXQC3AFwGsAJgqeB5zaJ9ALsAPgF4C2A7hHCYO0h2EJJdAM8BrObu2zLfADwMIWzn7LSQ+o0kF0g+A9CHY6RYBdAn2SOZPM9nMg6wCWAj+7TaLQB4BIAAHhcblWSX5IDH/Sa5RfIaybbfP0ByqZqLFyQPorkakLxZ6kCLJHeiA+ySvFDkAHOI5Fo1R0d9rf4YmnrwuyOuDMeYgOTFEVfKnRIDv4kG3Spwvq1A8mU0d69LDPolGvRqgXNtBZLXo7n7XGLQvWjQ5QLn2gokl6O5+zVpn4kPhiR5bIcQaj3dt1Xu/CU/sFgzHESMg4hxEDEOIsZBxDiImJyP3yXN23OSrxAxDiLGQcQ4iBgHEeMgYhxEjIOIcRAxDiLGQcQ4iBgHEeMgYhxEjIOIcRAxDiLGQcQ4iBgHEdPYWyfx2yGzdpym3mbxFSLGQcQ4iJjG7iGn9TvYby7aqXIQMQ4ixkHEOIgYBxHjIGIcRIyDiHEQMQ4ixkHEOIgYBxHjIGIcRIyDiHEQMQ4ixkHEOIiYmf9/WbP+lknMV4gYBxHjIGIcRIyDiHEQMQ4iJiXI3tENL+iSjuTZ6EsTF3RJCfIz2j6ffEYWz1U8lyekBPkYbd9LPh27H21/mHrEMcvmrU098JwjeWnEsnm3Sww8bmFJRxmjivEjmrMyC0tWB+jw5NKrBxwuM7ruG/2/FdnWSb4acWUMSN5IGSf5k1KSPQwX2rV8myGEJynfmPPx+98BN1BjHfaWIoAegKepO9RZ4L6D4QL353L3bZkdAA9CCO9zdqr1k17dnDoAugCuAFgB0Pb7yD6A7xg+JvQBvAshHP7fUzIzMzMzM5vsD6eYE9RlWi8SAAAAAElFTkSuQmCC" />

            <h1>Write and publish your content</h1>
            <p>
              Use our user-friendly interface to write your stories or articles
              and publish them on the Penpal platform. You can choose to make
              your work available for free, or set a price in Fantom for readers
              to purchase.
            </p>
          </div>{" "}
          <div className="col30">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAFiUlEQVR4nO2cXahVRRTHf0tvSUWaiRFFJCWJFjeKUKqHigp6qIik3goylF566VOpXsoCKzHJ1AeLoij6eooI0xR8yIJK8iMf+hAzLG/pxaxEu91/D/sYJvucvfeZOTN7nzs/uA8X1qz5z5q75u41s/dAIpFIJBKJRCKRSOQg6XxJr0v6WdIBSUeVz5CktyRdGFtz3yBpmqRf2gS8HUOSLoitvS+Q9EbF4B/j/dja+wJJ+7qcgBFJ02LrrzvjPNnkMR64r8u2Y4Yywd3o4H+epAkO7ROSLpI03OUyJEl3xR5D45E0U9IHko50MQGbY+uvM1a1gaTJwBEz+6v1+yLgGd/CGsx+YD2wyMx2FRlXnoATkTQV2AOktf7/7Admm9kPnYy6fcL5DzP7FXjX1U8fMgV4usjIOQMAJF0JfOrDV5/xm5lN7WTgnAEAZrYZ+NKHr7GGlwlo8aJHX/3CJ0UGXpYgAEnjgLXADb58NpxR4HIz+7qTkbcMMLNR4BZgMbCrJWAs81pR8MFjBoRC0h3AO7F1FHAYmGFme4oMff4P6DmSJgLLYusowXNlgg8NmwBgCXBubBEFDAHPlzVuzARImgMsiK2jBI+b2aGyxo34HyBpAPgCuDS2lgJ2AoNmNlK2QVMy4FHqH3yAB6oEHxqQAZKmA1uBU2JrKWCDmV1ftVETMmAV9Q/+KPBwNw0HJMmzmDKMkG3VbulkJOlumlFZv2pmX3XT0CJNwBIzW9jJQNIU4BvgrDCSuqZ00ZVHjCVoN/BUCbul1D/4UKHoyiNGBtxsZh92MpB0DdnbGHV/SBgCpld57j+R0BnwZongTwBWU//gQ8WiK4+QGXAAmGVm+zoZSVoMPBZGkhOVi648QmbAIyWCPwN4KJAeVyoXXXmEyoBNwLVm1rav1oHOJuDqAHpcWW9mN/pwNGBmdVlr59OM4I+SbY14oRbBl3Q22TP/5NhaSvCKmd3ry1ldJuBt4M7YOkrgVHTlEX0vSNJNNCP44Fh05RE1AySdCmwDmvA5k3PRlUfsDHiSZgQfPBRdeUTLAEmDZKdcJ8XSUAEvRVceUTJA0njgZZoRfIAHexF88H8ecAS4zMx2FtjdD1zhsd9essbMPuqVc9+V8BNmtriTgaTzgB3A6R777RWfA9eZ2eFedeBzCdoOPFvCbgXNCP4asu2TngUfYMCTn1FggZkd7WQkaS5wq6c+fXMI+J7sO4eVZrYjSK9dfHSXx4oS/UyU9FMJX972WRqBh+DvlXRGiX5eKuFrq6SmPBn5wcME3Faij9nKri7oxD+Srgox5lrhGPzCCzkkjZO0pYSvlSHGO+aQdHuJ4O+VNCm21r5E2QVORTRlN7R5SNpWEPyeVZkJQNLvBRMwO7bGmPR8N1TSLqCfLm46SHYXxEIz+87VWYjd0N0B+gjJJGAu8Jmkc1ydhZiA9wL0EYMpZO+vOhFiCZpMdpvKab3uKwLDZnami4OeZ4CZDdOMVw27wfkPOMiJmJktpz/vkljv6iDombCke8gmoh+Wo2Fgjpl96+Ik+KG8sp3TeWTvAs2iGYczx3MIWEf2GOoU/EQikUgkgiLpEknLJG2XdLD1s03SUkmzkr4eIWmCpJXKjh7bMSJpuSKcC9ddnxOtwW0o2JY+nrUhB1l3fc5IWlVhcMd4IenzgKRBdU7rdvwtaWa/6wuxFzS/y34GAG/fYnUgqr4QE+By24mXT0ELiKovxHnAH3S/+XbQzArfunMhtr7YnygVEeMqnSo46wsxAS5fFf7oTUV7ouoLMQHrHNp+7E1Fe+quz43Yj3lN1+cFSau7GGDIQqzW+pxRVupvrDC4dQq/FVFbfV5Qtc2uk5O+HqFszV0uaYekP1s/25VtAV+c9CUSiUQikUgkEol+519HW5uo1vzdHwAAAABJRU5ErkJggg==" />

            <h1>Sell And Get Paid</h1>
            <p>
              Each work that you publish on Penpal is represented as a unique
              NFT. This means that you can sell the ownership of your work to
              buyers, allowing you to profit from your writing. When someone
              purchases your work, the payment is transferred directly to your
              Fantom wallet. Penpal charges a small platform fee for each sale,
              but you keep the majority of the revenue generated by your
              content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
