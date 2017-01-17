(function() {
  'use strict';

  angular
    .module('app.catalog')
    .controller("CatalogOverviewController",catalogOverviewController);

  /** @ngInject */

  function catalogOverviewController(CatalogService, $state) {
    var vm = this;

    vm.init = function () {

      CatalogService.getAllProducts().$promise.then(function(response){
        vm.products = response;
        vm.setPriceSlider(response);
      });

      CatalogService.getAllCategories().$promise.then(function (response) {
        vm.categories = response;
        if($state.params && $state.params.categoryFilter){
          if(!vm.categoryFilters){
            vm.categoryFilters = {};
          }
          vm.categoryFilters[$state.params.categoryFilter] = true;
          $state.params = undefined;
          vm.getProducts();
        }
      });

      CatalogService.getAllBrands().$promise.then(function (response) {
        vm.brands = response;
        if($state.params && $state.params.brandFilter){
          if(!vm.brandFilters){
            vm.brandFilters = {};
          }
          vm.brandFilters[$state.params.brandFilter] = true;
          vm.getProducts();
        }
      });

      vm.itemsPerPage = 3;
      vm.maxPrice = null;
      vm.categoryDefaultFilterLimit = 10;
      vm.categoryFilterLimit = vm.categoryDefaultFilterLimit;
      vm.brandDefaultFilterLimit = 10;
      vm.brandFilterLimit = vm.brandDefaultFilterLimit;


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
          if(vm.categoryFilters[key]){
            queryParams.categories += "," + key;
          }
        });
      }

      if(!queryParams.categories){
        delete queryParams.categories;
      }

      if(vm.brandFilters) {
        Object.keys(vm.brandFilters).forEach(function (key) {
          if (vm.brandFilters[key]) {
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
  }
})();
