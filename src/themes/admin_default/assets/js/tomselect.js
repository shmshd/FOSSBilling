import TomSelect from 'tom-select';

globalThis.TomSelect = TomSelect;

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Locale Selector
   */
  const localeSelectorTemplate = (data, escape) => {
    if (data.customProperties) {
      return `<div><span class="dropdown-item-indicator">${data.customProperties}</span>${escape(data.text)}</div>`;
    }
    return `<div>${escape(data.text)}</div>`;
  }
  let localeSelectorEl = document.querySelector('.js-language-selector');
  if (localeSelectorEl !== null) {
    let localeSelector = new TomSelect(".js-language-selector", {
      copyClassesToDropdown: false,
      controlClass: "ts-control locale",
      dropdownClass: "dropdown-menu ts-dropdown",
      optionClass: "dropdown-item",
      controlInput: false,
      items: [bb.cookieRead("BBLANG")],
      render: {
        item: (data, escape) => {
          return localeSelectorTemplate(data, escape);
        },
        option: (data, escape) => {
          return localeSelectorTemplate(data, escape);
        },
      },
    });
    localeSelector.on("change", (value) => {
      bb.cookieCreate("BBLANG", value, 7);
      bb.reload();
    });
  }


  /**
   * Autocomplete selector
   */
  const autocompleteTemplate = (item, escape) => {
    return `<div class="py-2 d-flex">
                <span>${escape(item.label)}</span>
                <small class="text-muted ms-1">#${escape(item.value)}</span>
             </div>`;
  }
  let autocompleteSelectorEl = document.querySelector('.autocomplete-selector');
  if (autocompleteSelectorEl !== null) {
    new TomSelect(".autocomplete-selector", {
      copyClassesToDropdown: false,
      dropdownClass: "dropdown-menu ts-dropdown",
      optionClass: "dropdown-item",
      valueField: "value",
      labelField: "label",
      searchField: ["label", "value"],
      load: (query, callback) => {
        let items;
        let restUrl = new URL(
          bb.restUrl(autocompleteSelectorEl.dataset.resturl)
        );
        restUrl.searchParams.append("search", query);
        restUrl.searchParams.append(
          "CSRFToken",
          autocompleteSelectorEl.dataset.csrf
        );
        restUrl.searchParams.append("per_page", 5);
        fetch(restUrl)
          .then((response) => response.json())
          .then((json) => {
            items = Object.entries(json.result).map(([key, value]) => {
              return { label: value, value: key };
            });
            callback(items);
          });
      },
      render: {
        option: function (item, escape) {
          return autocompleteTemplate(item, escape);
        },
        item: function (item, escape) {
          return `<span>${escape(item.label)}</span>`;
        },
      },
    });
  }

});
