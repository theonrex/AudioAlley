import React from "react";
import Search from "../Search";
export default function SearchModal() {
  return (
    <div>
      <div>
        <div
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          className="flex flex-row items-center px-2 search_bar text-white focus:outline-none  font-medium rounded-lg text-sm px-1 py-2.5 text-center  dark:focus:ring-blue-800"
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACIElEQVR4nO2YzUocQRSFe2M2GTQJKAgukyiuAjog+BBq3sXRB1AUt4orY/QlXPgLgit3cZGoK8EsNeAEJYv4hUvOQAlO7Di3plupDxqapuucW11/93aWJRKJRKIogH5gCtgGvgI/ddn9FlCzd7KyAQwDO+TnABgtQ+AdwDJwq8AugE/AmEbjpS67HwdWgUu9a22WTKOo4N8AewrmGpgBOnO06wJm1cbYBV63J+q7X96Mje9ANftPgA/AmTT2gRdZu9C0Mc6BvhZ0+qRhLPpG2dy0qvlrU2DISe9GmkM+Uf7bsDF1Zhw156W55aXZzGgg2G26HHVfBbvTey/d+4ymZbISQfuztCe9tUMTO2GNsQjaE9Le9NYOTU5k8jaCth12xjdv7dCkLpNKBO2KtOve2qHJVcQOdEr7yls7NDmOtVMEO9ypt3ZoYimxMR5B+2M7FrHl88ZqBO11ade8te/bKWIeZINeus3MGoXLbIRUYsNL86Hq61YJ2LBjMvcbGPGJ8mHTpQjp9IJvlPkLmvNHFjTVIPhfrXyIR2FlYLAebArM2WLMuWDn1aYRvHEE9GTtRCOxGBT1l8oqJ3QwVXQN6Nka8EPv2pxf0DQ6KqwThlVSQaaah41wwVrQhXfCAN5ZPm+nqX5m1fVj61TPas32+dJ0ohWAbuCLOmEfoDd7apA6URJII1ESeCYj0RNssYfZU4S/nTi0H8FFx5JIJBLPmD99oxVpAJWr3gAAAABJRU5ErkJggg==" />

          <p className="nav_span">Search </p>
        </div>

        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed  top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center"
          suppressHydrationWarning={true}
        >
          <div className="relative  w-full h-full max-w-md md:h-auto">
            <div className="relative SearchModal bg-black rounded-lg shadow dark:bg-yellow-700">
              <button
                type="button"
                className="pop_up_modal_cancel absolute top-3 right-2.5 text-yellow-00 bg-transparent text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center pop_up_modaal">
                <h3 className="mb-5 text-lg font-normal ">
                  <Search />
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
