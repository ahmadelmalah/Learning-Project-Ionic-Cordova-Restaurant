angular.module('conFusion.controllers', [])

//.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {
.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo','{}');
  $scope.reservation = {};
  $scope.registration = {};

  $ionicPlatform.ready(function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $scope.takePicture = function() {
       $cordovaCamera.getPicture(options).then(function(imageData) {
           $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
       }, function(err) {
           console.log(err);
       });

       $scope.registerform.show();

   };

   var gal_options = {
     maximumImagesCount: 10,
     width: 800,
     height: 800,
     quality: 80
    };
   $scope.openGallery = function() {
     $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
      $scope.registration.imgSrc = results[0];
    }, function(error) {
      // error getting photos
    });
   };


    });

  $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the registration modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the registration modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegister = function () {
        // Simulate a registration delay. Remove this and replace with your registration
        // code if using a registration system
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo',$scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Create the reserve modal that we will use later
  $ionicModal.fromTemplateUrl('templates/reserve.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  // Triggered in the reserve modal to close it
  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  };

  // Open the reserve modal
  $scope.reserve = function() {
    $scope.reserveform.show();
  };

  // Perform the reserve action when the user submits the reserve form
  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);

    // Simulate a reservation delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  };
})

//.controller('MenuController', ['$scope', 'menuFactory', 'baseURL', function($scope, menuFactory, baseURL) {
//.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'dishes', 'baseURL', '$ionicListDelegate', function ($scope, menuFactory, favoriteFactory, dishes, baseURL, $ionicListDelegate) {
.controller('MenuController', ['$scope', 'dishes', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, dishes, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

  $scope.baseURL = baseURL;
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.showMenu = false;
  $scope.message = "Loading ...";

  $scope.dishes = dishes;

  // $ionicPlatform.ready(function () {
  //             $cordovaLocalNotification.schedule({
  //                 id: 1,
  //                 title: "Added Favorite",
  //                 text: 'any'
  //             }).then(function () {
  //                 console.log('Added Favorite ');
  //             },
  //             function () {
  //                 console.log('Failed to add Notification ');
  //             });
  //
  //             $cordovaToast
  //               .show('Added Favorite ', 'long', 'center')
  //               .then(function (success) {
  //                   // success
  //               }, function (error) {
  //                   // error
  //               });
  //     });

    $scope.addFavorite = function (index) {
      console.log("index is " + index);

      favoriteFactory.addToFavorites(index);
      $ionicListDelegate.closeOptionButtons();
    };


    $scope.select = function(setTab) {
      $scope.tab = setTab;

      if (setTab === 2) {
        $scope.filtText = "appetizer";
      }
      else if (setTab === 3) {
        $scope.filtText = "mains";
      }
      else if (setTab === 4) {
        $scope.filtText = "dessert";
      }
      else {
        $scope.filtText = "";
      }
    };

    $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };
  }])

  .controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {

    $scope.sendFeedback = function() {

      console.log($scope.feedback);

      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else {
        $scope.invalidChannelSelection = false;
        feedbackFactory.save($scope.feedback);
        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        $scope.feedback.mychannel="";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover','$ionicModal', '$timeout', '$cordovaLocalNotification', '$cordovaToast', function($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $timeout, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    $scope.dish = {};
    $scope.comment = {};
    $scope.showDish = false;
    $scope.message="Loading ...";

    $scope.dish = dish;

    $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

    $scope.openPopover = function($event, index) {
      $scope.index = $scope.dish.id;
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };

    $scope.addFavorite = function (index) {
       console.log("index is " + index);
       favoriteFactory.addToFavorites(index);

       $cordovaLocalNotification.schedule({
           id: 1,
           title: "Added Favorite",
           text: 'Your dish was added to your facourite dishes'
       }).then(function () {
           console.log('Added Favorite ');
       },
       function () {
           console.log('Failed to add Notification ');
       });

       $cordovaToast
         .show('Dish number(' + index + ') was added to favourite ', 'long', 'bottom')
         .then(function (success) {
             // success
         }, function (error) {
             // error
         });
    };

    $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.commentform = modal;
    });

    $scope.closeComment = function() {
      $scope.commentform.hide();
    };

    $scope.addComment = function() {
      $timeout(function() {
        $scope.commentform.show();
      }, 100);

    };

    $scope.doComment = function() {
      $scope.comment.date = Date.now();
      $scope.dish.comments.push($scope.comment);
      $timeout(function() {
        $scope.closeComment();
      }, 100);
      //$scope.closePopover(); //no need to close it as it's already closed when clicked
    };


  }])

  .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

    $scope.submitComment = function () {

      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);

      $scope.dish.comments.push($scope.mycomment);
      menuFactory.update({id:$scope.dish.id},$scope.dish);

      $scope.commentForm.$setPristine();

      $scope.mycomment = {rating:5, comment:"", author:"", date:""};
    }
  }])

  // implement the IndexController and About Controller here

  .controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'dish', 'promotion', 'leader', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, dish, promotion, leader, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leader = leader;

    $scope.showDish = false;
    $scope.message = "Loading ...";

     $scope.dish = dish;
     $scope.promotion = promotion;

}])

//.controller('AboutController', ['$scope', 'corporateFactory', 'leaders', 'baseURL', function($scope, corporateFactory, leaders, baseURL) {
.controller('AboutController', ['$scope', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', 'corporateFactory', 'leaders', 'baseURL', function($scope, $ionicPlatform, $cordovaLocalNotification, $cordovaToast,corporateFactory, leaders, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leaders = leaders;
    console.log($scope.leaders);

    $ionicPlatform.ready(function () {
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: 'any'
                }).then(function () {
                    console.log('Added Favorite ');
                },
                function () {
                    console.log('Failed to add Notification ');
                });

                $cordovaToast
                  .show('Added Favorite ', 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });
        });

  }])

  .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$cordovaVibration', '$ionicPlatform', function ($scope, dishes, favorites, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $cordovaVibration, $ionicPlatform) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner> Loading...'
    });

    $scope.favorites = favorites;

    $scope.dishes = dishes;
    $timeout(function () {
      $ionicLoading.hide();
    }, 1000);
      console.log($scope.dishes, $scope.favorites);

      $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
      }

      $scope.deleteFavorite = function (index) {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Confirm Delete',
          template: 'Are you sure you want to delete this item?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            console.log('Ok to delete');
            favoriteFactory.deleteFromFavorites(index);
            $ionicPlatform.ready(function() {
                    $cordovaVibration.vibrate(333);
            });
          } else {
            console.log('Canceled delete');
          }
        });

        $scope.shouldShowDelete = false;

      }

    }])

    .filter('favoriteFilter', function () {
      return function (dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
          for (var j = 0; j < dishes.length; j++) {
            if (dishes[j].id === favorites[i].id)
            out.push(dishes[j]);
          }
        }
        return out;

      }})



      ;
