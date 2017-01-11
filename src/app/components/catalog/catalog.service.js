(function() {
  'use strict';

  angular
    .module('app.catalog')
    .service("CatalogService", catalogService);

  /** @ngInject */

  function catalogService(ResourceService, serviceBase, $http) {
    return {
      getAllProducts: getAllProducts,
      getOne: getOne,
      update: update,
      getProductByProductName: getProductByProductName,
      getCategoryByCategoryName: getCategoryByCategoryName
    };

    function getAllProducts() {
      return ResourceService("http://localhost:11130/catalog/product").query();
    }

    function getOne(number) {
      return ResourceService(serviceBase + 'products/' + number).get();
    }

    function getProductByProductName(productName) {
      return {
        name: "Sturmey Archer tandwiel 14 tands",
        image: "/assets/images/categories/aandrijving_en_versnelling/producten/Sturmey Archer tandwiel 14 tands.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget mi vitae justo ullamcorper molestie quis eu elit. Quisque ac diam pharetra, convallis risus et, ornare mi. Suspendisse a hendrerit ante, ut interdum massa. Morbi tempus elit sit amet tortor porta, vitae mollis eros varius. Pellentesque vulputate tristique arcu, non dapibus justo porttitor id. Duis mollis turpis interdum, consectetur mauris ac, cursus eros. Fusce id efficitur sapien. Cras fermentum laoreet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar nisl consequat, tristique dolor sit amet, dictum mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam rhoncus semper nunc ac sagittis.",
        price: 2.95
      };
    }

    function getCategoryByCategoryName(categoryName) {
      return {
        name:"Aandrijving en versnelling",
        image: "/assets/images/categories/aandrijving_en_versnelling/aandrijving_en_versnelling.jpg",
        canonicalName:"aandrijving-en-versnelling"
      };
    }

    function update(product) {
      return ResourceService(serviceBase + 'products/' + product.id).update(product);
    }
  }
})();
