(function() {
  'use strict';

  angular
    .module('app.catalog')
    .service("CatalogService", catalogService);

  /** @ngInject */

  function catalogService(ResourceService, serviceBase) {
    return {
      getAllProducts: getAllProducts,
      getAllCategories: getAllCategories,
      getAllBrands: getAllBrands
      getProductByProductName: getProductByProductName,
      getCategoryByCategoryName: getCategoryByCategoryName,
      getCategoryByCategoryName: getCategoryByCategoryName,
      getCategoryById: getCategoryById,
      getProductById: getProductById
    };

    function getAllProducts(queryParams) {
      return ResourceService(serviceBase + "catalog/products", queryParams).query();
    }

    function getAllCategories(queryParams) {
      return ResourceService(serviceBase + "catalog/categories", queryParams).query();
    }

    function getAllBrands(queryParams) {
      return ResourceService(serviceBase + "catalog/brands", queryParams).query();
    }

    function getCategoryById(categoryId) {
      return ResourceService(serviceBase + "catalog/categories/"+ categoryId).get();
    }

    function getProductById(productId) {
      return ResourceService(serviceBase + "catalog/products/"+ productId).get();
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
        "_id": "1",
        "name": "Aandrijving en versnelling",
        "cName": "aandrijving-en-versnelling",
        image: "/assets/images/categories/aandrijving_en_versnelling/aandrijving_en_versnelling.jpg"
      };
    }
  }
})();
