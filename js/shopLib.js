shopLib = (function() {
  const info = "hjälp funktioner till shoppen";
  const version = "0.1";

  let shopLib = {
    loadJsonByXhr: function(url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          callback(JSON.parse(this.responseText));
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    },

    loadJsonByFetch: function(url, callback) {
      fetch(url)
        .then(resp => resp.json())
        .then(json => callback(json))
        .catch(err => console.error(err));
    },

    getInventory: function() {
      const inventory = JSON.parse(localStorage.getItem("inventory"));
      return !inventory || Object.keys(inventory).length === 0 ? {} : inventory;
    },

    setInventory: function(inventory) {
      localStorage.setItem("inventory", JSON.stringify(inventory));
    },

    /*
    returns a json that follows the following structure:
    {
      "item id": item count
    } 
    */
    getShoppingCart: function() {
      const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      return !shoppingCart || Object.keys(shoppingCart).length === 0 ? {} : shoppingCart;
    },

    setShoppingCart: function(shoppingCart) {
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    },

    clearShoppingCart: function() {
      localStorage.setItem("shoppingCart", JSON.stringify({}));
    }
  };

  return shopLib;
})();