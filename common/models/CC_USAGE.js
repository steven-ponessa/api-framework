'use strict';

module.exports = function(ccUsage) {


    ccUsage.observe('after save', function(ctx, next) {
        /* console.log('> after save triggered:', ctx.Model.modelName, ctx.instance ||
          ctx.data);
          console.log('> after save triggered:'+ JSON.stringify(ctx.options)); */
        next();
      });

      ccUsage.createOptionsFromRemotingContext = function(ctx) {
        var base = this.base.createOptionsFromRemotingContext(ctx);
        return extend(base, {
          req: base.request
        });
      };

};