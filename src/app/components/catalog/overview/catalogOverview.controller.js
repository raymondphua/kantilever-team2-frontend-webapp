(function() {
  'use strict';

  angular
    .module('app.catalog')
    .controller("CatalogOverviewController",catalogOverviewController);

  /** @ngInject */

  function catalogOverviewController(CatalogService) {
    var vm = this;

    vm.init = function () {

      CatalogService.getAllProducts().$promise.then(function(response){
        vm.products = response;
        vm.setPriceSlider(response);
      });
      vm.categories = CatalogService.getAllCategories();
      vm.brands = CatalogService.getAllBrands();

      vm.itemsPerPage = 2;

      vm.setPage = function (pageNo) {
        vm.currentPage = pageNo;
      };

      vm.getProducts();
    };

    vm.setPriceSlider = function (data) {
      var maxPrice = 0;

      data.forEach(function (product) {
        if(product.price > maxPrice){
          maxPrice = product.price;
        }
      });

      var selectedValue = (vm.slider.value > maxPrice || !vm.slider.value)? maxPrice:vm.slider.value;

      vm.slider = {
        value: selectedValue,
        options: {
          floor: 0,
          ceil: maxPrice,
          step: 1
        }
      };
    };

    vm.getProducts = function(){
      var queryParams = {categories: "", brands: ""};

      if(vm.categoryFilters){
        Object.keys(vm.categoryFilters).forEach(function (key) {
          if(vm.categoryFilters[key] == true){
            queryParams.categories += "," + key;
          }
        });
      }

      if(!queryParams.categories){
        delete queryParams.categories;
      }

      if(vm.brandFilters) {
        Object.keys(vm.brandFilters).forEach(function (key) {
          if (vm.brandFilters[key] == true) {
            queryParams.brands += "," + key;
          }
        });
      }

      if(!queryParams.brands){
        delete queryParams.brands;
      }

      CatalogService.getAllProducts(queryParams).$promise.then(function (response) {
        vm.listItems = response;
        vm.totalItems = response.length;
        vm.currentPage = 1;
        vm.setPriceSlider(response);
      });
    };

    //Radiobuttons verschillende typen

    // vm.headTypes = {"all", "categories", "brands"];
    // vm.selectedHeadType = "all";
    // vm.changeSelectedHeadType();

    // vm.changeSelectedHeadType = function () {
    //   switch (vm.selectedHeadType){
    //     case "all":
    //       vm.listItems = vm.products;
    //       break;
    //     case "categories":
    //       vm.listItems = vm.categories;
    //       break;
    //     case "brands":
    //       vm.listItems = vm.products;
    //       break;
    //   }
    // };

  }
})();
