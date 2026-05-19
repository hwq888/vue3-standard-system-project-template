import type { App } from 'vue'
import hasPermissionDirective from './hasPermissionDirective'
// import lazyLoadDirective from './lazyLoadDirective';
// import clickOutsideDirective from './clickOutsideDirective';

export default {
  install(app: App) {
    app.directive('has-permission', hasPermissionDirective)
    // app.directive('lazyload', lazyLoadDirective);
    // app.directive('click-outside', clickOutsideDirective);
  }
}
