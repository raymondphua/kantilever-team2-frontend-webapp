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

      vm.itemsPerPage = 3;
      vm.maxPrice = null;

      vm.setPage = function (pageNo) {
        vm.currentPage = pageNo;
      };

      vm.getProducts();
    };

    vm.setPriceSlider = function (data) {
      if(vm.maxPrice == null){
        data.forEach(function (product) {
          if(product.price > vm.maxPrice){
            vm.maxPrice = product.price;
          }
        });

        vm.slider = {
          value: Math.ceil(vm.maxPrice),
          options: {
            floor: 0,
            ceil: Math.ceil(vm.maxPrice),
            onEnd: vm.getProducts,
            translate: function (value) {
              return '€' + value ;
            }
          }
        };
      }
      else{
        vm.slider.value = Math.ceil((vm.slider.value > vm.maxPrice || !vm.slider.value)? vm.maxPrice:vm.slider.value);
      }
    };

    vm.getProducts = function(){

      var queryParams = getFilterParams();

      CatalogService.getAllProducts(queryParams).$promise.then(function (response) {
        vm.listItems = response;
        vm.totalItems = response.length;
        vm.currentPage = 1;
        vm.setPriceSlider(response);
      });
    };

    var getFilterParams = function () {
      var queryParams = {categories: "", brands: "", price : null, name: ""};

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

      if(vm.slider && vm.slider.value){
        queryParams.price = Math.ceil(vm.slider.value);
      }
      else{
        delete queryParams.price;
      }

      if(vm.selectedFilterName){
        queryParams.name = vm.selectedFilterName;
      }
      else{
        delete queryParams.name;
      }

      return queryParams;
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
