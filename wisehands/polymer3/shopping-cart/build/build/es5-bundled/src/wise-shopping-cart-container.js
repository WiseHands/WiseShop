define(["exports","meta"],function(_exports,meta){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.$documentWaitDefault=documentWait;_exports.addListener=addListener;_exports.afterNextRender=afterNextRender;_exports.applyCss=applyCss;_exports.applyStyle=applyStyle;_exports.applyStylePlaceHolder=applyStylePlaceHolder;_exports.beforeNextRender=beforeNextRender;_exports.calculateSplices=calculateSplices;_exports.camelToDashCase=camelToDashCase;_exports.createScopeStyle=createScopeStyle;_exports.cssFromModule=cssFromModule;_exports.cssFromModuleImports=cssFromModuleImports;_exports.cssFromModules=cssFromModules;_exports.cssFromTemplate=cssFromTemplate;_exports.dashToCamelCase=dashToCamelCase;_exports.deepTargetFind=deepTargetFind;_exports.detectMixin=_detectMixin;_exports.dumpRegistrations=dumpRegistrations;_exports.elementHasBuiltCss=elementHasBuiltCss;_exports.elementsAreInvalid=elementsAreInvalid;_exports.findMatchingParen=findMatchingParen;_exports.flush$2=flush;_exports.forEachRule=forEachRule;_exports.gatherStyleText=gatherStyleText;_exports.get=_get;_exports.getBuildComment=getBuildComment;_exports.getComputedStyleValue=_getComputedStyleValue;_exports.getCssBuild=getCssBuild;_exports.getIsExtends=getIsExtends;_exports.hideElementsGlobally=hideElementsGlobally;_exports.incrementInstanceCount=incrementInstanceCount;_exports.invalidate=invalidate;_exports.invalidateTemplate=invalidateTemplate;_exports.isAncestor=isAncestor;_exports.isDescendant=isDescendant;_exports.isKeyframesSelector=isKeyframesSelector;_exports.isOptimalCssBuild=isOptimalCssBuild;_exports.isPath=isPath;_exports.isTargetedBuild=isTargetedBuild;_exports.isUnscopedStyle=isUnscopedStyle;_exports.isValid=isValid;_exports.isValidating=isValidating;_exports.matches=matches;_exports.mixinBehaviors=mixinBehaviors;_exports.modelForElement=_modelForElement;_exports.normalize=normalize;_exports.parse=parse;_exports.pathFromUrl=pathFromUrl;_exports.prevent=_prevent;_exports.processUnscopedStyle=processUnscopedStyle;_exports.processVariableAndFallback=processVariableAndFallback;_exports.register=register$1;_exports.register$1=register;_exports.removeCustomPropAssignment=removeCustomPropAssignment;_exports.removeListener=removeListener;_exports.resetMouseCanceller=resetMouseCanceller;_exports.resolveCss=resolveCss;_exports.resolveUrl=_resolveUrl;_exports.root=root;_exports.rulesForStyle=rulesForStyle;_exports.scopeSubtree=_scopeSubtree;_exports.set=_set;_exports.setElementClassRaw=setElementClassRaw;_exports.setTouchAction=setTouchAction;_exports.split=split;_exports.splitSelectorList=splitSelectorList;_exports.startValidating=startValidating;_exports.startValidatingTemplate=startValidatingTemplate;_exports.stringify=stringify;_exports.stylesFromModule=stylesFromModule;_exports.stylesFromModuleImports=stylesFromModuleImports;_exports.stylesFromModules=stylesFromModules;_exports.stylesFromTemplate=stylesFromTemplate;_exports.templateIsValid=templateIsValid;_exports.templateIsValidating=templateIsValidating;_exports.templatize=_templatize;_exports.toCssText=toCssText;_exports.translate=translate;_exports.updateNativeProperties=updateNativeProperties;_exports.HOST_SUFFIX=_exports.HOST_PREFIX=_exports.GestureEventListeners=_exports.FlattenedNodesObserver=_exports.EventApi=_exports.ElementMixin=_exports.DomRepeat=_exports.DomModule=_exports.DomIf=_exports.DomBind=_exports.DomApi=_exports.DirMixin=_exports.Debouncer=_exports.CustomStyleProvider=_exports.CustomStyleInterfaceInterface=_exports.CustomStyle=_exports.Class=_exports.Base=_exports.BRACKETED=_exports.ArraySelectorMixin=_exports.ArraySelector=_exports.ANIMATION_MATCH=_exports.$wrap=_exports.$wiseShoppingCartItem=_exports.$wiseShoppingCart=_exports.$unscopedStyleHandler=_exports.$templatizerBehavior=_exports.$templatize=_exports.$templateStamp=_exports.$templateMapDefault=_exports.$templateMap=_exports.$telemetry=_exports.$styleUtil=_exports.$styleSettings=_exports.$styleGather=_exports.$settings=_exports.$scopeSubtree=_exports.$resolveUrl=_exports.$renderStatus=_exports.$propertyEffects=_exports.$propertyAccessors=_exports.$propertiesMixin=_exports.$propertiesChanged=_exports.$polymerLegacy=_exports.$polymerFn=_exports.$polymerElement=_exports.$polymerDom=_exports.$path=_exports.$paperSpinnerBehavior=_exports.$paperRippleBehavior=_exports.$paperInputBehavior=_exports.$paperInputAddonBehavior=_exports.$paperInkyFocusBehavior=_exports.$paperCheckedElementBehavior=_exports.$paperButtonBehavior=_exports.$mutableDataBehavior=_exports.$mutableData=_exports.$mixin=_exports.$legacyElementMixin=_exports.$ironValidatableBehavior=_exports.$ironSelection=_exports.$ironSelectable=_exports.$ironMultiSelectable=_exports.$ironMeta=_exports.$ironMenubarBehavior=_exports.$ironMenuBehavior=_exports.$ironFormElementBehavior=_exports.$ironControlState=_exports.$ironCheckedElementBehavior=_exports.$ironButtonState=_exports.$ironA11yKeysBehavior=_exports.$ironA11yAnnouncer=_exports.$htmlTag=_exports.$hideTemplateControls=_exports.$gestures=_exports.$gestureEventListeners=_exports.$flush=_exports.$flattenedNodesObserver=_exports.$elementMixin=_exports.$domRepeat=_exports.$domModule=_exports.$domIf=_exports.$domBind=_exports.$documentWait=_exports.$dirMixin=_exports.$debounce=_exports.$customStyleInterfaceDefault=_exports.$customStyleInterface$1=_exports.$customStyle=_exports.$cssParse=_exports.$commonUtils=_exports.$commonRegex=_exports.$class=_exports.$caseMap=_exports.$async=_exports.$arraySplice=_exports.$arraySelector=_exports.$applyShimUtils=_exports.$applyShimDefault=_exports.$applyShim$1=void 0;_exports.timeOut=_exports.syncInitialRender=_exports.strictTemplatePolicy=_exports.setSyncInitialRender=_exports.setStrictTemplatePolicy=_exports.setSanitizeDOMValue=_exports.setRootPath=_exports.setPassiveTouchGestures=_exports.setLegacyOptimizations=_exports.setCancelSyntheticClickEvents=_exports.setAllowTemplateFromDomModule=_exports.scopingAttribute=_exports.sanitizeDOMValue=_exports.rootPath=_exports.remove=_exports.registrations=_exports.recognizers=_exports.passiveTouchGestures=_exports.nativeShadow=_exports.nativeCssVariables=_exports.microTask=_exports.matchesSelector=_exports.legacyOptimizations=_exports.isDeep=_exports.instanceCount=_exports.idlePeriod=_exports.htmlLiteral=_exports.html$2=_exports.html$1=_exports.html=_exports.gestures=_exports.flushDebouncers=_exports.flush$1=_exports.flush=_exports.findOriginalTarget=_exports.dom=_exports.disableRuntime=_exports.dedupingMixin=_exports.cssBuild=_exports.cancelSyntheticClickEvents=_exports.animationFrame=_exports.allowTemplateFromDomModule=_exports.enqueueDebouncer$1=_exports.enqueueDebouncer=_exports.addDebouncer=_exports.add=_exports.WiseShoppingCartItem=_exports.WiseShoppingCart=_exports.VAR_CONSUMED=_exports.VAR_ASSIGN=_exports.Templatizer=_exports.TemplateStamp=_exports.TemplateInstanceBase=_exports.StyleNode=_exports.PropertyEffects=_exports.PropertyAccessors=_exports.PropertiesMixin=_exports.PropertiesChanged=_exports.PolymerElement=_exports.Polymer$1=_exports.Polymer=_exports.PaperSpinnerBehavior=_exports.PaperRippleBehavior=_exports.PaperInputHelper=_exports.PaperInputBehaviorImpl=_exports.PaperInputBehavior=_exports.PaperInputAddonBehavior=_exports.PaperInkyFocusBehaviorImpl=_exports.PaperInkyFocusBehavior=_exports.PaperCheckedElementBehaviorImpl=_exports.PaperCheckedElementBehavior=_exports.PaperButtonBehaviorImpl=_exports.PaperButtonBehavior=_exports.OptionalMutableDataBehavior=_exports.OptionalMutableData=_exports.MutableDataBehavior=_exports.MutableData=_exports.MIXIN_MATCH=_exports.MEDIA_MATCH=_exports.LegacyElementMixin=_exports.IronValidatableBehaviorMeta=_exports.IronValidatableBehavior=_exports.IronSelection=_exports.IronSelectableBehavior=_exports.IronMultiSelectableBehaviorImpl=_exports.IronMultiSelectableBehavior=_exports.IronMeta=_exports.IronMenubarBehaviorImpl=_exports.IronMenubarBehavior=_exports.IronMenuBehaviorImpl=_exports.IronMenuBehavior=_exports.IronFormElementBehavior=_exports.IronControlState=_exports.IronCheckedElementBehaviorImpl=_exports.IronCheckedElementBehavior=_exports.IronButtonStateImpl=_exports.IronButtonState=_exports.IronA11yKeysBehavior=_exports.IronA11yAnnouncer=_exports.IS_VAR=void 0;_exports.wrap$1=_exports.wrap=_exports.version$1=_exports.version=_exports.useShadow=_exports.useNativeCustomElements=_exports.useNativeCSSProperties=_exports.updateStyles=_exports.types=void 0;meta=babelHelpers.interopRequireWildcard(meta);function _templateObject26_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n            <style>\n                :host {\n                    display: block;\n                }\n\n                section {\n                    display: block;\n                }\n\n                .order-details {\n                }\n\n                .cart {\n                    display: flex;\n                }\n\n                paper-radio-group {\n                    display: flex;\n                    flex-direction: column;\n                    padding: 0 1em;\n                }\n\n                paper-radio-group :first-child {\n                    padding-top: 0;\n                }\n\n                h3 {\n                    padding: 0 .5em;\n                }\n\n                wise-shopping-cart {\n                    margin-right: 1em;\n                    margin-bottom: 1em;\n                    flex: 1;\n                }\n\n                .shopping-cart-container {\n                    flex: 1;\n                    width: 65%;\n                }\n\n                .order-details-container {\n                    width: 35%;\n                }\n\n                .order-details {\n                    display: flex;\n                    flex-direction: column;\n                }\n\n                paper-card {\n                    flex: 1;\n                    margin-bottom: 1em;\n                    padding-bottom: .5em;\n                }\n\n                span[slot=prefix] {\n                    margin-right: .5em;\n                }\n\n                .error-span {\n                    color: red;\n                    min-height: 1.2em;\n                }\n                \n                .info-span{\n                    padding-left: 15.5px;\n                }\n\n                paper-input {\n                    padding: 0 1em;\n                }\n\n                h1 {\n                    font-size: 1.8rem;\n                    font-weight: 600;\n                    text-transform: uppercase;\n                }\n\n                paper-button {\n                    background-color: #fff;\n                    color: #000;\n                    border: 2px solid #000;\n                    border-radius: 0;\n                    width: fit-content;\n                    margin-right: 0;\n                }\n\n                paper-button:hover {\n                    background-color: #000;\n                    color: #fff;\n                    border: 2px solid #fff;\n                }\n\n                paper-button[disabled] {\n                    border: 2px solid grey;\n                    color: grey;\n                }\n\n                paper-spinner[active] {\n                    display: block;\n                }\n                paper-spinner {\n                    display: none;\n                }\n\n                .total-container {\n                    display: flex;\n                    flex-direction: column;\n                    align-items: flex-end;\n                }\n                .total-container h1, h3{\n                    margin: 5px 0;\n                }\n\n                .order-details :nth-last-child(2) h3 {\n                    margin-bottom: 0;\n                }\n\n                .department-number {\n                    padding-bottom: 1em;\n                }\n\n                #clientComments {\n                    padding-bottom: 1em;\n                }\n\n                @media (max-width: 1024px) {\n                    .cart {\n                        flex-direction: column;\n                    }\n\n                    .shopping-cart-container, .order-details-container {\n                        width: 100%;\n                    }\n\n                    wise-shopping-cart {\n                        margin-right: 0;\n                    }\n                }\n            </style>\n            <div>\n                <div class=\"cart-container\">\n                    <div class=\"cart\">\n                        <div class=\"shopping-cart-container\">\n                            <wise-shopping-cart language=\"[[language]]\" currency-label=\"[[currencyLabel]]\" cart-items=\"[[cart.items]]\" basket-empty-label=\"[[basketEmptyLabel]]\"\n                                                start-shopping-label=\"[[startShoppingLabel]]\">\n                            </wise-shopping-cart>\n                        </div>\n                        <div hidden=\"[[!areThereItems(cart.items)]]\" class=\"order-details-container\">\n                            <div class=\"order-details\">\n\n                                <paper-card>\n                                    <h3>[[deliveryTypeLabel]]</h3>\n                                    <paper-radio-group id=\"deliveryType\" selected=\"[[cart.deliveryType]]\"\n                                                       on-selected-changed=\"_onDeliveryTypeChange\">\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.delivery.courier.isCourierActive]]\">\n                                            <paper-radio-button name=\"COURIER\">[[_translateCourierLabel(cart.configuration.delivery.courier)]] [[_computeCourierLabel(cart.configuration.delivery.courier)]]</paper-radio-button>\n                                        </template>\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.delivery.postDepartment.isPostDepartmentActive]]\">\n                                            <paper-radio-button name=\"POSTSERVICE\">[[_translatePostDepartmentLabel(cart.configuration.delivery.postDepartment)]]</paper-radio-button>\n                                        </template>\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.delivery.selfTake.isSelfTakeActive]]\">\n                                            <paper-radio-button name=\"SELFTAKE\">[[_translateSelfTakeLabel(cart.configuration.delivery.selfTake)]]</paper-radio-button>\n                                        </template>\n                                    </paper-radio-group>\n                                </paper-card>\n\n                                <paper-card>\n                                    <h3>[[paymentTypeLabel]]</h3>\n                                    <paper-radio-group id=\"paymentType\" selected=\"[[cart.paymentType]]\"\n                                                       on-selected-changed=\"_onPaymentTypeChange\">\n                                        <template is=\"dom-if\" if=\"[[cart.configuration.payment.creditCard.isActivePayByCreditCard]]\">\n                                            <paper-radio-button name=\"CREDITCARD\" title=\"\u041F\u043B\u0430\u0442\u0456\u0436\u043D\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 liqpay \u0431\u0435\u0440\u0435 \u043A\u043E\u043C\u0456\u0441\u0456\u044E \u0437\u0430 \u043E\u043F\u0440\u0430\u0446\u044E\u0432\u0430\u043D\u043D\u044F \u043E\u043F\u043B\u0430\u0442\u0438, \u043E\u0441\u044C \u0447\u043E\u043C\u0443 \u0432\u0438 \u0431\u0430\u0447\u0438\u0442\u0435 \u0434\u043E\u0434\u0430\u043D\u0443 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C - \u0446\u0435 \u043A\u043E\u043C\u0456\u0441\u0456\u044F \u043F\u043B\u0430\u0442\u0456\u0436\u043D\u043E\u0457 \u0441\u0438\u0441\u0442\u0435\u043C\u0438\">\n                                                [[_computeLabel(cart.configuration.payment.creditCard)]]\n                                            </paper-radio-button>\n                                        </template>\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.payment.cash.isActivePayByCash]]\">\n                                            <paper-radio-button name=\"CASHONDELIVERY\">[[_translateCashLabe(cart.configuration.payment.cash)]]</paper-radio-button>\n                                        </template>\n                                    </paper-radio-group>\n                                </paper-card>\n\n                                <paper-card>\n                                    <h3>[[customerLabel]]</h3>\n                                    <paper-input pattern=\".*\\S.*\" id=\"clientName\"\n                                                 label=\"[[changeClientName(cart.configuration.additionalConfiguration.labelForCustomerName)]]\" required\n                                                 error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                 value=\"[[cart.client.name]]\"\n                                                 on-blur=\"_validateAndSendClientInfo\"></paper-input>\n                                    <paper-input id=\"clientPhone\" pattern=\"^\\d{12}$\" label=\"[[customerPhoneLabel]]\" required\n                                                 error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                 value=\"[[cart.client.phone]]\" on-blur=\"_validateAndSendClientInfo\">\n                                        <span slot=\"prefix\">+</span>\n                                    </paper-input>\n                                    <paper-input id=\"clientEmail\" type=\"email\" label=\"[[customerEmailLabel]]\"\n                                                 error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                 value=\"[[cart.client.email]]\" required\n                                                 on-blur=\"_validateAndSendClientInfo\"></paper-input>\n                                    <paper-input id=\"clientComments\" label=\"[[customerCommentLabel]]\" value=\"[[cart.client.comments]]\"\n                                                 on-blur=\"_validateAndSendClientInfo\"></paper-input>\n                                </paper-card>\n                                <template is=\"dom-if\" if=\"[[_isAddressCardVisible(cart.deliveryType)]]\">\n                                    <paper-card>\n                                        <h3>[[addressGeneralLabel]]</h3>\n                                        <div hidden=\"[[!_isCourierDeliveryType(cart.deliveryType)]]\">\n                                            <span class=\"info-span\" hidden=\"[[!cart.client.address.isAddressSetFromMapView]]\">\n                                                [[mapChooseYourPlaceLabel]] <a href=\"/[[language]]/selectaddress\">[[mapLabel]]</a>.</span>\n                                            <paper-input id=\"street\" pattern=\".*\\S.*\" label=\"[[pageSelectAddressPlaceholderStreet]]\"\n                                                         disabled=\"[[cart.client.address.isAddressSetFromMapView]]\"\n                                                         value=\"{{cart.client.address.street}}\" required\n                                                         error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndGeocodeAddress\"></paper-input>\n                                            <paper-input id=\"building\" pattern=\".*\\S.*\"\n                                                         disabled=\"[[cart.client.address.isAddressSetFromMapView]]\"\n                                                         label=\"[[pageSelectAddressPlaceholderHouse]]\" value=\"{{cart.client.address.building}}\"\n                                                         required error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndGeocodeAddress\"></paper-input>\n                                            <paper-input id=\"entrance\" label=\"[[addressEntranceLabel]]\"\n                                                         value=\"[[cart.client.address.entrance]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                            <paper-input id=\"entranceCode\" label=\"[[addressEntranceCodeLabel]]\"\n                                                         value=\"[[cart.client.address.entranceCode]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                            <paper-input id=\"floor\" label=\"[[addressFloorLabel]]\"\n                                                         value=\"[[cart.client.address.floor]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                            <paper-input id=\"apartment\" label=\"[[addressApartmentLabel]]\"\n                                                         value=\"[[cart.client.address.apartment]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                        </div>\n\n                                        <div hidden=\"[[_isCourierDeliveryType(cart.deliveryType)]]\">\n                                            <paper-input id=\"clientCity\"\n                                                         value=\"[[cart.client.postDepartamentInfo.city]]\"\n                                                         pattern=\".*\\S.*\"\n                                                         label=\"\u041C\u0456\u0441\u0442\u043E\" required\n                                                         error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndSendClientPostInfo\"></paper-input>\n                                            <paper-input id=\"clientPostDepartmentNumber\"\n                                                         value=\"[[cart.client.postDepartamentInfo.postDepartmentNumber]]\"\n                                                         class=\"department-number\" pattern=\"^[0-9]*$\" label=\"\u0412\u0456\u0434\u0434\u0456\u043B\u0435\u043D\u043D\u044F\"\n                                                         required error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndSendClientPostInfo\">\n                                                <span slot=\"prefix\">\u2116</span>\n                                            </paper-input>\n                                        </div>\n                                    </paper-card>\n                                </template>\n                                <span class=\"error-span\" inner-h-t-m-l=\"[[errorMessage]]\"></span>\n                                <div class=\"total-container\">\n                                    <h3>[[amountProductsLabel]] [[_computeProductsTotal(cart.items)]] [[currencyLabel]]</h3>\n                                    <h3>[[deliveryLabel]] [[deliveryPrice]] [[currencyLabel]]</h3>\n                                    <h3 hidden=\"[[!cart.configuration.payment.creditCard.clientPaysProcessingCommission]]\">\n                                        \u041A\u043E\u043C\u0456\u0441\u0456\u044F \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u043F\u043B\u0430\u0442\u0438: [[_calculatePaymentOnlineCommission(total, cart.paymentType, cart.configuration.payment.creditCard)]] [[currencyLabel]]\n                                    </h3>\n                                    <h1>[[generalPaymentLabel]] [[total]] [[currencyLabel]]</h1>\n                                    <paper-button hidden=\"[[isMakeOrderRequestRunning]]\" disabled=[[!cart.items.length]] on-tap=\"_proceed\">[[buttonNextLabel]]</paper-button>\n                                    <paper-spinner active=\"{{isMakeOrderRequestRunning}}\"></paper-spinner>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <iron-ajax id=\"ajax\" handle-as=\"json\" on-last-response-changed=\"_onLastResponseChanged\"></iron-ajax>\n            <iron-ajax id=\"makeOrderAjax\" handle-as=\"json\"\n                       on-last-response-changed=\"_onOrderResponseChanged\"></iron-ajax>\n\n        "],["\n            <style>\n                :host {\n                    display: block;\n                }\n\n                section {\n                    display: block;\n                }\n\n                .order-details {\n                }\n\n                .cart {\n                    display: flex;\n                }\n\n                paper-radio-group {\n                    display: flex;\n                    flex-direction: column;\n                    padding: 0 1em;\n                }\n\n                paper-radio-group :first-child {\n                    padding-top: 0;\n                }\n\n                h3 {\n                    padding: 0 .5em;\n                }\n\n                wise-shopping-cart {\n                    margin-right: 1em;\n                    margin-bottom: 1em;\n                    flex: 1;\n                }\n\n                .shopping-cart-container {\n                    flex: 1;\n                    width: 65%;\n                }\n\n                .order-details-container {\n                    width: 35%;\n                }\n\n                .order-details {\n                    display: flex;\n                    flex-direction: column;\n                }\n\n                paper-card {\n                    flex: 1;\n                    margin-bottom: 1em;\n                    padding-bottom: .5em;\n                }\n\n                span[slot=prefix] {\n                    margin-right: .5em;\n                }\n\n                .error-span {\n                    color: red;\n                    min-height: 1.2em;\n                }\n                \n                .info-span{\n                    padding-left: 15.5px;\n                }\n\n                paper-input {\n                    padding: 0 1em;\n                }\n\n                h1 {\n                    font-size: 1.8rem;\n                    font-weight: 600;\n                    text-transform: uppercase;\n                }\n\n                paper-button {\n                    background-color: #fff;\n                    color: #000;\n                    border: 2px solid #000;\n                    border-radius: 0;\n                    width: fit-content;\n                    margin-right: 0;\n                }\n\n                paper-button:hover {\n                    background-color: #000;\n                    color: #fff;\n                    border: 2px solid #fff;\n                }\n\n                paper-button[disabled] {\n                    border: 2px solid grey;\n                    color: grey;\n                }\n\n                paper-spinner[active] {\n                    display: block;\n                }\n                paper-spinner {\n                    display: none;\n                }\n\n                .total-container {\n                    display: flex;\n                    flex-direction: column;\n                    align-items: flex-end;\n                }\n                .total-container h1, h3{\n                    margin: 5px 0;\n                }\n\n                .order-details :nth-last-child(2) h3 {\n                    margin-bottom: 0;\n                }\n\n                .department-number {\n                    padding-bottom: 1em;\n                }\n\n                #clientComments {\n                    padding-bottom: 1em;\n                }\n\n                @media (max-width: 1024px) {\n                    .cart {\n                        flex-direction: column;\n                    }\n\n                    .shopping-cart-container, .order-details-container {\n                        width: 100%;\n                    }\n\n                    wise-shopping-cart {\n                        margin-right: 0;\n                    }\n                }\n            </style>\n            <div>\n                <div class=\"cart-container\">\n                    <div class=\"cart\">\n                        <div class=\"shopping-cart-container\">\n                            <wise-shopping-cart language=\"[[language]]\" currency-label=\"[[currencyLabel]]\" cart-items=\"[[cart.items]]\" basket-empty-label=\"[[basketEmptyLabel]]\"\n                                                start-shopping-label=\"[[startShoppingLabel]]\">\n                            </wise-shopping-cart>\n                        </div>\n                        <div hidden=\"[[!areThereItems(cart.items)]]\" class=\"order-details-container\">\n                            <div class=\"order-details\">\n\n                                <paper-card>\n                                    <h3>[[deliveryTypeLabel]]</h3>\n                                    <paper-radio-group id=\"deliveryType\" selected=\"[[cart.deliveryType]]\"\n                                                       on-selected-changed=\"_onDeliveryTypeChange\">\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.delivery.courier.isCourierActive]]\">\n                                            <paper-radio-button name=\"COURIER\">[[_translateCourierLabel(cart.configuration.delivery.courier)]] [[_computeCourierLabel(cart.configuration.delivery.courier)]]</paper-radio-button>\n                                        </template>\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.delivery.postDepartment.isPostDepartmentActive]]\">\n                                            <paper-radio-button name=\"POSTSERVICE\">[[_translatePostDepartmentLabel(cart.configuration.delivery.postDepartment)]]</paper-radio-button>\n                                        </template>\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.delivery.selfTake.isSelfTakeActive]]\">\n                                            <paper-radio-button name=\"SELFTAKE\">[[_translateSelfTakeLabel(cart.configuration.delivery.selfTake)]]</paper-radio-button>\n                                        </template>\n                                    </paper-radio-group>\n                                </paper-card>\n\n                                <paper-card>\n                                    <h3>[[paymentTypeLabel]]</h3>\n                                    <paper-radio-group id=\"paymentType\" selected=\"[[cart.paymentType]]\"\n                                                       on-selected-changed=\"_onPaymentTypeChange\">\n                                        <template is=\"dom-if\" if=\"[[cart.configuration.payment.creditCard.isActivePayByCreditCard]]\">\n                                            <paper-radio-button name=\"CREDITCARD\" title=\"\u041F\u043B\u0430\u0442\u0456\u0436\u043D\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 liqpay \u0431\u0435\u0440\u0435 \u043A\u043E\u043C\u0456\u0441\u0456\u044E \u0437\u0430 \u043E\u043F\u0440\u0430\u0446\u044E\u0432\u0430\u043D\u043D\u044F \u043E\u043F\u043B\u0430\u0442\u0438, \u043E\u0441\u044C \u0447\u043E\u043C\u0443 \u0432\u0438 \u0431\u0430\u0447\u0438\u0442\u0435 \u0434\u043E\u0434\u0430\u043D\u0443 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C - \u0446\u0435 \u043A\u043E\u043C\u0456\u0441\u0456\u044F \u043F\u043B\u0430\u0442\u0456\u0436\u043D\u043E\u0457 \u0441\u0438\u0441\u0442\u0435\u043C\u0438\">\n                                                [[_computeLabel(cart.configuration.payment.creditCard)]]\n                                            </paper-radio-button>\n                                        </template>\n                                        <template is=\"dom-if\"\n                                                  if=\"[[cart.configuration.payment.cash.isActivePayByCash]]\">\n                                            <paper-radio-button name=\"CASHONDELIVERY\">[[_translateCashLabe(cart.configuration.payment.cash)]]</paper-radio-button>\n                                        </template>\n                                    </paper-radio-group>\n                                </paper-card>\n\n                                <paper-card>\n                                    <h3>[[customerLabel]]</h3>\n                                    <paper-input pattern=\".*\\\\S.*\" id=\"clientName\"\n                                                 label=\"[[changeClientName(cart.configuration.additionalConfiguration.labelForCustomerName)]]\" required\n                                                 error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                 value=\"[[cart.client.name]]\"\n                                                 on-blur=\"_validateAndSendClientInfo\"></paper-input>\n                                    <paper-input id=\"clientPhone\" pattern=\"^\\\\d{12}$\" label=\"[[customerPhoneLabel]]\" required\n                                                 error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                 value=\"[[cart.client.phone]]\" on-blur=\"_validateAndSendClientInfo\">\n                                        <span slot=\"prefix\">+</span>\n                                    </paper-input>\n                                    <paper-input id=\"clientEmail\" type=\"email\" label=\"[[customerEmailLabel]]\"\n                                                 error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                 value=\"[[cart.client.email]]\" required\n                                                 on-blur=\"_validateAndSendClientInfo\"></paper-input>\n                                    <paper-input id=\"clientComments\" label=\"[[customerCommentLabel]]\" value=\"[[cart.client.comments]]\"\n                                                 on-blur=\"_validateAndSendClientInfo\"></paper-input>\n                                </paper-card>\n                                <template is=\"dom-if\" if=\"[[_isAddressCardVisible(cart.deliveryType)]]\">\n                                    <paper-card>\n                                        <h3>[[addressGeneralLabel]]</h3>\n                                        <div hidden=\"[[!_isCourierDeliveryType(cart.deliveryType)]]\">\n                                            <span class=\"info-span\" hidden=\"[[!cart.client.address.isAddressSetFromMapView]]\">\n                                                [[mapChooseYourPlaceLabel]] <a href=\"/[[language]]/selectaddress\">[[mapLabel]]</a>.</span>\n                                            <paper-input id=\"street\" pattern=\".*\\\\S.*\" label=\"[[pageSelectAddressPlaceholderStreet]]\"\n                                                         disabled=\"[[cart.client.address.isAddressSetFromMapView]]\"\n                                                         value=\"{{cart.client.address.street}}\" required\n                                                         error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndGeocodeAddress\"></paper-input>\n                                            <paper-input id=\"building\" pattern=\".*\\\\S.*\"\n                                                         disabled=\"[[cart.client.address.isAddressSetFromMapView]]\"\n                                                         label=\"[[pageSelectAddressPlaceholderHouse]]\" value=\"{{cart.client.address.building}}\"\n                                                         required error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndGeocodeAddress\"></paper-input>\n                                            <paper-input id=\"entrance\" label=\"[[addressEntranceLabel]]\"\n                                                         value=\"[[cart.client.address.entrance]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                            <paper-input id=\"entranceCode\" label=\"[[addressEntranceCodeLabel]]\"\n                                                         value=\"[[cart.client.address.entranceCode]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                            <paper-input id=\"floor\" label=\"[[addressFloorLabel]]\"\n                                                         value=\"[[cart.client.address.floor]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                            <paper-input id=\"apartment\" label=\"[[addressApartmentLabel]]\"\n                                                         value=\"[[cart.client.address.apartment]]\"\n                                                         on-blur=\"_validateAndSendClientAddressInfo\"></paper-input>\n                                        </div>\n\n                                        <div hidden=\"[[_isCourierDeliveryType(cart.deliveryType)]]\">\n                                            <paper-input id=\"clientCity\"\n                                                         value=\"[[cart.client.postDepartamentInfo.city]]\"\n                                                         pattern=\".*\\\\S.*\"\n                                                         label=\"\u041C\u0456\u0441\u0442\u043E\" required\n                                                         error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndSendClientPostInfo\"></paper-input>\n                                            <paper-input id=\"clientPostDepartmentNumber\"\n                                                         value=\"[[cart.client.postDepartamentInfo.postDepartmentNumber]]\"\n                                                         class=\"department-number\" pattern=\"^[0-9]*$\" label=\"\u0412\u0456\u0434\u0434\u0456\u043B\u0435\u043D\u043D\u044F\"\n                                                         required error-message=\"[[errorMessagePleaseWriteLabel]]\"\n                                                         on-blur=\"_validateAndSendClientPostInfo\">\n                                                <span slot=\"prefix\">\u2116</span>\n                                            </paper-input>\n                                        </div>\n                                    </paper-card>\n                                </template>\n                                <span class=\"error-span\" inner-h-t-m-l=\"[[errorMessage]]\"></span>\n                                <div class=\"total-container\">\n                                    <h3>[[amountProductsLabel]] [[_computeProductsTotal(cart.items)]] [[currencyLabel]]</h3>\n                                    <h3>[[deliveryLabel]] [[deliveryPrice]] [[currencyLabel]]</h3>\n                                    <h3 hidden=\"[[!cart.configuration.payment.creditCard.clientPaysProcessingCommission]]\">\n                                        \u041A\u043E\u043C\u0456\u0441\u0456\u044F \u043E\u043D\u043B\u0430\u0439\u043D \u043E\u043F\u043B\u0430\u0442\u0438: [[_calculatePaymentOnlineCommission(total, cart.paymentType, cart.configuration.payment.creditCard)]] [[currencyLabel]]\n                                    </h3>\n                                    <h1>[[generalPaymentLabel]] [[total]] [[currencyLabel]]</h1>\n                                    <paper-button hidden=\"[[isMakeOrderRequestRunning]]\" disabled=[[!cart.items.length]] on-tap=\"_proceed\">[[buttonNextLabel]]</paper-button>\n                                    <paper-spinner active=\"{{isMakeOrderRequestRunning}}\"></paper-spinner>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <iron-ajax id=\"ajax\" handle-as=\"json\" on-last-response-changed=\"_onLastResponseChanged\"></iron-ajax>\n            <iron-ajax id=\"makeOrderAjax\" handle-as=\"json\"\n                       on-last-response-changed=\"_onOrderResponseChanged\"></iron-ajax>\n\n        "]);_templateObject26_6bf96330d65d11eaa5e0898854dcb572=function _templateObject26_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject25_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n      <style>\n        :host {\n          display: block;\n        }\n    \n        iron-image {\n            display: flex;\n        } \n      \n        .total-container h3 {\n           white-space: nowrap;\n           overflow: hidden;\n           text-overflow: ellipsis;\n           margin: 0;\n        }\n        p {\n            font-weight: 300;\n            font-size: 1.25rem;\n            text-align: center;\n        }\n        \n        paper-button {\n            background-color: #fff;\n            color: #000;\n            border: 2px solid #000;\n            border-radius: 0;\n            width: fit-content;\n            align-self: center;\n        }\n        paper-button:hover {\n            background-color: #000;\n            color: #fff;\n            border: 2px solid #fff;\n        }\n        .empty-cart-container {\n            display: flex;\n            flex-direction: column\n        }\n        .empty-cart-img {\n            display: flex;\n            justify-content: center;\n            margin: 1.5em 0 1.5em 0;\n        }\n        svg {\n            width: 25%;\n            height: auto;\n        }\n      </style>\n      <template is=\"dom-if\" if=\"[[_isInShoppingCartAnyItems(cartItems.length)]]\">\n          <template is=\"dom-repeat\" items=\"[[cartItems]]\">\n            <wise-shopping-cart-item\n              start-shopping-label=\"[[startShoppingLabel]]\"\n              basket-empty-label=\"[[basketEmptyLabel]]\"\n              currency-label=\"[[currencyLabel]]\"\n              cart-item=\"[[item]]\">\n            </wise-shopping-cart-item>\n          </template>\n      </template>\n      \n      <template is=\"dom-if\" if=\"[[!_isInShoppingCartAnyItems(cartItems.length)]]\">\n      <div class=\"empty-cart-container\">\n          <div class=\"empty-cart-img\">\n              <?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n              <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n              <!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n              <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n              \t width=\"446.853px\" height=\"446.853px\" viewBox=\"0 0 446.853 446.853\" style=\"enable-background:new 0 0 446.853 446.853;\"\n              \t xml:space=\"preserve\">\n              <g>\n              \t<path d=\"M444.274,93.36c-2.558-3.666-6.674-5.932-11.145-6.123L155.942,75.289c-7.953-0.348-14.599,5.792-14.939,13.708\n              \t\tc-0.338,7.913,5.792,14.599,13.707,14.939l258.421,11.14L362.32,273.61H136.205L95.354,51.179\n              \t\tc-0.898-4.875-4.245-8.942-8.861-10.753L19.586,14.141c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591\n              \t\tl59.491,23.371l41.572,226.335c1.253,6.804,7.183,11.746,14.104,11.746h6.896l-15.747,43.74c-1.318,3.664-0.775,7.733,1.468,10.916\n              \t\tc2.24,3.184,5.883,5.078,9.772,5.078h11.045c-6.844,7.617-11.045,17.646-11.045,28.675c0,23.718,19.299,43.012,43.012,43.012\n              \t\ts43.012-19.294,43.012-43.012c0-11.028-4.201-21.058-11.044-28.675h93.777c-6.847,7.617-11.047,17.646-11.047,28.675\n              \t\tc0,23.718,19.294,43.012,43.012,43.012c23.719,0,43.012-19.294,43.012-43.012c0-11.028-4.2-21.058-11.042-28.675h13.432\n              \t\tc6.6,0,11.948-5.349,11.948-11.947c0-6.6-5.349-11.948-11.948-11.948H143.651l12.902-35.843h216.221\n              \t\tc6.235,0,11.752-4.028,13.651-9.96l59.739-186.387C447.536,101.679,446.832,97.028,444.274,93.36z M169.664,409.814\n              \t\tc-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117s19.116,8.574,19.116,19.117S180.207,409.814,169.664,409.814z\n              \t\t M327.373,409.814c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117\n              \t\tS337.916,409.814,327.373,409.814z\"/>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              </svg>\n          </div>\n          <p>[[basketEmptyLabel]]</p> <br>\n          <paper-button on-tap=\"_startBuyingProducts\">[[startShoppingLabel]]</paper-button>\n      </div>\n      </template>\n    "]);_templateObject25_6bf96330d65d11eaa5e0898854dcb572=function _templateObject25_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject24_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n      <style>\n        :host {\n          display: block;\n        }\n        .paper-card-container {\n           display: flex;\n           flex-direction: row;\n           align-items: center;\n           margin-bottom: 1em;\n           margin-right: .1em;\n           margin-left: .1em;\n        }\n        .image-container {\n            padding: .5em;\n        }\n        .image-container:hover{\n            cursor: pointer;\n        }\n        iron-image {\n            display: flex;\n        } \n        .total-container{\n           margin: 5px;\n           display: flex;\n           align-items: center;\n           min-width: 0;  \n           flex: 1;\n           justify-content: space-between;\n        }\n        .product-info-container{\n            flex-direction: column;\n            overflow: auto;\n        }\n        .product-info-container h4{\n           font-size: 0.8rem;\n           font-weight: 400;\n           margin: 5px 0;;\n        }\n        .quantity-input, .total-span {\n           margin: 0 .5em;\n        }\n        .quantity-input {\n            --paper-input-container-shared-input-style: {\n                text-align: center;\n                width: 2em;\n                font-size: 1.4em;\n            }\n            --paper-font-caption: {\n                height: 0 !important;\n            }\n        }\n        .total-span {\n           text-align: center;\n        }\n        .total-container h3 {\n           white-space: nowrap;\n           overflow: hidden;\n           text-overflow: ellipsis;\n           margin: 0;\n           font-weight: normal;\n        }\n        \n        .total-container h3:hover {\n            cursor: pointer;\n        }\n       \n        .product-calculated-container {\n           display: flex;\n           flex-direction: row;\n           align-items: center;\n        }\n      \n        @media screen and (max-width: 500px) {\n           .total-container{\n              flex-direction: column;\n              align-items: normal;\n           }   \n           .product-calculated-container {\n              align-self: auto;\n           }   \n        }\n      </style>\n    <paper-card class=\"paper-card-container\">\n        <div class=\"image-container\">\n            <iron-image sizing=\"cover\" height=\"100\" width=\"100\" src=\"[[cartItem.imagePath]]\" on-click=\"_openProductPageByUuid\">\n        </div>\n        <div class=\"total-container\">\n            <div class=\"product-info-container\">\n                <h3 on-click=\"_openProductPageByUuid\">[[_translateProductName(cartItem)]]</h3>\n                <h4> \n                    <template is=\"dom-repeat\" items=\"[[cartItem.additionList]]\">                \n                        [[item.title]]<span hidden=\"[[!hasMoreThanOneQuantity(item)]]\">([[item.quantity]])</span>\n                        <span hidden=\"[[isLastItem(cartItem.additionList, index)]]\">,</span>\n                    </template>        \n                </h4>\n            </div>        \n            <div class=\"product-calculated-container\">  \n                <paper-icon-button icon=\"remove\" on-tap=\"_decreaseItemQuantity\"></paper-icon-button>\n                <paper-input allowed-pattern=\"[0-9]\" on-change=\"_quantityChange\" value=\"[[cartItem.quantity]]\" class=\"quantity-input\" id=\"quantityItem\"></paper-input>\n                <paper-icon-button icon=\"add\" on-tap=\"_increaseItemQuantity\"></paper-icon-button>\n                <div class=\"total-span\">[[_calculateTotalPrice(cartItem.quantity, cartItem.price, cartItem.additionList)]]<br>[[currencyLabel]]</div>\n                <paper-icon-button icon=\"close\" on-tap=\"_removeItem\"></paper-icon-button>\n            </div>\n        </div>\n    </paper-card>\n    "]);_templateObject24_6bf96330d65d11eaa5e0898854dcb572=function _templateObject24_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject23_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n  <style include=\"paper-spinner-styles\"></style>\n\n  <div id=\"spinnerContainer\" class-name=\"[[__computeContainerClasses(active, __coolingDown)]]\" on-animationend=\"__reset\" on-webkit-animation-end=\"__reset\">\n    <div class=\"spinner-layer layer-1\">\n      <div class=\"circle-clipper left\">\n        <div class=\"circle\"></div>\n      </div>\n      <div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n    </div>\n\n    <div class=\"spinner-layer layer-2\">\n      <div class=\"circle-clipper left\">\n        <div class=\"circle\"></div>\n      </div>\n      <div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n    </div>\n\n    <div class=\"spinner-layer layer-3\">\n      <div class=\"circle-clipper left\">\n        <div class=\"circle\"></div>\n      </div>\n      <div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n    </div>\n\n    <div class=\"spinner-layer layer-4\">\n      <div class=\"circle-clipper left\">\n        <div class=\"circle\"></div>\n      </div>\n      <div class=\"circle-clipper right\">\n        <div class=\"circle\"></div>\n      </div>\n    </div>\n  </div>\n"]);_templateObject23_6bf96330d65d11eaa5e0898854dcb572=function _templateObject23_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject22_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: inline-block;\n      }\n\n      :host ::slotted(*) {\n        padding: var(--paper-radio-group-item-padding, 12px);\n      }\n    </style>\n\n    <slot></slot>\n"]);_templateObject22_6bf96330d65d11eaa5e0898854dcb572=function _templateObject22_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject21_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n<style>\n  :host {\n    display: inline-block;\n    line-height: 0;\n    white-space: nowrap;\n    cursor: pointer;\n    @apply --paper-font-common-base;\n    --calculated-paper-radio-button-size: var(--paper-radio-button-size, 16px);\n    /* -1px is a sentinel for the default and is replace in `attached`. */\n    --calculated-paper-radio-button-ink-size: var(--paper-radio-button-ink-size, -1px);\n  }\n\n  :host(:focus) {\n    outline: none;\n  }\n\n  #radioContainer {\n    @apply --layout-inline;\n    @apply --layout-center-center;\n    position: relative;\n    width: var(--calculated-paper-radio-button-size);\n    height: var(--calculated-paper-radio-button-size);\n    vertical-align: middle;\n\n    @apply --paper-radio-button-radio-container;\n  }\n\n  #ink {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    right: auto;\n    width: var(--calculated-paper-radio-button-ink-size);\n    height: var(--calculated-paper-radio-button-ink-size);\n    color: var(--paper-radio-button-unchecked-ink-color, var(--primary-text-color));\n    opacity: 0.6;\n    pointer-events: none;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n\n  #ink[checked] {\n    color: var(--paper-radio-button-checked-ink-color, var(--primary-color));\n  }\n\n  #offRadio, #onRadio {\n    position: absolute;\n    box-sizing: border-box;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n  }\n\n  #offRadio {\n    border: 2px solid var(--paper-radio-button-unchecked-color, var(--primary-text-color));\n    background-color: var(--paper-radio-button-unchecked-background-color, transparent);\n    transition: border-color 0.28s;\n  }\n\n  #onRadio {\n    background-color: var(--paper-radio-button-checked-color, var(--primary-color));\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    transition: -webkit-transform ease 0.28s;\n    transition: transform ease 0.28s;\n    will-change: transform;\n  }\n\n  :host([checked]) #offRadio {\n    border-color: var(--paper-radio-button-checked-color, var(--primary-color));\n  }\n\n  :host([checked]) #onRadio {\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n\n  #radioLabel {\n    line-height: normal;\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    margin-left: var(--paper-radio-button-label-spacing, 10px);\n    white-space: normal;\n    color: var(--paper-radio-button-label-color, var(--primary-text-color));\n\n    @apply --paper-radio-button-label;\n  }\n\n  :host([checked]) #radioLabel {\n    @apply --paper-radio-button-label-checked;\n  }\n\n  #radioLabel:dir(rtl) {\n    margin-left: 0;\n    margin-right: var(--paper-radio-button-label-spacing, 10px);\n  }\n\n  #radioLabel[hidden] {\n    display: none;\n  }\n\n  /* disabled state */\n\n  :host([disabled]) #offRadio {\n    border-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled][checked]) #onRadio {\n    background-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled]) #radioLabel {\n    /* slightly darker than the button, so that it's readable */\n    opacity: 0.65;\n  }\n</style>\n\n<div id=\"radioContainer\">\n  <div id=\"offRadio\"></div>\n  <div id=\"onRadio\"></div>\n</div>\n\n<div id=\"radioLabel\"><slot></slot></div>"],["\n<style>\n  :host {\n    display: inline-block;\n    line-height: 0;\n    white-space: nowrap;\n    cursor: pointer;\n    @apply --paper-font-common-base;\n    --calculated-paper-radio-button-size: var(--paper-radio-button-size, 16px);\n    /* -1px is a sentinel for the default and is replace in \\`attached\\`. */\n    --calculated-paper-radio-button-ink-size: var(--paper-radio-button-ink-size, -1px);\n  }\n\n  :host(:focus) {\n    outline: none;\n  }\n\n  #radioContainer {\n    @apply --layout-inline;\n    @apply --layout-center-center;\n    position: relative;\n    width: var(--calculated-paper-radio-button-size);\n    height: var(--calculated-paper-radio-button-size);\n    vertical-align: middle;\n\n    @apply --paper-radio-button-radio-container;\n  }\n\n  #ink {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    right: auto;\n    width: var(--calculated-paper-radio-button-ink-size);\n    height: var(--calculated-paper-radio-button-ink-size);\n    color: var(--paper-radio-button-unchecked-ink-color, var(--primary-text-color));\n    opacity: 0.6;\n    pointer-events: none;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n  }\n\n  #ink[checked] {\n    color: var(--paper-radio-button-checked-ink-color, var(--primary-color));\n  }\n\n  #offRadio, #onRadio {\n    position: absolute;\n    box-sizing: border-box;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n  }\n\n  #offRadio {\n    border: 2px solid var(--paper-radio-button-unchecked-color, var(--primary-text-color));\n    background-color: var(--paper-radio-button-unchecked-background-color, transparent);\n    transition: border-color 0.28s;\n  }\n\n  #onRadio {\n    background-color: var(--paper-radio-button-checked-color, var(--primary-color));\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    transition: -webkit-transform ease 0.28s;\n    transition: transform ease 0.28s;\n    will-change: transform;\n  }\n\n  :host([checked]) #offRadio {\n    border-color: var(--paper-radio-button-checked-color, var(--primary-color));\n  }\n\n  :host([checked]) #onRadio {\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n  }\n\n  #radioLabel {\n    line-height: normal;\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    margin-left: var(--paper-radio-button-label-spacing, 10px);\n    white-space: normal;\n    color: var(--paper-radio-button-label-color, var(--primary-text-color));\n\n    @apply --paper-radio-button-label;\n  }\n\n  :host([checked]) #radioLabel {\n    @apply --paper-radio-button-label-checked;\n  }\n\n  #radioLabel:dir(rtl) {\n    margin-left: 0;\n    margin-right: var(--paper-radio-button-label-spacing, 10px);\n  }\n\n  #radioLabel[hidden] {\n    display: none;\n  }\n\n  /* disabled state */\n\n  :host([disabled]) #offRadio {\n    border-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled][checked]) #onRadio {\n    background-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled]) #radioLabel {\n    /* slightly darker than the button, so that it's readable */\n    opacity: 0.65;\n  }\n</style>\n\n<div id=\"radioContainer\">\n  <div id=\"offRadio\"></div>\n  <div id=\"onRadio\"></div>\n</div>\n\n<div id=\"radioLabel\"><slot></slot></div>"]);_templateObject21_6bf96330d65d11eaa5e0898854dcb572=function _templateObject21_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject20_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: block;\n      }\n\n      :host([focused]) {\n        outline: none;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      input {\n        /* Firefox sets a min-width on the input, which can cause layout issues */\n        min-width: 0;\n      }\n\n      /* In 1.x, the <input> is distributed to paper-input-container, which styles it.\n      In 2.x the <iron-input> is distributed to paper-input-container, which styles\n      it, but in order for this to work correctly, we need to reset some\n      of the native input's properties to inherit (from the iron-input) */\n      iron-input > input {\n        @apply --paper-input-container-shared-input-style;\n        font-family: inherit;\n        font-weight: inherit;\n        font-size: inherit;\n        letter-spacing: inherit;\n        word-spacing: inherit;\n        line-height: inherit;\n        text-shadow: inherit;\n        color: inherit;\n        cursor: inherit;\n      }\n\n      input:disabled {\n        @apply --paper-input-container-input-disabled;\n      }\n\n      input::-webkit-outer-spin-button,\n      input::-webkit-inner-spin-button {\n        @apply --paper-input-container-input-webkit-spinner;\n      }\n\n      input::-webkit-clear-button {\n        @apply --paper-input-container-input-webkit-clear;\n      }\n\n      input::-webkit-calendar-picker-indicator {\n        @apply --paper-input-container-input-webkit-calendar-picker-indicator;\n      }\n\n      input::-webkit-input-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input:-moz-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input::-moz-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input::-ms-clear {\n        @apply --paper-input-container-ms-clear;\n      }\n\n      input::-ms-reveal {\n        @apply --paper-input-container-ms-reveal;\n      }\n\n      input:-ms-input-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      label {\n        pointer-events: none;\n      }\n    </style>\n\n    <paper-input-container id=\"container\" no-label-float=\"[[noLabelFloat]]\" always-float-label=\"[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]\" auto-validate$=\"[[autoValidate]]\" disabled$=\"[[disabled]]\" invalid=\"[[invalid]]\">\n\n      <slot name=\"prefix\" slot=\"prefix\"></slot>\n\n      <label hidden$=\"[[!label]]\" aria-hidden=\"true\" for$=\"[[_inputId]]\" slot=\"label\">[[label]]</label>\n\n      <!-- Need to bind maxlength so that the paper-input-char-counter works correctly -->\n      <iron-input bind-value=\"{{value}}\" slot=\"input\" class=\"input-element\" id$=\"[[_inputId]]\" maxlength$=\"[[maxlength]]\" allowed-pattern=\"[[allowedPattern]]\" invalid=\"{{invalid}}\" validator=\"[[validator]]\">\n        <input aria-labelledby$=\"[[_ariaLabelledBy]]\" aria-describedby$=\"[[_ariaDescribedBy]]\" disabled$=\"[[disabled]]\" title$=\"[[title]]\" type$=\"[[type]]\" pattern$=\"[[pattern]]\" required$=\"[[required]]\" autocomplete$=\"[[autocomplete]]\" autofocus$=\"[[autofocus]]\" inputmode$=\"[[inputmode]]\" minlength$=\"[[minlength]]\" maxlength$=\"[[maxlength]]\" min$=\"[[min]]\" max$=\"[[max]]\" step$=\"[[step]]\" name$=\"[[name]]\" placeholder$=\"[[placeholder]]\" readonly$=\"[[readonly]]\" list$=\"[[list]]\" size$=\"[[size]]\" autocapitalize$=\"[[autocapitalize]]\" autocorrect$=\"[[autocorrect]]\" on-change=\"_onChange\" tabindex$=\"[[tabIndex]]\" autosave$=\"[[autosave]]\" results$=\"[[results]]\" accept$=\"[[accept]]\" multiple$=\"[[multiple]]\" role$=\"[[inputRole]]\" aria-haspopup$=\"[[inputAriaHaspopup]]\">\n      </iron-input>\n\n      <slot name=\"suffix\" slot=\"suffix\"></slot>\n\n      <template is=\"dom-if\" if=\"[[errorMessage]]\">\n        <paper-input-error aria-live=\"assertive\" slot=\"add-on\">[[errorMessage]]</paper-input-error>\n      </template>\n\n      <template is=\"dom-if\" if=\"[[charCounter]]\">\n        <paper-input-char-counter slot=\"add-on\"></paper-input-char-counter>\n      </template>\n\n    </paper-input-container>\n  "]);_templateObject20_6bf96330d65d11eaa5e0898854dcb572=function _templateObject20_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject19_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: inline-block;\n        visibility: hidden;\n\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n\n        @apply --paper-font-caption;\n        @apply --paper-input-error;\n        position: absolute;\n        left:0;\n        right:0;\n      }\n\n      :host([invalid]) {\n        visibility: visible;\n      }\n\n      #a11yWrapper {\n        visibility: hidden;\n      }\n\n      :host([invalid]) #a11yWrapper {\n        visibility: visible;\n      }\n    </style>\n\n    <!--\n    If the paper-input-error element is directly referenced by an\n    `aria-describedby` attribute, such as when used as a paper-input add-on,\n    then applying `visibility: hidden;` to the paper-input-error element itself\n    does not hide the error.\n\n    For more information, see:\n    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description\n    -->\n    <div id=\"a11yWrapper\">\n      <slot></slot>\n    </div>\n"],["\n    <style>\n      :host {\n        display: inline-block;\n        visibility: hidden;\n\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n\n        @apply --paper-font-caption;\n        @apply --paper-input-error;\n        position: absolute;\n        left:0;\n        right:0;\n      }\n\n      :host([invalid]) {\n        visibility: visible;\n      }\n\n      #a11yWrapper {\n        visibility: hidden;\n      }\n\n      :host([invalid]) #a11yWrapper {\n        visibility: visible;\n      }\n    </style>\n\n    <!--\n    If the paper-input-error element is directly referenced by an\n    \\`aria-describedby\\` attribute, such as when used as a paper-input add-on,\n    then applying \\`visibility: hidden;\\` to the paper-input-error element itself\n    does not hide the error.\n\n    For more information, see:\n    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description\n    -->\n    <div id=\"a11yWrapper\">\n      <slot></slot>\n    </div>\n"]);_templateObject19_6bf96330d65d11eaa5e0898854dcb572=function _templateObject19_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject18_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: block;\n        padding: 8px 0;\n        @apply --paper-input-container;\n      }\n\n      :host([inline]) {\n        display: inline-block;\n      }\n\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.33;\n\n        @apply --paper-input-container-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      .floated-label-placeholder {\n        @apply --paper-font-caption;\n      }\n\n      .underline {\n        height: 2px;\n        position: relative;\n      }\n\n      .focused-line {\n        @apply --layout-fit;\n        border-bottom: 2px solid var(--paper-input-container-focus-color, var(--primary-color));\n\n        -webkit-transform-origin: center center;\n        transform-origin: center center;\n        -webkit-transform: scale3d(0,1,1);\n        transform: scale3d(0,1,1);\n\n        @apply --paper-input-container-underline-focus;\n      }\n\n      .underline.is-highlighted .focused-line {\n        -webkit-transform: none;\n        transform: none;\n        -webkit-transition: -webkit-transform 0.25s;\n        transition: transform 0.25s;\n\n        @apply --paper-transition-easing;\n      }\n\n      .underline.is-invalid .focused-line {\n        border-color: var(--paper-input-container-invalid-color, var(--error-color));\n        -webkit-transform: none;\n        transform: none;\n        -webkit-transition: -webkit-transform 0.25s;\n        transition: transform 0.25s;\n\n        @apply --paper-transition-easing;\n      }\n\n      .unfocused-line {\n        @apply --layout-fit;\n        border-bottom: 1px solid var(--paper-input-container-color, var(--secondary-text-color));\n        @apply --paper-input-container-underline;\n      }\n\n      :host([disabled]) .unfocused-line {\n        border-bottom: 1px dashed;\n        border-color: var(--paper-input-container-color, var(--secondary-text-color));\n        @apply --paper-input-container-underline-disabled;\n      }\n\n      .input-wrapper {\n        @apply --layout-horizontal;\n        @apply --layout-center;\n        position: relative;\n      }\n\n      .input-content {\n        @apply --layout-flex-auto;\n        @apply --layout-relative;\n        max-width: 100%;\n      }\n\n      .input-content ::slotted(label),\n      .input-content ::slotted(.paper-input-label) {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        font: inherit;\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n        -webkit-transition: -webkit-transform 0.25s, width 0.25s;\n        transition: transform 0.25s, width 0.25s;\n        -webkit-transform-origin: left top;\n        transform-origin: left top;\n        /* Fix for safari not focusing 0-height date/time inputs with -webkit-apperance: none; */\n        min-height: 1px;\n\n        @apply --paper-font-common-nowrap;\n        @apply --paper-font-subhead;\n        @apply --paper-input-container-label;\n        @apply --paper-transition-easing;\n      }\n\n\n      .input-content ::slotted(label):before,\n      .input-content ::slotted(.paper-input-label):before {\n        @apply --paper-input-container-label-before;\n      }\n\n      .input-content ::slotted(label):after,\n      .input-content ::slotted(.paper-input-label):after {\n        @apply --paper-input-container-label-after;\n      }\n\n      .input-content.label-is-floating ::slotted(label),\n      .input-content.label-is-floating ::slotted(.paper-input-label) {\n        -webkit-transform: translateY(-75%) scale(0.75);\n        transform: translateY(-75%) scale(0.75);\n\n        /* Since we scale to 75/100 of the size, we actually have 100/75 of the\n        original space now available */\n        width: 133%;\n\n        @apply --paper-input-container-label-floating;\n      }\n\n      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(label),\n      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(.paper-input-label) {\n        right: 0;\n        left: auto;\n        -webkit-transform-origin: right top;\n        transform-origin: right top;\n      }\n\n      .input-content.label-is-highlighted ::slotted(label),\n      .input-content.label-is-highlighted ::slotted(.paper-input-label) {\n        color: var(--paper-input-container-focus-color, var(--primary-color));\n\n        @apply --paper-input-container-label-focus;\n      }\n\n      .input-content.is-invalid ::slotted(label),\n      .input-content.is-invalid ::slotted(.paper-input-label) {\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n      }\n\n      .input-content.label-is-hidden ::slotted(label),\n      .input-content.label-is-hidden ::slotted(.paper-input-label) {\n        visibility: hidden;\n      }\n\n      .input-content ::slotted(input),\n      .input-content ::slotted(iron-input),\n      .input-content ::slotted(textarea),\n      .input-content ::slotted(iron-autogrow-textarea),\n      .input-content ::slotted(.paper-input-input) {\n        @apply --paper-input-container-shared-input-style;\n        /* The apply shim doesn't apply the nested color custom property,\n          so we have to re-apply it here. */\n        color: var(--paper-input-container-input-color, var(--primary-text-color));\n        @apply --paper-input-container-input;\n      }\n\n      .input-content ::slotted(input)::-webkit-outer-spin-button,\n      .input-content ::slotted(input)::-webkit-inner-spin-button {\n        @apply --paper-input-container-input-webkit-spinner;\n      }\n\n      .input-content.focused ::slotted(input),\n      .input-content.focused ::slotted(iron-input),\n      .input-content.focused ::slotted(textarea),\n      .input-content.focused ::slotted(iron-autogrow-textarea),\n      .input-content.focused ::slotted(.paper-input-input) {\n        @apply --paper-input-container-input-focus;\n      }\n\n      .input-content.is-invalid ::slotted(input),\n      .input-content.is-invalid ::slotted(iron-input),\n      .input-content.is-invalid ::slotted(textarea),\n      .input-content.is-invalid ::slotted(iron-autogrow-textarea),\n      .input-content.is-invalid ::slotted(.paper-input-input) {\n        @apply --paper-input-container-input-invalid;\n      }\n\n      .prefix ::slotted(*) {\n        display: inline-block;\n        @apply --paper-font-subhead;\n        @apply --layout-flex-none;\n        @apply --paper-input-prefix;\n      }\n\n      .suffix ::slotted(*) {\n        display: inline-block;\n        @apply --paper-font-subhead;\n        @apply --layout-flex-none;\n\n        @apply --paper-input-suffix;\n      }\n\n      /* Firefox sets a min-width on the input, which can cause layout issues */\n      .input-content ::slotted(input) {\n        min-width: 0;\n      }\n\n      .input-content ::slotted(textarea) {\n        resize: none;\n      }\n\n      .add-on-content {\n        position: relative;\n      }\n\n      .add-on-content.is-invalid ::slotted(*) {\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n      }\n\n      .add-on-content.is-highlighted ::slotted(*) {\n        color: var(--paper-input-container-focus-color, var(--primary-color));\n      }\n    </style>\n\n    <div class=\"floated-label-placeholder\" aria-hidden=\"true\" hidden=\"[[noLabelFloat]]\">&nbsp;</div>\n\n    <div class=\"input-wrapper\">\n      <span class=\"prefix\"><slot name=\"prefix\"></slot></span>\n\n      <div class$=\"[[_computeInputContentClass(noLabelFloat,alwaysFloatLabel,focused,invalid,_inputHasContent)]]\" id=\"labelAndInputContainer\">\n        <slot name=\"label\"></slot>\n        <slot name=\"input\"></slot>\n      </div>\n\n      <span class=\"suffix\"><slot name=\"suffix\"></slot></span>\n    </div>\n\n    <div class$=\"[[_computeUnderlineClass(focused,invalid)]]\">\n      <div class=\"unfocused-line\"></div>\n      <div class=\"focused-line\"></div>\n    </div>\n\n    <div class$=\"[[_computeAddOnContentClass(focused,invalid)]]\">\n      <slot name=\"add-on\"></slot>\n    </div>\n"]);_templateObject18_6bf96330d65d11eaa5e0898854dcb572=function _templateObject18_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject17_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n<custom-style>\n  <style is=\"custom-style\">\n    html {\n      --paper-input-container-shared-input-style: {\n        position: relative; /* to make a stacking context */\n        outline: none;\n        box-shadow: none;\n        padding: 0;\n        margin: 0;\n        width: 100%;\n        max-width: 100%;\n        background: transparent;\n        border: none;\n        color: var(--paper-input-container-input-color, var(--primary-text-color));\n        -webkit-appearance: none;\n        text-align: inherit;\n        vertical-align: var(--paper-input-container-input-align, bottom);\n\n        @apply --paper-font-subhead;\n      };\n    }\n  </style>\n</custom-style>\n"]);_templateObject17_6bf96330d65d11eaa5e0898854dcb572=function _templateObject17_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject16_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: inline-block;\n        float: right;\n\n        @apply --paper-font-caption;\n        @apply --paper-input-char-counter;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:dir(rtl)) {\n        float: left;\n      }\n    </style>\n\n    <span>[[_charCounterStr]]</span>\n"]);_templateObject16_6bf96330d65d11eaa5e0898854dcb572=function _templateObject16_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject15_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["<custom-style>\n  <style is=\"custom-style\">\n    html {\n\n      /* Shared Styles */\n      --paper-font-common-base: {\n        font-family: 'Roboto', 'Noto', sans-serif;\n        -webkit-font-smoothing: antialiased;\n      };\n\n      --paper-font-common-code: {\n        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;\n        -webkit-font-smoothing: antialiased;\n      };\n\n      --paper-font-common-expensive-kerning: {\n        text-rendering: optimizeLegibility;\n      };\n\n      --paper-font-common-nowrap: {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      };\n\n      /* Material Font Styles */\n\n      --paper-font-display4: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 112px;\n        font-weight: 300;\n        letter-spacing: -.044em;\n        line-height: 120px;\n      };\n\n      --paper-font-display3: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 56px;\n        font-weight: 400;\n        letter-spacing: -.026em;\n        line-height: 60px;\n      };\n\n      --paper-font-display2: {\n        @apply --paper-font-common-base;\n\n        font-size: 45px;\n        font-weight: 400;\n        letter-spacing: -.018em;\n        line-height: 48px;\n      };\n\n      --paper-font-display1: {\n        @apply --paper-font-common-base;\n\n        font-size: 34px;\n        font-weight: 400;\n        letter-spacing: -.01em;\n        line-height: 40px;\n      };\n\n      --paper-font-headline: {\n        @apply --paper-font-common-base;\n\n        font-size: 24px;\n        font-weight: 400;\n        letter-spacing: -.012em;\n        line-height: 32px;\n      };\n\n      --paper-font-title: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 20px;\n        font-weight: 500;\n        line-height: 28px;\n      };\n\n      --paper-font-subhead: {\n        @apply --paper-font-common-base;\n\n        font-size: 16px;\n        font-weight: 400;\n        line-height: 24px;\n      };\n\n      --paper-font-body2: {\n        @apply --paper-font-common-base;\n\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 24px;\n      };\n\n      --paper-font-body1: {\n        @apply --paper-font-common-base;\n\n        font-size: 14px;\n        font-weight: 400;\n        line-height: 20px;\n      };\n\n      --paper-font-caption: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 12px;\n        font-weight: 400;\n        letter-spacing: 0.011em;\n        line-height: 20px;\n      };\n\n      --paper-font-menu: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 13px;\n        font-weight: 500;\n        line-height: 24px;\n      };\n\n      --paper-font-button: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 14px;\n        font-weight: 500;\n        letter-spacing: 0.018em;\n        line-height: 24px;\n        text-transform: uppercase;\n      };\n\n      --paper-font-code2: {\n        @apply --paper-font-common-code;\n\n        font-size: 14px;\n        font-weight: 700;\n        line-height: 20px;\n      };\n\n      --paper-font-code1: {\n        @apply --paper-font-common-code;\n\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 20px;\n      };\n\n    }\n\n  </style>\n</custom-style>"]);_templateObject15_6bf96330d65d11eaa5e0898854dcb572=function _templateObject15_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject14_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: pointer;\n        z-index: 0;\n        line-height: 1;\n\n        width: 40px;\n        height: 40px;\n\n        /*\n          NOTE: Both values are needed, since some phones require the value to\n          be `transparent`.\n        */\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-tap-highlight-color: transparent;\n\n        /* Because of polymer/2558, this style has lower specificity than * */\n        box-sizing: border-box !important;\n\n        @apply --paper-icon-button;\n      }\n\n      :host #ink {\n        color: var(--paper-icon-button-ink-color, var(--primary-text-color));\n        opacity: 0.6;\n      }\n\n      :host([disabled]) {\n        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));\n        pointer-events: none;\n        cursor: auto;\n\n        @apply --paper-icon-button-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:hover) {\n        @apply --paper-icon-button-hover;\n      }\n\n      iron-icon {\n        --iron-icon-width: 100%;\n        --iron-icon-height: 100%;\n      }\n    </style>\n\n    <iron-icon id=\"icon\" src=\"[[src]]\" icon=\"[[icon]]\"\n               alt$=\"[[alt]]\"></iron-icon>\n  "],["\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: pointer;\n        z-index: 0;\n        line-height: 1;\n\n        width: 40px;\n        height: 40px;\n\n        /*\n          NOTE: Both values are needed, since some phones require the value to\n          be \\`transparent\\`.\n        */\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-tap-highlight-color: transparent;\n\n        /* Because of polymer/2558, this style has lower specificity than * */\n        box-sizing: border-box !important;\n\n        @apply --paper-icon-button;\n      }\n\n      :host #ink {\n        color: var(--paper-icon-button-ink-color, var(--primary-text-color));\n        opacity: 0.6;\n      }\n\n      :host([disabled]) {\n        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));\n        pointer-events: none;\n        cursor: auto;\n\n        @apply --paper-icon-button-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:hover) {\n        @apply --paper-icon-button-hover;\n      }\n\n      iron-icon {\n        --iron-icon-width: 100%;\n        --iron-icon-height: 100%;\n      }\n    </style>\n\n    <iron-icon id=\"icon\" src=\"[[src]]\" icon=\"[[icon]]\"\n               alt$=\"[[alt]]\"></iron-icon>\n  "]);_templateObject14_6bf96330d65d11eaa5e0898854dcb572=function _templateObject14_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject13_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"paper-material-styles\">\n      :host {\n        display: inline-block;\n        position: relative;\n        box-sizing: border-box;\n        background-color: var(--paper-card-background-color, var(--primary-background-color));\n        border-radius: 2px;\n\n        @apply --paper-font-common-base;\n        @apply --paper-card;\n      }\n\n      /* IE 10 support for HTML5 hidden attr */\n      :host([hidden]), [hidden] {\n        display: none !important;\n      }\n\n      .header {\n        position: relative;\n        border-top-left-radius: inherit;\n        border-top-right-radius: inherit;\n        overflow: hidden;\n\n        @apply --paper-card-header;\n      }\n\n      .header iron-image {\n        display: block;\n        width: 100%;\n        --iron-image-width: 100%;\n        pointer-events: none;\n\n        @apply --paper-card-header-image;\n      }\n\n      .header .title-text {\n        padding: 16px;\n        font-size: 24px;\n        font-weight: 400;\n        color: var(--paper-card-header-color, #000);\n\n        @apply --paper-card-header-text;\n      }\n\n      .header .title-text.over-image {\n        position: absolute;\n        bottom: 0px;\n\n        @apply --paper-card-header-image-text;\n      }\n\n      :host ::slotted(.card-content) {\n        padding: 16px;\n        position:relative;\n\n        @apply --paper-card-content;\n      }\n\n      :host ::slotted(.card-actions) {\n        border-top: 1px solid #e8e8e8;\n        padding: 5px 16px;\n        position:relative;\n\n        @apply --paper-card-actions;\n      }\n\n      :host([elevation=\"1\"]) {\n        @apply --paper-material-elevation-1;\n      }\n\n      :host([elevation=\"2\"]) {\n        @apply --paper-material-elevation-2;\n      }\n\n      :host([elevation=\"3\"]) {\n        @apply --paper-material-elevation-3;\n      }\n\n      :host([elevation=\"4\"]) {\n        @apply --paper-material-elevation-4;\n      }\n\n      :host([elevation=\"5\"]) {\n        @apply --paper-material-elevation-5;\n      }\n    </style>\n\n    <div class=\"header\">\n      <iron-image hidden$=\"[[!image]]\" aria-hidden$=\"[[_isHidden(image)]]\" src=\"[[image]]\" alt=\"[[alt]]\" placeholder=\"[[placeholderImage]]\" preload=\"[[preloadImage]]\" fade=\"[[fadeImage]]\"></iron-image>\n      <div hidden$=\"[[!heading]]\" class$=\"title-text [[_computeHeadingClass(image)]]\">[[heading]]</div>\n    </div>\n\n    <slot></slot>\n"],["\n    <style include=\"paper-material-styles\">\n      :host {\n        display: inline-block;\n        position: relative;\n        box-sizing: border-box;\n        background-color: var(--paper-card-background-color, var(--primary-background-color));\n        border-radius: 2px;\n\n        @apply --paper-font-common-base;\n        @apply --paper-card;\n      }\n\n      /* IE 10 support for HTML5 hidden attr */\n      :host([hidden]), [hidden] {\n        display: none !important;\n      }\n\n      .header {\n        position: relative;\n        border-top-left-radius: inherit;\n        border-top-right-radius: inherit;\n        overflow: hidden;\n\n        @apply --paper-card-header;\n      }\n\n      .header iron-image {\n        display: block;\n        width: 100%;\n        --iron-image-width: 100%;\n        pointer-events: none;\n\n        @apply --paper-card-header-image;\n      }\n\n      .header .title-text {\n        padding: 16px;\n        font-size: 24px;\n        font-weight: 400;\n        color: var(--paper-card-header-color, #000);\n\n        @apply --paper-card-header-text;\n      }\n\n      .header .title-text.over-image {\n        position: absolute;\n        bottom: 0px;\n\n        @apply --paper-card-header-image-text;\n      }\n\n      :host ::slotted(.card-content) {\n        padding: 16px;\n        position:relative;\n\n        @apply --paper-card-content;\n      }\n\n      :host ::slotted(.card-actions) {\n        border-top: 1px solid #e8e8e8;\n        padding: 5px 16px;\n        position:relative;\n\n        @apply --paper-card-actions;\n      }\n\n      :host([elevation=\"1\"]) {\n        @apply --paper-material-elevation-1;\n      }\n\n      :host([elevation=\"2\"]) {\n        @apply --paper-material-elevation-2;\n      }\n\n      :host([elevation=\"3\"]) {\n        @apply --paper-material-elevation-3;\n      }\n\n      :host([elevation=\"4\"]) {\n        @apply --paper-material-elevation-4;\n      }\n\n      :host([elevation=\"5\"]) {\n        @apply --paper-material-elevation-5;\n      }\n    </style>\n\n    <div class=\"header\">\n      <iron-image hidden\\$=\"[[!image]]\" aria-hidden\\$=\"[[_isHidden(image)]]\" src=\"[[image]]\" alt=\"[[alt]]\" placeholder=\"[[placeholderImage]]\" preload=\"[[preloadImage]]\" fade=\"[[fadeImage]]\"></iron-image>\n      <div hidden\\$=\"[[!heading]]\" class\\$=\"title-text [[_computeHeadingClass(image)]]\">[[heading]]</div>\n    </div>\n\n    <slot></slot>\n"]);_templateObject13_6bf96330d65d11eaa5e0898854dcb572=function _templateObject13_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject12_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n<custom-style>\n  <style is=\"custom-style\">\n    html {\n      /*\n       * You can use these generic variables in your elements for easy theming.\n       * For example, if all your elements use `--primary-text-color` as its main\n       * color, then switching from a light to a dark theme is just a matter of\n       * changing the value of `--primary-text-color` in your application.\n       */\n      --primary-text-color: var(--light-theme-text-color);\n      --primary-background-color: var(--light-theme-background-color);\n      --secondary-text-color: var(--light-theme-secondary-color);\n      --disabled-text-color: var(--light-theme-disabled-color);\n      --divider-color: var(--light-theme-divider-color);\n      --error-color: var(--paper-deep-orange-a700);\n\n      /*\n       * Primary and accent colors. Also see color.js for more colors.\n       */\n      --primary-color: var(--paper-indigo-500);\n      --light-primary-color: var(--paper-indigo-100);\n      --dark-primary-color: var(--paper-indigo-700);\n\n      --accent-color: var(--paper-pink-a200);\n      --light-accent-color: var(--paper-pink-a100);\n      --dark-accent-color: var(--paper-pink-a400);\n\n\n      /*\n       * Material Design Light background theme\n       */\n      --light-theme-background-color: #ffffff;\n      --light-theme-base-color: #000000;\n      --light-theme-text-color: var(--paper-grey-900);\n      --light-theme-secondary-color: #737373;  /* for secondary text and icons */\n      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */\n      --light-theme-divider-color: #dbdbdb;\n\n      /*\n       * Material Design Dark background theme\n       */\n      --dark-theme-background-color: var(--paper-grey-900);\n      --dark-theme-base-color: #ffffff;\n      --dark-theme-text-color: #ffffff;\n      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */\n      --dark-theme-disabled-color: #646464;  /* disabled/hint text */\n      --dark-theme-divider-color: #3c3c3c;\n\n      /*\n       * Deprecated values because of their confusing names.\n       */\n      --text-primary-color: var(--dark-theme-text-color);\n      --default-primary-color: var(--primary-color);\n    }\n  </style>\n</custom-style>"],["\n<custom-style>\n  <style is=\"custom-style\">\n    html {\n      /*\n       * You can use these generic variables in your elements for easy theming.\n       * For example, if all your elements use \\`--primary-text-color\\` as its main\n       * color, then switching from a light to a dark theme is just a matter of\n       * changing the value of \\`--primary-text-color\\` in your application.\n       */\n      --primary-text-color: var(--light-theme-text-color);\n      --primary-background-color: var(--light-theme-background-color);\n      --secondary-text-color: var(--light-theme-secondary-color);\n      --disabled-text-color: var(--light-theme-disabled-color);\n      --divider-color: var(--light-theme-divider-color);\n      --error-color: var(--paper-deep-orange-a700);\n\n      /*\n       * Primary and accent colors. Also see color.js for more colors.\n       */\n      --primary-color: var(--paper-indigo-500);\n      --light-primary-color: var(--paper-indigo-100);\n      --dark-primary-color: var(--paper-indigo-700);\n\n      --accent-color: var(--paper-pink-a200);\n      --light-accent-color: var(--paper-pink-a100);\n      --dark-accent-color: var(--paper-pink-a400);\n\n\n      /*\n       * Material Design Light background theme\n       */\n      --light-theme-background-color: #ffffff;\n      --light-theme-base-color: #000000;\n      --light-theme-text-color: var(--paper-grey-900);\n      --light-theme-secondary-color: #737373;  /* for secondary text and icons */\n      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */\n      --light-theme-divider-color: #dbdbdb;\n\n      /*\n       * Material Design Dark background theme\n       */\n      --dark-theme-background-color: var(--paper-grey-900);\n      --dark-theme-base-color: #ffffff;\n      --dark-theme-text-color: #ffffff;\n      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */\n      --dark-theme-disabled-color: #646464;  /* disabled/hint text */\n      --dark-theme-divider-color: #3c3c3c;\n\n      /*\n       * Deprecated values because of their confusing names.\n       */\n      --text-primary-color: var(--dark-theme-text-color);\n      --default-primary-color: var(--primary-color);\n    }\n  </style>\n</custom-style>"]);_templateObject12_6bf96330d65d11eaa5e0898854dcb572=function _templateObject12_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject11_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n<custom-style>\n  <style is=\"custom-style\">\n    html {\n\n      /* Material Design color palette for Google products */\n\n      --google-red-100: #f4c7c3;\n      --google-red-300: #e67c73;\n      --google-red-500: #db4437;\n      --google-red-700: #c53929;\n\n      --google-blue-100: #c6dafc;\n      --google-blue-300: #7baaf7;\n      --google-blue-500: #4285f4;\n      --google-blue-700: #3367d6;\n\n      --google-green-100: #b7e1cd;\n      --google-green-300: #57bb8a;\n      --google-green-500: #0f9d58;\n      --google-green-700: #0b8043;\n\n      --google-yellow-100: #fce8b2;\n      --google-yellow-300: #f7cb4d;\n      --google-yellow-500: #f4b400;\n      --google-yellow-700: #f09300;\n\n      --google-grey-100: #f5f5f5;\n      --google-grey-300: #e0e0e0;\n      --google-grey-500: #9e9e9e;\n      --google-grey-700: #616161;\n\n      /* Material Design color palette from online spec document */\n\n      --paper-red-50: #ffebee;\n      --paper-red-100: #ffcdd2;\n      --paper-red-200: #ef9a9a;\n      --paper-red-300: #e57373;\n      --paper-red-400: #ef5350;\n      --paper-red-500: #f44336;\n      --paper-red-600: #e53935;\n      --paper-red-700: #d32f2f;\n      --paper-red-800: #c62828;\n      --paper-red-900: #b71c1c;\n      --paper-red-a100: #ff8a80;\n      --paper-red-a200: #ff5252;\n      --paper-red-a400: #ff1744;\n      --paper-red-a700: #d50000;\n\n      --paper-pink-50: #fce4ec;\n      --paper-pink-100: #f8bbd0;\n      --paper-pink-200: #f48fb1;\n      --paper-pink-300: #f06292;\n      --paper-pink-400: #ec407a;\n      --paper-pink-500: #e91e63;\n      --paper-pink-600: #d81b60;\n      --paper-pink-700: #c2185b;\n      --paper-pink-800: #ad1457;\n      --paper-pink-900: #880e4f;\n      --paper-pink-a100: #ff80ab;\n      --paper-pink-a200: #ff4081;\n      --paper-pink-a400: #f50057;\n      --paper-pink-a700: #c51162;\n\n      --paper-purple-50: #f3e5f5;\n      --paper-purple-100: #e1bee7;\n      --paper-purple-200: #ce93d8;\n      --paper-purple-300: #ba68c8;\n      --paper-purple-400: #ab47bc;\n      --paper-purple-500: #9c27b0;\n      --paper-purple-600: #8e24aa;\n      --paper-purple-700: #7b1fa2;\n      --paper-purple-800: #6a1b9a;\n      --paper-purple-900: #4a148c;\n      --paper-purple-a100: #ea80fc;\n      --paper-purple-a200: #e040fb;\n      --paper-purple-a400: #d500f9;\n      --paper-purple-a700: #aa00ff;\n\n      --paper-deep-purple-50: #ede7f6;\n      --paper-deep-purple-100: #d1c4e9;\n      --paper-deep-purple-200: #b39ddb;\n      --paper-deep-purple-300: #9575cd;\n      --paper-deep-purple-400: #7e57c2;\n      --paper-deep-purple-500: #673ab7;\n      --paper-deep-purple-600: #5e35b1;\n      --paper-deep-purple-700: #512da8;\n      --paper-deep-purple-800: #4527a0;\n      --paper-deep-purple-900: #311b92;\n      --paper-deep-purple-a100: #b388ff;\n      --paper-deep-purple-a200: #7c4dff;\n      --paper-deep-purple-a400: #651fff;\n      --paper-deep-purple-a700: #6200ea;\n\n      --paper-indigo-50: #e8eaf6;\n      --paper-indigo-100: #c5cae9;\n      --paper-indigo-200: #9fa8da;\n      --paper-indigo-300: #7986cb;\n      --paper-indigo-400: #5c6bc0;\n      --paper-indigo-500: #3f51b5;\n      --paper-indigo-600: #3949ab;\n      --paper-indigo-700: #303f9f;\n      --paper-indigo-800: #283593;\n      --paper-indigo-900: #1a237e;\n      --paper-indigo-a100: #8c9eff;\n      --paper-indigo-a200: #536dfe;\n      --paper-indigo-a400: #3d5afe;\n      --paper-indigo-a700: #304ffe;\n\n      --paper-blue-50: #e3f2fd;\n      --paper-blue-100: #bbdefb;\n      --paper-blue-200: #90caf9;\n      --paper-blue-300: #64b5f6;\n      --paper-blue-400: #42a5f5;\n      --paper-blue-500: #2196f3;\n      --paper-blue-600: #1e88e5;\n      --paper-blue-700: #1976d2;\n      --paper-blue-800: #1565c0;\n      --paper-blue-900: #0d47a1;\n      --paper-blue-a100: #82b1ff;\n      --paper-blue-a200: #448aff;\n      --paper-blue-a400: #2979ff;\n      --paper-blue-a700: #2962ff;\n\n      --paper-light-blue-50: #e1f5fe;\n      --paper-light-blue-100: #b3e5fc;\n      --paper-light-blue-200: #81d4fa;\n      --paper-light-blue-300: #4fc3f7;\n      --paper-light-blue-400: #29b6f6;\n      --paper-light-blue-500: #03a9f4;\n      --paper-light-blue-600: #039be5;\n      --paper-light-blue-700: #0288d1;\n      --paper-light-blue-800: #0277bd;\n      --paper-light-blue-900: #01579b;\n      --paper-light-blue-a100: #80d8ff;\n      --paper-light-blue-a200: #40c4ff;\n      --paper-light-blue-a400: #00b0ff;\n      --paper-light-blue-a700: #0091ea;\n\n      --paper-cyan-50: #e0f7fa;\n      --paper-cyan-100: #b2ebf2;\n      --paper-cyan-200: #80deea;\n      --paper-cyan-300: #4dd0e1;\n      --paper-cyan-400: #26c6da;\n      --paper-cyan-500: #00bcd4;\n      --paper-cyan-600: #00acc1;\n      --paper-cyan-700: #0097a7;\n      --paper-cyan-800: #00838f;\n      --paper-cyan-900: #006064;\n      --paper-cyan-a100: #84ffff;\n      --paper-cyan-a200: #18ffff;\n      --paper-cyan-a400: #00e5ff;\n      --paper-cyan-a700: #00b8d4;\n\n      --paper-teal-50: #e0f2f1;\n      --paper-teal-100: #b2dfdb;\n      --paper-teal-200: #80cbc4;\n      --paper-teal-300: #4db6ac;\n      --paper-teal-400: #26a69a;\n      --paper-teal-500: #009688;\n      --paper-teal-600: #00897b;\n      --paper-teal-700: #00796b;\n      --paper-teal-800: #00695c;\n      --paper-teal-900: #004d40;\n      --paper-teal-a100: #a7ffeb;\n      --paper-teal-a200: #64ffda;\n      --paper-teal-a400: #1de9b6;\n      --paper-teal-a700: #00bfa5;\n\n      --paper-green-50: #e8f5e9;\n      --paper-green-100: #c8e6c9;\n      --paper-green-200: #a5d6a7;\n      --paper-green-300: #81c784;\n      --paper-green-400: #66bb6a;\n      --paper-green-500: #4caf50;\n      --paper-green-600: #43a047;\n      --paper-green-700: #388e3c;\n      --paper-green-800: #2e7d32;\n      --paper-green-900: #1b5e20;\n      --paper-green-a100: #b9f6ca;\n      --paper-green-a200: #69f0ae;\n      --paper-green-a400: #00e676;\n      --paper-green-a700: #00c853;\n\n      --paper-light-green-50: #f1f8e9;\n      --paper-light-green-100: #dcedc8;\n      --paper-light-green-200: #c5e1a5;\n      --paper-light-green-300: #aed581;\n      --paper-light-green-400: #9ccc65;\n      --paper-light-green-500: #8bc34a;\n      --paper-light-green-600: #7cb342;\n      --paper-light-green-700: #689f38;\n      --paper-light-green-800: #558b2f;\n      --paper-light-green-900: #33691e;\n      --paper-light-green-a100: #ccff90;\n      --paper-light-green-a200: #b2ff59;\n      --paper-light-green-a400: #76ff03;\n      --paper-light-green-a700: #64dd17;\n\n      --paper-lime-50: #f9fbe7;\n      --paper-lime-100: #f0f4c3;\n      --paper-lime-200: #e6ee9c;\n      --paper-lime-300: #dce775;\n      --paper-lime-400: #d4e157;\n      --paper-lime-500: #cddc39;\n      --paper-lime-600: #c0ca33;\n      --paper-lime-700: #afb42b;\n      --paper-lime-800: #9e9d24;\n      --paper-lime-900: #827717;\n      --paper-lime-a100: #f4ff81;\n      --paper-lime-a200: #eeff41;\n      --paper-lime-a400: #c6ff00;\n      --paper-lime-a700: #aeea00;\n\n      --paper-yellow-50: #fffde7;\n      --paper-yellow-100: #fff9c4;\n      --paper-yellow-200: #fff59d;\n      --paper-yellow-300: #fff176;\n      --paper-yellow-400: #ffee58;\n      --paper-yellow-500: #ffeb3b;\n      --paper-yellow-600: #fdd835;\n      --paper-yellow-700: #fbc02d;\n      --paper-yellow-800: #f9a825;\n      --paper-yellow-900: #f57f17;\n      --paper-yellow-a100: #ffff8d;\n      --paper-yellow-a200: #ffff00;\n      --paper-yellow-a400: #ffea00;\n      --paper-yellow-a700: #ffd600;\n\n      --paper-amber-50: #fff8e1;\n      --paper-amber-100: #ffecb3;\n      --paper-amber-200: #ffe082;\n      --paper-amber-300: #ffd54f;\n      --paper-amber-400: #ffca28;\n      --paper-amber-500: #ffc107;\n      --paper-amber-600: #ffb300;\n      --paper-amber-700: #ffa000;\n      --paper-amber-800: #ff8f00;\n      --paper-amber-900: #ff6f00;\n      --paper-amber-a100: #ffe57f;\n      --paper-amber-a200: #ffd740;\n      --paper-amber-a400: #ffc400;\n      --paper-amber-a700: #ffab00;\n\n      --paper-orange-50: #fff3e0;\n      --paper-orange-100: #ffe0b2;\n      --paper-orange-200: #ffcc80;\n      --paper-orange-300: #ffb74d;\n      --paper-orange-400: #ffa726;\n      --paper-orange-500: #ff9800;\n      --paper-orange-600: #fb8c00;\n      --paper-orange-700: #f57c00;\n      --paper-orange-800: #ef6c00;\n      --paper-orange-900: #e65100;\n      --paper-orange-a100: #ffd180;\n      --paper-orange-a200: #ffab40;\n      --paper-orange-a400: #ff9100;\n      --paper-orange-a700: #ff6500;\n\n      --paper-deep-orange-50: #fbe9e7;\n      --paper-deep-orange-100: #ffccbc;\n      --paper-deep-orange-200: #ffab91;\n      --paper-deep-orange-300: #ff8a65;\n      --paper-deep-orange-400: #ff7043;\n      --paper-deep-orange-500: #ff5722;\n      --paper-deep-orange-600: #f4511e;\n      --paper-deep-orange-700: #e64a19;\n      --paper-deep-orange-800: #d84315;\n      --paper-deep-orange-900: #bf360c;\n      --paper-deep-orange-a100: #ff9e80;\n      --paper-deep-orange-a200: #ff6e40;\n      --paper-deep-orange-a400: #ff3d00;\n      --paper-deep-orange-a700: #dd2c00;\n\n      --paper-brown-50: #efebe9;\n      --paper-brown-100: #d7ccc8;\n      --paper-brown-200: #bcaaa4;\n      --paper-brown-300: #a1887f;\n      --paper-brown-400: #8d6e63;\n      --paper-brown-500: #795548;\n      --paper-brown-600: #6d4c41;\n      --paper-brown-700: #5d4037;\n      --paper-brown-800: #4e342e;\n      --paper-brown-900: #3e2723;\n\n      --paper-grey-50: #fafafa;\n      --paper-grey-100: #f5f5f5;\n      --paper-grey-200: #eeeeee;\n      --paper-grey-300: #e0e0e0;\n      --paper-grey-400: #bdbdbd;\n      --paper-grey-500: #9e9e9e;\n      --paper-grey-600: #757575;\n      --paper-grey-700: #616161;\n      --paper-grey-800: #424242;\n      --paper-grey-900: #212121;\n\n      --paper-blue-grey-50: #eceff1;\n      --paper-blue-grey-100: #cfd8dc;\n      --paper-blue-grey-200: #b0bec5;\n      --paper-blue-grey-300: #90a4ae;\n      --paper-blue-grey-400: #78909c;\n      --paper-blue-grey-500: #607d8b;\n      --paper-blue-grey-600: #546e7a;\n      --paper-blue-grey-700: #455a64;\n      --paper-blue-grey-800: #37474f;\n      --paper-blue-grey-900: #263238;\n\n      /* opacity for dark text on a light background */\n      --dark-divider-opacity: 0.12;\n      --dark-disabled-opacity: 0.38; /* or hint text or icon */\n      --dark-secondary-opacity: 0.54;\n      --dark-primary-opacity: 0.87;\n\n      /* opacity for light text on a dark background */\n      --light-divider-opacity: 0.12;\n      --light-disabled-opacity: 0.3; /* or hint text or icon */\n      --light-secondary-opacity: 0.7;\n      --light-primary-opacity: 1.0;\n\n    }\n\n  </style>\n</custom-style>\n"]);_templateObject11_6bf96330d65d11eaa5e0898854dcb572=function _templateObject11_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject10_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n  <style include=\"paper-material-styles\">\n    /* Need to specify the same specificity as the styles imported from paper-material. */\n    :host {\n      @apply --layout-inline;\n      @apply --layout-center-center;\n      position: relative;\n      box-sizing: border-box;\n      min-width: 5.14em;\n      margin: 0 0.29em;\n      background: transparent;\n      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n      -webkit-tap-highlight-color: transparent;\n      font: inherit;\n      text-transform: uppercase;\n      outline-width: 0;\n      border-radius: 3px;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      -webkit-user-select: none;\n      user-select: none;\n      cursor: pointer;\n      z-index: 0;\n      padding: 0.7em 0.57em;\n\n      @apply --paper-font-common-base;\n      @apply --paper-button;\n    }\n\n    :host([elevation=\"1\"]) {\n      @apply --paper-material-elevation-1;\n    }\n\n    :host([elevation=\"2\"]) {\n      @apply --paper-material-elevation-2;\n    }\n\n    :host([elevation=\"3\"]) {\n      @apply --paper-material-elevation-3;\n    }\n\n    :host([elevation=\"4\"]) {\n      @apply --paper-material-elevation-4;\n    }\n\n    :host([elevation=\"5\"]) {\n      @apply --paper-material-elevation-5;\n    }\n\n    :host([hidden]) {\n      display: none !important;\n    }\n\n    :host([raised].keyboard-focus) {\n      font-weight: bold;\n      @apply --paper-button-raised-keyboard-focus;\n    }\n\n    :host(:not([raised]).keyboard-focus) {\n      font-weight: bold;\n      @apply --paper-button-flat-keyboard-focus;\n    }\n\n    :host([disabled]) {\n      background: none;\n      color: #a8a8a8;\n      cursor: auto;\n      pointer-events: none;\n\n      @apply --paper-button-disabled;\n    }\n\n    :host([disabled][raised]) {\n      background: #eaeaea;\n    }\n\n\n    :host([animated]) {\n      @apply --shadow-transition;\n    }\n\n    paper-ripple {\n      color: var(--paper-button-ink-color);\n    }\n  </style>\n\n  <slot></slot>"]);_templateObject10_6bf96330d65d11eaa5e0898854dcb572=function _templateObject10_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject9_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n<dom-module id=\"paper-material-styles\">\n  <template>\n    <style>\n      html {\n        --paper-material: {\n          display: block;\n          position: relative;\n        };\n        --paper-material-elevation-1: {\n          @apply --shadow-elevation-2dp;\n        };\n        --paper-material-elevation-2: {\n          @apply --shadow-elevation-4dp;\n        };\n        --paper-material-elevation-3: {\n          @apply --shadow-elevation-6dp;\n        };\n        --paper-material-elevation-4: {\n          @apply --shadow-elevation-8dp;\n        };\n        --paper-material-elevation-5: {\n          @apply --shadow-elevation-16dp;\n        };\n      }\n      .paper-material {\n        @apply --paper-material;\n      }\n      .paper-material[elevation=\"1\"] {\n        @apply --paper-material-elevation-1;\n      }\n      .paper-material[elevation=\"2\"] {\n        @apply --paper-material-elevation-2;\n      }\n      .paper-material[elevation=\"3\"] {\n        @apply --paper-material-elevation-3;\n      }\n      .paper-material[elevation=\"4\"] {\n        @apply --paper-material-elevation-4;\n      }\n      .paper-material[elevation=\"5\"] {\n        @apply --paper-material-elevation-5;\n      }\n\n      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */\n      :host {\n        --paper-material: {\n          display: block;\n          position: relative;\n        };\n        --paper-material-elevation-1: {\n          @apply --shadow-elevation-2dp;\n        };\n        --paper-material-elevation-2: {\n          @apply --shadow-elevation-4dp;\n        };\n        --paper-material-elevation-3: {\n          @apply --shadow-elevation-6dp;\n        };\n        --paper-material-elevation-4: {\n          @apply --shadow-elevation-8dp;\n        };\n        --paper-material-elevation-5: {\n          @apply --shadow-elevation-16dp;\n        };\n      }\n      :host(.paper-material) {\n        @apply --paper-material;\n      }\n      :host(.paper-material[elevation=\"1\"]) {\n        @apply --paper-material-elevation-1;\n      }\n      :host(.paper-material[elevation=\"2\"]) {\n        @apply --paper-material-elevation-2;\n      }\n      :host(.paper-material[elevation=\"3\"]) {\n        @apply --paper-material-elevation-3;\n      }\n      :host(.paper-material[elevation=\"4\"]) {\n        @apply --paper-material-elevation-4;\n      }\n      :host(.paper-material[elevation=\"5\"]) {\n        @apply --paper-material-elevation-5;\n      }\n    </style>\n  </template>\n</dom-module>"]);_templateObject9_6bf96330d65d11eaa5e0898854dcb572=function _templateObject9_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject8_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n<custom-style>\n  <style is=\"custom-style\">\n    html {\n\n      --shadow-transition: {\n        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n      };\n\n      --shadow-none: {\n        box-shadow: none;\n      };\n\n      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */\n\n      --shadow-elevation-2dp: {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 5px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      };\n\n      --shadow-elevation-3dp: {\n        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 8px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 3px -2px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-4dp: {\n        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 10px 0 rgba(0, 0, 0, 0.12),\n                    0 2px 4px -1px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-6dp: {\n        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 18px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 5px -1px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-8dp: {\n        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),\n                    0 3px 14px 2px rgba(0, 0, 0, 0.12),\n                    0 5px 5px -3px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-12dp: {\n        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),\n                    0 4px 22px 3px rgba(0, 0, 0, 0.12),\n                    0 6px 7px -4px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-16dp: {\n        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),\n                    0  6px 30px 5px rgba(0, 0, 0, 0.12),\n                    0  8px 10px -5px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-24dp: {\n        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),\n                    0 9px 46px 8px rgba(0, 0, 0, 0.12),\n                    0 11px 15px -7px rgba(0, 0, 0, 0.4);\n      };\n    }\n  </style>\n</custom-style>"]);_templateObject8_6bf96330d65d11eaa5e0898854dcb572=function _templateObject8_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject7_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: block;\n        position: absolute;\n        border-radius: inherit;\n        overflow: hidden;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n\n        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,\n         * creating a node (with a position:absolute) in the middle of an event\n         * handler \"interrupts\" that event handler (which happens when the\n         * ripple is created on demand) */\n        pointer-events: none;\n      }\n\n      :host([animating]) {\n        /* This resolves a rendering issue in Chrome (as of 40) where the\n           ripple is not properly clipped by its parent (which may have\n           rounded corners). See: http://jsbin.com/temexa/4\n\n           Note: We only apply this style conditionally. Otherwise, the browser\n           will create a new compositing layer for every ripple element on the\n           page, and that would be bad. */\n        -webkit-transform: translate(0, 0);\n        transform: translate3d(0, 0, 0);\n      }\n\n      #background,\n      #waves,\n      .wave-container,\n      .wave {\n        pointer-events: none;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n\n      #background,\n      .wave {\n        opacity: 0;\n      }\n\n      #waves,\n      .wave {\n        overflow: hidden;\n      }\n\n      .wave-container,\n      .wave {\n        border-radius: 50%;\n      }\n\n      :host(.circle) #background,\n      :host(.circle) #waves {\n        border-radius: 50%;\n      }\n\n      :host(.circle) .wave-container {\n        overflow: hidden;\n      }\n    </style>\n\n    <div id=\"background\"></div>\n    <div id=\"waves\"></div>\n"]);_templateObject7_6bf96330d65d11eaa5e0898854dcb572=function _templateObject7_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject6_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: inline-block;\n      }\n    </style>\n    <slot id=\"content\"></slot>\n"]);_templateObject6_6bf96330d65d11eaa5e0898854dcb572=function _templateObject6_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject5_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: inline-block;\n        overflow: hidden;\n        position: relative;\n      }\n\n      #baseURIAnchor {\n        display: none;\n      }\n\n      #sizedImgDiv {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        display: none;\n      }\n\n      #img {\n        display: block;\n        width: var(--iron-image-width, auto);\n        height: var(--iron-image-height, auto);\n      }\n\n      :host([sizing]) #sizedImgDiv {\n        display: block;\n      }\n\n      :host([sizing]) #img {\n        display: none;\n      }\n\n      #placeholder {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        background-color: inherit;\n        opacity: 1;\n\n        @apply --iron-image-placeholder;\n      }\n\n      #placeholder.faded-out {\n        transition: opacity 0.5s linear;\n        opacity: 0;\n      }\n    </style>\n\n    <a id=\"baseURIAnchor\" href=\"#\"></a>\n    <div id=\"sizedImgDiv\" role=\"img\" hidden$=\"[[_computeImgDivHidden(sizing)]]\" aria-hidden$=\"[[_computeImgDivARIAHidden(alt)]]\" aria-label$=\"[[_computeImgDivARIALabel(alt, src)]]\"></div>\n    <img id=\"img\" alt$=\"[[alt]]\" hidden$=\"[[_computeImgHidden(sizing)]]\" crossorigin$=\"[[crossorigin]]\" on-load=\"_imgOnLoad\" on-error=\"_imgOnError\">\n    <div id=\"placeholder\" hidden$=\"[[_computePlaceholderHidden(preload, fade, loading, loaded)]]\" class$=\"[[_computePlaceholderClassName(preload, fade, loading, loaded)]]\"></div>\n"]);_templateObject5_6bf96330d65d11eaa5e0898854dcb572=function _templateObject5_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject4_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["<iron-iconset-svg name=\"icons\" size=\"24\">\n<svg><defs>\n<g id=\"3d-rotation\"><path d=\"M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z\"></path></g>\n<g id=\"accessibility\"><path d=\"M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z\"></path></g>\n<g id=\"accessible\"><circle cx=\"12\" cy=\"4\" r=\"2\"></circle><path d=\"M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z\"></path></g>\n<g id=\"account-balance\"><path d=\"M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z\"></path></g>\n<g id=\"account-balance-wallet\"><path d=\"M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"></path></g>\n<g id=\"account-box\"><path d=\"M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z\"></path></g>\n<g id=\"account-circle\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z\"></path></g>\n<g id=\"add\"><path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"></path></g>\n<g id=\"add-alert\"><path d=\"M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z\"></path></g>\n<g id=\"add-box\"><path d=\"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z\"></path></g>\n<g id=\"add-circle\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z\"></path></g>\n<g id=\"add-circle-outline\"><path d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"></path></g>\n<g id=\"add-shopping-cart\"><path d=\"M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z\"></path></g>\n<g id=\"alarm\"><path d=\"M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\"></path></g>\n<g id=\"alarm-add\"><path d=\"M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z\"></path></g>\n<g id=\"alarm-off\"><path d=\"M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z\"></path></g>\n<g id=\"alarm-on\"><path d=\"M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z\"></path></g>\n<g id=\"all-out\"><path d=\"M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z\"></path></g>\n<g id=\"android\"><path d=\"M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z\"></path></g>\n<g id=\"announcement\"><path d=\"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z\"></path></g>\n<g id=\"apps\"><path d=\"M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z\"></path></g>\n<g id=\"archive\"><path d=\"M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z\"></path></g>\n<g id=\"arrow-back\"><path d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"></path></g>\n<g id=\"arrow-downward\"><path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\"></path></g>\n<g id=\"arrow-drop-down\"><path d=\"M7 10l5 5 5-5z\"></path></g>\n<g id=\"arrow-drop-down-circle\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z\"></path></g>\n<g id=\"arrow-drop-up\"><path d=\"M7 14l5-5 5 5z\"></path></g>\n<g id=\"arrow-forward\"><path d=\"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\"></path></g>\n<g id=\"arrow-upward\"><path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\"></path></g>\n<g id=\"aspect-ratio\"><path d=\"M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z\"></path></g>\n<g id=\"assessment\"><path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z\"></path></g>\n<g id=\"assignment\"><path d=\"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z\"></path></g>\n<g id=\"assignment-ind\"><path d=\"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z\"></path></g>\n<g id=\"assignment-late\"><path d=\"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z\"></path></g>\n<g id=\"assignment-return\"><path d=\"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z\"></path></g>\n<g id=\"assignment-returned\"><path d=\"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z\"></path></g>\n<g id=\"assignment-turned-in\"><path d=\"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z\"></path></g>\n<g id=\"attachment\"><path d=\"M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z\"></path></g>\n<g id=\"autorenew\"><path d=\"M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z\"></path></g>\n<g id=\"backspace\"><path d=\"M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z\"></path></g>\n<g id=\"backup\"><path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z\"></path></g>\n<g id=\"block\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z\"></path></g>\n<g id=\"book\"><path d=\"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z\"></path></g>\n<g id=\"bookmark\"><path d=\"M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"bookmark-border\"><path d=\"M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z\"></path></g>\n<g id=\"bug-report\"><path d=\"M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z\"></path></g>\n<g id=\"build\"><path d=\"M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z\"></path></g>\n<g id=\"cached\"><path d=\"M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z\"></path></g>\n<g id=\"camera-enhance\"><path d=\"M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z\"></path></g>\n<g id=\"cancel\"><path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z\"></path></g>\n<g id=\"card-giftcard\"><path d=\"M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z\"></path></g>\n<g id=\"card-membership\"><path d=\"M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z\"></path></g>\n<g id=\"card-travel\"><path d=\"M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z\"></path></g>\n<g id=\"change-history\"><path d=\"M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z\"></path></g>\n<g id=\"check\"><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"></path></g>\n<g id=\"check-box\"><path d=\"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"></path></g>\n<g id=\"check-box-outline-blank\"><path d=\"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"check-circle\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"></path></g>\n<g id=\"chevron-left\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path></g>\n<g id=\"chevron-right\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></g>\n<g id=\"chrome-reader-mode\"><path d=\"M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z\"></path></g>\n<g id=\"class\"><path d=\"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z\"></path></g>\n<g id=\"clear\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"></path></g>\n<g id=\"close\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"></path></g>\n<g id=\"cloud\"><path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z\"></path></g>\n<g id=\"cloud-circle\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z\"></path></g>\n<g id=\"cloud-done\"><path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z\"></path></g>\n<g id=\"cloud-download\"><path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z\"></path></g>\n<g id=\"cloud-off\"><path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z\"></path></g>\n<g id=\"cloud-queue\"><path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z\"></path></g>\n<g id=\"cloud-upload\"><path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z\"></path></g>\n<g id=\"code\"><path d=\"M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z\"></path></g>\n<g id=\"compare-arrows\"><path d=\"M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z\"></path></g>\n<g id=\"content-copy\"><path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"></path></g>\n<g id=\"content-cut\"><path d=\"M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z\"></path></g>\n<g id=\"content-paste\"><path d=\"M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z\"></path></g>\n<g id=\"copyright\"><path d=\"M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"></path></g>\n<g id=\"create\"><path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"></path></g>\n<g id=\"create-new-folder\"><path d=\"M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z\"></path></g>\n<g id=\"credit-card\"><path d=\"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z\"></path></g>\n<g id=\"dashboard\"><path d=\"M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z\"></path></g>\n<g id=\"date-range\"><path d=\"M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z\"></path></g>\n<g id=\"delete\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"></path></g>\n<g id=\"delete-forever\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z\"></path></g>\n<g id=\"delete-sweep\"><path d=\"M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z\"></path></g>\n<g id=\"description\"><path d=\"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z\"></path></g>\n<g id=\"dns\"><path d=\"M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"></path></g>\n<g id=\"done\"><path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"></path></g>\n<g id=\"done-all\"><path d=\"M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z\"></path></g>\n<g id=\"donut-large\"><path d=\"M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z\"></path></g>\n<g id=\"donut-small\"><path d=\"M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z\"></path></g>\n<g id=\"drafts\"><path d=\"M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z\"></path></g>\n<g id=\"eject\"><path d=\"M5 17h14v2H5zm7-12L5.33 15h13.34z\"></path></g>\n<g id=\"error\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"></path></g>\n<g id=\"error-outline\"><path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"></path></g>\n<g id=\"euro-symbol\"><path d=\"M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z\"></path></g>\n<g id=\"event\"><path d=\"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z\"></path></g>\n<g id=\"event-seat\"><path d=\"M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z\"></path></g>\n<g id=\"exit-to-app\"><path d=\"M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"expand-less\"><path d=\"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z\"></path></g>\n<g id=\"expand-more\"><path d=\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z\"></path></g>\n<g id=\"explore\"><path d=\"M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z\"></path></g>\n<g id=\"extension\"><path d=\"M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z\"></path></g>\n<g id=\"face\"><path d=\"M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z\"></path></g>\n<g id=\"favorite\"><path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\"></path></g>\n<g id=\"favorite-border\"><path d=\"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z\"></path></g>\n<g id=\"feedback\"><path d=\"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z\"></path></g>\n<g id=\"file-download\"><path d=\"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z\"></path></g>\n<g id=\"file-upload\"><path d=\"M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z\"></path></g>\n<g id=\"filter-list\"><path d=\"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z\"></path></g>\n<g id=\"find-in-page\"><path d=\"M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z\"></path></g>\n<g id=\"find-replace\"><path d=\"M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z\"></path></g>\n<g id=\"fingerprint\"><path d=\"M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z\"></path></g>\n<g id=\"first-page\"><path d=\"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"></path></g>\n<g id=\"flag\"><path d=\"M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z\"></path></g>\n<g id=\"flight-land\"><path d=\"M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z\"></path></g>\n<g id=\"flight-takeoff\"><path d=\"M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z\"></path></g>\n<g id=\"flip-to-back\"><path d=\"M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z\"></path></g>\n<g id=\"flip-to-front\"><path d=\"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z\"></path></g>\n<g id=\"folder\"><path d=\"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z\"></path></g>\n<g id=\"folder-open\"><path d=\"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z\"></path></g>\n<g id=\"folder-shared\"><path d=\"M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z\"></path></g>\n<g id=\"font-download\"><path d=\"M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z\"></path></g>\n<g id=\"forward\"><path d=\"M12 8V4l8 8-8 8v-4H4V8z\"></path></g>\n<g id=\"fullscreen\"><path d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\"></path></g>\n<g id=\"fullscreen-exit\"><path d=\"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z\"></path></g>\n<g id=\"g-translate\"><path d=\"M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z\"></path></g>\n<g id=\"gavel\"><path d=\"M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z\"></path></g>\n<g id=\"gesture\"><path d=\"M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z\"></path></g>\n<g id=\"get-app\"><path d=\"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z\"></path></g>\n<g id=\"gif\"><path d=\"M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z\"></path></g>\n<g id=\"grade\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"></path></g>\n<g id=\"group-work\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\"></path></g>\n<g id=\"help\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z\"></path></g>\n<g id=\"help-outline\"><path d=\"M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z\"></path></g>\n<g id=\"highlight-off\"><path d=\"M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"></path></g>\n<g id=\"history\"><path d=\"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z\"></path></g>\n<g id=\"home\"><path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"></path></g>\n<g id=\"hourglass-empty\"><path d=\"M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z\"></path></g>\n<g id=\"hourglass-full\"><path d=\"M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z\"></path></g>\n<g id=\"http\"><path d=\"M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z\"></path></g>\n<g id=\"https\"><path d=\"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z\"></path></g>\n<g id=\"important-devices\"><path d=\"M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z\"></path></g>\n<g id=\"inbox\"><path d=\"M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z\"></path></g>\n<g id=\"indeterminate-check-box\"><path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z\"></path></g>\n<g id=\"info\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z\"></path></g>\n<g id=\"info-outline\"><path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"></path></g>\n<g id=\"input\"><path d=\"M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z\"></path></g>\n<g id=\"invert-colors\"><path d=\"M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z\"></path></g>\n<g id=\"label\"><path d=\"M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z\"></path></g>\n<g id=\"label-outline\"><path d=\"M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z\"></path></g>\n<g id=\"language\"><path d=\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z\"></path></g>\n<g id=\"last-page\"><path d=\"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z\"></path></g>\n<g id=\"launch\"><path d=\"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z\"></path></g>\n<g id=\"lightbulb-outline\"><path d=\"M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z\"></path></g>\n<g id=\"line-style\"><path d=\"M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z\"></path></g>\n<g id=\"line-weight\"><path d=\"M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z\"></path></g>\n<g id=\"link\"><path d=\"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z\"></path></g>\n<g id=\"list\"><path d=\"M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z\"></path></g>\n<g id=\"lock\"><path d=\"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z\"></path></g>\n<g id=\"lock-open\"><path d=\"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z\"></path></g>\n<g id=\"lock-outline\"><path d=\"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z\"></path></g>\n<g id=\"low-priority\"><path d=\"M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z\"></path></g>\n<g id=\"loyalty\"><path d=\"M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z\"></path></g>\n<g id=\"mail\"><path d=\"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z\"></path></g>\n<g id=\"markunread\"><path d=\"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z\"></path></g>\n<g id=\"markunread-mailbox\"><path d=\"M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"menu\"><path d=\"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z\"></path></g>\n<g id=\"more-horiz\"><path d=\"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\"></path></g>\n<g id=\"more-vert\"><path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z\"></path></g>\n<g id=\"motorcycle\"><path d=\"M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z\"></path></g>\n<g id=\"move-to-inbox\"><path d=\"M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z\"></path></g>\n<g id=\"next-week\"><path d=\"M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z\"></path></g>\n<g id=\"note-add\"><path d=\"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z\"></path></g>\n<g id=\"offline-pin\"><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z\"></path></g>\n<g id=\"opacity\"><path d=\"M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z\"></path></g>\n<g id=\"open-in-browser\"><path d=\"M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z\"></path></g>\n<g id=\"open-in-new\"><path d=\"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z\"></path></g>\n<g id=\"open-with\"><path d=\"M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z\"></path></g>\n<g id=\"pageview\"><path d=\"M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z\"></path></g>\n<g id=\"pan-tool\"><path d=\"M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z\"></path></g>\n<g id=\"payment\"><path d=\"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z\"></path></g>\n<g id=\"perm-camera-mic\"><path d=\"M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z\"></path></g>\n<g id=\"perm-contact-calendar\"><path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z\"></path></g>\n<g id=\"perm-data-setting\"><path d=\"M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"></path></g>\n<g id=\"perm-device-information\"><path d=\"M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z\"></path></g>\n<g id=\"perm-identity\"><path d=\"M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z\"></path></g>\n<g id=\"perm-media\"><path d=\"M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z\"></path></g>\n<g id=\"perm-phone-msg\"><path d=\"M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z\"></path></g>\n<g id=\"perm-scan-wifi\"><path d=\"M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z\"></path></g>\n<g id=\"pets\"><circle cx=\"4.5\" cy=\"9.5\" r=\"2.5\"></circle><circle cx=\"9\" cy=\"5.5\" r=\"2.5\"></circle><circle cx=\"15\" cy=\"5.5\" r=\"2.5\"></circle><circle cx=\"19.5\" cy=\"9.5\" r=\"2.5\"></circle><path d=\"M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z\"></path></g>\n<g id=\"picture-in-picture\"><path d=\"M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z\"></path></g>\n<g id=\"picture-in-picture-alt\"><path d=\"M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z\"></path></g>\n<g id=\"play-for-work\"><path d=\"M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z\"></path></g>\n<g id=\"polymer\"><path d=\"M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z\"></path></g>\n<g id=\"power-settings-new\"><path d=\"M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z\"></path></g>\n<g id=\"pregnant-woman\"><path d=\"M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z\"></path></g>\n<g id=\"print\"><path d=\"M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z\"></path></g>\n<g id=\"query-builder\"><path d=\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z\"></path></g>\n<g id=\"question-answer\"><path d=\"M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z\"></path></g>\n<g id=\"radio-button-checked\"><path d=\"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"></path></g>\n<g id=\"radio-button-unchecked\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"></path></g>\n<g id=\"receipt\"><path d=\"M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z\"></path></g>\n<g id=\"record-voice-over\"><circle cx=\"9\" cy=\"9\" r=\"4\"></circle><path d=\"M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z\"></path></g>\n<g id=\"redeem\"><path d=\"M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z\"></path></g>\n<g id=\"redo\"><path d=\"M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z\"></path></g>\n<g id=\"refresh\"><path d=\"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z\"></path></g>\n<g id=\"remove\"><path d=\"M19 13H5v-2h14v2z\"></path></g>\n<g id=\"remove-circle\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z\"></path></g>\n<g id=\"remove-circle-outline\"><path d=\"M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"></path></g>\n<g id=\"remove-shopping-cart\"><path d=\"M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z\"></path></g>\n<g id=\"reorder\"><path d=\"M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z\"></path></g>\n<g id=\"reply\"><path d=\"M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z\"></path></g>\n<g id=\"reply-all\"><path d=\"M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z\"></path></g>\n<g id=\"report\"><path d=\"M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z\"></path></g>\n<g id=\"report-problem\"><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"></path></g>\n<g id=\"restore\"><path d=\"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z\"></path></g>\n<g id=\"restore-page\"><path d=\"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z\"></path></g>\n<g id=\"room\"><path d=\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\"></path></g>\n<g id=\"rounded-corner\"><path d=\"M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z\"></path></g>\n<g id=\"rowing\"><path d=\"M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z\"></path></g>\n<g id=\"save\"><path d=\"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z\"></path></g>\n<g id=\"schedule\"><path d=\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z\"></path></g>\n<g id=\"search\"><path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"></path></g>\n<g id=\"select-all\"><path d=\"M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z\"></path></g>\n<g id=\"send\"><path d=\"M2.01 21L23 12 2.01 3 2 10l15 2-15 2z\"></path></g>\n<g id=\"settings\"><path d=\"M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z\"></path></g>\n<g id=\"settings-applications\"><path d=\"M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z\"></path></g>\n<g id=\"settings-backup-restore\"><path d=\"M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z\"></path></g>\n<g id=\"settings-bluetooth\"><path d=\"M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z\"></path></g>\n<g id=\"settings-brightness\"><path d=\"M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z\"></path></g>\n<g id=\"settings-cell\"><path d=\"M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z\"></path></g>\n<g id=\"settings-ethernet\"><path d=\"M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z\"></path></g>\n<g id=\"settings-input-antenna\"><path d=\"M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z\"></path></g>\n<g id=\"settings-input-component\"><path d=\"M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z\"></path></g>\n<g id=\"settings-input-composite\"><path d=\"M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z\"></path></g>\n<g id=\"settings-input-hdmi\"><path d=\"M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z\"></path></g>\n<g id=\"settings-input-svideo\"><path d=\"M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z\"></path></g>\n<g id=\"settings-overscan\"><path d=\"M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z\"></path></g>\n<g id=\"settings-phone\"><path d=\"M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z\"></path></g>\n<g id=\"settings-power\"><path d=\"M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z\"></path></g>\n<g id=\"settings-remote\"><path d=\"M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z\"></path></g>\n<g id=\"settings-voice\"><path d=\"M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z\"></path></g>\n<g id=\"shop\"><path d=\"M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z\"></path></g>\n<g id=\"shop-two\"><path d=\"M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z\"></path></g>\n<g id=\"shopping-basket\"><path d=\"M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z\"></path></g>\n<g id=\"shopping-cart\"><path d=\"M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z\"></path></g>\n<g id=\"sort\"><path d=\"M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z\"></path></g>\n<g id=\"speaker-notes\"><path d=\"M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z\"></path></g>\n<g id=\"speaker-notes-off\"><path d=\"M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"spellcheck\"><path d=\"M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z\"></path></g>\n<g id=\"star\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"></path></g>\n<g id=\"star-border\"><path d=\"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z\"></path></g>\n<g id=\"star-half\"><path d=\"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z\"></path></g>\n<g id=\"stars\"><path d=\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z\"></path></g>\n<g id=\"store\"><path d=\"M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z\"></path></g>\n<g id=\"subdirectory-arrow-left\"><path d=\"M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z\"></path></g>\n<g id=\"subdirectory-arrow-right\"><path d=\"M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z\"></path></g>\n<g id=\"subject\"><path d=\"M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z\"></path></g>\n<g id=\"supervisor-account\"><path d=\"M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z\"></path></g>\n<g id=\"swap-horiz\"><path d=\"M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z\"></path></g>\n<g id=\"swap-vert\"><path d=\"M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z\"></path></g>\n<g id=\"swap-vertical-circle\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z\"></path></g>\n<g id=\"system-update-alt\"><path d=\"M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"tab\"><path d=\"M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z\"></path></g>\n<g id=\"tab-unselected\"><path d=\"M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z\"></path></g>\n<g id=\"text-format\"><path d=\"M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z\"></path></g>\n<g id=\"theaters\"><path d=\"M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z\"></path></g>\n<g id=\"thumb-down\"><path d=\"M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z\"></path></g>\n<g id=\"thumb-up\"><path d=\"M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z\"></path></g>\n<g id=\"thumbs-up-down\"><path d=\"M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z\"></path></g>\n<g id=\"timeline\"><path d=\"M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z\"></path></g>\n<g id=\"toc\"><path d=\"M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z\"></path></g>\n<g id=\"today\"><path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"></path></g>\n<g id=\"toll\"><path d=\"M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z\"></path></g>\n<g id=\"touch-app\"><path d=\"M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z\"></path></g>\n<g id=\"track-changes\"><path d=\"M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z\"></path></g>\n<g id=\"translate\"><path d=\"M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z\"></path></g>\n<g id=\"trending-down\"><path d=\"M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z\"></path></g>\n<g id=\"trending-flat\"><path d=\"M22 12l-4-4v3H3v2h15v3z\"></path></g>\n<g id=\"trending-up\"><path d=\"M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z\"></path></g>\n<g id=\"turned-in\"><path d=\"M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"turned-in-not\"><path d=\"M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z\"></path></g>\n<g id=\"unarchive\"><path d=\"M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z\"></path></g>\n<g id=\"undo\"><path d=\"M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z\"></path></g>\n<g id=\"unfold-less\"><path d=\"M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z\"></path></g>\n<g id=\"unfold-more\"><path d=\"M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z\"></path></g>\n<g id=\"update\"><path d=\"M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z\"></path></g>\n<g id=\"verified-user\"><path d=\"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z\"></path></g>\n<g id=\"view-agenda\"><path d=\"M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z\"></path></g>\n<g id=\"view-array\"><path d=\"M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z\"></path></g>\n<g id=\"view-carousel\"><path d=\"M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z\"></path></g>\n<g id=\"view-column\"><path d=\"M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z\"></path></g>\n<g id=\"view-day\"><path d=\"M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z\"></path></g>\n<g id=\"view-headline\"><path d=\"M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z\"></path></g>\n<g id=\"view-list\"><path d=\"M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z\"></path></g>\n<g id=\"view-module\"><path d=\"M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z\"></path></g>\n<g id=\"view-quilt\"><path d=\"M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z\"></path></g>\n<g id=\"view-stream\"><path d=\"M4 18h17v-6H4v6zM4 5v6h17V5H4z\"></path></g>\n<g id=\"view-week\"><path d=\"M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z\"></path></g>\n<g id=\"visibility\"><path d=\"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z\"></path></g>\n<g id=\"visibility-off\"><path d=\"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z\"></path></g>\n<g id=\"warning\"><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"></path></g>\n<g id=\"watch-later\"><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z\"></path></g>\n<g id=\"weekend\"><path d=\"M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z\"></path></g>\n<g id=\"work\"><path d=\"M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z\"></path></g>\n<g id=\"youtube-searched-for\"><path d=\"M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z\"></path></g>\n<g id=\"zoom-in\"><path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z\"></path></g>\n<g id=\"zoom-out\"><path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z\"></path></g>\n</defs></svg>\n</iron-iconset-svg>"]);_templateObject4_6bf96330d65d11eaa5e0898854dcb572=function _templateObject4_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject3_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        @apply --layout-inline;\n        @apply --layout-center-center;\n        position: relative;\n\n        vertical-align: middle;\n\n        fill: var(--iron-icon-fill-color, currentcolor);\n        stroke: var(--iron-icon-stroke-color, none);\n\n        width: var(--iron-icon-width, 24px);\n        height: var(--iron-icon-height, 24px);\n        @apply --iron-icon;\n      }\n\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n"]);_templateObject3_6bf96330d65d11eaa5e0898854dcb572=function _templateObject3_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject2_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n<custom-style>\n  <style is=\"custom-style\">\n    [hidden] {\n      display: none !important;\n    }\n  </style>\n</custom-style>\n<custom-style>\n  <style is=\"custom-style\">\n    html {\n\n      --layout: {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n      };\n\n      --layout-inline: {\n        display: -ms-inline-flexbox;\n        display: -webkit-inline-flex;\n        display: inline-flex;\n      };\n\n      --layout-horizontal: {\n        @apply --layout;\n\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n      };\n\n      --layout-horizontal-reverse: {\n        @apply --layout;\n\n        -ms-flex-direction: row-reverse;\n        -webkit-flex-direction: row-reverse;\n        flex-direction: row-reverse;\n      };\n\n      --layout-vertical: {\n        @apply --layout;\n\n        -ms-flex-direction: column;\n        -webkit-flex-direction: column;\n        flex-direction: column;\n      };\n\n      --layout-vertical-reverse: {\n        @apply --layout;\n\n        -ms-flex-direction: column-reverse;\n        -webkit-flex-direction: column-reverse;\n        flex-direction: column-reverse;\n      };\n\n      --layout-wrap: {\n        -ms-flex-wrap: wrap;\n        -webkit-flex-wrap: wrap;\n        flex-wrap: wrap;\n      };\n\n      --layout-wrap-reverse: {\n        -ms-flex-wrap: wrap-reverse;\n        -webkit-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n      };\n\n      --layout-flex-auto: {\n        -ms-flex: 1 1 auto;\n        -webkit-flex: 1 1 auto;\n        flex: 1 1 auto;\n      };\n\n      --layout-flex-none: {\n        -ms-flex: none;\n        -webkit-flex: none;\n        flex: none;\n      };\n\n      --layout-flex: {\n        -ms-flex: 1 1 0.000000001px;\n        -webkit-flex: 1;\n        flex: 1;\n        -webkit-flex-basis: 0.000000001px;\n        flex-basis: 0.000000001px;\n      };\n\n      --layout-flex-2: {\n        -ms-flex: 2;\n        -webkit-flex: 2;\n        flex: 2;\n      };\n\n      --layout-flex-3: {\n        -ms-flex: 3;\n        -webkit-flex: 3;\n        flex: 3;\n      };\n\n      --layout-flex-4: {\n        -ms-flex: 4;\n        -webkit-flex: 4;\n        flex: 4;\n      };\n\n      --layout-flex-5: {\n        -ms-flex: 5;\n        -webkit-flex: 5;\n        flex: 5;\n      };\n\n      --layout-flex-6: {\n        -ms-flex: 6;\n        -webkit-flex: 6;\n        flex: 6;\n      };\n\n      --layout-flex-7: {\n        -ms-flex: 7;\n        -webkit-flex: 7;\n        flex: 7;\n      };\n\n      --layout-flex-8: {\n        -ms-flex: 8;\n        -webkit-flex: 8;\n        flex: 8;\n      };\n\n      --layout-flex-9: {\n        -ms-flex: 9;\n        -webkit-flex: 9;\n        flex: 9;\n      };\n\n      --layout-flex-10: {\n        -ms-flex: 10;\n        -webkit-flex: 10;\n        flex: 10;\n      };\n\n      --layout-flex-11: {\n        -ms-flex: 11;\n        -webkit-flex: 11;\n        flex: 11;\n      };\n\n      --layout-flex-12: {\n        -ms-flex: 12;\n        -webkit-flex: 12;\n        flex: 12;\n      };\n\n      /* alignment in cross axis */\n\n      --layout-start: {\n        -ms-flex-align: start;\n        -webkit-align-items: flex-start;\n        align-items: flex-start;\n      };\n\n      --layout-center: {\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n      };\n\n      --layout-end: {\n        -ms-flex-align: end;\n        -webkit-align-items: flex-end;\n        align-items: flex-end;\n      };\n\n      --layout-baseline: {\n        -ms-flex-align: baseline;\n        -webkit-align-items: baseline;\n        align-items: baseline;\n      };\n\n      /* alignment in main axis */\n\n      --layout-start-justified: {\n        -ms-flex-pack: start;\n        -webkit-justify-content: flex-start;\n        justify-content: flex-start;\n      };\n\n      --layout-center-justified: {\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n      };\n\n      --layout-end-justified: {\n        -ms-flex-pack: end;\n        -webkit-justify-content: flex-end;\n        justify-content: flex-end;\n      };\n\n      --layout-around-justified: {\n        -ms-flex-pack: distribute;\n        -webkit-justify-content: space-around;\n        justify-content: space-around;\n      };\n\n      --layout-justified: {\n        -ms-flex-pack: justify;\n        -webkit-justify-content: space-between;\n        justify-content: space-between;\n      };\n\n      --layout-center-center: {\n        @apply --layout-center;\n        @apply --layout-center-justified;\n      };\n\n      /* self alignment */\n\n      --layout-self-start: {\n        -ms-align-self: flex-start;\n        -webkit-align-self: flex-start;\n        align-self: flex-start;\n      };\n\n      --layout-self-center: {\n        -ms-align-self: center;\n        -webkit-align-self: center;\n        align-self: center;\n      };\n\n      --layout-self-end: {\n        -ms-align-self: flex-end;\n        -webkit-align-self: flex-end;\n        align-self: flex-end;\n      };\n\n      --layout-self-stretch: {\n        -ms-align-self: stretch;\n        -webkit-align-self: stretch;\n        align-self: stretch;\n      };\n\n      --layout-self-baseline: {\n        -ms-align-self: baseline;\n        -webkit-align-self: baseline;\n        align-self: baseline;\n      };\n\n      /* multi-line alignment in main axis */\n\n      --layout-start-aligned: {\n        -ms-flex-line-pack: start;  /* IE10 */\n        -ms-align-content: flex-start;\n        -webkit-align-content: flex-start;\n        align-content: flex-start;\n      };\n\n      --layout-end-aligned: {\n        -ms-flex-line-pack: end;  /* IE10 */\n        -ms-align-content: flex-end;\n        -webkit-align-content: flex-end;\n        align-content: flex-end;\n      };\n\n      --layout-center-aligned: {\n        -ms-flex-line-pack: center;  /* IE10 */\n        -ms-align-content: center;\n        -webkit-align-content: center;\n        align-content: center;\n      };\n\n      --layout-between-aligned: {\n        -ms-flex-line-pack: justify;  /* IE10 */\n        -ms-align-content: space-between;\n        -webkit-align-content: space-between;\n        align-content: space-between;\n      };\n\n      --layout-around-aligned: {\n        -ms-flex-line-pack: distribute;  /* IE10 */\n        -ms-align-content: space-around;\n        -webkit-align-content: space-around;\n        align-content: space-around;\n      };\n\n      /*******************************\n                Other Layout\n      *******************************/\n\n      --layout-block: {\n        display: block;\n      };\n\n      --layout-invisible: {\n        visibility: hidden !important;\n      };\n\n      --layout-relative: {\n        position: relative;\n      };\n\n      --layout-fit: {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n      --layout-scroll: {\n        -webkit-overflow-scrolling: touch;\n        overflow: auto;\n      };\n\n      --layout-fullbleed: {\n        margin: 0;\n        height: 100vh;\n      };\n\n      /* fixed position */\n\n      --layout-fixed-top: {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n      };\n\n      --layout-fixed-right: {\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n      };\n\n      --layout-fixed-bottom: {\n        position: fixed;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n      --layout-fixed-left: {\n        position: fixed;\n        top: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n    }\n  </style>\n</custom-style>"]);_templateObject2_6bf96330d65d11eaa5e0898854dcb572=function _templateObject2_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function _templateObject_6bf96330d65d11eaa5e0898854dcb572(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: inline-block;\n        position: fixed;\n        clip: rect(0px,0px,0px,0px);\n      }\n    </style>\n    <div aria-live$=\"[[mode]]\">[[_text]]</div>\n"]);_templateObject_6bf96330d65d11eaa5e0898854dcb572=function _templateObject_6bf96330d65d11eaa5e0898854dcb572(){return data};return data}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object))}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});return keys}function _objectSpread(target){for(var i=1,source;i<arguments.length;i++){source=null!=arguments[i]?arguments[i]:{};if(i%2){ownKeys(source,!0).forEach(function(key){babelHelpers.defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}// Give the user the choice to opt out of font loading.
if(!window.polymerSkipLoadingFontRoboto){var link=document.createElement("link");link.rel="stylesheet";link.type="text/css";link.crossOrigin="anonymous";link.href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic";document.head.appendChild(link)}/**
  @license
  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */"use strict";var nativeShadow=!(window.ShadyDOM&&window.ShadyDOM.inUse);_exports.nativeShadow=nativeShadow;var nativeCssVariables_;/**
                          * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
                          */function calcCssVariables(settings){if(settings&&settings.shimcssproperties){nativeCssVariables_=!1}else{// chrome 49 has semi-working css vars, check if box-shadow works
// safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
// However, shim css custom properties are only supported with ShadyDOM enabled,
// so fall back on native if we do not detect ShadyDOM
// Edge 15: custom properties used in ::before and ::after will also be used in the parent element
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
nativeCssVariables_=nativeShadow||!!(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)"))}}/** @type {string | undefined} */var cssBuild;_exports.cssBuild=cssBuild;if(window.ShadyCSS&&window.ShadyCSS.cssBuild!==void 0){_exports.cssBuild=cssBuild=window.ShadyCSS.cssBuild}/** @type {boolean} */var disableRuntime=!!(window.ShadyCSS&&window.ShadyCSS.disableRuntime);_exports.disableRuntime=disableRuntime;if(window.ShadyCSS&&window.ShadyCSS.nativeCss!==void 0){nativeCssVariables_=window.ShadyCSS.nativeCss}else if(window.ShadyCSS){calcCssVariables(window.ShadyCSS);// reset window variable to let ShadyCSS API take its place
window.ShadyCSS=void 0}else{calcCssVariables(window.WebComponents&&window.WebComponents.flags)}// Hack for type error under new type inference which doesn't like that
// nativeCssVariables is updated in a function and assigns the type
// `function(): ?` instead of `boolean`.
var nativeCssVariables=/** @type {boolean} */nativeCssVariables_;_exports.nativeCssVariables=nativeCssVariables;var styleSettings={nativeShadow:nativeShadow,get cssBuild(){return cssBuild},disableRuntime:disableRuntime,nativeCssVariables:nativeCssVariables};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */ /*
      Extremely simple css parser. Intended to be not more than what we need
      and definitely not necessarily correct =).
      */_exports.$styleSettings=styleSettings;"use strict";/** @unrestricted */var StyleNode=function StyleNode(){babelHelpers.classCallCheck(this,StyleNode);/** @type {number} */this.start=0;/** @type {number} */this.end=0;/** @type {StyleNode} */this.previous=null;/** @type {StyleNode} */this.parent=null;/** @type {Array<StyleNode>} */this.rules=null;/** @type {string} */this.parsedCssText="";/** @type {string} */this.cssText="";/** @type {boolean} */this.atRule=!1;/** @type {number} */this.type=0;/** @type {string} */this.keyframesName="";/** @type {string} */this.selector="";/** @type {string} */this.parsedSelector=""};/**
   * @param {string} text
   * @return {StyleNode}
   */_exports.StyleNode=StyleNode;function parse(text){text=clean(text);return parseCss(lex(text),text)}// remove stuff we don't care about that may hinder parsing
/**
 * @param {string} cssText
 * @return {string}
 */function clean(cssText){return cssText.replace(RX.comments,"").replace(RX.port,"")}// super simple {...} lexer that returns a node tree
/**
 * @param {string} text
 * @return {StyleNode}
 */function lex(text){var root=new StyleNode;root.start=0;root.end=text.length;for(var n=root,i=0,l=text.length;i<l;i++){if(text[i]===OPEN_BRACE){if(!n.rules){n.rules=[]}var _p=n,previous=_p.rules[_p.rules.length-1]||null;n=new StyleNode;n.start=i+1;n.parent=_p;n.previous=previous;_p.rules.push(n)}else if(text[i]===CLOSE_BRACE){n.end=i+1;n=n.parent||root}}return root}// add selectors/cssText to node tree
/**
 * @param {StyleNode} node
 * @param {string} text
 * @return {StyleNode}
 */function parseCss(node,text){var t=text.substring(node.start,node.end-1);node.parsedCssText=node.cssText=t.trim();if(node.parent){var ss=node.previous?node.previous.end:node.parent.start;t=text.substring(ss,node.start-1);t=_expandUnicodeEscapes(t);t=t.replace(RX.multipleSpaces," ");// TODO(sorvell): ad hoc; make selector include only after last ;
// helps with mixin syntax
t=t.substring(t.lastIndexOf(";")+1);var s=node.parsedSelector=node.selector=t.trim();node.atRule=0===s.indexOf(AT_START);// note, support a subset of rule types...
if(node.atRule){if(0===s.indexOf(MEDIA_START)){node.type=types.MEDIA_RULE}else if(s.match(RX.keyframesRule)){node.type=types.KEYFRAMES_RULE;node.keyframesName=node.selector.split(RX.multipleSpaces).pop()}}else{if(0===s.indexOf(VAR_START)){node.type=types.MIXIN_RULE}else{node.type=types.STYLE_RULE}}}var r$=node.rules;if(r$){for(var i=0,l=r$.length,r;i<l&&(r=r$[i]);i++){parseCss(r,text)}}return node}/**
   * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
   * expanded form that doesn't require trailing space `\000033`
   * @param {string} s
   * @return {string}
   */function _expandUnicodeEscapes(s){return s.replace(/\\([0-9a-f]{1,6})\s/gi,function(){var code=arguments[1],repeat=6-code.length;while(repeat--){code="0"+code}return"\\"+code})}/**
   * stringify parsed css.
   * @param {StyleNode} node
   * @param {boolean=} preserveProperties
   * @param {string=} text
   * @return {string}
   */function stringify(node,preserveProperties){var text=2<arguments.length&&arguments[2]!==void 0?arguments[2]:"",cssText="";if(node.cssText||node.rules){var r$=node.rules;if(r$&&!_hasMixinRules(r$)){for(var i=0,l=r$.length,r;i<l&&(r=r$[i]);i++){cssText=stringify(r,preserveProperties,cssText)}}else{cssText=preserveProperties?node.cssText:removeCustomProps(node.cssText);cssText=cssText.trim();if(cssText){cssText="  "+cssText+"\n"}}}// emit rule if there is cssText
if(cssText){if(node.selector){text+=node.selector+" "+OPEN_BRACE+"\n"}text+=cssText;if(node.selector){text+=CLOSE_BRACE+"\n\n"}}return text}/**
   * @param {Array<StyleNode>} rules
   * @return {boolean}
   */function _hasMixinRules(rules){var r=rules[0];return!!r&&!!r.selector&&0===r.selector.indexOf(VAR_START)}/**
   * @param {string} cssText
   * @return {string}
   */function removeCustomProps(cssText){cssText=removeCustomPropAssignment(cssText);return removeCustomPropApply(cssText)}/**
   * @param {string} cssText
   * @return {string}
   */function removeCustomPropAssignment(cssText){return cssText.replace(RX.customProp,"").replace(RX.mixinProp,"")}/**
   * @param {string} cssText
   * @return {string}
   */function removeCustomPropApply(cssText){return cssText.replace(RX.mixinApply,"").replace(RX.varApply,"")}/** @enum {number} */var types={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3};_exports.types=types;var OPEN_BRACE="{",CLOSE_BRACE="}",RX={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},VAR_START="--",MEDIA_START="@media",AT_START="@",cssParse={StyleNode:StyleNode,parse:parse,stringify:stringify,removeCustomPropAssignment:removeCustomPropAssignment,types:types};_exports.$cssParse=cssParse;/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */var VAR_ASSIGN=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;_exports.VAR_ASSIGN=VAR_ASSIGN;var MIXIN_MATCH=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;_exports.MIXIN_MATCH=MIXIN_MATCH;var VAR_CONSUMED=/(--[\w-]+)\s*([:,;)]|$)/gi;_exports.VAR_CONSUMED=VAR_CONSUMED;var ANIMATION_MATCH=/(animation\s*:)|(animation-name\s*:)/;_exports.ANIMATION_MATCH=ANIMATION_MATCH;var MEDIA_MATCH=/@media\s(.*)/;_exports.MEDIA_MATCH=MEDIA_MATCH;var IS_VAR=/^--/;_exports.IS_VAR=IS_VAR;var BRACKETED=/\{[^}]*\}/g;_exports.BRACKETED=BRACKETED;var HOST_PREFIX="(?:^|[^.#[:])";_exports.HOST_PREFIX=HOST_PREFIX;var HOST_SUFFIX="($|[.:[\\s>+~])";_exports.HOST_SUFFIX=HOST_SUFFIX;var commonRegex={VAR_ASSIGN:VAR_ASSIGN,MIXIN_MATCH:MIXIN_MATCH,VAR_CONSUMED:VAR_CONSUMED,ANIMATION_MATCH:ANIMATION_MATCH,MEDIA_MATCH:MEDIA_MATCH,IS_VAR:IS_VAR,BRACKETED:BRACKETED,HOST_PREFIX:HOST_PREFIX,HOST_SUFFIX:HOST_SUFFIX};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$commonRegex=commonRegex;"use strict";/** @type {!Set<string>} */var styleTextSet=new Set,scopingAttribute="shady-unscoped";_exports.scopingAttribute=scopingAttribute;/**
                                                   * Add a specifically-marked style to the document directly, and only one copy of that style.
                                                   *
                                                   * @param {!HTMLStyleElement} style
                                                   * @return {undefined}
                                                   */function processUnscopedStyle(style){var text=style.textContent;if(!styleTextSet.has(text)){styleTextSet.add(text);var newStyle=style.cloneNode(!0);document.head.appendChild(newStyle)}}/**
   * Check if a style is supposed to be unscoped
   * @param {!HTMLStyleElement} style
   * @return {boolean} true if the style has the unscoping attribute
   */function isUnscopedStyle(style){return style.hasAttribute(scopingAttribute)}var unscopedStyleHandler={scopingAttribute:scopingAttribute,processUnscopedStyle:processUnscopedStyle,isUnscopedStyle:isUnscopedStyle};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$unscopedStyleHandler=unscopedStyleHandler;"use strict";function toCssText(rules,callback){if(!rules){return""}if("string"===typeof rules){rules=parse(rules)}if(callback){forEachRule(rules,callback)}return stringify(rules,nativeCssVariables)}/**
   * @param {HTMLStyleElement} style
   * @return {StyleNode}
   */function rulesForStyle(style){if(!style.__cssRules&&style.textContent){style.__cssRules=parse(style.textContent)}return style.__cssRules||null}// Tests if a rule is a keyframes selector, which looks almost exactly
// like a normal selector but is not (it has nothing to do with scoping
// for example).
/**
 * @param {StyleNode} rule
 * @return {boolean}
 */function isKeyframesSelector(rule){return!!rule.parent&&rule.parent.type===types.KEYFRAMES_RULE}/**
   * @param {StyleNode} node
   * @param {Function=} styleRuleCallback
   * @param {Function=} keyframesRuleCallback
   * @param {boolean=} onlyActiveRules
   */function forEachRule(node,styleRuleCallback,keyframesRuleCallback,onlyActiveRules){if(!node){return}var skipRules=!1,type=node.type;if(onlyActiveRules){if(type===types.MEDIA_RULE){var matchMedia=node.selector.match(MEDIA_MATCH);if(matchMedia){// if rule is a non matching @media rule, skip subrules
if(!window.matchMedia(matchMedia[1]).matches){skipRules=!0}}}}if(type===types.STYLE_RULE){styleRuleCallback(node)}else if(keyframesRuleCallback&&type===types.KEYFRAMES_RULE){keyframesRuleCallback(node)}else if(type===types.MIXIN_RULE){skipRules=!0}var r$=node.rules;if(r$&&!skipRules){for(var i=0,l=r$.length,r;i<l&&(r=r$[i]);i++){forEachRule(r,styleRuleCallback,keyframesRuleCallback,onlyActiveRules)}}}// add a string of cssText to the document.
/**
 * @param {string} cssText
 * @param {string} moniker
 * @param {Node} target
 * @param {Node} contextNode
 * @return {HTMLStyleElement}
 */function applyCss(cssText,moniker,target,contextNode){var style=createScopeStyle(cssText,moniker);applyStyle(style,target,contextNode);return style}/**
   * @param {string} cssText
   * @param {string} moniker
   * @return {HTMLStyleElement}
   */function createScopeStyle(cssText,moniker){var style=/** @type {HTMLStyleElement} */document.createElement("style");if(moniker){style.setAttribute("scope",moniker)}style.textContent=cssText;return style}/**
   * Track the position of the last added style for placing placeholders
   * @type {Node}
   */var lastHeadApplyNode=null;// insert a comment node as a styling position placeholder.
/**
 * @param {string} moniker
 * @return {!Comment}
 */function applyStylePlaceHolder(moniker){var placeHolder=document.createComment(" Shady DOM styles for "+moniker+" "),after=lastHeadApplyNode?lastHeadApplyNode.nextSibling:null,scope=document.head;scope.insertBefore(placeHolder,after||scope.firstChild);lastHeadApplyNode=placeHolder;return placeHolder}/**
   * @param {HTMLStyleElement} style
   * @param {?Node} target
   * @param {?Node} contextNode
   */function applyStyle(style,target,contextNode){target=target||document.head;var after=contextNode&&contextNode.nextSibling||target.firstChild;target.insertBefore(style,after);if(!lastHeadApplyNode){lastHeadApplyNode=style}else{// only update lastHeadApplyNode if the new style is inserted after the old lastHeadApplyNode
var position=style.compareDocumentPosition(lastHeadApplyNode);if(position===Node.DOCUMENT_POSITION_PRECEDING){lastHeadApplyNode=style}}}/**
   * @param {string} buildType
   * @return {boolean}
   */function isTargetedBuild(buildType){return nativeShadow?"shadow"===buildType:"shady"===buildType}/**
   * Walk from text[start] matching parens and
   * returns position of the outer end paren
   * @param {string} text
   * @param {number} start
   * @return {number}
   */function findMatchingParen(text,start){for(var level=0,i=start,l=text.length;i<l;i++){if("("===text[i]){level++}else if(")"===text[i]){if(0===--level){return i}}}return-1}/**
   * @param {string} str
   * @param {function(string, string, string, string)} callback
   */function processVariableAndFallback(str,callback){// find 'var('
var start=str.indexOf("var(");if(-1===start){// no var?, everything is prefix
return callback(str,"","","")}//${prefix}var(${inner})${suffix}
var end=findMatchingParen(str,start+3),inner=str.substring(start+4,end),prefix=str.substring(0,start),suffix=processVariableAndFallback(str.substring(end+1),callback),comma=inner.indexOf(",");// value and fallback args should be trimmed to match in property lookup
if(-1===comma){// variable, no fallback
return callback(prefix,inner.trim(),"",suffix)}// var(${value},${fallback})
var value=inner.substring(0,comma).trim(),fallback=inner.substring(comma+1).trim();return callback(prefix,value,fallback,suffix)}/**
   * @param {Element} element
   * @param {string} value
   */function setElementClassRaw(element,value){// use native setAttribute provided by ShadyDOM when setAttribute is patched
if(nativeShadow){element.setAttribute("class",value)}else{window.ShadyDOM.nativeMethods.setAttribute.call(element,"class",value)}}/**
   * @type {function(*):*}
   */var wrap=window.ShadyDOM&&window.ShadyDOM.wrap||function(node){return node};/**
                                                                                         * @param {Element | {is: string, extends: string}} element
                                                                                         * @return {{is: string, typeExtension: string}}
                                                                                         */_exports.wrap$1=wrap;function getIsExtends(element){var localName=element.localName,is="",typeExtension="";/*
                          NOTE: technically, this can be wrong for certain svg elements
                          with `-` in the name like `<font-face>`
                          */if(localName){if(-1<localName.indexOf("-")){is=localName}else{typeExtension=localName;is=element.getAttribute&&element.getAttribute("is")||""}}else{is=/** @type {?} */element.is;typeExtension=/** @type {?} */element.extends}return{is:is,typeExtension:typeExtension}}/**
   * @param {Element|DocumentFragment} element
   * @return {string}
   */function gatherStyleText(element){/** @type {!Array<string>} */for(var styleTextParts=[],styles=/** @type {!NodeList<!HTMLStyleElement>} */element.querySelectorAll("style"),i=0,_style;i<styles.length;i++){_style=styles[i];if(isUnscopedStyle(_style)){if(!nativeShadow){processUnscopedStyle(_style);_style.parentNode.removeChild(_style)}}else{styleTextParts.push(_style.textContent);_style.parentNode.removeChild(_style)}}return styleTextParts.join("").trim()}/**
   * Split a selector separated by commas into an array in a smart way
   * @param {string} selector
   * @return {!Array<string>}
   */function splitSelectorList(selector){for(var parts=[],part="",i=0;0<=i&&i<selector.length;i++){// A selector with parentheses will be one complete part
if("("===selector[i]){// find the matching paren
var end=findMatchingParen(selector,i);// push the paren block into the part
part+=selector.slice(i,end+1);// move the index to after the paren block
i=end}else if(","===selector[i]){parts.push(part);part=""}else{part+=selector[i]}}// catch any pieces after the last comma
if(part){parts.push(part)}return parts}var CSS_BUILD_ATTR="css-build";/**
                                     * Return the polymer-css-build "build type" applied to this element
                                     *
                                     * @param {!HTMLElement} element
                                     * @return {string} Can be "", "shady", or "shadow"
                                     */function getCssBuild(element){if(cssBuild!==void 0){return(/** @type {string} */cssBuild)}if(element.__cssBuild===void 0){// try attribute first, as it is the common case
var attrValue=element.getAttribute(CSS_BUILD_ATTR);if(attrValue){element.__cssBuild=attrValue}else{var buildComment=getBuildComment(element);if(""!==buildComment){// remove build comment so it is not needlessly copied into every element instance
removeBuildComment(element)}element.__cssBuild=buildComment}}return element.__cssBuild||""}/**
   * Check if the given element, either a <template> or <style>, has been processed
   * by polymer-css-build.
   *
   * If so, then we can make a number of optimizations:
   * - polymer-css-build will decompose mixins into individual CSS Custom Properties,
   * so the ApplyShim can be skipped entirely.
   * - Under native ShadowDOM, the style text can just be copied into each instance
   * without modification
   * - If the build is "shady" and ShadyDOM is in use, the styling does not need
   * scoping beyond the shimming of CSS Custom Properties
   *
   * @param {!HTMLElement} element
   * @return {boolean}
   */function elementHasBuiltCss(element){return""!==getCssBuild(element)}/**
   * For templates made with tagged template literals, polymer-css-build will
   * insert a comment of the form `<!--css-build:shadow-->`
   *
   * @param {!HTMLElement} element
   * @return {string}
   */function getBuildComment(element){var buildComment="template"===element.localName?/** @type {!HTMLTemplateElement} */element.content.firstChild:element.firstChild;if(babelHelpers.instanceof(buildComment,Comment)){var commentParts=buildComment.textContent.trim().split(":");if(commentParts[0]===CSS_BUILD_ATTR){return commentParts[1]}}return""}/**
   * Check if the css build status is optimal, and do no unneeded work.
   *
   * @param {string=} cssBuild CSS build status
   * @return {boolean} css build is optimal or not
   */function isOptimalCssBuild(){var cssBuild=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"";// CSS custom property shim always requires work
if(""===cssBuild||!nativeCssVariables){return!1}return nativeShadow?"shadow"===cssBuild:"shady"===cssBuild}/**
   * @param {!HTMLElement} element
   */function removeBuildComment(element){var buildComment="template"===element.localName?/** @type {!HTMLTemplateElement} */element.content.firstChild:element.firstChild;buildComment.parentNode.removeChild(buildComment)}var styleUtil={toCssText:toCssText,rulesForStyle:rulesForStyle,isKeyframesSelector:isKeyframesSelector,forEachRule:forEachRule,applyCss:applyCss,createScopeStyle:createScopeStyle,applyStylePlaceHolder:applyStylePlaceHolder,applyStyle:applyStyle,isTargetedBuild:isTargetedBuild,findMatchingParen:findMatchingParen,processVariableAndFallback:processVariableAndFallback,setElementClassRaw:setElementClassRaw,wrap:wrap,getIsExtends:getIsExtends,gatherStyleText:gatherStyleText,splitSelectorList:splitSelectorList,getCssBuild:getCssBuild,elementHasBuiltCss:elementHasBuiltCss,getBuildComment:getBuildComment,isOptimalCssBuild:isOptimalCssBuild};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$styleUtil=styleUtil;"use strict";function updateNativeProperties(element,properties){// remove previous properties
for(var _p2 in properties){// NOTE: for bc with shim, don't apply null values.
if(null===_p2){element.style.removeProperty(_p2)}else{element.style.setProperty(_p2,properties[_p2])}}}/**
   * @param {Element} element
   * @param {string} property
   * @return {string}
   */function _getComputedStyleValue(element,property){/**
   * @const {string}
   */var value=window.getComputedStyle(element).getPropertyValue(property);if(!value){return""}else{return value.trim()}}/**
   * return true if `cssText` contains a mixin definition or consumption
   * @param {string} cssText
   * @return {boolean}
   */function _detectMixin(cssText){var has=MIXIN_MATCH.test(cssText)||VAR_ASSIGN.test(cssText);// reset state of the regexes
MIXIN_MATCH.lastIndex=0;VAR_ASSIGN.lastIndex=0;return has}var commonUtils={updateNativeProperties:updateNativeProperties,getComputedStyleValue:_getComputedStyleValue,detectMixin:_detectMixin};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */ /*
       * The apply shim simulates the behavior of `@apply` proposed at
       * https://tabatkins.github.io/specs/css-apply-rule/.
       * The approach is to convert a property like this:
       *
       *    --foo: {color: red; background: blue;}
       *
       * to this:
       *
       *    --foo_-_color: red;
       *    --foo_-_background: blue;
       *
       * Then where `@apply --foo` is used, that is converted to:
       *
       *    color: var(--foo_-_color);
       *    background: var(--foo_-_background);
       *
       * This approach generally works but there are some issues and limitations.
       * Consider, for example, that somewhere *between* where `--foo` is set and used,
       * another element sets it to:
       *
       *    --foo: { border: 2px solid red; }
       *
       * We must now ensure that the color and background from the previous setting
       * do not apply. This is accomplished by changing the property set to this:
       *
       *    --foo_-_border: 2px solid red;
       *    --foo_-_color: initial;
       *    --foo_-_background: initial;
       *
       * This works but introduces one new issue.
       * Consider this setup at the point where the `@apply` is used:
       *
       *    background: orange;
       *    `@apply` --foo;
       *
       * In this case the background will be unset (initial) rather than the desired
       * `orange`. We address this by altering the property set to use a fallback
       * value like this:
       *
       *    color: var(--foo_-_color);
       *    background: var(--foo_-_background, orange);
       *    border: var(--foo_-_border);
       *
       * Note that the default is retained in the property set and the `background` is
       * the desired `orange`. This leads us to a limitation.
       *
       * Limitation 1:
      
       * Only properties in the rule where the `@apply`
       * is used are considered as default values.
       * If another rule matches the element and sets `background` with
       * less specificity than the rule in which `@apply` appears,
       * the `background` will not be set.
       *
       * Limitation 2:
       *
       * When using Polymer's `updateStyles` api, new properties may not be set for
       * `@apply` properties.
      
      */_exports.$commonUtils=commonUtils;"use strict";var APPLY_NAME_CLEAN=/;\s*/m,INITIAL_INHERIT=/^\s*(initial)|(inherit)\s*$/,IMPORTANT=/\s*!important/,MIXIN_VAR_SEP="_-_",PropertyEntry,DependantsEntry,MixinMapEntry,MixinMap=/*#__PURE__*/function(){function MixinMap(){babelHelpers.classCallCheck(this,MixinMap);/** @type {!Object<string, !MixinMapEntry>} */this._map={}}/**
     * @param {string} name
     * @param {!PropertyEntry} props
     */babelHelpers.createClass(MixinMap,[{key:"set",value:function set(name,props){name=name.trim();this._map[name]={properties:props,dependants:{}}}/**
     * @param {string} name
     * @return {MixinMapEntry}
     */},{key:"get",value:function get(name){name=name.trim();return this._map[name]||null}}]);return MixinMap}(),invalidCallback=null,ApplyShim=/*#__PURE__*/function(){function ApplyShim(){babelHelpers.classCallCheck(this,ApplyShim);/** @type {?string} */this._currentElement=null;/** @type {HTMLMetaElement} */this._measureElement=null;this._map=new MixinMap}/**
     * return true if `cssText` contains a mixin definition or consumption
     * @param {string} cssText
     * @return {boolean}
     */babelHelpers.createClass(ApplyShim,[{key:"detectMixin",value:function detectMixin(cssText){return _detectMixin(cssText)}/**
     * Gather styles into one style for easier processing
     * @param {!HTMLTemplateElement} template
     * @return {HTMLStyleElement}
     */},{key:"gatherStyles",value:function gatherStyles(template){var styleText=gatherStyleText(template.content);if(styleText){var _style2=/** @type {!HTMLStyleElement} */document.createElement("style");_style2.textContent=styleText;template.content.insertBefore(_style2,template.content.firstChild);return _style2}return null}/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @return {StyleNode}
     */},{key:"transformTemplate",value:function transformTemplate(template,elementName){if(template._gatheredStyle===void 0){template._gatheredStyle=this.gatherStyles(template)}/** @type {HTMLStyleElement} */var style=template._gatheredStyle;return style?this.transformStyle(style,elementName):null}/**
     * @param {!HTMLStyleElement} style
     * @param {string} elementName
     * @return {StyleNode}
     */},{key:"transformStyle",value:function transformStyle(style){var elementName=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"",ast=rulesForStyle(style);this.transformRules(ast,elementName);style.textContent=toCssText(ast);return ast}/**
     * @param {!HTMLStyleElement} style
     * @return {StyleNode}
     */},{key:"transformCustomStyle",value:function transformCustomStyle(style){var _this=this,ast=rulesForStyle(style);forEachRule(ast,function(rule){if(":root"===rule.selector){rule.selector="html"}_this.transformRule(rule)});style.textContent=toCssText(ast);return ast}/**
     * @param {StyleNode} rules
     * @param {string} elementName
     */},{key:"transformRules",value:function transformRules(rules,elementName){var _this2=this;this._currentElement=elementName;forEachRule(rules,function(r){_this2.transformRule(r)});this._currentElement=null}/**
     * @param {!StyleNode} rule
     */},{key:"transformRule",value:function transformRule(rule){rule.cssText=this.transformCssText(rule.parsedCssText,rule);// :root was only used for variable assignment in property shim,
// but generates invalid selectors with real properties.
// replace with `:host > *`, which serves the same effect
if(":root"===rule.selector){rule.selector=":host > *"}}/**
     * @param {string} cssText
     * @param {!StyleNode} rule
     * @return {string}
     */},{key:"transformCssText",value:function transformCssText(cssText,rule){var _this3=this;// produce variables
cssText=cssText.replace(VAR_ASSIGN,function(matchText,propertyName,valueProperty,valueMixin){return _this3._produceCssProperties(matchText,propertyName,valueProperty,valueMixin,rule)});// consume mixins
return this._consumeCssProperties(cssText,rule)}/**
     * @param {string} property
     * @return {string}
     */},{key:"_getInitialValueForProperty",value:function _getInitialValueForProperty(property){if(!this._measureElement){this._measureElement=/** @type {HTMLMetaElement} */document.createElement("meta");this._measureElement.setAttribute("apply-shim-measure","");this._measureElement.style.all="initial";document.head.appendChild(this._measureElement)}return window.getComputedStyle(this._measureElement).getPropertyValue(property)}/**
     * Walk over all rules before this rule to find fallbacks for mixins
     *
     * @param {!StyleNode} startRule
     * @return {!Object}
     */},{key:"_fallbacksFromPreviousRules",value:function _fallbacksFromPreviousRules(startRule){var _this4=this,topRule=startRule;while(topRule.parent){topRule=topRule.parent}var fallbacks={},seenStartRule=!1;forEachRule(topRule,function(r){// stop when we hit the input rule
seenStartRule=seenStartRule||r===startRule;if(seenStartRule){return}// NOTE: Only matching selectors are "safe" for this fallback processing
// It would be prohibitive to run `matchesSelector()` on each selector,
// so we cheat and only check if the same selector string is used, which
// guarantees things like specificity matching
if(r.selector===startRule.selector){Object.assign(fallbacks,_this4._cssTextToMap(r.parsedCssText))}});return fallbacks}/**
     * replace mixin consumption with variable consumption
     * @param {string} text
     * @param {!StyleNode=} rule
     * @return {string}
     */},{key:"_consumeCssProperties",value:function _consumeCssProperties(text,rule){/** @type {Array} */var m=null;// loop over text until all mixins with defintions have been applied
while(m=MIXIN_MATCH.exec(text)){var matchText=m[0],mixinName=m[1],idx=m.index,applyPos=idx+matchText.indexOf("@apply"),afterApplyPos=idx+matchText.length,textBeforeApply=text.slice(0,applyPos),textAfterApply=text.slice(afterApplyPos),defaults=rule?this._fallbacksFromPreviousRules(rule):{};Object.assign(defaults,this._cssTextToMap(textBeforeApply));var replacement=this._atApplyToCssProperties(mixinName,defaults);// use regex match position to replace mixin, keep linear processing time
text="".concat(textBeforeApply).concat(replacement).concat(textAfterApply);// move regex search to _after_ replacement
MIXIN_MATCH.lastIndex=idx+replacement.length}return text}/**
     * produce variable consumption at the site of mixin consumption
     * `@apply` --foo; -> for all props (${propname}: var(--foo_-_${propname}, ${fallback[propname]}}))
     * Example:
     *  border: var(--foo_-_border); padding: var(--foo_-_padding, 2px)
     *
     * @param {string} mixinName
     * @param {Object} fallbacks
     * @return {string}
     */},{key:"_atApplyToCssProperties",value:function _atApplyToCssProperties(mixinName,fallbacks){mixinName=mixinName.replace(APPLY_NAME_CLEAN,"");var vars=[],mixinEntry=this._map.get(mixinName);// if we depend on a mixin before it is created
// make a sentinel entry in the map to add this element as a dependency for when it is defined.
if(!mixinEntry){this._map.set(mixinName,{});mixinEntry=this._map.get(mixinName)}if(mixinEntry){if(this._currentElement){mixinEntry.dependants[this._currentElement]=!0}var _p3,parts,f,properties=mixinEntry.properties;for(_p3 in properties){f=fallbacks&&fallbacks[_p3];parts=[_p3,": var(",mixinName,MIXIN_VAR_SEP,_p3];if(f){parts.push(",",f.replace(IMPORTANT,""))}parts.push(")");if(IMPORTANT.test(properties[_p3])){parts.push(" !important")}vars.push(parts.join(""))}}return vars.join("; ")}/**
     * @param {string} property
     * @param {string} value
     * @return {string}
     */},{key:"_replaceInitialOrInherit",value:function _replaceInitialOrInherit(property,value){var match=INITIAL_INHERIT.exec(value);if(match){if(match[1]){// initial
// replace `initial` with the concrete initial value for this property
value=this._getInitialValueForProperty(property)}else{// inherit
// with this purposfully illegal value, the variable will be invalid at
// compute time (https://www.w3.org/TR/css-variables/#invalid-at-computed-value-time)
// and for inheriting values, will behave similarly
// we cannot support the same behavior for non inheriting values like 'border'
value="apply-shim-inherit"}}return value}/**
     * "parse" a mixin definition into a map of properties and values
     * cssTextToMap('border: 2px solid black') -> ('border', '2px solid black')
     * @param {string} text
     * @param {boolean=} replaceInitialOrInherit
     * @return {!Object<string, string>}
     */},{key:"_cssTextToMap",value:function _cssTextToMap(text){for(var replaceInitialOrInherit=1<arguments.length&&arguments[1]!==void 0?arguments[1]:!1,props=text.split(";"),property,value,out={},i=0,_p4,sp;i<props.length;i++){_p4=props[i];if(_p4){sp=_p4.split(":");// ignore lines that aren't definitions like @media
if(1<sp.length){property=sp[0].trim();// some properties may have ':' in the value, like data urls
value=sp.slice(1).join(":");if(replaceInitialOrInherit){value=this._replaceInitialOrInherit(property,value)}out[property]=value}}}return out}/**
     * @param {MixinMapEntry} mixinEntry
     */},{key:"_invalidateMixinEntry",value:function _invalidateMixinEntry(mixinEntry){if(!invalidCallback){return}for(var elementName in mixinEntry.dependants){if(elementName!==this._currentElement){invalidCallback(elementName)}}}/**
     * @param {string} matchText
     * @param {string} propertyName
     * @param {?string} valueProperty
     * @param {?string} valueMixin
     * @param {!StyleNode} rule
     * @return {string}
     */},{key:"_produceCssProperties",value:function _produceCssProperties(matchText,propertyName,valueProperty,valueMixin,rule){var _this5=this;// handle case where property value is a mixin
if(valueProperty){// form: --mixin2: var(--mixin1), where --mixin1 is in the map
processVariableAndFallback(valueProperty,function(prefix,value){if(value&&_this5._map.get(value)){valueMixin="@apply ".concat(value,";")}})}if(!valueMixin){return matchText}var mixinAsProperties=this._consumeCssProperties(""+valueMixin,rule),prefix=matchText.slice(0,matchText.indexOf("--")),mixinValues=this._cssTextToMap(mixinAsProperties,!0),combinedProps=mixinValues,mixinEntry=this._map.get(propertyName),oldProps=mixinEntry&&mixinEntry.properties;if(oldProps){// NOTE: since we use mixin, the map of properties is updated here
// and this is what we want.
combinedProps=Object.assign(Object.create(oldProps),mixinValues)}else{this._map.set(propertyName,combinedProps)}var out=[],p,v,needToInvalidate=!1;for(p in combinedProps){v=mixinValues[p];// if property not defined by current mixin, set initial
if(v===void 0){v="initial"}if(oldProps&&!(p in oldProps)){needToInvalidate=!0}out.push("".concat(propertyName).concat(MIXIN_VAR_SEP).concat(p,": ").concat(v))}if(needToInvalidate){this._invalidateMixinEntry(mixinEntry)}if(mixinEntry){mixinEntry.properties=combinedProps}// because the mixinMap is global, the mixin might conflict with
// a different scope's simple variable definition:
// Example:
// some style somewhere:
// --mixin1:{ ... }
// --mixin2: var(--mixin1);
// some other element:
// --mixin1: 10px solid red;
// --foo: var(--mixin1);
// In this case, we leave the original variable definition in place.
if(valueProperty){prefix="".concat(matchText,";").concat(prefix)}return"".concat(prefix).concat(out.join("; "),";")}}]);return ApplyShim}();_exports.$applyShimDefault=ApplyShim;/* exports */ /* eslint-disable no-self-assign */ApplyShim.prototype.detectMixin=ApplyShim.prototype.detectMixin;ApplyShim.prototype.transformStyle=ApplyShim.prototype.transformStyle;ApplyShim.prototype.transformCustomStyle=ApplyShim.prototype.transformCustomStyle;ApplyShim.prototype.transformRules=ApplyShim.prototype.transformRules;ApplyShim.prototype.transformRule=ApplyShim.prototype.transformRule;ApplyShim.prototype.transformTemplate=ApplyShim.prototype.transformTemplate;ApplyShim.prototype._separator=MIXIN_VAR_SEP;/* eslint-enable no-self-assign */Object.defineProperty(ApplyShim.prototype,"invalidCallback",{/** @return {?function(string)} */get:function get(){return invalidCallback},/** @param {?function(string)} cb */set:function set(cb){invalidCallback=cb}});var applyShim={default:ApplyShim};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$applyShim$1=applyShim;"use strict";/**
               * @const {!Object<string, !HTMLTemplateElement>}
               */var templateMap={};_exports.$templateMapDefault=templateMap;var templateMap$1={default:templateMap};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$templateMap=templateMap$1;"use strict";/*
               * Utilities for handling invalidating apply-shim mixins for a given template.
               *
               * The invalidation strategy involves keeping track of the "current" version of a template's mixins, and updating that count when a mixin is invalidated.
               * The template
               */ /** @const {string} */var CURRENT_VERSION="_applyShimCurrentVersion",NEXT_VERSION="_applyShimNextVersion",VALIDATING_VERSION="_applyShimValidatingVersion",promise=Promise.resolve();/** @const {string} */ /**
                                    * @param {string} elementName
                                    */function invalidate(elementName){var template=templateMap[elementName];if(template){invalidateTemplate(template)}}/**
   * This function can be called multiple times to mark a template invalid
   * and signal that the style inside must be regenerated.
   *
   * Use `startValidatingTemplate` to begin an asynchronous validation cycle.
   * During that cycle, call `templateIsValidating` to see if the template must
   * be revalidated
   * @param {HTMLTemplateElement} template
   */function invalidateTemplate(template){// default the current version to 0
template[CURRENT_VERSION]=template[CURRENT_VERSION]||0;// ensure the "validating for" flag exists
template[VALIDATING_VERSION]=template[VALIDATING_VERSION]||0;// increment the next version
template[NEXT_VERSION]=(template[NEXT_VERSION]||0)+1}/**
   * @param {string} elementName
   * @return {boolean}
   */function isValid(elementName){var template=templateMap[elementName];if(template){return templateIsValid(template)}return!0}/**
   * @param {HTMLTemplateElement} template
   * @return {boolean}
   */function templateIsValid(template){return template[CURRENT_VERSION]===template[NEXT_VERSION]}/**
   * @param {string} elementName
   * @return {boolean}
   */function isValidating(elementName){var template=templateMap[elementName];if(template){return templateIsValidating(template)}return!1}/**
   * Returns true if the template is currently invalid and `startValidating` has been called since the last invalidation.
   * If false, the template must be validated.
   * @param {HTMLTemplateElement} template
   * @return {boolean}
   */function templateIsValidating(template){return!templateIsValid(template)&&template[VALIDATING_VERSION]===template[NEXT_VERSION]}/**
   * the template is marked as `validating` for one microtask so that all instances
   * found in the tree crawl of `applyStyle` will update themselves,
   * but the template will only be updated once.
   * @param {string} elementName
  */function startValidating(elementName){var template=templateMap[elementName];startValidatingTemplate(template)}/**
   * Begin an asynchronous invalidation cycle.
   * This should be called after every validation of a template
   *
   * After one microtask, the template will be marked as valid until the next call to `invalidateTemplate`
   * @param {HTMLTemplateElement} template
   */function startValidatingTemplate(template){// remember that the current "next version" is the reason for this validation cycle
template[VALIDATING_VERSION]=template[NEXT_VERSION];// however, there only needs to be one async task to clear the counters
if(!template._validating){template._validating=!0;promise.then(function(){// sync the current version to let future invalidations cause a refresh cycle
template[CURRENT_VERSION]=template[NEXT_VERSION];template._validating=!1})}}/**
   * @return {boolean}
   */function elementsAreInvalid(){for(var elementName in templateMap){var _template=templateMap[elementName];if(!templateIsValid(_template)){return!0}}return!1}var applyShimUtils={invalidate:invalidate,invalidateTemplate:invalidateTemplate,isValid:isValid,templateIsValid:templateIsValid,isValidating:isValidating,templateIsValidating:templateIsValidating,startValidating:startValidating,startValidatingTemplate:startValidatingTemplate,elementsAreInvalid:elementsAreInvalid};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$applyShimUtils=applyShimUtils;"use strict";/** @type {Promise<void>} */var readyPromise=null,whenReady=window.HTMLImports&&window.HTMLImports.whenReady||null,resolveFn;/** @type {?function(?function())} */ /**
                * @param {?function()} callback
                */function documentWait(callback){requestAnimationFrame(function(){if(whenReady){whenReady(callback)}else{if(!readyPromise){readyPromise=new Promise(function(resolve){resolveFn=resolve});if("complete"===document.readyState){resolveFn()}else{document.addEventListener("readystatechange",function(){if("complete"===document.readyState){resolveFn()}})}}readyPromise.then(function(){callback&&callback()})}})}var documentWait$1={default:documentWait};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$documentWait=documentWait$1;"use strict";var CustomStyleProvider;_exports.CustomStyleProvider=CustomStyleProvider;var SEEN_MARKER="__seenByShadyCSS",CACHED_STYLE="__shadyCSSCachedStyle",transformFn=null,validateFn=null,CustomStyleInterface=/*#__PURE__*/function(){function CustomStyleInterface(){babelHelpers.classCallCheck(this,CustomStyleInterface);/** @type {!Array<!CustomStyleProvider>} */this.customStyles=[];this.enqueued=!1;// NOTE(dfreedm): use quotes here to prevent closure inlining to `function(){}`;
documentWait(function(){if(window.ShadyCSS.flushCustomStyles){window.ShadyCSS.flushCustomStyles()}})}/**
     * Queue a validation for new custom styles to batch style recalculations
     */babelHelpers.createClass(CustomStyleInterface,[{key:"enqueueDocumentValidation",value:function enqueueDocumentValidation(){if(this.enqueued||!validateFn){return}this.enqueued=!0;documentWait(validateFn)}/**
     * @param {!HTMLStyleElement} style
     */},{key:"addCustomStyle",value:function addCustomStyle(style){if(!style[SEEN_MARKER]){style[SEEN_MARKER]=!0;this.customStyles.push(style);this.enqueueDocumentValidation()}}/**
     * @param {!CustomStyleProvider} customStyle
     * @return {HTMLStyleElement}
     */},{key:"getStyleForCustomStyle",value:function getStyleForCustomStyle(customStyle){if(customStyle[CACHED_STYLE]){return customStyle[CACHED_STYLE]}var style;if(customStyle.getStyle){style=customStyle.getStyle()}else{style=customStyle}return style}/**
     * @return {!Array<!CustomStyleProvider>}
     */},{key:"processStyles",value:function processStyles(){for(var cs=this.customStyles,i=0,_customStyle;i<cs.length;i++){_customStyle=cs[i];if(_customStyle[CACHED_STYLE]){continue}var _style3=this.getStyleForCustomStyle(_customStyle);if(_style3){// HTMLImports polyfill may have cloned the style into the main document,
// which is referenced with __appliedElement.
var styleToTransform=/** @type {!HTMLStyleElement} */_style3.__appliedElement||_style3;if(transformFn){transformFn(styleToTransform)}_customStyle[CACHED_STYLE]=styleToTransform}}return cs}}]);return CustomStyleInterface}();_exports.$customStyleInterfaceDefault=CustomStyleInterface;/* eslint-disable no-self-assign */CustomStyleInterface.prototype.addCustomStyle=CustomStyleInterface.prototype.addCustomStyle;CustomStyleInterface.prototype.getStyleForCustomStyle=CustomStyleInterface.prototype.getStyleForCustomStyle;CustomStyleInterface.prototype.processStyles=CustomStyleInterface.prototype.processStyles;/* eslint-enable no-self-assign */Object.defineProperties(CustomStyleInterface.prototype,{transformCallback:{/** @return {?function(!HTMLStyleElement)} */get:function get(){return transformFn},/** @param {?function(!HTMLStyleElement)} fn */set:function set(fn){transformFn=fn}},validateCallback:{/** @return {?function()} */get:function get(){return validateFn},/**
     * @param {?function()} fn
     * @this {CustomStyleInterface}
     */set:function set(fn){var needsEnqueue=!1;if(!validateFn){needsEnqueue=!0}validateFn=fn;if(needsEnqueue){this.enqueueDocumentValidation()}}}});/** @typedef {{
     * customStyles: !Array<!CustomStyleProvider>,
     * addCustomStyle: function(!CustomStyleProvider),
     * getStyleForCustomStyle: function(!CustomStyleProvider): HTMLStyleElement,
     * findStyles: function(),
     * transformCallback: ?function(!HTMLStyleElement),
     * validateCallback: ?function()
     * }}
     */var CustomStyleInterfaceInterface={};_exports.CustomStyleInterfaceInterface=CustomStyleInterfaceInterface;var customStyleInterface={CustomStyleProvider:CustomStyleProvider,default:CustomStyleInterface,CustomStyleInterfaceInterface:CustomStyleInterfaceInterface};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$customStyleInterface$1=customStyleInterface;"use strict";var applyShim$1=new ApplyShim,ApplyShimInterface=/*#__PURE__*/function(){function ApplyShimInterface(){babelHelpers.classCallCheck(this,ApplyShimInterface);/** @type {?CustomStyleInterfaceInterface} */this.customStyleInterface=null;applyShim$1.invalidCallback=invalidate}babelHelpers.createClass(ApplyShimInterface,[{key:"ensure",value:function ensure(){var _this6=this;if(this.customStyleInterface){return}if(window.ShadyCSS.CustomStyleInterface){this.customStyleInterface=/** @type {!CustomStyleInterfaceInterface} */window.ShadyCSS.CustomStyleInterface;this.customStyleInterface.transformCallback=function(style){applyShim$1.transformCustomStyle(style)};this.customStyleInterface.validateCallback=function(){requestAnimationFrame(function(){if(_this6.customStyleInterface.enqueued){_this6.flushCustomStyles()}})}}}/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     */},{key:"prepareTemplate",value:function prepareTemplate(template,elementName){this.ensure();if(elementHasBuiltCss(template)){return}templateMap[elementName]=template;var ast=applyShim$1.transformTemplate(template,elementName);// save original style ast to use for revalidating instances
template._styleAst=ast}},{key:"flushCustomStyles",value:function flushCustomStyles(){this.ensure();if(!this.customStyleInterface){return}var styles=this.customStyleInterface.processStyles();if(!this.customStyleInterface.enqueued){return}for(var i=0;i<styles.length;i++){var cs=styles[i],_style4=this.customStyleInterface.getStyleForCustomStyle(cs);if(_style4){applyShim$1.transformCustomStyle(_style4)}}this.customStyleInterface.enqueued=!1}/**
     * @param {HTMLElement} element
     * @param {Object=} properties
     */},{key:"styleSubtree",value:function styleSubtree(element,properties){this.ensure();if(properties){updateNativeProperties(element,properties)}if(element.shadowRoot){this.styleElement(element);for(var shadowChildren=/** @type {!ParentNode} */element.shadowRoot.children||element.shadowRoot.childNodes,i=0;i<shadowChildren.length;i++){this.styleSubtree(/** @type {HTMLElement} */shadowChildren[i])}}else{for(var children=element.children||element.childNodes,_i=0;_i<children.length;_i++){this.styleSubtree(/** @type {HTMLElement} */children[_i])}}}/**
     * @param {HTMLElement} element
     */},{key:"styleElement",value:function styleElement(element){this.ensure();var _getIsExtends=getIsExtends(element),is=_getIsExtends.is,template=templateMap[is];if(template&&elementHasBuiltCss(template)){return}if(template&&!templateIsValid(template)){// only revalidate template once
if(!templateIsValidating(template)){this.prepareTemplate(template,is);startValidatingTemplate(template)}// update this element instance
var _root=element.shadowRoot;if(_root){var _style5=/** @type {HTMLStyleElement} */_root.querySelector("style");if(_style5){// reuse the template's style ast, it has all the original css text
_style5.__cssRules=template._styleAst;_style5.textContent=toCssText(template._styleAst)}}}}/**
     * @param {Object=} properties
     */},{key:"styleDocument",value:function styleDocument(properties){this.ensure();this.styleSubtree(document.body,properties)}}]);return ApplyShimInterface}();if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){var applyShimInterface=new ApplyShimInterface,_CustomStyleInterface=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;/** @suppress {duplicate} */window.ShadyCSS={/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */prepareTemplate:function prepareTemplate(template,elementName,elementExtends){// eslint-disable-line no-unused-vars
applyShimInterface.flushCustomStyles();applyShimInterface.prepareTemplate(template,elementName)},/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */prepareTemplateStyles:function prepareTemplateStyles(template,elementName,elementExtends){window.ShadyCSS.prepareTemplate(template,elementName,elementExtends)},/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     */prepareTemplateDom:function prepareTemplateDom(template,elementName){},// eslint-disable-line no-unused-vars
/**
     * @param {!HTMLElement} element
     * @param {Object=} properties
     */styleSubtree:function styleSubtree(element,properties){applyShimInterface.flushCustomStyles();applyShimInterface.styleSubtree(element,properties)},/**
     * @param {!HTMLElement} element
     */styleElement:function styleElement(element){applyShimInterface.flushCustomStyles();applyShimInterface.styleElement(element)},/**
     * @param {Object=} properties
     */styleDocument:function styleDocument(properties){applyShimInterface.flushCustomStyles();applyShimInterface.styleDocument(properties)},/**
     * @param {Element} element
     * @param {string} property
     * @return {string}
     */getComputedStyleValue:function getComputedStyleValue(element,property){return _getComputedStyleValue(element,property)},flushCustomStyles:function flushCustomStyles(){applyShimInterface.flushCustomStyles()},nativeCss:nativeCssVariables,nativeShadow:nativeShadow,cssBuild:cssBuild,disableRuntime:disableRuntime};if(_CustomStyleInterface){window.ShadyCSS.CustomStyleInterface=_CustomStyleInterface}}window.ShadyCSS.ApplyShim=applyShim$1;/**
                                         @license
                                         Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
                                         This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
                                         The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
                                         The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
                                         Code distributed by Google as part of the polymer project is also
                                         subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
                                         */ /* eslint-disable no-unused-vars */ /**
                                                                                 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
                                                                                 * We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
                                                                                 *
                                                                                 * @param {string} prop Property name
                                                                                 * @param {?Object} obj Reference object
                                                                                 * @return {string} Potentially renamed property name
                                                                                 */window.JSCompiler_renameProperty=function(prop,obj){return prop};/* eslint-enable */var CSS_URL_RX=/(url\()([^)]*)(\))/g,ABS_URL=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/,workingURL,resolveDoc;/**
                 * Resolves the given URL against the provided `baseUri'.
                 *
                 * Note that this function performs no resolution for URLs that start
                 * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
                 * URL resolution, use `window.URL`.
                 *
                 * @param {string} url Input URL to resolve
                 * @param {?string=} baseURI Base URI to resolve the URL against
                 * @return {string} resolved URL
                 */function _resolveUrl(url,baseURI){if(url&&ABS_URL.test(url)){return url}if("//"===url){return url}// Lazy feature detection.
if(workingURL===void 0){workingURL=!1;try{var u=new URL("b","http://a");u.pathname="c%20d";workingURL="http://a/c%20d"===u.href}catch(e){// silently fail
}}if(!baseURI){baseURI=document.baseURI||window.location.href}if(workingURL){try{return new URL(url,baseURI).href}catch(e){// Bad url or baseURI structure. Do not attempt to resolve.
return url}}// Fallback to creating an anchor into a disconnected document.
if(!resolveDoc){resolveDoc=document.implementation.createHTMLDocument("temp");resolveDoc.base=resolveDoc.createElement("base");resolveDoc.head.appendChild(resolveDoc.base);resolveDoc.anchor=resolveDoc.createElement("a");resolveDoc.body.appendChild(resolveDoc.anchor)}resolveDoc.base.href=baseURI;resolveDoc.anchor.href=url;return resolveDoc.anchor.href||url}/**
   * Resolves any relative URL's in the given CSS text against the provided
   * `ownerDocument`'s `baseURI`.
   *
   * @param {string} cssText CSS text to process
   * @param {string} baseURI Base URI to resolve the URL against
   * @return {string} Processed CSS text with resolved URL's
   */function resolveCss(cssText,baseURI){return cssText.replace(CSS_URL_RX,function(m,pre,url,post){return pre+"'"+_resolveUrl(url.replace(/["']/g,""),baseURI)+"'"+post})}/**
   * Returns a path from a given `url`. The path includes the trailing
   * `/` from the url.
   *
   * @param {string} url Input URL to transform
   * @return {string} resolved path
   */function pathFromUrl(url){return url.substring(0,url.lastIndexOf("/")+1)}var resolveUrl$1={resolveUrl:_resolveUrl,resolveCss:resolveCss,pathFromUrl:pathFromUrl};_exports.$resolveUrl=resolveUrl$1;var useShadow=!window.ShadyDOM;_exports.useShadow=useShadow;var useNativeCSSProperties=!!(!window.ShadyCSS||window.ShadyCSS.nativeCss);_exports.useNativeCSSProperties=useNativeCSSProperties;var useNativeCustomElements=!window.customElements.polyfillWrapFlushCallback;/**
                                                                                          * Globally settable property that is automatically assigned to
                                                                                          * `ElementMixin` instances, useful for binding in templates to
                                                                                          * make URL's relative to an application's root.  Defaults to the main
                                                                                          * document URL, but can be overridden by users.  It may be useful to set
                                                                                          * `rootPath` to provide a stable application mount path when
                                                                                          * using client side routing.
                                                                                          */_exports.useNativeCustomElements=useNativeCustomElements;var rootPath=pathFromUrl(document.baseURI||window.location.href);/**
                                                                              * Sets the global rootPath property used by `ElementMixin` and
                                                                              * available via `rootPath`.
                                                                              *
                                                                              * @param {string} path The new root path
                                                                              * @return {void}
                                                                              */_exports.rootPath=rootPath;var setRootPath=function setRootPath(path){_exports.rootPath=rootPath=path};/**
    * A global callback used to sanitize any value before inserting it into the DOM.
    * The callback signature is:
    *
    *  function sanitizeDOMValue(value, name, type, node) { ... }
    *
    * Where:
    *
    * `value` is the value to sanitize.
    * `name` is the name of an attribute or property (for example, href).
    * `type` indicates where the value is being inserted: one of property, attribute, or text.
    * `node` is the node where the value is being inserted.
    *
    * @type {(function(*,string,string,Node):*)|undefined}
    */_exports.setRootPath=setRootPath;var sanitizeDOMValue=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;/**
                                                                                               * Sets the global sanitizeDOMValue available via this module's exported
                                                                                               * `sanitizeDOMValue` variable.
                                                                                               *
                                                                                               * @param {(function(*,string,string,Node):*)|undefined} newSanitizeDOMValue the global sanitizeDOMValue callback
                                                                                               * @return {void}
                                                                                               */_exports.sanitizeDOMValue=sanitizeDOMValue;var setSanitizeDOMValue=function setSanitizeDOMValue(newSanitizeDOMValue){_exports.sanitizeDOMValue=sanitizeDOMValue=newSanitizeDOMValue};/**
    * Globally settable property to make Polymer Gestures use passive TouchEvent listeners when recognizing gestures.
    * When set to `true`, gestures made from touch will not be able to prevent scrolling, allowing for smoother
    * scrolling performance.
    * Defaults to `false` for backwards compatibility.
    */_exports.setSanitizeDOMValue=setSanitizeDOMValue;var passiveTouchGestures=!1;/**
                                          * Sets `passiveTouchGestures` globally for all elements using Polymer Gestures.
                                          *
                                          * @param {boolean} usePassive enable or disable passive touch gestures globally
                                          * @return {void}
                                          */_exports.passiveTouchGestures=passiveTouchGestures;var setPassiveTouchGestures=function setPassiveTouchGestures(usePassive){_exports.passiveTouchGestures=passiveTouchGestures=usePassive};/**
    * Setting to ensure Polymer template evaluation only occurs based on tempates
    * defined in trusted script.  When true, `<dom-module>` re-registration is
    * disallowed, `<dom-bind>` is disabled, and `<dom-if>`/`<dom-repeat>`
    * templates will only evaluate in the context of a trusted element template.
    */_exports.setPassiveTouchGestures=setPassiveTouchGestures;var strictTemplatePolicy=!1;/**
                                          * Sets `strictTemplatePolicy` globally for all elements
                                          *
                                          * @param {boolean} useStrictPolicy enable or disable strict template policy
                                          *   globally
                                          * @return {void}
                                          */_exports.strictTemplatePolicy=strictTemplatePolicy;var setStrictTemplatePolicy=function setStrictTemplatePolicy(useStrictPolicy){_exports.strictTemplatePolicy=strictTemplatePolicy=useStrictPolicy};/**
    * Setting to enable dom-module lookup from Polymer.Element.  By default,
    * templates must be defined in script using the `static get template()`
    * getter and the `html` tag function.  To enable legacy loading of templates
    * via dom-module, set this flag to true.
    */_exports.setStrictTemplatePolicy=setStrictTemplatePolicy;var allowTemplateFromDomModule=!1;/**
                                                * Sets `lookupTemplateFromDomModule` globally for all elements
                                                *
                                                * @param {boolean} allowDomModule enable or disable template lookup
                                                *   globally
                                                * @return {void}
                                                */_exports.allowTemplateFromDomModule=allowTemplateFromDomModule;var setAllowTemplateFromDomModule=function setAllowTemplateFromDomModule(allowDomModule){_exports.allowTemplateFromDomModule=allowTemplateFromDomModule=allowDomModule};/**
    * Setting to skip processing style includes and re-writing urls in css styles.
    * Normally "included" styles are pulled into the element and all urls in styles
    * are re-written to be relative to the containing script url.
    * If no includes or relative urls are used in styles, these steps can be
    * skipped as an optimization.
    */_exports.setAllowTemplateFromDomModule=setAllowTemplateFromDomModule;var legacyOptimizations=!1;/**
                                         * Sets `legacyOptimizations` globally for all elements to enable optimizations
                                         * when only legacy based elements are used.
                                         *
                                         * @param {boolean} useLegacyOptimizations enable or disable legacy optimizations
                                         * includes and url rewriting
                                         * @return {void}
                                         */_exports.legacyOptimizations=legacyOptimizations;var setLegacyOptimizations=function setLegacyOptimizations(useLegacyOptimizations){_exports.legacyOptimizations=legacyOptimizations=useLegacyOptimizations};/**
    * Setting to perform initial rendering synchronously when running under ShadyDOM.
    * This matches the behavior of Polymer 1.
    */_exports.setLegacyOptimizations=setLegacyOptimizations;var syncInitialRender=!1;/**
                                       * Sets `syncInitialRender` globally for all elements to enable synchronous
                                       * initial rendering.
                                       *
                                       * @param {boolean} useSyncInitialRender enable or disable synchronous initial
                                       * rendering globally.
                                       * @return {void}
                                       */_exports.syncInitialRender=syncInitialRender;var setSyncInitialRender=function setSyncInitialRender(useSyncInitialRender){_exports.syncInitialRender=syncInitialRender=useSyncInitialRender};/**
    * Setting to cancel synthetic click events fired by older mobile browsers. Modern browsers
    * no longer fire synthetic click events, and the cancellation behavior can interfere
    * when programmatically clicking on elements.
    */_exports.setSyncInitialRender=setSyncInitialRender;var cancelSyntheticClickEvents=!0;/**
                                               * Sets `setCancelSyntheticEvents` globally for all elements to cancel synthetic click events.
                                               *
                                               * @param {boolean} useCancelSyntheticClickEvents enable or disable cancelling synthetic
                                               * events
                                               * @return {void}
                                               */_exports.cancelSyntheticClickEvents=cancelSyntheticClickEvents;var setCancelSyntheticClickEvents=function setCancelSyntheticClickEvents(useCancelSyntheticClickEvents){_exports.cancelSyntheticClickEvents=cancelSyntheticClickEvents=useCancelSyntheticClickEvents};_exports.setCancelSyntheticClickEvents=setCancelSyntheticClickEvents;var settings={useShadow:useShadow,useNativeCSSProperties:useNativeCSSProperties,useNativeCustomElements:useNativeCustomElements,get rootPath(){return rootPath},setRootPath:setRootPath,get sanitizeDOMValue(){return sanitizeDOMValue},setSanitizeDOMValue:setSanitizeDOMValue,get passiveTouchGestures(){return passiveTouchGestures},setPassiveTouchGestures:setPassiveTouchGestures,get strictTemplatePolicy(){return strictTemplatePolicy},setStrictTemplatePolicy:setStrictTemplatePolicy,get allowTemplateFromDomModule(){return allowTemplateFromDomModule},setAllowTemplateFromDomModule:setAllowTemplateFromDomModule,get legacyOptimizations(){return legacyOptimizations},setLegacyOptimizations:setLegacyOptimizations,get syncInitialRender(){return syncInitialRender},setSyncInitialRender:setSyncInitialRender,get cancelSyntheticClickEvents(){return cancelSyntheticClickEvents},setCancelSyntheticClickEvents:setCancelSyntheticClickEvents};_exports.$settings=settings;var dedupeId=0;/**
                   * @constructor
                   * @extends {Function}
                   * @private
                   */function MixinFunction(){}/** @type {(WeakMap | undefined)} */MixinFunction.prototype.__mixinApplications;/** @type {(Object | undefined)} */MixinFunction.prototype.__mixinSet;/* eslint-disable valid-jsdoc */ /**
                                                                      * Wraps an ES6 class expression mixin such that the mixin is only applied
                                                                      * if it has not already been applied its base argument. Also memoizes mixin
                                                                      * applications.
                                                                      *
                                                                      * @template T
                                                                      * @param {T} mixin ES6 class expression mixin to wrap
                                                                      * @return {T}
                                                                      * @suppress {invalidCasts}
                                                                      */var dedupingMixin=function dedupingMixin(mixin){var mixinApplications=/** @type {!MixinFunction} */mixin.__mixinApplications;if(!mixinApplications){mixinApplications=new WeakMap;/** @type {!MixinFunction} */mixin.__mixinApplications=mixinApplications}// maintain a unique id for each mixin
var mixinDedupeId=dedupeId++;function dedupingMixin(base){var baseSet=/** @type {!MixinFunction} */base.__mixinSet;if(baseSet&&baseSet[mixinDedupeId]){return base}var map=mixinApplications,extended=map.get(base);if(!extended){extended=/** @type {!Function} */mixin(base);map.set(base,extended)}// copy inherited mixin set from the extended class, or the base class
// NOTE: we avoid use of Set here because some browser (IE11)
// cannot extend a base Set via the constructor.
var mixinSet=Object.create(/** @type {!MixinFunction} */extended.__mixinSet||baseSet||null);mixinSet[mixinDedupeId]=!0;/** @type {!MixinFunction} */extended.__mixinSet=mixinSet;return extended}return dedupingMixin};/* eslint-enable valid-jsdoc */_exports.dedupingMixin=dedupingMixin;var mixin={dedupingMixin:dedupingMixin};_exports.$mixin=mixin;var modules={},lcModules={};/**
                     * Sets a dom-module into the global registry by id.
                     *
                     * @param {string} id dom-module id
                     * @param {DomModule} module dom-module instance
                     * @return {void}
                     */function setModule(id,module){// store id separate from lowercased id so that
// in all cases mixedCase id will stored distinctly
// and lowercase version is a fallback
modules[id]=lcModules[id.toLowerCase()]=module}/**
   * Retrieves a dom-module from the global registry by id.
   *
   * @param {string} id dom-module id
   * @return {DomModule!} dom-module instance
   */function findModule(id){return modules[id]||lcModules[id.toLowerCase()]}function styleOutsideTemplateCheck(inst){if(inst.querySelector("style")){console.warn("dom-module %s has style outside template",inst.id)}}/**
   * The `dom-module` element registers the dom it contains to the name given
   * by the module's id attribute. It provides a unified database of dom
   * accessible via its static `import` API.
   *
   * A key use case of `dom-module` is for providing custom element `<template>`s
   * via HTML imports that are parsed by the native HTML parser, that can be
   * relocated during a bundling pass and still looked up by `id`.
   *
   * Example:
   *
   *     <dom-module id="foo">
   *       <img src="stuff.png">
   *     </dom-module>
   *
   * Then in code in some other location that cannot access the dom-module above
   *
   *     let img = customElements.get('dom-module').import('foo', 'img');
   *
   * @customElement
   * @extends HTMLElement
   * @summary Custom element that provides a registry of relocatable DOM content
   *   by `id` that is agnostic to bundling.
   * @unrestricted
   */var DomModule=/*#__PURE__*/function(_HTMLElement){babelHelpers.inherits(DomModule,_HTMLElement);function DomModule(){babelHelpers.classCallCheck(this,DomModule);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(DomModule).apply(this,arguments))}babelHelpers.createClass(DomModule,[{key:"attributeChangedCallback",/* eslint-disable no-unused-vars */ /**
                                         * @param {string} name Name of attribute.
                                         * @param {?string} old Old value of attribute.
                                         * @param {?string} value Current value of attribute.
                                         * @param {?string} namespace Attribute namespace.
                                         * @return {void}
                                         * @override
                                         */value:function attributeChangedCallback(name,old,value,namespace){if(old!==value){this.register()}}/* eslint-enable no-unused-args */ /**
                                        * The absolute URL of the original location of this `dom-module`.
                                        *
                                        * This value will differ from this element's `ownerDocument` in the
                                        * following ways:
                                        * - Takes into account any `assetpath` attribute added during bundling
                                        *   to indicate the original location relative to the bundled location
                                        * - Uses the HTMLImports polyfill's `importForElement` API to ensure
                                        *   the path is relative to the import document's location since
                                        *   `ownerDocument` is not currently polyfilled
                                        */},{key:"register",/**
     * Registers the dom-module at a given id. This method should only be called
     * when a dom-module is imperatively created. For
     * example, `document.createElement('dom-module').register('foo')`.
     * @param {string=} id The id at which to register the dom-module.
     * @return {void}
     */value:function register(id){id=id||this.id;if(id){// Under strictTemplatePolicy, reject and null out any re-registered
// dom-module since it is ambiguous whether first-in or last-in is trusted
if(strictTemplatePolicy&&findModule(id)!==void 0){setModule(id,null);throw new Error("strictTemplatePolicy: dom-module ".concat(id," re-registered"))}this.id=id;setModule(id,this);styleOutsideTemplateCheck(this)}}},{key:"assetpath",get:function get(){// Don't override existing assetpath.
if(!this.__assetpath){// note: assetpath set via an attribute must be relative to this
// element's location; accomodate polyfilled HTMLImports
var owner=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,url=_resolveUrl(this.getAttribute("assetpath")||"",owner.baseURI);this.__assetpath=pathFromUrl(url)}return this.__assetpath}}],[{key:"import",/**
     * Retrieves the element specified by the css `selector` in the module
     * registered by `id`. For example, this.import('foo', 'img');
     * @param {string} id The id of the dom-module in which to search.
     * @param {string=} selector The css selector by which to find the element.
     * @return {Element} Returns the element which matches `selector` in the
     * module registered at the specified `id`.
     *
     * @export
     * @nocollapse Referred to indirectly in style-gather.js
     */value:function _import(id,selector){if(id){var m=findModule(id);if(m&&selector){return m.querySelector(selector)}return m}return null}},{key:"observedAttributes",/** @override */get:function get(){return["id"]}}]);return DomModule}(babelHelpers.wrapNativeSuper(HTMLElement));_exports.DomModule=DomModule;DomModule.prototype.modules=modules;customElements.define("dom-module",DomModule);var domModule={DomModule:DomModule};_exports.$domModule=domModule;var MODULE_STYLE_LINK_SELECTOR="link[rel=import][type~=css]",INCLUDE_ATTR="include",SHADY_UNSCOPED_ATTR="shady-unscoped";/**
                                               * @param {string} moduleId .
                                               * @return {?DomModule} .
                                               */function importModule(moduleId){return(/** @type {?DomModule} */DomModule.import(moduleId))}function styleForImport(importDoc){// NOTE: polyfill affordance.
// under the HTMLImports polyfill, there will be no 'body',
// but the import pseudo-doc can be used directly.
var container=importDoc.body?importDoc.body:importDoc,importCss=resolveCss(container.textContent,importDoc.baseURI),style=document.createElement("style");style.textContent=importCss;return style}/** @typedef {{assetpath: string}} */var templateWithAssetPath;// eslint-disable-line no-unused-vars
/**
 * Returns a list of <style> elements in a space-separated list of `dom-module`s.
 *
 * @function
 * @param {string} moduleIds List of dom-module id's within which to
 * search for css.
 * @return {!Array<!HTMLStyleElement>} Array of contained <style> elements
 */function stylesFromModules(moduleIds){for(var modules=moduleIds.trim().split(/\s+/),styles=[],i=0;i<modules.length;i++){styles.push.apply(styles,babelHelpers.toConsumableArray(stylesFromModule(modules[i])))}return styles}/**
   * Returns a list of <style> elements in a given `dom-module`.
   * Styles in a `dom-module` can come either from `<style>`s within the
   * first `<template>`, or else from one or more
   * `<link rel="import" type="css">` links outside the template.
   *
   * @param {string} moduleId dom-module id to gather styles from
   * @return {!Array<!HTMLStyleElement>} Array of contained styles.
   */function stylesFromModule(moduleId){var m=importModule(moduleId);if(!m){console.warn("Could not find style data in module named",moduleId);return[]}if(m._styles===void 0){var styles=[];// module imports: <link rel="import" type="css">
styles.push.apply(styles,babelHelpers.toConsumableArray(_stylesFromModuleImports(m)));// include css from the first template in the module
var _template2=/** @type {?HTMLTemplateElement} */m.querySelector("template");if(_template2){styles.push.apply(styles,babelHelpers.toConsumableArray(stylesFromTemplate(_template2,/** @type {templateWithAssetPath} */m.assetpath)))}m._styles=styles}return m._styles}/**
   * Returns the `<style>` elements within a given template.
   *
   * @param {!HTMLTemplateElement} template Template to gather styles from
   * @param {string=} baseURI baseURI for style content
   * @return {!Array<!HTMLStyleElement>} Array of styles
   */function stylesFromTemplate(template,baseURI){if(!template._styles){for(var styles=[],e$=template.content.querySelectorAll("style"),i=0;i<e$.length;i++){var e=e$[i],include=e.getAttribute(INCLUDE_ATTR);// support style sharing by allowing styles to "include"
// other dom-modules that contain styling
if(include){styles.push.apply(styles,babelHelpers.toConsumableArray(stylesFromModules(include).filter(function(item,index,self){return self.indexOf(item)===index})))}if(baseURI){e.textContent=resolveCss(e.textContent,/** @type {string} */baseURI)}styles.push(e)}template._styles=styles}return template._styles}/**
   * Returns a list of <style> elements  from stylesheets loaded via `<link rel="import" type="css">` links within the specified `dom-module`.
   *
   * @param {string} moduleId Id of `dom-module` to gather CSS from
   * @return {!Array<!HTMLStyleElement>} Array of contained styles.
   */function stylesFromModuleImports(moduleId){var m=importModule(moduleId);return m?_stylesFromModuleImports(m):[]}/**
   * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
   * @return {!Array<!HTMLStyleElement>} Array of contained styles
   */function _stylesFromModuleImports(module){for(var styles=[],p$=module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR),i=0,_p5;i<p$.length;i++){_p5=p$[i];if(_p5.import){var importDoc=_p5.import,unscoped=_p5.hasAttribute(SHADY_UNSCOPED_ATTR);if(unscoped&&!importDoc._unscopedStyle){var _style6=styleForImport(importDoc);_style6.setAttribute(SHADY_UNSCOPED_ATTR,"");importDoc._unscopedStyle=_style6}else if(!importDoc._style){importDoc._style=styleForImport(importDoc)}styles.push(unscoped?importDoc._unscopedStyle:importDoc._style)}}return styles}/**
   *
   * Returns CSS text of styles in a space-separated list of `dom-module`s.
   * Note: This method is deprecated, use `stylesFromModules` instead.
   *
   * @deprecated
   * @param {string} moduleIds List of dom-module id's within which to
   * search for css.
   * @return {string} Concatenated CSS content from specified `dom-module`s
   */function cssFromModules(moduleIds){for(var modules=moduleIds.trim().split(/\s+/),cssText="",i=0;i<modules.length;i++){cssText+=cssFromModule(modules[i])}return cssText}/**
   * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
   * can come either from `<style>`s within the first `<template>`, or else
   * from one or more `<link rel="import" type="css">` links outside the
   * template.
   *
   * Any `<styles>` processed are removed from their original location.
   * Note: This method is deprecated, use `styleFromModule` instead.
   *
   * @deprecated
   * @param {string} moduleId dom-module id to gather styles from
   * @return {string} Concatenated CSS content from specified `dom-module`
   */function cssFromModule(moduleId){var m=importModule(moduleId);if(m&&m._cssText===void 0){// module imports: <link rel="import" type="css">
var cssText=_cssFromModuleImports(m),t=/** @type {?HTMLTemplateElement} */m.querySelector("template");// include css from the first template in the module
if(t){cssText+=cssFromTemplate(t,/** @type {templateWithAssetPath} */m.assetpath)}m._cssText=cssText||null}if(!m){console.warn("Could not find style data in module named",moduleId)}return m&&m._cssText||""}/**
   * Returns CSS text of `<styles>` within a given template.
   *
   * Any `<styles>` processed are removed from their original location.
   * Note: This method is deprecated, use `styleFromTemplate` instead.
   *
   * @deprecated
   * @param {!HTMLTemplateElement} template Template to gather styles from
   * @param {string} baseURI Base URI to resolve the URL against
   * @return {string} Concatenated CSS content from specified template
   */function cssFromTemplate(template,baseURI){// if element is a template, get content from its .content
for(var cssText="",e$=stylesFromTemplate(template,baseURI),i=0,e;i<e$.length;i++){e=e$[i];if(e.parentNode){e.parentNode.removeChild(e)}cssText+=e.textContent}return cssText}/**
   * Returns CSS text from stylesheets loaded via `<link rel="import" type="css">`
   * links within the specified `dom-module`.
   *
   * Note: This method is deprecated, use `stylesFromModuleImports` instead.
   *
   * @deprecated
   *
   * @param {string} moduleId Id of `dom-module` to gather CSS from
   * @return {string} Concatenated CSS content from links in specified `dom-module`
   */function cssFromModuleImports(moduleId){var m=importModule(moduleId);return m?_cssFromModuleImports(m):""}/**
   * @deprecated
   * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
   * @return {string} Concatenated CSS content from links in the dom-module
   */function _cssFromModuleImports(module){for(var cssText="",styles=_stylesFromModuleImports(module),i=0;i<styles.length;i++){cssText+=styles[i].textContent}return cssText}var styleGather={stylesFromModules:stylesFromModules,stylesFromModule:stylesFromModule,stylesFromTemplate:stylesFromTemplate,stylesFromModuleImports:stylesFromModuleImports,cssFromModules:cssFromModules,cssFromModule:cssFromModule,cssFromTemplate:cssFromTemplate,cssFromModuleImports:cssFromModuleImports};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */ /* eslint-disable valid-jsdoc */ /**
                                        * Node wrapper to ensure ShadowDOM safe operation regardless of polyfill
                                        * presence or mode. Note that with the introduction of `ShadyDOM.noPatch`,
                                        * a node wrapper must be used to access ShadowDOM API.
                                        * This is similar to using `Polymer.dom` but relies exclusively
                                        * on the presence of the ShadyDOM polyfill rather than requiring the loading
                                        * of legacy (Polymer.dom) API.
                                        * @type {function(Node):Node}
                                        */_exports.$styleGather=styleGather;var wrap$1=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?function(n){return ShadyDOM.patch(n)}:function(n){return n};_exports.wrap=wrap$1;var wrap$2={wrap:wrap$1};_exports.$wrap=wrap$2;function isPath(path){return 0<=path.indexOf(".")}/**
   * Returns the root property name for the given path.
   *
   * Example:
   *
   * ```
   * root('foo.bar.baz') // 'foo'
   * root('foo')         // 'foo'
   * ```
   *
   * @param {string} path Path string
   * @return {string} Root property name
   */function root(path){var dotIndex=path.indexOf(".");if(-1===dotIndex){return path}return path.slice(0,dotIndex)}/**
   * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
   * Returns true if the given path is an ancestor of the base path.
   *
   * Example:
   *
   * ```
   * isAncestor('foo.bar', 'foo')         // true
   * isAncestor('foo.bar', 'foo.bar')     // false
   * isAncestor('foo.bar', 'foo.bar.baz') // false
   * ```
   *
   * @param {string} base Path string to test against.
   * @param {string} path Path string to test.
   * @return {boolean} True if `path` is an ancestor of `base`.
   */function isAncestor(base,path){//     base.startsWith(path + '.');
return 0===base.indexOf(path+".")}/**
   * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
   *
   * Example:
   *
   * ```
   * isDescendant('foo.bar', 'foo.bar.baz') // true
   * isDescendant('foo.bar', 'foo.bar')     // false
   * isDescendant('foo.bar', 'foo')         // false
   * ```
   *
   * @param {string} base Path string to test against.
   * @param {string} path Path string to test.
   * @return {boolean} True if `path` is a descendant of `base`.
   */function isDescendant(base,path){//     path.startsWith(base + '.');
return 0===path.indexOf(base+".")}/**
   * Replaces a previous base path with a new base path, preserving the
   * remainder of the path.
   *
   * User must ensure `path` has a prefix of `base`.
   *
   * Example:
   *
   * ```
   * translate('foo.bar', 'zot', 'foo.bar.baz') // 'zot.baz'
   * ```
   *
   * @param {string} base Current base string to remove
   * @param {string} newBase New base string to replace with
   * @param {string} path Path to translate
   * @return {string} Translated string
   */function translate(base,newBase,path){return newBase+path.slice(base.length)}/**
   * @param {string} base Path string to test against
   * @param {string} path Path string to test
   * @return {boolean} True if `path` is equal to `base`
   */function matches(base,path){return base===path||isAncestor(base,path)||isDescendant(base,path)}/**
   * Converts array-based paths to flattened path.  String-based paths
   * are returned as-is.
   *
   * Example:
   *
   * ```
   * normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
   * normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
   * ```
   *
   * @param {string | !Array<string|number>} path Input path
   * @return {string} Flattened path
   */function normalize(path){if(Array.isArray(path)){for(var parts=[],i=0,args;i<path.length;i++){args=path[i].toString().split(".");for(var j=0;j<args.length;j++){parts.push(args[j])}}return parts.join(".")}else{return path}}/**
   * Splits a path into an array of property names. Accepts either arrays
   * of path parts or strings.
   *
   * Example:
   *
   * ```
   * split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
   * split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
   * ```
   *
   * @param {string | !Array<string|number>} path Input path
   * @return {!Array<string>} Array of path parts
   * @suppress {checkTypes}
   */function split(path){if(Array.isArray(path)){return normalize(path).split(".")}return path.toString().split(".")}/**
   * Reads a value from a path.  If any sub-property in the path is `undefined`,
   * this method returns `undefined` (will never throw.
   *
   * @param {Object} root Object from which to dereference path from
   * @param {string | !Array<string|number>} path Path to read
   * @param {Object=} info If an object is provided to `info`, the normalized
   *  (flattened) path will be set to `info.path`.
   * @return {*} Value at path, or `undefined` if the path could not be
   *  fully dereferenced.
   */function _get(root,path,info){// Loop over path parts[0..n-1] and dereference
for(var prop=root,parts=split(path),i=0;i<parts.length;i++){if(!prop){return}var part=parts[i];prop=prop[part]}if(info){info.path=parts.join(".")}return prop}/**
   * Sets a value to a path.  If any sub-property in the path is `undefined`,
   * this method will no-op.
   *
   * @param {Object} root Object from which to dereference path from
   * @param {string | !Array<string|number>} path Path to set
   * @param {*} value Value to set to path
   * @return {string | undefined} The normalized version of the input path
   */function _set(root,path,value){var prop=root,parts=split(path),last=parts[parts.length-1];if(1<parts.length){// Loop over path parts[0..n-2] and dereference
for(var i=0,part;i<parts.length-1;i++){part=parts[i];prop=prop[part];if(!prop){return}}// Set value to object at end of path
prop[last]=value}else{// Simple property set
prop[path]=value}return parts.join(".")}/**
   * Returns true if the given string is a structured data path (has dots).
   *
   * This function is deprecated.  Use `isPath` instead.
   *
   * Example:
   *
   * ```
   * isDeep('foo.bar.baz') // true
   * isDeep('foo')         // false
   * ```
   *
   * @deprecated
   * @param {string} path Path string
   * @return {boolean} True if the string contained one or more dots
   */var isDeep=isPath;_exports.isDeep=isDeep;var path={isPath:isPath,root:root,isAncestor:isAncestor,isDescendant:isDescendant,translate:translate,matches:matches,normalize:normalize,split:split,get:_get,set:_set,isDeep:isDeep};_exports.$path=path;var caseMap={},DASH_TO_CAMEL=/-[a-z]/g,CAMEL_TO_DASH=/([A-Z])/g;/**
                                   * @fileoverview Module with utilities for converting between "dash-case" and
                                   * "camelCase" identifiers.
                                   */ /**
                                       * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
                                       * (e.g. `fooBarBaz`).
                                       *
                                       * @param {string} dash Dash-case identifier
                                       * @return {string} Camel-case representation of the identifier
                                       */function dashToCamelCase(dash){return caseMap[dash]||(caseMap[dash]=0>dash.indexOf("-")?dash:dash.replace(DASH_TO_CAMEL,function(m){return m[1].toUpperCase()}))}/**
   * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
   * (e.g. `foo-bar-baz`).
   *
   * @param {string} camel Camel-case identifier
   * @return {string} Dash-case representation of the identifier
   */function camelToDashCase(camel){return caseMap[camel]||(caseMap[camel]=camel.replace(CAMEL_TO_DASH,"-$1").toLowerCase())}var caseMap$1={dashToCamelCase:dashToCamelCase,camelToDashCase:camelToDashCase};_exports.$caseMap=caseMap$1;var microtaskCurrHandle=0,microtaskLastHandle=0,microtaskCallbacks=[],microtaskNodeContent=0,microtaskNode=document.createTextNode("");new window.MutationObserver(microtaskFlush).observe(microtaskNode,{characterData:!0});function microtaskFlush(){for(var len=microtaskCallbacks.length,i=0,cb;i<len;i++){cb=microtaskCallbacks[i];if(cb){try{cb()}catch(e){setTimeout(function(){throw e})}}}microtaskCallbacks.splice(0,len);microtaskLastHandle+=len}/**
   * Async interface wrapper around `setTimeout`.
   *
   * @namespace
   * @summary Async interface wrapper around `setTimeout`.
   */var timeOut={/**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof timeOut
   * @param {number=} delay Time to wait before calling callbacks in ms
   * @return {!AsyncInterface} An async timeout interface
   */after:function after(delay){return{run:function run(fn){return window.setTimeout(fn,delay)},cancel:function cancel(handle){window.clearTimeout(handle)}}},/**
   * Enqueues a function called in the next task.
   *
   * @memberof timeOut
   * @param {!Function} fn Callback to run
   * @param {number=} delay Delay in milliseconds
   * @return {number} Handle used for canceling task
   */run:function run(fn,delay){return window.setTimeout(fn,delay)},/**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */cancel:function cancel(handle){window.clearTimeout(handle)}};_exports.timeOut=timeOut;var animationFrame={/**
   * Enqueues a function called at `requestAnimationFrame` timing.
   *
   * @memberof animationFrame
   * @param {function(number):void} fn Callback to run
   * @return {number} Handle used for canceling task
   */run:function run(fn){return window.requestAnimationFrame(fn)},/**
   * Cancels a previously enqueued `animationFrame` callback.
   *
   * @memberof animationFrame
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */cancel:function cancel(handle){window.cancelAnimationFrame(handle)}};_exports.animationFrame=animationFrame;var idlePeriod={/**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof idlePeriod
   * @param {function(!IdleDeadline):void} fn Callback to run
   * @return {number} Handle used for canceling task
   */run:function run(fn){return window.requestIdleCallback?window.requestIdleCallback(fn):window.setTimeout(fn,16)},/**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */cancel:function cancel(handle){window.cancelIdleCallback?window.cancelIdleCallback(handle):window.clearTimeout(handle)}};_exports.idlePeriod=idlePeriod;var microTask={/**
   * Enqueues a function called at microtask timing.
   *
   * @memberof microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */run:function run(callback){microtaskNode.textContent=microtaskNodeContent++;microtaskCallbacks.push(callback);return microtaskCurrHandle++},/**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */cancel:function cancel(handle){var idx=handle-microtaskLastHandle;if(0<=idx){if(!microtaskCallbacks[idx]){throw new Error("invalid async handle: "+handle)}microtaskCallbacks[idx]=null}}};_exports.microTask=microTask;var async={timeOut:timeOut,animationFrame:animationFrame,idlePeriod:idlePeriod,microTask:microTask};_exports.$async=async;var microtask=microTask,PropertiesChanged=dedupingMixin(/**
                                                 * @template T
                                                 * @param {function(new:T)} superClass Class to apply mixin to.
                                                 * @return {function(new:T)} superClass with mixin applied.
                                                 */function(superClass){/**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   */var PropertiesChanged=/*#__PURE__*/function(_superClass){babelHelpers.inherits(PropertiesChanged,_superClass);babelHelpers.createClass(PropertiesChanged,[{key:"_createPropertyAccessor",//eslint-disable-line no-unused-vars
/**
     * Creates a setter/getter pair for the named property with its own
     * local storage.  The getter returns the value in the local storage,
     * and the setter calls `_setProperty`, which updates the local storage
     * for the property and enqueues a `_propertiesChanged` callback.
     *
     * This method may be called on a prototype or an instance.  Calling
     * this method may overwrite a property value that already exists on
     * the prototype/instance by creating the accessor.
     *
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created; the
     *   protected `_setProperty` function must be used to set the property
     * @return {void}
     * @protected
     * @override
     */value:function _createPropertyAccessor(property,readOnly){this._addPropertyToAttributeMap(property);if(!this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))){this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)}if(!this.__dataHasAccessor[property]){this.__dataHasAccessor[property]=!0;this._definePropertyAccessor(property,readOnly)}}/**
       * Adds the given `property` to a map matching attribute names
       * to property names, using `attributeNameForProperty`. This map is
       * used when deserializing attribute values to properties.
       *
       * @param {string} property Name of the property
       * @override
       */},{key:"_addPropertyToAttributeMap",value:function _addPropertyToAttributeMap(property){if(!this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))){this.__dataAttributes=Object.assign({},this.__dataAttributes)}if(!this.__dataAttributes[property]){var _attr=this.constructor.attributeNameForProperty(property);this.__dataAttributes[_attr]=property}}/**
       * Defines a property accessor for the given property.
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created
       * @return {void}
       * @override
       */},{key:"_definePropertyAccessor",value:function _definePropertyAccessor(property,readOnly){Object.defineProperty(this,property,{/* eslint-disable valid-jsdoc */ /** @this {PropertiesChanged} */get:function get(){return this._getProperty(property)},/** @this {PropertiesChanged} */set:readOnly?function(){}:function(value){this._setProperty(property,value)}/* eslint-enable */})}}],[{key:"createProperties",/**
     * Creates property accessors for the given property names.
     * @param {!Object} props Object whose keys are names of accessors.
     * @return {void}
     * @protected
     * @nocollapse
     */value:function createProperties(props){var proto=this.prototype;for(var prop in props){// don't stomp an existing accessor
if(!(prop in proto)){proto._createPropertyAccessor(prop)}}}/**
       * Returns an attribute name that corresponds to the given property.
       * The attribute name is the lowercased property name. Override to
       * customize this mapping.
       * @param {string} property Property to convert
       * @return {string} Attribute name corresponding to the given property.
       *
       * @protected
       * @nocollapse
       */},{key:"attributeNameForProperty",value:function attributeNameForProperty(property){return property.toLowerCase()}/**
       * Override point to provide a type to which to deserialize a value to
       * a given property.
       * @param {string} name Name of property
       *
       * @protected
       * @nocollapse
       */},{key:"typeForProperty",value:function typeForProperty(name){}}]);function PropertiesChanged(){var _this7;babelHelpers.classCallCheck(this,PropertiesChanged);_this7=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(PropertiesChanged).call(this));/** @type {boolean} */_this7.__dataEnabled=!1;_this7.__dataReady=!1;_this7.__dataInvalid=!1;_this7.__data={};_this7.__dataPending=null;_this7.__dataOld=null;_this7.__dataInstanceProps=null;_this7.__serializing=!1;_this7._initializeProperties();return _this7}/**
       * Lifecycle callback called when properties are enabled via
       * `_enableProperties`.
       *
       * Users may override this function to implement behavior that is
       * dependent on the element having its property data initialized, e.g.
       * from defaults (initialized from `constructor`, `_initializeProperties`),
       * `attributeChangedCallback`, or values propagated from host e.g. via
       * bindings.  `super.ready()` must be called to ensure the data system
       * becomes enabled.
       *
       * @return {void}
       * @public
       * @override
       */babelHelpers.createClass(PropertiesChanged,[{key:"ready",value:function ready(){this.__dataReady=!0;this._flushProperties()}/**
       * Initializes the local storage for property accessors.
       *
       * Provided as an override point for performing any setup work prior
       * to initializing the property accessor system.
       *
       * @return {void}
       * @protected
       * @override
       */},{key:"_initializeProperties",value:function _initializeProperties(){// Capture instance properties; these will be set into accessors
// during first flush. Don't set them here, since we want
// these to overwrite defaults/constructor assignments
for(var _p6 in this.__dataHasAccessor){if(this.hasOwnProperty(_p6)){this.__dataInstanceProps=this.__dataInstanceProps||{};this.__dataInstanceProps[_p6]=this[_p6];delete this[_p6]}}}/**
       * Called at ready time with bag of instance properties that overwrote
       * accessors when the element upgraded.
       *
       * The default implementation sets these properties back into the
       * setter at ready time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @return {void}
       * @protected
       * @override
       */},{key:"_initializeInstanceProperties",value:function _initializeInstanceProperties(props){Object.assign(this,props)}/**
       * Updates the local storage for a property (via `_setPendingProperty`)
       * and enqueues a `_proeprtiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {void}
       * @protected
       * @override
       */},{key:"_setProperty",value:function _setProperty(property,value){if(this._setPendingProperty(property,value)){this._invalidateProperties()}}/**
       * Returns the value for the given property.
       * @param {string} property Name of property
       * @return {*} Value for the given property
       * @protected
       * @override
       */},{key:"_getProperty",value:function _getProperty(property){return this.__data[property]}/* eslint-disable no-unused-vars */ /**
                                           * Updates the local storage for a property, records the previous value,
                                           * and adds it to the set of "pending changes" that will be passed to the
                                           * `_propertiesChanged` callback.  This method does not enqueue the
                                           * `_propertiesChanged` callback.
                                           *
                                           * @param {string} property Name of the property
                                           * @param {*} value Value to set
                                           * @param {boolean=} ext Not used here; affordance for closure
                                           * @return {boolean} Returns true if the property changed
                                           * @protected
                                           * @override
                                           */},{key:"_setPendingProperty",value:function _setPendingProperty(property,value,ext){var old=this.__data[property],changed=this._shouldPropertyChange(property,value,old);if(changed){if(!this.__dataPending){this.__dataPending={};this.__dataOld={}}// Ensure old is captured from the last turn
if(this.__dataOld&&!(property in this.__dataOld)){this.__dataOld[property]=old}this.__data[property]=value;this.__dataPending[property]=value}return changed}/* eslint-enable */ /**
                           * Marks the properties as invalid, and enqueues an async
                           * `_propertiesChanged` callback.
                           *
                           * @return {void}
                           * @protected
                           * @override
                           */},{key:"_invalidateProperties",value:function _invalidateProperties(){var _this8=this;if(!this.__dataInvalid&&this.__dataReady){this.__dataInvalid=!0;microtask.run(function(){if(_this8.__dataInvalid){_this8.__dataInvalid=!1;_this8._flushProperties()}})}}/**
       * Call to enable property accessor processing. Before this method is
       * called accessor values will be set but side effects are
       * queued. When called, any pending side effects occur immediately.
       * For elements, generally `connectedCallback` is a normal spot to do so.
       * It is safe to call this method multiple times as it only turns on
       * property accessors once.
       *
       * @return {void}
       * @protected
       * @override
       */},{key:"_enableProperties",value:function _enableProperties(){if(!this.__dataEnabled){this.__dataEnabled=!0;if(this.__dataInstanceProps){this._initializeInstanceProperties(this.__dataInstanceProps);this.__dataInstanceProps=null}this.ready()}}/**
       * Calls the `_propertiesChanged` callback with the current set of
       * pending changes (and old values recorded when pending changes were
       * set), and resets the pending set of changes. Generally, this method
       * should not be called in user code.
       *
       * @return {void}
       * @protected
       * @override
       */},{key:"_flushProperties",value:function _flushProperties(){var props=this.__data,changedProps=this.__dataPending,old=this.__dataOld;if(this._shouldPropertiesChange(props,changedProps,old)){this.__dataPending=null;this.__dataOld=null;this._propertiesChanged(props,changedProps,old)}}/**
       * Called in `_flushProperties` to determine if `_propertiesChanged`
       * should be called. The default implementation returns true if
       * properties are pending. Override to customize when
       * `_propertiesChanged` is called.
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {?Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {?Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @return {boolean} true if changedProps is truthy
       * @override
       */},{key:"_shouldPropertiesChange",value:function _shouldPropertiesChange(currentProps,changedProps,oldProps){// eslint-disable-line no-unused-vars
return!!changedProps}/**
       * Callback called when any properties with accessors created via
       * `_createPropertyAccessor` have been set.
       *
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {?Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {?Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @return {void}
       * @protected
       * @override
       */},{key:"_propertiesChanged",value:function _propertiesChanged(currentProps,changedProps,oldProps){}// eslint-disable-line no-unused-vars
/**
     * Method called to determine whether a property value should be
     * considered as a change and cause the `_propertiesChanged` callback
     * to be enqueued.
     *
     * The default implementation returns `true` if a strict equality
     * check fails. The method always returns false for `NaN`.
     *
     * Override this method to e.g. provide stricter checking for
     * Objects/Arrays when using immutable patterns.
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     *   and enqueue a `_proeprtiesChanged` callback
     * @protected
     * @override
     */},{key:"_shouldPropertyChange",value:function _shouldPropertyChange(property,value,old){return(// Strict equality check
old!==value&&(// This ensures (old==NaN, value==NaN) always returns false
old===old||value===value))}/**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       * @param {?string} namespace Attribute namespace.
       * @return {void}
       * @suppress {missingProperties} Super may or may not implement the callback
       * @override
       */},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,old,value,namespace){if(old!==value){this._attributeToProperty(name,value)}if(babelHelpers.get(babelHelpers.getPrototypeOf(PropertiesChanged.prototype),"attributeChangedCallback",this)){babelHelpers.get(babelHelpers.getPrototypeOf(PropertiesChanged.prototype),"attributeChangedCallback",this).call(this,name,old,value,namespace)}}/**
       * Deserializes an attribute to its associated property.
       *
       * This method calls the `_deserializeValue` method to convert the string to
       * a typed value.
       *
       * @param {string} attribute Name of attribute to deserialize.
       * @param {?string} value of the attribute.
       * @param {*=} type type to deserialize to, defaults to the value
       * returned from `typeForProperty`
       * @return {void}
       * @override
       */},{key:"_attributeToProperty",value:function _attributeToProperty(attribute,value,type){if(!this.__serializing){var map=this.__dataAttributes,property=map&&map[attribute]||attribute;this[property]=this._deserializeValue(value,type||this.constructor.typeForProperty(property))}}/**
       * Serializes a property to its associated attribute.
       *
       * @suppress {invalidCasts} Closure can't figure out `this` is an element.
       *
       * @param {string} property Property name to reflect.
       * @param {string=} attribute Attribute name to reflect to.
       * @param {*=} value Property value to refect.
       * @return {void}
       * @override
       */},{key:"_propertyToAttribute",value:function _propertyToAttribute(property,attribute,value){this.__serializing=!0;value=3>arguments.length?this[property]:value;this._valueToNodeAttribute(/** @type {!HTMLElement} */this,value,attribute||this.constructor.attributeNameForProperty(property));this.__serializing=!1}/**
       * Sets a typed value to an HTML attribute on a node.
       *
       * This method calls the `_serializeValue` method to convert the typed
       * value to a string.  If the `_serializeValue` method returns `undefined`,
       * the attribute will be removed (this is the default for boolean
       * type `false`).
       *
       * @param {Element} node Element to set attribute to.
       * @param {*} value Value to serialize.
       * @param {string} attribute Attribute name to serialize to.
       * @return {void}
       * @override
       */},{key:"_valueToNodeAttribute",value:function _valueToNodeAttribute(node,value,attribute){var str=this._serializeValue(value);if("class"===attribute||"name"===attribute||"slot"===attribute){node=/** @type {?Element} */wrap$1(node)}if(str===void 0){node.removeAttribute(attribute)}else{node.setAttribute(attribute,str)}}/**
       * Converts a typed JavaScript value to a string.
       *
       * This method is called when setting JS property values to
       * HTML attributes.  Users may override this method to provide
       * serialization for custom types.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided
       * property  value.
       * @override
       */},{key:"_serializeValue",value:function _serializeValue(value){switch(babelHelpers.typeof(value)){case"boolean":return value?"":void 0;default:return null!=value?value.toString():void 0;}}/**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called when reading HTML attribute values to
       * JS properties.  Users may override this method to provide
       * deserialization for custom `type`s. Types for `Boolean`, `String`,
       * and `Number` convert attributes to the expected types.
       *
       * @param {?string} value Value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       * @override
       */},{key:"_deserializeValue",value:function _deserializeValue(value,type){switch(type){case Boolean:return null!==value;case Number:return+value;default:return value;}}}]);return PropertiesChanged}(superClass);return PropertiesChanged});/**
                              * Element class mixin that provides basic meta-programming for creating one
                              * or more property accessors (getter/setter pair) that enqueue an async
                              * (batched) `_propertiesChanged` callback.
                              *
                              * For basic usage of this mixin, call `MyClass.createProperties(props)`
                              * once at class definition time to create property accessors for properties
                              * named in props, implement `_propertiesChanged` to react as desired to
                              * property changes, and implement `static get observedAttributes()` and
                              * include lowercase versions of any property names that should be set from
                              * attributes. Last, call `this._enableProperties()` in the element's
                              * `connectedCallback` to enable the accessors.
                              *
                              * @mixinFunction
                              * @polymer
                              * @summary Element class mixin for reacting to property changes from
                              *   generated property accessors.
                              * @template T
                              * @param {function(new:T)} superClass Class to apply mixin to.
                              * @return {function(new:T)} superClass with mixin applied.
                              */_exports.PropertiesChanged=PropertiesChanged;var propertiesChanged={PropertiesChanged:PropertiesChanged};// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
_exports.$propertiesChanged=propertiesChanged;var nativeProperties={},proto=HTMLElement.prototype;while(proto){for(var props=Object.getOwnPropertyNames(proto),i=0;i<props.length;i++){nativeProperties[props[i]]=!0}proto=Object.getPrototypeOf(proto)}/**
   * Used to save the value of a property that will be overridden with
   * an accessor. If the `model` is a prototype, the values will be saved
   * in `__dataProto`, and it's up to the user (or downstream mixin) to
   * decide how/when to set these values back into the accessors.
   * If `model` is already an instance (it has a `__data` property), then
   * the value will be set as a pending property, meaning the user should
   * call `_invalidateProperties` or `_flushProperties` to take effect
   *
   * @param {Object} model Prototype or instance
   * @param {string} property Name of property
   * @return {void}
   * @private
   */function saveAccessorValue(model,property){// Don't read/store value for any native properties since they could throw
if(!nativeProperties[property]){var value=model[property];if(value!==void 0){if(model.__data){// Adding accessor to instance; update the property
// It is the user's responsibility to call _flushProperties
model._setPendingProperty(property,value)}else{// Adding accessor to proto; save proto's value for instance-time use
if(!model.__dataProto){model.__dataProto={}}else if(!model.hasOwnProperty(JSCompiler_renameProperty("__dataProto",model))){model.__dataProto=Object.create(model.__dataProto)}model.__dataProto[property]=value}}}}/**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   *
   * For basic usage of this mixin:
   *
   * -   Declare attributes to observe via the standard `static get
   *     observedAttributes()`. Use `dash-case` attribute names to represent
   *     `camelCase` property names.
   * -   Implement the `_propertiesChanged` callback on the class.
   * -   Call `MyClass.createPropertiesForAttributes()` **once** on the class to
   *     generate property accessors for each observed attribute. This must be
   *     called before the first instance is created, for example, by calling it
   *     before calling `customElements.define`. It can also be called lazily from
   *     the element's `constructor`, as long as it's guarded so that the call is
   *     only made once, when the first instance is created.
   * -   Call `this._enableProperties()` in the element's `connectedCallback` to
   *     enable the accessors.
   *
   * Any `observedAttributes` will automatically be
   * deserialized via `attributeChangedCallback` and set to the associated
   * property using `dash-case`-to-`camelCase` convention.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin PropertiesChanged
   * @summary Element class mixin for reacting to property changes from
   *   generated property accessors.
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */var PropertyAccessors=dedupingMixin(function(superClass){/**
   * @constructor
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   * @private
   */var base=PropertiesChanged(superClass),PropertyAccessors=/*#__PURE__*/function(_base){babelHelpers.inherits(PropertyAccessors,_base);function PropertyAccessors(){babelHelpers.classCallCheck(this,PropertyAccessors);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(PropertyAccessors).apply(this,arguments))}babelHelpers.createClass(PropertyAccessors,[{key:"_initializeProperties",/**
       * Overrides PropertiesChanged implementation to initialize values for
       * accessors created for values that already existed on the element
       * prototype.
       *
       * @return {void}
       * @protected
       * @override
       */value:function _initializeProperties(){if(this.__dataProto){this._initializeProtoProperties(this.__dataProto);this.__dataProto=null}babelHelpers.get(babelHelpers.getPrototypeOf(PropertyAccessors.prototype),"_initializeProperties",this).call(this)}/**
       * Called at instance time with bag of properties that were overwritten
       * by accessors on the prototype when accessors were created.
       *
       * The default implementation sets these properties back into the
       * setter at instance time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @return {void}
       * @protected
       * @override
       */},{key:"_initializeProtoProperties",value:function _initializeProtoProperties(props){for(var _p7 in props){this._setProperty(_p7,props[_p7])}}/**
       * Ensures the element has the given attribute. If it does not,
       * assigns the given value to the attribute.
       *
       * @suppress {invalidCasts} Closure can't figure out `this` is infact an
       *     element
       *
       * @param {string} attribute Name of attribute to ensure is set.
       * @param {string} value of the attribute.
       * @return {void}
       * @override
       */},{key:"_ensureAttribute",value:function _ensureAttribute(attribute,value){var el=/** @type {!HTMLElement} */this;if(!el.hasAttribute(attribute)){this._valueToNodeAttribute(el,value,attribute)}}/**
       * Overrides PropertiesChanged implemention to serialize objects as JSON.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided property
       *     value.
       * @override
       */},{key:"_serializeValue",value:function _serializeValue(value){/* eslint-disable no-fallthrough */switch(babelHelpers.typeof(value)){case"object":if(babelHelpers.instanceof(value,Date)){return value.toString()}else if(value){try{return JSON.stringify(value)}catch(x){return""}}default:return babelHelpers.get(babelHelpers.getPrototypeOf(PropertyAccessors.prototype),"_serializeValue",this).call(this,value);}}/**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called by Polymer when reading HTML attribute values to
       * JS properties.  Users may override this method on Polymer element
       * prototypes to provide deserialization for custom `type`s.  Note,
       * the `type` argument is the value of the `type` field provided in the
       * `properties` configuration object for a given property, and is
       * by convention the constructor for the type to deserialize.
       *
       *
       * @param {?string} value Attribute value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       * @override
       */},{key:"_deserializeValue",value:function _deserializeValue(value,type){/**
       * @type {*}
       */var outValue;switch(type){case Object:try{outValue=JSON.parse(/** @type {string} */value)}catch(x){// allow non-JSON literals like Strings and Numbers
outValue=value}break;case Array:try{outValue=JSON.parse(/** @type {string} */value)}catch(x){outValue=null;console.warn("Polymer::Attributes: couldn't decode Array as JSON: ".concat(value))}break;case Date:outValue=isNaN(value)?value+"":+value;outValue=new Date(outValue);break;default:outValue=babelHelpers.get(babelHelpers.getPrototypeOf(PropertyAccessors.prototype),"_deserializeValue",this).call(this,value,type);break;}return outValue}/* eslint-enable no-fallthrough */ /**
                                          * Overrides PropertiesChanged implementation to save existing prototype
                                          * property value so that it can be reset.
                                          * @param {string} property Name of the property
                                          * @param {boolean=} readOnly When true, no setter is created
                                          *
                                          * When calling on a prototype, any overwritten values are saved in
                                          * `__dataProto`, and it is up to the subclasser to decide how/when
                                          * to set those properties back into the accessor.  When calling on an
                                          * instance, the overwritten value is set via `_setPendingProperty`,
                                          * and the user should call `_invalidateProperties` or `_flushProperties`
                                          * for the values to take effect.
                                          * @protected
                                          * @return {void}
                                          * @override
                                          */},{key:"_definePropertyAccessor",value:function _definePropertyAccessor(property,readOnly){saveAccessorValue(this,property);babelHelpers.get(babelHelpers.getPrototypeOf(PropertyAccessors.prototype),"_definePropertyAccessor",this).call(this,property,readOnly)}/**
       * Returns true if this library created an accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if an accessor was created
       * @override
       */},{key:"_hasAccessor",value:function _hasAccessor(property){return this.__dataHasAccessor&&this.__dataHasAccessor[property]}/**
       * Returns true if the specified property has a pending change.
       *
       * @param {string} prop Property name
       * @return {boolean} True if property has a pending change
       * @protected
       * @override
       */},{key:"_isPropertyPending",value:function _isPropertyPending(prop){return!!(this.__dataPending&&prop in this.__dataPending)}}],[{key:"createPropertiesForAttributes",/**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     * @return {void}
     * @nocollapse
     */value:function createPropertiesForAttributes(){for(var a$=/** @type {?} */this.observedAttributes,_i2=0;_i2<a$.length;_i2++){this.prototype._createPropertyAccessor(dashToCamelCase(a$[_i2]))}}/**
       * Returns an attribute name that corresponds to the given property.
       * By default, converts camel to dash case, e.g. `fooBar` to `foo-bar`.
       * @param {string} property Property to convert
       * @return {string} Attribute name corresponding to the given property.
       *
       * @protected
       * @nocollapse
       */},{key:"attributeNameForProperty",value:function attributeNameForProperty(property){return camelToDashCase(property)}}]);return PropertyAccessors}(base);/**
                                                  * @polymer
                                                  * @mixinClass
                                                  * @implements {Polymer_PropertyAccessors}
                                                  * @extends {base}
                                                  * @unrestricted
                                                  */return PropertyAccessors});_exports.PropertyAccessors=PropertyAccessors;var propertyAccessors={PropertyAccessors:PropertyAccessors};// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
_exports.$propertyAccessors=propertyAccessors;var templateExtensions={"dom-if":!0,"dom-repeat":!0},placeholderBugDetect=!1,placeholderBug=!1;function hasPlaceholderBug(){if(!placeholderBugDetect){placeholderBugDetect=!0;var t=document.createElement("textarea");t.placeholder="a";placeholderBug=t.placeholder===t.textContent}return placeholderBug}/**
   * Some browsers have a bug with textarea, where placeholder text is copied as
   * a textnode child of the textarea.
   *
   * If the placeholder is a binding, this can break template stamping in two
   * ways.
   *
   * One issue is that when the `placeholder` attribute is removed when the
   * binding is processed, the textnode child of the textarea is deleted, and the
   * template info tries to bind into that node.
   *
   * With `legacyOptimizations` in use, when the template is stamped and the
   * `textarea.textContent` binding is processed, no corresponding node is found
   * because it was removed during parsing. An exception is generated when this
   * binding is updated.
   *
   * With `legacyOptimizations` not in use, the template is cloned before
   * processing and this changes the above behavior. The cloned template also has
   * a value property set to the placeholder and textContent. This prevents the
   * removal of the textContent when the placeholder attribute is removed.
   * Therefore the exception does not occur. However, there is an extra
   * unnecessary binding.
   *
   * @param {!Node} node Check node for placeholder bug
   * @return {void}
   */function fixPlaceholder(node){if(hasPlaceholderBug()&&"textarea"===node.localName&&node.placeholder&&node.placeholder===node.textContent){node.textContent=null}}function wrapTemplateExtension(node){var is=node.getAttribute("is");if(is&&templateExtensions[is]){var t=node;t.removeAttribute("is");node=t.ownerDocument.createElement(is);t.parentNode.replaceChild(node,t);node.appendChild(t);while(t.attributes.length){node.setAttribute(t.attributes[0].name,t.attributes[0].value);t.removeAttribute(t.attributes[0].name)}}return node}function findTemplateNode(root,nodeInfo){// recursively ascend tree until we hit root
var parent=nodeInfo.parentInfo&&findTemplateNode(root,nodeInfo.parentInfo);// unwind the stack, returning the indexed node at each level
if(parent){// note: marginally faster than indexing via childNodes
// (http://jsperf.com/childnodes-lookup)
for(var n=parent.firstChild,_i3=0;n;n=n.nextSibling){if(nodeInfo.parentIndex===_i3++){return n}}}else{return root}}// construct `$` map (from id annotations)
function applyIdToMap(inst,map,node,nodeInfo){if(nodeInfo.id){map[nodeInfo.id]=node}}// install event listeners (from event annotations)
function applyEventListener(inst,node,nodeInfo){if(nodeInfo.events&&nodeInfo.events.length){for(var j=0,e$=nodeInfo.events,e;j<e$.length&&(e=e$[j]);j++){inst._addMethodEventListenerToNode(node,e.name,e.value,inst)}}}// push configuration references at configure time
function applyTemplateContent(inst,node,nodeInfo){if(nodeInfo.templateInfo){node._templateInfo=nodeInfo.templateInfo}}function createNodeEventHandler(context,eventName,methodName){// Instances can optionally have a _methodHost which allows redirecting where
// to find methods. Currently used by `templatize`.
context=context._methodHost||context;var handler=function handler(e){if(context[methodName]){context[methodName](e,e.detail)}else{console.warn("listener method `"+methodName+"` not defined")}};return handler}/**
   * Element mixin that provides basic template parsing and stamping, including
   * the following template-related features for stamped templates:
   *
   * - Declarative event listeners (`on-eventname="listener"`)
   * - Map of node id's to stamped node instances (`this.$.id`)
   * - Nested template content caching/removal and re-installation (performance
   *   optimization)
   *
   * @mixinFunction
   * @polymer
   * @summary Element class mixin that provides basic template parsing and stamping
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */var TemplateStamp=dedupingMixin(/**
                                             * @template T
                                             * @param {function(new:T)} superClass Class to apply mixin to.
                                             * @return {function(new:T)} superClass with mixin applied.
                                             */function(superClass){/**
   * @polymer
   * @mixinClass
   * @implements {Polymer_TemplateStamp}
   */var TemplateStamp=/*#__PURE__*/function(_superClass2){babelHelpers.inherits(TemplateStamp,_superClass2);function TemplateStamp(){babelHelpers.classCallCheck(this,TemplateStamp);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(TemplateStamp).apply(this,arguments))}babelHelpers.createClass(TemplateStamp,[{key:"_stampTemplate",/**
       * Clones the provided template content and returns a document fragment
       * containing the cloned dom.
       *
       * The template is parsed (once and memoized) using this library's
       * template parsing features, and provides the following value-added
       * features:
       * * Adds declarative event listeners for `on-event="handler"` attributes
       * * Generates an "id map" for all nodes with id's under `$` on returned
       *   document fragment
       * * Passes template info including `content` back to templates as
       *   `_templateInfo` (a performance optimization to avoid deep template
       *   cloning)
       *
       * Note that the memoized template parsing process is destructive to the
       * template: attributes for bindings and declarative event listeners are
       * removed after being noted in notes, and any nested `<template>.content`
       * is removed and stored in notes as well.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       * @override
       */value:function _stampTemplate(template){// Polyfill support: bootstrap the template if it has not already been
if(template&&!template.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate){HTMLTemplateElement.decorate(template)}var templateInfo=this.constructor._parseTemplate(template),nodeInfo=templateInfo.nodeInfoList,content=templateInfo.content||template.content,dom=/** @type {DocumentFragment} */document.importNode(content,!0);// NOTE: ShadyDom optimization indicating there is an insertion point
dom.__noInsertionPoint=!templateInfo.hasInsertionPoint;var nodes=dom.nodeList=Array(nodeInfo.length);dom.$={};for(var _i4=0,l=nodeInfo.length,info,node;_i4<l&&(info=nodeInfo[_i4]);_i4++){node=nodes[_i4]=findTemplateNode(dom,info);applyIdToMap(this,dom.$,node,info);applyTemplateContent(this,node,info);applyEventListener(this,node,info)}dom=/** @type {!StampedTemplate} */dom;// eslint-disable-line no-self-assign
return dom}/**
       * Adds an event listener by method name for the event provided.
       *
       * This method generates a handler function that looks up the method
       * name at handling time.
       *
       * @param {!EventTarget} node Node to add listener on
       * @param {string} eventName Name of event
       * @param {string} methodName Name of method
       * @param {*=} context Context the method will be called on (defaults
       *   to `node`)
       * @return {Function} Generated handler function
       * @override
       */},{key:"_addMethodEventListenerToNode",value:function _addMethodEventListenerToNode(node,eventName,methodName,context){context=context||node;var handler=createNodeEventHandler(context,eventName,methodName);this._addEventListenerToNode(node,eventName,handler);return handler}/**
       * Override point for adding custom or simulated event handling.
       *
       * @param {!EventTarget} node Node to add event listener to
       * @param {string} eventName Name of event
       * @param {function(!Event):void} handler Listener function to add
       * @return {void}
       * @override
       */},{key:"_addEventListenerToNode",value:function _addEventListenerToNode(node,eventName,handler){node.addEventListener(eventName,handler)}/**
       * Override point for adding custom or simulated event handling.
       *
       * @param {!EventTarget} node Node to remove event listener from
       * @param {string} eventName Name of event
       * @param {function(!Event):void} handler Listener function to remove
       * @return {void}
       * @override
       */},{key:"_removeEventListenerFromNode",value:function _removeEventListenerFromNode(node,eventName,handler){node.removeEventListener(eventName,handler)}}],[{key:"_parseTemplate",/**
     * Scans a template to produce template metadata.
     *
     * Template-specific metadata are stored in the object returned, and node-
     * specific metadata are stored in objects in its flattened `nodeInfoList`
     * array.  Only nodes in the template that were parsed as nodes of
     * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
     * contains an `index` (`childNodes` index in parent) and optionally
     * `parent`, which points to node info of its parent (including its index).
     *
     * The template metadata object returned from this method has the following
     * structure (many fields optional):
     *
     * ```js
     *   {
     *     // Flattened list of node metadata (for nodes that generated metadata)
     *     nodeInfoList: [
     *       {
     *         // `id` attribute for any nodes with id's for generating `$` map
     *         id: {string},
     *         // `on-event="handler"` metadata
     *         events: [
     *           {
     *             name: {string},   // event name
     *             value: {string},  // handler method name
     *           }, ...
     *         ],
     *         // Notes when the template contained a `<slot>` for shady DOM
     *         // optimization purposes
     *         hasInsertionPoint: {boolean},
     *         // For nested `<template>`` nodes, nested template metadata
     *         templateInfo: {object}, // nested template metadata
     *         // Metadata to allow efficient retrieval of instanced node
     *         // corresponding to this metadata
     *         parentInfo: {number},   // reference to parent nodeInfo>
     *         parentIndex: {number},  // index in parent's `childNodes` collection
     *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
     *       },
     *       ...
     *     ],
     *     // When true, the template had the `strip-whitespace` attribute
     *     // or was nested in a template with that setting
     *     stripWhitespace: {boolean},
     *     // For nested templates, nested template content is moved into
     *     // a document fragment stored here; this is an optimization to
     *     // avoid the cost of nested template cloning
     *     content: {DocumentFragment}
     *   }
     * ```
     *
     * This method kicks off a recursive treewalk as follows:
     *
     * ```
     *    _parseTemplate <---------------------+
     *      _parseTemplateContent              |
     *        _parseTemplateNode  <------------|--+
     *          _parseTemplateNestedTemplate --+  |
     *          _parseTemplateChildNodes ---------+
     *          _parseTemplateNodeAttributes
     *            _parseTemplateNodeAttribute
     *
     * ```
     *
     * These methods may be overridden to add custom metadata about templates
     * to either `templateInfo` or `nodeInfo`.
     *
     * Note that this method may be destructive to the template, in that
     * e.g. event annotations may be removed after being noted in the
     * template metadata.
     *
     * @param {!HTMLTemplateElement} template Template to parse
     * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
     *   template, for parsing nested templates
     * @return {!TemplateInfo} Parsed template metadata
     * @nocollapse
     */value:function _parseTemplate(template,outerTemplateInfo){// since a template may be re-used, memo-ize metadata
if(!template._templateInfo){// TODO(rictic): fix typing
var/** ? */templateInfo=template._templateInfo={};templateInfo.nodeInfoList=[];templateInfo.stripWhiteSpace=outerTemplateInfo&&outerTemplateInfo.stripWhiteSpace||template.hasAttribute("strip-whitespace");// TODO(rictic): fix typing
this._parseTemplateContent(template,templateInfo,/** @type {?} */{parent:null})}return template._templateInfo}/**
       * See docs for _parseTemplateNode.
       *
       * @param {!HTMLTemplateElement} template .
       * @param {!TemplateInfo} templateInfo .
       * @param {!NodeInfo} nodeInfo .
       * @return {boolean} .
       * @nocollapse
       */},{key:"_parseTemplateContent",value:function _parseTemplateContent(template,templateInfo,nodeInfo){return this._parseTemplateNode(template.content,templateInfo,nodeInfo)}/**
       * Parses template node and adds template and node metadata based on
       * the current node, and its `childNodes` and `attributes`.
       *
       * This method may be overridden to add custom node or template specific
       * metadata based on this node.
       *
       * @param {Node} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */},{key:"_parseTemplateNode",value:function _parseTemplateNode(node,templateInfo,nodeInfo){var noted=!1,element=/** @type {!HTMLTemplateElement} */node;if("template"==element.localName&&!element.hasAttribute("preserve-content")){noted=this._parseTemplateNestedTemplate(element,templateInfo,nodeInfo)||noted}else if("slot"===element.localName){// For ShadyDom optimization, indicating there is an insertion point
templateInfo.hasInsertionPoint=!0}fixPlaceholder(element);if(element.firstChild){this._parseTemplateChildNodes(element,templateInfo,nodeInfo)}if(element.hasAttributes&&element.hasAttributes()){noted=this._parseTemplateNodeAttributes(element,templateInfo,nodeInfo)||noted}return noted}/**
       * Parses template child nodes for the given root node.
       *
       * This method also wraps whitelisted legacy template extensions
       * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
       * wrappers, collapses text nodes, and strips whitespace from the template
       * if the `templateInfo.stripWhitespace` setting was provided.
       *
       * @param {Node} root Root node whose `childNodes` will be parsed
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {void}
       */},{key:"_parseTemplateChildNodes",value:function _parseTemplateChildNodes(root,templateInfo,nodeInfo){if("script"===root.localName||"style"===root.localName){return}for(var node=root.firstChild,parentIndex=0,next;node;node=next){// Wrap templates
if("template"==node.localName){node=wrapTemplateExtension(node)}// collapse adjacent textNodes: fixes an IE issue that can cause
// text nodes to be inexplicably split =(
// note that root.normalize() should work but does not so we do this
// manually.
next=node.nextSibling;if(node.nodeType===Node.TEXT_NODE){var/** Node */n=next;while(n&&n.nodeType===Node.TEXT_NODE){node.textContent+=n.textContent;next=n.nextSibling;root.removeChild(n);n=next}// optionally strip whitespace
if(templateInfo.stripWhiteSpace&&!node.textContent.trim()){root.removeChild(node);continue}}var childInfo=/** @type {!NodeInfo} */{parentIndex:parentIndex,parentInfo:nodeInfo};if(this._parseTemplateNode(node,templateInfo,childInfo)){childInfo.infoIndex=templateInfo.nodeInfoList.push(childInfo)-1}// Increment if not removed
if(node.parentNode){parentIndex++}}}/**
       * Parses template content for the given nested `<template>`.
       *
       * Nested template info is stored as `templateInfo` in the current node's
       * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
       * It will then be the responsibility of the host to set it back to the
       * template and for users stamping nested templates to use the
       * `_contentForTemplate` method to retrieve the content for this template
       * (an optimization to avoid the cost of cloning nested template content).
       *
       * @param {HTMLTemplateElement} node Node to parse (a <template>)
       * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
       *   that includes the template `node`
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */},{key:"_parseTemplateNestedTemplate",value:function _parseTemplateNestedTemplate(node,outerTemplateInfo,nodeInfo){// TODO(rictic): the type of node should be non-null
var element=/** @type {!HTMLTemplateElement} */node,templateInfo=this._parseTemplate(element,outerTemplateInfo),content=templateInfo.content=element.content.ownerDocument.createDocumentFragment();content.appendChild(element.content);nodeInfo.templateInfo=templateInfo;return!0}/**
       * Parses template node attributes and adds node metadata to `nodeInfo`
       * for nodes of interest.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current
       *     template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */},{key:"_parseTemplateNodeAttributes",value:function _parseTemplateNodeAttributes(node,templateInfo,nodeInfo){// Make copy of original attribute list, since the order may change
// as attributes are added and removed
for(var noted=!1,attrs=Array.from(node.attributes),_i5=attrs.length-1,a;a=attrs[_i5];_i5--){noted=this._parseTemplateNodeAttribute(node,templateInfo,nodeInfo,a.name,a.value)||noted}return noted}/**
       * Parses a single template node attribute and adds node metadata to
       * `nodeInfo` for attributes of interest.
       *
       * This implementation adds metadata for `on-event="handler"` attributes
       * and `id` attributes.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @nocollapse
       */},{key:"_parseTemplateNodeAttribute",value:function _parseTemplateNodeAttribute(node,templateInfo,nodeInfo,name,value){// events (on-*)
if("on-"===name.slice(0,3)){node.removeAttribute(name);nodeInfo.events=nodeInfo.events||[];nodeInfo.events.push({name:name.slice(3),value:value});return!0}// static id
else if("id"===name){nodeInfo.id=value;return!0}return!1}/**
       * Returns the `content` document fragment for a given template.
       *
       * For nested templates, Polymer performs an optimization to cache nested
       * template content to avoid the cost of cloning deeply nested templates.
       * This method retrieves the cached content for a given template.
       *
       * @param {HTMLTemplateElement} template Template to retrieve `content` for
       * @return {DocumentFragment} Content fragment
       * @nocollapse
       */},{key:"_contentForTemplate",value:function _contentForTemplate(template){var templateInfo=/** @type {HTMLTemplateElementWithInfo} */template._templateInfo;return templateInfo&&templateInfo.content||template.content}}]);return TemplateStamp}(superClass);return TemplateStamp});_exports.TemplateStamp=TemplateStamp;var templateStamp={TemplateStamp:TemplateStamp};// from multiple properties in the same turn
_exports.$templateStamp=templateStamp;var dedupeId$1=0,TYPES={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},capitalAttributeRegex=/[A-Z]/,DataTrigger,DataEffect;/**
                    * Property effect types; effects are stored on the prototype using these keys
                    * @enum {string}
                    */ //eslint-disable-line no-unused-vars
/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @return {Object} The own-property map of effects for the given type
 * @private
 */function ensureOwnEffectMap(model,type){var effects=model[type];if(!effects){effects=model[type]={}}else if(!model.hasOwnProperty(type)){effects=model[type]=Object.create(model[type]);for(var _p8 in effects){for(var protoFx=effects[_p8],instFx=effects[_p8]=Array(protoFx.length),_i6=0;_i6<protoFx.length;_i6++){instFx[_i6]=protoFx[_i6]}}}return effects}// -- effects ----------------------------------------------
/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!Polymer_PropertyEffects} inst The instance with effects to run
 * @param {?Object} effects Object map of property-to-Array of effects
 * @param {?Object} props Bag of current property changes
 * @param {?Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */function runEffects(inst,effects,props,oldProps,hasPaths,extraArgs){if(effects){var ran=!1,id=dedupeId$1++;for(var prop in props){if(runEffectsForProperty(inst,/** @type {!Object} */effects,id,prop,props,oldProps,hasPaths,extraArgs)){ran=!0}}return ran}return!1}/**
   * Runs a list of effects for a given property.
   *
   * @param {!Polymer_PropertyEffects} inst The instance with effects to run
   * @param {!Object} effects Object map of property-to-Array of effects
   * @param {number} dedupeId Counter used for de-duping effects
   * @param {string} prop Name of changed property
   * @param {*} props Changed properties
   * @param {*} oldProps Old properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */function runEffectsForProperty(inst,effects,dedupeId,prop,props,oldProps,hasPaths,extraArgs){var ran=!1,rootProperty=hasPaths?root(prop):prop,fxs=effects[rootProperty];if(fxs){for(var _i7=0,l=fxs.length,fx;_i7<l&&(fx=fxs[_i7]);_i7++){if((!fx.info||fx.info.lastRun!==dedupeId)&&(!hasPaths||pathMatchesTrigger(prop,fx.trigger))){if(fx.info){fx.info.lastRun=dedupeId}fx.fn(inst,prop,props,oldProps,fx.info,hasPaths,extraArgs);ran=!0}}}return ran}/**
   * Determines whether a property/path that has changed matches the trigger
   * criteria for an effect.  A trigger is a descriptor with the following
   * structure, which matches the descriptors returned from `parseArg`.
   * e.g. for `foo.bar.*`:
   * ```
   * trigger: {
   *   name: 'a.b',
   *   structured: true,
   *   wildcard: true
   * }
   * ```
   * If no trigger is given, the path is deemed to match.
   *
   * @param {string} path Path or property that changed
   * @param {?DataTrigger} trigger Descriptor
   * @return {boolean} Whether the path matched the trigger
   */function pathMatchesTrigger(path,trigger){if(trigger){var triggerPath=/** @type {string} */trigger.name;return triggerPath==path||!!(trigger.structured&&isAncestor(triggerPath,path))||!!(trigger.wildcard&&isDescendant(triggerPath,path))}else{return!0}}/**
   * Implements the "observer" effect.
   *
   * Calls the method with `info.methodName` on the instance, passing the
   * new and old values.
   *
   * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {void}
   * @private
   */function runObserverEffect(inst,property,props,oldProps,info){var fn="string"===typeof info.method?inst[info.method]:info.method,changedProp=info.property;if(fn){fn.call(inst,inst.__data[changedProp],oldProps[changedProp])}else if(!info.dynamicFn){console.warn("observer method `"+info.method+"` not defined")}}/**
   * Runs "notify" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * will dispatch path notification events in the case that the property
   * changed was a path and the root property for that path didn't have a
   * "notify" effect.  This is to maintain 1.0 behavior that did not require
   * `notify: true` to ensure object sub-property notifications were
   * sent.
   *
   * @param {!Polymer_PropertyEffects} inst The instance with effects to run
   * @param {Object} notifyProps Bag of properties to notify
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @return {void}
   * @private
   */function runNotifyEffects(inst,notifyProps,props,oldProps,hasPaths){// Notify
var fxs=inst[TYPES.NOTIFY],notified,id=dedupeId$1++;// Try normal notify effects; if none, fall back to try path notification
for(var prop in notifyProps){if(notifyProps[prop]){if(fxs&&runEffectsForProperty(inst,fxs,id,prop,props,oldProps,hasPaths)){notified=!0}else if(hasPaths&&notifyPath(inst,prop,props)){notified=!0}}}// Flush host if we actually notified and host was batching
// And the host has already initialized clients; this prevents
// an issue with a host observing data changes before clients are ready.
var host;if(notified&&(host=inst.__dataHost)&&host._invalidateProperties){host._invalidateProperties()}}/**
   * Dispatches {property}-changed events with path information in the detail
   * object to indicate a sub-path of the property was changed.
   *
   * @param {!Polymer_PropertyEffects} inst The element from which to fire the
   *     event
   * @param {string} path The path that was changed
   * @param {Object} props Bag of current property changes
   * @return {boolean} Returns true if the path was notified
   * @private
   */function notifyPath(inst,path,props){var rootProperty=root(path);if(rootProperty!==path){var eventName=camelToDashCase(rootProperty)+"-changed";dispatchNotifyEvent(inst,eventName,props[path],path);return!0}return!1}/**
   * Dispatches {property}-changed events to indicate a property (or path)
   * changed.
   *
   * @param {!Polymer_PropertyEffects} inst The element from which to fire the
   *     event
   * @param {string} eventName The name of the event to send
   *     ('{property}-changed')
   * @param {*} value The value of the changed property
   * @param {string | null | undefined} path If a sub-path of this property
   *     changed, the path that changed (optional).
   * @return {void}
   * @private
   * @suppress {invalidCasts}
   */function dispatchNotifyEvent(inst,eventName,value,path){var detail={value:value,queueProperty:!0};if(path){detail.path=path}wrap$1(/** @type {!HTMLElement} */inst).dispatchEvent(new CustomEvent(eventName,{detail:detail}))}/**
   * Implements the "notify" effect.
   *
   * Dispatches a non-bubbling event named `info.eventName` on the instance
   * with a detail object containing the new `value`.
   *
   * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @return {void}
   * @private
   */function runNotifyEffect(inst,property,props,oldProps,info,hasPaths){var rootProperty=hasPaths?root(property):property,path=rootProperty!=property?property:null,value=path?_get(inst,path):inst.__data[property];if(path&&value===void 0){value=props[property];// specifically for .splices
}dispatchNotifyEvent(inst,info.eventName,value,path)}/**
   * Handler function for 2-way notification events. Receives context
   * information captured in the `addNotifyListener` closure from the
   * `__notifyListeners` metadata.
   *
   * Sets the value of the notified property to the host property or path.  If
   * the event contained path information, translate that path to the host
   * scope's name for that path first.
   *
   * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
   * @param {!Polymer_PropertyEffects} inst Host element instance handling the
   *     notification event
   * @param {string} fromProp Child element property that was bound
   * @param {string} toPath Host property/path that was bound
   * @param {boolean} negate Whether the binding was negated
   * @return {void}
   * @private
   */function handleNotification(event,inst,fromProp,toPath,negate){var value,detail=/** @type {Object} */event.detail,fromPath=detail&&detail.path;if(fromPath){toPath=translate(fromProp,toPath,fromPath);value=detail&&detail.value}else{value=event.currentTarget[fromProp]}value=negate?!value:value;if(!inst[TYPES.READ_ONLY]||!inst[TYPES.READ_ONLY][toPath]){if(inst._setPendingPropertyOrPath(toPath,value,!0,!!fromPath)&&(!detail||!detail.queueProperty)){inst._invalidateProperties()}}}/**
   * Implements the "reflect" effect.
   *
   * Sets the attribute named `info.attrName` to the given property value.
   *
   * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {void}
   * @private
   */function runReflectEffect(inst,property,props,oldProps,info){var value=inst.__data[property];if(sanitizeDOMValue){value=sanitizeDOMValue(value,info.attrName,"attribute",/** @type {Node} */inst)}inst._propertyToAttribute(property,info.attrName,value)}/**
   * Runs "computed" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * continues to run computed effects based on the output of each pass until
   * there are no more newly computed properties.  This ensures that all
   * properties that will be computed by the initial set of changes are
   * computed before other effects (binding propagation, observers, and notify)
   * run.
   *
   * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
   * @param {?Object} changedProps Bag of changed properties
   * @param {?Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @return {void}
   * @private
   */function runComputedEffects(inst,changedProps,oldProps,hasPaths){var computeEffects=inst[TYPES.COMPUTE];if(computeEffects){var inputProps=changedProps;while(runEffects(inst,computeEffects,inputProps,oldProps,hasPaths)){Object.assign(/** @type {!Object} */oldProps,inst.__dataOld);Object.assign(/** @type {!Object} */changedProps,inst.__dataPending);inputProps=inst.__dataPending;inst.__dataPending=null}}}/**
   * Implements the "computed property" effect by running the method with the
   * values of the arguments specified in the `info` object and setting the
   * return value to the computed property specified.
   *
   * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {?Object} props Bag of current property changes
   * @param {?Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {void}
   * @private
   */function runComputedEffect(inst,property,props,oldProps,info){var result=runMethodEffect(inst,property,props,oldProps,info),computedProp=info.methodInfo;if(inst.__dataHasAccessor&&inst.__dataHasAccessor[computedProp]){inst._setPendingProperty(computedProp,result,!0)}else{inst[computedProp]=result}}/**
   * Computes path changes based on path links set up using the `linkPaths`
   * API.
   *
   * @param {!Polymer_PropertyEffects} inst The instance whose props are changing
   * @param {string} path Path that has changed
   * @param {*} value Value of changed path
   * @return {void}
   * @private
   */function computeLinkedPaths(inst,path,value){var links=inst.__dataLinkedPaths;if(links){var _link;for(var a in links){var b=links[a];if(isDescendant(a,path)){_link=translate(a,b,path);inst._setPendingPropertyOrPath(_link,value,!0,!0)}else if(isDescendant(b,path)){_link=translate(b,a,path);inst._setPendingPropertyOrPath(_link,value,!0,!0)}}}}// -- bindings ----------------------------------------------
/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @return {void}
 * @private
 */function addBinding(constructor,templateInfo,nodeInfo,kind,target,parts,literal){// Create binding metadata and add to nodeInfo
nodeInfo.bindings=nodeInfo.bindings||[];var/** Binding */binding={kind:kind,target:target,parts:parts,literal:literal,isCompound:1!==parts.length};nodeInfo.bindings.push(binding);// Add listener info to binding metadata
if(shouldAddListener(binding)){var _binding$parts$=binding.parts[0],event=_binding$parts$.event,negate=_binding$parts$.negate;binding.listenerEvent=event||camelToDashCase(target)+"-changed";binding.listenerNegate=negate}// Add "propagate" property effects to templateInfo
for(var index=templateInfo.nodeInfoList.length,_i8=0,part;_i8<binding.parts.length;_i8++){part=binding.parts[_i8];part.compoundIndex=_i8;addEffectForBindingPart(constructor,templateInfo,binding,part,index)}}/**
   * Adds property effects to the given `templateInfo` for the given binding
   * part.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {number} index Index into `nodeInfoList` for this node
   * @return {void}
   */function addEffectForBindingPart(constructor,templateInfo,binding,part,index){if(!part.literal){if("attribute"===binding.kind&&"-"===binding.target[0]){console.warn("Cannot set attribute "+binding.target+" because \"-\" is not a valid attribute starting character")}else{for(var dependencies=part.dependencies,info={index:index,binding:binding,part:part,evaluator:constructor},j=0,trigger;j<dependencies.length;j++){trigger=dependencies[j];if("string"==typeof trigger){trigger=parseArg(trigger);trigger.wildcard=!0}constructor._addTemplatePropertyEffect(templateInfo,trigger.rootProperty,{fn:runBindingEffect,info:info,trigger:trigger})}}}}/**
   * Implements the "binding" (property/path binding) effect.
   *
   * Note that binding syntax is overridable via `_parseBindings` and
   * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
   * non-literal parts returned from `_parseBindings`.  However,
   * there is no support for _path_ bindings via custom binding parts,
   * as this is specific to Polymer's path binding syntax.
   *
   * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
   * @param {string} path Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
   *   metadata
   * @return {void}
   * @private
   */function runBindingEffect(inst,path,props,oldProps,info,hasPaths,nodeList){var node=nodeList[info.index],binding=info.binding,part=info.part;// Subpath notification: transform path and set to client
// e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
if(hasPaths&&part.source&&path.length>part.source.length&&"property"==binding.kind&&!binding.isCompound&&node.__isPropertyEffectsClient&&node.__dataHasAccessor&&node.__dataHasAccessor[binding.target]){var value=props[path];path=translate(part.source,binding.target,path);if(node._setPendingPropertyOrPath(path,value,!1,!0)){inst._enqueueClient(node)}}else{var _value2=info.evaluator._evaluateBinding(inst,part,path,props,oldProps,hasPaths);// Propagate value to child
applyBindingValue(inst,node,binding,part,_value2)}}/**
   * Sets the value for an "binding" (binding) effect to a node,
   * either as a property or attribute.
   *
   * @param {!Polymer_PropertyEffects} inst The instance owning the binding effect
   * @param {Node} node Target node for binding
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {*} value Value to set
   * @return {void}
   * @private
   */function applyBindingValue(inst,node,binding,part,value){value=computeBindingValue(node,value,binding,part);if(sanitizeDOMValue){value=sanitizeDOMValue(value,binding.target,binding.kind,node)}if("attribute"==binding.kind){// Attribute binding
inst._valueToNodeAttribute(/** @type {Element} */node,value,binding.target)}else{// Property binding
var prop=binding.target;if(node.__isPropertyEffectsClient&&node.__dataHasAccessor&&node.__dataHasAccessor[prop]){if(!node[TYPES.READ_ONLY]||!node[TYPES.READ_ONLY][prop]){if(node._setPendingProperty(prop,value)){inst._enqueueClient(node)}}}else{inst._setUnmanagedPropertyToNode(node,prop,value)}}}/**
   * Transforms an "binding" effect value based on compound & negation
   * effect metadata, as well as handling for special-case properties
   *
   * @param {Node} node Node the value will be set to
   * @param {*} value Value to set
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @return {*} Transformed value to set
   * @private
   */function computeBindingValue(node,value,binding,part){if(binding.isCompound){var storage=node.__dataCompoundStorage[binding.target];storage[part.compoundIndex]=value;value=storage.join("")}if("attribute"!==binding.kind){// Some browsers serialize `undefined` to `"undefined"`
if("textContent"===binding.target||"value"===binding.target&&("input"===node.localName||"textarea"===node.localName)){value=value==void 0?"":value}}return value}/**
   * Returns true if a binding's metadata meets all the requirements to allow
   * 2-way binding, and therefore a `<property>-changed` event listener should be
   * added:
   * - used curly braces
   * - is a property (not attribute) binding
   * - is not a textContent binding
   * - is not compound
   *
   * @param {!Binding} binding Binding metadata
   * @return {boolean} True if 2-way listener should be added
   * @private
   */function shouldAddListener(binding){return!!binding.target&&"attribute"!=binding.kind&&"text"!=binding.kind&&!binding.isCompound&&"{"===binding.parts[0].mode}/**
   * Setup compound binding storage structures, notify listeners, and dataHost
   * references onto the bound nodeList.
   *
   * @param {!Polymer_PropertyEffects} inst Instance that bas been previously
   *     bound
   * @param {TemplateInfo} templateInfo Template metadata
   * @return {void}
   * @private
   */function setupBindings(inst,templateInfo){// Setup compound storage, dataHost, and notify listeners
var nodeList=templateInfo.nodeList,nodeInfoList=templateInfo.nodeInfoList;if(nodeInfoList.length){for(var _i9=0;_i9<nodeInfoList.length;_i9++){var info=nodeInfoList[_i9],node=nodeList[_i9],bindings=info.bindings;if(bindings){for(var _i10=0,binding;_i10<bindings.length;_i10++){binding=bindings[_i10];setupCompoundStorage(node,binding);addNotifyListener(node,inst,binding)}}node.__dataHost=inst}}}/**
   * Initializes `__dataCompoundStorage` local storage on a bound node with
   * initial literal data for compound bindings, and sets the joined
   * literal parts to the bound property.
   *
   * When changes to compound parts occur, they are first set into the compound
   * storage array for that property, and then the array is joined to result in
   * the final value set to the property/attribute.
   *
   * @param {Node} node Bound node to initialize
   * @param {Binding} binding Binding metadata
   * @return {void}
   * @private
   */function setupCompoundStorage(node,binding){if(binding.isCompound){// Create compound storage map
for(var storage=node.__dataCompoundStorage||(node.__dataCompoundStorage={}),parts=binding.parts,literals=Array(parts.length),j=0;j<parts.length;j++){literals[j]=parts[j].literal}var target=binding.target;storage[target]=literals;// Configure properties with their literal parts
if(binding.literal&&"property"==binding.kind){// Note, className needs style scoping so this needs wrapping.
// We may also want to consider doing this for `textContent` and
// `innerHTML`.
if("className"===target){node=wrap$1(node)}node[target]=binding.literal}}}/**
   * Adds a 2-way binding notification event listener to the node specified
   *
   * @param {Object} node Child element to add listener to
   * @param {!Polymer_PropertyEffects} inst Host element instance to handle
   *     notification event
   * @param {Binding} binding Binding metadata
   * @return {void}
   * @private
   */function addNotifyListener(node,inst,binding){if(binding.listenerEvent){var part=binding.parts[0];node.addEventListener(binding.listenerEvent,function(e){handleNotification(e,inst,binding.target,part.source,part.negate)})}}// -- for method-based effects (complexObserver & computed) --------------
/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @return {void}
 * @private
 */function createMethodEffect(model,sig,type,effectFn,methodInfo,dynamicFn){dynamicFn=sig.static||dynamicFn&&("object"!==babelHelpers.typeof(dynamicFn)||dynamicFn[sig.methodName]);for(var info={methodName:sig.methodName,args:sig.args,methodInfo:methodInfo,dynamicFn:dynamicFn},_i11=0,arg;_i11<sig.args.length&&(arg=sig.args[_i11]);_i11++){if(!arg.literal){model._addPropertyEffect(arg.rootProperty,type,{fn:effectFn,info:info,trigger:arg})}}if(dynamicFn){model._addPropertyEffect(sig.methodName,type,{fn:effectFn,info:info})}}/**
   * Calls a method with arguments marshaled from properties on the instance
   * based on the method signature contained in the effect metadata.
   *
   * Multi-property observers, computed properties, and inline computing
   * functions call this function to invoke the method, then use the return
   * value accordingly.
   *
   * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {*} Returns the return value from the method invocation
   * @private
   */function runMethodEffect(inst,property,props,oldProps,info){// Instances can optionally have a _methodHost which allows redirecting where
// to find methods. Currently used by `templatize`.
var context=inst._methodHost||inst,fn=context[info.methodName];if(fn){var args=inst._marshalArgs(info.args,property,props);return fn.apply(context,args)}else if(!info.dynamicFn){console.warn("method `"+info.methodName+"` not defined")}}var emptyArray=[],IDENT="(?:"+"[a-zA-Z_$][\\w.:$\\-*]*"+")",NUMBER="(?:"+"[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?"+")",SQUOTE_STRING="(?:"+"'(?:[^'\\\\]|\\\\.)*'"+")",DQUOTE_STRING="(?:"+"\"(?:[^\"\\\\]|\\\\.)*\""+")",STRING="(?:"+SQUOTE_STRING+"|"+DQUOTE_STRING+")",ARGUMENT="(?:("+IDENT+"|"+NUMBER+"|"+STRING+")\\s*"+")",ARGUMENTS="(?:"+ARGUMENT+"(?:,\\s*"+ARGUMENT+")*"+")",ARGUMENT_LIST="(?:"+"\\(\\s*"+"(?:"+ARGUMENTS+"?"+")"+"\\)\\s*"+")",BINDING="("+IDENT+"\\s*"+ARGUMENT_LIST+"?"+")",OPEN_BRACKET="(\\[\\[|{{)"+"\\s*",CLOSE_BRACKET="(?:]]|}})",NEGATE="(?:(!)\\s*)?",EXPRESSION=OPEN_BRACKET+NEGATE+BINDING+CLOSE_BRACKET,bindingRegex=new RegExp(EXPRESSION,"g");// Regular expressions used for binding
/**
                                                   * Create a string from binding parts of all the literal parts
                                                   *
                                                   * @param {!Array<BindingPart>} parts All parts to stringify
                                                   * @return {string} String made from the literal parts
                                                   */function literalFromParts(parts){for(var s="",_i12=0,literal;_i12<parts.length;_i12++){literal=parts[_i12].literal;s+=literal||""}return s}/**
   * Parses an expression string for a method signature, and returns a metadata
   * describing the method in terms of `methodName`, `static` (whether all the
   * arguments are literals), and an array of `args`
   *
   * @param {string} expression The expression to parse
   * @return {?MethodSignature} The method metadata object if a method expression was
   *   found, otherwise `undefined`
   * @private
   */function parseMethod(expression){// tries to match valid javascript property names
var m=expression.match(/([^\s]+?)\(([\s\S]*)\)/);if(m){var methodName=m[1],sig={methodName:methodName,static:!0,args:emptyArray};if(m[2].trim()){// replace escaped commas with comma entity, split on un-escaped commas
var args=m[2].replace(/\\,/g,"&comma;").split(",");return parseArgs(args,sig)}else{return sig}}return null}/**
   * Parses an array of arguments and sets the `args` property of the supplied
   * signature metadata object. Sets the `static` property to false if any
   * argument is a non-literal.
   *
   * @param {!Array<string>} argList Array of argument names
   * @param {!MethodSignature} sig Method signature metadata object
   * @return {!MethodSignature} The updated signature metadata object
   * @private
   */function parseArgs(argList,sig){sig.args=argList.map(function(rawArg){var arg=parseArg(rawArg);if(!arg.literal){sig.static=!1}return arg},this);return sig}/**
   * Parses an individual argument, and returns an argument metadata object
   * with the following fields:
   *
   *   {
   *     value: 'prop',        // property/path or literal value
   *     literal: false,       // whether argument is a literal
   *     structured: false,    // whether the property is a path
   *     rootProperty: 'prop', // the root property of the path
   *     wildcard: false       // whether the argument was a wildcard '.*' path
   *   }
   *
   * @param {string} rawArg The string value of the argument
   * @return {!MethodArg} Argument metadata object
   * @private
   */function parseArg(rawArg){// clean up whitespace
var arg=rawArg.trim()// replace comma entity with comma
.replace(/&comma;/g,",")// repair extra escape sequences; note only commas strictly need
// escaping, but we allow any other char to be escaped since its
// likely users will do this
.replace(/\\(.)/g,"$1"),a={name:arg,value:"",literal:!1},fc=arg[0];// basic argument descriptor
if("-"===fc){fc=arg[1]}if("0"<=fc&&"9">=fc){fc="#"}switch(fc){case"'":case"\"":a.value=arg.slice(1,-1);a.literal=!0;break;case"#":a.value=+arg;a.literal=!0;break;}// if not literal, look for structured path
if(!a.literal){a.rootProperty=root(arg);// detect structured path (has dots)
a.structured=isPath(arg);if(a.structured){a.wildcard=".*"==arg.slice(-2);if(a.wildcard){a.name=arg.slice(0,-2)}}}return a}function getArgValue(data,props,path){var value=_get(data,path);// when data is not stored e.g. `splices`, get the value from changedProps
// TODO(kschaaf): Note, this can cause a rare issue where the wildcard
// info.value could pull a stale value out of changedProps during a reentrant
// change that sets the value back to undefined.
// https://github.com/Polymer/polymer/issues/5479
if(value===void 0){value=props[path]}return value}// data api
/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!Polymer_PropertyEffects} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @return {void}
 * @private
 */function _notifySplices(inst,array,path,splices){inst.notifyPath(path+".splices",{indexSplices:splices});inst.notifyPath(path+".length",array.length)}/**
   * Creates a splice record and sends an array splice notification for
   * the described mutation
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!Polymer_PropertyEffects} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {number} index Index at which the array mutation occurred
   * @param {number} addedCount Number of added items
   * @param {Array} removed Array of removed items
   * @return {void}
   * @private
   */function notifySplice(inst,array,path,index,addedCount,removed){_notifySplices(inst,array,path,[{index:index,addedCount:addedCount,removed:removed,object:array,type:"splice"}])}/**
   * Returns an upper-cased version of the string.
   *
   * @param {string} name String to uppercase
   * @return {string} Uppercased string
   * @private
   */function upper(name){return name[0].toUpperCase()+name.substring(1)}/**
   * Element class mixin that provides meta-programming for Polymer's template
   * binding and data observation (collectively, "property effects") system.
   *
   * This mixin uses provides the following key static methods for adding
   * property effects to an element class:
   * - `addPropertyEffect`
   * - `createPropertyObserver`
   * - `createMethodObserver`
   * - `createNotifyingProperty`
   * - `createReadOnlyProperty`
   * - `createReflectedProperty`
   * - `createComputedProperty`
   * - `bindTemplate`
   *
   * Each method creates one or more property accessors, along with metadata
   * used by this mixin's implementation of `_propertiesChanged` to perform
   * the property effects.
   *
   * Underscored versions of the above methods also exist on the element
   * prototype for adding property effects on instances at runtime.
   *
   * Note that this mixin overrides several `PropertyAccessors` methods, in
   * many cases to maintain guarantees provided by the Polymer 1.x features;
   * notably it changes property accessors to be synchronous by default
   * whereas the default when using `PropertyAccessors` standalone is to be
   * async by default.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin TemplateStamp
   * @appliesMixin PropertyAccessors
   * @summary Element class mixin that provides meta-programming for Polymer's
   * template binding and data observation system.
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */var PropertyEffects=dedupingMixin(function(superClass){/**
   * @constructor
   * @implements {Polymer_PropertyAccessors}
   * @implements {Polymer_TemplateStamp}
   * @unrestricted
   * @private
   */var propertyEffectsBase=TemplateStamp(PropertyAccessors(superClass)),PropertyEffects=/*#__PURE__*/function(_propertyEffectsBase){babelHelpers.inherits(PropertyEffects,_propertyEffectsBase);function PropertyEffects(){var _this9;babelHelpers.classCallCheck(this,PropertyEffects);_this9=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(PropertyEffects).call(this));/** @type {boolean} */ // Used to identify users of this mixin, ala instanceof
_this9.__isPropertyEffectsClient=!0;/** @type {number} */ // NOTE: used to track re-entrant calls to `_flushProperties`
// path changes dirty check against `__dataTemp` only during one "turn"
// and are cleared when `__dataCounter` returns to 0.
_this9.__dataCounter=0;/** @type {boolean} */_this9.__dataClientsReady;/** @type {Array} */_this9.__dataPendingClients;/** @type {Object} */_this9.__dataToNotify;/** @type {Object} */_this9.__dataLinkedPaths;/** @type {boolean} */_this9.__dataHasPaths;/** @type {Object} */_this9.__dataCompoundStorage;/** @type {Polymer_PropertyEffects} */_this9.__dataHost;/** @type {!Object} */_this9.__dataTemp;/** @type {boolean} */_this9.__dataClientsInitialized;/** @type {!Object} */_this9.__data;/** @type {!Object|null} */_this9.__dataPending;/** @type {!Object} */_this9.__dataOld;/** @type {Object} */_this9.__computeEffects;/** @type {Object} */_this9.__reflectEffects;/** @type {Object} */_this9.__notifyEffects;/** @type {Object} */_this9.__propagateEffects;/** @type {Object} */_this9.__observeEffects;/** @type {Object} */_this9.__readOnly;/** @type {!TemplateInfo} */_this9.__templateInfo;return _this9}/**
       * @return {!Object<string, string>} Effect prototype property name map.
       */babelHelpers.createClass(PropertyEffects,[{key:"_initializeProperties",/**
       * @override
       * @return {void}
       */value:function _initializeProperties(){babelHelpers.get(babelHelpers.getPrototypeOf(PropertyEffects.prototype),"_initializeProperties",this).call(this);hostStack.registerHost(this);this.__dataClientsReady=!1;this.__dataPendingClients=null;this.__dataToNotify=null;this.__dataLinkedPaths=null;this.__dataHasPaths=!1;// May be set on instance prior to upgrade
this.__dataCompoundStorage=this.__dataCompoundStorage||null;this.__dataHost=this.__dataHost||null;this.__dataTemp={};this.__dataClientsInitialized=!1}/**
       * Overrides `PropertyAccessors` implementation to provide a
       * more efficient implementation of initializing properties from
       * the prototype on the instance.
       *
       * @override
       * @param {Object} props Properties to initialize on the prototype
       * @return {void}
       */},{key:"_initializeProtoProperties",value:function _initializeProtoProperties(props){this.__data=Object.create(props);this.__dataPending=Object.create(props);this.__dataOld={}}/**
       * Overrides `PropertyAccessors` implementation to avoid setting
       * `_setProperty`'s `shouldNotify: true`.
       *
       * @override
       * @param {Object} props Properties to initialize on the instance
       * @return {void}
       */},{key:"_initializeInstanceProperties",value:function _initializeInstanceProperties(props){var readOnly=this[TYPES.READ_ONLY];for(var prop in props){if(!readOnly||!readOnly[prop]){this.__dataPending=this.__dataPending||{};this.__dataOld=this.__dataOld||{};this.__data[prop]=this.__dataPending[prop]=props[prop]}}}// Prototype setup ----------------------------------------
/**
     * Equivalent to static `addPropertyEffect` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @override
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     */},{key:"_addPropertyEffect",value:function _addPropertyEffect(property,type,effect){this._createPropertyAccessor(property,type==TYPES.READ_ONLY);// effects are accumulated into arrays per property based on type
var effects=ensureOwnEffectMap(this,type)[property];if(!effects){effects=this[type][property]=[]}effects.push(effect)}/**
       * Removes the given property effect.
       *
       * @override
       * @param {string} property Property the effect was associated with
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object to remove
       * @return {void}
       */},{key:"_removePropertyEffect",value:function _removePropertyEffect(property,type,effect){var effects=ensureOwnEffectMap(this,type)[property],idx=effects.indexOf(effect);if(0<=idx){effects.splice(idx,1)}}/**
       * Returns whether the current prototype/instance has a property effect
       * of a certain type.
       *
       * @override
       * @param {string} property Property name
       * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @return {boolean} True if the prototype/instance has an effect of this
       *     type
       * @protected
       */},{key:"_hasPropertyEffect",value:function _hasPropertyEffect(property,type){var effects=this[type];return!!(effects&&effects[property])}/**
       * Returns whether the current prototype/instance has a "read only"
       * accessor for the given property.
       *
       * @override
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this
       *     type
       * @protected
       */},{key:"_hasReadOnlyEffect",value:function _hasReadOnlyEffect(property){return this._hasPropertyEffect(property,TYPES.READ_ONLY)}/**
       * Returns whether the current prototype/instance has a "notify"
       * property effect for the given property.
       *
       * @override
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this
       *     type
       * @protected
       */},{key:"_hasNotifyEffect",value:function _hasNotifyEffect(property){return this._hasPropertyEffect(property,TYPES.NOTIFY)}/**
       * Returns whether the current prototype/instance has a "reflect to
       * attribute" property effect for the given property.
       *
       * @override
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this
       *     type
       * @protected
       */},{key:"_hasReflectEffect",value:function _hasReflectEffect(property){return this._hasPropertyEffect(property,TYPES.REFLECT)}/**
       * Returns whether the current prototype/instance has a "computed"
       * property effect for the given property.
       *
       * @override
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this
       *     type
       * @protected
       */},{key:"_hasComputedEffect",value:function _hasComputedEffect(property){return this._hasPropertyEffect(property,TYPES.COMPUTE)}// Runtime ----------------------------------------
/**
     * Sets a pending property or path.  If the root property of the path in
     * question had no accessor, the path is set, otherwise it is enqueued
     * via `_setPendingProperty`.
     *
     * This function isolates relatively expensive functionality necessary
     * for the public API (`set`, `setProperties`, `notifyPath`, and property
     * change listeners via {{...}} bindings), such that it is only done
     * when paths enter the system, and not at every propagation step.  It
     * also sets a `__dataHasPaths` flag on the instance which is used to
     * fast-path slower path-matching code in the property effects host paths.
     *
     * `path` can be a path string or array of path parts as accepted by the
     * public API.
     *
     * @override
     * @param {string | !Array<number|string>} path Path to set
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify Set to true if this change should
     *  cause a property notification event dispatch
     * @param {boolean=} isPathNotification If the path being set is a path
     *   notification of an already changed value, as opposed to a request
     *   to set and notify the change.  In the latter `false` case, a dirty
     *   check is performed and then the value is set to the path before
     *   enqueuing the pending property change.
     * @return {boolean} Returns true if the property/path was enqueued in
     *   the pending changes bag.
     * @protected
     */},{key:"_setPendingPropertyOrPath",value:function _setPendingPropertyOrPath(path,value,shouldNotify,isPathNotification){if(isPathNotification||root(Array.isArray(path)?path[0]:path)!==path){// Dirty check changes being set to a path against the actual object,
// since this is the entry point for paths into the system; from here
// the only dirty checks are against the `__dataTemp` cache to prevent
// duplicate work in the same turn only. Note, if this was a notification
// of a change already set to a path (isPathNotification: true),
// we always let the change through and skip the `set` since it was
// already dirty checked at the point of entry and the underlying
// object has already been updated
if(!isPathNotification){var old=_get(this,path);path=/** @type {string} */_set(this,path,value);// Use property-accessor's simpler dirty check
if(!path||!babelHelpers.get(babelHelpers.getPrototypeOf(PropertyEffects.prototype),"_shouldPropertyChange",this).call(this,path,value,old)){return!1}}this.__dataHasPaths=!0;if(this._setPendingProperty(/**@type{string}*/path,value,shouldNotify)){computeLinkedPaths(this,/**@type{string}*/path,value);return!0}}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[path]){return this._setPendingProperty(/**@type{string}*/path,value,shouldNotify)}else{this[path]=value}}return!1}/**
       * Applies a value to a non-Polymer element/node's property.
       *
       * The implementation makes a best-effort at binding interop:
       * Some native element properties have side-effects when
       * re-setting the same value (e.g. setting `<input>.value` resets the
       * cursor position), so we do a dirty-check before setting the value.
       * However, for better interop with non-Polymer custom elements that
       * accept objects, we explicitly re-set object changes coming from the
       * Polymer world (which may include deep object changes without the
       * top reference changing), erring on the side of providing more
       * information.
       *
       * Users may override this method to provide alternate approaches.
       *
       * @override
       * @param {!Node} node The node to set a property on
       * @param {string} prop The property to set
       * @param {*} value The value to set
       * @return {void}
       * @protected
       */},{key:"_setUnmanagedPropertyToNode",value:function _setUnmanagedPropertyToNode(node,prop,value){// It is a judgment call that resetting primitives is
// "bad" and resettings objects is also "good"; alternatively we could
// implement a whitelist of tag & property values that should never
// be reset (e.g. <input>.value && <select>.value)
if(value!==node[prop]||"object"==babelHelpers.typeof(value)){// Note, className needs style scoping so this needs wrapping.
if("className"===prop){node=/** @type {!Node} */wrap$1(node)}node[prop]=value}}/**
       * Overrides the `PropertiesChanged` implementation to introduce special
       * dirty check logic depending on the property & value being set:
       *
       * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
       *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
       * 2. Object set to simple property (e.g. 'prop': {...})
       *    Stored in `__dataTemp` and `__data`, dirty checked against
       *    `__dataTemp` by default implementation of `_shouldPropertyChange`
       * 3. Primitive value set to simple property (e.g. 'prop': 42)
       *    Stored in `__data`, dirty checked against `__data`
       *
       * The dirty-check is important to prevent cycles due to two-way
       * notification, but paths and objects are only dirty checked against any
       * previous value set during this turn via a "temporary cache" that is
       * cleared when the last `_propertiesChanged` exits. This is so:
       * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
       *    due to array mutations like shift/unshift/splice; this is fine
       *    since path changes are dirty-checked at user entry points like `set`
       * b. dirty-checking for objects only lasts one turn to allow the user
       *    to mutate the object in-place and re-set it with the same identity
       *    and have all sub-properties re-propagated in a subsequent turn.
       *
       * The temp cache is not necessarily sufficient to prevent invalid array
       * paths, since a splice can happen during the same turn (with pathological
       * user code); we could introduce a "fixup" for temporarily cached array
       * paths if needed: https://github.com/Polymer/polymer/issues/4227
       *
       * @override
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify True if property should fire notification
       *   event (applies only for `notify: true` properties)
       * @return {boolean} Returns true if the property changed
       */},{key:"_setPendingProperty",value:function _setPendingProperty(property,value,shouldNotify){var propIsPath=this.__dataHasPaths&&isPath(property),prevProps=propIsPath?this.__dataTemp:this.__data;if(this._shouldPropertyChange(property,value,prevProps[property])){if(!this.__dataPending){this.__dataPending={};this.__dataOld={}}// Ensure old is captured from the last turn
if(!(property in this.__dataOld)){this.__dataOld[property]=this.__data[property]}// Paths are stored in temporary cache (cleared at end of turn),
// which is used for dirty-checking, all others stored in __data
if(propIsPath){this.__dataTemp[property]=value}else{this.__data[property]=value}// All changes go into pending property bag, passed to _propertiesChanged
this.__dataPending[property]=value;// Track properties that should notify separately
if(propIsPath||this[TYPES.NOTIFY]&&this[TYPES.NOTIFY][property]){this.__dataToNotify=this.__dataToNotify||{};this.__dataToNotify[property]=shouldNotify}return!0}return!1}/**
       * Overrides base implementation to ensure all accessors set `shouldNotify`
       * to true, for per-property notification tracking.
       *
       * @override
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {void}
       */},{key:"_setProperty",value:function _setProperty(property,value){if(this._setPendingProperty(property,value,!0)){this._invalidateProperties()}}/**
       * Overrides `PropertyAccessor`'s default async queuing of
       * `_propertiesChanged`: if `__dataReady` is false (has not yet been
       * manually flushed), the function no-ops; otherwise flushes
       * `_propertiesChanged` synchronously.
       *
       * @override
       * @return {void}
       */},{key:"_invalidateProperties",value:function _invalidateProperties(){if(this.__dataReady){this._flushProperties()}}/**
       * Enqueues the given client on a list of pending clients, whose
       * pending property changes can later be flushed via a call to
       * `_flushClients`.
       *
       * @override
       * @param {Object} client PropertyEffects client to enqueue
       * @return {void}
       * @protected
       */},{key:"_enqueueClient",value:function _enqueueClient(client){this.__dataPendingClients=this.__dataPendingClients||[];if(client!==this){this.__dataPendingClients.push(client)}}/**
       * Overrides superclass implementation.
       *
       * @override
       * @return {void}
       * @protected
       */},{key:"_flushProperties",value:function _flushProperties(){this.__dataCounter++;babelHelpers.get(babelHelpers.getPrototypeOf(PropertyEffects.prototype),"_flushProperties",this).call(this);this.__dataCounter--}/**
       * Flushes any clients previously enqueued via `_enqueueClient`, causing
       * their `_flushProperties` method to run.
       *
       * @override
       * @return {void}
       * @protected
       */},{key:"_flushClients",value:function _flushClients(){if(!this.__dataClientsReady){this.__dataClientsReady=!0;this._readyClients();// Override point where accessors are turned on; importantly,
// this is after clients have fully readied, providing a guarantee
// that any property effects occur only after all clients are ready.
this.__dataReady=!0}else{this.__enableOrFlushClients()}}// NOTE: We ensure clients either enable or flush as appropriate. This
// handles two corner cases:
// (1) clients flush properly when connected/enabled before the host
// enables; e.g.
//   (a) Templatize stamps with no properties and does not flush and
//   (b) the instance is inserted into dom and
//   (c) then the instance flushes.
// (2) clients enable properly when not connected/enabled when the host
// flushes; e.g.
//   (a) a template is runtime stamped and not yet connected/enabled
//   (b) a host sets a property, causing stamped dom to flush
//   (c) the stamped dom enables.
},{key:"__enableOrFlushClients",value:function __enableOrFlushClients(){var clients=this.__dataPendingClients;if(clients){this.__dataPendingClients=null;for(var _i13=0,client;_i13<clients.length;_i13++){client=clients[_i13];if(!client.__dataEnabled){client._enableProperties()}else if(client.__dataPending){client._flushProperties()}}}}/**
       * Perform any initial setup on client dom. Called before the first
       * `_flushProperties` call on client dom and before any element
       * observers are called.
       *
       * @override
       * @return {void}
       * @protected
       */},{key:"_readyClients",value:function _readyClients(){this.__enableOrFlushClients()}/**
       * Sets a bag of property changes to this instance, and
       * synchronously processes all effects of the properties as a batch.
       *
       * Property names must be simple properties, not paths.  Batched
       * path propagation is not supported.
       *
       * @override
       * @param {Object} props Bag of one or more key-value pairs whose key is
       *   a property and value is the new value to set for that property.
       * @param {boolean=} setReadOnly When true, any private values set in
       *   `props` will be set. By default, `setProperties` will not set
       *   `readOnly: true` root properties.
       * @return {void}
       * @public
       */},{key:"setProperties",value:function setProperties(props,setReadOnly){for(var _path in props){if(setReadOnly||!this[TYPES.READ_ONLY]||!this[TYPES.READ_ONLY][_path]){//TODO(kschaaf): explicitly disallow paths in setProperty?
// wildcard observers currently only pass the first changed path
// in the `info` object, and you could do some odd things batching
// paths, e.g. {'foo.bar': {...}, 'foo': null}
this._setPendingPropertyOrPath(_path,props[_path],!0)}}this._invalidateProperties()}/**
       * Overrides `PropertyAccessors` so that property accessor
       * side effects are not enabled until after client dom is fully ready.
       * Also calls `_flushClients` callback to ensure client dom is enabled
       * that was not enabled as a result of flushing properties.
       *
       * @override
       * @return {void}
       */},{key:"ready",value:function ready(){// It is important that `super.ready()` is not called here as it
// immediately turns on accessors. Instead, we wait until `readyClients`
// to enable accessors to provide a guarantee that clients are ready
// before processing any accessors side effects.
this._flushProperties();// If no data was pending, `_flushProperties` will not `flushClients`
// so ensure this is done.
if(!this.__dataClientsReady){this._flushClients()}// Before ready, client notifications do not trigger _flushProperties.
// Therefore a flush is necessary here if data has been set.
if(this.__dataPending){this._flushProperties()}}/**
       * Implements `PropertyAccessors`'s properties changed callback.
       *
       * Runs each class of effects for the batch of changed properties in
       * a specific order (compute, propagate, reflect, observe, notify).
       *
       * @override
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {?Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {?Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @return {void}
       */},{key:"_propertiesChanged",value:function _propertiesChanged(currentProps,changedProps,oldProps){// ----------------------------
// let c = Object.getOwnPropertyNames(changedProps || {});
// window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
// if (window.debug) { debugger; }
// ----------------------------
var hasPaths=this.__dataHasPaths;this.__dataHasPaths=!1;// Compute properties
runComputedEffects(this,changedProps,oldProps,hasPaths);// Clear notify properties prior to possible reentry (propagate, observe),
// but after computing effects have a chance to add to them
var notifyProps=this.__dataToNotify;this.__dataToNotify=null;// Propagate properties to clients
this._propagatePropertyChanges(changedProps,oldProps,hasPaths);// Flush clients
this._flushClients();// Reflect properties
runEffects(this,this[TYPES.REFLECT],changedProps,oldProps,hasPaths);// Observe properties
runEffects(this,this[TYPES.OBSERVE],changedProps,oldProps,hasPaths);// Notify properties to host
if(notifyProps){runNotifyEffects(this,notifyProps,changedProps,oldProps,hasPaths)}// Clear temporary cache at end of turn
if(1==this.__dataCounter){this.__dataTemp={}}// ----------------------------
// window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
// ----------------------------
}/**
       * Called to propagate any property changes to stamped template nodes
       * managed by this element.
       *
       * @override
       * @param {Object} changedProps Bag of changed properties
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @return {void}
       * @protected
       */},{key:"_propagatePropertyChanges",value:function _propagatePropertyChanges(changedProps,oldProps,hasPaths){if(this[TYPES.PROPAGATE]){runEffects(this,this[TYPES.PROPAGATE],changedProps,oldProps,hasPaths)}var templateInfo=this.__templateInfo;while(templateInfo){runEffects(this,templateInfo.propertyEffects,changedProps,oldProps,hasPaths,templateInfo.nodeList);templateInfo=templateInfo.nextTemplateInfo}}/**
       * Aliases one data path as another, such that path notifications from one
       * are routed to the other.
       *
       * @override
       * @param {string | !Array<string|number>} to Target path to link.
       * @param {string | !Array<string|number>} from Source path to link.
       * @return {void}
       * @public
       */},{key:"linkPaths",value:function linkPaths(to,from){to=normalize(to);from=normalize(from);this.__dataLinkedPaths=this.__dataLinkedPaths||{};this.__dataLinkedPaths[to]=from}/**
       * Removes a data path alias previously established with `_linkPaths`.
       *
       * Note, the path to unlink should be the target (`to`) used when
       * linking the paths.
       *
       * @override
       * @param {string | !Array<string|number>} path Target path to unlink.
       * @return {void}
       * @public
       */},{key:"unlinkPaths",value:function unlinkPaths(path){path=normalize(path);if(this.__dataLinkedPaths){delete this.__dataLinkedPaths[path]}}/**
       * Notify that an array has changed.
       *
       * Example:
       *
       *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
       *     ...
       *     this.items.splice(1, 1, {name: 'Sam'});
       *     this.items.push({name: 'Bob'});
       *     this.notifySplices('items', [
       *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1,
       *         object: this.items, type: 'splice' },
       *       { index: 3, removed: [], addedCount: 1,
       *         object: this.items, type: 'splice'}
       *     ]);
       *
       * @param {string} path Path that should be notified.
       * @param {Array} splices Array of splice records indicating ordered
       *   changes that occurred to the array. Each record should have the
       *   following fields:
       *    * index: index at which the change occurred
       *    * removed: array of items that were removed from this index
       *    * addedCount: number of new items added at this index
       *    * object: a reference to the array in question
       *    * type: the string literal 'splice'
       *
       *   Note that splice records _must_ be normalized such that they are
       *   reported in index order (raw results from `Object.observe` are not
       *   ordered and must be normalized/merged before notifying).
       *
       * @override
       * @return {void}
       * @public
       */},{key:"notifySplices",value:function notifySplices(path,splices){var info={path:""},array=/** @type {Array} */_get(this,path,info);_notifySplices(this,array,info.path,splices)}/**
       * Convenience method for reading a value from a path.
       *
       * Note, if any part in the path is undefined, this method returns
       * `undefined` (this method does not throw when dereferencing undefined
       * paths).
       *
       * @override
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `users.12.name` or `['users', 12, 'name']`).
       * @param {Object=} root Root object from which the path is evaluated.
       * @return {*} Value at the path, or `undefined` if any part of the path
       *   is undefined.
       * @public
       */},{key:"get",value:function get(path,root){return _get(root||this,path)}/**
       * Convenience method for setting a value to a path and notifying any
       * elements bound to the same path.
       *
       * Note, if any part in the path except for the last is undefined,
       * this method does nothing (this method does not throw when
       * dereferencing undefined paths).
       *
       * @override
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
       * @param {*} value Value to set at the specified path.
       * @param {Object=} root Root object from which the path is evaluated.
       *   When specified, no notification will occur.
       * @return {void}
       * @public
       */},{key:"set",value:function set(path,value,root){if(root){_set(root,path,value)}else{if(!this[TYPES.READ_ONLY]||!this[TYPES.READ_ONLY][/** @type {string} */path]){if(this._setPendingPropertyOrPath(path,value,!0)){this._invalidateProperties()}}}}/**
       * Adds items onto the end of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @override
       * @param {string | !Array<string|number>} path Path to array.
       * @param {...*} items Items to push onto array
       * @return {number} New length of the array.
       * @public
       */},{key:"push",value:function push(path){for(var info={path:""},array=/** @type {Array}*/_get(this,path,info),len=array.length,_len=arguments.length,items=Array(1<_len?_len-1:0),_key=1;_key<_len;_key++){items[_key-1]=arguments[_key]}var ret=array.push.apply(array,items);if(items.length){notifySplice(this,array,info.path,len,items.length,[])}return ret}/**
       * Removes an item from the end of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @override
       * @param {string | !Array<string|number>} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */},{key:"pop",value:function pop(path){var info={path:""},array=/** @type {Array} */_get(this,path,info),hadLength=!!array.length,ret=array.pop();if(hadLength){notifySplice(this,array,info.path,array.length,0,[ret])}return ret}/**
       * Starting from the start index specified, removes 0 or more items
       * from the array and inserts 0 or more new items in their place.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.splice`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @override
       * @param {string | !Array<string|number>} path Path to array.
       * @param {number} start Index from which to start removing/inserting.
       * @param {number=} deleteCount Number of items to remove.
       * @param {...*} items Items to insert into array.
       * @return {Array} Array of removed items.
       * @public
       */},{key:"splice",value:function splice(path,start,deleteCount){for(var _len2=arguments.length,items=Array(3<_len2?_len2-3:0),_key2=3;_key2<_len2;_key2++){items[_key2-3]=arguments[_key2]}var info={path:""},array=/** @type {Array} */_get(this,path,info);// Normalize fancy native splice handling of crazy start values
if(0>start){start=array.length-Math.floor(-start)}else if(start){start=Math.floor(start)}// array.splice does different things based on the number of arguments
// you pass in. Therefore, array.splice(0) and array.splice(0, undefined)
// do different things. In the former, the whole array is cleared. In the
// latter, no items are removed.
// This means that we need to detect whether 1. one of the arguments
// is actually passed in and then 2. determine how many arguments
// we should pass on to the native array.splice
//
var ret;// Omit any additional arguments if they were not passed in
if(2===arguments.length){ret=array.splice(start);// Either start was undefined and the others were defined, but in this
// case we can safely pass on all arguments
//
// Note: this includes the case where none of the arguments were passed in,
// e.g. this.splice('array'). However, if both start and deleteCount
// are undefined, array.splice will not modify the array (as expected)
}else{ret=array.splice.apply(array,[start,deleteCount].concat(items))}// At the end, check whether any items were passed in (e.g. insertions)
// or if the return array contains items (e.g. deletions).
// Only notify if items were added or deleted.
if(items.length||ret.length){notifySplice(this,array,info.path,start,items.length,ret)}return ret}/**
       * Removes an item from the beginning of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @override
       * @param {string | !Array<string|number>} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */},{key:"shift",value:function shift(path){var info={path:""},array=/** @type {Array} */_get(this,path,info),hadLength=!!array.length,ret=array.shift();if(hadLength){notifySplice(this,array,info.path,0,0,[ret])}return ret}/**
       * Adds items onto the beginning of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @override
       * @param {string | !Array<string|number>} path Path to array.
       * @param {...*} items Items to insert info array
       * @return {number} New length of the array.
       * @public
       */},{key:"unshift",value:function unshift(path){for(var info={path:""},array=/** @type {Array} */_get(this,path,info),_len3=arguments.length,items=Array(1<_len3?_len3-1:0),_key3=1;_key3<_len3;_key3++){items[_key3-1]=arguments[_key3]}var ret=array.unshift.apply(array,items);if(items.length){notifySplice(this,array,info.path,0,items.length,[])}return ret}/**
       * Notify that a path has changed.
       *
       * Example:
       *
       *     this.item.user.name = 'Bob';
       *     this.notifyPath('item.user.name');
       *
       * @override
       * @param {string} path Path that should be notified.
       * @param {*=} value Value at the path (optional).
       * @return {void}
       * @public
       */},{key:"notifyPath",value:function notifyPath(path,value){/** @type {string} */var propPath;if(1==arguments.length){// Get value if not supplied
var info={path:""};value=_get(this,path,info);propPath=info.path}else if(Array.isArray(path)){// Normalize path if needed
propPath=normalize(path)}else{propPath=/** @type{string} */path}if(this._setPendingPropertyOrPath(propPath,value,!0,!0)){this._invalidateProperties()}}/**
       * Equivalent to static `createReadOnlyProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @override
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @return {void}
       * @protected
       */},{key:"_createReadOnlyProperty",value:function _createReadOnlyProperty(property,protectedSetter){this._addPropertyEffect(property,TYPES.READ_ONLY);if(protectedSetter){this["_set"+upper(property)]=/** @this {PropertyEffects} */function(value){this._setProperty(property,value)}}}/**
       * Equivalent to static `createPropertyObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @override
       * @param {string} property Property name
       * @param {string|function(*,*)} method Function or name of observer method
       *     to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @return {void}
       * @protected
       */},{key:"_createPropertyObserver",value:function _createPropertyObserver(property,method,dynamicFn){var info={property:property,method:method,dynamicFn:!!dynamicFn};this._addPropertyEffect(property,TYPES.OBSERVE,{fn:runObserverEffect,info:info,trigger:{name:property}});if(dynamicFn){this._addPropertyEffect(/** @type {string} */method,TYPES.OBSERVE,{fn:runObserverEffect,info:info,trigger:{name:method}})}}/**
       * Equivalent to static `createMethodObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @override
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @return {void}
       * @protected
       */},{key:"_createMethodObserver",value:function _createMethodObserver(expression,dynamicFn){var sig=parseMethod(expression);if(!sig){throw new Error("Malformed observer expression '"+expression+"'")}createMethodEffect(this,sig,TYPES.OBSERVE,runMethodEffect,null,dynamicFn)}/**
       * Equivalent to static `createNotifyingProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @override
       * @param {string} property Property name
       * @return {void}
       * @protected
       */},{key:"_createNotifyingProperty",value:function _createNotifyingProperty(property){this._addPropertyEffect(property,TYPES.NOTIFY,{fn:runNotifyEffect,info:{eventName:camelToDashCase(property)+"-changed",property:property}})}/**
       * Equivalent to static `createReflectedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @override
       * @param {string} property Property name
       * @return {void}
       * @protected
       * @suppress {missingProperties} go/missingfnprops
       */},{key:"_createReflectedProperty",value:function _createReflectedProperty(property){var attr=this.constructor.attributeNameForProperty(property);if("-"===attr[0]){console.warn("Property "+property+" cannot be reflected to attribute "+attr+" because \"-\" is not a valid starting attribute name. Use a lowercase first letter for the property instead.")}else{this._addPropertyEffect(property,TYPES.REFLECT,{fn:runReflectEffect,info:{attrName:attr}})}}/**
       * Equivalent to static `createComputedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @override
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @return {void}
       * @protected
       */},{key:"_createComputedProperty",value:function _createComputedProperty(property,expression,dynamicFn){var sig=parseMethod(expression);if(!sig){throw new Error("Malformed computed expression '"+expression+"'")}createMethodEffect(this,sig,TYPES.COMPUTE,runComputedEffect,property,dynamicFn)}/**
       * Gather the argument values for a method specified in the provided array
       * of argument metadata.
       *
       * The `path` and `value` arguments are used to fill in wildcard descriptor
       * when the method is being called as a result of a path notification.
       *
       * @param {!Array<!MethodArg>} args Array of argument metadata
       * @param {string} path Property/path name that triggered the method effect
       * @param {Object} props Bag of current property changes
       * @return {Array<*>} Array of argument values
       * @private
       */},{key:"_marshalArgs",value:function _marshalArgs(args,path,props){for(var data=this.__data,values=[],_i14=0,l=args.length;_i14<l;_i14++){var _args$_i=args[_i14],name=_args$_i.name,structured=_args$_i.structured,wildcard=_args$_i.wildcard,value=_args$_i.value,literal=_args$_i.literal;if(!literal){if(wildcard){var _matches=isDescendant(name,path),pathValue=getArgValue(data,props,_matches?path:name);value={path:_matches?path:name,value:pathValue,base:_matches?_get(data,name):pathValue}}else{value=structured?getArgValue(data,props,name):data[name]}}values[_i14]=value}return values}// -- static class methods ------------
/**
     * Ensures an accessor exists for the specified property, and adds
     * to a list of "property effects" that will run when the accessor for
     * the specified property is set.  Effects are grouped by "type", which
     * roughly corresponds to a phase in effect processing.  The effect
     * metadata should be in the following form:
     *
     *     {
     *       fn: effectFunction, // Reference to function to call to perform effect
     *       info: { ... }       // Effect metadata passed to function
     *       trigger: {          // Optional triggering metadata; if not provided
     *         name: string      // the property is treated as a wildcard
     *         structured: boolean
     *         wildcard: boolean
     *       }
     *     }
     *
     * Effects are called from `_propertiesChanged` in the following order by
     * type:
     *
     * 1. COMPUTE
     * 2. PROPAGATE
     * 3. REFLECT
     * 4. OBSERVE
     * 5. NOTIFY
     *
     * Effect functions are called with the following signature:
     *
     *     effectFunction(inst, path, props, oldProps, info, hasPaths)
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     * @nocollapse
     */},{key:"_bindTemplate",// -- binding ----------------------------------------------
/**
     * Equivalent to static `bindTemplate` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * This method may be called on the prototype (for prototypical template
     * binding, to avoid creating accessors every instance) once per prototype,
     * and will be called with `runtimeBinding: true` by `_stampTemplate` to
     * create and link an instance of the template metadata associated with a
     * particular stamping.
     *
     * @override
     * @param {!HTMLTemplateElement} template Template containing binding
     *   bindings
     * @param {boolean=} instanceBinding When false (default), performs
     *   "prototypical" binding of the template and overwrites any previously
     *   bound template for the class. When true (as passed from
     *   `_stampTemplate`), the template info is instanced and linked into
     *   the list of bound templates.
     * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
     *   this is an instance of the prototypical template info
     * @protected
     * @suppress {missingProperties} go/missingfnprops
     */value:function _bindTemplate(template,instanceBinding){var templateInfo=this.constructor._parseTemplate(template),wasPreBound=this.__templateInfo==templateInfo;// Optimization: since this is called twice for proto-bound templates,
// don't attempt to recreate accessors if this template was pre-bound
if(!wasPreBound){for(var prop in templateInfo.propertyEffects){this._createPropertyAccessor(prop)}}if(instanceBinding){// For instance-time binding, create instance of template metadata
// and link into list of templates if necessary
templateInfo=/** @type {!TemplateInfo} */Object.create(templateInfo);templateInfo.wasPreBound=wasPreBound;if(!wasPreBound&&this.__templateInfo){var last=this.__templateInfoLast||this.__templateInfo;this.__templateInfoLast=last.nextTemplateInfo=templateInfo;templateInfo.previousTemplateInfo=last;return templateInfo}}return this.__templateInfo=templateInfo}/**
       * Adds a property effect to the given template metadata, which is run
       * at the "propagate" stage of `_propertiesChanged` when the template
       * has been bound to the element via `_bindTemplate`.
       *
       * The `effect` object should match the format in `_addPropertyEffect`.
       *
       * @param {Object} templateInfo Template metadata to add effect to
       * @param {string} prop Property that should trigger the effect
       * @param {Object=} effect Effect metadata object
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"_stampTemplate",/**
       * Stamps the provided template and performs instance-time setup for
       * Polymer template features, including data bindings, declarative event
       * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
       * is returned containing the stamped DOM, ready for insertion into the
       * DOM.
       *
       * This method may be called more than once; however note that due to
       * `shadycss` polyfill limitations, only styles from templates prepared
       * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
       * to the shadow root and support CSS custom properties), and note that
       * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
       * any styles required by in runtime-stamped templates must be included
       * in the main element template.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       * @override
       * @protected
       */value:function _stampTemplate(template){// Ensures that created dom is `_enqueueClient`'d to this element so
// that it can be flushed on next call to `_flushProperties`
hostStack.beginHosting(this);var dom=babelHelpers.get(babelHelpers.getPrototypeOf(PropertyEffects.prototype),"_stampTemplate",this).call(this,template);hostStack.endHosting(this);var templateInfo=/** @type {!TemplateInfo} */this._bindTemplate(template,!0);// Add template-instance-specific data to instanced templateInfo
templateInfo.nodeList=dom.nodeList;// Capture child nodes to allow unstamping of non-prototypical templates
if(!templateInfo.wasPreBound){for(var nodes=templateInfo.childNodes=[],n=dom.firstChild;n;n=n.nextSibling){nodes.push(n)}}dom.templateInfo=templateInfo;// Setup compound storage, 2-way listeners, and dataHost for bindings
setupBindings(this,templateInfo);// Flush properties into template nodes if already booted
if(this.__dataReady){runEffects(this,templateInfo.propertyEffects,this.__data,null,!1,templateInfo.nodeList)}return dom}/**
       * Removes and unbinds the nodes previously contained in the provided
       * DocumentFragment returned from `_stampTemplate`.
       *
       * @override
       * @param {!StampedTemplate} dom DocumentFragment previously returned
       *   from `_stampTemplate` associated with the nodes to be removed
       * @return {void}
       * @protected
       */},{key:"_removeBoundDom",value:function _removeBoundDom(dom){// Unlink template info
var templateInfo=dom.templateInfo;if(templateInfo.previousTemplateInfo){templateInfo.previousTemplateInfo.nextTemplateInfo=templateInfo.nextTemplateInfo}if(templateInfo.nextTemplateInfo){templateInfo.nextTemplateInfo.previousTemplateInfo=templateInfo.previousTemplateInfo}if(this.__templateInfoLast==templateInfo){this.__templateInfoLast=templateInfo.previousTemplateInfo}templateInfo.previousTemplateInfo=templateInfo.nextTemplateInfo=null;// Remove stamped nodes
for(var nodes=templateInfo.childNodes,_i15=0,node;_i15<nodes.length;_i15++){node=nodes[_i15];node.parentNode.removeChild(node)}}/**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       * @nocollapse
       */},{key:"PROPERTY_EFFECT_TYPES",get:function get(){return TYPES}}],[{key:"addPropertyEffect",value:function addPropertyEffect(property,type,effect){this.prototype._addPropertyEffect(property,type,effect)}/**
       * Creates a single-property observer for the given property.
       *
       * @param {string} property Property name
       * @param {string|function(*,*)} method Function or name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"createPropertyObserver",value:function createPropertyObserver(property,method,dynamicFn){this.prototype._createPropertyObserver(property,method,dynamicFn)}/**
       * Creates a multi-property "method observer" based on the provided
       * expression, which should be a string in the form of a normal JavaScript
       * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
       * should correspond to a property or path in the context of this
       * prototype (or instance), or may be a literal string or number.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       * @return {void}
       *   whether method names should be included as a dependency to the effect.
       * @protected
       * @nocollapse
       */},{key:"createMethodObserver",value:function createMethodObserver(expression,dynamicFn){this.prototype._createMethodObserver(expression,dynamicFn)}/**
       * Causes the setter for the given property to dispatch `<property>-changed`
       * events to notify of changes to the property.
       *
       * @param {string} property Property name
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"createNotifyingProperty",value:function createNotifyingProperty(property){this.prototype._createNotifyingProperty(property)}/**
       * Creates a read-only accessor for the given property.
       *
       * To set the property, use the protected `_setProperty` API.
       * To create a custom protected setter (e.g. `_setMyProp()` for
       * property `myProp`), pass `true` for `protectedSetter`.
       *
       * Note, if the property will have other property effects, this method
       * should be called first, before adding other effects.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"createReadOnlyProperty",value:function createReadOnlyProperty(property,protectedSetter){this.prototype._createReadOnlyProperty(property,protectedSetter)}/**
       * Causes the setter for the given property to reflect the property value
       * to a (dash-cased) attribute of the same name.
       *
       * @param {string} property Property name
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"createReflectedProperty",value:function createReflectedProperty(property){this.prototype._createReflectedProperty(property)}/**
       * Creates a computed property whose value is set to the result of the
       * method described by the given `expression` each time one or more
       * arguments to the method changes.  The expression should be a string
       * in the form of a normal JavaScript function signature:
       * `'methodName(arg1, [..., argn])'`
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
       *   method names should be included as a dependency to the effect.
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"createComputedProperty",value:function createComputedProperty(property,expression,dynamicFn){this.prototype._createComputedProperty(property,expression,dynamicFn)}/**
       * Parses the provided template to ensure binding effects are created
       * for them, and then ensures property accessors are created for any
       * dependent properties in the template.  Binding effects for bound
       * templates are stored in a linked list on the instance so that
       * templates can be efficiently stamped and unstamped.
       *
       * @param {!HTMLTemplateElement} template Template containing binding
       *   bindings
       * @return {!TemplateInfo} Template metadata object
       * @protected
       * @nocollapse
       */},{key:"bindTemplate",value:function bindTemplate(template){return this.prototype._bindTemplate(template)}},{key:"_addTemplatePropertyEffect",value:function _addTemplatePropertyEffect(templateInfo,prop,effect){var hostProps=templateInfo.hostProps=templateInfo.hostProps||{};hostProps[prop]=!0;var effects=templateInfo.propertyEffects=templateInfo.propertyEffects||{},propEffects=effects[prop]=effects[prop]||[];propEffects.push(effect)}},{key:"_parseTemplateNode",value:function _parseTemplateNode(node,templateInfo,nodeInfo){// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
var noted=propertyEffectsBase._parseTemplateNode.call(this,node,templateInfo,nodeInfo);if(node.nodeType===Node.TEXT_NODE){var parts=this._parseBindings(node.textContent,templateInfo);if(parts){// Initialize the textContent with any literal parts
// NOTE: default to a space here so the textNode remains; some browsers
// (IE) omit an empty textNode following cloneNode/importNode.
node.textContent=literalFromParts(parts)||" ";addBinding(this,templateInfo,nodeInfo,"text","textContent",parts);noted=!0}}return noted}/**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from attributes.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       * @nocollapse
       */},{key:"_parseTemplateNodeAttribute",value:function _parseTemplateNodeAttribute(node,templateInfo,nodeInfo,name,value){var parts=this._parseBindings(value,templateInfo);if(parts){// Attribute or property
var origName=name,kind="property";// The only way we see a capital letter here is if the attr has
// a capital letter in it per spec. In this case, to make sure
// this binding works, we go ahead and make the binding to the attribute.
if(capitalAttributeRegex.test(name)){kind="attribute"}else if("$"==name[name.length-1]){name=name.slice(0,-1);kind="attribute"}// Initialize attribute bindings with any literal parts
var literal=literalFromParts(parts);if(literal&&"attribute"==kind){// Ensure a ShadyCSS template scoped style is not removed
// when a class$ binding's initial literal value is set.
if("class"==name&&node.hasAttribute("class")){literal+=" "+node.getAttribute(name)}node.setAttribute(name,literal)}// Clear attribute before removing, since IE won't allow removing
// `value` attribute if it previously had a value (can't
// unconditionally set '' before removing since attributes with `$`
// can't be set using setAttribute)
if("input"===node.localName&&"value"===origName){node.setAttribute(origName,"")}// Remove annotation
node.removeAttribute(origName);// Case hackery: attributes are lower-case, but bind targets
// (properties) are case sensitive. Gambit is to map dash-case to
// camel-case: `foo-bar` becomes `fooBar`.
// Attribute bindings are excepted.
if("property"===kind){name=dashToCamelCase(name)}addBinding(this,templateInfo,nodeInfo,kind,name,parts,literal);return!0}else{// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
return propertyEffectsBase._parseTemplateNodeAttribute.call(this,node,templateInfo,nodeInfo,name,value)}}/**
       * Overrides default `TemplateStamp` implementation to add support for
       * binding the properties that a nested template depends on to the template
       * as `_host_<property>`.
       *
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       * @nocollapse
       */},{key:"_parseTemplateNestedTemplate",value:function _parseTemplateNestedTemplate(node,templateInfo,nodeInfo){// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
var noted=propertyEffectsBase._parseTemplateNestedTemplate.call(this,node,templateInfo,nodeInfo),hostProps=nodeInfo.templateInfo.hostProps,mode="{";// Merge host props into outer template and add bindings
for(var source in hostProps){var parts=[{mode:mode,source:source,dependencies:[source]}];addBinding(this,templateInfo,nodeInfo,"property","_host_"+source,parts)}return noted}/**
       * Called to parse text in a template (either attribute values or
       * textContent) into binding metadata.
       *
       * Any overrides of this method should return an array of binding part
       * metadata  representing one or more bindings found in the provided text
       * and any "literal" text in between.  Any non-literal parts will be passed
       * to `_evaluateBinding` when any dependencies change.  The only required
       * fields of each "part" in the returned array are as follows:
       *
       * - `dependencies` - Array containing trigger metadata for each property
       *   that should trigger the binding to update
       * - `literal` - String containing text if the part represents a literal;
       *   in this case no `dependencies` are needed
       *
       * Additional metadata for use by `_evaluateBinding` may be provided in
       * each part object as needed.
       *
       * The default implementation handles the following types of bindings
       * (one or more may be intermixed with literal strings):
       * - Property binding: `[[prop]]`
       * - Path binding: `[[object.prop]]`
       * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
       * - Two-way property or path bindings (supports negation):
       *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
       * - Inline computed method (supports negation):
       *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
       *
       * The default implementation uses a regular expression for best
       * performance. However, the regular expression uses a white-list of
       * allowed characters in a data-binding, which causes problems for
       * data-bindings that do use characters not in this white-list.
       *
       * Instead of updating the white-list with all allowed characters,
       * there is a StrictBindingParser (see lib/mixins/strict-binding-parser)
       * that uses a state machine instead. This state machine is able to handle
       * all characters. However, it is slightly less performant, therefore we
       * extracted it into a separate optional mixin.
       *
       * @param {string} text Text to parse from attribute or textContent
       * @param {Object} templateInfo Current template metadata
       * @return {Array<!BindingPart>} Array of binding part metadata
       * @protected
       * @nocollapse
       */},{key:"_parseBindings",value:function _parseBindings(text,templateInfo){var parts=[],lastIndex=0,m;// Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
// Regex matches:
//        Iteration 1:  Iteration 2:
// m[1]: '{{'          '[['
// m[2]: ''            '!'
// m[3]: 'prop'        'compute(foo,bar)'
while(null!==(m=bindingRegex.exec(text))){// Add literal part
if(m.index>lastIndex){parts.push({literal:text.slice(lastIndex,m.index)})}// Add binding part
var mode=m[1][0],negate=!!m[2],source=m[3].trim(),customEvent=!1,notifyEvent="",colon=-1;if("{"==mode&&0<(colon=source.indexOf("::"))){notifyEvent=source.substring(colon+2);source=source.substring(0,colon);customEvent=!0}var signature=parseMethod(source),dependencies=[];if(signature){// Inline computed function
for(var args=signature.args,methodName=signature.methodName,_i16=0,arg;_i16<args.length;_i16++){arg=args[_i16];if(!arg.literal){dependencies.push(arg)}}var dynamicFns=templateInfo.dynamicFns;if(dynamicFns&&dynamicFns[methodName]||signature.static){dependencies.push(methodName);signature.dynamicFn=!0}}else{// Property or path
dependencies.push(source)}parts.push({source:source,mode:mode,negate:negate,customEvent:customEvent,signature:signature,dependencies:dependencies,event:notifyEvent});lastIndex=bindingRegex.lastIndex}// Add a final literal part
if(lastIndex&&lastIndex<text.length){var literal=text.substring(lastIndex);if(literal){parts.push({literal:literal})}}if(parts.length){return parts}else{return null}}/**
       * Called to evaluate a previously parsed binding part based on a set of
       * one or more changed dependencies.
       *
       * @param {!Polymer_PropertyEffects} inst Element that should be used as
       *     scope for binding dependencies
       * @param {BindingPart} part Binding part metadata
       * @param {string} path Property/path that triggered this effect
       * @param {Object} props Bag of current property changes
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @return {*} Value the binding part evaluated to
       * @protected
       * @nocollapse
       */},{key:"_evaluateBinding",value:function _evaluateBinding(inst,part,path,props,oldProps,hasPaths){var value;if(part.signature){value=runMethodEffect(inst,path,props,oldProps,part.signature)}else if(path!=part.source){value=_get(inst,part.source)}else{if(hasPaths&&isPath(path)){value=_get(inst,path)}else{value=inst.__data[path]}}if(part.negate){value=!value}return value}}]);return PropertyEffects}(propertyEffectsBase);/**
                                                                                * @polymer
                                                                                * @mixinClass
                                                                                * @implements {Polymer_PropertyEffects}
                                                                                * @extends {propertyEffectsBase}
                                                                                * @unrestricted
                                                                                */return PropertyEffects});/**
     * Helper api for enqueuing client dom created by a host element.
     *
     * By default elements are flushed via `_flushProperties` when
     * `connectedCallback` is called. Elements attach their client dom to
     * themselves at `ready` time which results from this first flush.
     * This provides an ordering guarantee that the client dom an element
     * creates is flushed before the element itself (i.e. client `ready`
     * fires before host `ready`).
     *
     * However, if `_flushProperties` is called *before* an element is connected,
     * as for example `Templatize` does, this ordering guarantee cannot be
     * satisfied because no elements are connected. (Note: Bound elements that
     * receive data do become enqueued clients and are properly ordered but
     * unbound elements are not.)
     *
     * To maintain the desired "client before host" ordering guarantee for this
     * case we rely on the "host stack. Client nodes registers themselves with
     * the creating host element when created. This ensures that all client dom
     * is readied in the proper order, maintaining the desired guarantee.
     *
     * @private
     */_exports.PropertyEffects=PropertyEffects;var HostStack=/*#__PURE__*/function(){function HostStack(){babelHelpers.classCallCheck(this,HostStack);this.stack=[]}/**
     * @param {*} inst Instance to add to hostStack
     * @return {void}
     */babelHelpers.createClass(HostStack,[{key:"registerHost",value:function registerHost(inst){if(this.stack.length){var host=this.stack[this.stack.length-1];host._enqueueClient(inst)}}/**
     * @param {*} inst Instance to begin hosting
     * @return {void}
     */},{key:"beginHosting",value:function beginHosting(inst){this.stack.push(inst)}/**
     * @param {*} inst Instance to end hosting
     * @return {void}
     */},{key:"endHosting",value:function endHosting(inst){var stackLen=this.stack.length;if(stackLen&&this.stack[stackLen-1]==inst){this.stack.pop()}}}]);return HostStack}(),hostStack=new HostStack,propertyEffects={PropertyEffects:PropertyEffects};_exports.$propertyEffects=propertyEffects;/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */ /**
       * Total number of Polymer element instances created.
       * @type {number}
       */var instanceCount=0;_exports.instanceCount=instanceCount;function incrementInstanceCount(){_exports.instanceCount=instanceCount=instanceCount+1}/**
   * Array of Polymer element classes that have been finalized.
   * @type {!Array<!PolymerElementConstructor>}
   */var registrations=[];/**
                                  * @param {!PolymerElementConstructor} prototype Element prototype to log
                                  * @private
                                  */_exports.registrations=registrations;function _regLog(prototype){console.log("["+/** @type {?} */prototype.is+"]: registered")}/**
   * Registers a class prototype for telemetry purposes.
   * @param {!PolymerElementConstructor} prototype Element prototype to register
   * @protected
   */function register(prototype){registrations.push(prototype)}/**
   * Logs all elements registered with an `is` to the console.
   * @public
   */function dumpRegistrations(){registrations.forEach(_regLog)}var telemetry={get instanceCount(){return instanceCount},incrementInstanceCount:incrementInstanceCount,registrations:registrations,register:register,dumpRegistrations:dumpRegistrations};_exports.$telemetry=telemetry;function normalizeProperties(props){var output={};for(var _p9 in props){var o=props[_p9];output[_p9]="function"===typeof o?{type:o}:o}return output}/**
   * Mixin that provides a minimal starting point to using the PropertiesChanged
   * mixin by providing a mechanism to declare properties in a static
   * getter (e.g. static get properties() { return { foo: String } }). Changes
   * are reported via the `_propertiesChanged` method.
   *
   * This mixin provides no specific support for rendering. Users are expected
   * to create a ShadowRoot and put content into it and update it in whatever
   * way makes sense. This can be done in reaction to properties changing by
   * implementing `_propertiesChanged`.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin PropertiesChanged
   * @summary Mixin that provides a minimal starting point for using
   * the PropertiesChanged mixin by providing a declarative `properties` object.
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */var PropertiesMixin=dedupingMixin(function(superClass){/**
   * @constructor
   * @implements {Polymer_PropertiesChanged}
   * @private
   */var base=PropertiesChanged(superClass);/**
                                                  * Returns the super class constructor for the given class, if it is an
                                                  * instance of the PropertiesMixin.
                                                  *
                                                  * @param {!PropertiesMixinConstructor} constructor PropertiesMixin constructor
                                                  * @return {?PropertiesMixinConstructor} Super class constructor
                                                  */function superPropertiesClass(constructor){var superCtor=Object.getPrototypeOf(constructor);// Note, the `PropertiesMixin` class below only refers to the class
// generated by this call to the mixin; the instanceof test only works
// because the mixin is deduped and guaranteed only to apply once, hence
// all constructors in a proto chain will see the same `PropertiesMixin`
return babelHelpers.instanceof(superCtor.prototype,PropertiesMixin)?/** @type {!PropertiesMixinConstructor} */superCtor:null}/**
     * Returns a memoized version of the `properties` object for the
     * given class. Properties not in object format are converted to at
     * least {type}.
     *
     * @param {PropertiesMixinConstructor} constructor PropertiesMixin constructor
     * @return {Object} Memoized properties object
     */function ownProperties(constructor){if(!constructor.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",constructor))){var _props=null;if(constructor.hasOwnProperty(JSCompiler_renameProperty("properties",constructor))){var properties=constructor.properties;if(properties){_props=normalizeProperties(properties)}}constructor.__ownProperties=_props}return constructor.__ownProperties}/**
     * @polymer
     * @mixinClass
     * @extends {base}
     * @implements {Polymer_PropertiesMixin}
     * @unrestricted
     */var PropertiesMixin=/*#__PURE__*/function(_base2){babelHelpers.inherits(PropertiesMixin,_base2);function PropertiesMixin(){babelHelpers.classCallCheck(this,PropertiesMixin);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(PropertiesMixin).apply(this,arguments))}babelHelpers.createClass(PropertiesMixin,[{key:"_initializeProperties",/**
       * Overrides `PropertiesChanged` method and adds a call to
       * `finalize` which lazily configures the element's property accessors.
       * @override
       * @return {void}
       */value:function _initializeProperties(){incrementInstanceCount();this.constructor.finalize();babelHelpers.get(babelHelpers.getPrototypeOf(PropertiesMixin.prototype),"_initializeProperties",this).call(this)}/**
       * Called when the element is added to a document.
       * Calls `_enableProperties` to turn on property system from
       * `PropertiesChanged`.
       * @suppress {missingProperties} Super may or may not implement the callback
       * @return {void}
       * @override
       */},{key:"connectedCallback",value:function connectedCallback(){if(babelHelpers.get(babelHelpers.getPrototypeOf(PropertiesMixin.prototype),"connectedCallback",this)){babelHelpers.get(babelHelpers.getPrototypeOf(PropertiesMixin.prototype),"connectedCallback",this).call(this)}this._enableProperties()}/**
       * Called when the element is removed from a document
       * @suppress {missingProperties} Super may or may not implement the callback
       * @return {void}
       * @override
       */},{key:"disconnectedCallback",value:function disconnectedCallback(){if(babelHelpers.get(babelHelpers.getPrototypeOf(PropertiesMixin.prototype),"disconnectedCallback",this)){babelHelpers.get(babelHelpers.getPrototypeOf(PropertiesMixin.prototype),"disconnectedCallback",this).call(this)}}}],[{key:"finalize",/**
       * Finalizes an element definition, including ensuring any super classes
       * are also finalized. This includes ensuring property
       * accessors exist on the element prototype. This method calls
       * `_finalizeClass` to finalize each constructor in the prototype chain.
       * @return {void}
       * @nocollapse
       */value:function finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){var superCtor=superPropertiesClass(/** @type {!PropertiesMixinConstructor} */this);if(superCtor){superCtor.finalize()}this.__finalized=!0;this._finalizeClass()}}/**
       * Finalize an element class. This includes ensuring property
       * accessors exist on the element prototype. This method is called by
       * `finalize` and finalizes the class constructor.
       *
       * @protected
       * @nocollapse
       */},{key:"_finalizeClass",value:function _finalizeClass(){var props=ownProperties(/** @type {!PropertiesMixinConstructor} */this);if(props){/** @type {?} */this.createProperties(props)}}/**
       * Returns a memoized version of all properties, including those inherited
       * from super classes. Properties not in object format are converted to
       * at least {type}.
       *
       * @return {Object} Object containing properties for this class
       * @protected
       * @nocollapse
       */},{key:"typeForProperty",/**
       * Overrides `PropertiesChanged` method to return type specified in the
       * static `properties` object for the given property.
       * @param {string} name Name of property
       * @return {*} Type to which to deserialize attribute
       *
       * @protected
       * @nocollapse
       */value:function typeForProperty(name){var info=this._properties[name];return info&&info.type}},{key:"observedAttributes",/**
     * Implements standard custom elements getter to observes the attributes
     * listed in `properties`.
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */get:function get(){var _this10=this;if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){register(this.prototype);var _props2=this._properties;this.__observedAttributes=_props2?Object.keys(_props2).map(function(p){return _this10.attributeNameForProperty(p)}):[]}return this.__observedAttributes}},{key:"_properties",get:function get(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){var superCtor=superPropertiesClass(/** @type {!PropertiesMixinConstructor} */this);this.__properties=Object.assign({},superCtor&&superCtor._properties,ownProperties(/** @type {PropertiesMixinConstructor} */this))}return this.__properties}}]);return PropertiesMixin}(base);return PropertiesMixin});_exports.PropertiesMixin=PropertiesMixin;var propertiesMixin={PropertiesMixin:PropertiesMixin};_exports.$propertiesMixin=propertiesMixin;var bundledImportMeta=_objectSpread({},meta,{url:new URL("../node_modules/%40polymer/polymer/lib/mixins/element-mixin.js",meta.url).href}),version="3.3.1";_exports.version$1=_exports.version=version;var builtCSS=window.ShadyCSS&&window.ShadyCSS.cssBuild,ElementMixin=dedupingMixin(function(base){/**
   * @constructor
   * @implements {Polymer_PropertyEffects}
   * @implements {Polymer_PropertiesMixin}
   * @extends {HTMLElement}
   * @private
   */var polymerElementBase=PropertiesMixin(PropertyEffects(base));/**
                                                                         * Returns a list of properties with default values.
                                                                         * This list is created as an optimization since it is a subset of
                                                                         * the list returned from `_properties`.
                                                                         * This list is used in `_initializeProperties` to set property defaults.
                                                                         *
                                                                         * @param {PolymerElementConstructor} constructor Element class
                                                                         * @return {PolymerElementProperties} Flattened properties for this class
                                                                         *   that have default values
                                                                         * @private
                                                                         */function propertyDefaults(constructor){if(!constructor.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",constructor))){constructor.__propertyDefaults=null;var _props3=constructor._properties;for(var _p10 in _props3){var info=_props3[_p10];if("value"in info){constructor.__propertyDefaults=constructor.__propertyDefaults||{};constructor.__propertyDefaults[_p10]=info}}}return constructor.__propertyDefaults}/**
     * Returns a memoized version of the `observers` array.
     * @param {PolymerElementConstructor} constructor Element class
     * @return {Array} Array containing own observers for the given class
     * @protected
     */function ownObservers(constructor){if(!constructor.hasOwnProperty(JSCompiler_renameProperty("__ownObservers",constructor))){constructor.__ownObservers=constructor.hasOwnProperty(JSCompiler_renameProperty("observers",constructor))?/** @type {PolymerElementConstructor} */constructor.observers:null}return constructor.__ownObservers}/**
     * Creates effects for a property.
     *
     * Note, once a property has been set to
     * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
     * these values may not be changed. For example, a subclass cannot
     * alter these settings. However, additional `observers` may be added
     * by subclasses.
     *
     * The info object should contain property metadata as follows:
     *
     * * `type`: {function} type to which an attribute matching the property
     * is deserialized. Note the property is camel-cased from a dash-cased
     * attribute. For example, 'foo-bar' attribute is deserialized to a
     * property named 'fooBar'.
     *
     * * `readOnly`: {boolean} creates a readOnly property and
     * makes a private setter for the private of the form '_setFoo' for a
     * property 'foo',
     *
     * * `computed`: {string} creates a computed property. A computed property
     * is also automatically set to `readOnly: true`. The value is calculated
     * by running a method and arguments parsed from the given string. For
     * example 'compute(foo)' will compute a given property when the
     * 'foo' property changes by executing the 'compute' method. This method
     * must return the computed value.
     *
     * * `reflectToAttribute`: {boolean} If true, the property value is reflected
     * to an attribute of the same name. Note, the attribute is dash-cased
     * so a property named 'fooBar' is reflected as 'foo-bar'.
     *
     * * `notify`: {boolean} sends a non-bubbling notification event when
     * the property changes. For example, a property named 'foo' sends an
     * event named 'foo-changed' with `event.detail` set to the value of
     * the property.
     *
     * * observer: {string} name of a method that runs when the property
     * changes. The arguments of the method are (value, previousValue).
     *
     * Note: Users may want control over modifying property
     * effects via subclassing. For example, a user might want to make a
     * reflectToAttribute property not do so in a subclass. We've chosen to
     * disable this because it leads to additional complication.
     * For example, a readOnly effect generates a special setter. If a subclass
     * disables the effect, the setter would fail unexpectedly.
     * Based on feedback, we may want to try to make effects more malleable
     * and/or provide an advanced api for manipulating them.
     *
     * @param {!PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {string} name Name of the property.
     * @param {Object} info Info object from which to create property effects.
     * Supported keys:
     * @param {Object} allProps Flattened map of all properties defined in this
     *   element (including inherited properties)
     * @return {void}
     * @private
     */function createPropertyFromConfig(proto,name,info,allProps){// computed forces readOnly...
if(info.computed){info.readOnly=!0}// Note, since all computed properties are readOnly, this prevents
// adding additional computed property effects (which leads to a confusing
// setup where multiple triggers for setting a property)
// While we do have `hasComputedEffect` this is set on the property's
// dependencies rather than itself.
if(info.computed){if(proto._hasReadOnlyEffect(name)){console.warn("Cannot redefine computed property '".concat(name,"'."))}else{proto._createComputedProperty(name,info.computed,allProps)}}if(info.readOnly&&!proto._hasReadOnlyEffect(name)){proto._createReadOnlyProperty(name,!info.computed)}else if(!1===info.readOnly&&proto._hasReadOnlyEffect(name)){console.warn("Cannot make readOnly property '".concat(name,"' non-readOnly."))}if(info.reflectToAttribute&&!proto._hasReflectEffect(name)){proto._createReflectedProperty(name)}else if(!1===info.reflectToAttribute&&proto._hasReflectEffect(name)){console.warn("Cannot make reflected property '".concat(name,"' non-reflected."))}if(info.notify&&!proto._hasNotifyEffect(name)){proto._createNotifyingProperty(name)}else if(!1===info.notify&&proto._hasNotifyEffect(name)){console.warn("Cannot make notify property '".concat(name,"' non-notify."))}// always add observer
if(info.observer){proto._createPropertyObserver(name,info.observer,allProps[info.observer])}// always create the mapping from attribute back to property for deserialization.
proto._addPropertyToAttributeMap(name)}/**
     * Process all style elements in the element template. Styles with the
     * `include` attribute are processed such that any styles in
     * the associated "style modules" are included in the element template.
     * @param {PolymerElementConstructor} klass Element class
     * @param {!HTMLTemplateElement} template Template to process
     * @param {string} is Name of element
     * @param {string} baseURI Base URI for element
     * @private
     */function processElementStyles(klass,template,is,baseURI){if(!builtCSS){for(var templateStyles=template.content.querySelectorAll("style"),stylesWithImports=stylesFromTemplate(template),linkedStyles=stylesFromModuleImports(is),firstTemplateChild=template.content.firstElementChild,idx=0,s;idx<linkedStyles.length;idx++){s=linkedStyles[idx];s.textContent=klass._processStyleText(s.textContent,baseURI);template.content.insertBefore(s,firstTemplateChild)}// keep track of the last "concrete" style in the template we have encountered
// ensure all gathered styles are actually in this template.
for(var templateStyleIndex=0,_i17=0;_i17<stylesWithImports.length;_i17++){var _s=stylesWithImports[_i17],templateStyle=templateStyles[templateStyleIndex];// if the style is not in this template, it's been "included" and
// we put a clone of it in the template before the style that included it
if(templateStyle!==_s){_s=_s.cloneNode(!0);templateStyle.parentNode.insertBefore(_s,templateStyle)}else{templateStyleIndex++}_s.textContent=klass._processStyleText(_s.textContent,baseURI)}}if(window.ShadyCSS){window.ShadyCSS.prepareTemplate(template,is)}}/**
     * Look up template from dom-module for element
     *
     * @param {string} is Element name to look up
     * @return {?HTMLTemplateElement|undefined} Template found in dom module, or
     *   undefined if not found
     * @protected
     */function getTemplateFromDomModule(is){var template=null;// Under strictTemplatePolicy in 3.x+, dom-module lookup is only allowed
// when opted-in via allowTemplateFromDomModule
if(is&&(!strictTemplatePolicy||allowTemplateFromDomModule)){template=/** @type {?HTMLTemplateElement} */DomModule.import(is,"template");// Under strictTemplatePolicy, require any element with an `is`
// specified to have a dom-module
if(strictTemplatePolicy&&!template){throw new Error("strictTemplatePolicy: expecting dom-module or null template for ".concat(is))}}return template}/**
     * @polymer
     * @mixinClass
     * @unrestricted
     * @implements {Polymer_ElementMixin}
     * @extends {polymerElementBase}
     */var PolymerElement=/*#__PURE__*/function(_polymerElementBase){babelHelpers.inherits(PolymerElement,_polymerElementBase);babelHelpers.createClass(PolymerElement,null,[{key:"_finalizeClass",/**
       * Override of PropertiesMixin _finalizeClass to create observers and
       * find the template.
       * @return {void}
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       * @nocollapse
       */value:function _finalizeClass(){// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
polymerElementBase._finalizeClass.call(this);var observers=ownObservers(this);if(observers){this.createObservers(observers,this._properties)}this._prepareTemplate()}/** @nocollapse */},{key:"_prepareTemplate",value:function _prepareTemplate(){// note: create "working" template that is finalized at instance time
var template=/** @type {PolymerElementConstructor} */this.template;if(template){if("string"===typeof template){console.error("template getter must return HTMLTemplateElement");template=null}else if(!legacyOptimizations){template=template.cloneNode(!0)}}/** @override */this.prototype._template=template}/**
       * Override of PropertiesChanged createProperties to create accessors
       * and property effects for all of the properties.
       * @param {!Object} props .
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"createProperties",value:function createProperties(props){for(var _p11 in props){createPropertyFromConfig(/** @type {?} */this.prototype,_p11,props[_p11],props)}}/**
       * Creates observers for the given `observers` array.
       * Leverages `PropertyEffects` to create observers.
       * @param {Object} observers Array of observer descriptors for
       *   this class
       * @param {Object} dynamicFns Object containing keys for any properties
       *   that are functions and should trigger the effect when the function
       *   reference is changed
       * @return {void}
       * @protected
       * @nocollapse
       */},{key:"createObservers",value:function createObservers(observers,dynamicFns){for(var proto=this.prototype,_i18=0;_i18<observers.length;_i18++){proto._createMethodObserver(observers[_i18],dynamicFns)}}/**
       * Returns the template that will be stamped into this element's shadow root.
       *
       * If a `static get is()` getter is defined, the default implementation
       * will return the first `<template>` in a `dom-module` whose `id`
       * matches this element's `is`.
       *
       * Users may override this getter to return an arbitrary template
       * (in which case the `is` getter is unnecessary). The template returned
       * must be an `HTMLTemplateElement`.
       *
       * Note that when subclassing, if the super class overrode the default
       * implementation and the subclass would like to provide an alternate
       * template via a `dom-module`, it should override this getter and
       * return `DomModule.import(this.is, 'template')`.
       *
       * If a subclass would like to modify the super class template, it should
       * clone it rather than modify it in place.  If the getter does expensive
       * work such as cloning/modifying a template, it should memoize the
       * template for maximum performance:
       *
       *   let memoizedTemplate;
       *   class MySubClass extends MySuperClass {
       *     static get template() {
       *       if (!memoizedTemplate) {
       *         memoizedTemplate = super.template.cloneNode(true);
       *         let subContent = document.createElement('div');
       *         subContent.textContent = 'This came from MySubClass';
       *         memoizedTemplate.content.appendChild(subContent);
       *       }
       *       return memoizedTemplate;
       *     }
       *   }
       *
       * @return {!HTMLTemplateElement|string} Template to be stamped
       * @nocollapse
       */},{key:"polymerElementVersion",/**
     * Current Polymer version in Semver notation.
     * @type {string} Semver notation of the current version of Polymer.
     * @nocollapse
     */get:function get(){return version}},{key:"template",get:function get(){// Explanation of template-related properties:
// - constructor.template (this getter): the template for the class.
//     This can come from the prototype (for legacy elements), from a
//     dom-module, or from the super class's template (or can be overridden
//     altogether by the user)
// - constructor._template: memoized version of constructor.template
// - prototype._template: working template for the element, which will be
//     parsed and modified in place. It is a cloned version of
//     constructor.template, saved in _finalizeClass(). Note that before
//     this getter is called, for legacy elements this could be from a
//     _template field on the info object passed to Polymer(), a behavior,
//     or set in registered(); once the static getter runs, a clone of it
//     will overwrite it on the prototype as the working template.
if(!this.hasOwnProperty(JSCompiler_renameProperty("_template",this))){this._template=// If user has put template on prototype (e.g. in legacy via registered
// callback or info object), prefer that first
this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:// Look in dom-module associated with this element's is
getTemplateFromDomModule(/** @type {PolymerElementConstructor}*/this.is)||// Next look for superclass template (call the super impl this
// way so that `this` points to the superclass)
Object.getPrototypeOf(/** @type {PolymerElementConstructor}*/this.prototype).constructor.template}return this._template}/**
       * Set the template.
       *
       * @param {!HTMLTemplateElement|string} value Template to set.
       * @nocollapse
       */,set:function set(value){this._template=value}/**
       * Path matching the url from which the element was imported.
       *
       * This path is used to resolve url's in template style cssText.
       * The `importPath` property is also set on element instances and can be
       * used to create bindings relative to the import path.
       *
       * For elements defined in ES modules, users should implement
       * `static get importMeta() { return import.meta; }`, and the default
       * implementation of `importPath` will  return `import.meta.url`'s path.
       * For elements defined in HTML imports, this getter will return the path
       * to the document containing a `dom-module` element matching this
       * element's static `is` property.
       *
       * Note, this path should contain a trailing `/`.
       *
       * @return {string} The import path for this element class
       * @suppress {missingProperties}
       * @nocollapse
       */},{key:"importPath",get:function get(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){var meta=this.importMeta;if(meta){this._importPath=pathFromUrl(meta.url)}else{var module=DomModule.import(/** @type {PolymerElementConstructor} */this.is);this._importPath=module&&module.assetpath||Object.getPrototypeOf(/** @type {PolymerElementConstructor}*/this.prototype).constructor.importPath}}return this._importPath}}]);function PolymerElement(){var _this11;babelHelpers.classCallCheck(this,PolymerElement);_this11=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(PolymerElement).call(this));/** @type {HTMLTemplateElement} */_this11._template;/** @type {string} */_this11._importPath;/** @type {string} */_this11.rootPath;/** @type {string} */_this11.importPath;/** @type {StampedTemplate | HTMLElement | ShadowRoot} */_this11.root;/** @type {!Object<string, !Element>} */_this11.$;return _this11}/**
       * Overrides the default `PropertyAccessors` to ensure class
       * metaprogramming related to property accessors and effects has
       * completed (calls `finalize`).
       *
       * It also initializes any property defaults provided via `value` in
       * `properties` metadata.
       *
       * @return {void}
       * @override
       * @suppress {invalidCasts,missingProperties} go/missingfnprops
       */babelHelpers.createClass(PolymerElement,[{key:"_initializeProperties",value:function _initializeProperties(){this.constructor.finalize();// note: finalize template when we have access to `localName` to
// avoid dependence on `is` for polyfilling styling.
this.constructor._finalizeTemplate(/** @type {!HTMLElement} */this.localName);babelHelpers.get(babelHelpers.getPrototypeOf(PolymerElement.prototype),"_initializeProperties",this).call(this);// set path defaults
this.rootPath=rootPath;this.importPath=this.constructor.importPath;// apply property defaults...
var p$=propertyDefaults(this.constructor);if(!p$){return}for(var _p12 in p$){var info=p$[_p12];// Don't set default value if there is already an own property, which
// happens when a `properties` property with default but no effects had
// a property set (e.g. bound) by its host before upgrade
if(!this.hasOwnProperty(_p12)){var value="function"==typeof info.value?info.value.call(this):info.value;// Set via `_setProperty` if there is an accessor, to enable
// initializing readOnly property defaults
if(this._hasAccessor(_p12)){this._setPendingProperty(_p12,value,!0)}else{this[_p12]=value}}}}/**
       * Gather style text for a style element in the template.
       *
       * @param {string} cssText Text containing styling to process
       * @param {string} baseURI Base URI to rebase CSS paths against
       * @return {string} The processed CSS text
       * @protected
       * @nocollapse
       */},{key:"connectedCallback",/**
       * Provides a default implementation of the standard Custom Elements
       * `connectedCallback`.
       *
       * The default implementation enables the property effects system and
       * flushes any pending properties, and updates shimmed CSS properties
       * when using the ShadyCSS scoping/custom properties polyfill.
       *
       * @override
       * @suppress {missingProperties, invalidCasts} Super may or may not
       *     implement the callback
       * @return {void}
       */value:function connectedCallback(){if(window.ShadyCSS&&this._template){window.ShadyCSS.styleElement(/** @type {!HTMLElement} */this)}babelHelpers.get(babelHelpers.getPrototypeOf(PolymerElement.prototype),"connectedCallback",this).call(this)}/**
       * Stamps the element template.
       *
       * @return {void}
       * @override
       */},{key:"ready",value:function ready(){if(this._template){this.root=this._stampTemplate(this._template);this.$=this.root.$}babelHelpers.get(babelHelpers.getPrototypeOf(PolymerElement.prototype),"ready",this).call(this)}/**
       * Implements `PropertyEffects`'s `_readyClients` call. Attaches
       * element dom by calling `_attachDom` with the dom stamped from the
       * element's template via `_stampTemplate`. Note that this allows
       * client dom to be attached to the element prior to any observers
       * running.
       *
       * @return {void}
       * @override
       */},{key:"_readyClients",value:function _readyClients(){if(this._template){this.root=this._attachDom(/** @type {StampedTemplate} */this.root)}// The super._readyClients here sets the clients initialized flag.
// We must wait to do this until after client dom is created/attached
// so that this flag can be checked to prevent notifications fired
// during this process from being handled before clients are ready.
babelHelpers.get(babelHelpers.getPrototypeOf(PolymerElement.prototype),"_readyClients",this).call(this)}/**
       * Attaches an element's stamped dom to itself. By default,
       * this method creates a `shadowRoot` and adds the dom to it.
       * However, this method may be overridden to allow an element
       * to put its dom in another location.
       *
       * @override
       * @throws {Error}
       * @suppress {missingReturn}
       * @param {StampedTemplate} dom to attach to the element.
       * @return {ShadowRoot} node to which the dom has been attached.
       */},{key:"_attachDom",value:function _attachDom(dom){var n=wrap$1(this);if(n.attachShadow){if(dom){if(!n.shadowRoot){n.attachShadow({mode:"open",shadyUpgradeFragment:dom});n.shadowRoot.appendChild(dom)}if(syncInitialRender&&window.ShadyDOM){window.ShadyDOM.flushInitial(n.shadowRoot)}return n.shadowRoot}return null}else{throw new Error("ShadowDOM not available. "+// TODO(sorvell): move to compile-time conditional when supported
"PolymerElement can create dom as children instead of in "+"ShadowDOM by setting `this.root = this;` before `ready`.")}}/**
       * When using the ShadyCSS scoping and custom property shim, causes all
       * shimmed styles in this element (and its subtree) to be updated
       * based on current custom property values.
       *
       * The optional parameter overrides inline custom property styles with an
       * object of properties where the keys are CSS properties, and the values
       * are strings.
       *
       * Example: `this.updateStyles({'--color': 'blue'})`
       *
       * These properties are retained unless a value of `null` is set.
       *
       * Note: This function does not support updating CSS mixins.
       * You can not dynamically change the value of an `@apply`.
       *
       * @override
       * @param {Object=} properties Bag of custom property key/values to
       *   apply to this element.
       * @return {void}
       * @suppress {invalidCasts}
       */},{key:"updateStyles",value:function updateStyles(properties){if(window.ShadyCSS){window.ShadyCSS.styleSubtree(/** @type {!HTMLElement} */this,properties)}}/**
       * Rewrites a given URL relative to a base URL. The base URL defaults to
       * the original location of the document containing the `dom-module` for
       * this element. This method will return the same URL before and after
       * bundling.
       *
       * Note that this function performs no resolution for URLs that start
       * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
       * URL resolution, use `window.URL`.
       *
       * @override
       * @param {string} url URL to resolve.
       * @param {string=} base Optional base URL to resolve against, defaults
       * to the element's `importPath`
       * @return {string} Rewritten URL relative to base
       */},{key:"resolveUrl",value:function resolveUrl(url,base){if(!base&&this.importPath){base=_resolveUrl(this.importPath)}return _resolveUrl(url,base)}/**
       * Overrides `PropertyEffects` to add map of dynamic functions on
       * template info, for consumption by `PropertyEffects` template binding
       * code. This map determines which method templates should have accessors
       * created for them.
       *
       * @param {!HTMLTemplateElement} template Template
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} .
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       * @nocollapse
       */}],[{key:"_processStyleText",value:function _processStyleText(cssText,baseURI){return resolveCss(cssText,baseURI)}/**
      * Configures an element `proto` to function with a given `template`.
      * The element name `is` and extends `ext` must be specified for ShadyCSS
      * style scoping.
      *
      * @param {string} is Tag name (or type extension name) for this element
      * @return {void}
      * @protected
      * @nocollapse
      */},{key:"_finalizeTemplate",value:function _finalizeTemplate(is){/** @const {HTMLTemplateElement} */var template=this.prototype._template;if(template&&!template.__polymerFinalized){template.__polymerFinalized=!0;var importPath=this.importPath,baseURI=importPath?_resolveUrl(importPath):"";// e.g. support `include="module-name"`, and ShadyCSS
processElementStyles(this,template,is,baseURI);this.prototype._bindTemplate(template)}}},{key:"_parseTemplateContent",value:function _parseTemplateContent(template,templateInfo,nodeInfo){templateInfo.dynamicFns=templateInfo.dynamicFns||this._properties;// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
return polymerElementBase._parseTemplateContent.call(this,template,templateInfo,nodeInfo)}/**
       * Overrides `PropertyEffects` to warn on use of undeclared properties in
       * template.
       *
       * @param {Object} templateInfo Template metadata to add effect to
       * @param {string} prop Property that should trigger the effect
       * @param {Object=} effect Effect metadata object
       * @return {void}
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       * @nocollapse
       */},{key:"_addTemplatePropertyEffect",value:function _addTemplatePropertyEffect(templateInfo,prop,effect){// Warn if properties are used in template without being declared.
// Properties must be listed in `properties` to be included in
// `observedAttributes` since CE V1 reads that at registration time, and
// since we want to keep template parsing lazy, we can't automatically
// add undeclared properties used in templates to `observedAttributes`.
// The warning is only enabled in `legacyOptimizations` mode, since
// we don't want to spam existing users who might have adopted the
// shorthand when attribute deserialization is not important.
if(legacyOptimizations&&!(prop in this._properties)){console.warn("Property '".concat(prop,"' used in template but not declared in 'properties'; ")+"attribute will not be observed.")}// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
return polymerElementBase._addTemplatePropertyEffect.call(this,templateInfo,prop,effect)}}]);return PolymerElement}(polymerElementBase);return PolymerElement});/**
                                                                  * Element class mixin that provides the core API for Polymer's meta-programming
                                                                  * features including template stamping, data-binding, attribute deserialization,
                                                                  * and property change observation.
                                                                  *
                                                                  * Subclassers may provide the following static getters to return metadata
                                                                  * used to configure Polymer's features for the class:
                                                                  *
                                                                  * - `static get is()`: When the template is provided via a `dom-module`,
                                                                  *   users should return the `dom-module` id from a static `is` getter.  If
                                                                  *   no template is needed or the template is provided directly via the
                                                                  *   `template` getter, there is no need to define `is` for the element.
                                                                  *
                                                                  * - `static get template()`: Users may provide the template directly (as
                                                                  *   opposed to via `dom-module`) by implementing a static `template` getter.
                                                                  *   The getter must return an `HTMLTemplateElement`.
                                                                  *
                                                                  * - `static get properties()`: Should return an object describing
                                                                  *   property-related metadata used by Polymer features (key: property name
                                                                  *   value: object containing property metadata). Valid keys in per-property
                                                                  *   metadata include:
                                                                  *   - `type` (String|Number|Object|Array|...): Used by
                                                                  *     `attributeChangedCallback` to determine how string-based attributes
                                                                  *     are deserialized to JavaScript property values.
                                                                  *   - `notify` (boolean): Causes a change in the property to fire a
                                                                  *     non-bubbling event called `<property>-changed`. Elements that have
                                                                  *     enabled two-way binding to the property use this event to observe changes.
                                                                  *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
                                                                  *     To set a read-only property, use the private setter method
                                                                  *     `_setProperty(property, value)`.
                                                                  *   - `observer` (string): Observer method name that will be called when
                                                                  *     the property changes. The arguments of the method are
                                                                  *     `(value, previousValue)`.
                                                                  *   - `computed` (string): String describing method and dependent properties
                                                                  *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
                                                                  *     Computed properties are read-only by default and can only be changed
                                                                  *     via the return value of the computing method.
                                                                  *
                                                                  * - `static get observers()`: Array of strings describing multi-property
                                                                  *   observer methods and their dependent properties (e.g.
                                                                  *   `'observeABC(a, b, c)'`).
                                                                  *
                                                                  * The base class provides default implementations for the following standard
                                                                  * custom element lifecycle callbacks; users may override these, but should
                                                                  * call the super method to ensure
                                                                  * - `constructor`: Run when the element is created or upgraded
                                                                  * - `connectedCallback`: Run each time the element is connected to the
                                                                  *   document
                                                                  * - `disconnectedCallback`: Run each time the element is disconnected from
                                                                  *   the document
                                                                  * - `attributeChangedCallback`: Run each time an attribute in
                                                                  *   `observedAttributes` is set or removed (note: this element's default
                                                                  *   `observedAttributes` implementation will automatically return an array
                                                                  *   of dash-cased attributes based on `properties`)
                                                                  *
                                                                  * @mixinFunction
                                                                  * @polymer
                                                                  * @appliesMixin PropertyEffects
                                                                  * @appliesMixin PropertiesMixin
                                                                  * @property rootPath {string} Set to the value of `rootPath`,
                                                                  *   which defaults to the main document path
                                                                  * @property importPath {string} Set to the value of the class's static
                                                                  *   `importPath` property, which defaults to the path of this element's
                                                                  *   `dom-module` (when `is` is used), but can be overridden for other
                                                                  *   import strategies.
                                                                  * @summary Element class mixin that provides the core API for Polymer's
                                                                  * meta-programming features.
                                                                  * @template T
                                                                  * @param {function(new:T)} superClass Class to apply mixin to.
                                                                  * @return {function(new:T)} superClass with mixin applied.
                                                                  */_exports.ElementMixin=ElementMixin;/**
     * When using the ShadyCSS scoping and custom property shim, causes all
     * shimmed `styles` (via `custom-style`) in the document (and its subtree)
     * to be updated based on current custom property values.
     *
     * The optional parameter overrides inline custom property styles with an
     * object of properties where the keys are CSS properties, and the values
     * are strings.
     *
     * Example: `updateStyles({'--color': 'blue'})`
     *
     * These properties are retained unless a value of `null` is set.
     *
     * @param {Object=} props Bag of custom property key/values to
     *   apply to the document.
     * @return {void}
     */var updateStyles=function updateStyles(props){if(window.ShadyCSS){window.ShadyCSS.styleDocument(props)}};_exports.updateStyles=updateStyles;var elementMixin={version:version,ElementMixin:ElementMixin,updateStyles:updateStyles};_exports.$elementMixin=elementMixin;var Debouncer=/*#__PURE__*/function(){function Debouncer(){babelHelpers.classCallCheck(this,Debouncer);this._asyncModule=null;this._callback=null;this._timer=null}/**
     * Sets the scheduler; that is, a module with the Async interface,
     * a callback and optional arguments to be passed to the run function
     * from the async module.
     *
     * @param {!AsyncInterface} asyncModule Object with Async interface.
     * @param {function()} callback Callback to run.
     * @return {void}
     */babelHelpers.createClass(Debouncer,[{key:"setConfig",value:function setConfig(asyncModule,callback){var _this12=this;this._asyncModule=asyncModule;this._callback=callback;this._timer=this._asyncModule.run(function(){_this12._timer=null;debouncerQueue.delete(_this12);_this12._callback()})}/**
     * Cancels an active debouncer and returns a reference to itself.
     *
     * @return {void}
     */},{key:"cancel",value:function cancel(){if(this.isActive()){this._cancelAsync();// Canceling a debouncer removes its spot from the flush queue,
// so if a debouncer is manually canceled and re-debounced, it
// will reset its flush order (this is a very minor difference from 1.x)
// Re-debouncing via the `debounce` API retains the 1.x FIFO flush order
debouncerQueue.delete(this)}}/**
     * Cancels a debouncer's async callback.
     *
     * @return {void}
     */},{key:"_cancelAsync",value:function _cancelAsync(){if(this.isActive()){this._asyncModule.cancel(/** @type {number} */this._timer);this._timer=null}}/**
     * Flushes an active debouncer and returns a reference to itself.
     *
     * @return {void}
     */},{key:"flush",value:function flush(){if(this.isActive()){this.cancel();this._callback()}}/**
     * Returns true if the debouncer is active.
     *
     * @return {boolean} True if active.
     */},{key:"isActive",value:function isActive(){return null!=this._timer}/**
     * Creates a debouncer if no debouncer is passed as a parameter
     * or it cancels an active debouncer otherwise. The following
     * example shows how a debouncer can be called multiple times within a
     * microtask and "debounced" such that the provided callback function is
     * called once. Add this method to a custom element:
     *
     * ```js
     * import {microTask} from '@polymer/polymer/lib/utils/async.js';
     * import {Debouncer} from '@polymer/polymer/lib/utils/debounce.js';
     * // ...
     *
     * _debounceWork() {
     *   this._debounceJob = Debouncer.debounce(this._debounceJob,
     *       microTask, () => this._doWork());
     * }
     * ```
     *
     * If the `_debounceWork` method is called multiple times within the same
     * microtask, the `_doWork` function will be called only once at the next
     * microtask checkpoint.
     *
     * Note: In testing it is often convenient to avoid asynchrony. To accomplish
     * this with a debouncer, you can use `enqueueDebouncer` and
     * `flush`. For example, extend the above example by adding
     * `enqueueDebouncer(this._debounceJob)` at the end of the
     * `_debounceWork` method. Then in a test, call `flush` to ensure
     * the debouncer has completed.
     *
     * @param {Debouncer?} debouncer Debouncer object.
     * @param {!AsyncInterface} asyncModule Object with Async interface
     * @param {function()} callback Callback to run.
     * @return {!Debouncer} Returns a debouncer object.
     */}],[{key:"debounce",value:function debounce(debouncer,asyncModule,callback){if(babelHelpers.instanceof(debouncer,Debouncer)){// Cancel the async callback, but leave in debouncerQueue if it was
// enqueued, to maintain 1.x flush order
debouncer._cancelAsync()}else{debouncer=new Debouncer}debouncer.setConfig(asyncModule,callback);return debouncer}}]);return Debouncer}();_exports.Debouncer=Debouncer;var debouncerQueue=new Set,enqueueDebouncer=function enqueueDebouncer(debouncer){debouncerQueue.add(debouncer)};/**
                                 * Adds a `Debouncer` to a list of globally flushable tasks.
                                 *
                                 * @param {!Debouncer} debouncer Debouncer to enqueue
                                 * @return {void}
                                 */_exports.enqueueDebouncer$1=_exports.enqueueDebouncer=_exports.addDebouncer=enqueueDebouncer;/**
    * Flushes any enqueued debouncers
    *
    * @return {boolean} Returns whether any debouncers were flushed
    */var flushDebouncers=function flushDebouncers(){var didFlush=!!debouncerQueue.size;// If new debouncers are added while flushing, Set.forEach will ensure
// newly added ones are also flushed
debouncerQueue.forEach(function(debouncer){try{debouncer.flush()}catch(e){setTimeout(function(){throw e})}});return didFlush};_exports.flushDebouncers=flushDebouncers;var debounce={Debouncer:Debouncer,enqueueDebouncer:enqueueDebouncer,flushDebouncers:flushDebouncers};_exports.$debounce=debounce;var HAS_NATIVE_TA="string"===typeof document.head.style.touchAction,GESTURE_KEY="__polymerGestures",HANDLED_OBJ="__polymerGesturesHandled",TOUCH_ACTION="__polymerGesturesTouchAction",TAP_DISTANCE=25,TRACK_DISTANCE=5,TRACK_LENGTH=2,MOUSE_TIMEOUT=2500,MOUSE_EVENTS=["mousedown","mousemove","mouseup","click"],MOUSE_WHICH_TO_BUTTONS=[0,1,4,2],MOUSE_HAS_BUTTONS=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();/**
      * @param {string} name Possible mouse event name
      * @return {boolean} true if mouse event, false if not
      */function isMouseEvent(name){return-1<MOUSE_EVENTS.indexOf(name)}/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */ // check for passive event listeners
var supportsPassive=!1;(function(){try{var opts=Object.defineProperty({},"passive",{get:function get(){supportsPassive=!0}});window.addEventListener("test",null,opts);window.removeEventListener("test",null,opts)}catch(e){}})();/**
       * Generate settings for event listeners, dependant on `passiveTouchGestures`
       *
       * @param {string} eventName Event name to determine if `{passive}` option is
       *   needed
       * @return {{passive: boolean} | undefined} Options to use for addEventListener
       *   and removeEventListener
       */function PASSIVE_TOUCH(eventName){if(isMouseEvent(eventName)||"touchend"===eventName){return}if(HAS_NATIVE_TA&&supportsPassive&&passiveTouchGestures){return{passive:!0}}else{return}}// Check for touch-only devices
var IS_TOUCH_ONLY=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/),clickedLabels=[],labellable={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},canBeDisabled={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};// keep track of any labels hit by the mouseCanceller
/** @type {!Array<!HTMLLabelElement>} */ /**
    * @param {HTMLElement} el Element to check labelling status
    * @return {boolean} element can have labels
    */function canBeLabelled(el){return labellable[el.localName]||!1}/**
   * @param {HTMLElement} el Element that may be labelled.
   * @return {!Array<!HTMLLabelElement>} Relevant label for `el`
   */function matchingLabels(el){var labels=Array.prototype.slice.call(/** @type {HTMLInputElement} */el.labels||[]);// IE doesn't have `labels` and Safari doesn't populate `labels`
// if element is in a shadowroot.
// In this instance, finding the non-ancestor labels is enough,
// as the mouseCancellor code will handle ancstor labels
if(!labels.length){labels=[];var _root2=el.getRootNode();// if there is an id on `el`, check for all labels with a matching `for` attribute
if(el.id){for(var matching=_root2.querySelectorAll("label[for = ".concat(el.id,"]")),_i19=0;_i19<matching.length;_i19++){labels.push(/** @type {!HTMLLabelElement} */matching[_i19])}}}return labels}// touch will make synthetic mouse events
// `preventDefault` on touchend will cancel them,
// but this breaks `<input>` focus and link clicks
// disable mouse handlers for MOUSE_TIMEOUT ms after
// a touchend to ignore synthetic mouse events
var mouseCanceller=function mouseCanceller(mouseEvent){// Check for sourceCapabilities, used to distinguish synthetic events
// if mouseEvent did not come from a device that fires touch events,
// it was made by a real mouse and should be counted
// http://wicg.github.io/InputDeviceCapabilities/#dom-inputdevicecapabilities-firestouchevents
var sc=mouseEvent.sourceCapabilities;if(sc&&!sc.firesTouchEvents){return}// skip synthetic mouse events
mouseEvent[HANDLED_OBJ]={skip:!0};// disable "ghost clicks"
if("click"===mouseEvent.type){for(var clickFromLabel=!1,_path2=getComposedPath(mouseEvent),_i20=0;_i20<_path2.length;_i20++){if(_path2[_i20].nodeType===Node.ELEMENT_NODE){if("label"===_path2[_i20].localName){clickedLabels.push(/** @type {!HTMLLabelElement} */_path2[_i20])}else if(canBeLabelled(/** @type {!HTMLElement} */_path2[_i20])){// check if one of the clicked labels is labelling this element
for(var ownerLabels=matchingLabels(/** @type {!HTMLElement} */_path2[_i20]),j=0;j<ownerLabels.length;j++){clickFromLabel=clickFromLabel||-1<clickedLabels.indexOf(ownerLabels[j])}}}if(_path2[_i20]===POINTERSTATE.mouse.target){return}}// if one of the clicked labels was labelling the target element,
// this is not a ghost click
if(clickFromLabel){return}mouseEvent.preventDefault();mouseEvent.stopPropagation()}};/**
    * @param {boolean=} setup True to add, false to remove.
    * @return {void}
    */function setupTeardownMouseCanceller(setup){for(var events=IS_TOUCH_ONLY?["click"]:MOUSE_EVENTS,_i21=0,en;_i21<events.length;_i21++){en=events[_i21];if(setup){// reset clickLabels array
clickedLabels.length=0;document.addEventListener(en,mouseCanceller,!0)}else{document.removeEventListener(en,mouseCanceller,!0)}}}function ignoreMouse(e){if(!cancelSyntheticClickEvents){return}if(!POINTERSTATE.mouse.mouseIgnoreJob){setupTeardownMouseCanceller(!0)}var unset=function unset(){setupTeardownMouseCanceller();POINTERSTATE.mouse.target=null;POINTERSTATE.mouse.mouseIgnoreJob=null};POINTERSTATE.mouse.target=getComposedPath(e)[0];POINTERSTATE.mouse.mouseIgnoreJob=Debouncer.debounce(POINTERSTATE.mouse.mouseIgnoreJob,timeOut.after(MOUSE_TIMEOUT),unset)}/**
   * @param {MouseEvent} ev event to test for left mouse button down
   * @return {boolean} has left mouse button down
   */function hasLeftMouseButton(ev){var type=ev.type;// exit early if the event is not a mouse event
if(!isMouseEvent(type)){return!1}// ev.button is not reliable for mousemove (0 is overloaded as both left button and no buttons)
// instead we use ev.buttons (bitmask of buttons) or fall back to ev.which (deprecated, 0 for no buttons, 1 for left button)
if("mousemove"===type){// allow undefined for testing events
var buttons=ev.buttons===void 0?1:ev.buttons;if(babelHelpers.instanceof(ev,window.MouseEvent)&&!MOUSE_HAS_BUTTONS){buttons=MOUSE_WHICH_TO_BUTTONS[ev.which]||0}// buttons is a bitmask, check that the left button bit is set (1)
return!!(1&buttons)}else{// allow undefined for testing events
var button=ev.button===void 0?0:ev.button;// ev.button is 0 in mousedown/mouseup/click for left button activation
return 0===button}}function isSyntheticClick(ev){if("click"===ev.type){// ev.detail is 0 for HTMLElement.click in most browsers
if(0===ev.detail){return!0}// in the worst case, check that the x/y position of the click is within
// the bounding box of the target of the event
// Thanks IE 10 >:(
var t=_findOriginalTarget(ev);// make sure the target of the event is an element so we can use getBoundingClientRect,
// if not, just assume it is a synthetic click
if(!t.nodeType||/** @type {Element} */t.nodeType!==Node.ELEMENT_NODE){return!0}var bcr=/** @type {Element} */t.getBoundingClientRect(),x=ev.pageX,y=ev.pageY;// use page x/y to account for scrolling
// ev is a synthetic click if the position is outside the bounding box of the target
return!(x>=bcr.left&&x<=bcr.right&&y>=bcr.top&&y<=bcr.bottom)}return!1}var POINTERSTATE={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function firstTouchAction(ev){for(var ta="auto",path=getComposedPath(ev),_i22=0,n;_i22<path.length;_i22++){n=path[_i22];if(n[TOUCH_ACTION]){ta=n[TOUCH_ACTION];break}}return ta}function trackDocument(stateObj,movefn,upfn){stateObj.movefn=movefn;stateObj.upfn=upfn;document.addEventListener("mousemove",movefn);document.addEventListener("mouseup",upfn)}function untrackDocument(stateObj){document.removeEventListener("mousemove",stateObj.movefn);document.removeEventListener("mouseup",stateObj.upfn);stateObj.movefn=null;stateObj.upfn=null}if(cancelSyntheticClickEvents){// use a document-wide touchend listener to start the ghost-click prevention mechanism
// Use passive event listeners, if supported, to not affect scrolling performance
document.addEventListener("touchend",ignoreMouse,supportsPassive?{passive:!0}:!1)}/**
   * Returns the composedPath for the given event.
   * @param {Event} event to process
   * @return {!Array<!EventTarget>} Path of the event
   */var getComposedPath=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:function(event){return event.composedPath&&event.composedPath()||[]},gestures={};/** @type {!Object<string, !GestureRecognizer>} */_exports.gestures=gestures;/** @type {!Array<!GestureRecognizer>} */var recognizers=[];/**
                                * Finds the element rendered on the screen at the provided coordinates.
                                *
                                * Similar to `document.elementFromPoint`, but pierces through
                                * shadow roots.
                                *
                                * @param {number} x Horizontal pixel coordinate
                                * @param {number} y Vertical pixel coordinate
                                * @return {Element} Returns the deepest shadowRoot inclusive element
                                * found at the screen position given.
                                */_exports.recognizers=recognizers;function deepTargetFind(x,y){var node=document.elementFromPoint(x,y),next=node;// this code path is only taken when native ShadowDOM is used
// if there is a shadowroot, it may have a node at x/y
// if there is not a shadowroot, exit the loop
while(next&&next.shadowRoot&&!window.ShadyDOM){// if there is a node at x/y in the shadowroot, look deeper
var oldNext=next;next=next.shadowRoot.elementFromPoint(x,y);// on Safari, elementFromPoint may return the shadowRoot host
if(oldNext===next){break}if(next){node=next}}return node}/**
   * a cheaper check than ev.composedPath()[0];
   *
   * @private
   * @param {Event|Touch} ev Event.
   * @return {EventTarget} Returns the event target.
   */function _findOriginalTarget(ev){var path=getComposedPath(/** @type {?Event} */ev);// It shouldn't be, but sometimes path is empty (window on Safari).
return 0<path.length?path[0]:ev.target}/**
   * @private
   * @param {Event} ev Event.
   * @return {void}
   */function _handleNative(ev){var handled,type=ev.type,node=ev.currentTarget,gobj=node[GESTURE_KEY];if(!gobj){return}var gs=gobj[type];if(!gs){return}if(!ev[HANDLED_OBJ]){ev[HANDLED_OBJ]={};if("touch"===type.slice(0,5)){ev=/** @type {TouchEvent} */ev;// eslint-disable-line no-self-assign
var t=ev.changedTouches[0];if("touchstart"===type){// only handle the first finger
if(1===ev.touches.length){POINTERSTATE.touch.id=t.identifier}}if(POINTERSTATE.touch.id!==t.identifier){return}if(!HAS_NATIVE_TA){if("touchstart"===type||"touchmove"===type){_handleTouchAction(ev)}}}}handled=ev[HANDLED_OBJ];// used to ignore synthetic mouse events
if(handled.skip){return}// reset recognizer state
for(var _i23=0,r;_i23<recognizers.length;_i23++){r=recognizers[_i23];if(gs[r.name]&&!handled[r.name]){if(r.flow&&-1<r.flow.start.indexOf(ev.type)&&r.reset){r.reset()}}}// enforce gesture recognizer order
for(var _i24=0,_r;_i24<recognizers.length;_i24++){_r=recognizers[_i24];if(gs[_r.name]&&!handled[_r.name]){handled[_r.name]=!0;_r[type](ev)}}}/**
   * @private
   * @param {TouchEvent} ev Event.
   * @return {void}
   */function _handleTouchAction(ev){var t=ev.changedTouches[0],type=ev.type;if("touchstart"===type){POINTERSTATE.touch.x=t.clientX;POINTERSTATE.touch.y=t.clientY;POINTERSTATE.touch.scrollDecided=!1}else if("touchmove"===type){if(POINTERSTATE.touch.scrollDecided){return}POINTERSTATE.touch.scrollDecided=!0;var ta=firstTouchAction(ev),shouldPrevent=!1,dx=Math.abs(POINTERSTATE.touch.x-t.clientX),dy=Math.abs(POINTERSTATE.touch.y-t.clientY);if(!ev.cancelable){// scrolling is happening
}else if("none"===ta){shouldPrevent=!0}else if("pan-x"===ta){shouldPrevent=dy>dx}else if("pan-y"===ta){shouldPrevent=dx>dy}if(shouldPrevent){ev.preventDefault()}else{_prevent("track")}}}/**
   * Adds an event listener to a node for the given gesture type.
   *
   * @param {!EventTarget} node Node to add listener on
   * @param {string} evType Gesture type: `down`, `up`, `track`, or `tap`
   * @param {!function(!Event):void} handler Event listener function to call
   * @return {boolean} Returns true if a gesture event listener was added.
   */function addListener(node,evType,handler){if(gestures[evType]){_add(node,evType,handler);return!0}return!1}/**
   * Removes an event listener from a node for the given gesture type.
   *
   * @param {!EventTarget} node Node to remove listener from
   * @param {string} evType Gesture type: `down`, `up`, `track`, or `tap`
   * @param {!function(!Event):void} handler Event listener function previously passed to
   *  `addListener`.
   * @return {boolean} Returns true if a gesture event listener was removed.
   */function removeListener(node,evType,handler){if(gestures[evType]){_remove(node,evType,handler);return!0}return!1}/**
   * automate the event listeners for the native events
   *
   * @private
   * @param {!EventTarget} node Node on which to add the event.
   * @param {string} evType Event type to add.
   * @param {function(!Event)} handler Event handler function.
   * @return {void}
   */function _add(node,evType,handler){var recognizer=gestures[evType],deps=recognizer.deps,name=recognizer.name,gobj=node[GESTURE_KEY];if(!gobj){node[GESTURE_KEY]=gobj={}}for(var _i25=0,dep,gd;_i25<deps.length;_i25++){dep=deps[_i25];// don't add mouse handlers on iOS because they cause gray selection overlays
if(IS_TOUCH_ONLY&&isMouseEvent(dep)&&"click"!==dep){continue}gd=gobj[dep];if(!gd){gobj[dep]=gd={_count:0}}if(0===gd._count){node.addEventListener(dep,_handleNative,PASSIVE_TOUCH(dep))}gd[name]=(gd[name]||0)+1;gd._count=(gd._count||0)+1}node.addEventListener(evType,handler);if(recognizer.touchAction){setTouchAction(node,recognizer.touchAction)}}/**
   * automate event listener removal for native events
   *
   * @private
   * @param {!EventTarget} node Node on which to remove the event.
   * @param {string} evType Event type to remove.
   * @param {function(!Event): void} handler Event handler function.
   * @return {void}
   */function _remove(node,evType,handler){var recognizer=gestures[evType],deps=recognizer.deps,name=recognizer.name,gobj=node[GESTURE_KEY];if(gobj){for(var _i26=0,dep,gd;_i26<deps.length;_i26++){dep=deps[_i26];gd=gobj[dep];if(gd&&gd[name]){gd[name]=(gd[name]||1)-1;gd._count=(gd._count||1)-1;if(0===gd._count){node.removeEventListener(dep,_handleNative,PASSIVE_TOUCH(dep))}}}}node.removeEventListener(evType,handler)}/**
   * Registers a new gesture event recognizer for adding new custom
   * gesture event types.
   *
   * @param {!GestureRecognizer} recog Gesture recognizer descriptor
   * @return {void}
   */function register$1(recog){recognizers.push(recog);for(var _i27=0;_i27<recog.emits.length;_i27++){gestures[recog.emits[_i27]]=recog}}/**
   * @private
   * @param {string} evName Event name.
   * @return {Object} Returns the gesture for the given event name.
   */function _findRecognizerByEvent(evName){for(var _i28=0,r;_i28<recognizers.length;_i28++){r=recognizers[_i28];for(var j=0,n;j<r.emits.length;j++){n=r.emits[j];if(n===evName){return r}}}return null}/**
   * Sets scrolling direction on node.
   *
   * This value is checked on first move, thus it should be called prior to
   * adding event listeners.
   *
   * @param {!EventTarget} node Node to set touch action setting on
   * @param {string} value Touch action value
   * @return {void}
   */function setTouchAction(node,value){if(HAS_NATIVE_TA&&babelHelpers.instanceof(node,HTMLElement)){// NOTE: add touchAction async so that events can be added in
// custom element constructors. Otherwise we run afoul of custom
// elements restriction against settings attributes (style) in the
// constructor.
microTask.run(function(){node.style.touchAction=value})}node[TOUCH_ACTION]=value}/**
   * Dispatches an event on the `target` element of `type` with the given
   * `detail`.
   * @private
   * @param {!EventTarget} target The element on which to fire an event.
   * @param {string} type The type of event to fire.
   * @param {!Object=} detail The detail object to populate on the event.
   * @return {void}
   */function _fire(target,type,detail){var ev=new Event(type,{bubbles:!0,cancelable:!0,composed:!0});ev.detail=detail;wrap$1(/** @type {!Node} */target).dispatchEvent(ev);// forward `preventDefault` in a clean way
if(ev.defaultPrevented){var preventer=detail.preventer||detail.sourceEvent;if(preventer&&preventer.preventDefault){preventer.preventDefault()}}}/**
   * Prevents the dispatch and default action of the given event name.
   *
   * @param {string} evName Event name.
   * @return {void}
   */function _prevent(evName){var recognizer=_findRecognizerByEvent(evName);if(recognizer.info){recognizer.info.prevent=!0}}/**
   * Reset the 2500ms timeout on processing mouse input after detecting touch input.
   *
   * Touch inputs create synthesized mouse inputs anywhere from 0 to 2000ms after the touch.
   * This method should only be called during testing with simulated touch inputs.
   * Calling this method in production may cause duplicate taps or other Gestures.
   *
   * @return {void}
   */function resetMouseCanceller(){if(POINTERSTATE.mouse.mouseIgnoreJob){POINTERSTATE.mouse.mouseIgnoreJob.flush()}}/* eslint-disable valid-jsdoc */register$1({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},/**
   * @this {GestureRecognizer}
   * @return {void}
   */reset:function reset(){untrackDocument(this.info)},/**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */mousedown:function mousedown(e){if(!hasLeftMouseButton(e)){return}var t=_findOriginalTarget(e),self=this,movefn=function movefn(e){if(!hasLeftMouseButton(e)){downupFire("up",t,e);untrackDocument(self.info)}},upfn=function upfn(e){if(hasLeftMouseButton(e)){downupFire("up",t,e)}untrackDocument(self.info)};trackDocument(this.info,movefn,upfn);downupFire("down",t,e)},/**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */touchstart:function touchstart(e){downupFire("down",_findOriginalTarget(e),e.changedTouches[0],e)},/**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */touchend:function touchend(e){downupFire("up",_findOriginalTarget(e),e.changedTouches[0],e)}});/**
     * @param {string} type
     * @param {EventTarget} target
     * @param {Event|Touch} event
     * @param {Event=} preventer
     * @return {void}
     */function downupFire(type,target,event,preventer){if(!target){return}_fire(target,type,{x:event.clientX,y:event.clientY,sourceEvent:event,preventer:preventer,prevent:function prevent(e){return _prevent(e)}})}register$1({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],/** @this {GestureInfo} */addMove:function addMove(move){if(this.moves.length>TRACK_LENGTH){this.moves.shift()}this.moves.push(move)},movefn:null,upfn:null,prevent:!1},/**
   * @this {GestureRecognizer}
   * @return {void}
   */reset:function reset(){this.info.state="start";this.info.started=!1;this.info.moves=[];this.info.x=0;this.info.y=0;this.info.prevent=!1;untrackDocument(this.info)},/**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */mousedown:function mousedown(e){if(!hasLeftMouseButton(e)){return}var t=_findOriginalTarget(e),self=this,movefn=function movefn(e){var x=e.clientX,y=e.clientY;if(trackHasMovedEnough(self.info,x,y)){// first move is 'start', subsequent moves are 'move', mouseup is 'end'
self.info.state=self.info.started?"mouseup"===e.type?"end":"track":"start";if("start"===self.info.state){// if and only if tracking, always prevent tap
_prevent("tap")}self.info.addMove({x:x,y:y});if(!hasLeftMouseButton(e)){// always fire "end"
self.info.state="end";untrackDocument(self.info)}if(t){trackFire(self.info,t,e)}self.info.started=!0}},upfn=function upfn(e){if(self.info.started){movefn(e)}// remove the temporary listeners
untrackDocument(self.info)};// add temporary document listeners as mouse retargets
trackDocument(this.info,movefn,upfn);this.info.x=e.clientX;this.info.y=e.clientY},/**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */touchstart:function touchstart(e){var ct=e.changedTouches[0];this.info.x=ct.clientX;this.info.y=ct.clientY},/**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */touchmove:function touchmove(e){var t=_findOriginalTarget(e),ct=e.changedTouches[0],x=ct.clientX,y=ct.clientY;if(trackHasMovedEnough(this.info,x,y)){if("start"===this.info.state){// if and only if tracking, always prevent tap
_prevent("tap")}this.info.addMove({x:x,y:y});trackFire(this.info,t,ct);this.info.state="track";this.info.started=!0}},/**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */touchend:function touchend(e){var t=_findOriginalTarget(e),ct=e.changedTouches[0];// only trackend if track was started and not aborted
if(this.info.started){// reset started state on up
this.info.state="end";this.info.addMove({x:ct.clientX,y:ct.clientY});trackFire(this.info,t,ct)}}});/**
     * @param {!GestureInfo} info
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */function trackHasMovedEnough(info,x,y){if(info.prevent){return!1}if(info.started){return!0}var dx=Math.abs(info.x-x),dy=Math.abs(info.y-y);return dx>=TRACK_DISTANCE||dy>=TRACK_DISTANCE}/**
   * @param {!GestureInfo} info
   * @param {?EventTarget} target
   * @param {Touch} touch
   * @return {void}
   */function trackFire(info,target,touch){if(!target){return}var secondlast=info.moves[info.moves.length-2],lastmove=info.moves[info.moves.length-1],dx=lastmove.x-info.x,dy=lastmove.y-info.y,ddx,ddy=0;if(secondlast){ddx=lastmove.x-secondlast.x;ddy=lastmove.y-secondlast.y}_fire(target,"track",{state:info.state,x:touch.clientX,y:touch.clientY,dx:dx,dy:dy,ddx:ddx,ddy:ddy,sourceEvent:touch,hover:function hover(){return deepTargetFind(touch.clientX,touch.clientY)}})}register$1({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},/**
   * @this {GestureRecognizer}
   * @return {void}
   */reset:function reset(){this.info.x=NaN;this.info.y=NaN;this.info.prevent=!1},/**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */mousedown:function mousedown(e){if(hasLeftMouseButton(e)){this.info.x=e.clientX;this.info.y=e.clientY}},/**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   * @return {void}
   */click:function click(e){if(hasLeftMouseButton(e)){trackForward(this.info,e)}},/**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */touchstart:function touchstart(e){var touch=e.changedTouches[0];this.info.x=touch.clientX;this.info.y=touch.clientY},/**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   * @return {void}
   */touchend:function touchend(e){trackForward(this.info,e.changedTouches[0],e)}});/**
     * @param {!GestureInfo} info
     * @param {Event | Touch} e
     * @param {Event=} preventer
     * @return {void}
     */function trackForward(info,e,preventer){var dx=Math.abs(e.clientX-info.x),dy=Math.abs(e.clientY-info.y),t=_findOriginalTarget(preventer||e);if(!t||canBeDisabled[/** @type {!HTMLElement} */t.localName]&&t.hasAttribute("disabled")){return}// dx,dy can be NaN if `click` has been simulated and there was no `down` for `start`
if(isNaN(dx)||isNaN(dy)||dx<=TAP_DISTANCE&&dy<=TAP_DISTANCE||isSyntheticClick(e)){// prevent taps from being generated if an event has canceled them
if(!info.prevent){_fire(t,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:preventer})}}}/* eslint-enable valid-jsdoc */ /** @deprecated */var findOriginalTarget=_findOriginalTarget;/** @deprecated */_exports.findOriginalTarget=findOriginalTarget;var add=addListener;/** @deprecated */_exports.add=add;var remove=removeListener;_exports.remove=remove;var gestures$1={gestures:gestures,recognizers:recognizers,deepTargetFind:deepTargetFind,addListener:addListener,removeListener:removeListener,register:register$1,setTouchAction:setTouchAction,prevent:_prevent,resetMouseCanceller:resetMouseCanceller,findOriginalTarget:findOriginalTarget,add:add,remove:remove};_exports.$gestures=gestures$1;var GestureEventListeners=dedupingMixin(function(superClass){/**
   * @polymer
   * @mixinClass
   * @implements {Polymer_GestureEventListeners}
   */var GestureEventListeners=/*#__PURE__*/function(_superClass3){babelHelpers.inherits(GestureEventListeners,_superClass3);function GestureEventListeners(){babelHelpers.classCallCheck(this,GestureEventListeners);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(GestureEventListeners).apply(this,arguments))}babelHelpers.createClass(GestureEventListeners,[{key:"_addEventListenerToNode",/**
     * Add the event listener to the node if it is a gestures event.
     *
     * @param {!EventTarget} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to add
     * @return {void}
     * @override
     */value:function _addEventListenerToNode(node,eventName,handler){if(!addListener(node,eventName,handler)){babelHelpers.get(babelHelpers.getPrototypeOf(GestureEventListeners.prototype),"_addEventListenerToNode",this).call(this,node,eventName,handler)}}/**
       * Remove the event listener to the node if it is a gestures event.
       *
       * @param {!EventTarget} node Node to remove event listener from
       * @param {string} eventName Name of event
       * @param {function(!Event):void} handler Listener function to remove
       * @return {void}
       * @override
       */},{key:"_removeEventListenerFromNode",value:function _removeEventListenerFromNode(node,eventName,handler){if(!removeListener(node,eventName,handler)){babelHelpers.get(babelHelpers.getPrototypeOf(GestureEventListeners.prototype),"_removeEventListenerFromNode",this).call(this,node,eventName,handler)}}}]);return GestureEventListeners}(superClass);return GestureEventListeners});_exports.GestureEventListeners=GestureEventListeners;var gestureEventListeners={GestureEventListeners:GestureEventListeners};_exports.$gestureEventListeners=gestureEventListeners;var HOST_DIR=/:host\(:dir\((ltr|rtl)\)\)/g,HOST_DIR_REPLACMENT=":host([dir=\"$1\"])",EL_DIR=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,EL_DIR_REPLACMENT=":host([dir=\"$2\"]) $1",DIR_CHECK=/:dir\((?:ltr|rtl)\)/,SHIM_SHADOW=!!(window.ShadyDOM&&window.ShadyDOM.inUse),DIR_INSTANCES=[],observer=null,documentDir="";function getRTL(){documentDir=document.documentElement.getAttribute("dir")}/**
   * @param {!Polymer_DirMixin} instance Instance to set RTL status on
   */function setRTL(instance){if(!instance.__autoDirOptOut){var el=/** @type {!HTMLElement} */instance;el.setAttribute("dir",documentDir)}}function updateDirection(){getRTL();documentDir=document.documentElement.getAttribute("dir");for(var _i29=0;_i29<DIR_INSTANCES.length;_i29++){setRTL(DIR_INSTANCES[_i29])}}function takeRecords(){if(observer&&observer.takeRecords().length){updateDirection()}}/**
   * Element class mixin that allows elements to use the `:dir` CSS Selector to
   * have text direction specific styling.
   *
   * With this mixin, any stylesheet provided in the template will transform
   * `:dir` into `:host([dir])` and sync direction with the page via the
   * element's `dir` attribute.
   *
   * Elements can opt out of the global page text direction by setting the `dir`
   * attribute directly in `ready()` or in HTML.
   *
   * Caveats:
   * - Applications must set `<html dir="ltr">` or `<html dir="rtl">` to sync
   *   direction
   * - Automatic left-to-right or right-to-left styling is sync'd with the
   *   `<html>` element only.
   * - Changing `dir` at runtime is supported.
   * - Opting out of the global direction styling is permanent
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin PropertyAccessors
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */var DirMixin=dedupingMixin(function(base){if(!SHIM_SHADOW){if(!observer){getRTL();observer=new MutationObserver(updateDirection);observer.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]})}}/**
     * @constructor
     * @implements {Polymer_PropertyAccessors}
     * @private
     */var elementBase=PropertyAccessors(base),Dir=/*#__PURE__*/function(_elementBase){babelHelpers.inherits(Dir,_elementBase);babelHelpers.createClass(Dir,null,[{key:"_processStyleText",/**
     * @param {string} cssText .
     * @param {string} baseURI .
     * @return {string} .
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     * @nocollapse
     */value:function _processStyleText(cssText,baseURI){// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
cssText=elementBase._processStyleText.call(this,cssText,baseURI);if(!SHIM_SHADOW&&DIR_CHECK.test(cssText)){cssText=this._replaceDirInCssText(cssText);this.__activateDir=!0}return cssText}/**
       * Replace `:dir` in the given CSS text
       *
       * @param {string} text CSS text to replace DIR
       * @return {string} Modified CSS
       * @nocollapse
       */},{key:"_replaceDirInCssText",value:function _replaceDirInCssText(text){var replacedText=text;replacedText=replacedText.replace(HOST_DIR,HOST_DIR_REPLACMENT);replacedText=replacedText.replace(EL_DIR,EL_DIR_REPLACMENT);return replacedText}}]);function Dir(){var _this13;babelHelpers.classCallCheck(this,Dir);_this13=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(Dir).call(this));/** @type {boolean} */_this13.__autoDirOptOut=!1;return _this13}/**
       * @override
       * @suppress {invalidCasts} Closure doesn't understand that `this` is an
       *     HTMLElement
       * @return {void}
       */babelHelpers.createClass(Dir,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(Dir.prototype),"ready",this).call(this);this.__autoDirOptOut=/** @type {!HTMLElement} */this.hasAttribute("dir")}/**
       * @override
       * @suppress {missingProperties} If it exists on elementBase, it can be
       *   super'd
       * @return {void}
       */},{key:"connectedCallback",value:function connectedCallback(){if(elementBase.prototype.connectedCallback){babelHelpers.get(babelHelpers.getPrototypeOf(Dir.prototype),"connectedCallback",this).call(this)}if(this.constructor.__activateDir){takeRecords();DIR_INSTANCES.push(this);setRTL(this)}}/**
       * @override
       * @suppress {missingProperties} If it exists on elementBase, it can be
       *   super'd
       * @return {void}
       */},{key:"disconnectedCallback",value:function disconnectedCallback(){if(elementBase.prototype.disconnectedCallback){babelHelpers.get(babelHelpers.getPrototypeOf(Dir.prototype),"disconnectedCallback",this).call(this)}if(this.constructor.__activateDir){var idx=DIR_INSTANCES.indexOf(this);if(-1<idx){DIR_INSTANCES.splice(idx,1)}}}}]);return Dir}(elementBase);/**
                                                * @polymer
                                                * @mixinClass
                                                * @implements {Polymer_DirMixin}
                                                */Dir.__activateDir=!1;return Dir});_exports.DirMixin=DirMixin;var dirMixin={DirMixin:DirMixin};_exports.$dirMixin=dirMixin;var scheduled=!1,beforeRenderQueue=[],afterRenderQueue=[];function schedule(){scheduled=!0;// before next render
requestAnimationFrame(function(){scheduled=!1;flushQueue(beforeRenderQueue);// after the render
setTimeout(function(){runQueue(afterRenderQueue)})})}function flushQueue(queue){while(queue.length){callMethod(queue.shift())}}function runQueue(queue){for(var _i30=0,l=queue.length;_i30<l;_i30++){callMethod(queue.shift())}}function callMethod(info){var context=info[0],callback=info[1],args=info[2];try{callback.apply(context,args)}catch(e){setTimeout(function(){throw e})}}/**
   * Flushes all `beforeNextRender` tasks, followed by all `afterNextRender`
   * tasks.
   *
   * @return {void}
   */function flush(){while(beforeRenderQueue.length||afterRenderQueue.length){flushQueue(beforeRenderQueue);flushQueue(afterRenderQueue)}scheduled=!1}/**
   * Enqueues a callback which will be run before the next render, at
   * `requestAnimationFrame` timing.
   *
   * This method is useful for enqueuing work that requires DOM measurement,
   * since measurement may not be reliable in custom element callbacks before
   * the first render, as well as for batching measurement tasks in general.
   *
   * Tasks in this queue may be flushed by calling `flush()`.
   *
   * @param {*} context Context object the callback function will be bound to
   * @param {function(...*):void} callback Callback function
   * @param {!Array=} args An array of arguments to call the callback function with
   * @return {void}
   */function beforeNextRender(context,callback,args){if(!scheduled){schedule()}beforeRenderQueue.push([context,callback,args])}/**
   * Enqueues a callback which will be run after the next render, equivalent
   * to one task (`setTimeout`) after the next `requestAnimationFrame`.
   *
   * This method is useful for tuning the first-render performance of an
   * element or application by deferring non-critical work until after the
   * first paint.  Typical non-render-critical work may include adding UI
   * event listeners and aria attributes.
   *
   * @param {*} context Context object the callback function will be bound to
   * @param {function(...*):void} callback Callback function
   * @param {!Array=} args An array of arguments to call the callback function with
   * @return {void}
   */function afterNextRender(context,callback,args){if(!scheduled){schedule()}afterRenderQueue.push([context,callback,args])}var renderStatus={flush:flush,beforeNextRender:beforeNextRender,afterNextRender:afterNextRender};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$renderStatus=renderStatus;function resolve(){document.body.removeAttribute("unresolved")}if("interactive"===document.readyState||"complete"===document.readyState){resolve()}else{window.addEventListener("DOMContentLoaded",resolve)}function newSplice(index,removed,addedCount){return{index:index,removed:removed,addedCount:addedCount}}var EDIT_LEAVE=0,EDIT_UPDATE=1,EDIT_ADD=2,EDIT_DELETE=3;// Note: This function is *based* on the computation of the Levenshtein
// "edit" distance. The one change is that "updates" are treated as two
// edits - not one. With Array splices, an update is really a delete
// followed by an add. By retaining this, we optimize for "keeping" the
// maximum array items in the original array. For example:
//
//   'xxxx123' -> '123yyyy'
//
// With 1-edit updates, the shortest path would be just to update all seven
// characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
// leaves the substring '123' intact.
function calcEditDistances(current,currentStart,currentEnd,old,oldStart,oldEnd){// "Deletion" columns
// "Addition" rows. Initialize null column.
for(var rowCount=oldEnd-oldStart+1,columnCount=currentEnd-currentStart+1,distances=Array(rowCount),_i31=0;_i31<rowCount;_i31++){distances[_i31]=Array(columnCount);distances[_i31][0]=_i31}// Initialize null row
for(var j=0;j<columnCount;j++){distances[0][j]=j}for(var _i32=1;_i32<rowCount;_i32++){for(var _j=1;_j<columnCount;_j++){if(equals(current[currentStart+_j-1],old[oldStart+_i32-1]))distances[_i32][_j]=distances[_i32-1][_j-1];else{var north=distances[_i32-1][_j]+1,west=distances[_i32][_j-1]+1;distances[_i32][_j]=north<west?north:west}}}return distances}// This starts at the final weight, and walks "backward" by finding
// the minimum previous weight recursively until the origin of the weight
// matrix.
function spliceOperationsFromEditDistances(distances){var i=distances.length-1,j=distances[0].length-1,current=distances[i][j],edits=[];while(0<i||0<j){if(0==i){edits.push(EDIT_ADD);j--;continue}if(0==j){edits.push(EDIT_DELETE);i--;continue}var northWest=distances[i-1][j-1],west=distances[i-1][j],north=distances[i][j-1],min=void 0;if(west<north)min=west<northWest?west:northWest;else min=north<northWest?north:northWest;if(min==northWest){if(northWest==current){edits.push(EDIT_LEAVE)}else{edits.push(EDIT_UPDATE);current=northWest}i--;j--}else if(min==west){edits.push(EDIT_DELETE);i--;current=west}else{edits.push(EDIT_ADD);j--;current=north}}edits.reverse();return edits}/**
   * Splice Projection functions:
   *
   * A splice map is a representation of how a previous array of items
   * was transformed into a new array of items. Conceptually it is a list of
   * tuples of
   *
   *   <index, removed, addedCount>
   *
   * which are kept in ascending index order of. The tuple represents that at
   * the |index|, |removed| sequence of items were removed, and counting forward
   * from |index|, |addedCount| items were added.
   */ /**
       * Lacking individual splice mutation information, the minimal set of
       * splices can be synthesized given the previous state and final state of an
       * array. The basic approach is to calculate the edit distance matrix and
       * choose the shortest path through it.
       *
       * Complexity: O(l * p)
       *   l: The length of the current array
       *   p: The length of the old array
       *
       * @param {!Array} current The current "changed" array for which to
       * calculate splices.
       * @param {number} currentStart Starting index in the `current` array for
       * which splices are calculated.
       * @param {number} currentEnd Ending index in the `current` array for
       * which splices are calculated.
       * @param {!Array} old The original "unchanged" array to compare `current`
       * against to determine splices.
       * @param {number} oldStart Starting index in the `old` array for
       * which splices are calculated.
       * @param {number} oldEnd Ending index in the `old` array for
       * which splices are calculated.
       * @return {!Array} Returns an array of splice record objects. Each of these
       * contains: `index` the location where the splice occurred; `removed`
       * the array of removed items from this location; `addedCount` the number
       * of items added at this location.
       */function calcSplices(current,currentStart,currentEnd,old,oldStart,oldEnd){var prefixCount=0,suffixCount=0,splice,minLength=Math.min(currentEnd-currentStart,oldEnd-oldStart);if(0==currentStart&&0==oldStart)prefixCount=sharedPrefix(current,old,minLength);if(currentEnd==current.length&&oldEnd==old.length)suffixCount=sharedSuffix(current,old,minLength-prefixCount);currentStart+=prefixCount;oldStart+=prefixCount;currentEnd-=suffixCount;oldEnd-=suffixCount;if(0==currentEnd-currentStart&&0==oldEnd-oldStart)return[];if(currentStart==currentEnd){splice=newSplice(currentStart,[],0);while(oldStart<oldEnd){splice.removed.push(old[oldStart++])}return[splice]}else if(oldStart==oldEnd)return[newSplice(currentStart,[],currentEnd-currentStart)];var ops=spliceOperationsFromEditDistances(calcEditDistances(current,currentStart,currentEnd,old,oldStart,oldEnd));splice=void 0;for(var splices=[],index=currentStart,oldIndex=oldStart,_i33=0;_i33<ops.length;_i33++){switch(ops[_i33]){case EDIT_LEAVE:if(splice){splices.push(splice);splice=void 0}index++;oldIndex++;break;case EDIT_UPDATE:if(!splice)splice=newSplice(index,[],0);splice.addedCount++;index++;splice.removed.push(old[oldIndex]);oldIndex++;break;case EDIT_ADD:if(!splice)splice=newSplice(index,[],0);splice.addedCount++;index++;break;case EDIT_DELETE:if(!splice)splice=newSplice(index,[],0);splice.removed.push(old[oldIndex]);oldIndex++;break;}}if(splice){splices.push(splice)}return splices}function sharedPrefix(current,old,searchLength){for(var _i34=0;_i34<searchLength;_i34++){if(!equals(current[_i34],old[_i34]))return _i34}return searchLength}function sharedSuffix(current,old,searchLength){var index1=current.length,index2=old.length,count=0;while(count<searchLength&&equals(current[--index1],old[--index2])){count++}return count}/**
   * Returns an array of splice records indicating the minimum edits required
   * to transform the `previous` array into the `current` array.
   *
   * Splice records are ordered by index and contain the following fields:
   * - `index`: index where edit started
   * - `removed`: array of removed items from this index
   * - `addedCount`: number of items added at this index
   *
   * This function is based on the Levenshtein "minimum edit distance"
   * algorithm. Note that updates are treated as removal followed by addition.
   *
   * The worst-case time complexity of this algorithm is `O(l * p)`
   *   l: The length of the current array
   *   p: The length of the previous array
   *
   * However, the worst-case complexity is reduced by an `O(n)` optimization
   * to detect any shared prefix & suffix between the two arrays and only
   * perform the more expensive minimum edit distance calculation over the
   * non-shared portions of the arrays.
   *
   * @function
   * @param {!Array} current The "changed" array for which splices will be
   * calculated.
   * @param {!Array} previous The "unchanged" original array to compare
   * `current` against to determine the splices.
   * @return {!Array} Returns an array of splice record objects. Each of these
   * contains: `index` the location where the splice occurred; `removed`
   * the array of removed items from this location; `addedCount` the number
   * of items added at this location.
   */function calculateSplices(current,previous){return calcSplices(current,0,current.length,previous,0,previous.length)}function equals(currentValue,previousValue){return currentValue===previousValue}var arraySplice={calculateSplices:calculateSplices};_exports.$arraySplice=arraySplice;function isSlot(node){return"slot"===node.localName}/**
   * Class that listens for changes (additions or removals) to
   * "flattened nodes" on a given `node`. The list of flattened nodes consists
   * of a node's children and, for any children that are `<slot>` elements,
   * the expanded flattened list of `assignedNodes`.
   * For example, if the observed node has children `<a></a><slot></slot><b></b>`
   * and the `<slot>` has one `<div>` assigned to it, then the flattened
   * nodes list is `<a></a><div></div><b></b>`. If the `<slot>` has other
   * `<slot>` elements assigned to it, these are flattened as well.
   *
   * The provided `callback` is called whenever any change to this list
   * of flattened nodes occurs, where an addition or removal of a node is
   * considered a change. The `callback` is called with one argument, an object
   * containing an array of any `addedNodes` and `removedNodes`.
   *
   * Note: the callback is called asynchronous to any changes
   * at a microtask checkpoint. This is because observation is performed using
   * `MutationObserver` and the `<slot>` element's `slotchange` event which
   * are asynchronous.
   *
   * An example:
   * ```js
   * class TestSelfObserve extends PolymerElement {
   *   static get is() { return 'test-self-observe';}
   *   connectedCallback() {
   *     super.connectedCallback();
   *     this._observer = new FlattenedNodesObserver(this, (info) => {
   *       this.info = info;
   *     });
   *   }
   *   disconnectedCallback() {
   *     super.disconnectedCallback();
   *     this._observer.disconnect();
   *   }
   * }
   * customElements.define(TestSelfObserve.is, TestSelfObserve);
   * ```
   *
   * @summary Class that listens for changes (additions or removals) to
   * "flattened nodes" on a given `node`.
   * @implements {PolymerDomApi.ObserveHandle}
   */var FlattenedNodesObserver=/*#__PURE__*/function(){babelHelpers.createClass(FlattenedNodesObserver,null,[{key:"getFlattenedNodes",/**
   * Returns the list of flattened nodes for the given `node`.
   * This list consists of a node's children and, for any children
   * that are `<slot>` elements, the expanded flattened list of `assignedNodes`.
   * For example, if the observed node has children `<a></a><slot></slot><b></b>`
   * and the `<slot>` has one `<div>` assigned to it, then the flattened
   * nodes list is `<a></a><div></div><b></b>`. If the `<slot>` has other
   * `<slot>` elements assigned to it, these are flattened as well.
   *
   * @param {!HTMLElement|!HTMLSlotElement} node The node for which to
   *      return the list of flattened nodes.
   * @return {!Array<!Node>} The list of flattened nodes for the given `node`.
   * @nocollapse See https://github.com/google/closure-compiler/issues/2763
   */ // eslint-disable-next-line
value:function getFlattenedNodes(node){var wrapped=wrap$1(node);if(isSlot(node)){node=/** @type {!HTMLSlotElement} */node;// eslint-disable-line no-self-assign
return wrapped.assignedNodes({flatten:!0})}else{return Array.from(wrapped.childNodes).map(function(node){if(isSlot(node)){node=/** @type {!HTMLSlotElement} */node;// eslint-disable-line no-self-assign
return wrap$1(node).assignedNodes({flatten:!0})}else{return[node]}}).reduce(function(a,b){return a.concat(b)},[])}}/**
     * @param {!HTMLElement} target Node on which to listen for changes.
     * @param {?function(this: Element, { target: !HTMLElement, addedNodes: !Array<!Element>, removedNodes: !Array<!Element> }):void} callback Function called when there are additions
     * or removals from the target's list of flattened nodes.
     */ // eslint-disable-next-line
}]);function FlattenedNodesObserver(target,callback){var _this14=this;babelHelpers.classCallCheck(this,FlattenedNodesObserver);/**
     * @type {MutationObserver}
     * @private
     */this._shadyChildrenObserver=null;/**
                                            * @type {MutationObserver}
                                            * @private
                                            */this._nativeChildrenObserver=null;this._connected=!1;/**
                              * @type {!HTMLElement}
                              * @private
                              */this._target=target;this.callback=callback;this._effectiveNodes=[];this._observer=null;this._scheduled=!1;/**
                              * @type {function()}
                              * @private
                              */this._boundSchedule=function(){_this14._schedule()};this.connect();this._schedule()}/**
     * Activates an observer. This method is automatically called when
     * a `FlattenedNodesObserver` is created. It should only be called to
     * re-activate an observer that has been deactivated via the `disconnect` method.
     *
     * @return {void}
     */babelHelpers.createClass(FlattenedNodesObserver,[{key:"connect",value:function connect(){var _this15=this;if(isSlot(this._target)){this._listenSlots([this._target])}else if(wrap$1(this._target).children){this._listenSlots(/** @type {!NodeList<!Node>} */wrap$1(this._target).children);if(window.ShadyDOM){this._shadyChildrenObserver=window.ShadyDOM.observeChildren(this._target,function(mutations){_this15._processMutations(mutations)})}else{this._nativeChildrenObserver=new MutationObserver(function(mutations){_this15._processMutations(mutations)});this._nativeChildrenObserver.observe(this._target,{childList:!0})}}this._connected=!0}/**
     * Deactivates the flattened nodes observer. After calling this method
     * the observer callback will not be called when changes to flattened nodes
     * occur. The `connect` method may be subsequently called to reactivate
     * the observer.
     *
     * @return {void}
     * @override
     */},{key:"disconnect",value:function disconnect(){if(isSlot(this._target)){this._unlistenSlots([this._target])}else if(wrap$1(this._target).children){this._unlistenSlots(/** @type {!NodeList<!Node>} */wrap$1(this._target).children);if(window.ShadyDOM&&this._shadyChildrenObserver){window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver);this._shadyChildrenObserver=null}else if(this._nativeChildrenObserver){this._nativeChildrenObserver.disconnect();this._nativeChildrenObserver=null}}this._connected=!1}/**
     * @return {void}
     * @private
     */},{key:"_schedule",value:function _schedule(){var _this16=this;if(!this._scheduled){this._scheduled=!0;microTask.run(function(){return _this16.flush()})}}/**
     * @param {Array<MutationRecord>} mutations Mutations signaled by the mutation observer
     * @return {void}
     * @private
     */},{key:"_processMutations",value:function _processMutations(mutations){this._processSlotMutations(mutations);this.flush()}/**
     * @param {Array<MutationRecord>} mutations Mutations signaled by the mutation observer
     * @return {void}
     * @private
     */},{key:"_processSlotMutations",value:function _processSlotMutations(mutations){if(mutations){for(var _i35=0,mutation;_i35<mutations.length;_i35++){mutation=mutations[_i35];if(mutation.addedNodes){this._listenSlots(mutation.addedNodes)}if(mutation.removedNodes){this._unlistenSlots(mutation.removedNodes)}}}}/**
     * Flushes the observer causing any pending changes to be immediately
     * delivered the observer callback. By default these changes are delivered
     * asynchronously at the next microtask checkpoint.
     *
     * @return {boolean} Returns true if any pending changes caused the observer
     * callback to run.
     */},{key:"flush",value:function flush(){if(!this._connected){return!1}if(window.ShadyDOM){ShadyDOM.flush()}if(this._nativeChildrenObserver){this._processSlotMutations(this._nativeChildrenObserver.takeRecords())}else if(this._shadyChildrenObserver){this._processSlotMutations(this._shadyChildrenObserver.takeRecords())}this._scheduled=!1;// process removals
for(var info={target:this._target,addedNodes:[],removedNodes:[]},newNodes=this.constructor.getFlattenedNodes(this._target),splices=calculateSplices(newNodes,this._effectiveNodes),_i36=0,s;_i36<splices.length&&(s=splices[_i36]);_i36++){for(var j=0,n;j<s.removed.length&&(n=s.removed[j]);j++){info.removedNodes.push(n)}}// process adds
for(var _i37=0,_s2;_i37<splices.length&&(_s2=splices[_i37]);_i37++){for(var _j2=_s2.index;_j2<_s2.index+_s2.addedCount;_j2++){info.addedNodes.push(newNodes[_j2])}}// update cache
this._effectiveNodes=newNodes;var didFlush=!1;if(info.addedNodes.length||info.removedNodes.length){didFlush=!0;this.callback.call(this._target,info)}return didFlush}/**
     * @param {!Array<!Node>|!NodeList<!Node>} nodeList Nodes that could change
     * @return {void}
     * @private
     */},{key:"_listenSlots",value:function _listenSlots(nodeList){for(var _i38=0,n;_i38<nodeList.length;_i38++){n=nodeList[_i38];if(isSlot(n)){n.addEventListener("slotchange",this._boundSchedule)}}}/**
     * @param {!Array<!Node>|!NodeList<!Node>} nodeList Nodes that could change
     * @return {void}
     * @private
     */},{key:"_unlistenSlots",value:function _unlistenSlots(nodeList){for(var _i39=0,n;_i39<nodeList.length;_i39++){n=nodeList[_i39];if(isSlot(n)){n.removeEventListener("slotchange",this._boundSchedule)}}}}]);return FlattenedNodesObserver}();_exports.FlattenedNodesObserver=FlattenedNodesObserver;var flattenedNodesObserver={FlattenedNodesObserver:FlattenedNodesObserver};_exports.$flattenedNodesObserver=flattenedNodesObserver;var flush$1=function flush$1(){var shadyDOM,debouncers;do{shadyDOM=window.ShadyDOM&&ShadyDOM.flush();if(window.ShadyCSS&&window.ShadyCSS.ScopingShim){window.ShadyCSS.ScopingShim.flush()}debouncers=flushDebouncers()}while(shadyDOM||debouncers)};_exports.flush$1=_exports.flush=flush$1;var flush$2={enqueueDebouncer:enqueueDebouncer,flush:flush$1};/* eslint-enable no-unused-vars */_exports.$flush=flush$2;var p=Element.prototype,normalizedMatchesSelector=p.matches||p.matchesSelector||p.mozMatchesSelector||p.msMatchesSelector||p.oMatchesSelector||p.webkitMatchesSelector,matchesSelector=function matchesSelector(node,selector){return normalizedMatchesSelector.call(node,selector)};/**
                              * @const {function(this:Node, string): boolean}
                              */_exports.matchesSelector=matchesSelector;/**
    * Node API wrapper class returned from `Polymer.dom.(target)` when
    * `target` is a `Node`.
    * @implements {PolymerDomApi}
    * @unrestricted
    */var DomApiNative=/*#__PURE__*/function(){/**
   * @param {!Node} node Node for which to create a Polymer.dom helper object.
   */function DomApiNative(node){babelHelpers.classCallCheck(this,DomApiNative);if(window.ShadyDOM&&window.ShadyDOM.inUse){window.ShadyDOM.patch(node)}this.node=node}/**
     * Returns an instance of `FlattenedNodesObserver` that
     * listens for node changes on this element.
     *
     * @param {function(this:HTMLElement, { target: !HTMLElement, addedNodes: !Array<!Element>, removedNodes: !Array<!Element> }):void} callback Called when direct or distributed children
     *   of this element changes
     * @return {!PolymerDomApi.ObserveHandle} Observer instance
     * @override
     */babelHelpers.createClass(DomApiNative,[{key:"observeNodes",value:function observeNodes(callback){return new FlattenedNodesObserver(/** @type {!HTMLElement} */this.node,callback)}/**
     * Disconnects an observer previously created via `observeNodes`
     *
     * @param {!PolymerDomApi.ObserveHandle} observerHandle Observer instance
     *   to disconnect.
     * @return {void}
     * @override
     */},{key:"unobserveNodes",value:function unobserveNodes(observerHandle){observerHandle.disconnect()}/**
     * Provided as a backwards-compatible API only.  This method does nothing.
     * @return {void}
     */},{key:"notifyObserver",value:function notifyObserver(){}/**
                       * Returns true if the provided node is contained with this element's
                       * light-DOM children or shadow root, including any nested shadow roots
                       * of children therein.
                       *
                       * @param {Node} node Node to test
                       * @return {boolean} Returns true if the given `node` is contained within
                       *   this element's light or shadow DOM.
                       * @override
                       */},{key:"deepContains",value:function deepContains(node){if(wrap$1(this.node).contains(node)){return!0}var n=node,doc=node.ownerDocument;// walk from node to `this` or `document`
while(n&&n!==doc&&n!==this.node){// use logical parentnode, or native ShadowRoot host
n=wrap$1(n).parentNode||wrap$1(n).host}return n===this.node}/**
     * Returns the root node of this node.  Equivalent to `getRootNode()`.
     *
     * @return {Node} Top most element in the dom tree in which the node
     * exists. If the node is connected to a document this is either a
     * shadowRoot or the document; otherwise, it may be the node
     * itself or a node or document fragment containing it.
     * @override
     */},{key:"getOwnerRoot",value:function getOwnerRoot(){return wrap$1(this.node).getRootNode()}/**
     * For slot elements, returns the nodes assigned to the slot; otherwise
     * an empty array. It is equivalent to `<slot>.addignedNodes({flatten:true})`.
     *
     * @return {!Array<!Node>} Array of assigned nodes
     * @override
     */},{key:"getDistributedNodes",value:function getDistributedNodes(){return"slot"===this.node.localName?wrap$1(this.node).assignedNodes({flatten:!0}):[]}/**
     * Returns an array of all slots this element was distributed to.
     *
     * @return {!Array<!HTMLSlotElement>} Description
     * @override
     */},{key:"getDestinationInsertionPoints",value:function getDestinationInsertionPoints(){var ip$=[],n=wrap$1(this.node).assignedSlot;while(n){ip$.push(n);n=wrap$1(n).assignedSlot}return ip$}/**
     * Calls `importNode` on the `ownerDocument` for this node.
     *
     * @param {!Node} node Node to import
     * @param {boolean} deep True if the node should be cloned deeply during
     *   import
     * @return {Node} Clone of given node imported to this owner document
     */},{key:"importNode",value:function importNode(node,deep){var doc=babelHelpers.instanceof(this.node,Document)?this.node:this.node.ownerDocument;return wrap$1(doc).importNode(node,deep)}/**
     * @return {!Array<!Node>} Returns a flattened list of all child nodes and
     * nodes assigned to child slots.
     * @override
     */},{key:"getEffectiveChildNodes",value:function getEffectiveChildNodes(){return FlattenedNodesObserver.getFlattenedNodes(/** @type {!HTMLElement} */this.node)}/**
     * Returns a filtered list of flattened child elements for this element based
     * on the given selector.
     *
     * @param {string} selector Selector to filter nodes against
     * @return {!Array<!HTMLElement>} List of flattened child elements
     * @override
     */},{key:"queryDistributedElements",value:function queryDistributedElements(selector){for(var c$=this.getEffectiveChildNodes(),list=[],_i40=0,l=c$.length,c;_i40<l&&(c=c$[_i40]);_i40++){if(c.nodeType===Node.ELEMENT_NODE&&matchesSelector(c,selector)){list.push(c)}}return list}/**
     * For shadow roots, returns the currently focused element within this
     * shadow root.
     *
     * return {Node|undefined} Currently focused element
     * @override
     */},{key:"activeElement",get:function get(){var node=this.node;return node._activeElement!==void 0?node._activeElement:node.activeElement}}]);return DomApiNative}();function forwardMethods(proto,methods){for(var _loop=function _loop(_i41){var method=methods[_i41];/* eslint-disable valid-jsdoc */proto[method]=/** @this {DomApiNative} */function(){return this.node[method].apply(this.node,arguments)};/* eslint-enable */},_i41=0;_i41<methods.length;_i41++){_loop(_i41)}}function forwardReadOnlyProperties(proto,properties){for(var _loop2=function _loop2(_i42){var name=properties[_i42];Object.defineProperty(proto,name,{get:function get(){var domApi=/** @type {DomApiNative} */this;return domApi.node[name]},configurable:!0})},_i42=0;_i42<properties.length;_i42++){_loop2(_i42)}}function forwardProperties(proto,properties){for(var _loop3=function _loop3(_i43){var name=properties[_i43];Object.defineProperty(proto,name,{/**
       * @this {DomApiNative}
       * @return {*} .
       */get:function get(){return this.node[name]},/**
       * @this {DomApiNative}
       * @param {*} value .
       */set:function set(value){this.node[name]=value},configurable:!0})},_i43=0;_i43<properties.length;_i43++){_loop3(_i43)}}/**
   * Event API wrapper class returned from `dom.(target)` when
   * `target` is an `Event`.
   */var EventApi=/*#__PURE__*/function(){function EventApi(event){babelHelpers.classCallCheck(this,EventApi);this.event=event}/**
     * Returns the first node on the `composedPath` of this event.
     *
     * @return {!EventTarget} The node this event was dispatched to
     */babelHelpers.createClass(EventApi,[{key:"rootTarget",get:function get(){return this.path[0]}/**
     * Returns the local (re-targeted) target for this event.
     *
     * @return {!EventTarget} The local (re-targeted) target for this event.
     */},{key:"localTarget",get:function get(){return this.event.target}/**
     * Returns the `composedPath` for this event.
     * @return {!Array<!EventTarget>} The nodes this event propagated through
     */},{key:"path",get:function get(){return this.event.composedPath()}}]);return EventApi}();/**
   * @function
   * @param {boolean=} deep
   * @return {!Node}
   */_exports.EventApi=EventApi;DomApiNative.prototype.cloneNode;/**
                                   * @function
                                   * @param {!Node} node
                                   * @return {!Node}
                                   */DomApiNative.prototype.appendChild;/**
                                     * @function
                                     * @param {!Node} newChild
                                     * @param {Node} refChild
                                     * @return {!Node}
                                     */DomApiNative.prototype.insertBefore;/**
                                      * @function
                                      * @param {!Node} node
                                      * @return {!Node}
                                      */DomApiNative.prototype.removeChild;/**
                                     * @function
                                     * @param {!Node} oldChild
                                     * @param {!Node} newChild
                                     * @return {!Node}
                                     */DomApiNative.prototype.replaceChild;/**
                                      * @function
                                      * @param {string} name
                                      * @param {string} value
                                      * @return {void}
                                      */DomApiNative.prototype.setAttribute;/**
                                      * @function
                                      * @param {string} name
                                      * @return {void}
                                      */DomApiNative.prototype.removeAttribute;/**
                                         * @function
                                         * @param {string} selector
                                         * @return {?Element}
                                         */DomApiNative.prototype.querySelector;/**
                                       * @function
                                       * @param {string} selector
                                       * @return {!NodeList<!Element>}
                                       */DomApiNative.prototype.querySelectorAll;/** @type {?Node} */DomApiNative.prototype.parentNode;/** @type {?Node} */DomApiNative.prototype.firstChild;/** @type {?Node} */DomApiNative.prototype.lastChild;/** @type {?Node} */DomApiNative.prototype.nextSibling;/** @type {?Node} */DomApiNative.prototype.previousSibling;/** @type {?HTMLElement} */DomApiNative.prototype.firstElementChild;/** @type {?HTMLElement} */DomApiNative.prototype.lastElementChild;/** @type {?HTMLElement} */DomApiNative.prototype.nextElementSibling;/** @type {?HTMLElement} */DomApiNative.prototype.previousElementSibling;/** @type {!Array<!Node>} */DomApiNative.prototype.childNodes;/** @type {!Array<!HTMLElement>} */DomApiNative.prototype.children;/** @type {?DOMTokenList} */DomApiNative.prototype.classList;/** @type {string} */DomApiNative.prototype.textContent;/** @type {string} */DomApiNative.prototype.innerHTML;var DomApiImpl=DomApiNative;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){/**
   * @private
   * @extends {HTMLElement}
   */var Wrapper=/*#__PURE__*/function(_window$ShadyDOM$Wrap){babelHelpers.inherits(Wrapper,_window$ShadyDOM$Wrap);function Wrapper(){babelHelpers.classCallCheck(this,Wrapper);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(Wrapper).apply(this,arguments))}return Wrapper}(window.ShadyDOM.Wrapper);// copy bespoke API onto wrapper
Object.getOwnPropertyNames(DomApiNative.prototype).forEach(function(prop){if("activeElement"!=prop){Wrapper.prototype[prop]=DomApiNative.prototype[prop]}});// Note, `classList` is here only for legacy compatibility since it does not
// trigger distribution in v1 Shadow DOM.
forwardReadOnlyProperties(Wrapper.prototype,["classList"]);DomApiImpl=Wrapper;Object.defineProperties(EventApi.prototype,{// Returns the "lowest" node in the same root as the event's currentTarget.
// When in `noPatch` mode, this must be calculated by walking the event's
// path.
localTarget:{get:function get(){for(var current=this.event.currentTarget,currentRoot=current&&dom(current).getOwnerRoot(),p$=this.path,_i44=0,e;_i44<p$.length;_i44++){e=p$[_i44];if(dom(e).getOwnerRoot()===currentRoot){return e}}},configurable:!0},path:{get:function get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else{// Methods that can provoke distribution or must return the logical, not
// composed tree.
forwardMethods(DomApiNative.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]);// Properties that should return the logical, not composed tree. Note, `classList`
// is here only for legacy compatibility since it does not trigger distribution
// in v1 Shadow DOM.
forwardReadOnlyProperties(DomApiNative.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]);forwardProperties(DomApiNative.prototype,["textContent","innerHTML","className"])}var DomApi=DomApiImpl;/**
                                   * Legacy DOM and Event manipulation API wrapper factory used to abstract
                                   * differences between native Shadow DOM and "Shady DOM" when polyfilling on
                                   * older browsers.
                                   *
                                   * Note that in Polymer 2.x use of `Polymer.dom` is no longer required and
                                   * in the majority of cases simply facades directly to the standard native
                                   * API.
                                   *
                                   * @summary Legacy DOM and Event manipulation API wrapper factory used to
                                   * abstract differences between native Shadow DOM and "Shady DOM."
                                   * @param {(Node|Event|DomApiNative|EventApi)=} obj Node or event to operate on
                                   * @return {!DomApiNative|!EventApi} Wrapper providing either node API or event API
                                   */_exports.DomApi=DomApi;var dom=function dom(obj){obj=obj||document;if(babelHelpers.instanceof(obj,DomApiImpl)){return(/** @type {!DomApi} */obj)}if(babelHelpers.instanceof(obj,EventApi)){return(/** @type {!EventApi} */obj)}var helper=obj.__domApi;if(!helper){if(babelHelpers.instanceof(obj,Event)){helper=new EventApi(obj)}else{helper=new DomApiImpl(/** @type {Node} */obj)}obj.__domApi=helper}return helper};_exports.dom=dom;var polymer_dom={matchesSelector:matchesSelector,EventApi:EventApi,DomApi:DomApi,dom:dom,flush:flush$1,addDebouncer:enqueueDebouncer};_exports.$polymerDom=polymer_dom;var ShadyDOM$1=window.ShadyDOM,ShadyCSS=window.ShadyCSS;/**
                                   * Return true if node scope is correct.
                                   *
                                   * @param {!Element} node Node to check scope
                                   * @param {!Node} scope Scope reference
                                   * @return {boolean} True if node is in scope
                                   */function sameScope(node,scope){return wrap$1(node).getRootNode()===scope}/**
   * Ensure that elements in a ShadowDOM container are scoped correctly.
   * This function is only needed when ShadyDOM is used and unpatched DOM APIs are used in third party code.
   * This can happen in noPatch mode or when specialized APIs like ranges or tables are used to mutate DOM.
   *
   * @param  {!Element} container Container element to scope
   * @param  {boolean=} shouldObserve if true, start a mutation observer for added nodes to the container
   * @return {?MutationObserver} Returns a new MutationObserver on `container` if `shouldObserve` is true.
   */function _scopeSubtree(container){var shouldObserve=1<arguments.length&&arguments[1]!==void 0?arguments[1]:!1;// If using native ShadowDOM, abort
if(!ShadyDOM$1||!ShadyCSS){return null}// ShadyCSS handles DOM mutations when ShadyDOM does not handle scoping itself
if(!ShadyDOM$1.handlesDynamicScoping){return null}var ScopingShim=ShadyCSS.ScopingShim;// if ScopingShim is not available, abort
if(!ScopingShim){return null}// capture correct scope for container
var containerScope=ScopingShim.scopeForNode(container),root=wrap$1(container).getRootNode(),scopify=function scopify(node){if(!sameScope(node,root)){return}// NOTE: native qSA does not honor scoped DOM, but it is faster, and the same behavior as Polymer v1
var elements=Array.from(ShadyDOM$1.nativeMethods.querySelectorAll.call(node,"*"));elements.push(node);for(var _i45=0,el;_i45<elements.length;_i45++){el=elements[_i45];if(!sameScope(el,root)){continue}var currentScope=ScopingShim.currentScopeForNode(el);if(currentScope!==containerScope){if(""!==currentScope){ScopingShim.unscopeNode(el,currentScope)}ScopingShim.scopeNode(el,containerScope)}}};// scope everything in container
scopify(container);if(shouldObserve){var mo=new MutationObserver(function(mxns){for(var _i46=0,mxn;_i46<mxns.length;_i46++){mxn=mxns[_i46];for(var j=0,addedNode;j<mxn.addedNodes.length;j++){addedNode=mxn.addedNodes[j];if(addedNode.nodeType===Node.ELEMENT_NODE){scopify(addedNode)}}}});mo.observe(container,{childList:!0,subtree:!0});return mo}else{return null}}var scopeSubtree$1={scopeSubtree:_scopeSubtree};_exports.$scopeSubtree=scopeSubtree$1;var bundledImportMeta$1=_objectSpread({},meta,{url:new URL("../node_modules/%40polymer/polymer/lib/legacy/legacy-element-mixin.js",meta.url).href}),styleInterface=window.ShadyCSS,LegacyElementMixin=dedupingMixin(function(base){/**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @implements {Polymer_GestureEventListeners}
   * @implements {Polymer_DirMixin}
   * @extends {HTMLElement}
   * @private
   */var legacyElementBase=DirMixin(GestureEventListeners(ElementMixin(base))),DIRECTION_MAP={x:"pan-x",y:"pan-y",none:"none",all:"auto"},LegacyElement=/*#__PURE__*/function(_legacyElementBase){babelHelpers.inherits(LegacyElement,_legacyElementBase);function LegacyElement(){var _this17;babelHelpers.classCallCheck(this,LegacyElement);_this17=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(LegacyElement).call(this));/** @type {boolean} */_this17.isAttached;/** @type {?WeakMap<!Element, !Object<string, !Function>>} */_this17.__boundListeners;/** @type {?Object<string, ?Function>} */_this17._debouncers;return _this17}/**
       * Forwards `importMeta` from the prototype (i.e. from the info object
       * passed to `Polymer({...})`) to the static API.
       *
       * @return {!Object} The `import.meta` object set on the prototype
       * @suppress {missingProperties} `this` is always in the instance in
       *  closure for some reason even in a static method, rather than the class
       * @nocollapse
       */babelHelpers.createClass(LegacyElement,[{key:"created",/**
       * Legacy callback called during the `constructor`, for overriding
       * by the user.
       * @override
       * @return {void}
       */value:function created(){}/**
                  * Provides an implementation of `connectedCallback`
                  * which adds Polymer legacy API's `attached` method.
                  * @return {void}
                  * @override
                  */},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(LegacyElement.prototype),"connectedCallback",this).call(this);this.isAttached=!0;this.attached()}/**
       * Legacy callback called during `connectedCallback`, for overriding
       * by the user.
       * @override
       * @return {void}
       */},{key:"attached",value:function attached(){}/**
                   * Provides an implementation of `disconnectedCallback`
                   * which adds Polymer legacy API's `detached` method.
                   * @return {void}
                   * @override
                   */},{key:"disconnectedCallback",value:function disconnectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(LegacyElement.prototype),"disconnectedCallback",this).call(this);this.isAttached=!1;this.detached()}/**
       * Legacy callback called during `disconnectedCallback`, for overriding
       * by the user.
       * @override
       * @return {void}
       */},{key:"detached",value:function detached(){}/**
                   * Provides an override implementation of `attributeChangedCallback`
                   * which adds the Polymer legacy API's `attributeChanged` method.
                   * @param {string} name Name of attribute.
                   * @param {?string} old Old value of attribute.
                   * @param {?string} value Current value of attribute.
                   * @param {?string} namespace Attribute namespace.
                   * @return {void}
                   * @override
                   */},{key:"attributeChangedCallback",value:function attributeChangedCallback(name,old,value,namespace){if(old!==value){babelHelpers.get(babelHelpers.getPrototypeOf(LegacyElement.prototype),"attributeChangedCallback",this).call(this,name,old,value,namespace);this.attributeChanged(name,old,value)}}/**
       * Legacy callback called during `attributeChangedChallback`, for overriding
       * by the user.
       * @param {string} name Name of attribute.
       * @param {?string} old Old value of attribute.
       * @param {?string} value Current value of attribute.
       * @return {void}
       * @override
       */},{key:"attributeChanged",value:function attributeChanged(name,old,value){}// eslint-disable-line no-unused-vars
/**
     * Overrides the default `Polymer.PropertyEffects` implementation to
     * add support for class initialization via the `_registered` callback.
     * This is called only when the first instance of the element is created.
     *
     * @return {void}
     * @override
     * @suppress {invalidCasts}
     */},{key:"_initializeProperties",value:function _initializeProperties(){var proto=Object.getPrototypeOf(this);if(!proto.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",proto))){this._registered();// backstop in case the `_registered` implementation does not set this
proto.__hasRegisterFinished=!0}babelHelpers.get(babelHelpers.getPrototypeOf(LegacyElement.prototype),"_initializeProperties",this).call(this);this.root=/** @type {HTMLElement} */this;this.created();// Ensure listeners are applied immediately so that they are
// added before declarative event listeners. This allows an element to
// decorate itself via an event prior to any declarative listeners
// seeing the event. Note, this ensures compatibility with 1.x ordering.
this._applyListeners()}/**
       * Called automatically when an element is initializing.
       * Users may override this method to perform class registration time
       * work. The implementation should ensure the work is performed
       * only once for the class.
       * @protected
       * @return {void}
       * @override
       */},{key:"_registered",value:function _registered(){}/**
                      * Overrides the default `Polymer.PropertyEffects` implementation to
                      * add support for installing `hostAttributes` and `listeners`.
                      *
                      * @return {void}
                      * @override
                      */},{key:"ready",value:function ready(){this._ensureAttributes();babelHelpers.get(babelHelpers.getPrototypeOf(LegacyElement.prototype),"ready",this).call(this)}/**
       * Ensures an element has required attributes. Called when the element
       * is being readied via `ready`. Users should override to set the
       * element's required attributes. The implementation should be sure
       * to check and not override existing attributes added by
       * the user of the element. Typically, setting attributes should be left
       * to the element user and not done here; reasonable exceptions include
       * setting aria roles and focusability.
       * @protected
       * @return {void}
       * @override
       */},{key:"_ensureAttributes",value:function _ensureAttributes(){}/**
                            * Adds element event listeners. Called when the element
                            * is being readied via `ready`. Users should override to
                            * add any required element event listeners.
                            * In performance critical elements, the work done here should be kept
                            * to a minimum since it is done before the element is rendered. In
                            * these elements, consider adding listeners asynchronously so as not to
                            * block render.
                            * @protected
                            * @return {void}
                            * @override
                            */},{key:"_applyListeners",value:function _applyListeners(){}/**
                          * Converts a typed JavaScript value to a string.
                          *
                          * Note this method is provided as backward-compatible legacy API
                          * only.  It is not directly called by any Polymer features. To customize
                          * how properties are serialized to attributes for attribute bindings and
                          * `reflectToAttribute: true` properties as well as this method, override
                          * the `_serializeValue` method provided by `Polymer.PropertyAccessors`.
                          *
                          * @param {*} value Value to deserialize
                          * @return {string | undefined} Serialized value
                          * @override
                          */},{key:"serialize",value:function serialize(value){return this._serializeValue(value)}/**
       * Converts a string to a typed JavaScript value.
       *
       * Note this method is provided as backward-compatible legacy API
       * only.  It is not directly called by any Polymer features.  To customize
       * how attributes are deserialized to properties for in
       * `attributeChangedCallback`, override `_deserializeValue` method
       * provided by `Polymer.PropertyAccessors`.
       *
       * @param {string} value String to deserialize
       * @param {*} type Type to deserialize the string to
       * @return {*} Returns the deserialized value in the `type` given.
       * @override
       */},{key:"deserialize",value:function deserialize(value,type){return this._deserializeValue(value,type)}/**
       * Serializes a property to its associated attribute.
       *
       * Note this method is provided as backward-compatible legacy API
       * only.  It is not directly called by any Polymer features.
       *
       * @param {string} property Property name to reflect.
       * @param {string=} attribute Attribute name to reflect.
       * @param {*=} value Property value to reflect.
       * @return {void}
       * @override
       */},{key:"reflectPropertyToAttribute",value:function reflectPropertyToAttribute(property,attribute,value){this._propertyToAttribute(property,attribute,value)}/**
       * Sets a typed value to an HTML attribute on a node.
       *
       * Note this method is provided as backward-compatible legacy API
       * only.  It is not directly called by any Polymer features.
       *
       * @param {*} value Value to serialize.
       * @param {string} attribute Attribute name to serialize to.
       * @param {Element} node Element to set attribute to.
       * @return {void}
       * @override
       */},{key:"serializeValueToAttribute",value:function serializeValueToAttribute(value,attribute,node){this._valueToNodeAttribute(/** @type {Element} */node||this,value,attribute)}/**
       * Copies own properties (including accessor descriptors) from a source
       * object to a target object.
       *
       * @param {Object} prototype Target object to copy properties to.
       * @param {Object} api Source object to copy properties from.
       * @return {Object} prototype object that was passed as first argument.
       * @override
       */},{key:"extend",value:function extend(prototype,api){if(!(prototype&&api)){return prototype||api}for(var n$=Object.getOwnPropertyNames(api),_i47=0,n,pd;_i47<n$.length&&(n=n$[_i47]);_i47++){pd=Object.getOwnPropertyDescriptor(api,n);if(pd){Object.defineProperty(prototype,n,pd)}}return prototype}/**
       * Copies props from a source object to a target object.
       *
       * Note, this method uses a simple `for...in` strategy for enumerating
       * properties.  To ensure only `ownProperties` are copied from source
       * to target and that accessor implementations are copied, use `extend`.
       *
       * @param {!Object} target Target object to copy properties to.
       * @param {!Object} source Source object to copy properties from.
       * @return {!Object} Target object that was passed as first argument.
       * @override
       */},{key:"mixin",value:function mixin(target,source){for(var _i48 in source){target[_i48]=source[_i48]}return target}/**
       * Sets the prototype of an object.
       *
       * Note this method is provided as backward-compatible legacy API
       * only.  It is not directly called by any Polymer features.
       * @param {Object} object The object on which to set the prototype.
       * @param {Object} prototype The prototype that will be set on the given
       * `object`.
       * @return {Object} Returns the given `object` with its prototype set
       * to the given `prototype` object.
       * @override
       */},{key:"chainObject",value:function chainObject(object,prototype){if(object&&prototype&&object!==prototype){object.__proto__=prototype}return object}/* **** Begin Template **** */ /**
                                      * Calls `importNode` on the `content` of the `template` specified and
                                      * returns a document fragment containing the imported content.
                                      *
                                      * @param {HTMLTemplateElement} template HTML template element to instance.
                                      * @return {!DocumentFragment} Document fragment containing the imported
                                      *   template content.
                                      * @override
                                      * @suppress {missingProperties} go/missingfnprops
                                      */},{key:"instanceTemplate",value:function instanceTemplate(template){var content=this.constructor._contentForTemplate(template),dom=/** @type {!DocumentFragment} */document.importNode(content,!0);return dom}/* **** Begin Events **** */ /**
                                    * Dispatches a custom event with an optional detail value.
                                    *
                                    * @param {string} type Name of event type.
                                    * @param {*=} detail Detail value containing event-specific
                                    *   payload.
                                    * @param {{ bubbles: (boolean|undefined), cancelable: (boolean|undefined),
                                    *     composed: (boolean|undefined) }=}
                                    *  options Object specifying options.  These may include:
                                    *  `bubbles` (boolean, defaults to `true`),
                                    *  `cancelable` (boolean, defaults to false), and
                                    *  `node` on which to fire the event (HTMLElement, defaults to `this`).
                                    * @return {!Event} The new event that was fired.
                                    * @override
                                    */},{key:"fire",value:function fire(type,detail,options){options=options||{};detail=null===detail||detail===void 0?{}:detail;var event=new Event(type,{bubbles:options.bubbles===void 0?!0:options.bubbles,cancelable:!!options.cancelable,composed:options.composed===void 0?!0:options.composed});event.detail=detail;var node=options.node||this;wrap$1(node).dispatchEvent(event);return event}/**
       * Convenience method to add an event listener on a given element,
       * late bound to a named method on this element.
       *
       * @param {?EventTarget} node Element to add event listener to.
       * @param {string} eventName Name of event to listen for.
       * @param {string} methodName Name of handler method on `this` to call.
       * @return {void}
       * @override
       */},{key:"listen",value:function listen(node,eventName,methodName){node=/** @type {!EventTarget} */node||this;var hbl=this.__boundListeners||(this.__boundListeners=new WeakMap),bl=hbl.get(node);if(!bl){bl={};hbl.set(node,bl)}var key=eventName+methodName;if(!bl[key]){bl[key]=this._addMethodEventListenerToNode(/** @type {!Node} */node,eventName,methodName,this)}}/**
       * Convenience method to remove an event listener from a given element,
       * late bound to a named method on this element.
       *
       * @param {?EventTarget} node Element to remove event listener from.
       * @param {string} eventName Name of event to stop listening to.
       * @param {string} methodName Name of handler method on `this` to not call
       anymore.
       * @return {void}
       * @override
       */},{key:"unlisten",value:function unlisten(node,eventName,methodName){node=/** @type {!EventTarget} */node||this;var bl=this.__boundListeners&&this.__boundListeners.get(/** @type {!Element} */node),key=eventName+methodName,handler=bl&&bl[key];if(handler){this._removeEventListenerFromNode(/** @type {!Node} */node,eventName,handler);bl[key]=/** @type {?} */null}}/**
       * Override scrolling behavior to all direction, one direction, or none.
       *
       * Valid scroll directions:
       *   - 'all': scroll in any direction
       *   - 'x': scroll only in the 'x' direction
       *   - 'y': scroll only in the 'y' direction
       *   - 'none': disable scrolling for this node
       *
       * @param {string=} direction Direction to allow scrolling
       * Defaults to `all`.
       * @param {Element=} node Element to apply scroll direction setting.
       * Defaults to `this`.
       * @return {void}
       * @override
       */},{key:"setScrollDirection",value:function setScrollDirection(direction,node){setTouchAction(/** @type {!Element} */node||this,DIRECTION_MAP[direction]||"auto")}/* **** End Events **** */ /**
                                  * Convenience method to run `querySelector` on this local DOM scope.
                                  *
                                  * This function calls `Polymer.dom(this.root).querySelector(slctr)`.
                                  *
                                  * @param {string} slctr Selector to run on this local DOM scope
                                  * @return {Element} Element found by the selector, or null if not found.
                                  * @override
                                  */},{key:"$$",value:function $$(slctr){// Note, no need to `wrap` this because root is always patched
return this.root.querySelector(slctr)}/**
       * Return the element whose local dom within which this element
       * is contained. This is a shorthand for
       * `this.getRootNode().host`.
       * @this {Element}
       * @return {?Node} The element whose local dom within which this element is
       * contained.
       * @override
       */},{key:"distributeContent",/**
       * Force this element to distribute its children to its local dom.
       * This should not be necessary as of Polymer 2.0.2 and is provided only
       * for backwards compatibility.
       * @return {void}
       * @override
       */value:function distributeContent(){var thisEl=/** @type {Element} */this,domApi=/** @type {PolymerDomApi} */dom(thisEl);if(window.ShadyDOM&&domApi.shadowRoot){ShadyDOM.flush()}}/**
       * Returns a list of nodes that are the effective childNodes. The effective
       * childNodes list is the same as the element's childNodes except that
       * any `<content>` elements are replaced with the list of nodes distributed
       * to the `<content>`, the result of its `getDistributedNodes` method.
       * @return {!Array<!Node>} List of effective child nodes.
       * @suppress {invalidCasts} LegacyElementMixin must be applied to an
       *     HTMLElement
       * @override
       */},{key:"getEffectiveChildNodes",value:function getEffectiveChildNodes(){var thisEl=/** @type {Element} */this,domApi=/** @type {PolymerDomApi} */dom(thisEl);return domApi.getEffectiveChildNodes()}/**
       * Returns a list of nodes distributed within this element that match
       * `selector`. These can be dom children or elements distributed to
       * children that are insertion points.
       * @param {string} selector Selector to run.
       * @return {!Array<!Node>} List of distributed elements that match selector.
       * @suppress {invalidCasts} LegacyElementMixin must be applied to an
       * HTMLElement
       * @override
       */},{key:"queryDistributedElements",value:function queryDistributedElements(selector){var thisEl=/** @type {Element} */this,domApi=/** @type {PolymerDomApi} */dom(thisEl);return domApi.queryDistributedElements(selector)}/**
       * Returns a list of elements that are the effective children. The effective
       * children list is the same as the element's children except that
       * any `<content>` elements are replaced with the list of elements
       * distributed to the `<content>`.
       *
       * @return {!Array<!Node>} List of effective children.
       * @override
       */},{key:"getEffectiveChildren",value:function getEffectiveChildren(){var list=this.getEffectiveChildNodes();return list.filter(function(/** @type {!Node} */n){return n.nodeType===Node.ELEMENT_NODE})}/**
       * Returns a string of text content that is the concatenation of the
       * text content's of the element's effective childNodes (the elements
       * returned by <a href="#getEffectiveChildNodes>getEffectiveChildNodes</a>.
       *
       * @return {string} List of effective children.
       * @override
       */},{key:"getEffectiveTextContent",value:function getEffectiveTextContent(){for(var cn=this.getEffectiveChildNodes(),tc=[],_i49=0,c;c=cn[_i49];_i49++){if(c.nodeType!==Node.COMMENT_NODE){tc.push(c.textContent)}}return tc.join("")}/**
       * Returns the first effective childNode within this element that
       * match `selector`. These can be dom child nodes or elements distributed
       * to children that are insertion points.
       * @param {string} selector Selector to run.
       * @return {Node} First effective child node that matches selector.
       * @override
       */},{key:"queryEffectiveChildren",value:function queryEffectiveChildren(selector){var e$=this.queryDistributedElements(selector);return e$&&e$[0]}/**
       * Returns a list of effective childNodes within this element that
       * match `selector`. These can be dom child nodes or elements distributed
       * to children that are insertion points.
       * @param {string} selector Selector to run.
       * @return {!Array<!Node>} List of effective child nodes that match
       *     selector.
       * @override
       */},{key:"queryAllEffectiveChildren",value:function queryAllEffectiveChildren(selector){return this.queryDistributedElements(selector)}/**
       * Returns a list of nodes distributed to this element's `<slot>`.
       *
       * If this element contains more than one `<slot>` in its local DOM,
       * an optional selector may be passed to choose the desired content.
       *
       * @param {string=} slctr CSS selector to choose the desired
       *   `<slot>`.  Defaults to `content`.
       * @return {!Array<!Node>} List of distributed nodes for the `<slot>`.
       * @override
       */},{key:"getContentChildNodes",value:function getContentChildNodes(slctr){// Note, no need to `wrap` this because root is always
var content=this.root.querySelector(slctr||"slot");return content?/** @type {PolymerDomApi} */dom(content).getDistributedNodes():[]}/**
       * Returns a list of element children distributed to this element's
       * `<slot>`.
       *
       * If this element contains more than one `<slot>` in its
       * local DOM, an optional selector may be passed to choose the desired
       * content.  This method differs from `getContentChildNodes` in that only
       * elements are returned.
       *
       * @param {string=} slctr CSS selector to choose the desired
       *   `<content>`.  Defaults to `content`.
       * @return {!Array<!HTMLElement>} List of distributed nodes for the
       *   `<slot>`.
       * @suppress {invalidCasts}
       * @override
       */},{key:"getContentChildren",value:function getContentChildren(slctr){var children=/** @type {!Array<!HTMLElement>} */this.getContentChildNodes(slctr).filter(function(n){return n.nodeType===Node.ELEMENT_NODE});return children}/**
       * Checks whether an element is in this element's light DOM tree.
       *
       * @param {?Node} node The element to be checked.
       * @return {boolean} true if node is in this element's light DOM tree.
       * @suppress {invalidCasts} LegacyElementMixin must be applied to an
       * HTMLElement
       * @override
       */},{key:"isLightDescendant",value:function isLightDescendant(node){var thisNode=/** @type {Node} */this;return thisNode!==node&&wrap$1(thisNode).contains(node)&&wrap$1(thisNode).getRootNode()===wrap$1(node).getRootNode()}/**
       * Checks whether an element is in this element's local DOM tree.
       *
       * @param {!Element} node The element to be checked.
       * @return {boolean} true if node is in this element's local DOM tree.
       * @override
       */},{key:"isLocalDescendant",value:function isLocalDescendant(node){return this.root===wrap$1(node).getRootNode()}/**
       * No-op for backwards compatibility. This should now be handled by
       * ShadyCss library.
       * @param  {!Element} container Container element to scope
       * @param  {boolean=} shouldObserve if true, start a mutation observer for added nodes to the container
       * @return {?MutationObserver} Returns a new MutationObserver on `container` if `shouldObserve` is true.
       * @override
       */},{key:"scopeSubtree",value:function scopeSubtree(container){var shouldObserve=1<arguments.length&&arguments[1]!==void 0?arguments[1]:!1;return _scopeSubtree(container,shouldObserve)}/**
       * Returns the computed style value for the given property.
       * @param {string} property The css property name.
       * @return {string} Returns the computed css property value for the given
       * `property`.
       * @suppress {invalidCasts} LegacyElementMixin must be applied to an
       *     HTMLElement
       * @override
       */},{key:"getComputedStyleValue",value:function getComputedStyleValue(property){return styleInterface.getComputedStyleValue(/** @type {!Element} */this,property)}// debounce
/**
     * Call `debounce` to collapse multiple requests for a named task into
     * one invocation which is made after the wait time has elapsed with
     * no new request.  If no wait time is given, the callback will be called
     * at microtask timing (guaranteed before paint).
     *
     *     debouncedClickAction(e) {
     *       // will not call `processClick` more than once per 100ms
     *       this.debounce('click', function() {
     *        this.processClick();
     *       } 100);
     *     }
     *
     * @param {string} jobName String to identify the debounce job.
     * @param {function():void} callback Function that is called (with `this`
     *   context) when the wait time elapses.
     * @param {number=} wait Optional wait time in milliseconds (ms) after the
     *   last signal that must elapse before invoking `callback`
     * @return {!Object} Returns a debouncer object on which exists the
     * following methods: `isActive()` returns true if the debouncer is
     * active; `cancel()` cancels the debouncer if it is active;
     * `flush()` immediately invokes the debounced callback if the debouncer
     * is active.
     * @override
     */},{key:"debounce",value:function debounce(jobName,callback,wait){this._debouncers=this._debouncers||{};return this._debouncers[jobName]=Debouncer.debounce(this._debouncers[jobName],0<wait?timeOut.after(wait):microTask,callback.bind(this))}/**
       * Returns whether a named debouncer is active.
       *
       * @param {string} jobName The name of the debouncer started with `debounce`
       * @return {boolean} Whether the debouncer is active (has not yet fired).
       * @override
       */},{key:"isDebouncerActive",value:function isDebouncerActive(jobName){this._debouncers=this._debouncers||{};var debouncer=this._debouncers[jobName];return!!(debouncer&&debouncer.isActive())}/**
       * Immediately calls the debouncer `callback` and inactivates it.
       *
       * @param {string} jobName The name of the debouncer started with `debounce`
       * @return {void}
       * @override
       */},{key:"flushDebouncer",value:function flushDebouncer(jobName){this._debouncers=this._debouncers||{};var debouncer=this._debouncers[jobName];if(debouncer){debouncer.flush()}}/**
       * Cancels an active debouncer.  The `callback` will not be called.
       *
       * @param {string} jobName The name of the debouncer started with `debounce`
       * @return {void}
       * @override
       */},{key:"cancelDebouncer",value:function cancelDebouncer(jobName){this._debouncers=this._debouncers||{};var debouncer=this._debouncers[jobName];if(debouncer){debouncer.cancel()}}/**
       * Runs a callback function asynchronously.
       *
       * By default (if no waitTime is specified), async callbacks are run at
       * microtask timing, which will occur before paint.
       *
       * @param {!Function} callback The callback function to run, bound to
       *     `this`.
       * @param {number=} waitTime Time to wait before calling the
       *   `callback`.  If unspecified or 0, the callback will be run at microtask
       *   timing (before paint).
       * @return {number} Handle that may be used to cancel the async job.
       * @override
       */},{key:"async",value:function async(callback,waitTime){return 0<waitTime?timeOut.run(callback.bind(this),waitTime):~microTask.run(callback.bind(this))}/**
       * Cancels an async operation started with `async`.
       *
       * @param {number} handle Handle returned from original `async` call to
       *   cancel.
       * @return {void}
       * @override
       */},{key:"cancelAsync",value:function cancelAsync(handle){0>handle?microTask.cancel(~handle):timeOut.cancel(handle)}// other
/**
     * Convenience method for creating an element and configuring it.
     *
     * @param {string} tag HTML element tag to create.
     * @param {Object=} props Object of properties to configure on the
     *    instance.
     * @return {!Element} Newly created and configured element.
     * @override
     */},{key:"create",value:function create(tag,props){var elt=document.createElement(tag);if(props){if(elt.setProperties){elt.setProperties(props)}else{for(var n in props){elt[n]=props[n]}}}return elt}/**
       * Polyfill for Element.prototype.matches, which is sometimes still
       * prefixed.
       *
       * @param {string} selector Selector to test.
       * @param {!Element=} node Element to test the selector against.
       * @return {boolean} Whether the element matches the selector.
       * @override
       */},{key:"elementMatches",value:function elementMatches(selector,node){return matchesSelector(node||this,selector)}/**
       * Toggles an HTML attribute on or off.
       *
       * @param {string} name HTML attribute name
       * @param {boolean=} bool Boolean to force the attribute on or off.
       *    When unspecified, the state of the attribute will be reversed.
       * @return {boolean} true if the attribute now exists
       * @override
       */},{key:"toggleAttribute",value:function toggleAttribute(name,bool){var node=/** @type {Element} */this;if(3===arguments.length){node=/** @type {Element} */arguments[2]}if(1==arguments.length){bool=!node.hasAttribute(name)}if(bool){wrap$1(node).setAttribute(name,"");return!0}else{wrap$1(node).removeAttribute(name);return!1}}/**
       * Toggles a CSS class on or off.
       *
       * @param {string} name CSS class name
       * @param {boolean=} bool Boolean to force the class on or off.
       *    When unspecified, the state of the class will be reversed.
       * @param {Element=} node Node to target.  Defaults to `this`.
       * @return {void}
       * @override
       */},{key:"toggleClass",value:function toggleClass(name,bool,node){node=/** @type {Element} */node||this;if(1==arguments.length){bool=!node.classList.contains(name)}if(bool){node.classList.add(name)}else{node.classList.remove(name)}}/**
       * Cross-platform helper for setting an element's CSS `transform` property.
       *
       * @param {string} transformText Transform setting.
       * @param {Element=} node Element to apply the transform to.
       * Defaults to `this`
       * @return {void}
       * @override
       */},{key:"transform",value:function transform(transformText,node){node=/** @type {Element} */node||this;node.style.webkitTransform=transformText;node.style.transform=transformText}/**
       * Cross-platform helper for setting an element's CSS `translate3d`
       * property.
       *
       * @param {number|string} x X offset.
       * @param {number|string} y Y offset.
       * @param {number|string} z Z offset.
       * @param {Element=} node Element to apply the transform to.
       * Defaults to `this`.
       * @return {void}
       * @override
       */},{key:"translate3d",value:function translate3d(x,y,z,node){node=/** @type {Element} */node||this;this.transform("translate3d("+x+","+y+","+z+")",node)}/**
       * Removes an item from an array, if it exists.
       *
       * If the array is specified by path, a change notification is
       * generated, so that observers, data bindings and computed
       * properties watching that path can update.
       *
       * If the array is passed directly, **no change
       * notification is generated**.
       *
       * @param {string | !Array<number|string>} arrayOrPath Path to array from
       *     which to remove the item
       *   (or the array itself).
       * @param {*} item Item to remove.
       * @return {Array} Array containing item removed.
       * @override
       */},{key:"arrayDelete",value:function arrayDelete(arrayOrPath,item){var index;if(Array.isArray(arrayOrPath)){index=arrayOrPath.indexOf(item);if(0<=index){return arrayOrPath.splice(index,1)}}else{var arr=_get(this,arrayOrPath);index=arr.indexOf(item);if(0<=index){return this.splice(arrayOrPath,index,1)}}return null}// logging
/**
     * Facades `console.log`/`warn`/`error` as override point.
     *
     * @param {string} level One of 'log', 'warn', 'error'
     * @param {Array} args Array of strings or objects to log
     * @return {void}
     * @override
     */},{key:"_logger",value:function _logger(level,args){var _console;// accept ['foo', 'bar'] and [['foo', 'bar']]
if(Array.isArray(args)&&1===args.length&&Array.isArray(args[0])){args=args[0]}switch(level){case"log":case"warn":case"error":(_console=console)[level].apply(_console,babelHelpers.toConsumableArray(args));}}/**
       * Facades `console.log` as an override point.
       *
       * @param {...*} args Array of strings or objects to log
       * @return {void}
       * @override
       */},{key:"_log",value:function _log(){for(var _len4=arguments.length,args=Array(_len4),_key4=0;_key4<_len4;_key4++){args[_key4]=arguments[_key4]}this._logger("log",args)}/**
       * Facades `console.warn` as an override point.
       *
       * @param {...*} args Array of strings or objects to log
       * @return {void}
       * @override
       */},{key:"_warn",value:function _warn(){for(var _len5=arguments.length,args=Array(_len5),_key5=0;_key5<_len5;_key5++){args[_key5]=arguments[_key5]}this._logger("warn",args)}/**
       * Facades `console.error` as an override point.
       *
       * @param {...*} args Array of strings or objects to log
       * @return {void}
       * @override
       */},{key:"_error",value:function _error(){for(var _len6=arguments.length,args=Array(_len6),_key6=0;_key6<_len6;_key6++){args[_key6]=arguments[_key6]}this._logger("error",args)}/**
       * Formats a message using the element type an a method name.
       *
       * @param {string} methodName Method name to associate with message
       * @param {...*} args Array of strings or objects to log
       * @return {Array} Array with formatting information for `console`
       *   logging.
       * @override
       */},{key:"_logf",value:function _logf(methodName){for(var _len7=arguments.length,args=Array(1<_len7?_len7-1:0),_key7=1;_key7<_len7;_key7++){args[_key7-1]=arguments[_key7]}return["[%s::%s]",this.is,methodName].concat(args)}},{key:"domHost",get:function get(){var root=wrap$1(this).getRootNode();return babelHelpers.instanceof(root,DocumentFragment)?/** @type {ShadowRoot} */root.host:root}}],[{key:"importMeta",get:function get(){return this.prototype.importMeta}}]);return LegacyElement}(legacyElementBase);/**
                                                                                     * Map of simple names to touch action names
                                                                                     * @dict
                                                                                     */LegacyElement.prototype.is="";return LegacyElement});_exports.LegacyElementMixin=LegacyElementMixin;var legacyElementMixin={LegacyElementMixin:LegacyElementMixin};_exports.$legacyElementMixin=legacyElementMixin;var lifecycleProps={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},excludeOnInfo={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},excludeOnBehaviors=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},excludeOnInfo);function copyProperties(source,target,excludeProps){for(var noAccessors=source._noAccessors,propertyNames=Object.getOwnPropertyNames(source),_i50=0,_p13;_i50<propertyNames.length;_i50++){_p13=propertyNames[_i50];if(_p13 in excludeProps){continue}if(noAccessors){target[_p13]=source[_p13]}else{var pd=Object.getOwnPropertyDescriptor(source,_p13);if(pd){// ensure property is configurable so that a later behavior can
// re-configure it.
pd.configurable=!0;Object.defineProperty(target,_p13,pd)}}}}/**
   * Applies a "legacy" behavior or array of behaviors to the provided class.
   *
   * Note: this method will automatically also apply the `LegacyElementMixin`
   * to ensure that any legacy behaviors can rely on legacy Polymer API on
   * the underlying element.
   *
   * @function
   * @template T
   * @param {!Object|!Array<!Object>} behaviors Behavior object or array of behaviors.
   * @param {function(new:T)} klass Element class.
   * @return {?} Returns a new Element class extended by the
   * passed in `behaviors` and also by `LegacyElementMixin`.
   * @suppress {invalidCasts, checkTypes}
   */function mixinBehaviors(behaviors,klass){return GenerateClassFromInfo({},LegacyElementMixin(klass),behaviors)}// NOTE:
// 1.x
// Behaviors were mixed in *in reverse order* and de-duped on the fly.
// The rule was that behavior properties were copied onto the element
// prototype if and only if the property did not already exist.
// Given: Polymer{ behaviors: [A, B, C, A, B]}, property copy order was:
// (1), B, (2), A, (3) C. This means prototype properties win over
// B properties win over A win over C. This mirrors what would happen
// with inheritance if element extended B extended A extended C.
//
// Again given, Polymer{ behaviors: [A, B, C, A, B]}, the resulting
// `behaviors` array was [C, A, B].
// Behavior lifecycle methods were called in behavior array order
// followed by the element, e.g. (1) C.created, (2) A.created,
// (3) B.created, (4) element.created. There was no support for
// super, and "super-behavior" methods were callable only by name).
//
// 2.x
// Behaviors are made into proper mixins which live in the
// element's prototype chain. Behaviors are placed in the element prototype
// eldest to youngest and de-duped youngest to oldest:
// So, first [A, B, C, A, B] becomes [C, A, B] then,
// the element prototype becomes (oldest) (1) PolymerElement, (2) class(C),
// (3) class(A), (4) class(B), (5) class(Polymer({...})).
// Result:
// This means element properties win over B properties win over A win
// over C. (same as 1.x)
// If lifecycle is called (super then me), order is
// (1) C.created, (2) A.created, (3) B.created, (4) element.created
// (again same as 1.x)
function applyBehaviors(proto,behaviors,lifecycle){for(var _i51=0;_i51<behaviors.length;_i51++){applyInfo(proto,behaviors[_i51],lifecycle,excludeOnBehaviors)}}function applyInfo(proto,info,lifecycle,excludeProps){copyProperties(info,proto,excludeProps);for(var _p14 in lifecycleProps){if(info[_p14]){lifecycle[_p14]=lifecycle[_p14]||[];lifecycle[_p14].push(info[_p14])}}}/**
   * @param {Array} behaviors List of behaviors to flatten.
   * @param {Array=} list Target list to flatten behaviors into.
   * @param {Array=} exclude List of behaviors to exclude from the list.
   * @return {!Array} Returns the list of flattened behaviors.
   */function flattenBehaviors(behaviors,list,exclude){list=list||[];for(var _i52=behaviors.length-1,b;0<=_i52;_i52--){b=behaviors[_i52];if(b){if(Array.isArray(b)){flattenBehaviors(b,list)}else{// dedup
if(0>list.indexOf(b)&&(!exclude||0>exclude.indexOf(b))){list.unshift(b)}}}else{console.warn("behavior is null, check for missing or 404 import")}}return list}/**
   * Copies property descriptors from source to target, overwriting all fields
   * of any previous descriptor for a property *except* for `value`, which is
   * merged in from the target if it does not exist on the source.
   *
   * @param {*} target Target properties object
   * @param {*} source Source properties object
   */function mergeProperties(target,source){for(var _p15 in source){var targetInfo=target[_p15],sourceInfo=source[_p15];if(!("value"in sourceInfo)&&targetInfo&&"value"in targetInfo){target[_p15]=Object.assign({value:targetInfo.value},sourceInfo)}else{target[_p15]=sourceInfo}}}/* Note about construction and extension of legacy classes.
    [Changed in Q4 2018 to optimize performance.]
  
    When calling `Polymer` or `mixinBehaviors`, the generated class below is
    made. The list of behaviors was previously made into one generated class per
    behavior, but this is no longer the case as behaviors are now called
    manually. Note, there may *still* be multiple generated classes in the
    element's prototype chain if extension is used with `mixinBehaviors`.
  
    The generated class is directly tied to the info object and behaviors
    used to create it. That list of behaviors is filtered so it's only the
    behaviors not active on the superclass. In order to call through to the
    entire list of lifecycle methods, it's important to call `super`.
  
    The element's `properties` and `observers` are controlled via the finalization
    mechanism provided by `PropertiesMixin`. `Properties` and `observers` are
    collected by manually traversing the prototype chain and merging.
  
    To limit changes, the `_registered` method is called via `_initializeProperties`
    and not `_finalizeClass`.
  
  */ /**
      * @param {!PolymerInit} info Polymer info object
      * @param {function(new:HTMLElement)} Base base class to extend with info object
      * @param {Object=} behaviors behaviors to copy into the element
      * @return {function(new:HTMLElement)} Generated class
      * @suppress {checkTypes}
      * @private
      */function GenerateClassFromInfo(info,Base,behaviors){// manages behavior and lifecycle processing (filled in after class definition)
var behaviorList,lifecycle={},PolymerGenerated=/*#__PURE__*/function(_Base){babelHelpers.inherits(PolymerGenerated,_Base);function PolymerGenerated(){babelHelpers.classCallCheck(this,PolymerGenerated);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(PolymerGenerated).apply(this,arguments))}babelHelpers.createClass(PolymerGenerated,[{key:"created",/**
       * @return {void}
       */value:function created(){babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"created",this).call(this);var list=lifecycle.created;if(list){for(var _i53=0;_i53<list.length;_i53++){list[_i53].call(this)}}}/**
       * @return {void}
       */},{key:"_registered",value:function _registered(){/* NOTE: `beforeRegister` is called here for bc, but the behavior
        is different than in 1.x. In 1.0, the method was called *after*
        mixing prototypes together but *before* processing of meta-objects.
        However, dynamic effects can still be set here and can be done either
        in `beforeRegister` or `registered`. It is no longer possible to set
        `is` in `beforeRegister` as you could in 1.x.
      */ // only proceed if the generated class' prototype has not been registered.
var generatedProto=PolymerGenerated.prototype;if(!generatedProto.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",generatedProto))){generatedProto.__hasRegisterFinished=!0;// ensure superclass is registered first.
babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"_registered",this).call(this);// copy properties onto the generated class lazily if we're optimizing,
if(legacyOptimizations){copyPropertiesToProto(generatedProto)}// make sure legacy lifecycle is called on the *element*'s prototype
// and not the generated class prototype; if the element has been
// extended, these are *not* the same.
var _proto=Object.getPrototypeOf(this),list=lifecycle.beforeRegister;if(list){for(var _i54=0;_i54<list.length;_i54++){list[_i54].call(_proto)}}list=lifecycle.registered;if(list){for(var _i55=0;_i55<list.length;_i55++){list[_i55].call(_proto)}}}}/**
       * @return {void}
       */},{key:"_applyListeners",value:function _applyListeners(){babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"_applyListeners",this).call(this);var list=lifecycle.listeners;if(list){for(var _i56=0,listeners;_i56<list.length;_i56++){listeners=list[_i56];if(listeners){for(var l in listeners){this._addMethodEventListenerToNode(this,l,listeners[l])}}}}}// note: exception to "super then me" rule;
// do work before calling super so that super attributes
// only apply if not already set.
/**
     * @return {void}
     */},{key:"_ensureAttributes",value:function _ensureAttributes(){var list=lifecycle.hostAttributes;if(list){for(var _i57=list.length-1,hostAttributes;0<=_i57;_i57--){hostAttributes=list[_i57];for(var a in hostAttributes){this._ensureAttribute(a,hostAttributes[a])}}}babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"_ensureAttributes",this).call(this)}/**
       * @return {void}
       */},{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"ready",this).call(this);var list=lifecycle.ready;if(list){for(var _i58=0;_i58<list.length;_i58++){list[_i58].call(this)}}}/**
       * @return {void}
       */},{key:"attached",value:function attached(){babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"attached",this).call(this);var list=lifecycle.attached;if(list){for(var _i59=0;_i59<list.length;_i59++){list[_i59].call(this)}}}/**
       * @return {void}
       */},{key:"detached",value:function detached(){babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"detached",this).call(this);var list=lifecycle.detached;if(list){for(var _i60=0;_i60<list.length;_i60++){list[_i60].call(this)}}}/**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       * @return {void}
       */},{key:"attributeChanged",value:function attributeChanged(name,old,value){babelHelpers.get(babelHelpers.getPrototypeOf(PolymerGenerated.prototype),"attributeChanged",this).call(this);var list=lifecycle.attributeChanged;if(list){for(var _i61=0;_i61<list.length;_i61++){list[_i61].call(this,name,old,value)}}}}],[{key:"_finalizeClass",// explicitly not calling super._finalizeClass
/** @nocollapse */value:function _finalizeClass(){// if calling via a subclass that hasn't been generated, pass through to super
if(!this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){// TODO(https://github.com/google/closure-compiler/issues/3240):
//     Change back to just super.methodCall()
Base._finalizeClass.call(this)}else{// interleave properties and observers per behavior and `info`
if(behaviorList){for(var _i62=0,b;_i62<behaviorList.length;_i62++){b=behaviorList[_i62];if(b.properties){this.createProperties(b.properties)}if(b.observers){this.createObservers(b.observers,b.properties)}}}if(info.properties){this.createProperties(info.properties)}if(info.observers){this.createObservers(info.observers,info.properties)}// make sure to prepare the element template
this._prepareTemplate()}}/** @nocollapse */},{key:"properties",get:function get(){var properties={};if(behaviorList){for(var _i63=0;_i63<behaviorList.length;_i63++){mergeProperties(properties,behaviorList[_i63].properties)}}mergeProperties(properties,info.properties);return properties}/** @nocollapse */},{key:"observers",get:function get(){var observers=[];if(behaviorList){for(var _i64=0,b;_i64<behaviorList.length;_i64++){b=behaviorList[_i64];if(b.observers){observers=observers.concat(b.observers)}}}if(info.observers){observers=observers.concat(info.observers)}return observers}}]);return PolymerGenerated}(Base);// apply behaviors, note actual copying is done lazily at first instance creation
if(behaviors){// NOTE: ensure the behavior is extending a class with
// legacy element api. This is necessary since behaviors expect to be able
// to access 1.x legacy api.
if(!Array.isArray(behaviors)){behaviors=[behaviors]}var superBehaviors=Base.prototype.behaviors;// get flattened, deduped list of behaviors *not* already on super class
behaviorList=flattenBehaviors(behaviors,null,superBehaviors);PolymerGenerated.prototype.behaviors=superBehaviors?superBehaviors.concat(behaviors):behaviorList}var copyPropertiesToProto=function copyPropertiesToProto(proto){if(behaviorList){applyBehaviors(proto,behaviorList,lifecycle)}applyInfo(proto,info,lifecycle,excludeOnInfo)};// copy properties if we're not optimizing
if(!legacyOptimizations){copyPropertiesToProto(PolymerGenerated.prototype)}PolymerGenerated.generatedFrom=info;return PolymerGenerated}/**
   * Generates a class that extends `LegacyElement` based on the
   * provided info object.  Metadata objects on the `info` object
   * (`properties`, `observers`, `listeners`, `behaviors`, `is`) are used
   * for Polymer's meta-programming systems, and any functions are copied
   * to the generated class.
   *
   * Valid "metadata" values are as follows:
   *
   * `is`: String providing the tag name to register the element under. In
   * addition, if a `dom-module` with the same id exists, the first template
   * in that `dom-module` will be stamped into the shadow root of this element,
   * with support for declarative event listeners (`on-...`), Polymer data
   * bindings (`[[...]]` and `{{...}}`), and id-based node finding into
   * `this.$`.
   *
   * `properties`: Object describing property-related metadata used by Polymer
   * features (key: property names, value: object containing property metadata).
   * Valid keys in per-property metadata include:
   * - `type` (String|Number|Object|Array|...): Used by
   *   `attributeChangedCallback` to determine how string-based attributes
   *   are deserialized to JavaScript property values.
   * - `notify` (boolean): Causes a change in the property to fire a
   *   non-bubbling event called `<property>-changed`. Elements that have
   *   enabled two-way binding to the property use this event to observe changes.
   * - `readOnly` (boolean): Creates a getter for the property, but no setter.
   *   To set a read-only property, use the private setter method
   *   `_setProperty(property, value)`.
   * - `observer` (string): Observer method name that will be called when
   *   the property changes. The arguments of the method are
   *   `(value, previousValue)`.
   * - `computed` (string): String describing method and dependent properties
   *   for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
   *   Computed properties are read-only by default and can only be changed
   *   via the return value of the computing method.
   *
   * `observers`: Array of strings describing multi-property observer methods
   *  and their dependent properties (e.g. `'observeABC(a, b, c)'`).
   *
   * `listeners`: Object describing event listeners to be added to each
   *  instance of this element (key: event name, value: method name).
   *
   * `behaviors`: Array of additional `info` objects containing metadata
   * and callbacks in the same format as the `info` object here which are
   * merged into this element.
   *
   * `hostAttributes`: Object listing attributes to be applied to the host
   *  once created (key: attribute name, value: attribute value).  Values
   *  are serialized based on the type of the value.  Host attributes should
   *  generally be limited to attributes such as `tabIndex` and `aria-...`.
   *  Attributes in `hostAttributes` are only applied if a user-supplied
   *  attribute is not already present (attributes in markup override
   *  `hostAttributes`).
   *
   * In addition, the following Polymer-specific callbacks may be provided:
   * - `registered`: called after first instance of this element,
   * - `created`: called during `constructor`
   * - `attached`: called during `connectedCallback`
   * - `detached`: called during `disconnectedCallback`
   * - `ready`: called before first `attached`, after all properties of
   *   this element have been propagated to its template and all observers
   *   have run
   *
   * @param {!PolymerInit} info Object containing Polymer metadata and functions
   *   to become class methods.
   * @template T
   * @param {function(T):T} mixin Optional mixin to apply to legacy base class
   *   before extending with Polymer metaprogramming.
   * @return {function(new:HTMLElement)} Generated class
   */var Class=function Class(info,mixin){if(!info){console.warn("Polymer.Class requires `info` argument")}var klass=mixin?mixin(LegacyElementMixin(HTMLElement)):LegacyElementMixin(HTMLElement);klass=GenerateClassFromInfo(info,klass,info.behaviors);// decorate klass with registration info
klass.is=klass.prototype.is=info.is;return klass};_exports.Class=Class;var _class={mixinBehaviors:mixinBehaviors,Class:Class};_exports.$class=_class;var Polymer=function Polymer(info){// if input is a `class` (aka a function with a prototype), use the prototype
// remember that the `constructor` will never be called
var klass;if("function"===typeof info){klass=info}else{klass=Polymer.Class(info)}customElements.define(klass.is,/** @type {!HTMLElement} */klass);return klass};_exports.Polymer$1=_exports.Polymer=Polymer;Polymer.Class=Class;var polymerFn={Polymer:Polymer};_exports.$polymerFn=polymerFn;function mutablePropertyChange(inst,property,value,old,mutableData){var isObject;if(mutableData){isObject="object"===babelHelpers.typeof(value)&&null!==value;// Pull `old` for Objects from temp cache, but treat `null` as a primitive
if(isObject){old=inst.__dataTemp[property]}}// Strict equality check, but return false for NaN===NaN
var shouldChange=old!==value&&(old===old||value===value);// Objects are stored in temporary cache (cleared at end of
// turn), which is used for dirty-checking
if(isObject&&shouldChange){inst.__dataTemp[property]=value}return shouldChange}/**
   * Element class mixin to skip strict dirty-checking for objects and arrays
   * (always consider them to be "dirty"), for use on elements utilizing
   * `PropertyEffects`
   *
   * By default, `PropertyEffects` performs strict dirty checking on
   * objects, which means that any deep modifications to an object or array will
   * not be propagated unless "immutable" data patterns are used (i.e. all object
   * references from the root to the mutation were changed).
   *
   * Polymer also provides a proprietary data mutation and path notification API
   * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
   * mutation and notification of deep changes in an object graph to all elements
   * bound to the same object graph.
   *
   * In cases where neither immutable patterns nor the data mutation API can be
   * used, applying this mixin will cause Polymer to skip dirty checking for
   * objects and arrays (always consider them to be "dirty").  This allows a
   * user to make a deep modification to a bound object graph, and then either
   * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
   * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
   * elements that wish to be updated based on deep mutations must apply this
   * mixin or otherwise skip strict dirty checking for objects/arrays.
   * Specifically, any elements in the binding tree between the source of a
   * mutation and the consumption of it must apply this mixin or enable the
   * `OptionalMutableData` mixin.
   *
   * In order to make the dirty check strategy configurable, see
   * `OptionalMutableData`.
   *
   * Note, the performance characteristics of propagating large object graphs
   * will be worse as opposed to using strict dirty checking with immutable
   * patterns or Polymer's path notification API.
   *
   * @mixinFunction
   * @polymer
   * @summary Element class mixin to skip strict dirty-checking for objects
   *   and arrays
   * @template T
   * @param {function(new:T)} superClass Class to apply mixin to.
   * @return {function(new:T)} superClass with mixin applied.
   */var MutableData=dedupingMixin(function(superClass){/**
   * @polymer
   * @mixinClass
   * @implements {Polymer_MutableData}
   */var MutableData=/*#__PURE__*/function(_superClass4){babelHelpers.inherits(MutableData,_superClass4);function MutableData(){babelHelpers.classCallCheck(this,MutableData);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(MutableData).apply(this,arguments))}babelHelpers.createClass(MutableData,[{key:"_shouldPropertyChange",/**
     * Overrides `PropertyEffects` to provide option for skipping
     * strict equality checking for Objects and Arrays.
     *
     * This method pulls the value to dirty check against from the `__dataTemp`
     * cache (rather than the normal `__data` cache) for Objects.  Since the temp
     * cache is cleared at the end of a turn, this implementation allows
     * side-effects of deep object changes to be processed by re-setting the
     * same object (using the temp cache as an in-turn backstop to prevent
     * cycles due to 2-way notification).
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     * @protected
     */value:function _shouldPropertyChange(property,value,old){return mutablePropertyChange(this,property,value,old,!0)}}]);return MutableData}(superClass);return MutableData});/**
     * Element class mixin to add the optional ability to skip strict
     * dirty-checking for objects and arrays (always consider them to be
     * "dirty") by setting a `mutable-data` attribute on an element instance.
     *
     * By default, `PropertyEffects` performs strict dirty checking on
     * objects, which means that any deep modifications to an object or array will
     * not be propagated unless "immutable" data patterns are used (i.e. all object
     * references from the root to the mutation were changed).
     *
     * Polymer also provides a proprietary data mutation and path notification API
     * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
     * mutation and notification of deep changes in an object graph to all elements
     * bound to the same object graph.
     *
     * In cases where neither immutable patterns nor the data mutation API can be
     * used, applying this mixin will allow Polymer to skip dirty checking for
     * objects and arrays (always consider them to be "dirty").  This allows a
     * user to make a deep modification to a bound object graph, and then either
     * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
     * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
     * elements that wish to be updated based on deep mutations must apply this
     * mixin or otherwise skip strict dirty checking for objects/arrays.
     * Specifically, any elements in the binding tree between the source of a
     * mutation and the consumption of it must enable this mixin or apply the
     * `MutableData` mixin.
     *
     * While this mixin adds the ability to forgo Object/Array dirty checking,
     * the `mutableData` flag defaults to false and must be set on the instance.
     *
     * Note, the performance characteristics of propagating large object graphs
     * will be worse by relying on `mutableData: true` as opposed to using
     * strict dirty checking with immutable patterns or Polymer's path notification
     * API.
     *
     * @mixinFunction
     * @polymer
     * @summary Element class mixin to optionally skip strict dirty-checking
     *   for objects and arrays
     */_exports.MutableData=MutableData;var OptionalMutableData=dedupingMixin(function(superClass){/**
   * @mixinClass
   * @polymer
   * @implements {Polymer_OptionalMutableData}
   */var OptionalMutableData=/*#__PURE__*/function(_superClass5){babelHelpers.inherits(OptionalMutableData,_superClass5);function OptionalMutableData(){babelHelpers.classCallCheck(this,OptionalMutableData);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(OptionalMutableData).apply(this,arguments))}babelHelpers.createClass(OptionalMutableData,[{key:"_shouldPropertyChange",/**
       * Overrides `PropertyEffects` to provide option for skipping
       * strict equality checking for Objects and Arrays.
       *
       * When `this.mutableData` is true on this instance, this method
       * pulls the value to dirty check against from the `__dataTemp` cache
       * (rather than the normal `__data` cache) for Objects.  Since the temp
       * cache is cleared at the end of a turn, this implementation allows
       * side-effects of deep object changes to be processed by re-setting the
       * same object (using the temp cache as an in-turn backstop to prevent
       * cycles due to 2-way notification).
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       * @protected
       */value:function _shouldPropertyChange(property,value,old){return mutablePropertyChange(this,property,value,old,this.mutableData)}}],[{key:"properties",/** @nocollapse */get:function get(){return{/**
         * Instance-level flag for configuring the dirty-checking strategy
         * for this element.  When true, Objects and Arrays will skip dirty
         * checking, otherwise strict equality checking will be used.
         */mutableData:Boolean}}}]);return OptionalMutableData}(superClass);return OptionalMutableData});// Export for use by legacy behavior
_exports.OptionalMutableData=OptionalMutableData;MutableData._mutablePropertyChange=mutablePropertyChange;var mutableData={MutableData:MutableData,OptionalMutableData:OptionalMutableData};// machinery for propagating host properties to children. This is an ES5
// class only because Babel (incorrectly) requires super() in the class
// constructor even though no `this` is used and it returns an instance.
_exports.$mutableData=mutableData;var newInstance=null;/**
                         * @constructor
                         * @extends {HTMLTemplateElement}
                         * @private
                         */function HTMLTemplateElementExtension(){return newInstance}HTMLTemplateElementExtension.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:HTMLTemplateElementExtension,writable:!0}});/**
     * @constructor
     * @implements {Polymer_PropertyEffects}
     * @extends {HTMLTemplateElementExtension}
     * @private
     */var DataTemplate=PropertyEffects(HTMLTemplateElementExtension),MutableDataTemplate=MutableData(DataTemplate);/**
                                                                     * @constructor
                                                                     * @implements {Polymer_MutableData}
                                                                     * @extends {DataTemplate}
                                                                     * @private
                                                                     */ // Applies a DataTemplate subclass to a <template> instance
function upgradeTemplate(template,constructor){newInstance=template;Object.setPrototypeOf(template,constructor.prototype);new constructor;newInstance=null}/**
   * Base class for TemplateInstance.
   * @constructor
   * @extends {HTMLElement}
   * @implements {Polymer_PropertyEffects}
   * @private
   */var templateInstanceBase=PropertyEffects(/*#__PURE__*/ // This cast shouldn't be neccessary, but Closure doesn't understand that
// "class {}" is a constructor function.
/** @type {function(new:Object)} */function(){function _class2(){babelHelpers.classCallCheck(this,_class2)}return _class2}()),TemplateInstanceBase=/*#__PURE__*/function(_templateInstanceBase){babelHelpers.inherits(TemplateInstanceBase,_templateInstanceBase);function TemplateInstanceBase(props){var _this18;babelHelpers.classCallCheck(this,TemplateInstanceBase);_this18=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(TemplateInstanceBase).call(this));_this18._configureProperties(props);/** @type {!StampedTemplate} */_this18.root=_this18._stampTemplate(_this18.__dataHost);// Save list of stamped children
var children=[];/** @suppress {invalidCasts} */_this18.children=/** @type {!NodeList} */children;// Polymer 1.x did not use `Polymer.dom` here so not bothering.
for(var n=_this18.root.firstChild;n;n=n.nextSibling){children.push(n);n.__templatizeInstance=babelHelpers.assertThisInitialized(_this18)}if(_this18.__templatizeOwner&&_this18.__templatizeOwner.__hideTemplateChildren__){_this18._showHideChildren(!0)}// Flush props only when props are passed if instance props exist
// or when there isn't instance props.
var options=_this18.__templatizeOptions;if(props&&options.instanceProps||!options.instanceProps){_this18._enableProperties()}return _this18}/**
     * Configure the given `props` by calling `_setPendingProperty`. Also
     * sets any properties stored in `__hostProps`.
     * @private
     * @param {Object} props Object of property name-value pairs to set.
     * @return {void}
     */babelHelpers.createClass(TemplateInstanceBase,[{key:"_configureProperties",value:function _configureProperties(props){var options=this.__templatizeOptions;if(options.forwardHostProp){for(var hprop in this.__hostProps){this._setPendingProperty(hprop,this.__dataHost["_host_"+hprop])}}// Any instance props passed in the constructor will overwrite host props;
// normally this would be a user error but we don't specifically filter them
for(var iprop in props){this._setPendingProperty(iprop,props[iprop])}}/**
     * Forwards a host property to this instance.  This method should be
     * called on instances from the `options.forwardHostProp` callback
     * to propagate changes of host properties to each instance.
     *
     * Note this method enqueues the change, which are flushed as a batch.
     *
     * @param {string} prop Property or path name
     * @param {*} value Value of the property to forward
     * @return {void}
     */},{key:"forwardHostProp",value:function forwardHostProp(prop,value){if(this._setPendingPropertyOrPath(prop,value,!1,!0)){this.__dataHost._enqueueClient(this)}}/**
     * Override point for adding custom or simulated event handling.
     *
     * @override
     * @param {!Node} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to add
     * @return {void}
     */},{key:"_addEventListenerToNode",value:function _addEventListenerToNode(node,eventName,handler){var _this19=this;if(this._methodHost&&this.__templatizeOptions.parentModel){// If this instance should be considered a parent model, decorate
// events this template instance as `model`
this._methodHost._addEventListenerToNode(node,eventName,function(e){e.model=_this19;handler(e)})}else{// Otherwise delegate to the template's host (which could be)
// another template instance
var templateHost=this.__dataHost.__dataHost;if(templateHost){templateHost._addEventListenerToNode(node,eventName,handler)}}}/**
     * Shows or hides the template instance top level child elements. For
     * text nodes, `textContent` is removed while "hidden" and replaced when
     * "shown."
     * @param {boolean} hide Set to true to hide the children;
     * set to false to show them.
     * @return {void}
     * @protected
     */},{key:"_showHideChildren",value:function _showHideChildren(hide){for(var c=this.children,_i65=0,n;_i65<c.length;_i65++){n=c[_i65];// Ignore non-changes
if(!!hide!=!!n.__hideTemplateChildren__){if(n.nodeType===Node.TEXT_NODE){if(hide){n.__polymerTextContent__=n.textContent;n.textContent=""}else{n.textContent=n.__polymerTextContent__}// remove and replace slot
}else if("slot"===n.localName){if(hide){n.__polymerReplaced__=document.createComment("hidden-slot");wrap$1(wrap$1(n).parentNode).replaceChild(n.__polymerReplaced__,n)}else{var replace=n.__polymerReplaced__;if(replace){wrap$1(wrap$1(replace).parentNode).replaceChild(n,replace)}}}else if(n.style){if(hide){n.__polymerDisplay__=n.style.display;n.style.display="none"}else{n.style.display=n.__polymerDisplay__}}}n.__hideTemplateChildren__=hide;if(n._showHideChildren){n._showHideChildren(hide)}}}/**
     * Overrides default property-effects implementation to intercept
     * textContent bindings while children are "hidden" and cache in
     * private storage for later retrieval.
     *
     * @override
     * @param {!Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @return {void}
     * @protected
     */},{key:"_setUnmanagedPropertyToNode",value:function _setUnmanagedPropertyToNode(node,prop,value){if(node.__hideTemplateChildren__&&node.nodeType==Node.TEXT_NODE&&"textContent"==prop){node.__polymerTextContent__=value}else{babelHelpers.get(babelHelpers.getPrototypeOf(TemplateInstanceBase.prototype),"_setUnmanagedPropertyToNode",this).call(this,node,prop,value)}}/**
     * Find the parent model of this template instance.  The parent model
     * is either another templatize instance that had option `parentModel: true`,
     * or else the host element.
     *
     * @return {!Polymer_PropertyEffects} The parent model of this instance
     */},{key:"dispatchEvent",/**
     * Stub of HTMLElement's `dispatchEvent`, so that effects that may
     * dispatch events safely no-op.
     *
     * @param {Event} event Event to dispatch
     * @return {boolean} Always true.
     * @override
     */value:function dispatchEvent(event){// eslint-disable-line no-unused-vars
return!0}},{key:"parentModel",get:function get(){var model=this.__parentModel;if(!model){var options;model=this;do{// A template instance's `__dataHost` is a <template>
// `model.__dataHost.__dataHost` is the template's host
model=model.__dataHost.__dataHost}while((options=model.__templatizeOptions)&&!options.parentModel);this.__parentModel=model}return model}}]);return TemplateInstanceBase}(templateInstanceBase);/**
                                               * @polymer
                                               * @customElement
                                               * @appliesMixin PropertyEffects
                                               * @unrestricted
                                               */_exports.TemplateInstanceBase=TemplateInstanceBase;/** @type {!DataTemplate} */TemplateInstanceBase.prototype.__dataHost;/** @type {!TemplatizeOptions} */TemplateInstanceBase.prototype.__templatizeOptions;/** @type {!Polymer_PropertyEffects} */TemplateInstanceBase.prototype._methodHost;/** @type {!Object} */TemplateInstanceBase.prototype.__templatizeOwner;/** @type {!Object} */TemplateInstanceBase.prototype.__hostProps;/**
                                             * @constructor
                                             * @extends {TemplateInstanceBase}
                                             * @implements {Polymer_MutableData}
                                             * @private
                                             */var MutableTemplateInstanceBase=MutableData(// This cast shouldn't be necessary, but Closure doesn't seem to understand
// this constructor.
/** @type {function(new:TemplateInstanceBase)} */TemplateInstanceBase);function findMethodHost(template){// Technically this should be the owner of the outermost template.
// In shadow dom, this is always getRootNode().host, but we can
// approximate this via cooperation with our dataHost always setting
// `_methodHost` as long as there were bindings (or id's) on this
// instance causing it to get a dataHost.
var templateHost=template.__dataHost;return templateHost&&templateHost._methodHost||templateHost}/* eslint-disable valid-jsdoc */ /**
                                    * @suppress {missingProperties} class.prototype is not defined for some reason
                                    */function createTemplatizerClass(template,templateInfo,options){/**
   * @constructor
   * @extends {TemplateInstanceBase}
   */var templatizerBase=options.mutableData?MutableTemplateInstanceBase:TemplateInstanceBase;// Affordance for global mixins onto TemplatizeInstance
if(_templatize.mixin){templatizerBase=_templatize.mixin(templatizerBase)}/**
     * Anonymous class created by the templatize
     * @constructor
     * @private
     */var klass=/*#__PURE__*/function(_templatizerBase){babelHelpers.inherits(klass,_templatizerBase);function klass(){babelHelpers.classCallCheck(this,klass);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(klass).apply(this,arguments))}return klass}(templatizerBase);/** @override */klass.prototype.__templatizeOptions=options;klass.prototype._bindTemplate(template);addNotifyEffects(klass,template,templateInfo,options);return klass}/**
   * Adds propagate effects from the template to the template instance for
   * properties that the host binds to the template using the `_host_` prefix.
   * 
   * @suppress {missingProperties} class.prototype is not defined for some reason
   */function addPropagateEffects(template,templateInfo,options){var userForwardHostProp=options.forwardHostProp;if(userForwardHostProp&&templateInfo.hasHostProps){// Provide data API and property effects on memoized template class
var klass=templateInfo.templatizeTemplateClass;if(!klass){/**
       * @constructor
       * @extends {DataTemplate}
       */var templatizedBase=options.mutableData?MutableDataTemplate:DataTemplate;/** @private */klass=templateInfo.templatizeTemplateClass=/*#__PURE__*/function(_templatizedBase){babelHelpers.inherits(TemplatizedTemplate,_templatizedBase);function TemplatizedTemplate(){babelHelpers.classCallCheck(this,TemplatizedTemplate);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(TemplatizedTemplate).apply(this,arguments))}return TemplatizedTemplate}(templatizedBase);// Add template - >instances effects
// and host <- template effects
var hostProps=templateInfo.hostProps;for(var prop in hostProps){klass.prototype._addPropertyEffect("_host_"+prop,klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:createForwardHostPropEffect(prop,userForwardHostProp)});klass.prototype._createNotifyingProperty("_host_"+prop)}}upgradeTemplate(template,klass);// Mix any pre-bound data into __data; no need to flush this to
// instances since they pull from the template at instance-time
if(template.__dataProto){// Note, generally `__dataProto` could be chained, but it's guaranteed
// to not be since this is a vanilla template we just added effects to
Object.assign(template.__data,template.__dataProto)}// Clear any pending data for performance
template.__dataTemp={};template.__dataPending=null;template.__dataOld=null;template._enableProperties()}}/* eslint-enable valid-jsdoc */function createForwardHostPropEffect(hostProp,userForwardHostProp){return function forwardHostProp(template,prop,props){userForwardHostProp.call(template.__templatizeOwner,prop.substring("_host_".length),props[prop])}}function addNotifyEffects(klass,template,templateInfo,options){var hostProps=templateInfo.hostProps||{};for(var iprop in options.instanceProps){delete hostProps[iprop];var userNotifyInstanceProp=options.notifyInstanceProp;if(userNotifyInstanceProp){klass.prototype._addPropertyEffect(iprop,klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:createNotifyInstancePropEffect(iprop,userNotifyInstanceProp)})}}if(options.forwardHostProp&&template.__dataHost){for(var hprop in hostProps){// As we're iterating hostProps in this function, note whether
// there were any, for an optimization in addPropagateEffects
if(!templateInfo.hasHostProps){templateInfo.hasHostProps=!0}klass.prototype._addPropertyEffect(hprop,klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:createNotifyHostPropEffect()})}}}function createNotifyInstancePropEffect(instProp,userNotifyInstanceProp){return function notifyInstanceProp(inst,prop,props){userNotifyInstanceProp.call(inst.__templatizeOwner,inst,prop,props[prop])}}function createNotifyHostPropEffect(){return function notifyHostProp(inst,prop,props){inst.__dataHost._setPendingPropertyOrPath("_host_"+prop,props[prop],!0,!0)}}/**
   * Returns an anonymous `PropertyEffects` class bound to the
   * `<template>` provided.  Instancing the class will result in the
   * template being stamped into a document fragment stored as the instance's
   * `root` property, after which it can be appended to the DOM.
   *
   * Templates may utilize all Polymer data-binding features as well as
   * declarative event listeners.  Event listeners and inline computing
   * functions in the template will be called on the host of the template.
   *
   * The constructor returned takes a single argument dictionary of initial
   * property values to propagate into template bindings.  Additionally
   * host properties can be forwarded in, and instance properties can be
   * notified out by providing optional callbacks in the `options` dictionary.
   *
   * Valid configuration in `options` are as follows:
   *
   * - `forwardHostProp(property, value)`: Called when a property referenced
   *   in the template changed on the template's host. As this library does
   *   not retain references to templates instanced by the user, it is the
   *   templatize owner's responsibility to forward host property changes into
   *   user-stamped instances.  The `instance.forwardHostProp(property, value)`
   *    method on the generated class should be called to forward host
   *   properties into the template to prevent unnecessary property-changed
   *   notifications. Any properties referenced in the template that are not
   *   defined in `instanceProps` will be notified up to the template's host
   *   automatically.
   * - `instanceProps`: Dictionary of property names that will be added
   *   to the instance by the templatize owner.  These properties shadow any
   *   host properties, and changes within the template to these properties
   *   will result in `notifyInstanceProp` being called.
   * - `mutableData`: When `true`, the generated class will skip strict
   *   dirty-checking for objects and arrays (always consider them to be
   *   "dirty").
   * - `notifyInstanceProp(instance, property, value)`: Called when
   *   an instance property changes.  Users may choose to call `notifyPath`
   *   on e.g. the owner to notify the change.
   * - `parentModel`: When `true`, events handled by declarative event listeners
   *   (`on-event="handler"`) will be decorated with a `model` property pointing
   *   to the template instance that stamped it.  It will also be returned
   *   from `instance.parentModel` in cases where template instance nesting
   *   causes an inner model to shadow an outer model.
   *
   * All callbacks are called bound to the `owner`. Any context
   * needed for the callbacks (such as references to `instances` stamped)
   * should be stored on the `owner` such that they can be retrieved via
   * `this`.
   *
   * When `options.forwardHostProp` is declared as an option, any properties
   * referenced in the template will be automatically forwarded from the host of
   * the `<template>` to instances, with the exception of any properties listed in
   * the `options.instanceProps` object.  `instanceProps` are assumed to be
   * managed by the owner of the instances, either passed into the constructor
   * or set after the fact.  Note, any properties passed into the constructor will
   * always be set to the instance (regardless of whether they would normally
   * be forwarded from the host).
   *
   * Note that `templatize()` can be run only once for a given `<template>`.
   * Further calls will result in an error. Also, there is a special
   * behavior if the template was duplicated through a mechanism such as
   * `<dom-repeat>` or `<test-fixture>`. In this case, all calls to
   * `templatize()` return the same class for all duplicates of a template.
   * The class returned from `templatize()` is generated only once using
   * the `options` from the first call. This means that any `options`
   * provided to subsequent calls will be ignored. Therefore, it is very
   * important not to close over any variables inside the callbacks. Also,
   * arrow functions must be avoided because they bind the outer `this`.
   * Inside the callbacks, any contextual information can be accessed
   * through `this`, which points to the `owner`.
   *
   * @param {!HTMLTemplateElement} template Template to templatize
   * @param {Polymer_PropertyEffects=} owner Owner of the template instances;
   *   any optional callbacks will be bound to this owner.
   * @param {Object=} options Options dictionary (see summary for details)
   * @return {function(new:TemplateInstanceBase, Object=)} Generated class bound
   *   to the template provided
   * @suppress {invalidCasts}
   */function _templatize(template,owner,options){// Under strictTemplatePolicy, the templatized element must be owned
// by a (trusted) Polymer element, indicated by existence of _methodHost;
// e.g. for dom-if & dom-repeat in main document, _methodHost is null
if(strictTemplatePolicy&&!findMethodHost(template)){throw new Error("strictTemplatePolicy: template owner not trusted")}options=/** @type {!TemplatizeOptions} */options||{};if(template.__templatizeOwner){throw new Error("A <template> can only be templatized once")}template.__templatizeOwner=owner;var ctor=owner?owner.constructor:TemplateInstanceBase,templateInfo=ctor._parseTemplate(template),baseClass=templateInfo.templatizeInstanceClass;if(!baseClass){baseClass=createTemplatizerClass(template,templateInfo,options);templateInfo.templatizeInstanceClass=baseClass}// Host property forwarding must be installed onto template instance
addPropagateEffects(template,templateInfo,options);// Subclass base class and add reference for this specific template
/** @private */var klass=/*#__PURE__*/function(_baseClass){babelHelpers.inherits(TemplateInstance,_baseClass);function TemplateInstance(){babelHelpers.classCallCheck(this,TemplateInstance);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(TemplateInstance).apply(this,arguments))}return TemplateInstance}(baseClass);/** @override */klass.prototype._methodHost=findMethodHost(template);/** @override */klass.prototype.__dataHost=/** @type {!DataTemplate} */template;/** @override */klass.prototype.__templatizeOwner=/** @type {!Object} */owner;/** @override */klass.prototype.__hostProps=templateInfo.hostProps;klass=/** @type {function(new:TemplateInstanceBase)} */klass;//eslint-disable-line no-self-assign
return klass}/**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of
   * `TemplateInstanceBase`, and should be used to manipulate data
   * associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @param {HTMLTemplateElement} template The model will be returned for
   *   elements stamped from this template
   * @param {Node=} node Node for which to return a template model.
   * @return {TemplateInstanceBase} Template instance representing the
   *   binding scope for the element
   */function _modelForElement(template,node){var model;while(node){// An element with a __templatizeInstance marks the top boundary
// of a scope; walk up until we find one, and then ensure that
// its __dataHost matches `this`, meaning this dom-repeat stamped it
if(model=node.__templatizeInstance){// Found an element stamped by another template; keep walking up
// from its __dataHost
if(model.__dataHost!=template){node=model.__dataHost}else{return model}}else{// Still in a template scope, keep going up until
// a __templatizeInstance is found
node=wrap$1(node).parentNode}}return null}var templatize$1={templatize:_templatize,modelForElement:_modelForElement,TemplateInstanceBase:TemplateInstanceBase};/**
    * @typedef {{
    *   _templatizerTemplate: HTMLTemplateElement,
    *   _parentModel: boolean,
    *   _instanceProps: Object,
    *   _forwardHostPropV2: Function,
    *   _notifyInstancePropV2: Function,
    *   ctor: function(new:TemplateInstanceBase, Object=)
    * }}
    */_exports.$templatize=templatize$1;var TemplatizerUser,Templatizer={/**
   * Generates an anonymous `TemplateInstance` class (stored as `this.ctor`)
   * for the provided template.  This method should be called once per
   * template to prepare an element for stamping the template, followed
   * by `stamp` to create new instances of the template.
   *
   * @param {!HTMLTemplateElement} template Template to prepare
   * @param {boolean=} mutableData When `true`, the generated class will skip
   *   strict dirty-checking for objects and arrays (always consider them to
   *   be "dirty"). Defaults to false.
   * @return {void}
   * @this {TemplatizerUser}
   */templatize:function templatize(template,mutableData){this._templatizerTemplate=template;this.ctor=_templatize(template,/** @type {!Polymer_PropertyEffects} */this,{mutableData:!!mutableData,parentModel:this._parentModel,instanceProps:this._instanceProps,forwardHostProp:this._forwardHostPropV2,notifyInstanceProp:this._notifyInstancePropV2})},/**
   * Creates an instance of the template prepared by `templatize`.  The object
   * returned is an instance of the anonymous class generated by `templatize`
   * whose `root` property is a document fragment containing newly cloned
   * template content, and which has property accessors corresponding to
   * properties referenced in template bindings.
   *
   * @param {Object=} model Object containing initial property values to
   *   populate into the template bindings.
   * @return {TemplateInstanceBase} Returns the created instance of
   * the template prepared by `templatize`.
   * @this {TemplatizerUser}
   */stamp:function stamp(model){return new this.ctor(model)},/**
   * Returns the template "model" (`TemplateInstance`) associated with
   * a given element, which serves as the binding scope for the template
   * instance the element is contained in.  A template model should be used
   * to manipulate data associated with this template instance.
   *
   * @param {HTMLElement} el Element for which to return a template model.
   * @return {TemplateInstanceBase} Model representing the binding scope for
   *   the element.
   * @this {TemplatizerUser}
   */modelForElement:function modelForElement(el){return _modelForElement(this._templatizerTemplate,el)}};// eslint-disable-line
/**
 * The `Templatizer` behavior adds methods to generate instances of
 * templates that are each managed by an anonymous `PropertyEffects`
 * instance where data-bindings in the stamped template content are bound to
 * accessors on itself.
 *
 * This behavior is provided in Polymer 2.x-3.x as a hybrid-element convenience
 * only.  For non-hybrid usage, the `Templatize` library
 * should be used instead.
 *
 * Example:
 *
 *     import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
 *     // Get a template from somewhere, e.g. light DOM
 *     let template = this.querySelector('template');
 *     // Prepare the template
 *     this.templatize(template);
 *     // Instance the template with an initial data model
 *     let instance = this.stamp({myProp: 'initial'});
 *     // Insert the instance's DOM somewhere, e.g. light DOM
 *     dom(this).appendChild(instance.root);
 *     // Changing a property on the instance will propagate to bindings
 *     // in the template
 *     instance.myProp = 'new value';
 *
 * Users of `Templatizer` may need to implement the following abstract
 * API's to determine how properties and paths from the host should be
 * forwarded into to instances:
 *
 *     _forwardHostPropV2: function(prop, value)
 *
 * Likewise, users may implement these additional abstract API's to determine
 * how instance-specific properties that change on the instance should be
 * forwarded out to the host, if necessary.
 *
 *     _notifyInstancePropV2: function(inst, prop, value)
 *
 * In order to determine which properties are instance-specific and require
 * custom notification via `_notifyInstanceProp`, define an `_instanceProps`
 * object containing keys for each instance prop, for example:
 *
 *     _instanceProps: {
 *       item: true,
 *       index: true
 *     }
 *
 * Any properties used in the template that are not defined in _instanceProp
 * will be forwarded out to the Templatize `owner` automatically.
 *
 * Users may also implement the following abstract function to show or
 * hide any DOM generated using `stamp`:
 *
 *     _showHideChildren: function(shouldHide)
 *
 * Note that some callbacks are suffixed with `V2` in the Polymer 2.x behavior
 * as the implementations will need to differ from the callbacks required
 * by the 1.x Templatizer API due to changes in the `TemplateInstance` API
 * between versions 1.x and 2.x.
 *
 * @polymerBehavior
 */_exports.Templatizer=Templatizer;var templatizerBehavior={Templatizer:Templatizer};_exports.$templatizerBehavior=templatizerBehavior;var elementsHidden=!1;/**
                             * @return {boolean} True if elements will be hidden globally
                             */function hideElementsGlobally(){if(legacyOptimizations&&!useShadow){if(!elementsHidden){elementsHidden=!0;var _style7=document.createElement("style");_style7.textContent="dom-bind,dom-if,dom-repeat{display:none;}";document.head.appendChild(_style7)}return!0}return!1}var hideTemplateControls={hideElementsGlobally:hideElementsGlobally};_exports.$hideTemplateControls=hideTemplateControls;var domBindBase=GestureEventListeners(OptionalMutableData(PropertyEffects(HTMLElement))),DomBind=/*#__PURE__*/function(_domBindBase){babelHelpers.inherits(DomBind,_domBindBase);babelHelpers.createClass(DomBind,null,[{key:"observedAttributes",get:function get(){return["mutable-data"]}}]);function DomBind(){var _this20;babelHelpers.classCallCheck(this,DomBind);_this20=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(DomBind).call(this));if(strictTemplatePolicy){throw new Error("strictTemplatePolicy: dom-bind not allowed")}_this20.root=null;_this20.$=null;_this20.__children=null;return _this20}/* eslint-disable no-unused-vars */ /**
                                         * @override
                                         * @param {string} name Name of attribute that changed
                                         * @param {?string} old Old attribute value
                                         * @param {?string} value New attribute value
                                         * @param {?string} namespace Attribute namespace.
                                         * @return {void}
                                         */babelHelpers.createClass(DomBind,[{key:"attributeChangedCallback",value:function attributeChangedCallback(name,old,value,namespace){// assumes only one observed attribute
this.mutableData=!0}/**
     * @override
     * @return {void}
     */},{key:"connectedCallback",value:function connectedCallback(){if(!hideElementsGlobally()){this.style.display="none"}this.render()}/**
     * @override
     * @return {void}
     */},{key:"disconnectedCallback",value:function disconnectedCallback(){this.__removeChildren()}},{key:"__insertChildren",value:function __insertChildren(){wrap$1(wrap$1(this).parentNode).insertBefore(this.root,this)}},{key:"__removeChildren",value:function __removeChildren(){if(this.__children){for(var _i66=0;_i66<this.__children.length;_i66++){this.root.appendChild(this.__children[_i66])}}}/**
     * Forces the element to render its content. This is typically only
     * necessary to call if HTMLImports with the async attribute are used.
     * @return {void}
     */},{key:"render",value:function render(){var _this21=this,template;if(!this.__children){template=/** @type {?HTMLTemplateElement} */template||this.querySelector("template");if(!template){// Wait until childList changes and template should be there by then
var _observer=new MutationObserver(function(){template=/** @type {HTMLTemplateElement} */_this21.querySelector("template");if(template){_observer.disconnect();_this21.render()}else{throw new Error("dom-bind requires a <template> child")}});_observer.observe(this,{childList:!0});return}this.root=this._stampTemplate(/** @type {!HTMLTemplateElement} */template);this.$=this.root.$;this.__children=[];for(var n=this.root.firstChild;n;n=n.nextSibling){this.__children[this.__children.length]=n}this._enableProperties()}this.__insertChildren();this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}}]);return DomBind}(domBindBase);/**
                                                                                               * Custom element to allow using Polymer's template features (data binding,
                                                                                               * declarative event listeners, etc.) in the main document without defining
                                                                                               * a new custom element.
                                                                                               *
                                                                                               * `<template>` tags utilizing bindings may be wrapped with the `<dom-bind>`
                                                                                               * element, which will immediately stamp the wrapped template into the main
                                                                                               * document and bind elements to the `dom-bind` element itself as the
                                                                                               * binding scope.
                                                                                               *
                                                                                               * @polymer
                                                                                               * @customElement
                                                                                               * @appliesMixin PropertyEffects
                                                                                               * @appliesMixin OptionalMutableData
                                                                                               * @appliesMixin GestureEventListeners
                                                                                               * @extends {domBindBase}
                                                                                               * @summary Custom element to allow using Polymer's template features (data
                                                                                               *   binding, declarative event listeners, etc.) in the main document.
                                                                                               */_exports.DomBind=DomBind;customElements.define("dom-bind",DomBind);var domBind={DomBind:DomBind};_exports.$domBind=domBind;var LiteralString=/*#__PURE__*/function(){function LiteralString(string){babelHelpers.classCallCheck(this,LiteralString);/** @type {string} */this.value=string.toString()}/**
     * @return {string} LiteralString string value
     * @override
     */babelHelpers.createClass(LiteralString,[{key:"toString",value:function toString(){return this.value}}]);return LiteralString}();/**
   * @param {*} value Object to stringify into HTML
   * @return {string} HTML stringified form of `obj`
   */function literalValue(value){if(babelHelpers.instanceof(value,LiteralString)){return(/** @type {!LiteralString} */value.value)}else{throw new Error("non-literal value passed to Polymer's htmlLiteral function: ".concat(value))}}/**
   * @param {*} value Object to stringify into HTML
   * @return {string} HTML stringified form of `obj`
   */function htmlValue(value){if(babelHelpers.instanceof(value,HTMLTemplateElement)){return(/** @type {!HTMLTemplateElement } */value.innerHTML)}else if(babelHelpers.instanceof(value,LiteralString)){return literalValue(value)}else{throw new Error("non-template value passed to Polymer's html function: ".concat(value))}}/**
   * A template literal tag that creates an HTML <template> element from the
   * contents of the string.
   *
   * This allows you to write a Polymer Template in JavaScript.
   *
   * Templates can be composed by interpolating `HTMLTemplateElement`s in
   * expressions in the JavaScript template literal. The nested template's
   * `innerHTML` is included in the containing template.  The only other
   * values allowed in expressions are those returned from `htmlLiteral`
   * which ensures only literal values from JS source ever reach the HTML, to
   * guard against XSS risks.
   *
   * All other values are disallowed in expressions to help prevent XSS
   * attacks; however, `htmlLiteral` can be used to compose static
   * string values into templates. This is useful to compose strings into
   * places that do not accept html, like the css text of a `style`
   * element.
   *
   * Example:
   *
   *     static get template() {
   *       return html`
   *         <style>:host{ content:"..." }</style>
   *         <div class="shadowed">${this.partialTemplate}</div>
   *         ${super.template}
   *       `;
   *     }
   *     static get partialTemplate() { return html`<span>Partial!</span>`; }
   *
   * @param {!ITemplateArray} strings Constant parts of tagged template literal
   * @param {...*} values Variable parts of tagged template literal
   * @return {!HTMLTemplateElement} Constructed HTMLTemplateElement
   */var html=function html(strings){for(var template=/** @type {!HTMLTemplateElement} */document.createElement("template"),_len8=arguments.length,values=Array(1<_len8?_len8-1:0),_key8=1;_key8<_len8;_key8++){values[_key8-1]=arguments[_key8]}template.innerHTML=values.reduce(function(acc,v,idx){return acc+htmlValue(v)+strings[idx+1]},strings[0]);return template};/**
    * An html literal tag that can be used with `html` to compose.
    * a literal string.
    *
    * Example:
    *
    *     static get template() {
    *       return html`
    *         <style>
    *           :host { display: block; }
    *           ${this.styleTemplate()}
    *         </style>
    *         <div class="shadowed">${staticValue}</div>
    *         ${super.template}
    *       `;
    *     }
    *     static get styleTemplate() {
    *        return htmlLiteral`.shadowed { background: gray; }`;
    *     }
    *
    * @param {!ITemplateArray} strings Constant parts of tagged template literal
    * @param {...*} values Variable parts of tagged template literal
    * @return {!LiteralString} Constructed literal string
    */_exports.html$2=_exports.html$1=_exports.html=html;var htmlLiteral=function htmlLiteral(strings){for(var _len9=arguments.length,values=Array(1<_len9?_len9-1:0),_key9=1;_key9<_len9;_key9++){values[_key9-1]=arguments[_key9]}return new LiteralString(values.reduce(function(acc,v,idx){return acc+literalValue(v)+strings[idx+1]},strings[0]))};_exports.htmlLiteral=htmlLiteral;var htmlTag={html:html,htmlLiteral:htmlLiteral};_exports.$htmlTag=htmlTag;var PolymerElement=ElementMixin(HTMLElement);_exports.PolymerElement=PolymerElement;var polymerElement={version:version,PolymerElement:PolymerElement,html:html};_exports.$polymerElement=polymerElement;var domRepeatBase=OptionalMutableData(PolymerElement),DomRepeat=/*#__PURE__*/function(_domRepeatBase){babelHelpers.inherits(DomRepeat,_domRepeatBase);babelHelpers.createClass(DomRepeat,null,[{key:"is",// Not needed to find template; can be removed once the analyzer
// can find the tag name from customElements.define call
get:function get(){return"dom-repeat"}},{key:"template",get:function get(){return null}},{key:"properties",get:function get(){/**
     * Fired whenever DOM is added or removed by this template (by
     * default, rendering occurs lazily).  To force immediate rendering, call
     * `render`.
     *
     * @event dom-change
     */return{/**
       * An array containing items determining how many instances of the template
       * to stamp and that that each template instance should bind to.
       */items:{type:Array},/**
       * The name of the variable to add to the binding scope for the array
       * element associated with a given template instance.
       */as:{type:String,value:"item"},/**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the sorted and filtered list of rendered items.
       * Note, for the index in the `this.items` array, use the value of the
       * `itemsIndexAs` property.
       */indexAs:{type:String,value:"index"},/**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the `this.items` array. Note, for the index of
       * this instance in the sorted and filtered list of rendered items,
       * use the value of the `indexAs` property.
       */itemsIndexAs:{type:String,value:"itemsIndex"},/**
       * A function that should determine the sort order of the items.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.sort`.
       * Using a sort function has no effect on the underlying `items` array.
       */sort:{type:Function,observer:"__sortChanged"},/**
       * A function that can be used to filter items out of the view.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.filter`.
       * Using a filter function has no effect on the underlying `items` array.
       */filter:{type:Function,observer:"__filterChanged"},/**
       * When using a `filter` or `sort` function, the `observe` property
       * should be set to a space-separated list of the names of item
       * sub-fields that should trigger a re-sort or re-filter when changed.
       * These should generally be fields of `item` that the sort or filter
       * function depends on.
       */observe:{type:String,observer:"__observeChanged"},/**
       * When using a `filter` or `sort` function, the `delay` property
       * determines a debounce time in ms after a change to observed item
       * properties that must pass before the filter or sort is re-run.
       * This is useful in rate-limiting shuffling of the view when
       * item changes may be frequent.
       */delay:Number,/**
       * Count of currently rendered items after `filter` (if any) has been applied.
       * If "chunking mode" is enabled, `renderedItemCount` is updated each time a
       * set of template instances is rendered.
       *
       */renderedItemCount:{type:Number,notify:!0,readOnly:!0},/**
       * Defines an initial count of template instances to render after setting
       * the `items` array, before the next paint, and puts the `dom-repeat`
       * into "chunking mode".  The remaining items will be created and rendered
       * incrementally at each animation frame therof until all instances have
       * been rendered.
       */initialCount:{type:Number,observer:"__initializeChunking"},/**
       * When `initialCount` is used, this property defines a frame rate (in
       * fps) to target by throttling the number of instances rendered each
       * frame to not exceed the budget for the target frame rate.  The
       * framerate is effectively the number of `requestAnimationFrame`s that
       * it tries to allow to actually fire in a given second. It does this
       * by measuring the time between `rAF`s and continuously adjusting the
       * number of items created each `rAF` to maintain the target framerate.
       * Setting this to a higher number allows lower latency and higher
       * throughput for event handlers and other tasks, but results in a
       * longer time for the remaining items to complete rendering.
       */targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}},{key:"observers",get:function get(){return["__itemsChanged(items.*)"]}}]);function DomRepeat(){var _this22;babelHelpers.classCallCheck(this,DomRepeat);_this22=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(DomRepeat).call(this));_this22.__instances=[];_this22.__limit=1/0;_this22.__pool=[];_this22.__renderDebouncer=null;_this22.__itemsIdxToInstIdx={};_this22.__chunkCount=null;_this22.__lastChunkTime=null;_this22.__sortFn=null;_this22.__filterFn=null;_this22.__observePaths=null;/** @type {?function(new:TemplateInstanceBase, Object=)} */_this22.__ctor=null;_this22.__isDetached=!0;_this22.template=null;return _this22}/**
     * @override
     * @return {void}
     */babelHelpers.createClass(DomRepeat,[{key:"disconnectedCallback",value:function disconnectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(DomRepeat.prototype),"disconnectedCallback",this).call(this);this.__isDetached=!0;for(var _i67=0;_i67<this.__instances.length;_i67++){this.__detachInstance(_i67)}}/**
     * @override
     * @return {void}
     */},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(DomRepeat.prototype),"connectedCallback",this).call(this);if(!hideElementsGlobally()){this.style.display="none"}// only perform attachment if the element was previously detached.
if(this.__isDetached){this.__isDetached=!1;for(var wrappedParent=wrap$1(wrap$1(this).parentNode),_i68=0;_i68<this.__instances.length;_i68++){this.__attachInstance(_i68,wrappedParent)}}}},{key:"__ensureTemplatized",value:function __ensureTemplatized(){var _this23=this;// Templatizing (generating the instance constructor) needs to wait
// until ready, since won't have its template content handed back to
// it until then
if(!this.__ctor){var _template3=this.template=/** @type {HTMLTemplateElement} */this.querySelector("template");if(!_template3){// // Wait until childList changes and template should be there by then
var _observer2=new MutationObserver(function(){if(_this23.querySelector("template")){_observer2.disconnect();_this23.__render()}else{throw new Error("dom-repeat requires a <template> child")}});_observer2.observe(this,{childList:!0});return!1}// Template instance props that should be excluded from forwarding
var instanceProps={};instanceProps[this.as]=!0;instanceProps[this.indexAs]=!0;instanceProps[this.itemsIndexAs]=!0;this.__ctor=_templatize(_template3,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:instanceProps,/**
         * @this {DomRepeat}
         * @param {string} prop Property to set
         * @param {*} value Value to set property to
         */forwardHostProp:function forwardHostProp(prop,value){for(var i$=this.__instances,_i69=0,inst;_i69<i$.length&&(inst=i$[_i69]);_i69++){inst.forwardHostProp(prop,value)}},/**
         * @this {DomRepeat}
         * @param {Object} inst Instance to notify
         * @param {string} prop Property to notify
         * @param {*} value Value to notify
         */notifyInstanceProp:function notifyInstanceProp(inst,prop,value){if(matches(this.as,prop)){var idx=inst[this.itemsIndexAs];if(prop==this.as){this.items[idx]=value}var _path3=translate(this.as,"".concat(JSCompiler_renameProperty("items",this),".").concat(idx),prop);this.notifyPath(_path3,value)}}})}return!0}},{key:"__getMethodHost",value:function __getMethodHost(){// Technically this should be the owner of the outermost template.
// In shadow dom, this is always getRootNode().host, but we can
// approximate this via cooperation with our dataHost always setting
// `_methodHost` as long as there were bindings (or id's) on this
// instance causing it to get a dataHost.
return this.__dataHost._methodHost||this.__dataHost}},{key:"__functionFromPropertyValue",value:function __functionFromPropertyValue(functionOrMethodName){if("string"===typeof functionOrMethodName){var methodName=functionOrMethodName,obj=this.__getMethodHost();return function(){return obj[methodName].apply(obj,arguments)}}return functionOrMethodName}},{key:"__sortChanged",value:function __sortChanged(sort){this.__sortFn=this.__functionFromPropertyValue(sort);if(this.items){this.__debounceRender(this.__render)}}},{key:"__filterChanged",value:function __filterChanged(filter){this.__filterFn=this.__functionFromPropertyValue(filter);if(this.items){this.__debounceRender(this.__render)}}},{key:"__computeFrameTime",value:function __computeFrameTime(rate){return Math.ceil(1e3/rate)}},{key:"__initializeChunking",value:function __initializeChunking(){if(this.initialCount){this.__limit=this.initialCount;this.__chunkCount=this.initialCount;this.__lastChunkTime=performance.now()}}},{key:"__tryRenderChunk",value:function __tryRenderChunk(){// Debounced so that multiple calls through `_render` between animation
// frames only queue one new rAF (e.g. array mutation & chunked render)
if(this.items&&this.__limit<this.items.length){this.__debounceRender(this.__requestRenderChunk)}}},{key:"__requestRenderChunk",value:function __requestRenderChunk(){var _this24=this;requestAnimationFrame(function(){return _this24.__renderChunk()})}},{key:"__renderChunk",value:function __renderChunk(){// Simple auto chunkSize throttling algorithm based on feedback loop:
// measure actual time between frames and scale chunk count by ratio
// of target/actual frame time
var currChunkTime=performance.now(),ratio=this._targetFrameTime/(currChunkTime-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*ratio)||1;this.__limit+=this.__chunkCount;this.__lastChunkTime=currChunkTime;this.__debounceRender(this.__render)}},{key:"__observeChanged",value:function __observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}},{key:"__itemsChanged",value:function __itemsChanged(change){if(this.items&&!Array.isArray(this.items)){console.warn("dom-repeat expected array for `items`, found",this.items)}// If path was to an item (e.g. 'items.3' or 'items.3.foo'), forward the
// path to that instance synchronously (returns false for non-item paths)
if(!this.__handleItemPath(change.path,change.value)){// Otherwise, the array was reset ('items') or spliced ('items.splices'),
// so queue a full refresh
this.__initializeChunking();this.__debounceRender(this.__render)}}},{key:"__handleObservedPaths",value:function __handleObservedPaths(path){// Handle cases where path changes should cause a re-sort/filter
if(this.__sortFn||this.__filterFn){if(!path){// Always re-render if the item itself changed
this.__debounceRender(this.__render,this.delay)}else if(this.__observePaths){// Otherwise, re-render if the path changed matches an observed path
for(var paths=this.__observePaths,_i70=0;_i70<paths.length;_i70++){if(0===path.indexOf(paths[_i70])){this.__debounceRender(this.__render,this.delay)}}}}}/**
     * @param {function(this:DomRepeat)} fn Function to debounce.
     * @param {number=} delay Delay in ms to debounce by.
     */},{key:"__debounceRender",value:function __debounceRender(fn){var delay=1<arguments.length&&arguments[1]!==void 0?arguments[1]:0;this.__renderDebouncer=Debouncer.debounce(this.__renderDebouncer,0<delay?timeOut.after(delay):microTask,fn.bind(this));enqueueDebouncer(this.__renderDebouncer)}/**
     * Forces the element to render its content. Normally rendering is
     * asynchronous to a provoking change. This is done for efficiency so
     * that multiple changes trigger only a single render. The render method
     * should be called if, for example, template rendering is required to
     * validate application state.
     * @return {void}
     */},{key:"render",value:function render(){// Queue this repeater, then flush all in order
this.__debounceRender(this.__render);flush$1()}},{key:"__render",value:function __render(){if(!this.__ensureTemplatized()){// No template found yet
return}this.__applyFullRefresh();// Reset the pool
// TODO(kschaaf): Reuse pool across turns and nested templates
// Now that objects/arrays are re-evaluated when set, we can safely
// reuse pooled instances across turns, however we still need to decide
// semantics regarding how long to hold, how many to hold, etc.
this.__pool.length=0;// Set rendered item count
this._setRenderedItemCount(this.__instances.length);// Notify users
this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}));// Check to see if we need to render more items
this.__tryRenderChunk()}},{key:"__applyFullRefresh",value:function __applyFullRefresh(){for(var _this25=this,items=this.items||[],isntIdxToItemsIdx=Array(items.length),_i71=0;_i71<items.length;_i71++){isntIdxToItemsIdx[_i71]=_i71}// Apply user filter
if(this.__filterFn){isntIdxToItemsIdx=isntIdxToItemsIdx.filter(function(i,idx,array){return _this25.__filterFn(items[i],idx,array)})}// Apply user sort
if(this.__sortFn){isntIdxToItemsIdx.sort(function(a,b){return _this25.__sortFn(items[a],items[b])})}// items->inst map kept for item path forwarding
var itemsIdxToInstIdx=this.__itemsIdxToInstIdx={},instIdx=0,limit=Math.min(isntIdxToItemsIdx.length,this.__limit);for(;instIdx<limit;instIdx++){var inst=this.__instances[instIdx],itemIdx=isntIdxToItemsIdx[instIdx],item=items[itemIdx];itemsIdxToInstIdx[itemIdx]=instIdx;if(inst){inst._setPendingProperty(this.as,item);inst._setPendingProperty(this.indexAs,instIdx);inst._setPendingProperty(this.itemsIndexAs,itemIdx);inst._flushProperties()}else{this.__insertInstance(item,instIdx,itemIdx)}}// Remove any extra instances from previous state
for(var _i72=this.__instances.length-1;_i72>=instIdx;_i72--){this.__detachAndRemoveInstance(_i72)}}},{key:"__detachInstance",value:function __detachInstance(idx){for(var inst=this.__instances[idx],wrappedRoot=wrap$1(inst.root),_i73=0,el;_i73<inst.children.length;_i73++){el=inst.children[_i73];wrappedRoot.appendChild(el)}return inst}},{key:"__attachInstance",value:function __attachInstance(idx,parent){var inst=this.__instances[idx];// Note, this is pre-wrapped as an optimization
parent.insertBefore(inst.root,this)}},{key:"__detachAndRemoveInstance",value:function __detachAndRemoveInstance(idx){var inst=this.__detachInstance(idx);if(inst){this.__pool.push(inst)}this.__instances.splice(idx,1)}},{key:"__stampInstance",value:function __stampInstance(item,instIdx,itemIdx){var model={};model[this.as]=item;model[this.indexAs]=instIdx;model[this.itemsIndexAs]=itemIdx;return new this.__ctor(model)}},{key:"__insertInstance",value:function __insertInstance(item,instIdx,itemIdx){var inst=this.__pool.pop();if(inst){// TODO(kschaaf): If the pool is shared across turns, hostProps
// need to be re-set to reused instances in addition to item
inst._setPendingProperty(this.as,item);inst._setPendingProperty(this.indexAs,instIdx);inst._setPendingProperty(this.itemsIndexAs,itemIdx);inst._flushProperties()}else{inst=this.__stampInstance(item,instIdx,itemIdx)}var beforeRow=this.__instances[instIdx+1],beforeNode=beforeRow?beforeRow.children[0]:this;wrap$1(wrap$1(this).parentNode).insertBefore(inst.root,beforeNode);this.__instances[instIdx]=inst;return inst}// Implements extension point from Templatize mixin
/**
   * Shows or hides the template instance top level child elements. For
   * text nodes, `textContent` is removed while "hidden" and replaced when
   * "shown."
   * @param {boolean} hidden Set to true to hide the children;
   * set to false to show them.
   * @return {void}
   * @protected
   */},{key:"_showHideChildren",value:function _showHideChildren(hidden){for(var _i74=0;_i74<this.__instances.length;_i74++){this.__instances[_i74]._showHideChildren(hidden)}}// Called as a side effect of a host items.<key>.<path> path change,
// responsible for notifying item.<path> changes to inst for key
},{key:"__handleItemPath",value:function __handleItemPath(path,value){var itemsPath=path.slice(6),dot=itemsPath.indexOf("."),itemsIdx=0>dot?itemsPath:itemsPath.substring(0,dot);// 'items.'.length == 6
// If path was index into array...
if(itemsIdx==parseInt(itemsIdx,10)){var itemSubPath=0>dot?"":itemsPath.substring(dot+1);// If the path is observed, it will trigger a full refresh
this.__handleObservedPaths(itemSubPath);// Note, even if a rull refresh is triggered, always do the path
// notification because unless mutableData is used for dom-repeat
// and all elements in the instance subtree, a full refresh may
// not trigger the proper update.
var instIdx=this.__itemsIdxToInstIdx[itemsIdx],inst=this.__instances[instIdx];if(inst){var itemPath=this.as+(itemSubPath?"."+itemSubPath:"");// This is effectively `notifyPath`, but avoids some of the overhead
// of the public API
inst._setPendingPropertyOrPath(itemPath,value,!1,!0);inst._flushProperties()}return!0}}/**
     * Returns the item associated with a given element stamped by
     * this `dom-repeat`.
     *
     * Note, to modify sub-properties of the item,
     * `modelForElement(el).set('item.<sub-prop>', value)`
     * should be used.
     *
     * @param {!HTMLElement} el Element for which to return the item.
     * @return {*} Item associated with the element.
     */},{key:"itemForElement",value:function itemForElement(el){var instance=this.modelForElement(el);return instance&&instance[this.as]}/**
     * Returns the inst index for a given element stamped by this `dom-repeat`.
     * If `sort` is provided, the index will reflect the sorted order (rather
     * than the original array order).
     *
     * @param {!HTMLElement} el Element for which to return the index.
     * @return {?number} Row index associated with the element (note this may
     *   not correspond to the array index if a user `sort` is applied).
     */},{key:"indexForElement",value:function indexForElement(el){var instance=this.modelForElement(el);return instance&&instance[this.indexAs]}/**
     * Returns the template "model" associated with a given element, which
     * serves as the binding scope for the template instance the element is
     * contained in. A template model
     * should be used to manipulate data associated with this template instance.
     *
     * Example:
     *
     *   let model = modelForElement(el);
     *   if (model.index < 10) {
     *     model.set('item.checked', true);
     *   }
     *
     * @param {!HTMLElement} el Element for which to return a template model.
     * @return {TemplateInstanceBase} Model representing the binding scope for
     *   the element.
     */},{key:"modelForElement",value:function modelForElement(el){return _modelForElement(this.template,el)}}]);return DomRepeat}(domRepeatBase);/**
                                                            * The `<dom-repeat>` element will automatically stamp and binds one instance
                                                            * of template content to each object in a user-provided array.
                                                            * `dom-repeat` accepts an `items` property, and one instance of the template
                                                            * is stamped for each item into the DOM at the location of the `dom-repeat`
                                                            * element.  The `item` property will be set on each instance's binding
                                                            * scope, thus templates should bind to sub-properties of `item`.
                                                            *
                                                            * Example:
                                                            *
                                                            * ```html
                                                            * <dom-module id="employee-list">
                                                            *
                                                            *   <template>
                                                            *
                                                            *     <div> Employee list: </div>
                                                            *     <dom-repeat items="{{employees}}">
                                                            *       <template>
                                                            *         <div>First name: <span>{{item.first}}</span></div>
                                                            *         <div>Last name: <span>{{item.last}}</span></div>
                                                            *       </template>
                                                            *     </dom-repeat>
                                                            *
                                                            *   </template>
                                                            *
                                                            * </dom-module>
                                                            * ```
                                                            *
                                                            * With the following custom element definition:
                                                            *
                                                            * ```js
                                                            * class EmployeeList extends PolymerElement {
                                                            *   static get is() { return 'employee-list'; }
                                                            *   static get properties() {
                                                            *     return {
                                                            *       employees: {
                                                            *         value() {
                                                            *           return [
                                                            *             {first: 'Bob', last: 'Smith'},
                                                            *             {first: 'Sally', last: 'Johnson'},
                                                            *             ...
                                                            *           ];
                                                            *         }
                                                            *       }
                                                            *     };
                                                            *   }
                                                            * }
                                                            * ```
                                                            *
                                                            * Notifications for changes to items sub-properties will be forwarded to template
                                                            * instances, which will update via the normal structured data notification system.
                                                            *
                                                            * Mutations to the `items` array itself should be made using the Array
                                                            * mutation API's on the PropertyEffects mixin (`push`, `pop`, `splice`,
                                                            * `shift`, `unshift`), and template instances will be kept in sync with the
                                                            * data in the array.
                                                            *
                                                            * Events caught by event handlers within the `dom-repeat` template will be
                                                            * decorated with a `model` property, which represents the binding scope for
                                                            * each template instance.  The model should be used to manipulate data on the
                                                            * instance, for example `event.model.set('item.checked', true);`.
                                                            *
                                                            * Alternatively, the model for a template instance for an element stamped by
                                                            * a `dom-repeat` can be obtained using the `modelForElement` API on the
                                                            * `dom-repeat` that stamped it, for example
                                                            * `this.$.domRepeat.modelForElement(event.target).set('item.checked', true);`.
                                                            * This may be useful for manipulating instance data of event targets obtained
                                                            * by event handlers on parents of the `dom-repeat` (event delegation).
                                                            *
                                                            * A view-specific filter/sort may be applied to each `dom-repeat` by supplying a
                                                            * `filter` and/or `sort` property.  This may be a string that names a function on
                                                            * the host, or a function may be assigned to the property directly.  The functions
                                                            * should implemented following the standard `Array` filter/sort API.
                                                            *
                                                            * In order to re-run the filter or sort functions based on changes to sub-fields
                                                            * of `items`, the `observe` property may be set as a space-separated list of
                                                            * `item` sub-fields that should cause a re-filter/sort when modified.  If
                                                            * the filter or sort function depends on properties not contained in `items`,
                                                            * the user should observe changes to those properties and call `render` to update
                                                            * the view based on the dependency change.
                                                            *
                                                            * For example, for an `dom-repeat` with a filter of the following:
                                                            *
                                                            * ```js
                                                            * isEngineer(item) {
                                                            *   return item.type == 'engineer' || item.manager.type == 'engineer';
                                                            * }
                                                            * ```
                                                            *
                                                            * Then the `observe` property should be configured as follows:
                                                            *
                                                            * ```html
                                                            * <dom-repeat items="{{employees}}" filter="isEngineer" observe="type manager.type">
                                                            * ```
                                                            *
                                                            * @customElement
                                                            * @polymer
                                                            * @extends {domRepeatBase}
                                                            * @appliesMixin OptionalMutableData
                                                            * @summary Custom element for stamping instance of a template bound to
                                                            *   items in an array.
                                                            */_exports.DomRepeat=DomRepeat;customElements.define(DomRepeat.is,DomRepeat);var domRepeat={DomRepeat:DomRepeat};_exports.$domRepeat=domRepeat;var DomIf=/*#__PURE__*/function(_PolymerElement){babelHelpers.inherits(DomIf,_PolymerElement);babelHelpers.createClass(DomIf,null,[{key:"is",// Not needed to find template; can be removed once the analyzer
// can find the tag name from customElements.define call
get:function get(){return"dom-if"}},{key:"template",get:function get(){return null}},{key:"properties",get:function get(){return{/**
       * Fired whenever DOM is added or removed/hidden by this template (by
       * default, rendering occurs lazily).  To force immediate rendering, call
       * `render`.
       *
       * @event dom-change
       */ /**
           * A boolean indicating whether this template should stamp.
           */if:{type:Boolean,observer:"__debounceRender"},/**
       * When true, elements will be removed from DOM and discarded when `if`
       * becomes false and re-created and added back to the DOM when `if`
       * becomes true.  By default, stamped elements will be hidden but left
       * in the DOM when `if` becomes false, which is generally results
       * in better performance.
       */restamp:{type:Boolean,observer:"__debounceRender"}}}}]);function DomIf(){var _this26;babelHelpers.classCallCheck(this,DomIf);_this26=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(DomIf).call(this));_this26.__renderDebouncer=null;_this26.__invalidProps=null;_this26.__instance=null;_this26._lastIf=!1;_this26.__ctor=null;_this26.__hideTemplateChildren__=!1;return _this26}babelHelpers.createClass(DomIf,[{key:"__debounceRender",value:function __debounceRender(){var _this27=this;// Render is async for 2 reasons:
// 1. To eliminate dom creation trashing if user code thrashes `if` in the
//    same turn. This was more common in 1.x where a compound computed
//    property could result in the result changing multiple times, but is
//    mitigated to a large extent by batched property processing in 2.x.
// 2. To avoid double object propagation when a bag including values bound
//    to the `if` property as well as one or more hostProps could enqueue
//    the <dom-if> to flush before the <template>'s host property
//    forwarding. In that scenario creating an instance would result in
//    the host props being set once, and then the enqueued changes on the
//    template would set properties a second time, potentially causing an
//    object to be set to an instance more than once.  Creating the
//    instance async from flushing data ensures this doesn't happen. If
//    we wanted a sync option in the future, simply having <dom-if> flush
//    (or clear) its template's pending host properties before creating
//    the instance would also avoid the problem.
this.__renderDebouncer=Debouncer.debounce(this.__renderDebouncer,microTask,function(){return _this27.__render()});enqueueDebouncer(this.__renderDebouncer)}/**
     * @override
     * @return {void}
     */},{key:"disconnectedCallback",value:function disconnectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(DomIf.prototype),"disconnectedCallback",this).call(this);var parent=wrap$1(this).parentNode;if(!parent||parent.nodeType==Node.DOCUMENT_FRAGMENT_NODE&&!wrap$1(parent).host){this.__teardownInstance()}}/**
     * @override
     * @return {void}
     */},{key:"connectedCallback",value:function connectedCallback(){babelHelpers.get(babelHelpers.getPrototypeOf(DomIf.prototype),"connectedCallback",this).call(this);if(!hideElementsGlobally()){this.style.display="none"}if(this.if){this.__debounceRender()}}/**
     * Forces the element to render its content. Normally rendering is
     * asynchronous to a provoking change. This is done for efficiency so
     * that multiple changes trigger only a single render. The render method
     * should be called if, for example, template rendering is required to
     * validate application state.
     * @return {void}
     */},{key:"render",value:function render(){flush$1()}},{key:"__render",value:function __render(){if(this.if){if(!this.__ensureInstance()){// No template found yet
return}this._showHideChildren()}else if(this.restamp){this.__teardownInstance()}if(!this.restamp&&this.__instance){this._showHideChildren()}if(this.if!=this._lastIf){this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}));this._lastIf=this.if}}},{key:"__ensureInstance",value:function __ensureInstance(){var _this28=this,parentNode=wrap$1(this).parentNode;// Guard against element being detached while render was queued
if(parentNode){if(!this.__ctor){var _template4=/** @type {HTMLTemplateElement} */wrap$1(this).querySelector("template");if(!_template4){// Wait until childList changes and template should be there by then
var _observer3=new MutationObserver(function(){if(wrap$1(_this28).querySelector("template")){_observer3.disconnect();_this28.__render()}else{throw new Error("dom-if requires a <template> child")}});_observer3.observe(this,{childList:!0});return!1}this.__ctor=_templatize(_template4,this,{// dom-if templatizer instances require `mutable: true`, as
// `__syncHostProperties` relies on that behavior to sync objects
mutableData:!0,/**
           * @param {string} prop Property to forward
           * @param {*} value Value of property
           * @this {DomIf}
           */forwardHostProp:function forwardHostProp(prop,value){if(this.__instance){if(this.if){this.__instance.forwardHostProp(prop,value)}else{// If we have an instance but are squelching host property
// forwarding due to if being false, note the invalidated
// properties so `__syncHostProperties` can sync them the next
// time `if` becomes true
this.__invalidProps=this.__invalidProps||Object.create(null);this.__invalidProps[root(prop)]=!0}}}})}if(!this.__instance){this.__instance=new this.__ctor;wrap$1(parentNode).insertBefore(this.__instance.root,this)}else{this.__syncHostProperties();var c$=this.__instance.children;if(c$&&c$.length){// Detect case where dom-if was re-attached in new position
var lastChild=wrap$1(this).previousSibling;if(lastChild!==c$[c$.length-1]){for(var _i75=0,n;_i75<c$.length&&(n=c$[_i75]);_i75++){wrap$1(parentNode).insertBefore(n,this)}}}}}return!0}},{key:"__syncHostProperties",value:function __syncHostProperties(){var props=this.__invalidProps;if(props){for(var prop in props){this.__instance._setPendingProperty(prop,this.__dataHost[prop])}this.__invalidProps=null;this.__instance._flushProperties()}}},{key:"__teardownInstance",value:function __teardownInstance(){if(this.__instance){var c$=this.__instance.children;if(c$&&c$.length){// use first child parent, for case when dom-if may have been detached
var parent=wrap$1(c$[0]).parentNode;// Instance children may be disconnected from parents when dom-if
// detaches if a tree was innerHTML'ed
if(parent){parent=wrap$1(parent);for(var _i76=0,n;_i76<c$.length&&(n=c$[_i76]);_i76++){parent.removeChild(n)}}}this.__instance=null;this.__invalidProps=null}}/**
     * Shows or hides the template instance top level child elements. For
     * text nodes, `textContent` is removed while "hidden" and replaced when
     * "shown."
     * @return {void}
     * @protected
     * @suppress {visibility}
     */},{key:"_showHideChildren",value:function _showHideChildren(){var hidden=this.__hideTemplateChildren__||!this.if;if(this.__instance){this.__instance._showHideChildren(hidden)}}}]);return DomIf}(PolymerElement);_exports.DomIf=DomIf;customElements.define(DomIf.is,DomIf);var domIf={DomIf:DomIf};_exports.$domIf=domIf;var ArraySelectorMixin=dedupingMixin(function(superClass){/**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @private
   */var elementBase=ElementMixin(superClass),ArraySelectorMixin=/*#__PURE__*/function(_elementBase2){babelHelpers.inherits(ArraySelectorMixin,_elementBase2);babelHelpers.createClass(ArraySelectorMixin,null,[{key:"properties",get:function get(){return{/**
         * An array containing items from which selection will be made.
         */items:{type:Array},/**
         * When `true`, multiple items may be selected at once (in this case,
         * `selected` is an array of currently selected items).  When `false`,
         * only one item may be selected at a time.
         */multi:{type:Boolean,value:!1},/**
         * When `multi` is true, this is an array that contains any selected.
         * When `multi` is false, this is the currently selected item, or `null`
         * if no item is selected.
         * @type {?Object|?Array<!Object>}
         */selected:{type:Object,notify:!0},/**
         * When `multi` is false, this is the currently selected item, or `null`
         * if no item is selected.
         * @type {?Object}
         */selectedItem:{type:Object,notify:!0},/**
         * When `true`, calling `select` on an item that is already selected
         * will deselect the item.
         */toggle:{type:Boolean,value:!1}}}},{key:"observers",get:function get(){return["__updateSelection(multi, items.*)"]}}]);function ArraySelectorMixin(){var _this29;babelHelpers.classCallCheck(this,ArraySelectorMixin);_this29=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(ArraySelectorMixin).call(this));_this29.__lastItems=null;_this29.__lastMulti=null;_this29.__selectedMap=null;return _this29}babelHelpers.createClass(ArraySelectorMixin,[{key:"__updateSelection",value:function __updateSelection(multi,itemsInfo){var path=itemsInfo.path;if(path==JSCompiler_renameProperty("items",this)){// Case 1 - items array changed, so diff against previous array and
// deselect any removed items and adjust selected indices
var newItems=itemsInfo.base||[],lastItems=this.__lastItems,lastMulti=this.__lastMulti;if(multi!==lastMulti){this.clearSelection()}if(lastItems){var splices=calculateSplices(newItems,lastItems);this.__applySplices(splices)}this.__lastItems=newItems;this.__lastMulti=multi}else if(itemsInfo.path=="".concat(JSCompiler_renameProperty("items",this),".splices")){// Case 2 - got specific splice information describing the array mutation:
// deselect any removed items and adjust selected indices
this.__applySplices(itemsInfo.value.indexSplices)}else{// Case 3 - an array element was changed, so deselect the previous
// item for that index if it was previously selected
var part=path.slice("".concat(JSCompiler_renameProperty("items",this),".").length),idx=parseInt(part,10);if(0>part.indexOf(".")&&part==idx){this.__deselectChangedIdx(idx)}}}},{key:"__applySplices",value:function __applySplices(splices){// Adjust selected indices and mark removals
for(var _this30=this,selected=this.__selectedMap,_loop4=function _loop4(_i77){var s=splices[_i77];selected.forEach(function(idx,item){if(idx<s.index){// no change
}else if(idx>=s.index+s.removed.length){// adjust index
selected.set(item,idx+s.addedCount-s.removed.length)}else{// remove index
selected.set(item,-1)}});for(var j=0,idx;j<s.addedCount;j++){idx=s.index+j;if(selected.has(_this30.items[idx])){selected.set(_this30.items[idx],idx)}}},_i77=0;_i77<splices.length;_i77++){_loop4(_i77)}// Update linked paths
this.__updateLinks();// Remove selected items that were removed from the items array
var sidx=0;selected.forEach(function(idx,item){if(0>idx){if(_this30.multi){_this30.splice(JSCompiler_renameProperty("selected",_this30),sidx,1)}else{_this30.selected=_this30.selectedItem=null}selected.delete(item)}else{sidx++}})}},{key:"__updateLinks",value:function __updateLinks(){var _this31=this;this.__dataLinkedPaths={};if(this.multi){var sidx=0;this.__selectedMap.forEach(function(idx){if(0<=idx){_this31.linkPaths("".concat(JSCompiler_renameProperty("items",_this31),".").concat(idx),"".concat(JSCompiler_renameProperty("selected",_this31),".").concat(sidx++))}})}else{this.__selectedMap.forEach(function(idx){_this31.linkPaths(JSCompiler_renameProperty("selected",_this31),"".concat(JSCompiler_renameProperty("items",_this31),".").concat(idx));_this31.linkPaths(JSCompiler_renameProperty("selectedItem",_this31),"".concat(JSCompiler_renameProperty("items",_this31),".").concat(idx))})}}/**
       * Clears the selection state.
       * @override
       * @return {void}
       */},{key:"clearSelection",value:function clearSelection(){// Unbind previous selection
this.__dataLinkedPaths={};// The selected map stores 3 pieces of information:
// key: items array object
// value: items array index
// order: selected array index
this.__selectedMap=new Map;// Initialize selection
this.selected=this.multi?[]:null;this.selectedItem=null}/**
       * Returns whether the item is currently selected.
       *
       * @override
       * @param {*} item Item from `items` array to test
       * @return {boolean} Whether the item is selected
       */},{key:"isSelected",value:function isSelected(item){return this.__selectedMap.has(item)}/**
       * Returns whether the item is currently selected.
       *
       * @override
       * @param {number} idx Index from `items` array to test
       * @return {boolean} Whether the item is selected
       */},{key:"isIndexSelected",value:function isIndexSelected(idx){return this.isSelected(this.items[idx])}},{key:"__deselectChangedIdx",value:function __deselectChangedIdx(idx){var _this32=this,sidx=this.__selectedIndexForItemIndex(idx);if(0<=sidx){var _i78=0;this.__selectedMap.forEach(function(idx,item){if(sidx==_i78++){_this32.deselect(item)}})}}},{key:"__selectedIndexForItemIndex",value:function __selectedIndexForItemIndex(idx){var selected=this.__dataLinkedPaths["".concat(JSCompiler_renameProperty("items",this),".").concat(idx)];if(selected){return parseInt(selected.slice("".concat(JSCompiler_renameProperty("selected",this),".").length),10)}}/**
       * Deselects the given item if it is already selected.
       *
       * @override
       * @param {*} item Item from `items` array to deselect
       * @return {void}
       */},{key:"deselect",value:function deselect(item){var idx=this.__selectedMap.get(item);if(0<=idx){this.__selectedMap.delete(item);var sidx;if(this.multi){sidx=this.__selectedIndexForItemIndex(idx)}this.__updateLinks();if(this.multi){this.splice(JSCompiler_renameProperty("selected",this),sidx,1)}else{this.selected=this.selectedItem=null}}}/**
       * Deselects the given index if it is already selected.
       *
       * @override
       * @param {number} idx Index from `items` array to deselect
       * @return {void}
       */},{key:"deselectIndex",value:function deselectIndex(idx){this.deselect(this.items[idx])}/**
       * Selects the given item.  When `toggle` is true, this will automatically
       * deselect the item if already selected.
       *
       * @override
       * @param {*} item Item from `items` array to select
       * @return {void}
       */},{key:"select",value:function select(item){this.selectIndex(this.items.indexOf(item))}/**
       * Selects the given index.  When `toggle` is true, this will automatically
       * deselect the item if already selected.
       *
       * @override
       * @param {number} idx Index from `items` array to select
       * @return {void}
       */},{key:"selectIndex",value:function selectIndex(idx){var item=this.items[idx];if(!this.isSelected(item)){if(!this.multi){this.__selectedMap.clear()}this.__selectedMap.set(item,idx);this.__updateLinks();if(this.multi){this.push(JSCompiler_renameProperty("selected",this),item)}else{this.selected=this.selectedItem=item}}else if(this.toggle){this.deselectIndex(idx)}}}]);return ArraySelectorMixin}(elementBase);/**
                                                  * @polymer
                                                  * @mixinClass
                                                  * @implements {Polymer_ArraySelectorMixin}
                                                  * @unrestricted
                                                  */return ArraySelectorMixin});// export mixin
_exports.ArraySelectorMixin=ArraySelectorMixin;var baseArraySelector=ArraySelectorMixin(PolymerElement),ArraySelector=/*#__PURE__*/function(_baseArraySelector){babelHelpers.inherits(ArraySelector,_baseArraySelector);function ArraySelector(){babelHelpers.classCallCheck(this,ArraySelector);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(ArraySelector).apply(this,arguments))}babelHelpers.createClass(ArraySelector,null,[{key:"is",// Not needed to find template; can be removed once the analyzer
// can find the tag name from customElements.define call
get:function get(){return"array-selector"}},{key:"template",get:function get(){return null}}]);return ArraySelector}(baseArraySelector);/**
                                                             * Element implementing the `ArraySelector` mixin, which records
                                                             * dynamic associations between item paths in a master `items` array and a
                                                             * `selected` array such that path changes to the master array (at the host)
                                                             * element or elsewhere via data-binding) are correctly propagated to items
                                                             * in the selected array and vice-versa.
                                                             *
                                                             * The `items` property accepts an array of user data, and via the
                                                             * `select(item)` and `deselect(item)` API, updates the `selected` property
                                                             * which may be bound to other parts of the application, and any changes to
                                                             * sub-fields of `selected` item(s) will be kept in sync with items in the
                                                             * `items` array.  When `multi` is false, `selected` is a property
                                                             * representing the last selected item.  When `multi` is true, `selected`
                                                             * is an array of multiply selected items.
                                                             *
                                                             * Example:
                                                             *
                                                             * ```js
                                                             * import {PolymerElement} from '@polymer/polymer';
                                                             * import '@polymer/polymer/lib/elements/array-selector.js';
                                                             *
                                                             * class EmployeeList extends PolymerElement {
                                                             *   static get _template() {
                                                             *     return html`
                                                             *         <div> Employee list: </div>
                                                             *         <dom-repeat id="employeeList" items="{{employees}}">
                                                             *           <template>
                                                             *             <div>First name: <span>{{item.first}}</span></div>
                                                             *               <div>Last name: <span>{{item.last}}</span></div>
                                                             *               <button on-click="toggleSelection">Select</button>
                                                             *           </template>
                                                             *         </dom-repeat>
                                                             *
                                                             *         <array-selector id="selector"
                                                             *                         items="{{employees}}"
                                                             *                         selected="{{selected}}"
                                                             *                         multi toggle></array-selector>
                                                             *
                                                             *         <div> Selected employees: </div>
                                                             *         <dom-repeat items="{{selected}}">
                                                             *           <template>
                                                             *             <div>First name: <span>{{item.first}}</span></div>
                                                             *             <div>Last name: <span>{{item.last}}</span></div>
                                                             *           </template>
                                                             *         </dom-repeat>`;
                                                             *   }
                                                             *   static get is() { return 'employee-list'; }
                                                             *   static get properties() {
                                                             *     return {
                                                             *       employees: {
                                                             *         value() {
                                                             *           return [
                                                             *             {first: 'Bob', last: 'Smith'},
                                                             *             {first: 'Sally', last: 'Johnson'},
                                                             *             ...
                                                             *           ];
                                                             *         }
                                                             *       }
                                                             *     };
                                                             *   }
                                                             *   toggleSelection(e) {
                                                             *     const item = this.$.employeeList.itemForElement(e.target);
                                                             *     this.$.selector.select(item);
                                                             *   }
                                                             * }
                                                             * ```
                                                             *
                                                             * @polymer
                                                             * @customElement
                                                             * @extends {baseArraySelector}
                                                             * @appliesMixin ArraySelectorMixin
                                                             * @summary Custom element that links paths between an input `items` array and
                                                             *   an output `selected` item or array based on calls to its selection API.
                                                             */_exports.ArraySelector=ArraySelector;customElements.define(ArraySelector.is,ArraySelector);var arraySelector={ArraySelectorMixin:ArraySelectorMixin,ArraySelector:ArraySelector};/**
   @license
   Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   Code distributed by Google as part of the polymer project is also
   subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */_exports.$arraySelector=arraySelector;"use strict";var customStyleInterface$1=new CustomStyleInterface;if(!window.ShadyCSS){window.ShadyCSS={/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */prepareTemplate:function prepareTemplate(template,elementName,elementExtends){},// eslint-disable-line no-unused-vars
/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     */prepareTemplateDom:function prepareTemplateDom(template,elementName){},// eslint-disable-line no-unused-vars
/**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */prepareTemplateStyles:function prepareTemplateStyles(template,elementName,elementExtends){},// eslint-disable-line no-unused-vars
/**
     * @param {Element} element
     * @param {Object=} properties
     */styleSubtree:function styleSubtree(element,properties){customStyleInterface$1.processStyles();updateNativeProperties(element,properties)},/**
     * @param {Element} element
     */styleElement:function styleElement(element){// eslint-disable-line no-unused-vars
customStyleInterface$1.processStyles()},/**
     * @param {Object=} properties
     */styleDocument:function styleDocument(properties){customStyleInterface$1.processStyles();updateNativeProperties(document.body,properties)},/**
     * @param {Element} element
     * @param {string} property
     * @return {string}
     */getComputedStyleValue:function getComputedStyleValue(element,property){return _getComputedStyleValue(element,property)},flushCustomStyles:function flushCustomStyles(){},nativeCss:nativeCssVariables,nativeShadow:nativeShadow,cssBuild:cssBuild,disableRuntime:disableRuntime}}window.ShadyCSS.CustomStyleInterface=customStyleInterface$1;var attr="include",CustomStyleInterface$1=window.ShadyCSS.CustomStyleInterface,CustomStyle=/*#__PURE__*/function(_HTMLElement2){babelHelpers.inherits(CustomStyle,_HTMLElement2);function CustomStyle(){var _this33;babelHelpers.classCallCheck(this,CustomStyle);_this33=babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(CustomStyle).call(this));_this33._style=null;CustomStyleInterface$1.addCustomStyle(babelHelpers.assertThisInitialized(_this33));return _this33}/**
     * Returns the light-DOM `<style>` child this element wraps.  Upon first
     * call any style modules referenced via the `include` attribute will be
     * concatenated to this element's `<style>`.
     *
     * @export
     * @return {HTMLStyleElement} This element's light-DOM `<style>`
     */babelHelpers.createClass(CustomStyle,[{key:"getStyle",value:function getStyle(){if(this._style){return this._style}var style=/** @type {HTMLStyleElement} */this.querySelector("style");if(!style){return null}this._style=style;var include=style.getAttribute(attr);if(include){style.removeAttribute(attr);/** @suppress {deprecated} */style.textContent=cssFromModules(include)+style.textContent}/*
      HTML Imports styling the main document are deprecated in Chrome
      https://crbug.com/523952
       If this element is not in the main document, then it must be in an HTML Import document.
      In that case, move the custom style to the main document.
       The ordering of `<custom-style>` should stay the same as when loaded by HTML Imports, but there may be odd
      cases of ordering w.r.t the main document styles.
      */if(this.ownerDocument!==window.document){window.document.head.appendChild(this)}return this._style}}]);return CustomStyle}(babelHelpers.wrapNativeSuper(HTMLElement));_exports.CustomStyle=CustomStyle;window.customElements.define("custom-style",CustomStyle);var customStyle={CustomStyle:CustomStyle};_exports.$customStyle=customStyle;var mutablePropertyChange$1;/** @suppress {missingProperties} */(function(){mutablePropertyChange$1=MutableData._mutablePropertyChange})();/**
       * Legacy element behavior to skip strict dirty-checking for objects and arrays,
       * (always consider them to be "dirty") for use on legacy API Polymer elements.
       *
       * By default, `Polymer.PropertyEffects` performs strict dirty checking on
       * objects, which means that any deep modifications to an object or array will
       * not be propagated unless "immutable" data patterns are used (i.e. all object
       * references from the root to the mutation were changed).
       *
       * Polymer also provides a proprietary data mutation and path notification API
       * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
       * mutation and notification of deep changes in an object graph to all elements
       * bound to the same object graph.
       *
       * In cases where neither immutable patterns nor the data mutation API can be
       * used, applying this mixin will cause Polymer to skip dirty checking for
       * objects and arrays (always consider them to be "dirty").  This allows a
       * user to make a deep modification to a bound object graph, and then either
       * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
       * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
       * elements that wish to be updated based on deep mutations must apply this
       * mixin or otherwise skip strict dirty checking for objects/arrays.
       * Specifically, any elements in the binding tree between the source of a
       * mutation and the consumption of it must apply this behavior or enable the
       * `Polymer.OptionalMutableDataBehavior`.
       *
       * In order to make the dirty check strategy configurable, see
       * `Polymer.OptionalMutableDataBehavior`.
       *
       * Note, the performance characteristics of propagating large object graphs
       * will be worse as opposed to using strict dirty checking with immutable
       * patterns or Polymer's path notification API.
       *
       * @polymerBehavior
       * @summary Behavior to skip strict dirty-checking for objects and
       *   arrays
       */var MutableDataBehavior={/**
   * Overrides `Polymer.PropertyEffects` to provide option for skipping
   * strict equality checking for Objects and Arrays.
   *
   * This method pulls the value to dirty check against from the `__dataTemp`
   * cache (rather than the normal `__data` cache) for Objects.  Since the temp
   * cache is cleared at the end of a turn, this implementation allows
   * side-effects of deep object changes to be processed by re-setting the
   * same object (using the temp cache as an in-turn backstop to prevent
   * cycles due to 2-way notification).
   *
   * @param {string} property Property name
   * @param {*} value New property value
   * @param {*} old Previous property value
   * @return {boolean} Whether the property should be considered a change
   * @protected
   * @override
   */_shouldPropertyChange:function _shouldPropertyChange(property,value,old){return mutablePropertyChange$1(this,property,value,old,!0)}};/**
    * Legacy element behavior to add the optional ability to skip strict
    * dirty-checking for objects and arrays (always consider them to be
    * "dirty") by setting a `mutable-data` attribute on an element instance.
    *
    * By default, `Polymer.PropertyEffects` performs strict dirty checking on
    * objects, which means that any deep modifications to an object or array will
    * not be propagated unless "immutable" data patterns are used (i.e. all object
    * references from the root to the mutation were changed).
    *
    * Polymer also provides a proprietary data mutation and path notification API
    * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
    * mutation and notification of deep changes in an object graph to all elements
    * bound to the same object graph.
    *
    * In cases where neither immutable patterns nor the data mutation API can be
    * used, applying this mixin will allow Polymer to skip dirty checking for
    * objects and arrays (always consider them to be "dirty").  This allows a
    * user to make a deep modification to a bound object graph, and then either
    * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
    * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
    * elements that wish to be updated based on deep mutations must apply this
    * mixin or otherwise skip strict dirty checking for objects/arrays.
    * Specifically, any elements in the binding tree between the source of a
    * mutation and the consumption of it must enable this behavior or apply the
    * `Polymer.OptionalMutableDataBehavior`.
    *
    * While this behavior adds the ability to forgo Object/Array dirty checking,
    * the `mutableData` flag defaults to false and must be set on the instance.
    *
    * Note, the performance characteristics of propagating large object graphs
    * will be worse by relying on `mutableData: true` as opposed to using
    * strict dirty checking with immutable patterns or Polymer's path notification
    * API.
    *
    * @polymerBehavior
    * @summary Behavior to optionally skip strict dirty-checking for objects and
    *   arrays
    */_exports.MutableDataBehavior=MutableDataBehavior;var OptionalMutableDataBehavior={properties:{/**
     * Instance-level flag for configuring the dirty-checking strategy
     * for this element.  When true, Objects and Arrays will skip dirty
     * checking, otherwise strict equality checking will be used.
     */mutableData:Boolean},/**
   * Overrides `Polymer.PropertyEffects` to skip strict equality checking
   * for Objects and Arrays.
   *
   * Pulls the value to dirty check against from the `__dataTemp` cache
   * (rather than the normal `__data` cache) for Objects.  Since the temp
   * cache is cleared at the end of a turn, this implementation allows
   * side-effects of deep object changes to be processed by re-setting the
   * same object (using the temp cache as an in-turn backstop to prevent
   * cycles due to 2-way notification).
   *
   * @param {string} property Property name
   * @param {*} value New property value
   * @param {*} old Previous property value
   * @return {boolean} Whether the property should be considered a change
   * @protected
   * @override
   */_shouldPropertyChange:function _shouldPropertyChange(property,value,old){return mutablePropertyChange$1(this,property,value,old,this.mutableData)}};_exports.OptionalMutableDataBehavior=OptionalMutableDataBehavior;var mutableDataBehavior={MutableDataBehavior:MutableDataBehavior,OptionalMutableDataBehavior:OptionalMutableDataBehavior};_exports.$mutableDataBehavior=mutableDataBehavior;var Base=LegacyElementMixin(HTMLElement).prototype;_exports.Base=Base;var polymerLegacy={Base:Base,Polymer:Polymer,html:html};_exports.$polymerLegacy=polymerLegacy;var IronA11yAnnouncer=Polymer({_template:html(_templateObject_6bf96330d65d11eaa5e0898854dcb572()),is:"iron-a11y-announcer",properties:{/**
     * The value of mode is used to set the `aria-live` attribute
     * for the element that will be announced. Valid values are: `off`,
     * `polite` and `assertive`.
     */mode:{type:String,value:"polite"},_text:{type:String,value:""}},created:function created(){if(!IronA11yAnnouncer.instance){IronA11yAnnouncer.instance=this}document.body.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},/**
   * Cause a text string to be announced by screen readers.
   *
   * @param {string} text The text that should be announced.
   */announce:function announce(text){this._text="";this.async(function(){this._text=text},100)},_onIronAnnounce:function _onIronAnnounce(event){if(event.detail&&event.detail.text){this.announce(event.detail.text)}}});_exports.IronA11yAnnouncer=IronA11yAnnouncer;IronA11yAnnouncer.instance=null;IronA11yAnnouncer.requestAvailability=function(){if(!IronA11yAnnouncer.instance){IronA11yAnnouncer.instance=document.createElement("iron-a11y-announcer")}document.body.appendChild(IronA11yAnnouncer.instance)};var ironA11yAnnouncer={IronA11yAnnouncer:IronA11yAnnouncer};_exports.$ironA11yAnnouncer=ironA11yAnnouncer;var KEY_IDENTIFIER={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},KEY_CODE={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},MODIFIER_KEYS={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},KEY_CHAR=/[a-z0-9*]/,IDENT_CHAR=/U\+/,ARROW_KEY=/^arrow/,SPACE_KEY=/^space(bar)?/,ESC_KEY=/^escape$/;/**
    * Special table for KeyboardEvent.keyCode.
    * KeyboardEvent.keyIdentifier is better, and KeyBoardEvent.key is even better
    * than that.
    *
    * Values from:
    * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent.keyCode#Value_of_keyCode
    */ /**
                           * Transforms the key.
                           * @param {string} key The KeyBoardEvent.key
                           * @param {Boolean} [noSpecialChars] Limits the transformation to
                           * alpha-numeric characters.
                           */function transformKey(key,noSpecialChars){var validKey="";if(key){var lKey=key.toLowerCase();if(" "===lKey||SPACE_KEY.test(lKey)){validKey="space"}else if(ESC_KEY.test(lKey)){validKey="esc"}else if(1==lKey.length){if(!noSpecialChars||KEY_CHAR.test(lKey)){validKey=lKey}}else if(ARROW_KEY.test(lKey)){validKey=lKey.replace("arrow","")}else if("multiply"==lKey){// numpad '*' can map to Multiply on IE/Windows
validKey="*"}else{validKey=lKey}}return validKey}function transformKeyIdentifier(keyIdent){var validKey="";if(keyIdent){if(keyIdent in KEY_IDENTIFIER){validKey=KEY_IDENTIFIER[keyIdent]}else if(IDENT_CHAR.test(keyIdent)){keyIdent=parseInt(keyIdent.replace("U+","0x"),16);validKey=String.fromCharCode(keyIdent).toLowerCase()}else{validKey=keyIdent.toLowerCase()}}return validKey}function transformKeyCode(keyCode){var validKey="";if(+keyCode){if(65<=keyCode&&90>=keyCode){// ascii a-z
// lowercase is 32 offset from uppercase
validKey=String.fromCharCode(32+keyCode)}else if(112<=keyCode&&123>=keyCode){// function keys f1-f12
validKey="f"+(keyCode-112+1)}else if(48<=keyCode&&57>=keyCode){// top 0-9 keys
validKey=keyCode-48+""}else if(96<=keyCode&&105>=keyCode){// num pad 0-9
validKey=keyCode-96+""}else{validKey=KEY_CODE[keyCode]}}return validKey}/**
   * Calculates the normalized key for a KeyboardEvent.
   * @param {KeyboardEvent} keyEvent
   * @param {Boolean} [noSpecialChars] Set to true to limit keyEvent.key
   * transformation to alpha-numeric chars. This is useful with key
   * combinations like shift + 2, which on FF for MacOS produces
   * keyEvent.key = @
   * To get 2 returned, set noSpecialChars = true
   * To get @ returned, set noSpecialChars = false
   */function normalizedKeyForEvent(keyEvent,noSpecialChars){// Fall back from .key, to .detail.key for artifical keyboard events,
// and then to deprecated .keyIdentifier and .keyCode.
if(keyEvent.key){return transformKey(keyEvent.key,noSpecialChars)}if(keyEvent.detail&&keyEvent.detail.key){return transformKey(keyEvent.detail.key,noSpecialChars)}return transformKeyIdentifier(keyEvent.keyIdentifier)||transformKeyCode(keyEvent.keyCode)||""}function keyComboMatchesEvent(keyCombo,event){// For combos with modifiers we support only alpha-numeric keys
var keyEvent=normalizedKeyForEvent(event,keyCombo.hasModifiers);return keyEvent===keyCombo.key&&(!keyCombo.hasModifiers||!!event.shiftKey===!!keyCombo.shiftKey&&!!event.ctrlKey===!!keyCombo.ctrlKey&&!!event.altKey===!!keyCombo.altKey&&!!event.metaKey===!!keyCombo.metaKey)}function parseKeyComboString(keyComboString){if(1===keyComboString.length){return{combo:keyComboString,key:keyComboString,event:"keydown"}}return keyComboString.split("+").reduce(function(parsedKeyCombo,keyComboPart){var eventParts=keyComboPart.split(":"),keyName=eventParts[0],event=eventParts[1];if(keyName in MODIFIER_KEYS){parsedKeyCombo[MODIFIER_KEYS[keyName]]=!0;parsedKeyCombo.hasModifiers=!0}else{parsedKeyCombo.key=keyName;parsedKeyCombo.event=event||"keydown"}return parsedKeyCombo},{combo:keyComboString.split(":").shift()})}function parseEventString(eventString){return eventString.trim().split(" ").map(function(keyComboString){return parseKeyComboString(keyComboString)})}/**
   * `Polymer.IronA11yKeysBehavior` provides a normalized interface for processing
   * keyboard commands that pertain to [WAI-ARIA best
   * practices](http://www.w3.org/TR/wai-aria-practices/#kbd_general_binding). The
   * element takes care of browser differences with respect to Keyboard events and
   * uses an expressive syntax to filter key presses.
   *
   * Use the `keyBindings` prototype property to express what combination of keys
   * will trigger the callback. A key binding has the format
   * `"KEY+MODIFIER:EVENT": "callback"` (`"KEY": "callback"` or
   * `"KEY:EVENT": "callback"` are valid as well). Some examples:
   *
   *      keyBindings: {
   *        'space': '_onKeydown', // same as 'space:keydown'
   *        'shift+tab': '_onKeydown',
   *        'enter:keypress': '_onKeypress',
   *        'esc:keyup': '_onKeyup'
   *      }
   *
   * The callback will receive with an event containing the following information
   * in `event.detail`:
   *
   *      _onKeydown: function(event) {
   *        console.log(event.detail.combo); // KEY+MODIFIER, e.g. "shift+tab"
   *        console.log(event.detail.key); // KEY only, e.g. "tab"
   *        console.log(event.detail.event); // EVENT, e.g. "keydown"
   *        console.log(event.detail.keyboardEvent); // the original KeyboardEvent
   *      }
   *
   * Use the `keyEventTarget` attribute to set up event handlers on a specific
   * node.
   *
   * See the [demo source
   * code](https://github.com/PolymerElements/iron-a11y-keys-behavior/blob/master/demo/x-key-aware.html)
   * for an example.
   *
   * @demo demo/index.html
   * @polymerBehavior
   */var IronA11yKeysBehavior={properties:{/**
     * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     * @type {?EventTarget}
     */keyEventTarget:{type:Object,value:function value(){return this}},/**
     * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function value(){return[]}},// We use this due to a limitation in IE10 where instances will have
// own properties of everything on the "prototype".
_imperativeKeyBindings:{type:Object,value:function value(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],/**
   * To be used to express what combination of keys  will trigger the relative
   * callback. e.g. `keyBindings: { 'esc': '_onEscPressed'}`
   * @type {!Object}
   */keyBindings:{},registered:function registered(){this._prepKeyBindings()},attached:function attached(){this._listenKeyEventListeners()},detached:function detached(){this._unlistenKeyEventListeners()},/**
   * Can be used to imperatively add a key binding to the implementing
   * element. This is the imperative equivalent of declaring a keybinding
   * in the `keyBindings` prototype property.
   *
   * @param {string} eventString
   * @param {string} handlerName
   */addOwnKeyBinding:function addOwnKeyBinding(eventString,handlerName){this._imperativeKeyBindings[eventString]=handlerName;this._prepKeyBindings();this._resetKeyEventListeners()},/**
   * When called, will remove all imperatively-added key bindings.
   */removeOwnKeyBindings:function removeOwnKeyBindings(){this._imperativeKeyBindings={};this._prepKeyBindings();this._resetKeyEventListeners()},/**
   * Returns true if a keyboard event matches `eventString`.
   *
   * @param {KeyboardEvent} event
   * @param {string} eventString
   * @return {boolean}
   */keyboardEventMatchesKeys:function keyboardEventMatchesKeys(event,eventString){for(var keyCombos=parseEventString(eventString),i=0;i<keyCombos.length;++i){if(keyComboMatchesEvent(keyCombos[i],event)){return!0}}return!1},_collectKeyBindings:function _collectKeyBindings(){var keyBindings=this.behaviors.map(function(behavior){return behavior.keyBindings});if(-1===keyBindings.indexOf(this.keyBindings)){keyBindings.push(this.keyBindings)}return keyBindings},_prepKeyBindings:function _prepKeyBindings(){this._keyBindings={};this._collectKeyBindings().forEach(function(keyBindings){for(var eventString in keyBindings){this._addKeyBinding(eventString,keyBindings[eventString])}},this);for(var eventString in this._imperativeKeyBindings){this._addKeyBinding(eventString,this._imperativeKeyBindings[eventString])}// Give precedence to combos with modifiers to be checked first.
for(var eventName in this._keyBindings){this._keyBindings[eventName].sort(function(kb1,kb2){var b1=kb1[0].hasModifiers,b2=kb2[0].hasModifiers;return b1===b2?0:b1?-1:1})}},_addKeyBinding:function _addKeyBinding(eventString,handlerName){parseEventString(eventString).forEach(function(keyCombo){this._keyBindings[keyCombo.event]=this._keyBindings[keyCombo.event]||[];this._keyBindings[keyCombo.event].push([keyCombo,handlerName])},this)},_resetKeyEventListeners:function _resetKeyEventListeners(){this._unlistenKeyEventListeners();if(this.isAttached){this._listenKeyEventListeners()}},_listenKeyEventListeners:function _listenKeyEventListeners(){if(!this.keyEventTarget){return}Object.keys(this._keyBindings).forEach(function(eventName){var keyBindings=this._keyBindings[eventName],boundKeyHandler=this._onKeyBindingEvent.bind(this,keyBindings);this._boundKeyHandlers.push([this.keyEventTarget,eventName,boundKeyHandler]);this.keyEventTarget.addEventListener(eventName,boundKeyHandler)},this)},_unlistenKeyEventListeners:function _unlistenKeyEventListeners(){var keyHandlerTuple,keyEventTarget,eventName,boundKeyHandler;while(this._boundKeyHandlers.length){// My kingdom for block-scope binding and destructuring assignment..
keyHandlerTuple=this._boundKeyHandlers.pop();keyEventTarget=keyHandlerTuple[0];eventName=keyHandlerTuple[1];boundKeyHandler=keyHandlerTuple[2];keyEventTarget.removeEventListener(eventName,boundKeyHandler)}},_onKeyBindingEvent:function _onKeyBindingEvent(keyBindings,event){if(this.stopKeyboardEventPropagation){event.stopPropagation()}// if event has been already prevented, don't do anything
if(event.defaultPrevented){return}for(var i=0;i<keyBindings.length;i++){var keyCombo=keyBindings[i][0],handlerName=keyBindings[i][1];if(keyComboMatchesEvent(keyCombo,event)){this._triggerKeyHandler(keyCombo,handlerName,event);// exit the loop if eventDefault was prevented
if(event.defaultPrevented){return}}}},_triggerKeyHandler:function _triggerKeyHandler(keyCombo,handlerName,keyboardEvent){var detail=Object.create(keyCombo);detail.keyboardEvent=keyboardEvent;var event=new CustomEvent(keyCombo.event,{detail:detail,cancelable:!0});this[handlerName].call(this,event);if(event.defaultPrevented){keyboardEvent.preventDefault()}}};_exports.IronA11yKeysBehavior=IronA11yKeysBehavior;var ironA11yKeysBehavior={IronA11yKeysBehavior:IronA11yKeysBehavior};_exports.$ironA11yKeysBehavior=ironA11yKeysBehavior;Polymer({is:"iron-request",hostAttributes:{hidden:!0},properties:{/**
     * A reference to the XMLHttpRequest instance used to generate the
     * network request.
     *
     * @type {XMLHttpRequest}
     */xhr:{type:Object,notify:!0,readOnly:!0,value:function value(){return new XMLHttpRequest}},/**
     * A reference to the parsed response body, if the `xhr` has completely
     * resolved.
     *
     * @type {*}
     * @default null
     */response:{type:Object,notify:!0,readOnly:!0,value:function value(){return null}},/**
     * A reference to the status code, if the `xhr` has completely resolved.
     */status:{type:Number,notify:!0,readOnly:!0,value:0},/**
     * A reference to the status text, if the `xhr` has completely resolved.
     */statusText:{type:String,notify:!0,readOnly:!0,value:""},/**
     * A promise that resolves when the `xhr` response comes back, or rejects
     * if there is an error before the `xhr` completes.
     * The resolve callback is called with the original request as an argument.
     * By default, the reject callback is called with an `Error` as an argument.
     * If `rejectWithRequest` is true, the reject callback is called with an
     * object with two keys: `request`, the original request, and `error`, the
     * error object.
     *
     * @type {Promise}
     */completes:{type:Object,readOnly:!0,notify:!0,value:function value(){return new Promise(function(resolve,reject){this.resolveCompletes=resolve;this.rejectCompletes=reject}.bind(this))}},/**
     * An object that contains progress information emitted by the XHR if
     * available.
     *
     * @default {}
     */progress:{type:Object,notify:!0,readOnly:!0,value:function value(){return{}}},/**
     * Aborted will be true if an abort of the request is attempted.
     */aborted:{type:Boolean,notify:!0,readOnly:!0,value:!1},/**
     * Errored will be true if the browser fired an error event from the
     * XHR object (mainly network errors).
     */errored:{type:Boolean,notify:!0,readOnly:!0,value:!1},/**
     * TimedOut will be true if the XHR threw a timeout event.
     */timedOut:{type:Boolean,notify:!0,readOnly:!0,value:!1}},/**
   * Succeeded is true if the request succeeded. The request succeeded if it
   * loaded without error, wasn't aborted, and the status code is ≥ 200, and
   * < 300, or if the status code is 0.
   *
   * The status code 0 is accepted as a success because some schemes - e.g.
   * file:// - don't provide status codes.
   *
   * @return {boolean}
   */get succeeded(){if(this.errored||this.aborted||this.timedOut){return!1}var status=this.xhr.status||0;// Note: if we are using the file:// protocol, the status code will be 0
// for all outcomes (successful or otherwise).
return 0===status||200<=status&&300>status},/**
   * Sends an HTTP request to the server and returns a promise (see the
   * `completes` property for details).
   *
   * The handling of the `body` parameter will vary based on the Content-Type
   * header. See the docs for iron-ajax's `body` property for details.
   *
   * @param {{
   *   url: string,
   *   method: (string|undefined),
   *   async: (boolean|undefined),
   *   body:
   * (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined|Object),
   *   headers: (Object|undefined),
   *   handleAs: (string|undefined),
   *   jsonPrefix: (string|undefined),
   *   withCredentials: (boolean|undefined),
   *   timeout: (number|undefined),
   *   rejectWithRequest: (boolean|undefined)}} options -
   *   - url The url to which the request is sent.
   *   - method The HTTP method to use, default is GET.
   *   - async By default, all requests are sent asynchronously. To send
   * synchronous requests, set to false.
   *   -  body The content for the request body for POST method.
   *   -  headers HTTP request headers.
   *   -  handleAs The response type. Default is 'text'.
   *   -  withCredentials Whether or not to send credentials on the request.
   * Default is false.
   *   -  timeout - Timeout for request, in milliseconds.
   *   -  rejectWithRequest Set to true to include the request object with
   * promise rejections.
   * @return {Promise}
   */send:function send(options){var xhr=this.xhr;if(0<xhr.readyState){return null}xhr.addEventListener("progress",function(progress){this._setProgress({lengthComputable:progress.lengthComputable,loaded:progress.loaded,total:progress.total});// Webcomponents v1 spec does not fire *-changed events when not connected
this.fire("iron-request-progress-changed",{value:this.progress})}.bind(this));xhr.addEventListener("error",function(error){this._setErrored(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("timeout",function(error){this._setTimedOut(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("abort",function(){this._setAborted(!0);this._updateStatus();var error=new Error("Request aborted."),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));// Called after all of the above.
xhr.addEventListener("loadend",function(){this._updateStatus();this._setResponse(this.parseResponse());if(!this.succeeded){var error=new Error("The request failed with status code: "+this.xhr.status),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response);return}this.resolveCompletes(this)}.bind(this));this.url=options.url;var isXHRAsync=!1!==options.async;xhr.open(options.method||"GET",options.url,isXHRAsync);var acceptType={json:"application/json",text:"text/plain",html:"text/html",xml:"application/xml",arraybuffer:"application/octet-stream"}[options.handleAs],headers=options.headers||Object.create(null),newHeaders=Object.create(null);for(var key in headers){newHeaders[key.toLowerCase()]=headers[key]}headers=newHeaders;if(acceptType&&!headers.accept){headers.accept=acceptType}Object.keys(headers).forEach(function(requestHeader){if(/[A-Z]/.test(requestHeader)){Base._error("Headers must be lower case, got",requestHeader)}xhr.setRequestHeader(requestHeader,headers[requestHeader])},this);if(isXHRAsync){xhr.timeout=options.timeout;var handleAs=options.handleAs;// If a JSON prefix is present, the responseType must be 'text' or the
// browser won’t be able to parse the response.
if(!!options.jsonPrefix||!handleAs){handleAs="text"}// In IE, `xhr.responseType` is an empty string when the response
// returns. Hence, caching it as `xhr._responseType`.
xhr.responseType=xhr._responseType=handleAs;// Cache the JSON prefix, if it exists.
if(!!options.jsonPrefix){xhr._jsonPrefix=options.jsonPrefix}}xhr.withCredentials=!!options.withCredentials;var body=this._encodeBodyObject(options.body,headers["content-type"]);xhr.send(/**
                 @type {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|
                         null|string|undefined}
               */body);return this.completes},/**
   * Attempts to parse the response body of the XHR. If parsing succeeds,
   * the value returned will be deserialized based on the `responseType`
   * set on the XHR.
   *
   * @return {*} The parsed response,
   * or undefined if there was an empty response or parsing failed.
   */parseResponse:function parseResponse(){var xhr=this.xhr,responseType=xhr.responseType||xhr._responseType,preferResponseText=!this.xhr.responseType,prefixLen=xhr._jsonPrefix&&xhr._jsonPrefix.length||0;try{switch(responseType){case"json":// If the xhr object doesn't have a natural `xhr.responseType`,
// we can assume that the browser hasn't parsed the response for us,
// and so parsing is our responsibility. Likewise if response is
// undefined, as there's no way to encode undefined in JSON.
if(preferResponseText||xhr.response===void 0){// Try to emulate the JSON section of the response body section of
// the spec: https://xhr.spec.whatwg.org/#response-body
// That is to say, we try to parse as JSON, but if anything goes
// wrong return null.
try{return JSON.parse(xhr.responseText)}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.response;case"xml":return xhr.responseXML;case"blob":case"document":case"arraybuffer":return xhr.response;case"text":default:{// If `prefixLen` is set, it implies the response should be parsed
// as JSON once the prefix of length `prefixLen` is stripped from
// it. Emulate the behavior above where null is returned on failure
// to parse.
if(prefixLen){try{return JSON.parse(xhr.responseText.substring(prefixLen))}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.responseText}}}catch(e){this.rejectCompletes(new Error("Could not parse response. "+e.message))}},/**
   * Aborts the request.
   */abort:function abort(){this._setAborted(!0);this.xhr.abort()},/**
   * @param {*} body The given body of the request to try and encode.
   * @param {?string} contentType The given content type, to infer an encoding
   *     from.
   * @return {*} Either the encoded body as a string, if successful,
   *     or the unaltered body object if no encoding could be inferred.
   */_encodeBodyObject:function _encodeBodyObject(body,contentType){if("string"==typeof body){return body;// Already encoded.
}var bodyObj=/** @type {Object} */body;switch(contentType){case"application/json":return JSON.stringify(bodyObj);case"application/x-www-form-urlencoded":return this._wwwFormUrlEncode(bodyObj);}return body},/**
   * @param {Object} object The object to encode as x-www-form-urlencoded.
   * @return {string} .
   */_wwwFormUrlEncode:function _wwwFormUrlEncode(object){if(!object){return""}var pieces=[];Object.keys(object).forEach(function(key){// TODO(rictic): handle array values here, in a consistent way with
//   iron-ajax params.
pieces.push(this._wwwFormUrlEncodePiece(key)+"="+this._wwwFormUrlEncodePiece(object[key]))},this);return pieces.join("&")},/**
   * @param {*} str A key or value to encode as x-www-form-urlencoded.
   * @return {string} .
   */_wwwFormUrlEncodePiece:function _wwwFormUrlEncodePiece(str){// Spec says to normalize newlines to \r\n and replace %20 spaces with +.
// jQuery does this as well, so this is likely to be widely compatible.
if(null===str||str===void 0||!str.toString){return""}return encodeURIComponent(str.toString().replace(/\r?\n/g,"\r\n")).replace(/%20/g,"+")},/**
   * Updates the status code and status text.
   */_updateStatus:function _updateStatus(){this._setStatus(this.xhr.status);this._setStatusText(this.xhr.statusText===void 0?"":this.xhr.statusText)}});Polymer({is:"iron-ajax",/**
   * Fired before a request is sent.
   *
   * @event iron-ajax-presend
   */ /**
       * Fired when a request is sent.
       *
       * @event request
       */ /**
           * Fired when a request is sent.
           *
           * @event iron-ajax-request
           */ /**
               * Fired when a response is received.
               *
               * @event response
               */ /**
                   * Fired when a response is received.
                   *
                   * @event iron-ajax-response
                   */ /**
                       * Fired when an error is received.
                       *
                       * @event error
                       */ /**
                           * Fired when an error is received.
                           *
                           * @event iron-ajax-error
                           */hostAttributes:{hidden:!0},properties:{/**
     * The URL target of the request.
     */url:{type:String},/**
     * An object that contains query parameters to be appended to the
     * specified `url` when generating a request. If you wish to set the body
     * content when making a POST request, you should use the `body` property
     * instead.
     */params:{type:Object,value:function value(){return{}}},/**
     * The HTTP method to use such as 'GET', 'POST', 'PUT', or 'DELETE'.
     * Default is 'GET'.
     */method:{type:String,value:"GET"},/**
     * HTTP request headers to send.
     *
     * Example:
     *
     *     <iron-ajax
     *         auto
     *         url="http://somesite.com"
     *         headers='{"X-Requested-With": "XMLHttpRequest"}'
     *         handle-as="json"></iron-ajax>
     *
     * Note: setting a `Content-Type` header here will override the value
     * specified by the `contentType` property of this element.
     */headers:{type:Object,value:function value(){return{}}},/**
     * Content type to use when sending data. If the `contentType` property
     * is set and a `Content-Type` header is specified in the `headers`
     * property, the `headers` property value will take precedence.
     *
     * Varies the handling of the `body` param.
     */contentType:{type:String,value:null},/**
     * Body content to send with the request, typically used with "POST"
     * requests.
     *
     * If body is a string it will be sent unmodified.
     *
     * If Content-Type is set to a value listed below, then
     * the body will be encoded accordingly.
     *
     *    * `content-type="application/json"`
     *      * body is encoded like `{"foo":"bar baz","x":1}`
     *    * `content-type="application/x-www-form-urlencoded"`
     *      * body is encoded like `foo=bar+baz&x=1`
     *
     * Otherwise the body will be passed to the browser unmodified, and it
     * will handle any encoding (e.g. for FormData, Blob, ArrayBuffer).
     *
     * @type
     * (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined|Object)
     */body:{type:Object,value:null},/**
     * Toggle whether XHR is synchronous or asynchronous. Don't change this
     * to true unless You Know What You Are Doing™.
     */sync:{type:Boolean,value:!1},/**
     * Specifies what data to store in the `response` property, and
     * to deliver as `event.detail.response` in `response` events.
     *
     * One of:
     *
     *    `text`: uses `XHR.responseText`.
     *
     *    `xml`: uses `XHR.responseXML`.
     *
     *    `json`: uses `XHR.responseText` parsed as JSON.
     *
     *    `arraybuffer`: uses `XHR.response`.
     *
     *    `blob`: uses `XHR.response`.
     *
     *    `document`: uses `XHR.response`.
     */handleAs:{type:String,value:"json"},/**
     * Set the withCredentials flag on the request.
     */withCredentials:{type:Boolean,value:!1},/**
     * Set the timeout flag on the request.
     */timeout:{type:Number,value:0},/**
     * If true, automatically performs an Ajax request when either `url` or
     * `params` changes.
     */auto:{type:Boolean,value:!1},/**
     * If true, error messages will automatically be logged to the console.
     */verbose:{type:Boolean,value:!1},/**
     * The most recent request made by this iron-ajax element.
     *
     * @type {Object|undefined}
     */lastRequest:{type:Object,notify:!0,readOnly:!0},/**
     * The `progress` property of this element's `lastRequest`.
     *
     * @type {Object|undefined}
     */lastProgress:{type:Object,notify:!0,readOnly:!0},/**
     * True while lastRequest is in flight.
     */loading:{type:Boolean,notify:!0,readOnly:!0},/**
     * lastRequest's response.
     *
     * Note that lastResponse and lastError are set when lastRequest finishes,
     * so if loading is true, then lastResponse and lastError will correspond
     * to the result of the previous request.
     *
     * The type of the response is determined by the value of `handleAs` at
     * the time that the request was generated.
     *
     * @type {Object}
     */lastResponse:{type:Object,notify:!0,readOnly:!0},/**
     * lastRequest's error, if any.
     *
     * @type {Object}
     */lastError:{type:Object,notify:!0,readOnly:!0},/**
     * An Array of all in-flight requests originating from this iron-ajax
     * element.
     */activeRequests:{type:Array,notify:!0,readOnly:!0,value:function value(){return[]}},/**
     * Length of time in milliseconds to debounce multiple automatically
     * generated requests.
     */debounceDuration:{type:Number,value:0,notify:!0},/**
     * Prefix to be stripped from a JSON response before parsing it.
     *
     * In order to prevent an attack using CSRF with Array responses
     * (http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx/)
     * many backends will mitigate this by prefixing all JSON response bodies
     * with a string that would be nonsensical to a JavaScript parser.
     *
     */jsonPrefix:{type:String,value:""},/**
     * By default, iron-ajax's events do not bubble. Setting this attribute will
     * cause its request and response events as well as its iron-ajax-request,
     * -response,  and -error events to bubble to the window object. The vanilla
     * error event never bubbles when using shadow dom even if this.bubbles is
     * true because a scoped flag is not passed with it (first link) and because
     * the shadow dom spec did not used to allow certain events, including
     * events named error, to leak outside of shadow trees (second link).
     * https://www.w3.org/TR/shadow-dom/#scoped-flag
     * https://www.w3.org/TR/2015/WD-shadow-dom-20151215/#events-that-are-not-leaked-into-ancestor-trees
     */bubbles:{type:Boolean,value:!1},/**
     * Changes the [`completes`](iron-request#property-completes) promise chain
     * from `generateRequest` to reject with an object
     * containing the original request, as well an error message.
     * If false (default), the promise rejects with an error message only.
     */rejectWithRequest:{type:Boolean,value:!1},_boundHandleResponse:{type:Function,value:function value(){return this._handleResponse.bind(this)}}},observers:["_requestOptionsChanged(url, method, params.*, headers, contentType, "+"body, sync, handleAs, jsonPrefix, withCredentials, timeout, auto)"],created:function created(){this._boundOnProgressChanged=this._onProgressChanged.bind(this)},/**
   * The query string that should be appended to the `url`, serialized from
   * the current value of `params`.
   *
   * @return {string}
   */get queryString(){var queryParts=[],param,value;for(param in this.params){value=this.params[param];param=window.encodeURIComponent(param);if(Array.isArray(value)){for(var i=0;i<value.length;i++){queryParts.push(param+"="+window.encodeURIComponent(value[i]))}}else if(null!==value){queryParts.push(param+"="+window.encodeURIComponent(value))}else{queryParts.push(param)}}return queryParts.join("&")},/**
   * The `url` with query string (if `params` are specified), suitable for
   * providing to an `iron-request` instance.
   *
   * @return {string}
   */get requestUrl(){var queryString=this.queryString,url=this.url||"";if(queryString){var bindingChar=0<=url.indexOf("?")?"&":"?";return url+bindingChar+queryString}return url},/**
   * An object that maps header names to header values, first applying the
   * the value of `Content-Type` and then overlaying the headers specified
   * in the `headers` property.
   *
   * @return {Object}
   */get requestHeaders(){var headers={},contentType=this.contentType;if(null==contentType&&"string"===typeof this.body){contentType="application/x-www-form-urlencoded"}if(contentType){headers["content-type"]=contentType}var header;if("object"===babelHelpers.typeof(this.headers)){for(header in this.headers){headers[header]=this.headers[header].toString()}}return headers},_onProgressChanged:function _onProgressChanged(event){this._setLastProgress(event.detail.value)},/**
   * Request options suitable for generating an `iron-request` instance based
   * on the current state of the `iron-ajax` instance's properties.
   *
   * @return {{
   *   url: string,
   *   method: (string|undefined),
   *   async: (boolean|undefined),
   *   body:
   * (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined|Object),
   *   headers: (Object|undefined),
   *   handleAs: (string|undefined),
   *   jsonPrefix: (string|undefined),
   *   withCredentials: (boolean|undefined)}}
   */toRequestOptions:function toRequestOptions(){return{url:this.requestUrl||"",method:this.method,headers:this.requestHeaders,body:this.body,async:!this.sync,handleAs:this.handleAs,jsonPrefix:this.jsonPrefix,withCredentials:this.withCredentials,timeout:this.timeout,rejectWithRequest:this.rejectWithRequest}},/**
   * Performs an AJAX request to the specified URL.
   *
   * @return {!IronRequestElement}
   */generateRequest:function generateRequest(){var request=/** @type {!IronRequestElement} */document.createElement("iron-request"),requestOptions=this.toRequestOptions();this.push("activeRequests",request);request.completes.then(this._boundHandleResponse).catch(this._handleError.bind(this,request)).then(this._discardRequest.bind(this,request));var evt=this.fire("iron-ajax-presend",{request:request,options:requestOptions},{bubbles:this.bubbles,cancelable:!0});if(evt.defaultPrevented){request.abort();request.rejectCompletes(request);return request}if(this.lastRequest){this.lastRequest.removeEventListener("iron-request-progress-changed",this._boundOnProgressChanged)}request.addEventListener("iron-request-progress-changed",this._boundOnProgressChanged);request.send(requestOptions);this._setLastProgress(null);this._setLastRequest(request);this._setLoading(!0);this.fire("request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});return request},_handleResponse:function _handleResponse(request){if(request===this.lastRequest){this._setLastResponse(request.response);this._setLastError(null);this._setLoading(!1)}this.fire("response",request,{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-response",request,{bubbles:this.bubbles,composed:!0})},_handleError:function _handleError(request,error){if(this.verbose){Base._error(error)}if(request===this.lastRequest){this._setLastError({request:request,error:error,status:request.xhr.status,statusText:request.xhr.statusText,response:request.xhr.response});this._setLastResponse(null);this._setLoading(!1)}// Tests fail if this goes after the normal this.fire('error', ...)
this.fire("iron-ajax-error",{request:request,error:error},{bubbles:this.bubbles,composed:!0});this.fire("error",{request:request,error:error},{bubbles:this.bubbles,composed:!0})},_discardRequest:function _discardRequest(request){var requestIndex=this.activeRequests.indexOf(request);if(-1<requestIndex){this.splice("activeRequests",requestIndex,1)}},_requestOptionsChanged:function _requestOptionsChanged(){this.debounce("generate-request",function(){if(null==this.url){return}if(this.auto){this.generateRequest()}},this.debounceDuration)}});var IronControlState={properties:{/**
     * If true, the element currently has focus.
     */focused:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},/**
     * If true, the user cannot interact with this element.
     */disabled:{type:Boolean,value:!1,notify:!0,observer:"_disabledChanged",reflectToAttribute:!0},/**
     * Value of the `tabindex` attribute before `disabled` was activated.
     * `null` means the attribute was not present.
     * @type {?string|undefined}
     */_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function value(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],/**
   * @return {void}
   */ready:function ready(){this.addEventListener("focus",this._boundFocusBlurHandler,!0);this.addEventListener("blur",this._boundFocusBlurHandler,!0)},_focusBlurHandler:function _focusBlurHandler(event){// Polymer takes care of retargeting events.
this._setFocused("focus"===event.type);return},_disabledChanged:function _disabledChanged(disabled,old){this.setAttribute("aria-disabled",disabled?"true":"false");this.style.pointerEvents=disabled?"none":"";if(disabled){// Read the `tabindex` attribute instead of the `tabIndex` property.
// The property returns `-1` if there is no `tabindex` attribute.
// This distinction is important when restoring the value because
// leaving `-1` hides shadow root children from the tab order.
this._oldTabIndex=this.getAttribute("tabindex");this._setFocused(!1);this.tabIndex=-1;this.blur()}else if(this._oldTabIndex!==void 0){if(null===this._oldTabIndex){this.removeAttribute("tabindex")}else{this.setAttribute("tabindex",this._oldTabIndex)}}},_changedControlState:function _changedControlState(){// _controlStateChanged is abstract, follow-on behaviors may implement it
if(this._controlStateChanged){this._controlStateChanged()}}};_exports.IronControlState=IronControlState;var ironControlState={IronControlState:IronControlState};_exports.$ironControlState=ironControlState;var IronButtonStateImpl={properties:{/**
     * If true, the user is currently holding down the button.
     */pressed:{type:Boolean,readOnly:!0,value:!1,reflectToAttribute:!0,observer:"_pressedChanged"},/**
     * If true, the button toggles the active state with each tap or press
     * of the spacebar.
     */toggles:{type:Boolean,value:!1,reflectToAttribute:!0},/**
     * If true, the button is a toggle and is currently in the active state.
     */active:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},/**
     * True if the element is currently being pressed by a "pointer," which
     * is loosely defined as mouse or touch input (but specifically excluding
     * keyboard input).
     */pointerDown:{type:Boolean,readOnly:!0,value:!1},/**
     * True if the input device that caused the element to receive focus
     * was a keyboard.
     */receivedFocusFromKeyboard:{type:Boolean,readOnly:!0},/**
     * The aria attribute to be set if the button is a toggle and in the
     * active state.
     */ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],/**
   * @type {!Object}
   */keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function _tapHandler(){if(this.toggles){// a tap is needed to toggle the active state
this._userActivate(!this.active)}else{this.active=!1}},_focusChanged:function _focusChanged(focused){this._detectKeyboardFocus(focused);if(!focused){this._setPressed(!1)}},_detectKeyboardFocus:function _detectKeyboardFocus(focused){this._setReceivedFocusFromKeyboard(!this.pointerDown&&focused)},// to emulate native checkbox, (de-)activations from a user interaction fire
// 'change' events
_userActivate:function _userActivate(active){if(this.active!==active){this.active=active;this.fire("change")}},_downHandler:function _downHandler(event){this._setPointerDown(!0);this._setPressed(!0);this._setReceivedFocusFromKeyboard(!1)},_upHandler:function _upHandler(){this._setPointerDown(!1);this._setPressed(!1)},/**
   * @param {!KeyboardEvent} event .
   */_spaceKeyDownHandler:function _spaceKeyDownHandler(event){var keyboardEvent=event.detail.keyboardEvent,target=dom(keyboardEvent).localTarget;// Ignore the event if this is coming from a focused light child, since that
// element will deal with it.
if(this.isLightDescendant(/** @type {Node} */target))return;keyboardEvent.preventDefault();keyboardEvent.stopImmediatePropagation();this._setPressed(!0)},/**
   * @param {!KeyboardEvent} event .
   */_spaceKeyUpHandler:function _spaceKeyUpHandler(event){var keyboardEvent=event.detail.keyboardEvent,target=dom(keyboardEvent).localTarget;// Ignore the event if this is coming from a focused light child, since that
// element will deal with it.
if(this.isLightDescendant(/** @type {Node} */target))return;if(this.pressed){this._asyncClick()}this._setPressed(!1)},// trigger click asynchronously, the asynchrony is useful to allow one
// event handler to unwind before triggering another event
_asyncClick:function _asyncClick(){this.async(function(){this.click()},1)},// any of these changes are considered a change to button state
_pressedChanged:function _pressedChanged(pressed){this._changedButtonState()},_ariaActiveAttributeChanged:function _ariaActiveAttributeChanged(value,oldValue){if(oldValue&&oldValue!=value&&this.hasAttribute(oldValue)){this.removeAttribute(oldValue)}},_activeChanged:function _activeChanged(active,ariaActiveAttribute){if(this.toggles){this.setAttribute(this.ariaActiveAttribute,active?"true":"false")}else{this.removeAttribute(this.ariaActiveAttribute)}this._changedButtonState()},_controlStateChanged:function _controlStateChanged(){if(this.disabled){this._setPressed(!1)}else{this._changedButtonState()}},// provide hook for follow-on behaviors to react to button-state
_changedButtonState:function _changedButtonState(){if(this._buttonStateChanged){this._buttonStateChanged();// abstract
}}};/** @polymerBehavior */_exports.IronButtonStateImpl=IronButtonStateImpl;var IronButtonState=[IronA11yKeysBehavior,IronButtonStateImpl];_exports.IronButtonState=IronButtonState;var ironButtonState={IronButtonStateImpl:IronButtonStateImpl,IronButtonState:IronButtonState};_exports.$ironButtonState=ironButtonState;var IronFormElementBehavior={properties:{/**
     * The name of this element.
     */name:{type:String},/**
     * The value for this element.
     * @type {*}
     */value:{notify:!0,type:String},/**
     * Set to true to mark the input as required. If used in a form, a
     * custom element that uses this behavior should also use
     * IronValidatableBehavior and define a custom validation method.
     * Otherwise, a `required` element will always be considered valid.
     * It's also strongly recommended to provide a visual style for the element
     * when its value is invalid.
     */required:{type:Boolean,value:!1}},// Empty implementations for backcompatibility.
attached:function attached(){},detached:function detached(){}};_exports.IronFormElementBehavior=IronFormElementBehavior;var ironFormElementBehavior={IronFormElementBehavior:IronFormElementBehavior};_exports.$ironFormElementBehavior=ironFormElementBehavior;var IronMeta=/*#__PURE__*/function(){/**
   * @param {{
   *   type: (string|null|undefined),
   *   key: (string|null|undefined),
   *   value: *,
   * }=} options
   */function IronMeta(options){babelHelpers.classCallCheck(this,IronMeta);IronMeta[" "](options);/** @type {string} */this.type=options&&options.type||"default";/** @type {string|null|undefined} */this.key=options&&options.key;if(options&&"value"in options){/** @type {*} */this.value=options.value}}/** @return {*} */babelHelpers.createClass(IronMeta,[{key:"byKey",/**
     * @param {string} key
     * @return {*}
     */value:function byKey(key){this.key=key;return this.value}},{key:"value",get:function get(){var type=this.type,key=this.key;if(type&&key){return IronMeta.types[type]&&IronMeta.types[type][key]}}/** @param {*} value */,set:function set(value){var type=this.type,key=this.key;if(type&&key){type=IronMeta.types[type]=IronMeta.types[type]||{};if(null==value){delete type[key]}else{type[key]=value}}}/** @return {!Array<*>} */},{key:"list",get:function get(){var type=this.type;if(type){var items=IronMeta.types[this.type];if(!items){return[]}return Object.keys(items).map(function(key){return metaDatas[this.type][key]},this)}}}]);return IronMeta}();_exports.IronMeta=IronMeta;;// This function is used to convince Closure not to remove constructor calls
// for instances that are not held anywhere. For example, when
// `new IronMeta({...})` is used only for the side effect of adding a value.
IronMeta[" "]=function(){};IronMeta.types={};var metaDatas=IronMeta.types;/**
                                `iron-meta` is a generic element you can use for sharing information across the
                                DOM tree. It uses [monostate pattern](http://c2.com/cgi/wiki?MonostatePattern)
                                such that any instance of iron-meta has access to the shared information. You
                                can use `iron-meta` to share whatever you want (or create an extension [like
                                x-meta] for enhancements).
                                
                                The `iron-meta` instances containing your actual data can be loaded in an
                                import, or constructed in any way you see fit. The only requirement is that you
                                create them before you try to access them.
                                
                                Examples:
                                
                                If I create an instance like this:
                                
                                    <iron-meta key="info" value="foo/bar"></iron-meta>
                                
                                Note that value="foo/bar" is the metadata I've defined. I could define more
                                attributes or use child nodes to define additional metadata.
                                
                                Now I can access that element (and it's metadata) from any iron-meta instance
                                via the byKey method, e.g.
                                
                                    meta.byKey('info');
                                
                                Pure imperative form would be like:
                                
                                    document.createElement('iron-meta').byKey('info');
                                
                                Or, in a Polymer element, you can include a meta in your template:
                                
                                    <iron-meta id="meta"></iron-meta>
                                    ...
                                    this.$.meta.byKey('info');
                                
                                @group Iron Elements
                                @demo demo/index.html
                                @element iron-meta
                                */Polymer({is:"iron-meta",properties:{/**
     * The type of meta-data.  All meta-data of the same type is stored
     * together.
     * @type {string}
     */type:{type:String,value:"default"},/**
     * The key used to store `value` under the `type` namespace.
     * @type {?string}
     */key:{type:String},/**
     * The meta-data to store or retrieve.
     * @type {*}
     */value:{type:String,notify:!0},/**
     * If true, `value` is set to the iron-meta instance itself.
     */self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function __computeMeta(type,key,value){var meta=new IronMeta({type:type,key:key});if(value!==void 0&&value!==meta.value){meta.value=value}else if(this.value!==meta.value){this.value=meta.value}return meta},get list(){return this.__meta&&this.__meta.list},_selfChanged:function _selfChanged(self){if(self){this.value=this}},/**
   * Retrieves meta data value by key.
   *
   * @method byKey
   * @param {string} key The key of the meta-data to be returned.
   * @return {*}
   */byKey:function byKey(key){return new IronMeta({type:this.type,key:key}).value}});var ironMeta={IronMeta:IronMeta};_exports.$ironMeta=ironMeta;var IronValidatableBehaviorMeta=null;/**
                                                * `Use IronValidatableBehavior` to implement an element that validates
                                                * user input. Use the related `IronValidatorBehavior` to add custom
                                                * validation logic to an iron-input.
                                                *
                                                * By default, an `<iron-form>` element validates its fields when the user
                                                * presses the submit button. To validate a form imperatively, call the form's
                                                * `validate()` method, which in turn will call `validate()` on all its
                                                * children. By using `IronValidatableBehavior`, your custom element
                                                * will get a public `validate()`, which will return the validity of the
                                                * element, and a corresponding `invalid` attribute, which can be used for
                                                * styling.
                                                *
                                                * To implement the custom validation logic of your element, you must override
                                                * the protected `_getValidity()` method of this behaviour, rather than
                                                * `validate()`. See
                                                * [this](https://github.com/PolymerElements/iron-form/blob/master/demo/simple-element.html)
                                                * for an example.
                                                *
                                                * ### Accessibility
                                                *
                                                * Changing the `invalid` property, either manually or by calling `validate()`
                                                * will update the `aria-invalid` attribute.
                                                *
                                                * @demo demo/index.html
                                                * @polymerBehavior
                                                */_exports.IronValidatableBehaviorMeta=IronValidatableBehaviorMeta;var IronValidatableBehavior={properties:{/**
     * Name of the validator to use.
     */validator:{type:String},/**
     * True if the last call to `validate` is invalid.
     */invalid:{notify:!0,reflectToAttribute:!0,type:Boolean,value:!1,observer:"_invalidChanged"}},registered:function registered(){_exports.IronValidatableBehaviorMeta=IronValidatableBehaviorMeta=new IronMeta({type:"validator"})},_invalidChanged:function _invalidChanged(){if(this.invalid){this.setAttribute("aria-invalid","true")}else{this.removeAttribute("aria-invalid")}},/* Recompute this every time it's needed, because we don't know if the
   * underlying IronValidatableBehaviorMeta has changed. */get _validator(){return IronValidatableBehaviorMeta&&IronValidatableBehaviorMeta.byKey(this.validator)},/**
   * @return {boolean} True if the validator `validator` exists.
   */hasValidator:function hasValidator(){return null!=this._validator},/**
   * Returns true if the `value` is valid, and updates `invalid`. If you want
   * your element to have custom validation logic, do not override this method;
   * override `_getValidity(value)` instead.
    * @param {Object} value Deprecated: The value to be validated. By default,
   * it is passed to the validator's `validate()` function, if a validator is
   set.
   * If this argument is not specified, then the element's `value` property
   * is used, if it exists.
   * @return {boolean} True if `value` is valid.
   */validate:function validate(value){// If this is an element that also has a value property, and there was
// no explicit value argument passed, use the element's property instead.
if(value===void 0&&this.value!==void 0)this.invalid=!this._getValidity(this.value);else this.invalid=!this._getValidity(value);return!this.invalid},/**
   * Returns true if `value` is valid.  By default, it is passed
   * to the validator's `validate()` function, if a validator is set. You
   * should override this method if you want to implement custom validity
   * logic for your element.
   *
   * @param {Object} value The value to be validated.
   * @return {boolean} True if `value` is valid.
   */_getValidity:function _getValidity(value){if(this.hasValidator()){return this._validator.validate(value)}return!0}};_exports.IronValidatableBehavior=IronValidatableBehavior;var ironValidatableBehavior={get IronValidatableBehaviorMeta(){return IronValidatableBehaviorMeta},IronValidatableBehavior:IronValidatableBehavior};_exports.$ironValidatableBehavior=ironValidatableBehavior;var IronCheckedElementBehaviorImpl={properties:{/**
     * Fired when the checked state changes.
     *
     * @event iron-change
     */ /**
         * Gets or sets the state, `true` is checked and `false` is unchecked.
         */checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0,observer:"_checkedChanged"},/**
     * If true, the button toggles the active state with each tap or press
     * of the spacebar.
     */toggles:{type:Boolean,value:!0,reflectToAttribute:!0},/* Overriden from IronFormElementBehavior */value:{type:String,value:"on",observer:"_valueChanged"}},observers:["_requiredChanged(required)"],created:function created(){// Used by `iron-form` to handle the case that an element with this behavior
// doesn't have a role of 'checkbox' or 'radio', but should still only be
// included when the form is serialized if `this.checked === true`.
this._hasIronCheckedElementBehavior=!0},/**
   * Returns false if the element is required and not checked, and true
   * otherwise.
   * @param {*=} _value Ignored.
   * @return {boolean} true if `required` is false or if `checked` is true.
   */_getValidity:function _getValidity(_value){return this.disabled||!this.required||this.checked},/**
   * Update the aria-required label when `required` is changed.
   */_requiredChanged:function _requiredChanged(){if(this.required){this.setAttribute("aria-required","true")}else{this.removeAttribute("aria-required")}},/**
   * Fire `iron-changed` when the checked state changes.
   */_checkedChanged:function _checkedChanged(){this.active=this.checked;this.fire("iron-change")},/**
   * Reset value to 'on' if it is set to `undefined`.
   */_valueChanged:function _valueChanged(){if(this.value===void 0||null===this.value){this.value="on"}}};/** @polymerBehavior */_exports.IronCheckedElementBehaviorImpl=IronCheckedElementBehaviorImpl;var IronCheckedElementBehavior=[IronFormElementBehavior,IronValidatableBehavior,IronCheckedElementBehaviorImpl];_exports.IronCheckedElementBehavior=IronCheckedElementBehavior;var ironCheckedElementBehavior={IronCheckedElementBehaviorImpl:IronCheckedElementBehaviorImpl,IronCheckedElementBehavior:IronCheckedElementBehavior};_exports.$ironCheckedElementBehavior=ironCheckedElementBehavior;var template=html(_templateObject2_6bf96330d65d11eaa5e0898854dcb572());template.setAttribute("style","display: none;");document.head.appendChild(template.content);var style=document.createElement("style");style.textContent="[hidden] { display: none !important; }";document.head.appendChild(style);Polymer({_template:html(_templateObject3_6bf96330d65d11eaa5e0898854dcb572()),is:"iron-icon",properties:{/**
     * The name of the icon to use. The name should be of the form:
     * `iconset_name:icon_name`.
     */icon:{type:String},/**
     * The name of the theme to used, if one is specified by the
     * iconset.
     */theme:{type:String},/**
     * If using iron-icon without an iconset, you can set the src to be
     * the URL of an individual icon image file. Note that this will take
     * precedence over a given icon attribute.
     */src:{type:String},/**
     * @type {!IronMeta}
     */_meta:{value:Base.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function _iconChanged(icon){var parts=(icon||"").split(":");this._iconName=parts.pop();this._iconsetName=parts.pop()||this._DEFAULT_ICONSET;this._updateIcon()},_srcChanged:function _srcChanged(src){this._updateIcon()},_usesIconset:function _usesIconset(){return this.icon||!this.src},/** @suppress {visibility} */_updateIcon:function _updateIcon(){if(this._usesIconset()){if(this._img&&this._img.parentNode){dom(this.root).removeChild(this._img)}if(""===this._iconName){if(this._iconset){this._iconset.removeIcon(this)}}else if(this._iconsetName&&this._meta){this._iconset=/** @type {?Polymer.Iconset} */this._meta.byKey(this._iconsetName);if(this._iconset){this._iconset.applyIcon(this,this._iconName,this.theme);this.unlisten(window,"iron-iconset-added","_updateIcon")}else{this.listen(window,"iron-iconset-added","_updateIcon")}}}else{if(this._iconset){this._iconset.removeIcon(this)}if(!this._img){this._img=document.createElement("img");this._img.style.width="100%";this._img.style.height="100%";this._img.draggable=!1}this._img.src=this.src;dom(this.root).appendChild(this._img)}}});Polymer({is:"iron-iconset-svg",properties:{/**
     * The name of the iconset.
     */name:{type:String,observer:"_nameChanged"},/**
     * The size of an individual icon. Note that icons must be square.
     */size:{type:Number,value:24},/**
     * Set to true to enable mirroring of icons where specified when they are
     * stamped. Icons that should be mirrored should be decorated with a
     * `mirror-in-rtl` attribute.
     *
     * NOTE: For performance reasons, direction will be resolved once per
     * document per iconset, so moving icons in and out of RTL subtrees will
     * not cause their mirrored state to change.
     */rtlMirroring:{type:Boolean,value:!1},/**
     * Set to true to measure RTL based on the dir attribute on the body or
     * html elements (measured on document.body or document.documentElement as
     * available).
     */useGlobalRtlAttribute:{type:Boolean,value:!1}},created:function created(){this._meta=new IronMeta({type:"iconset",key:null,value:null})},attached:function attached(){this.style.display="none"},/**
   * Construct an array of all icon names in this iconset.
   *
   * @return {!Array} Array of icon names.
   */getIconNames:function getIconNames(){this._icons=this._createIconMap();return Object.keys(this._icons).map(function(n){return this.name+":"+n},this)},/**
   * Applies an icon to the given element.
   *
   * An svg icon is prepended to the element's shadowRoot if it exists,
   * otherwise to the element itself.
   *
   * If RTL mirroring is enabled, and the icon is marked to be mirrored in
   * RTL, the element will be tested (once and only once ever for each
   * iconset) to determine the direction of the subtree the element is in.
   * This direction will apply to all future icon applications, although only
   * icons marked to be mirrored will be affected.
   *
   * @method applyIcon
   * @param {Element} element Element to which the icon is applied.
   * @param {string} iconName Name of the icon to apply.
   * @return {?Element} The svg element which renders the icon.
   */applyIcon:function applyIcon(element,iconName){// Remove old svg element
this.removeIcon(element);// install new svg element
var svg=this._cloneIcon(iconName,this.rtlMirroring&&this._targetIsRTL(element));if(svg){// insert svg element into shadow root, if it exists
var pde=dom(element.root||element);pde.insertBefore(svg,pde.childNodes[0]);return element._svgIcon=svg}return null},/**
   * Remove an icon from the given element by undoing the changes effected
   * by `applyIcon`.
   *
   * @param {Element} element The element from which the icon is removed.
   */removeIcon:function removeIcon(element){// Remove old svg element
if(element._svgIcon){dom(element.root||element).removeChild(element._svgIcon);element._svgIcon=null}},/**
   * Measures and memoizes the direction of the element. Note that this
   * measurement is only done once and the result is memoized for future
   * invocations.
   */_targetIsRTL:function _targetIsRTL(target){if(null==this.__targetIsRTL){if(this.useGlobalRtlAttribute){var globalElement=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL="rtl"===globalElement.getAttribute("dir")}else{if(target&&target.nodeType!==Node.ELEMENT_NODE){target=target.host}this.__targetIsRTL=target&&"rtl"===window.getComputedStyle(target).direction}}return this.__targetIsRTL},/**
   *
   * When name is changed, register iconset metadata
   *
   */_nameChanged:function _nameChanged(){this._meta.value=null;this._meta.key=this.name;this._meta.value=this;this.async(function(){this.fire("iron-iconset-added",this,{node:window})})},/**
   * Create a map of child SVG elements by id.
   *
   * @return {!Object} Map of id's to SVG elements.
   */_createIconMap:function _createIconMap(){// Objects chained to Object.prototype (`{}`) have members. Specifically,
// on FF there is a `watch` method that confuses the icon map, so we
// need to use a null-based object here.
var icons=Object.create(null);dom(this).querySelectorAll("[id]").forEach(function(icon){icons[icon.id]=icon});return icons},/**
   * Produce installable clone of the SVG element matching `id` in this
   * iconset, or `undefined` if there is no matching element.
   *
   * @return {Element} Returns an installable clone of the SVG element
   * matching `id`.
   */_cloneIcon:function _cloneIcon(id,mirrorAllowed){// create the icon map on-demand, since the iconset itself has no discrete
// signal to know when it's children are fully parsed
this._icons=this._icons||this._createIconMap();return this._prepareSvgClone(this._icons[id],this.size,mirrorAllowed)},/**
   * @param {Element} sourceSvg
   * @param {number} size
   * @param {Boolean} mirrorAllowed
   * @return {Element}
   */_prepareSvgClone:function _prepareSvgClone(sourceSvg,size,mirrorAllowed){if(sourceSvg){var content=sourceSvg.cloneNode(!0),svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),viewBox=content.getAttribute("viewBox")||"0 0 "+size+" "+size,cssText="pointer-events: none; display: block; width: 100%; height: 100%;";if(mirrorAllowed&&content.hasAttribute("mirror-in-rtl")){cssText+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"}svg.setAttribute("viewBox",viewBox);svg.setAttribute("preserveAspectRatio","xMidYMid meet");svg.setAttribute("focusable","false");// TODO(dfreedm): `pointer-events: none` works around
// https://crbug.com/370136
// TODO(sjmiles): inline style may not be ideal, but avoids requiring a
// shadow-root
svg.style.cssText=cssText;svg.appendChild(content).removeAttribute("id");return svg}return null}});var template$1=html(_templateObject4_6bf96330d65d11eaa5e0898854dcb572());document.head.appendChild(template$1.content);Polymer({_template:html(_templateObject5_6bf96330d65d11eaa5e0898854dcb572()),is:"iron-image",properties:{/**
     * The URL of an image.
     */src:{type:String,value:""},/**
     * A short text alternative for the image.
     */alt:{type:String,value:null},/**
     * CORS enabled images support:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
     */crossorigin:{type:String,value:null},/**
     * When true, the image is prevented from loading and any placeholder is
     * shown.  This may be useful when a binding to the src property is known to
     * be invalid, to prevent 404 requests.
     */preventLoad:{type:Boolean,value:!1},/**
     * Sets a sizing option for the image.  Valid values are `contain` (full
     * aspect ratio of the image is contained within the element and
     * letterboxed) or `cover` (image is cropped in order to fully cover the
     * bounds of the element), or `null` (default: image takes natural size).
     */sizing:{type:String,value:null,reflectToAttribute:!0},/**
     * When a sizing option is used (`cover` or `contain`), this determines
     * how the image is aligned within the element bounds.
     */position:{type:String,value:"center"},/**
     * When `true`, any change to the `src` property will cause the
     * `placeholder` image to be shown until the new image has loaded.
     */preload:{type:Boolean,value:!1},/**
     * This image will be used as a background/placeholder until the src image
     * has loaded.  Use of a data-URI for placeholder is encouraged for instant
     * rendering.
     */placeholder:{type:String,value:null,observer:"_placeholderChanged"},/**
     * When `preload` is true, setting `fade` to true will cause the image to
     * fade into place.
     */fade:{type:Boolean,value:!1},/**
     * Read-only value that is true when the image is loaded.
     */loaded:{notify:!0,readOnly:!0,type:Boolean,value:!1},/**
     * Read-only value that tracks the loading state of the image when the
     * `preload` option is used.
     */loading:{notify:!0,readOnly:!0,type:Boolean,value:!1},/**
     * Read-only value that indicates that the last set `src` failed to load.
     */error:{notify:!0,readOnly:!0,type:Boolean,value:!1},/**
     * Can be used to set the width of image (e.g. via binding); size may also
     * be set via CSS.
     */width:{observer:"_widthChanged",type:Number,value:null},/**
     * Can be used to set the height of image (e.g. via binding); size may also
     * be set via CSS.
     *
     * @attribute height
     * @type number
     * @default null
     */height:{observer:"_heightChanged",type:Number,value:null}},observers:["_transformChanged(sizing, position)","_loadStateObserver(src, preventLoad)"],created:function created(){this._resolvedSrc=""},_imgOnLoad:function _imgOnLoad(){if(this.$.img.src!==this._resolveSrc(this.src)){return}this._setLoading(!1);this._setLoaded(!0);this._setError(!1)},_imgOnError:function _imgOnError(){if(this.$.img.src!==this._resolveSrc(this.src)){return}this.$.img.removeAttribute("src");this.$.sizedImgDiv.style.backgroundImage="";this._setLoading(!1);this._setLoaded(!1);this._setError(!0)},_computePlaceholderHidden:function _computePlaceholderHidden(){return!this.preload||!this.fade&&!this.loading&&this.loaded},_computePlaceholderClassName:function _computePlaceholderClassName(){return this.preload&&this.fade&&!this.loading&&this.loaded?"faded-out":""},_computeImgDivHidden:function _computeImgDivHidden(){return!this.sizing},_computeImgDivARIAHidden:function _computeImgDivARIAHidden(){return""===this.alt?"true":void 0},_computeImgDivARIALabel:function _computeImgDivARIALabel(){if(null!==this.alt){return this.alt}// Polymer.ResolveUrl.resolveUrl will resolve '' relative to a URL x to
// that URL x, but '' is the default for src.
if(""===this.src){return""}// NOTE: Use of `URL` was removed here because IE11 doesn't support
// constructing it. If this ends up being problematic, we should
// consider reverting and adding the URL polyfill as a dev dependency.
var resolved=this._resolveSrc(this.src);// Remove query parts, get file name.
return resolved.replace(/[?|#].*/g,"").split("/").pop()},_computeImgHidden:function _computeImgHidden(){return!!this.sizing},_widthChanged:function _widthChanged(){this.style.width=isNaN(this.width)?this.width:this.width+"px"},_heightChanged:function _heightChanged(){this.style.height=isNaN(this.height)?this.height:this.height+"px"},_loadStateObserver:function _loadStateObserver(src,preventLoad){var newResolvedSrc=this._resolveSrc(src);if(newResolvedSrc===this._resolvedSrc){return}this._resolvedSrc="";this.$.img.removeAttribute("src");this.$.sizedImgDiv.style.backgroundImage="";if(""===src||preventLoad){this._setLoading(!1);this._setLoaded(!1);this._setError(!1)}else{this._resolvedSrc=newResolvedSrc;this.$.img.src=this._resolvedSrc;this.$.sizedImgDiv.style.backgroundImage="url(\""+this._resolvedSrc+"\")";this._setLoading(!0);this._setLoaded(!1);this._setError(!1)}},_placeholderChanged:function _placeholderChanged(){this.$.placeholder.style.backgroundImage=this.placeholder?"url(\""+this.placeholder+"\")":""},_transformChanged:function _transformChanged(){var sizedImgDivStyle=this.$.sizedImgDiv.style,placeholderStyle=this.$.placeholder.style;sizedImgDivStyle.backgroundSize=placeholderStyle.backgroundSize=this.sizing;sizedImgDivStyle.backgroundPosition=placeholderStyle.backgroundPosition=this.sizing?this.position:"";sizedImgDivStyle.backgroundRepeat=placeholderStyle.backgroundRepeat=this.sizing?"no-repeat":""},_resolveSrc:function _resolveSrc(testSrc){var resolved=_resolveUrl(testSrc,this.$.baseURIAnchor.href);// NOTE: Use of `URL` was removed here because IE11 doesn't support
// constructing it. If this ends up being problematic, we should
// consider reverting and adding the URL polyfill as a dev dependency.
if(2<=resolved.length&&"/"===resolved[0]&&"/"!==resolved[1]){// In IE location.origin might not work
// https://connect.microsoft.com/IE/feedback/details/1763802/location-origin-is-undefined-in-ie-11-on-windows-10-but-works-on-windows-7
resolved=(location.origin||location.protocol+"//"+location.host)+resolved}return resolved}});Polymer({_template:html(_templateObject6_6bf96330d65d11eaa5e0898854dcb572()),is:"iron-input",behaviors:[IronValidatableBehavior],/**
   * Fired whenever `validate()` is called.
   *
   * @event iron-input-validate
   */properties:{/**
     * Use this property instead of `value` for two-way data binding, or to
     * set a default value for the input. **Do not** use the distributed
     * input's `value` property to set a default value.
     */bindValue:{type:String,value:""},/**
     * Computed property that echoes `bindValue` (mostly used for Polymer 1.0
     * backcompatibility, if you were one-way binding to the Polymer 1.0
     * `input is="iron-input"` value attribute).
     */value:{type:String,computed:"_computeValue(bindValue)"},/**
     * Regex-like list of characters allowed as input; all characters not in the
     * list will be rejected. The recommended format should be a list of allowed
     * characters, for example, `[a-zA-Z0-9.+-!;:]`.
     *
     * This pattern represents the allowed characters for the field; as the user
     * inputs text, each individual character will be checked against the
     * pattern (rather than checking the entire value as a whole). If a
     * character is not a match, it will be rejected.
     *
     * Pasted input will have each character checked individually; if any
     * character doesn't match `allowedPattern`, the entire pasted string will
     * be rejected.
     *
     * Note: if you were using `iron-input` in 1.0, you were also required to
     * set `prevent-invalid-input`. This is no longer needed as of Polymer 2.0,
     * and will be set automatically for you if an `allowedPattern` is provided.
     *
     */allowedPattern:{type:String},/**
     * Set to true to auto-validate the input value as you type.
     */autoValidate:{type:Boolean,value:!1},/**
     * The native input element.
     */_inputElement:Object},observers:["_bindValueChanged(bindValue, _inputElement)"],listeners:{input:"_onInput",keypress:"_onKeypress"},created:function created(){IronA11yAnnouncer.requestAvailability();this._previousValidInput="";this._patternAlreadyChecked=!1},attached:function attached(){// If the input is added at a later time, update the internal reference.
this._observer=dom(this).observeNodes(function(info){this._initSlottedInput()}.bind(this))},detached:function detached(){if(this._observer){dom(this).unobserveNodes(this._observer);this._observer=null}},/**
   * Returns the distributed input element.
   */get inputElement(){return this._inputElement},_initSlottedInput:function _initSlottedInput(){this._inputElement=this.getEffectiveChildren()[0];if(this.inputElement&&this.inputElement.value){this.bindValue=this.inputElement.value}this.fire("iron-input-ready")},get _patternRegExp(){var pattern;if(this.allowedPattern){pattern=new RegExp(this.allowedPattern)}else{switch(this.inputElement.type){case"number":pattern=/[0-9.,e-]/;break;}}return pattern},/**
   * @suppress {checkTypes}
   */_bindValueChanged:function _bindValueChanged(bindValue,inputElement){// The observer could have run before attached() when we have actually
// initialized this property.
if(!inputElement){return}if(bindValue===void 0){inputElement.value=null}else if(bindValue!==inputElement.value){this.inputElement.value=bindValue}if(this.autoValidate){this.validate()}// manually notify because we don't want to notify until after setting value
this.fire("bind-value-changed",{value:bindValue})},_onInput:function _onInput(){// Need to validate each of the characters pasted if they haven't
// been validated inside `_onKeypress` already.
if(this.allowedPattern&&!this._patternAlreadyChecked){var valid=this._checkPatternValidity();if(!valid){this._announceInvalidCharacter("Invalid string of characters not entered.");this.inputElement.value=this._previousValidInput}}this.bindValue=this._previousValidInput=this.inputElement.value;this._patternAlreadyChecked=!1},_isPrintable:function _isPrintable(event){// What a control/printable character is varies wildly based on the browser.
// - most control characters (arrows, backspace) do not send a `keypress`
// event
//   in Chrome, but the *do* on Firefox
// - in Firefox, when they do send a `keypress` event, control chars have
//   a charCode = 0, keyCode = xx (for ex. 40 for down arrow)
// - printable characters always send a keypress event.
// - in Firefox, printable chars always have a keyCode = 0. In Chrome, the
// keyCode
//   always matches the charCode.
// None of this makes any sense.
// For these keys, ASCII code == browser keycode.
var anyNonPrintable=8==event.keyCode||// backspace
9==event.keyCode||// tab
13==event.keyCode||// enter
27==event.keyCode,mozNonPrintable=19==event.keyCode||// pause
20==event.keyCode||// caps lock
45==event.keyCode||// insert
46==event.keyCode||// delete
144==event.keyCode||// num lock
145==event.keyCode||// scroll lock
32<event.keyCode&&41>event.keyCode||// page up/down, end, home, arrows
111<event.keyCode&&124>event.keyCode;// escape
// For these keys, make sure it's a browser keycode and not an ASCII code.
// fn keys
return!anyNonPrintable&&!(0==event.charCode&&mozNonPrintable)},_onKeypress:function _onKeypress(event){if(!this.allowedPattern&&"number"!==this.inputElement.type){return}var regexp=this._patternRegExp;if(!regexp){return}// Handle special keys and backspace
if(event.metaKey||event.ctrlKey||event.altKey){return}// Check the pattern either here or in `_onInput`, but not in both.
this._patternAlreadyChecked=!0;var thisChar=String.fromCharCode(event.charCode);if(this._isPrintable(event)&&!regexp.test(thisChar)){event.preventDefault();this._announceInvalidCharacter("Invalid character "+thisChar+" not entered.")}},_checkPatternValidity:function _checkPatternValidity(){var regexp=this._patternRegExp;if(!regexp){return!0}for(var i=0;i<this.inputElement.value.length;i++){if(!regexp.test(this.inputElement.value[i])){return!1}}return!0},/**
   * Returns true if `value` is valid. The validator provided in `validator`
   * will be used first, then any constraints.
   * @return {boolean} True if the value is valid.
   */validate:function validate(){if(!this.inputElement){this.invalid=!1;return!0}// Use the nested input's native validity.
var valid=this.inputElement.checkValidity();// Only do extra checking if the browser thought this was valid.
if(valid){// Empty, required input is invalid
if(this.required&&""===this.bindValue){valid=!1}else if(this.hasValidator()){valid=IronValidatableBehavior.validate.call(this,this.bindValue)}}this.invalid=!valid;this.fire("iron-input-validate");return valid},_announceInvalidCharacter:function _announceInvalidCharacter(message){this.fire("iron-announce",{text:message})},_computeValue:function _computeValue(bindValue){return bindValue}});var IronSelection=/*#__PURE__*/function(){/**
   * @param {!Function} selectCallback
   * @suppress {missingProvide}
   */function IronSelection(selectCallback){babelHelpers.classCallCheck(this,IronSelection);this.selection=[];this.selectCallback=selectCallback}/**
     * Retrieves the selected item(s).
     *
     * @returns Returns the selected item(s). If the multi property is true,
     * `get` will return an array, otherwise it will return
     * the selected item or undefined if there is no selection.
     */babelHelpers.createClass(IronSelection,[{key:"get",value:function get(){return this.multi?this.selection.slice():this.selection[0]}/**
     * Clears all the selection except the ones indicated.
     *
     * @param {Array} excludes items to be excluded.
     */},{key:"clear",value:function clear(excludes){this.selection.slice().forEach(function(item){if(!excludes||0>excludes.indexOf(item)){this.setItemSelected(item,!1)}},this)}/**
     * Indicates if a given item is selected.
     *
     * @param {*} item The item whose selection state should be checked.
     * @return {boolean} Returns true if `item` is selected.
     */},{key:"isSelected",value:function isSelected(item){return 0<=this.selection.indexOf(item)}/**
     * Sets the selection state for a given item to either selected or deselected.
     *
     * @param {*} item The item to select.
     * @param {boolean} isSelected True for selected, false for deselected.
     */},{key:"setItemSelected",value:function setItemSelected(item,isSelected){if(null!=item){if(isSelected!==this.isSelected(item)){// proceed to update selection only if requested state differs from
// current
if(isSelected){this.selection.push(item)}else{var i=this.selection.indexOf(item);if(0<=i){this.selection.splice(i,1)}}if(this.selectCallback){this.selectCallback(item,isSelected)}}}}/**
     * Sets the selection state for a given item. If the `multi` property
     * is true, then the selected state of `item` will be toggled; otherwise
     * the `item` will be selected.
     *
     * @param {*} item The item to select.
     */},{key:"select",value:function select(item){if(this.multi){this.toggle(item)}else if(this.get()!==item){this.setItemSelected(this.get(),!1);this.setItemSelected(item,!0)}}/**
     * Toggles the selection state for `item`.
     *
     * @param {*} item The item to toggle.
     */},{key:"toggle",value:function toggle(item){this.setItemSelected(item,!this.isSelected(item))}}]);return IronSelection}();_exports.IronSelection=IronSelection;;var ironSelection={IronSelection:IronSelection};_exports.$ironSelection=ironSelection;var IronSelectableBehavior={/**
   * Fired when iron-selector is activated (selected or deselected).
   * It is fired before the selected items are changed.
   * Cancel the event to abort selection.
   *
   * @event iron-activate
   */ /**
       * Fired when an item is selected
       *
       * @event iron-select
       */ /**
           * Fired when an item is deselected
           *
           * @event iron-deselect
           */ /**
               * Fired when the list of selectable items changes (e.g., items are
               * added or removed). The detail of the event is a mutation record that
               * describes what changed.
               *
               * @event iron-items-changed
               */properties:{/**
     * If you want to use an attribute value or property of an element for
     * `selected` instead of the index, set this to the name of the attribute
     * or property. Hyphenated values are converted to camel case when used to
     * look up the property of a selectable element. Camel cased values are
     * *not* converted to hyphenated values for attribute lookup. It's
     * recommended that you provide the hyphenated form of the name so that
     * selection works in both cases. (Use `attr-or-property-name` instead of
     * `attrOrPropertyName`.)
     */attrForSelected:{type:String,value:null},/**
     * Gets or sets the selected element. The default is to use the index of the
     * item.
     * @type {string|number}
     */selected:{type:String,notify:!0},/**
     * Returns the currently selected item.
     *
     * @type {?Object}
     */selectedItem:{type:Object,readOnly:!0,notify:!0},/**
     * The event that fires from items when they are selected. Selectable
     * will listen for this event from items and update the selection state.
     * Set to empty string to listen to no events.
     */activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},/**
     * This is a CSS selector string.  If this is set, only items that match the
     * CSS selector are selectable.
     */selectable:String,/**
     * The class to set on elements when selected.
     */selectedClass:{type:String,value:"iron-selected"},/**
     * The attribute to set on elements when selected.
     */selectedAttribute:{type:String,value:null},/**
     * Default fallback if the selection based on selected with
     * `attrForSelected` is not found.
     */fallbackSelection:{type:String,value:null},/**
     * The list of items from which a selection can be made.
     */items:{type:Array,readOnly:!0,notify:!0,value:function value(){return[]}},/**
     * The set of excluded elements where the key is the `localName`
     * of the element that will be ignored from the item list.
     *
     * @default {template: 1}
     */_excludedLocalNames:{type:Object,value:function value(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function created(){this._bindFilterItem=this._filterItem.bind(this);this._selection=new IronSelection(this._applySelection.bind(this))},attached:function attached(){this._observer=this._observeItems(this);this._addListener(this.activateEvent)},detached:function detached(){if(this._observer){dom(this).unobserveNodes(this._observer)}this._removeListener(this.activateEvent)},/**
   * Returns the index of the given item.
   *
   * @method indexOf
   * @param {Object} item
   * @returns Returns the index of the item
   */indexOf:function indexOf(item){return this.items?this.items.indexOf(item):-1},/**
   * Selects the given value.
   *
   * @method select
   * @param {string|number} value the value to select.
   */select:function select(value){this.selected=value},/**
   * Selects the previous item.
   *
   * @method selectPrevious
   */selectPrevious:function selectPrevious(){var length=this.items.length,index=length-1;if(this.selected!==void 0){index=(+this._valueToIndex(this.selected)-1+length)%length}this.selected=this._indexToValue(index)},/**
   * Selects the next item.
   *
   * @method selectNext
   */selectNext:function selectNext(){var index=0;if(this.selected!==void 0){index=(+this._valueToIndex(this.selected)+1)%this.items.length}this.selected=this._indexToValue(index)},/**
   * Selects the item at the given index.
   *
   * @method selectIndex
   */selectIndex:function selectIndex(index){this.select(this._indexToValue(index))},/**
   * Force a synchronous update of the `items` property.
   *
   * NOTE: Consider listening for the `iron-items-changed` event to respond to
   * updates to the set of selectable items after updates to the DOM list and
   * selection state have been made.
   *
   * WARNING: If you are using this method, you should probably consider an
   * alternate approach. Synchronously querying for items is potentially
   * slow for many use cases. The `items` property will update asynchronously
   * on its own to reflect selectable items in the DOM.
   */forceSynchronousItemUpdate:function forceSynchronousItemUpdate(){if(this._observer&&"function"===typeof this._observer.flush){// NOTE(bicknellr): `dom.flush` above is no longer sufficient to trigger
// `observeNodes` callbacks. Polymer 2.x returns an object from
// `observeNodes` with a `flush` that synchronously gives the callback any
// pending MutationRecords (retrieved with `takeRecords`). Any case where
// ShadyDOM flushes were expected to synchronously trigger item updates
// will now require calling `forceSynchronousItemUpdate`.
this._observer.flush()}else{this._updateItems()}},// UNUSED, FOR API COMPATIBILITY
get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function _checkFallback(){this._updateSelected()},_addListener:function _addListener(eventName){this.listen(this,eventName,"_activateHandler")},_removeListener:function _removeListener(eventName){this.unlisten(this,eventName,"_activateHandler")},_activateEventChanged:function _activateEventChanged(eventName,old){this._removeListener(old);this._addListener(eventName)},_updateItems:function _updateItems(){var nodes=dom(this).queryDistributedElements(this.selectable||"*");nodes=Array.prototype.filter.call(nodes,this._bindFilterItem);this._setItems(nodes)},_updateAttrForSelected:function _updateAttrForSelected(){if(this.selectedItem){this.selected=this._valueForItem(this.selectedItem)}},_updateSelected:function _updateSelected(){this._selectSelected(this.selected)},_selectSelected:function _selectSelected(selected){if(!this.items){return}var item=this._valueToItem(this.selected);if(item){this._selection.select(item)}else{this._selection.clear()}// Check for items, since this array is populated only when attached
// Since Number(0) is falsy, explicitly check for undefined
if(this.fallbackSelection&&this.items.length&&this._selection.get()===void 0){this.selected=this.fallbackSelection}},_filterItem:function _filterItem(node){return!this._excludedLocalNames[node.localName]},_valueToItem:function _valueToItem(value){return null==value?null:this.items[this._valueToIndex(value)]},_valueToIndex:function _valueToIndex(value){if(this.attrForSelected){for(var i=0,item;item=this.items[i];i++){if(this._valueForItem(item)==value){return i}}}else{return+value}},_indexToValue:function _indexToValue(index){if(this.attrForSelected){var item=this.items[index];if(item){return this._valueForItem(item)}}else{return index}},_valueForItem:function _valueForItem(item){if(!item){return null}if(!this.attrForSelected){var i=this.indexOf(item);return-1===i?null:i}var propValue=item[dashToCamelCase(this.attrForSelected)];return propValue!=void 0?propValue:item.getAttribute(this.attrForSelected)},_applySelection:function _applySelection(item,isSelected){if(this.selectedClass){this.toggleClass(this.selectedClass,isSelected,item)}if(this.selectedAttribute){this.toggleAttribute(this.selectedAttribute,isSelected,item)}this._selectionChange();this.fire("iron-"+(isSelected?"select":"deselect"),{item:item})},_selectionChange:function _selectionChange(){this._setSelectedItem(this._selection.get())},// observe items change under the given node.
_observeItems:function _observeItems(node){return dom(node).observeNodes(function(mutation){this._updateItems();this._updateSelected();// Let other interested parties know about the change so that
// we don't have to recreate mutation observers everywhere.
this.fire("iron-items-changed",mutation,{bubbles:!1,cancelable:!1})})},_activateHandler:function _activateHandler(e){var t=e.target,items=this.items;while(t&&t!=this){var i=items.indexOf(t);if(0<=i){var value=this._indexToValue(i);this._itemActivate(value,t);return}t=t.parentNode}},_itemActivate:function _itemActivate(value,item){if(!this.fire("iron-activate",{selected:value,item:item},{cancelable:!0}).defaultPrevented){this.select(value)}}};_exports.IronSelectableBehavior=IronSelectableBehavior;var ironSelectable={IronSelectableBehavior:IronSelectableBehavior};_exports.$ironSelectable=ironSelectable;var IronMultiSelectableBehaviorImpl={properties:{/**
     * If true, multiple selections are allowed.
     */multi:{type:Boolean,value:!1,observer:"multiChanged"},/**
     * Gets or sets the selected elements. This is used instead of `selected`
     * when `multi` is true.
     */selectedValues:{type:Array,notify:!0,value:function value(){return[]}},/**
     * Returns an array of currently selected items.
     */selectedItems:{type:Array,readOnly:!0,notify:!0,value:function value(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],/**
   * Selects the given value. If the `multi` property is true, then the selected
   * state of the `value` will be toggled; otherwise the `value` will be
   * selected.
   *
   * @method select
   * @param {string|number} value the value to select.
   */select:function select(value){if(this.multi){this._toggleSelected(value)}else{this.selected=value}},multiChanged:function multiChanged(multi){this._selection.multi=multi;this._updateSelected()},// UNUSED, FOR API COMPATIBILITY
get _shouldUpdateSelection(){return null!=this.selected||null!=this.selectedValues&&this.selectedValues.length},_updateAttrForSelected:function _updateAttrForSelected(){if(!this.multi){IronSelectableBehavior._updateAttrForSelected.apply(this)}else if(this.selectedItems&&0<this.selectedItems.length){this.selectedValues=this.selectedItems.map(function(selectedItem){return this._indexToValue(this.indexOf(selectedItem))},this).filter(function(unfilteredValue){return null!=unfilteredValue},this)}},_updateSelected:function _updateSelected(){if(this.multi){this._selectMulti(this.selectedValues)}else{this._selectSelected(this.selected)}},_selectMulti:function _selectMulti(values){values=values||[];var selectedItems=(this._valuesToItems(values)||[]).filter(function(item){return null!==item&&item!==void 0});// clear all but the current selected items
this._selection.clear(selectedItems);// select only those not selected yet
for(var i=0;i<selectedItems.length;i++){this._selection.setItemSelected(selectedItems[i],!0)}// Check for items, since this array is populated only when attached
if(this.fallbackSelection&&!this._selection.get().length){var fallback=this._valueToItem(this.fallbackSelection);if(fallback){this.select(this.fallbackSelection)}}},_selectionChange:function _selectionChange(){var s=this._selection.get();if(this.multi){this._setSelectedItems(s);this._setSelectedItem(s.length?s[0]:null)}else{if(null!==s&&s!==void 0){this._setSelectedItems([s]);this._setSelectedItem(s)}else{this._setSelectedItems([]);this._setSelectedItem(null)}}},_toggleSelected:function _toggleSelected(value){var i=this.selectedValues.indexOf(value),unselected=0>i;if(unselected){this.push("selectedValues",value)}else{this.splice("selectedValues",i,1)}},_valuesToItems:function _valuesToItems(values){return null==values?null:values.map(function(value){return this._valueToItem(value)},this)}};/** @polymerBehavior */_exports.IronMultiSelectableBehaviorImpl=IronMultiSelectableBehaviorImpl;var IronMultiSelectableBehavior=[IronSelectableBehavior,IronMultiSelectableBehaviorImpl];_exports.IronMultiSelectableBehavior=IronMultiSelectableBehavior;var ironMultiSelectable={IronMultiSelectableBehaviorImpl:IronMultiSelectableBehaviorImpl,IronMultiSelectableBehavior:IronMultiSelectableBehavior};_exports.$ironMultiSelectable=ironMultiSelectable;var IronMenuBehaviorImpl={properties:{/**
     * Returns the currently focused item.
     * @type {?Object}
     */focusedItem:{observer:"_focusedItemChanged",readOnly:!0,type:Object},/**
     * The attribute to use on menu items to look up the item title. Typing the
     * first letter of an item when the menu is open focuses that item. If
     * unset, `textContent` will be used.
     */attrForItemTitle:{type:String},/**
     * @type {boolean}
     */disabled:{type:Boolean,value:!1,observer:"_disabledChanged"}},/**
   * The list of keys has been taken from
   * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
   * @private
   */_MODIFIER_KEYS:["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],/** @private */_SEARCH_RESET_TIMEOUT_MS:1e3,/** @private */_previousTabIndex:0,hostAttributes:{role:"menu"},observers:["_updateMultiselectable(multi)"],listeners:{focus:"_onFocus",keydown:"_onKeydown","iron-items-changed":"_onIronItemsChanged"},/**
   * @type {!Object}
   */keyBindings:{up:"_onUpKey",down:"_onDownKey",esc:"_onEscKey","shift+tab:keydown":"_onShiftTabDown"},attached:function attached(){this._resetTabindices()},/**
   * Selects the given value. If the `multi` property is true, then the selected
   * state of the `value` will be toggled; otherwise the `value` will be
   * selected.
   *
   * @param {string|number} value the value to select.
   */select:function select(value){// Cancel automatically focusing a default item if the menu received focus
// through a user action selecting a particular item.
if(this._defaultFocusAsync){this.cancelAsync(this._defaultFocusAsync);this._defaultFocusAsync=null}var item=this._valueToItem(value);if(item&&item.hasAttribute("disabled"))return;this._setFocusedItem(item);IronMultiSelectableBehaviorImpl.select.apply(this,arguments)},/**
   * Resets all tabindex attributes to the appropriate value based on the
   * current selection state. The appropriate value is `0` (focusable) for
   * the default selected item, and `-1` (not keyboard focusable) for all
   * other items. Also sets the correct initial values for aria-selected
   * attribute, true for default selected item and false for others.
   */_resetTabindices:function _resetTabindices(){var firstSelectedItem=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this.items.forEach(function(item){item.setAttribute("tabindex",item===firstSelectedItem?"0":"-1");item.setAttribute("aria-selected",this._selection.isSelected(item))},this)},/**
   * Sets appropriate ARIA based on whether or not the menu is meant to be
   * multi-selectable.
   *
   * @param {boolean} multi True if the menu should be multi-selectable.
   */_updateMultiselectable:function _updateMultiselectable(multi){if(multi){this.setAttribute("aria-multiselectable","true")}else{this.removeAttribute("aria-multiselectable")}},/**
   * Given a KeyboardEvent, this method will focus the appropriate item in the
   * menu (if there is a relevant item, and it is possible to focus it).
   *
   * @param {KeyboardEvent} event A KeyboardEvent.
   */_focusWithKeyboardEvent:function _focusWithKeyboardEvent(event){// Make sure that the key pressed is not a modifier key.
// getModifierState is not being used, as it is not available in Safari
// earlier than 10.0.2 (https://trac.webkit.org/changeset/206725/webkit)
if(-1!==this._MODIFIER_KEYS.indexOf(event.key))return;this.cancelDebouncer("_clearSearchText");var searchText=this._searchText||"",key=event.key&&1==event.key.length?event.key:String.fromCharCode(event.keyCode);searchText+=key.toLocaleLowerCase();for(var searchLength=searchText.length,i=0,item;item=this.items[i];i++){if(item.hasAttribute("disabled")){continue}var attr=this.attrForItemTitle||"textContent",title=(item[attr]||item.getAttribute(attr)||"").trim();if(title.length<searchLength){continue}if(title.slice(0,searchLength).toLocaleLowerCase()==searchText){this._setFocusedItem(item);break}}this._searchText=searchText;this.debounce("_clearSearchText",this._clearSearchText,this._SEARCH_RESET_TIMEOUT_MS)},_clearSearchText:function _clearSearchText(){this._searchText=""},/**
   * Focuses the previous item (relative to the currently focused item) in the
   * menu, disabled items will be skipped.
   * Loop until length + 1 to handle case of single item in menu.
   */_focusPrevious:function _focusPrevious(){for(var length=this.items.length,curFocusIndex=+this.indexOf(this.focusedItem),i=1,item;i<length+1;i++){item=this.items[(curFocusIndex-i+length)%length];if(!item.hasAttribute("disabled")){var owner=dom(item).getOwnerRoot()||document;this._setFocusedItem(item);// Focus might not have worked, if the element was hidden or not
// focusable. In that case, try again.
if(dom(owner).activeElement==item){return}}}},/**
   * Focuses the next item (relative to the currently focused item) in the
   * menu, disabled items will be skipped.
   * Loop until length + 1 to handle case of single item in menu.
   */_focusNext:function _focusNext(){for(var length=this.items.length,curFocusIndex=+this.indexOf(this.focusedItem),i=1,item;i<length+1;i++){item=this.items[(curFocusIndex+i)%length];if(!item.hasAttribute("disabled")){var owner=dom(item).getOwnerRoot()||document;this._setFocusedItem(item);// Focus might not have worked, if the element was hidden or not
// focusable. In that case, try again.
if(dom(owner).activeElement==item){return}}}},/**
   * Mutates items in the menu based on provided selection details, so that
   * all items correctly reflect selection state.
   *
   * @param {Element} item An item in the menu.
   * @param {boolean} isSelected True if the item should be shown in a
   * selected state, otherwise false.
   */_applySelection:function _applySelection(item,isSelected){if(isSelected){item.setAttribute("aria-selected","true")}else{item.setAttribute("aria-selected","false")}IronSelectableBehavior._applySelection.apply(this,arguments)},/**
   * Discretely updates tabindex values among menu items as the focused item
   * changes.
   *
   * @param {Element} focusedItem The element that is currently focused.
   * @param {?Element} old The last element that was considered focused, if
   * applicable.
   */_focusedItemChanged:function _focusedItemChanged(focusedItem,old){old&&old.setAttribute("tabindex","-1");if(focusedItem&&!focusedItem.hasAttribute("disabled")&&!this.disabled){focusedItem.setAttribute("tabindex","0");focusedItem.focus()}},/**
   * A handler that responds to mutation changes related to the list of items
   * in the menu.
   *
   * @param {CustomEvent} event An event containing mutation records as its
   * detail.
   */_onIronItemsChanged:function _onIronItemsChanged(event){if(event.detail.addedNodes.length){this._resetTabindices()}},/**
   * Handler that is called when a shift+tab keypress is detected by the menu.
   *
   * @param {CustomEvent} event A key combination event.
   */_onShiftTabDown:function _onShiftTabDown(event){var oldTabIndex=this.getAttribute("tabindex");IronMenuBehaviorImpl._shiftTabPressed=!0;this._setFocusedItem(null);this.setAttribute("tabindex","-1");this.async(function(){this.setAttribute("tabindex",oldTabIndex);IronMenuBehaviorImpl._shiftTabPressed=!1;// NOTE(cdata): polymer/polymer#1305
},1)},/**
   * Handler that is called when the menu receives focus.
   *
   * @param {FocusEvent} event A focus event.
   */_onFocus:function _onFocus(event){if(IronMenuBehaviorImpl._shiftTabPressed){// do not focus the menu itself
return}// Do not focus the selected tab if the deepest target is part of the
// menu element's local DOM and is focusable.
var rootTarget=/** @type {?HTMLElement} */dom(event).rootTarget;if(rootTarget!==this&&"undefined"!==typeof rootTarget.tabIndex&&!this.isLightDescendant(rootTarget)){return}// clear the cached focus item
this._defaultFocusAsync=this.async(function(){// focus the selected item when the menu receives focus, or the first item
// if no item is selected
var firstSelectedItem=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._setFocusedItem(null);if(firstSelectedItem){this._setFocusedItem(firstSelectedItem)}else if(this.items[0]){// We find the first none-disabled item (if one exists)
this._focusNext()}})},/**
   * Handler that is called when the up key is pressed.
   *
   * @param {CustomEvent} event A key combination event.
   */_onUpKey:function _onUpKey(event){// up and down arrows moves the focus
this._focusPrevious();event.detail.keyboardEvent.preventDefault()},/**
   * Handler that is called when the down key is pressed.
   *
   * @param {CustomEvent} event A key combination event.
   */_onDownKey:function _onDownKey(event){this._focusNext();event.detail.keyboardEvent.preventDefault()},/**
   * Handler that is called when the esc key is pressed.
   *
   * @param {CustomEvent} event A key combination event.
   */_onEscKey:function _onEscKey(event){var focusedItem=this.focusedItem;if(focusedItem){focusedItem.blur()}},/**
   * Handler that is called when a keydown event is detected.
   *
   * @param {KeyboardEvent} event A keyboard event.
   */_onKeydown:function _onKeydown(event){if(!this.keyboardEventMatchesKeys(event,"up down esc")){// all other keys focus the menu item starting with that character
this._focusWithKeyboardEvent(event)}event.stopPropagation()},// override _activateHandler
_activateHandler:function _activateHandler(event){IronSelectableBehavior._activateHandler.call(this,event);event.stopPropagation()},/**
   * Updates this element's tab index when it's enabled/disabled.
   * @param {boolean} disabled
   */_disabledChanged:function _disabledChanged(disabled){if(disabled){this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0;this.removeAttribute("tabindex");// No tabindex means not tab-able or select-able.
}else if(!this.hasAttribute("tabindex")){this.setAttribute("tabindex",this._previousTabIndex)}}};_exports.IronMenuBehaviorImpl=IronMenuBehaviorImpl;IronMenuBehaviorImpl._shiftTabPressed=!1;/** @polymerBehavior */var IronMenuBehavior=[IronMultiSelectableBehavior,IronA11yKeysBehavior,IronMenuBehaviorImpl];_exports.IronMenuBehavior=IronMenuBehavior;var ironMenuBehavior={IronMenuBehaviorImpl:IronMenuBehaviorImpl,IronMenuBehavior:IronMenuBehavior};_exports.$ironMenuBehavior=ironMenuBehavior;var IronMenubarBehaviorImpl={hostAttributes:{role:"menubar"},/**
   * @type {!Object}
   */keyBindings:{left:"_onLeftKey",right:"_onRightKey"},_onUpKey:function _onUpKey(event){this.focusedItem.click();event.detail.keyboardEvent.preventDefault()},_onDownKey:function _onDownKey(event){this.focusedItem.click();event.detail.keyboardEvent.preventDefault()},get _isRTL(){return"rtl"===window.getComputedStyle(this).direction},_onLeftKey:function _onLeftKey(event){if(this._isRTL){this._focusNext()}else{this._focusPrevious()}event.detail.keyboardEvent.preventDefault()},_onRightKey:function _onRightKey(event){if(this._isRTL){this._focusPrevious()}else{this._focusNext()}event.detail.keyboardEvent.preventDefault()},_onKeydown:function _onKeydown(event){if(this.keyboardEventMatchesKeys(event,"up down left right esc")){return}// all other keys focus the menu item starting with that character
this._focusWithKeyboardEvent(event)}};/** @polymerBehavior */_exports.IronMenubarBehaviorImpl=IronMenubarBehaviorImpl;var IronMenubarBehavior=[IronMenuBehavior,IronMenubarBehaviorImpl];_exports.IronMenubarBehavior=IronMenubarBehavior;var ironMenubarBehavior={IronMenubarBehaviorImpl:IronMenubarBehaviorImpl,IronMenubarBehavior:IronMenubarBehavior};_exports.$ironMenubarBehavior=ironMenubarBehavior;var Utility={distance:function distance(x1,y1,x2,y2){var xDelta=x1-x2,yDelta=y1-y2;return Math.sqrt(xDelta*xDelta+yDelta*yDelta)},now:window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now};/**
    * @param {HTMLElement} element
    * @constructor
    */function ElementMetrics(element){this.element=element;this.width=this.boundingRect.width;this.height=this.boundingRect.height;this.size=Math.max(this.width,this.height)}ElementMetrics.prototype={get boundingRect(){return this.element.getBoundingClientRect()},furthestCornerDistanceFrom:function furthestCornerDistanceFrom(x,y){var topLeft=Utility.distance(x,y,0,0),topRight=Utility.distance(x,y,this.width,0),bottomLeft=Utility.distance(x,y,0,this.height),bottomRight=Utility.distance(x,y,this.width,this.height);return Math.max(topLeft,topRight,bottomLeft,bottomRight)}};/**
    * @param {HTMLElement} element
    * @constructor
    */function Ripple(element){this.element=element;this.color=window.getComputedStyle(element).color;this.wave=document.createElement("div");this.waveContainer=document.createElement("div");this.wave.style.backgroundColor=this.color;this.wave.classList.add("wave");this.waveContainer.classList.add("wave-container");dom(this.waveContainer).appendChild(this.wave);this.resetInteractionState()}Ripple.MAX_RADIUS=300;Ripple.prototype={get recenters(){return this.element.recenters},get center(){return this.element.center},get mouseDownElapsed(){var elapsed;if(!this.mouseDownStart){return 0}elapsed=Utility.now()-this.mouseDownStart;if(this.mouseUpStart){elapsed-=this.mouseUpElapsed}return elapsed},get mouseUpElapsed(){return this.mouseUpStart?Utility.now()-this.mouseUpStart:0},get mouseDownElapsedSeconds(){return this.mouseDownElapsed/1e3},get mouseUpElapsedSeconds(){return this.mouseUpElapsed/1e3},get mouseInteractionSeconds(){return this.mouseDownElapsedSeconds+this.mouseUpElapsedSeconds},get initialOpacity(){return this.element.initialOpacity},get opacityDecayVelocity(){return this.element.opacityDecayVelocity},get radius(){var width2=this.containerMetrics.width*this.containerMetrics.width,height2=this.containerMetrics.height*this.containerMetrics.height,waveRadius=1.1*Math.min(Math.sqrt(width2+height2),Ripple.MAX_RADIUS)+5,duration=1.1-.2*(waveRadius/Ripple.MAX_RADIUS),timeNow=this.mouseInteractionSeconds/duration,size=waveRadius*(1-Math.pow(80,-timeNow));return Math.abs(size)},get opacity(){if(!this.mouseUpStart){return this.initialOpacity}return Math.max(0,this.initialOpacity-this.mouseUpElapsedSeconds*this.opacityDecayVelocity)},get outerOpacity(){// Linear increase in background opacity, capped at the opacity
// of the wavefront (waveOpacity).
var outerOpacity=.3*this.mouseUpElapsedSeconds,waveOpacity=this.opacity;return Math.max(0,Math.min(outerOpacity,waveOpacity))},get isOpacityFullyDecayed(){return .01>this.opacity&&this.radius>=Math.min(this.maxRadius,Ripple.MAX_RADIUS)},get isRestingAtMaxRadius(){return this.opacity>=this.initialOpacity&&this.radius>=Math.min(this.maxRadius,Ripple.MAX_RADIUS)},get isAnimationComplete(){return this.mouseUpStart?this.isOpacityFullyDecayed:this.isRestingAtMaxRadius},get translationFraction(){return Math.min(1,2*(this.radius/this.containerMetrics.size)/Math.sqrt(2))},get xNow(){if(this.xEnd){return this.xStart+this.translationFraction*(this.xEnd-this.xStart)}return this.xStart},get yNow(){if(this.yEnd){return this.yStart+this.translationFraction*(this.yEnd-this.yStart)}return this.yStart},get isMouseDown(){return this.mouseDownStart&&!this.mouseUpStart},resetInteractionState:function resetInteractionState(){this.maxRadius=0;this.mouseDownStart=0;this.mouseUpStart=0;this.xStart=0;this.yStart=0;this.xEnd=0;this.yEnd=0;this.slideDistance=0;this.containerMetrics=new ElementMetrics(this.element)},draw:function draw(){var scale,dx,dy;this.wave.style.opacity=this.opacity;scale=this.radius/(this.containerMetrics.size/2);dx=this.xNow-this.containerMetrics.width/2;dy=this.yNow-this.containerMetrics.height/2;// 2d transform for safari because of border-radius and overflow:hidden
// clipping bug. https://bugs.webkit.org/show_bug.cgi?id=98538
this.waveContainer.style.webkitTransform="translate("+dx+"px, "+dy+"px)";this.waveContainer.style.transform="translate3d("+dx+"px, "+dy+"px, 0)";this.wave.style.webkitTransform="scale("+scale+","+scale+")";this.wave.style.transform="scale3d("+scale+","+scale+",1)"},/** @param {Event=} event */downAction:function downAction(event){var xCenter=this.containerMetrics.width/2,yCenter=this.containerMetrics.height/2;this.resetInteractionState();this.mouseDownStart=Utility.now();if(this.center){this.xStart=xCenter;this.yStart=yCenter;this.slideDistance=Utility.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)}else{this.xStart=event?event.detail.x-this.containerMetrics.boundingRect.left:this.containerMetrics.width/2;this.yStart=event?event.detail.y-this.containerMetrics.boundingRect.top:this.containerMetrics.height/2}if(this.recenters){this.xEnd=xCenter;this.yEnd=yCenter;this.slideDistance=Utility.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)}this.maxRadius=this.containerMetrics.furthestCornerDistanceFrom(this.xStart,this.yStart);this.waveContainer.style.top=(this.containerMetrics.height-this.containerMetrics.size)/2+"px";this.waveContainer.style.left=(this.containerMetrics.width-this.containerMetrics.size)/2+"px";this.waveContainer.style.width=this.containerMetrics.size+"px";this.waveContainer.style.height=this.containerMetrics.size+"px"},/** @param {Event=} event */upAction:function upAction(event){if(!this.isMouseDown){return}this.mouseUpStart=Utility.now()},remove:function remove(){dom(this.waveContainer.parentNode).removeChild(this.waveContainer)}};/**
   Material design: [Surface
   reaction](https://www.google.com/design/spec/animation/responsive-interaction.html#responsive-interaction-surface-reaction)
   
   `paper-ripple` provides a visual effect that other paper elements can
   use to simulate a rippling effect emanating from the point of contact.  The
   effect can be visualized as a concentric circle with motion.
   
   Example:
   
       <div style="position:relative">
         <paper-ripple></paper-ripple>
       </div>
   
   Note, it's important that the parent container of the ripple be relative
   position, otherwise the ripple will emanate outside of the desired container.
   
   `paper-ripple` listens to "mousedown" and "mouseup" events so it would display
   ripple effect when touches on it.  You can also defeat the default behavior and
   manually route the down and up actions to the ripple element.  Note that it is
   important if you call `downAction()` you will have to make sure to call
   `upAction()` so that `paper-ripple` would end the animation loop.
   
   Example:
   
       <paper-ripple id="ripple" style="pointer-events: none;"></paper-ripple>
       ...
       downAction: function(e) {
         this.$.ripple.downAction(e.detail);
       },
       upAction: function(e) {
         this.$.ripple.upAction();
       }
   
   Styling ripple effect:
   
     Use CSS color property to style the ripple:
   
       paper-ripple {
         color: #4285f4;
       }
   
     Note that CSS color property is inherited so it is not required to set it on
     the `paper-ripple` element directly.
   
   By default, the ripple is centered on the point of contact.  Apply the
   `recenters` attribute to have the ripple grow toward the center of its
   container.
   
       <paper-ripple recenters></paper-ripple>
   
   You can also  center the ripple inside its container from the start.
   
       <paper-ripple center></paper-ripple>
   
   Apply `circle` class to make the rippling effect within a circle.
   
       <paper-ripple class="circle"></paper-ripple>
   
   @group Paper Elements
   @element paper-ripple
   @hero hero.svg
   @demo demo/index.html
   */Polymer({_template:html(_templateObject7_6bf96330d65d11eaa5e0898854dcb572()),is:"paper-ripple",behaviors:[IronA11yKeysBehavior],properties:{/**
     * The initial opacity set on the wave.
     *
     * @attribute initialOpacity
     * @type number
     * @default 0.25
     */initialOpacity:{type:Number,value:.25},/**
     * How fast (opacity per second) the wave fades out.
     *
     * @attribute opacityDecayVelocity
     * @type number
     * @default 0.8
     */opacityDecayVelocity:{type:Number,value:.8},/**
     * If true, ripples will exhibit a gravitational pull towards
     * the center of their container as they fade away.
     *
     * @attribute recenters
     * @type boolean
     * @default false
     */recenters:{type:Boolean,value:!1},/**
     * If true, ripples will center inside its container
     *
     * @attribute recenters
     * @type boolean
     * @default false
     */center:{type:Boolean,value:!1},/**
     * A list of the visual ripples.
     *
     * @attribute ripples
     * @type Array
     * @default []
     */ripples:{type:Array,value:function value(){return[]}},/**
     * True when there are visible ripples animating within the
     * element.
     */animating:{type:Boolean,readOnly:!0,reflectToAttribute:!0,value:!1},/**
     * If true, the ripple will remain in the "down" state until `holdDown`
     * is set to false again.
     */holdDown:{type:Boolean,value:!1,observer:"_holdDownChanged"},/**
     * If true, the ripple will not generate a ripple effect
     * via pointer interaction.
     * Calling ripple's imperative api like `simulatedRipple` will
     * still generate the ripple effect.
     */noink:{type:Boolean,value:!1},_animating:{type:Boolean},_boundAnimate:{type:Function,value:function value(){return this.animate.bind(this)}}},get target(){return this.keyEventTarget},/**
   * @type {!Object}
   */keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},attached:function attached(){// Set up a11yKeysBehavior to listen to key events on the target,
// so that space and enter activate the ripple even if the target doesn't
// handle key events. The key handlers deal with `noink` themselves.
if(11==this.parentNode.nodeType){// DOCUMENT_FRAGMENT_NODE
this.keyEventTarget=dom(this).getOwnerRoot().host}else{this.keyEventTarget=this.parentNode}var keyEventTarget=/** @type {!EventTarget} */this.keyEventTarget;this.listen(keyEventTarget,"up","uiUpAction");this.listen(keyEventTarget,"down","uiDownAction")},detached:function detached(){this.unlisten(this.keyEventTarget,"up","uiUpAction");this.unlisten(this.keyEventTarget,"down","uiDownAction");this.keyEventTarget=null},get shouldKeepAnimating(){for(var index=0;index<this.ripples.length;++index){if(!this.ripples[index].isAnimationComplete){return!0}}return!1},simulatedRipple:function simulatedRipple(){this.downAction(null);// Please see polymer/polymer#1305
this.async(function(){this.upAction()},1)},/**
   * Provokes a ripple down effect via a UI event,
   * respecting the `noink` property.
   * @param {Event=} event
   */uiDownAction:function uiDownAction(event){if(!this.noink){this.downAction(event)}},/**
   * Provokes a ripple down effect via a UI event,
   * *not* respecting the `noink` property.
   * @param {Event=} event
   */downAction:function downAction(event){if(this.holdDown&&0<this.ripples.length){return}var ripple=this.addRipple();ripple.downAction(event);if(!this._animating){this._animating=!0;this.animate()}},/**
   * Provokes a ripple up effect via a UI event,
   * respecting the `noink` property.
   * @param {Event=} event
   */uiUpAction:function uiUpAction(event){if(!this.noink){this.upAction(event)}},/**
   * Provokes a ripple up effect via a UI event,
   * *not* respecting the `noink` property.
   * @param {Event=} event
   */upAction:function upAction(event){if(this.holdDown){return}this.ripples.forEach(function(ripple){ripple.upAction(event)});this._animating=!0;this.animate()},onAnimationComplete:function onAnimationComplete(){this._animating=!1;this.$.background.style.backgroundColor=null;this.fire("transitionend")},addRipple:function addRipple(){var ripple=new Ripple(this);dom(this.$.waves).appendChild(ripple.waveContainer);this.$.background.style.backgroundColor=ripple.color;this.ripples.push(ripple);this._setAnimating(!0);return ripple},removeRipple:function removeRipple(ripple){var rippleIndex=this.ripples.indexOf(ripple);if(0>rippleIndex){return}this.ripples.splice(rippleIndex,1);ripple.remove();if(!this.ripples.length){this._setAnimating(!1)}},/**
   * Deprecated. Please use animateRipple() instead.
   *
   * This method name conflicts with Element#animate().
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/animate.
   *
   * @suppress {checkTypes}
   */animate:function animate(){if(!this._animating){return}var index,ripple;for(index=0;index<this.ripples.length;++index){ripple=this.ripples[index];ripple.draw();this.$.background.style.opacity=ripple.outerOpacity;if(ripple.isOpacityFullyDecayed&&!ripple.isRestingAtMaxRadius){this.removeRipple(ripple)}}if(!this.shouldKeepAnimating&&0===this.ripples.length){this.onAnimationComplete()}else{window.requestAnimationFrame(this._boundAnimate)}},/**
   * An alias for animate() whose name does not conflict with the platform
   * Element.animate() method.
   */animateRipple:function animateRipple(){return this.animate()},_onEnterKeydown:function _onEnterKeydown(){this.uiDownAction();this.async(this.uiUpAction,1)},_onSpaceKeydown:function _onSpaceKeydown(){this.uiDownAction()},_onSpaceKeyup:function _onSpaceKeyup(){this.uiUpAction()},// note: holdDown does not respect noink since it can be a focus based
// effect.
_holdDownChanged:function _holdDownChanged(newVal,oldVal){if(oldVal===void 0){return}if(newVal){this.downAction()}else{this.upAction()}}/**
    Fired when the animation finishes.
    This is useful if you want to wait until
    the ripple animation finishes to perform some action.
     @event transitionend
    @param {{node: Object}} detail Contains the animated node.
    */});var PaperRippleBehavior={properties:{/**
     * If true, the element will not produce a ripple effect when interacted
     * with via the pointer.
     */noink:{type:Boolean,observer:"_noinkChanged"},/**
     * @type {Element|undefined}
     */_rippleContainer:{type:Object}},/**
   * Ensures a `<paper-ripple>` element is available when the element is
   * focused.
   */_buttonStateChanged:function _buttonStateChanged(){if(this.focused){this.ensureRipple()}},/**
   * In addition to the functionality provided in `IronButtonState`, ensures
   * a ripple effect is created when the element is in a `pressed` state.
   */_downHandler:function _downHandler(event){IronButtonStateImpl._downHandler.call(this,event);if(this.pressed){this.ensureRipple(event)}},/**
   * Ensures this element contains a ripple effect. For startup efficiency
   * the ripple effect is dynamically on demand when needed.
   * @param {!Event=} optTriggeringEvent (optional) event that triggered the
   * ripple.
   */ensureRipple:function ensureRipple(optTriggeringEvent){if(!this.hasRipple()){this._ripple=this._createRipple();this._ripple.noink=this.noink;var rippleContainer=this._rippleContainer||this.root;if(rippleContainer){dom(rippleContainer).appendChild(this._ripple)}if(optTriggeringEvent){// Check if the event happened inside of the ripple container
// Fall back to host instead of the root because distributed text
// nodes are not valid event targets
var domContainer=dom(this._rippleContainer||this),target=dom(optTriggeringEvent).rootTarget;if(domContainer.deepContains(/** @type {Node} */target)){this._ripple.uiDownAction(optTriggeringEvent)}}}},/**
   * Returns the `<paper-ripple>` element used by this element to create
   * ripple effects. The element's ripple is created on demand, when
   * necessary, and calling this method will force the
   * ripple to be created.
   */getRipple:function getRipple(){this.ensureRipple();return this._ripple},/**
   * Returns true if this element currently contains a ripple effect.
   * @return {boolean}
   */hasRipple:function hasRipple(){return!!this._ripple},/**
   * Create the element's ripple effect via creating a `<paper-ripple>`.
   * Override this method to customize the ripple element.
   * @return {!PaperRippleElement} Returns a `<paper-ripple>` element.
   */_createRipple:function _createRipple(){var element=/** @type {!PaperRippleElement} */document.createElement("paper-ripple");return element},_noinkChanged:function _noinkChanged(noink){if(this.hasRipple()){this._ripple.noink=noink}}};_exports.PaperRippleBehavior=PaperRippleBehavior;var paperRippleBehavior={PaperRippleBehavior:PaperRippleBehavior};_exports.$paperRippleBehavior=paperRippleBehavior;var PaperButtonBehaviorImpl={properties:{/**
     * The z-depth of this element, from 0-5. Setting to 0 will remove the
     * shadow, and each increasing number greater than 0 will be "deeper"
     * than the last.
     *
     * @attribute elevation
     * @type number
     * @default 1
     */elevation:{type:Number,reflectToAttribute:!0,readOnly:!0}},observers:["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)","_computeKeyboardClass(receivedFocusFromKeyboard)"],hostAttributes:{role:"button",tabindex:"0",animated:!0},_calculateElevation:function _calculateElevation(){var e=1;if(this.disabled){e=0}else if(this.active||this.pressed){e=4}else if(this.receivedFocusFromKeyboard){e=3}this._setElevation(e)},_computeKeyboardClass:function _computeKeyboardClass(receivedFocusFromKeyboard){this.toggleClass("keyboard-focus",receivedFocusFromKeyboard)},/**
   * In addition to `IronButtonState` behavior, when space key goes down,
   * create a ripple down effect.
   *
   * @param {!KeyboardEvent} event .
   */_spaceKeyDownHandler:function _spaceKeyDownHandler(event){IronButtonStateImpl._spaceKeyDownHandler.call(this,event);// Ensure that there is at most one ripple when the space key is held down.
if(this.hasRipple()&&1>this.getRipple().ripples.length){this._ripple.uiDownAction()}},/**
   * In addition to `IronButtonState` behavior, when space key goes up,
   * create a ripple up effect.
   *
   * @param {!KeyboardEvent} event .
   */_spaceKeyUpHandler:function _spaceKeyUpHandler(event){IronButtonStateImpl._spaceKeyUpHandler.call(this,event);if(this.hasRipple()){this._ripple.uiUpAction()}}};/** @polymerBehavior */_exports.PaperButtonBehaviorImpl=PaperButtonBehaviorImpl;var PaperButtonBehavior=[IronButtonState,IronControlState,PaperRippleBehavior,PaperButtonBehaviorImpl];_exports.PaperButtonBehavior=PaperButtonBehavior;var paperButtonBehavior={PaperButtonBehaviorImpl:PaperButtonBehaviorImpl,PaperButtonBehavior:PaperButtonBehavior};_exports.$paperButtonBehavior=paperButtonBehavior;var PaperInkyFocusBehaviorImpl={observers:["_focusedChanged(receivedFocusFromKeyboard)"],_focusedChanged:function _focusedChanged(receivedFocusFromKeyboard){if(receivedFocusFromKeyboard){this.ensureRipple()}if(this.hasRipple()){this._ripple.holdDown=receivedFocusFromKeyboard}},_createRipple:function _createRipple(){var ripple=PaperRippleBehavior._createRipple();ripple.id="ink";ripple.setAttribute("center","");ripple.classList.add("circle");return ripple}};/** @polymerBehavior */_exports.PaperInkyFocusBehaviorImpl=PaperInkyFocusBehaviorImpl;var PaperInkyFocusBehavior=[IronButtonState,IronControlState,PaperRippleBehavior,PaperInkyFocusBehaviorImpl];_exports.PaperInkyFocusBehavior=PaperInkyFocusBehavior;var paperInkyFocusBehavior={PaperInkyFocusBehaviorImpl:PaperInkyFocusBehaviorImpl,PaperInkyFocusBehavior:PaperInkyFocusBehavior};_exports.$paperInkyFocusBehavior=paperInkyFocusBehavior;var PaperCheckedElementBehaviorImpl={/**
   * Synchronizes the element's checked state with its ripple effect.
   */_checkedChanged:function _checkedChanged(){IronCheckedElementBehaviorImpl._checkedChanged.call(this);if(this.hasRipple()){if(this.checked){this._ripple.setAttribute("checked","")}else{this._ripple.removeAttribute("checked")}}},/**
   * Synchronizes the element's `active` and `checked` state.
   */_buttonStateChanged:function _buttonStateChanged(){PaperRippleBehavior._buttonStateChanged.call(this);if(this.disabled){return}if(this.isAttached){this.checked=this.active}}};/** @polymerBehavior */_exports.PaperCheckedElementBehaviorImpl=PaperCheckedElementBehaviorImpl;var PaperCheckedElementBehavior=[PaperInkyFocusBehavior,IronCheckedElementBehavior,PaperCheckedElementBehaviorImpl];_exports.PaperCheckedElementBehavior=PaperCheckedElementBehavior;var paperCheckedElementBehavior={PaperCheckedElementBehaviorImpl:PaperCheckedElementBehaviorImpl,PaperCheckedElementBehavior:PaperCheckedElementBehavior};_exports.$paperCheckedElementBehavior=paperCheckedElementBehavior;var template$2=html(_templateObject8_6bf96330d65d11eaa5e0898854dcb572());template$2.setAttribute("style","display: none;");document.head.appendChild(template$2.content);var template$3=html(_templateObject9_6bf96330d65d11eaa5e0898854dcb572());template$3.setAttribute("style","display: none;");document.head.appendChild(template$3.content);var template$4=html(_templateObject10_6bf96330d65d11eaa5e0898854dcb572());template$4.setAttribute("strip-whitespace","");/**
                                                 Material design:
                                                 [Buttons](https://www.google.com/design/spec/components/buttons.html)
                                                                                               `paper-button` is a button. When the user touches the button, a ripple effect
                                                 emanates from the point of contact. It may be flat or raised. A raised button is
                                                 styled with a shadow.
                                                                                               Example:
                                                                                                   <paper-button>Flat button</paper-button>
                                                   <paper-button raised>Raised button</paper-button>
                                                   <paper-button noink>No ripple effect</paper-button>
                                                   <paper-button toggles>Toggle-able button</paper-button>
                                                                                               A button that has `toggles` true will remain `active` after being clicked (and
                                                 will have an `active` attribute set). For more information, see the
                                                 `IronButtonState` behavior.
                                                                                               You may use custom DOM in the button body to create a variety of buttons. For
                                                 example, to create a button with an icon and some text:
                                                                                                   <paper-button>
                                                     <iron-icon icon="favorite"></iron-icon>
                                                     custom button content
                                                   </paper-button>
                                                                                               To use `paper-button` as a link, wrap it in an anchor tag. Since `paper-button`
                                                 will already receive focus, you may want to prevent the anchor tag from
                                                 receiving focus as well by setting its tabindex to -1.
                                                                                                   <a href="https://www.polymer-project.org/" tabindex="-1">
                                                     <paper-button raised>Polymer Project</paper-button>
                                                   </a>
                                                                                               ### Styling
                                                                                               Style the button with CSS as you would a normal DOM element.
                                                                                                   paper-button.fancy {
                                                     background: green;
                                                     color: yellow;
                                                   }
                                                                                                   paper-button.fancy:hover {
                                                     background: lime;
                                                   }
                                                                                                   paper-button[disabled],
                                                   paper-button[toggles][active] {
                                                     background: red;
                                                   }
                                                                                               By default, the ripple is the same color as the foreground at 25% opacity. You
                                                 may customize the color using the `--paper-button-ink-color` custom property.
                                                                                               The following custom properties and mixins are also available for styling:
                                                                                               Custom property | Description | Default
                                                 ----------------|-------------|----------
                                                 `--paper-button-ink-color` | Background color of the ripple | `Based on the button's color`
                                                 `--paper-button` | Mixin applied to the button | `{}`
                                                 `--paper-button-disabled` | Mixin applied to the disabled button. Note that you can also use the `paper-button[disabled]` selector | `{}`
                                                 `--paper-button-flat-keyboard-focus` | Mixin applied to a flat button after it's been focused using the keyboard | `{}`
                                                 `--paper-button-raised-keyboard-focus` | Mixin applied to a raised button after it's been focused using the keyboard | `{}`
                                                                                               @demo demo/index.html
                                                 */Polymer({_template:template$4,is:"paper-button",behaviors:[PaperButtonBehavior],properties:{/**
     * If true, the button should be styled with a shadow.
     */raised:{type:Boolean,reflectToAttribute:!0,value:!1,observer:"_calculateElevation"}},_calculateElevation:function _calculateElevation(){if(!this.raised){this._setElevation(0)}else{PaperButtonBehaviorImpl._calculateElevation.apply(this)}}/**
    Fired when the animation finishes.
    This is useful if you want to wait until
    the ripple animation finishes to perform some action.
     @event transitionend
    Event param: {{node: Object}} detail Contains the animated node.
    */});var template$5=html(_templateObject11_6bf96330d65d11eaa5e0898854dcb572());template$5.setAttribute("style","display: none;");document.head.appendChild(template$5.content);var template$6=html(_templateObject12_6bf96330d65d11eaa5e0898854dcb572());template$6.setAttribute("style","display: none;");document.head.appendChild(template$6.content);Polymer({_template:html(_templateObject13_6bf96330d65d11eaa5e0898854dcb572()),is:"paper-card",properties:{/**
     * The title of the card.
     */heading:{type:String,value:"",observer:"_headingChanged"},/**
     * The url of the title image of the card.
     */image:{type:String,value:""},/**
     * The text alternative of the card's title image.
     */alt:{type:String},/**
     * When `true`, any change to the image url property will cause the
     * `placeholder` image to be shown until the image is fully rendered.
     */preloadImage:{type:Boolean,value:!1},/**
     * When `preloadImage` is true, setting `fadeImage` to true will cause the
     * image to fade into place.
     */fadeImage:{type:Boolean,value:!1},/**
     * This image will be used as a background/placeholder until the src image
     * has loaded. Use of a data-URI for placeholder is encouraged for instant
     * rendering.
     */placeholderImage:{type:String,value:null},/**
     * The z-depth of the card, from 0-5.
     */elevation:{type:Number,value:1,reflectToAttribute:!0},/**
     * Set this to true to animate the card shadow when setting a new
     * `z` value.
     */animatedShadow:{type:Boolean,value:!1},/**
     * Read-only property used to pass down the `animatedShadow` value to
     * the underlying paper-material style (since they have different names).
     */animated:{type:Boolean,reflectToAttribute:!0,readOnly:!0,computed:"_computeAnimated(animatedShadow)"}},/**
   * Format function for aria-hidden. Use the ! operator results in the
   * empty string when given a falsy value.
   */_isHidden:function _isHidden(image){return image?"false":"true"},_headingChanged:function _headingChanged(heading){var currentHeading=this.getAttribute("heading"),currentLabel=this.getAttribute("aria-label");if("string"!==typeof currentLabel||currentLabel===currentHeading){this.setAttribute("aria-label",heading)}},_computeHeadingClass:function _computeHeadingClass(image){return image?" over-image":""},_computeAnimated:function _computeAnimated(animatedShadow){return animatedShadow}});Polymer({is:"paper-icon-button",_template:html(_templateObject14_6bf96330d65d11eaa5e0898854dcb572()),hostAttributes:{role:"button",tabindex:"0"},behaviors:[PaperInkyFocusBehavior],registered:function registered(){this._template.setAttribute("strip-whitespace","")},properties:{/**
     * The URL of an image for the icon. If the src property is specified,
     * the icon property should not be.
     */src:{type:String},/**
     * Specifies the icon name or index in the set of icons available in
     * the icon's icon set. If the icon property is specified,
     * the src property should not be.
     */icon:{type:String},/**
     * Specifies the alternate text for the button, for accessibility.
     */alt:{type:String,observer:"_altChanged"}},_altChanged:function _altChanged(newValue,oldValue){var label=this.getAttribute("aria-label");// Don't stomp over a user-set aria-label.
if(!label||oldValue==label){this.setAttribute("aria-label",newValue)}}});var PaperInputAddonBehavior={attached:function attached(){this.fire("addon-attached")},/**
   * The function called by `<paper-input-container>` when the input value or
   * validity changes.
   * @param {{
   *   invalid: boolean,
   *   inputElement: (Element|undefined),
   *   value: (string|undefined)
   * }} state -
   *     inputElement: The input element.
   *     value: The input value.
   *     invalid: True if the input value is invalid.
   */update:function update(state){}};_exports.PaperInputAddonBehavior=PaperInputAddonBehavior;var paperInputAddonBehavior={PaperInputAddonBehavior:PaperInputAddonBehavior};// aria-labelledby) and add-ons.
_exports.$paperInputAddonBehavior=paperInputAddonBehavior;var PaperInputHelper={};_exports.PaperInputHelper=PaperInputHelper;PaperInputHelper.NextLabelID=1;PaperInputHelper.NextAddonID=1;PaperInputHelper.NextInputID=1;/**
                                   * Use `PaperInputBehavior` to implement inputs with `<paper-input-container>`.
                                   * This behavior is implemented by `<paper-input>`. It exposes a number of
                                   * properties from `<paper-input-container>` and `<input is="iron-input">` and
                                   * they should be bound in your template.
                                   *
                                   * The input element can be accessed by the `inputElement` property if you need
                                   * to access properties or methods that are not exposed.
                                   * @polymerBehavior PaperInputBehavior
                                   */var PaperInputBehaviorImpl={properties:{/**
     * Fired when the input changes due to user interaction.
     *
     * @event change
     */ /**
         * The label for this input. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * `<label>`'s content and `hidden` property, e.g.
         * `<label hidden$="[[!label]]">[[label]]</label>` in your `template`
         */label:{type:String},/**
     * The value for this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<iron-input>`'s `bindValue`
     * property, or the value property of your input that is `notify:true`.
     * @type {*}
     */value:{notify:!0,type:String},/**
     * Set to true to disable this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * both the `<paper-input-container>`'s and the input's `disabled` property.
     */disabled:{type:Boolean,value:!1},/**
     * Returns true if the value is invalid. If you're using PaperInputBehavior
     * to implement your own paper-input-like element, bind this to both the
     * `<paper-input-container>`'s and the input's `invalid` property.
     *
     * If `autoValidate` is true, the `invalid` attribute is managed
     * automatically, which can clobber attempts to manage it manually.
     */invalid:{type:Boolean,value:!1,notify:!0},/**
     * Set this to specify the pattern allowed by `preventInvalidInput`. If
     * you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `allowedPattern`
     * property.
     */allowedPattern:{type:String},/**
     * The type of the input. The supported types are the
     * [native input's
     * types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_<input>_types).
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the (Polymer 1) `<input is="iron-input">`'s or
     * (Polymer 2)
     * `<iron-input>`'s `type` property.
     */type:{type:String},/**
     * The datalist of the input (if any). This should match the id of an
     * existing `<datalist>`. If you're using PaperInputBehavior to implement
     * your own paper-input-like element, bind this to the `<input
     * is="iron-input">`'s `list` property.
     */list:{type:String},/**
     * A pattern to validate the `input` with. If you're using
     * PaperInputBehavior to implement your own paper-input-like element, bind
     * this to the `<input is="iron-input">`'s `pattern` property.
     */pattern:{type:String},/**
     * Set to true to mark the input as required. If you're using
     * PaperInputBehavior to implement your own paper-input-like element, bind
     * this to the `<input is="iron-input">`'s `required` property.
     */required:{type:Boolean,value:!1},/**
     * The error message to display when the input is invalid. If you're using
     * PaperInputBehavior to implement your own paper-input-like element,
     * bind this to the `<paper-input-error>`'s content, if using.
     */errorMessage:{type:String},/**
     * Set to true to show a character counter.
     */charCounter:{type:Boolean,value:!1},/**
     * Set to true to disable the floating label. If you're using
     * PaperInputBehavior to implement your own paper-input-like element, bind
     * this to the `<paper-input-container>`'s `noLabelFloat` property.
     */noLabelFloat:{type:Boolean,value:!1},/**
     * Set to true to always float the label. If you're using PaperInputBehavior
     * to implement your own paper-input-like element, bind this to the
     * `<paper-input-container>`'s `alwaysFloatLabel` property.
     */alwaysFloatLabel:{type:Boolean,value:!1},/**
     * Set to true to auto-validate the input value. If you're using
     * PaperInputBehavior to implement your own paper-input-like element, bind
     * this to the `<paper-input-container>`'s `autoValidate` property.
     */autoValidate:{type:Boolean,value:!1},/**
     * Name of the validator to use. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `validator` property.
     */validator:{type:String},// HTMLInputElement attributes for binding if needed
/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocomplete`
     * property.
     */autocomplete:{type:String,value:"off"},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autofocus`
     * property.
     */autofocus:{type:Boolean,observer:"_autofocusChanged"},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `inputmode`
     * property.
     */inputmode:{type:String},/**
     * The minimum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `minlength`
     * property.
     */minlength:{type:Number},/**
     * The maximum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `maxlength`
     * property.
     */maxlength:{type:Number},/**
     * The minimum (numeric or date-time) input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `min` property.
     */min:{type:String},/**
     * The maximum (numeric or date-time) input value.
     * Can be a String (e.g. `"2000-01-01"`) or a Number (e.g. `2`).
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `max` property.
     */max:{type:String},/**
     * Limits the numeric or date-time increments.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `step` property.
     */step:{type:String},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `name` property.
     */name:{type:String},/**
     * A placeholder string in addition to the label. If this is set, the label
     * will always float.
     */placeholder:{type:String,// need to set a default so _computeAlwaysFloatLabel is run
value:""},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `readonly`
     * property.
     */readonly:{type:Boolean,value:!1},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `size` property.
     */size:{type:Number},// Nonstandard attributes for binding if needed
/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocapitalize`
     * property.
     *
     * @type {string}
     */autocapitalize:{type:String,value:"none"},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocorrect`
     * property.
     */autocorrect:{type:String,value:"off"},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autosave`
     * property, used with type=search.
     */autosave:{type:String},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `results` property,
     * used with type=search.
     */results:{type:Number},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `accept` property,
     * used with type=file.
     */accept:{type:String},/**
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the`<input is="iron-input">`'s `multiple` property,
     * used with type=file.
     */multiple:{type:Boolean},/** @private */_ariaDescribedBy:{type:String,value:""},/** @private */_ariaLabelledBy:{type:String,value:""},/** @private */_inputId:{type:String,value:""}},listeners:{"addon-attached":"_onAddonAttached"},/**
   * @type {!Object}
   */keyBindings:{"shift+tab:keydown":"_onShiftTabDown"},/** @private */hostAttributes:{tabindex:0},/**
   * Returns a reference to the input element.
   * @return {!HTMLElement}
   */get inputElement(){// Chrome generates audit errors if an <input type="password"> has a
// duplicate ID, which is almost always true in Shady DOM. Generate
// a unique ID instead.
if(!this.$){this.$={}}if(!this.$.input){this._generateInputId();this.$.input=this.$$("#"+this._inputId)}return this.$.input},/**
   * Returns a reference to the focusable element.
   * @return {!HTMLElement}
   */get _focusableElement(){return this.inputElement},/** @override */created:function created(){// These types have some default placeholder text; overlapping
// the label on top of it looks terrible. Auto-float the label in this case.
this._typesThatHaveText=["date","datetime","datetime-local","month","time","week","file"]},/** @override */attached:function attached(){this._updateAriaLabelledBy();// In the 2.0 version of the element, this is handled in `onIronInputReady`,
// i.e. after the native input has finished distributing. In the 1.0
// version, the input is in the shadow tree, so it's already available.
if(!PolymerElement&&this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.inputElement.type)){this.alwaysFloatLabel=!0}},_appendStringWithSpace:function _appendStringWithSpace(str,more){if(str){str=str+" "+more}else{str=more}return str},_onAddonAttached:function _onAddonAttached(event){var target=dom(event).rootTarget;if(target.id){this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,target.id)}else{var id="paper-input-add-on-"+PaperInputHelper.NextAddonID++;target.id=id;this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,id)}},/**
   * Validates the input element and sets an error style if needed.
   *
   * @return {boolean}
   */validate:function validate(){return this.inputElement.validate()},/**
   * Forward focus to inputElement. Overriden from IronControlState.
   */_focusBlurHandler:function _focusBlurHandler(event){IronControlState._focusBlurHandler.call(this,event);// Forward the focus to the nested input.
if(this.focused&&!this._shiftTabPressed&&this._focusableElement){this._focusableElement.focus()}},/**
   * Handler that is called when a shift+tab keypress is detected by the menu.
   *
   * @param {CustomEvent} event A key combination event.
   */_onShiftTabDown:function _onShiftTabDown(event){var oldTabIndex=this.getAttribute("tabindex");this._shiftTabPressed=!0;this.setAttribute("tabindex","-1");this.async(function(){this.setAttribute("tabindex",oldTabIndex);this._shiftTabPressed=!1},1)},/**
   * If `autoValidate` is true, then validates the element.
   */_handleAutoValidate:function _handleAutoValidate(){if(this.autoValidate)this.validate()},/**
   * Restores the cursor to its original position after updating the value.
   * @param {string} newValue The value that should be saved.
   */updateValueAndPreserveCaret:function updateValueAndPreserveCaret(newValue){// Not all elements might have selection, and even if they have the
// right properties, accessing them might throw an exception (like for
// <input type=number>)
try{var start=this.inputElement.selectionStart;this.value=newValue;// The cursor automatically jumps to the end after re-setting the value,
// so restore it to its original position.
this.inputElement.selectionStart=start;this.inputElement.selectionEnd=start}catch(e){// Just set the value and give up on the caret.
this.value=newValue}},_computeAlwaysFloatLabel:function _computeAlwaysFloatLabel(alwaysFloatLabel,placeholder){return placeholder||alwaysFloatLabel},_updateAriaLabelledBy:function _updateAriaLabelledBy(){var label=dom(this.root).querySelector("label");if(!label){this._ariaLabelledBy="";return}var labelledBy;if(label.id){labelledBy=label.id}else{labelledBy="paper-input-label-"+PaperInputHelper.NextLabelID++;label.id=labelledBy}this._ariaLabelledBy=labelledBy},_generateInputId:function _generateInputId(){if(!this._inputId||""===this._inputId){this._inputId="input-"+PaperInputHelper.NextInputID++}},_onChange:function _onChange(event){// In the Shadow DOM, the `change` event is not leaked into the
// ancestor tree, so we must do this manually.
// See
// https://w3c.github.io/webcomponents/spec/shadow/#events-that-are-not-leaked-into-ancestor-trees.
if(this.shadowRoot){this.fire(event.type,{sourceEvent:event},{node:this,bubbles:event.bubbles,cancelable:event.cancelable})}},_autofocusChanged:function _autofocusChanged(){// Firefox doesn't respect the autofocus attribute if it's applied after
// the page is loaded (Chrome/WebKit do respect it), preventing an
// autofocus attribute specified in markup from taking effect when the
// element is upgraded. As a workaround, if the autofocus property is set,
// and the focus hasn't already been moved elsewhere, we take focus.
if(this.autofocus&&this._focusableElement){// In IE 11, the default document.activeElement can be the page's
// outermost html element, but there are also cases (under the
// polyfill?) in which the activeElement is not a real HTMLElement, but
// just a plain object. We identify the latter case as having no valid
// activeElement.
var activeElement=document.activeElement,isActiveElementValid=babelHelpers.instanceof(activeElement,HTMLElement),isSomeElementActive=isActiveElementValid&&activeElement!==document.body&&activeElement!==document.documentElement;/* IE 11 */if(!isSomeElementActive){// No specific element has taken the focus yet, so we can take it.
this._focusableElement.focus()}}}};/** @polymerBehavior */_exports.PaperInputBehaviorImpl=PaperInputBehaviorImpl;var PaperInputBehavior=[IronControlState,IronA11yKeysBehavior,PaperInputBehaviorImpl];_exports.PaperInputBehavior=PaperInputBehavior;var paperInputBehavior={PaperInputHelper:PaperInputHelper,PaperInputBehaviorImpl:PaperInputBehaviorImpl,PaperInputBehavior:PaperInputBehavior};_exports.$paperInputBehavior=paperInputBehavior;var template$7=html(_templateObject15_6bf96330d65d11eaa5e0898854dcb572());template$7.setAttribute("style","display: none;");document.head.appendChild(template$7.content);Polymer({/** @override */_template:html(_templateObject16_6bf96330d65d11eaa5e0898854dcb572()),is:"paper-input-char-counter",behaviors:[PaperInputAddonBehavior],properties:{_charCounterStr:{type:String,value:"0"}},/**
   * This overrides the update function in PaperInputAddonBehavior.
   * @param {{
   *   inputElement: (Element|undefined),
   *   value: (string|undefined),
   *   invalid: boolean
   * }} state -
   *     inputElement: The input element.
   *     value: The input value.
   *     invalid: True if the input value is invalid.
   */update:function update(state){if(!state.inputElement){return}state.value=state.value||"";var counter=state.value.toString().length.toString();if(state.inputElement.hasAttribute("maxlength")){counter+="/"+state.inputElement.getAttribute("maxlength")}this._charCounterStr=counter}});var template$8=html(_templateObject17_6bf96330d65d11eaa5e0898854dcb572());template$8.setAttribute("style","display: none;");document.head.appendChild(template$8.content);/*
                                               `<paper-input-container>` is a container for a `<label>`, an `<iron-input>` or
                                               `<textarea>` and optional add-on elements such as an error message or character
                                               counter, used to implement Material Design text fields.
                                                                                           For example:
                                                                                               <paper-input-container>
                                                   <label slot="label">Your name</label>
                                                   <iron-input slot="input">
                                                     <input>
                                                   </iron-input>
                                                   // In Polymer 1.0, you would use `<input is="iron-input" slot="input">`
                                               instead of the above.
                                                 </paper-input-container>
                                                                                           You can style the nested `<input>` however you want; if you want it to look like
                                               a Material Design input, you can style it with the
                                               --paper-input-container-shared-input-style mixin.
                                                                                           Do not wrap `<paper-input-container>` around elements that already include it,
                                               such as `<paper-input>`. Doing so may cause events to bounce infinitely between
                                               the container and its contained element.
                                                                                           ### Listening for input changes
                                                                                           By default, it listens for changes on the `bind-value` attribute on its children
                                               nodes and perform tasks such as auto-validating and label styling when the
                                               `bind-value` changes. You can configure the attribute it listens to with the
                                               `attr-for-value` attribute.
                                                                                           ### Using a custom input element
                                                                                           You can use a custom input element in a `<paper-input-container>`, for example
                                               to implement a compound input field like a social security number input. The
                                               custom input element should have the `paper-input-input` class, have a
                                               `notify:true` value property and optionally implements
                                               `Polymer.IronValidatableBehavior` if it is validatable.
                                                                                               <paper-input-container attr-for-value="ssn-value">
                                                   <label slot="label">Social security number</label>
                                                   <ssn-input slot="input" class="paper-input-input"></ssn-input>
                                                 </paper-input-container>
                                                                                           
                                               If you're using a `<paper-input-container>` imperatively, it's important to make
                                               sure that you attach its children (the `iron-input` and the optional `label`)
                                               before you attach the `<paper-input-container>` itself, so that it can be set up
                                               correctly.
                                                                                           ### Validation
                                                                                           If the `auto-validate` attribute is set, the input container will validate the
                                               input and update the container styling when the input value changes.
                                                                                           ### Add-ons
                                                                                           Add-ons are child elements of a `<paper-input-container>` with the `add-on`
                                               attribute and implements the `Polymer.PaperInputAddonBehavior` behavior. They
                                               are notified when the input value or validity changes, and may implement
                                               functionality such as error messages or character counters. They appear at the
                                               bottom of the input.
                                                                                           ### Prefixes and suffixes
                                               These are child elements of a `<paper-input-container>` with the `prefix`
                                               or `suffix` attribute, and are displayed inline with the input, before or after.
                                                                                               <paper-input-container>
                                                   <div slot="prefix">$</div>
                                                   <label slot="label">Total</label>
                                                   <iron-input slot="input">
                                                     <input>
                                                   </iron-input>
                                                   // In Polymer 1.0, you would use `<input is="iron-input" slot="input">`
                                               instead of the above. <paper-icon-button slot="suffix"
                                               icon="clear"></paper-icon-button>
                                                 </paper-input-container>
                                                                                           ### Styling
                                                                                           The following custom properties and mixins are available for styling:
                                                                                           Custom property | Description | Default
                                               ----------------|-------------|----------
                                               `--paper-input-container-color` | Label and underline color when the input is not focused | `--secondary-text-color`
                                               `--paper-input-container-focus-color` | Label and underline color when the input is focused | `--primary-color`
                                               `--paper-input-container-invalid-color` | Label and underline color when the input is is invalid | `--error-color`
                                               `--paper-input-container-input-color` | Input foreground color | `--primary-text-color`
                                               `--paper-input-container` | Mixin applied to the container | `{}`
                                               `--paper-input-container-disabled` | Mixin applied to the container when it's disabled | `{}`
                                               `--paper-input-container-label` | Mixin applied to the label | `{}`
                                               `--paper-input-container-label-focus` | Mixin applied to the label when the input is focused | `{}`
                                               `--paper-input-container-label-floating` | Mixin applied to the label when floating | `{}`
                                               `--paper-input-container-input` | Mixin applied to the input | `{}`
                                               `--paper-input-container-input-align` | The vertical-align property of the input | `bottom`
                                               `--paper-input-container-input-disabled` | Mixin applied to the input when the component is disabled | `{}`
                                               `--paper-input-container-input-focus` | Mixin applied to the input when focused | `{}`
                                               `--paper-input-container-input-invalid` | Mixin applied to the input when invalid | `{}`
                                               `--paper-input-container-input-webkit-spinner` | Mixin applied to the webkit spinner | `{}`
                                               `--paper-input-container-input-webkit-clear` | Mixin applied to the webkit clear button | `{}`
                                               `--paper-input-container-input-webkit-calendar-picker-indicator` | Mixin applied to the webkit calendar picker indicator | `{}`
                                               `--paper-input-container-ms-clear` | Mixin applied to the Internet Explorer clear button | `{}`
                                               `--paper-input-container-underline` | Mixin applied to the underline | `{}`
                                               `--paper-input-container-underline-focus` | Mixin applied to the underline when the input is focused | `{}`
                                               `--paper-input-container-underline-disabled` | Mixin applied to the underline when the input is disabled | `{}`
                                               `--paper-input-prefix` | Mixin applied to the input prefix | `{}`
                                               `--paper-input-suffix` | Mixin applied to the input suffix | `{}`
                                               `--paper-input-container-label-before` | Mixin applied to label before pseudo element | {}
                                               `--paper-input-container-label-after` | Mixin applied to label after pseudo element (useful for required asterisk) | {}
                                                                                           This element is `display:block` by default, but you can set the `inline`
                                               attribute to make it `display:inline-block`.
                                               */Polymer({/** @override */_template:html(_templateObject18_6bf96330d65d11eaa5e0898854dcb572()),is:"paper-input-container",properties:{/**
     * Set to true to disable the floating label. The label disappears when the
     * input value is not null.
     */noLabelFloat:{type:Boolean,value:!1},/**
     * Set to true to always float the floating label.
     */alwaysFloatLabel:{type:Boolean,value:!1},/**
     * The attribute to listen for value changes on.
     */attrForValue:{type:String,value:"bind-value"},/**
     * Set to true to auto-validate the input value when it changes.
     */autoValidate:{type:Boolean,value:!1},/**
     * True if the input is invalid. This property is set automatically when the
     * input value changes if auto-validating, or when the `iron-input-validate`
     * event is heard from a child.
     */invalid:{observer:"_invalidChanged",type:Boolean,value:!1},/**
     * True if the input has focus.
     */focused:{readOnly:!0,type:Boolean,value:!1,notify:!0},_addons:{type:Array// do not set a default value here intentionally - it will be initialized
// lazily when a distributed child is attached, which may occur before
// configuration for this element in polyfill.
},_inputHasContent:{type:Boolean,value:!1},_inputSelector:{type:String,value:"input,iron-input,textarea,.paper-input-input"},_boundOnFocus:{type:Function,value:function value(){return this._onFocus.bind(this)}},_boundOnBlur:{type:Function,value:function value(){return this._onBlur.bind(this)}},_boundOnInput:{type:Function,value:function value(){return this._onInput.bind(this)}},_boundValueChanged:{type:Function,value:function value(){return this._onValueChanged.bind(this)}}},listeners:{"addon-attached":"_onAddonAttached","iron-input-validate":"_onIronInputValidate"},get _valueChangedEvent(){return this.attrForValue+"-changed"},get _propertyForValue(){return dashToCamelCase(this.attrForValue)},get _inputElement(){return dom(this).querySelector(this._inputSelector)},get _inputElementValue(){return this._inputElement[this._propertyForValue]||this._inputElement.value},/** @override */ready:function ready(){// Paper-input treats a value of undefined differently at startup than
// the rest of the time (specifically: it does not validate it at startup,
// but it does after that. We need to track whether the first time we
// encounter the value is basically this first time, so that we can validate
// it correctly the rest of the time. See
// https://github.com/PolymerElements/paper-input/issues/605
this.__isFirstValueUpdate=!0;if(!this._addons){this._addons=[]}this.addEventListener("focus",this._boundOnFocus,!0);this.addEventListener("blur",this._boundOnBlur,!0)},/** @override */attached:function attached(){if(this.attrForValue){this._inputElement.addEventListener(this._valueChangedEvent,this._boundValueChanged)}else{this.addEventListener("input",this._onInput)}// Only validate when attached if the input already has a value.
if(this._inputElementValue&&""!=this._inputElementValue){this._handleValueAndAutoValidate(this._inputElement)}else{this._handleValue(this._inputElement)}},/** @private */_onAddonAttached:function _onAddonAttached(event){if(!this._addons){this._addons=[]}var target=event.target;if(-1===this._addons.indexOf(target)){this._addons.push(target);if(this.isAttached){this._handleValue(this._inputElement)}}},/** @private */_onFocus:function _onFocus(){this._setFocused(!0)},/** @private */_onBlur:function _onBlur(){this._setFocused(!1);this._handleValueAndAutoValidate(this._inputElement)},/** @private */_onInput:function _onInput(event){this._handleValueAndAutoValidate(event.target)},/** @private */_onValueChanged:function _onValueChanged(event){var input=event.target;// Paper-input treats a value of undefined differently at startup than
// the rest of the time (specifically: it does not validate it at startup,
// but it does after that. If this is in fact the bootup case, ignore
// validation, just this once.
if(this.__isFirstValueUpdate){this.__isFirstValueUpdate=!1;if(input.value===void 0||""===input.value){return}}this._handleValueAndAutoValidate(event.target)},/** @private */_handleValue:function _handleValue(inputElement){var value=this._inputElementValue;// type="number" hack needed because this.value is empty until it's valid
if(value||0===value||"number"===inputElement.type&&!inputElement.checkValidity()){this._inputHasContent=!0}else{this._inputHasContent=!1}this.updateAddons({inputElement:inputElement,value:value,invalid:this.invalid})},/** @private */_handleValueAndAutoValidate:function _handleValueAndAutoValidate(inputElement){if(this.autoValidate&&inputElement){var valid;if(inputElement.validate){valid=inputElement.validate(this._inputElementValue)}else{valid=inputElement.checkValidity()}this.invalid=!valid}// Call this last to notify the add-ons.
this._handleValue(inputElement)},/** @private */_onIronInputValidate:function _onIronInputValidate(event){this.invalid=this._inputElement.invalid},/** @private */_invalidChanged:function _invalidChanged(){if(this._addons){this.updateAddons({invalid:this.invalid})}},/**
   * Call this to update the state of add-ons.
   * @param {Object} state Add-on state.
   */updateAddons:function updateAddons(state){for(var addon,index=0;addon=this._addons[index];index++){addon.update(state)}},/** @private */_computeInputContentClass:function _computeInputContentClass(noLabelFloat,alwaysFloatLabel,focused,invalid,_inputHasContent){var cls="input-content";if(!noLabelFloat){var label=this.querySelector("label");if(alwaysFloatLabel||_inputHasContent){cls+=" label-is-floating";// If the label is floating, ignore any offsets that may have been
// applied from a prefix element.
this.$.labelAndInputContainer.style.position="static";if(invalid){cls+=" is-invalid"}else if(focused){cls+=" label-is-highlighted"}}else{// When the label is not floating, it should overlap the input element.
if(label){this.$.labelAndInputContainer.style.position="relative"}if(invalid){cls+=" is-invalid"}}}else{if(_inputHasContent){cls+=" label-is-hidden"}if(invalid){cls+=" is-invalid"}}if(focused){cls+=" focused"}return cls},/** @private */_computeUnderlineClass:function _computeUnderlineClass(focused,invalid){var cls="underline";if(invalid){cls+=" is-invalid"}else if(focused){cls+=" is-highlighted"}return cls},/** @private */_computeAddOnContentClass:function _computeAddOnContentClass(focused,invalid){var cls="add-on-content";if(invalid){cls+=" is-invalid"}else if(focused){cls+=" is-highlighted"}return cls}});Polymer({/** @override */_template:html(_templateObject19_6bf96330d65d11eaa5e0898854dcb572()),is:"paper-input-error",behaviors:[PaperInputAddonBehavior],properties:{/**
     * True if the error is showing.
     */invalid:{readOnly:!0,reflectToAttribute:!0,type:Boolean}},/**
   * This overrides the update function in PaperInputAddonBehavior.
   * @param {{
   *   inputElement: (Element|undefined),
   *   value: (string|undefined),
   *   invalid: boolean
   * }} state -
   *     inputElement: The input element.
   *     value: The input value.
   *     invalid: True if the input value is invalid.
   */update:function update(state){this._setInvalid(state.invalid)}});Polymer({is:"paper-input",/** @override */_template:html(_templateObject20_6bf96330d65d11eaa5e0898854dcb572()),behaviors:[PaperInputBehavior,IronFormElementBehavior],properties:{value:{// Required for the correct TypeScript type-generation
type:String},inputRole:{type:String,value:void 0},inputAriaHaspopup:{type:String,value:void 0}},/**
   * Returns a reference to the focusable element. Overridden from
   * PaperInputBehavior to correctly focus the native input.
   *
   * @return {!HTMLElement}
   */get _focusableElement(){return this.inputElement._inputElement},// Note: This event is only available in the 1.0 version of this element.
// In 2.0, the functionality of `_onIronInputReady` is done in
// PaperInputBehavior::attached.
listeners:{"iron-input-ready":"_onIronInputReady"},_onIronInputReady:function _onIronInputReady(){// Even though this is only used in the next line, save this for
// backwards compatibility, since the native input had this ID until 2.0.5.
if(!this.$.nativeInput){this.$.nativeInput=/** @type {!Element} */this.$$("input")}if(this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.$.nativeInput.type)){this.alwaysFloatLabel=!0}// Only validate when attached if the input already has a value.
if(!!this.inputElement.bindValue){this.$.container._handleValueAndAutoValidate(this.inputElement)}}});var template$9=html(_templateObject21_6bf96330d65d11eaa5e0898854dcb572());template$9.setAttribute("strip-whitespace","");/**
                                                 Material design: [Radio button](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-radio-button)
                                                                                               `paper-radio-button` is a button that can be either checked or unchecked. The
                                                 user can tap the radio button to check or uncheck it.
                                                                                               Use a `<paper-radio-group>` to group a set of radio buttons. When radio buttons
                                                 are inside a radio group, exactly one radio button in the group can be checked
                                                 at any time.
                                                                                               Example:
                                                                                                   <paper-radio-button></paper-radio-button>
                                                   <paper-radio-button>Item label</paper-radio-button>
                                                                                               ### Styling
                                                                                               The following custom properties and mixins are available for styling:
                                                                                               Custom property | Description | Default
                                                 ----------------|-------------|----------
                                                 `--paper-radio-button-unchecked-background-color` | Radio button background color when the input is not checked | `transparent`
                                                 `--paper-radio-button-unchecked-color` | Radio button color when the input is not checked | `--primary-text-color`
                                                 `--paper-radio-button-unchecked-ink-color` | Selected/focus ripple color when the input is not checked | `--primary-text-color`
                                                 `--paper-radio-button-checked-color` | Radio button color when the input is checked | `--primary-color`
                                                 `--paper-radio-button-checked-ink-color` | Selected/focus ripple color when the input is checked | `--primary-color`
                                                 `--paper-radio-button-size` | Size of the radio button | `16px`
                                                 `--paper-radio-button-ink-size` | Size of the ripple | `48px`
                                                 `--paper-radio-button-label-color` | Label color | `--primary-text-color`
                                                 `--paper-radio-button-label-spacing` | Spacing between the label and the button | `10px`
                                                 `--paper-radio-button-radio-container` | A mixin applied to the internal radio container | `{}`
                                                 `--paper-radio-button-label` | A mixin applied to the internal label | `{}`
                                                 `--paper-radio-button-label-checked` | A mixin applied to the internal label when the radio button is checked | `{}`
                                                                                               This element applies the mixin `--paper-font-common-base` but does not import
                                                 `paper-styles/typography.html`. In order to apply the `Roboto` font to this
                                                 element, make sure you've imported `paper-styles/typography.html`.
                                                                                               @group Paper Elements
                                                 @element paper-radio-button
                                                 @demo demo/index.html
                                                 */Polymer({_template:template$9,is:"paper-radio-button",behaviors:[PaperCheckedElementBehavior],hostAttributes:{role:"radio","aria-checked":!1,tabindex:0},properties:{/**
     * Fired when the checked state changes due to user interaction.
     *
     * @event change
     */ /**
         * Fired when the checked state changes.
         *
         * @event iron-change
         */ariaActiveAttribute:{type:String,value:"aria-checked"}},ready:function ready(){this._rippleContainer=this.$.radioContainer},attached:function attached(){// Wait until styles have resolved to check for the default sentinel.
// See polymer#4009 for more details.
afterNextRender(this,function(){var inkSize=this.getComputedStyleValue("--calculated-paper-radio-button-ink-size").trim();// If unset, compute and set the default `--paper-radio-button-ink-size`.
if("-1px"===inkSize){var size=parseFloat(this.getComputedStyleValue("--calculated-paper-radio-button-size").trim()),defaultInkSize=Math.floor(3*size);// The button and ripple need to have the same parity so that their
// centers align.
if(defaultInkSize%2!==size%2){defaultInkSize++}this.updateStyles({"--paper-radio-button-ink-size":defaultInkSize+"px"})}})}});Polymer({_template:html(_templateObject22_6bf96330d65d11eaa5e0898854dcb572()),is:"paper-radio-group",behaviors:[IronMenubarBehavior],/** @private */hostAttributes:{role:"radiogroup"},properties:{/**
     * Fired when the radio group selection changes.
     *
     * @event paper-radio-group-changed
     */ /**
         * Overriden from Polymer.IronSelectableBehavior
         */attrForSelected:{type:String,value:"name"},/**
     * Overriden from Polymer.IronSelectableBehavior
     */selectedAttribute:{type:String,value:"checked"},/**
     * Overriden from Polymer.IronSelectableBehavior
     */selectable:{type:String,value:"paper-radio-button"},/**
     * If true, radio-buttons can be deselected
     */allowEmptySelection:{type:Boolean,value:!1}},/**
   * Selects the given value.
   */select:function select(value){var newItem=this._valueToItem(value);if(newItem&&newItem.hasAttribute("disabled")){return}if(this.selected){var oldItem=this._valueToItem(this.selected);if(this.selected==value){// If deselecting is allowed we'll have to apply an empty selection.
// Otherwise, we should force the selection to stay and make this
// action a no-op.
if(this.allowEmptySelection){value=""}else{if(oldItem)oldItem.checked=!0;return}}if(oldItem)oldItem.checked=!1}IronSelectableBehavior.select.apply(this,[value]);this.fire("paper-radio-group-changed")},_activateFocusedItem:function _activateFocusedItem(){this._itemActivate(this._valueForItem(this.focusedItem),this.focusedItem)},_onUpKey:function _onUpKey(event){this._focusPrevious();event.preventDefault();this._activateFocusedItem()},_onDownKey:function _onDownKey(event){this._focusNext();event.preventDefault();this._activateFocusedItem()},_onLeftKey:function _onLeftKey(event){IronMenubarBehaviorImpl._onLeftKey.apply(this,arguments);this._activateFocusedItem()},_onRightKey:function _onRightKey(event){IronMenubarBehaviorImpl._onRightKey.apply(this,arguments);this._activateFocusedItem()}});var PaperSpinnerBehavior={properties:{/**
     * Displays the spinner.
     */active:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"__activeChanged"},/**
     * Alternative text content for accessibility support.
     * If alt is present, it will add an aria-label whose content matches alt
     * when active. If alt is not present, it will default to 'loading' as the
     * alt value.
     */alt:{type:String,value:"loading",observer:"__altChanged"},__coolingDown:{type:Boolean,value:!1}},__computeContainerClasses:function __computeContainerClasses(active,coolingDown){return[active||coolingDown?"active":"",coolingDown?"cooldown":""].join(" ")},__activeChanged:function __activeChanged(active,old){this.__setAriaHidden(!active);this.__coolingDown=!active&&old},__altChanged:function __altChanged(alt){// user-provided `aria-label` takes precedence over prototype default
if("loading"===alt){this.alt=this.getAttribute("aria-label")||alt}else{this.__setAriaHidden(""===alt);this.setAttribute("aria-label",alt)}},__setAriaHidden:function __setAriaHidden(hidden){var attr="aria-hidden";if(hidden){this.setAttribute(attr,"true")}else{this.removeAttribute(attr)}},__reset:function __reset(){this.active=!1;this.__coolingDown=!1}};_exports.PaperSpinnerBehavior=PaperSpinnerBehavior;var paperSpinnerBehavior={PaperSpinnerBehavior:PaperSpinnerBehavior};/**
   @license
   Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
   This code may only be used under the BSD style license found at
   http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
   http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
   found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
   part of the polymer project is also subject to an additional IP rights grant
   found at http://polymer.github.io/PATENTS.txt
   */_exports.$paperSpinnerBehavior=paperSpinnerBehavior;var $_documentContainer=document.createElement("template");$_documentContainer.setAttribute("style","display: none;");$_documentContainer.innerHTML="<dom-module id=\"paper-spinner-styles\">\n  <template>\n    <style>\n      /*\n      /**************************/\n      /* STYLES FOR THE SPINNER */\n      /**************************/\n\n      /*\n       * Constants:\n       *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)\n       *      ARCTIME     = 1333ms (time it takes to expand and contract arc)\n       *      ARCSTARTROT = 216 degrees (how much the start location of the arc\n       *                                should rotate each time, 216 gives us a\n       *                                5 pointed star shape (it's 360/5 * 3).\n       *                                For a 7 pointed star, we might do\n       *                                360/7 * 3 = 154.286)\n       *      SHRINK_TIME = 400ms\n       */\n\n      :host {\n        display: inline-block;\n        position: relative;\n        width: 28px;\n        height: 28px;\n\n        /* 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */\n        --paper-spinner-container-rotation-duration: 1568ms;\n\n        /* ARCTIME */\n        --paper-spinner-expand-contract-duration: 1333ms;\n\n        /* 4 * ARCTIME */\n        --paper-spinner-full-cycle-duration: 5332ms;\n\n        /* SHRINK_TIME */\n        --paper-spinner-cooldown-duration: 400ms;\n      }\n\n      #spinnerContainer {\n        width: 100%;\n        height: 100%;\n\n        /* The spinner does not have any contents that would have to be\n         * flipped if the direction changes. Always use ltr so that the\n         * style works out correctly in both cases. */\n        direction: ltr;\n      }\n\n      #spinnerContainer.active {\n        -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;\n        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite;\n      }\n\n      @-webkit-keyframes container-rotate {\n        to { -webkit-transform: rotate(360deg) }\n      }\n\n      @keyframes container-rotate {\n        to { transform: rotate(360deg) }\n      }\n\n      .spinner-layer {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        white-space: nowrap;\n        color: var(--paper-spinner-color, var(--google-blue-500));\n      }\n\n      .layer-1 {\n        color: var(--paper-spinner-layer-1-color, var(--google-blue-500));\n      }\n\n      .layer-2 {\n        color: var(--paper-spinner-layer-2-color, var(--google-red-500));\n      }\n\n      .layer-3 {\n        color: var(--paper-spinner-layer-3-color, var(--google-yellow-500));\n      }\n\n      .layer-4 {\n        color: var(--paper-spinner-layer-4-color, var(--google-green-500));\n      }\n\n      /**\n       * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):\n       *\n       * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't\n       * guarantee that the animation will start _exactly_ after that value. So we avoid using\n       * animation-delay and instead set custom keyframes for each color (as layer-2undant as it\n       * seems).\n       */\n      .active .spinner-layer {\n        -webkit-animation-name: fill-unfill-rotate;\n        -webkit-animation-duration: var(--paper-spinner-full-cycle-duration);\n        -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        -webkit-animation-iteration-count: infinite;\n        animation-name: fill-unfill-rotate;\n        animation-duration: var(--paper-spinner-full-cycle-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n        opacity: 1;\n      }\n\n      .active .spinner-layer.layer-1 {\n        -webkit-animation-name: fill-unfill-rotate, layer-1-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-1-fade-in-out;\n      }\n\n      .active .spinner-layer.layer-2 {\n        -webkit-animation-name: fill-unfill-rotate, layer-2-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-2-fade-in-out;\n      }\n\n      .active .spinner-layer.layer-3 {\n        -webkit-animation-name: fill-unfill-rotate, layer-3-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-3-fade-in-out;\n      }\n\n      .active .spinner-layer.layer-4 {\n        -webkit-animation-name: fill-unfill-rotate, layer-4-fade-in-out;\n        animation-name: fill-unfill-rotate, layer-4-fade-in-out;\n      }\n\n      @-webkit-keyframes fill-unfill-rotate {\n        12.5% { -webkit-transform: rotate(135deg) } /* 0.5 * ARCSIZE */\n        25%   { -webkit-transform: rotate(270deg) } /* 1   * ARCSIZE */\n        37.5% { -webkit-transform: rotate(405deg) } /* 1.5 * ARCSIZE */\n        50%   { -webkit-transform: rotate(540deg) } /* 2   * ARCSIZE */\n        62.5% { -webkit-transform: rotate(675deg) } /* 2.5 * ARCSIZE */\n        75%   { -webkit-transform: rotate(810deg) } /* 3   * ARCSIZE */\n        87.5% { -webkit-transform: rotate(945deg) } /* 3.5 * ARCSIZE */\n        to    { -webkit-transform: rotate(1080deg) } /* 4   * ARCSIZE */\n      }\n\n      @keyframes fill-unfill-rotate {\n        12.5% { transform: rotate(135deg) } /* 0.5 * ARCSIZE */\n        25%   { transform: rotate(270deg) } /* 1   * ARCSIZE */\n        37.5% { transform: rotate(405deg) } /* 1.5 * ARCSIZE */\n        50%   { transform: rotate(540deg) } /* 2   * ARCSIZE */\n        62.5% { transform: rotate(675deg) } /* 2.5 * ARCSIZE */\n        75%   { transform: rotate(810deg) } /* 3   * ARCSIZE */\n        87.5% { transform: rotate(945deg) } /* 3.5 * ARCSIZE */\n        to    { transform: rotate(1080deg) } /* 4   * ARCSIZE */\n      }\n\n      @-webkit-keyframes layer-1-fade-in-out {\n        0% { opacity: 1 }\n        25% { opacity: 1 }\n        26% { opacity: 0 }\n        89% { opacity: 0 }\n        90% { opacity: 1 }\n        to { opacity: 1 }\n      }\n\n      @keyframes layer-1-fade-in-out {\n        0% { opacity: 1 }\n        25% { opacity: 1 }\n        26% { opacity: 0 }\n        89% { opacity: 0 }\n        90% { opacity: 1 }\n        to { opacity: 1 }\n      }\n\n      @-webkit-keyframes layer-2-fade-in-out {\n        0% { opacity: 0 }\n        15% { opacity: 0 }\n        25% { opacity: 1 }\n        50% { opacity: 1 }\n        51% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @keyframes layer-2-fade-in-out {\n        0% { opacity: 0 }\n        15% { opacity: 0 }\n        25% { opacity: 1 }\n        50% { opacity: 1 }\n        51% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @-webkit-keyframes layer-3-fade-in-out {\n        0% { opacity: 0 }\n        40% { opacity: 0 }\n        50% { opacity: 1 }\n        75% { opacity: 1 }\n        76% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @keyframes layer-3-fade-in-out {\n        0% { opacity: 0 }\n        40% { opacity: 0 }\n        50% { opacity: 1 }\n        75% { opacity: 1 }\n        76% { opacity: 0 }\n        to { opacity: 0 }\n      }\n\n      @-webkit-keyframes layer-4-fade-in-out {\n        0% { opacity: 0 }\n        65% { opacity: 0 }\n        75% { opacity: 1 }\n        90% { opacity: 1 }\n        to { opacity: 0 }\n      }\n\n      @keyframes layer-4-fade-in-out {\n        0% { opacity: 0 }\n        65% { opacity: 0 }\n        75% { opacity: 1 }\n        90% { opacity: 1 }\n        to { opacity: 0 }\n      }\n\n      .circle-clipper {\n        display: inline-block;\n        position: relative;\n        width: 50%;\n        height: 100%;\n        overflow: hidden;\n      }\n\n      /**\n       * Patch the gap that appear between the two adjacent div.circle-clipper while the\n       * spinner is rotating (appears on Chrome 50, Safari 9.1.1, and Edge).\n       */\n      .spinner-layer::after {\n        content: '';\n        left: 45%;\n        width: 10%;\n        border-top-style: solid;\n      }\n\n      .spinner-layer::after,\n      .circle-clipper .circle {\n        box-sizing: border-box;\n        position: absolute;\n        top: 0;\n        border-width: var(--paper-spinner-stroke-width, 3px);\n        border-radius: 50%;\n      }\n\n      .circle-clipper .circle {\n        bottom: 0;\n        width: 200%;\n        border-style: solid;\n        border-bottom-color: transparent !important;\n      }\n\n      .circle-clipper.left .circle {\n        left: 0;\n        border-right-color: transparent !important;\n        -webkit-transform: rotate(129deg);\n        transform: rotate(129deg);\n      }\n\n      .circle-clipper.right .circle {\n        left: -100%;\n        border-left-color: transparent !important;\n        -webkit-transform: rotate(-129deg);\n        transform: rotate(-129deg);\n      }\n\n      .active .gap-patch::after,\n      .active .circle-clipper .circle {\n        -webkit-animation-duration: var(--paper-spinner-expand-contract-duration);\n        -webkit-animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        -webkit-animation-iteration-count: infinite;\n        animation-duration: var(--paper-spinner-expand-contract-duration);\n        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation-iteration-count: infinite;\n      }\n\n      .active .circle-clipper.left .circle {\n        -webkit-animation-name: left-spin;\n        animation-name: left-spin;\n      }\n\n      .active .circle-clipper.right .circle {\n        -webkit-animation-name: right-spin;\n        animation-name: right-spin;\n      }\n\n      @-webkit-keyframes left-spin {\n        0% { -webkit-transform: rotate(130deg) }\n        50% { -webkit-transform: rotate(-5deg) }\n        to { -webkit-transform: rotate(130deg) }\n      }\n\n      @keyframes left-spin {\n        0% { transform: rotate(130deg) }\n        50% { transform: rotate(-5deg) }\n        to { transform: rotate(130deg) }\n      }\n\n      @-webkit-keyframes right-spin {\n        0% { -webkit-transform: rotate(-130deg) }\n        50% { -webkit-transform: rotate(5deg) }\n        to { -webkit-transform: rotate(-130deg) }\n      }\n\n      @keyframes right-spin {\n        0% { transform: rotate(-130deg) }\n        50% { transform: rotate(5deg) }\n        to { transform: rotate(-130deg) }\n      }\n\n      #spinnerContainer.cooldown {\n        -webkit-animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);\n        animation: container-rotate var(--paper-spinner-container-rotation-duration) linear infinite, fade-out var(--paper-spinner-cooldown-duration) cubic-bezier(0.4, 0.0, 0.2, 1);\n      }\n\n      @-webkit-keyframes fade-out {\n        0% { opacity: 1 }\n        to { opacity: 0 }\n      }\n\n      @keyframes fade-out {\n        0% { opacity: 1 }\n        to { opacity: 0 }\n      }\n    </style>\n  </template>\n</dom-module>";document.head.appendChild($_documentContainer.content);var template$a=html(_templateObject23_6bf96330d65d11eaa5e0898854dcb572());template$a.setAttribute("strip-whitespace","");/**
                                                 Material design: [Progress &
                                                 activity](https://www.google.com/design/spec/components/progress-activity.html)
                                                                                               Element providing a multiple color material design circular spinner.
                                                                                                   <paper-spinner active></paper-spinner>
                                                                                               The default spinner cycles between four layers of colors; by default they are
                                                 blue, red, yellow and green. It can be customized to cycle between four
                                                 different colors. Use <paper-spinner-lite> for single color spinners.
                                                                                               ### Accessibility
                                                                                               Alt attribute should be set to provide adequate context for accessibility. If
                                                 not provided, it defaults to 'loading'. Empty alt can be provided to mark the
                                                 element as decorative if alternative content is provided in another form (e.g. a
                                                 text block following the spinner).
                                                                                                   <paper-spinner alt="Loading contacts list" active></paper-spinner>
                                                                                               ### Styling
                                                                                               The following custom properties and mixins are available for styling:
                                                                                               Custom property | Description | Default
                                                 ----------------|-------------|----------
                                                 `--paper-spinner-layer-1-color` | Color of the first spinner rotation | `--google-blue-500`
                                                 `--paper-spinner-layer-2-color` | Color of the second spinner rotation | `--google-red-500`
                                                 `--paper-spinner-layer-3-color` | Color of the third spinner rotation | `--google-yellow-500`
                                                 `--paper-spinner-layer-4-color` | Color of the fourth spinner rotation | `--google-green-500`
                                                 `--paper-spinner-stroke-width` | The width of the spinner stroke | 3px
                                                                                               @group Paper Elements
                                                 @element paper-spinner
                                                 @hero hero.svg
                                                 @demo demo/index.html
                                                 */Polymer({_template:template$a,is:"paper-spinner",behaviors:[PaperSpinnerBehavior]});var WiseShoppingCartItem=/*#__PURE__*/function(_PolymerElement2){babelHelpers.inherits(WiseShoppingCartItem,_PolymerElement2);function WiseShoppingCartItem(){babelHelpers.classCallCheck(this,WiseShoppingCartItem);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(WiseShoppingCartItem).apply(this,arguments))}babelHelpers.createClass(WiseShoppingCartItem,[{key:"_translateProductName",value:function _translateProductName(product){var _this34=this,label="",translationList=product.productNameTextTranslationBucket.translationList;if(product.productNameTextTranslationBucket){translationList.forEach(function(item){if(item.language===_this34.language){label=item.content}})}else{label=product.label}return label}},{key:"_calculateTotalPrice",value:function _calculateTotalPrice(quantity,productPrice,additionList){var additionPrice=0;additionList.forEach(function(item){additionPrice+=item.price*item.quantity});return quantity*(productPrice+additionPrice)}},{key:"_decreaseItemQuantity",value:function _decreaseItemQuantity(){this.dispatchEvent(new CustomEvent("decrease-item-quantity",{detail:this.cartItem.uuid,bubbles:!0,composed:!0}))}},{key:"_openProductPageByUuid",value:function _openProductPageByUuid(){this.dispatchEvent(new CustomEvent("open-product",{detail:this.cartItem.uuid,bubbles:!0,composed:!0}))}},{key:"_increaseItemQuantity",value:function _increaseItemQuantity(){this.dispatchEvent(new CustomEvent("increase-item-quantity",{detail:this.cartItem.uuid,bubbles:!0,composed:!0}))}},{key:"_removeItem",value:function _removeItem(){this.dispatchEvent(new CustomEvent("remove-item",{detail:this.cartItem.uuid,bubbles:!0,composed:!0}))}},{key:"isLastItem",value:function isLastItem(additionList,index){return index+1===additionList.length}},{key:"hasMoreThanOneQuantity",value:function hasMoreThanOneQuantity(item){return 1<item.quantity}},{key:"_quantityChange",value:function _quantityChange(){var quantity=this.$.quantityItem.value;if(quantity){var detail={itemUuid:this.cartItem.uuid,quantity:quantity};this.dispatchEvent(new CustomEvent("update-quantity",{detail:detail,bubbles:!0,composed:!0}))}}}],[{key:"template",get:function get(){return html(_templateObject24_6bf96330d65d11eaa5e0898854dcb572())}},{key:"properties",get:function get(){return{cartItem:Object,language:String,startShoppingLabel:{type:String},basketEmptyLabel:{type:String},currencyLabel:{type:String}}}}]);return WiseShoppingCartItem}(PolymerElement);_exports.WiseShoppingCartItem=WiseShoppingCartItem;window.customElements.define("wise-shopping-cart-item",WiseShoppingCartItem);var wiseShoppingCartItem={WiseShoppingCartItem:WiseShoppingCartItem};_exports.$wiseShoppingCartItem=wiseShoppingCartItem;var WiseShoppingCart=/*#__PURE__*/function(_PolymerElement3){babelHelpers.inherits(WiseShoppingCart,_PolymerElement3);function WiseShoppingCart(){babelHelpers.classCallCheck(this,WiseShoppingCart);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(WiseShoppingCart).apply(this,arguments))}babelHelpers.createClass(WiseShoppingCart,[{key:"_startBuyingProducts",value:function _startBuyingProducts(){this.dispatchEvent(new CustomEvent("start-shopping",{bubbles:!0,composed:!0}))}},{key:"_isInShoppingCartAnyItems",value:function _isInShoppingCartAnyItems(cartItemsLength){return 0<cartItemsLength}}],[{key:"template",get:function get(){return html(_templateObject25_6bf96330d65d11eaa5e0898854dcb572())}},{key:"properties",get:function get(){return{cartItems:Array,startShoppingLabel:{type:String,value:"START SHOPPING"},basketEmptyLabel:{type:String,value:"Your basket is empty"},currencyLabel:{type:String,value:"USD"}}}}]);return WiseShoppingCart}(PolymerElement);_exports.WiseShoppingCart=WiseShoppingCart;window.customElements.define("wise-shopping-cart",WiseShoppingCart);var wiseShoppingCart={WiseShoppingCart:WiseShoppingCart};_exports.$wiseShoppingCart=wiseShoppingCart;var WiseShoppingCartContainer=/*#__PURE__*/function(_PolymerElement4){babelHelpers.inherits(WiseShoppingCartContainer,_PolymerElement4);function WiseShoppingCartContainer(){babelHelpers.classCallCheck(this,WiseShoppingCartContainer);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(WiseShoppingCartContainer).apply(this,arguments))}babelHelpers.createClass(WiseShoppingCartContainer,[{key:"changeClientName",value:function changeClientName(labelForCustomerName){if(labelForCustomerName){return labelForCustomerName}return this.customerNameLabel}},{key:"_computeLabel",value:function _computeLabel(creditCardInfo){var _this35=this;if(creditCardInfo.clientPaysProcessingCommission){return"".concat(paymentInfo.label," (+").concat(100*paymentInfo.paymentComission," %)")}var label="";if(creditCardInfo.translationBucket){console.log("postInfo.translationBucket ",creditCardInfo.translationBucket);creditCardInfo.translationBucket.translationList.forEach(function(item){if(item.language===_this35.language){console.log(_this35.language);label=item.content}})}else{label=creditCardInfo.label}return label}},{key:"_computeCourierLabel",value:function _computeCourierLabel(courierInfo){var label="";if(this.total<courierInfo.minimumPaymentForFreeDelivery){label=" ( + ".concat(courierInfo.deliveryPrice," ").concat(this.currencyLabel,")")}return label}},{key:"_translateCashLabe",value:function _translateCashLabe(cashInfo){var _this36=this,label="";if(cashInfo.translationBucket){console.log("postInfo.translationBucket ",cashInfo.translationBucket);cashInfo.translationBucket.translationList.forEach(function(item){if(item.language===_this36.language){console.log(_this36.language);label=item.content}})}else{label=cashInfo.label}return label}},{key:"_translatePostDepartmentLabel",value:function _translatePostDepartmentLabel(postInfo){var _this37=this,label="";if(postInfo.translationBucket){console.log("postInfo.translationBucket ",postInfo.translationBucket);postInfo.translationBucket.translationList.forEach(function(item){if(item.language===_this37.language){console.log(_this37.language);label=item.content}})}else{label=postInfo.label}return label}},{key:"_translateSelfTakeLabel",value:function _translateSelfTakeLabel(selfTakeInfo){var _this38=this,label="";console.log("selfTakeInfo.translationBucket ",selfTakeInfo.translationBucket);if(selfTakeInfo.translationBucket){selfTakeInfo.translationBucket.translationList.forEach(function(item){if(item.language===_this38.language){console.log(_this38.language);label=item.content}})}else{label=selfTakeInfo.label}return label}},{key:"_translateCourierLabel",value:function _translateCourierLabel(courierInfo){var _this39=this,label="";if(courierInfo.translationBucket){console.log("courierInfo.translationBucket ",courierInfo.translationBucket);courierInfo.translationBucket.translationList.forEach(function(item){if(item.language===_this39.language){label=item.content}})}else{label=courierInfo.label}return label}},{key:"addCartIdParamIfAvailable",value:function addCartIdParamIfAvailable(isFirst){var param="";if(!this.cartId){return param}if(isFirst){param+="?"}else{param+="&"}if(this.cartId){param+="cartId=".concat(this.cartId)}return param}},{key:"ready",value:function ready(){var _this40=this;babelHelpers.get(babelHelpers.getPrototypeOf(WiseShoppingCartContainer.prototype),"ready",this).call(this);var params=this.addCartIdParamIfAvailable(!0),url=this._generateRequestUrl("/api/cart",params);this._generateRequest("GET",url);this.addEventListener("update-quantity",function(event){console.log("/api/cart/update-quantity =>",event.detail);var params="?uuid=".concat(event.detail.itemUuid,"&quantity=").concat(event.detail.quantity).concat(_this40.addCartIdParamIfAvailable(!1));_this40._generateRequest("POST",_this40._generateRequestUrl("/api/cart/update-quantity",params))});this.addEventListener("increase-item-quantity",function(event){var params="?uuid=".concat(event.detail).concat(_this40.addCartIdParamIfAvailable(!1));_this40._generateRequest("POST",_this40._generateRequestUrl("/api/cart/increase-quantity",params))});this.addEventListener("decrease-item-quantity",function(event){var params="?uuid=".concat(event.detail).concat(_this40.addCartIdParamIfAvailable(!1));_this40._generateRequest("DELETE",_this40._generateRequestUrl("/api/cart/decrease-quantity",params))});this.addEventListener("remove-item",function(event){var params="?uuid=".concat(event.detail).concat(_this40.addCartIdParamIfAvailable(!1));_this40._generateRequest("DELETE",_this40._generateRequestUrl("/api/cart",params))});this.addEventListener("start-shopping",function(e){console.log("start-shopping",e);window.location="/${language}/shop"});this.addEventListener("order-created",function(e){console.log("order-created for credit card payment",e);if(e.detail&&e.detail.value&&e.detail.value.button){var container=document.createElement("div");container.innerHTML=e.detail.value.button;var form=container.querySelector("form");document.querySelector(".form-container").append(form);form.submit()}else{window.location="/done"}})}},{key:"areThereItems",value:function areThereItems(items){return 0!==items.length}},{key:"_generateRequest",value:function _generateRequest(method,url){var ajax=this.$.ajax;ajax.method=method;ajax.url=url;ajax.generateRequest()}},{key:"_generateRequestUrl",value:function _generateRequestUrl(urlPath,params){var url=this.hostname+urlPath;if(params){url=url+params}return url}},{key:"_proceed",value:function(){var _proceed2=babelHelpers.asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(){var deliveryType,paymentType,requiredInputs,validInputs,message,isValid,isCourierDeliverySelected,address,isAddressSetFromMapView,cart,_cart,isAddressInsideDeliveryBoundaries;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:deliveryType=this.$.deliveryType;paymentType=this.$.paymentType;requiredInputs=Array.from(this.shadowRoot.querySelectorAll("paper-input[required]")).filter(function(input){return 0<input.offsetWidth&&0<input.offsetHeight});validInputs=0;if(deliveryType.selected){_context.next=7;break}this.set("errorMessage",this.errorMessagePleaseChooseDeliveryLabel);return _context.abrupt("return");case 7:if(paymentType.selected){_context.next=10;break}this.set("errorMessage",this.errorMessagePleaseChoosePaymentLabel);return _context.abrupt("return");case 10:if(!(this.total<this.cart.configuration.payment.minimumPaymentForOrder)){_context.next=14;break}message="".concat(this.errorMessagePleaseMinimumDeliveryLabel," ").concat(this.cart.configuration.payment.minimumPaymentForOrder," ").concat(this.currencyLabel);this.set("errorMessage",message);return _context.abrupt("return");case 14:this.set("errorMessage","");isValid=!0;requiredInputs.forEach(function(input){if(!input.validate()){input.focus();isValid=!1}});isCourierDeliverySelected="COURIER"===this.cart.deliveryType;if(isValid&&!isCourierDeliverySelected){this._makeOrderRequest()}if(!isCourierDeliverySelected){_context.next=29;break}address=this.cart.client.address;isAddressSetFromMapView=address.isAddressSetFromMapView;cart=this.cart;if(isAddressSetFromMapView){_context.next=27;break}_context.next=26;return this._geocode("".concat(address.street," ").concat(address.building));case 26:_cart=_context.sent;case 27:isAddressInsideDeliveryBoundaries=cart.client.address.isAddressInsideDeliveryBoundaries;if(isValid&&(isAddressSetFromMapView||isAddressInsideDeliveryBoundaries)){this._makeOrderRequest()}else if(!isValid){this.errorMessage="".concat(this.errorMessageFillInfo)}else{this.errorMessage="".concat(this.mapErrorMessage," <a href=\"").concat(this.hostname,"/").concat(this.language,"/selectaddress\">").concat(this.mapLabel,"</a>.")}case 29:case"end":return _context.stop();}}},_callee,this)}));function _proceed(){return _proceed2.apply(this,arguments)}return _proceed}()},{key:"_makeOrderRequest",value:function _makeOrderRequest(){if(this.isMakeOrderRequestRunning)return;var ajax=this.$.makeOrderAjax;ajax.url="".concat(this.hostname,"/order").concat(this.addCartIdParamIfAvailable(!0));ajax.method="POST";this.isMakeOrderRequestRunning=!0;ajax.generateRequest()}},{key:"_onOrderResponseChanged",value:function _onOrderResponseChanged(event,detail){console.log("order response",event,detail);this.isMakeOrderRequestRunning=!1;this.cart={items:[]};var status=this.$.makeOrderAjax.lastRequest.xhr.status,isSuccessful=200<=status&&300>=status;if(isSuccessful){this.dispatchEvent(new CustomEvent("order-created",{bubbles:!0,composed:!0,detail:detail}))}else{this.dispatchEvent(new CustomEvent("order-processing-error",{bubbles:!0,composed:!0}))}}},{key:"_onLastResponseChanged",value:function _onLastResponseChanged(event,response){var cartData=response.value;console.log(cartData);this.dispatchEvent(new CustomEvent("shopping-cart-api-response",{detail:cartData,bubbles:!0,composed:!0}));this.set("cart",cartData?cartData:{items:[]})}},{key:"_calculateTotal",value:function _calculateTotal(cart){if(!this.cart.configuration)return;var total=0,additionPrice,items=cart.items;items.forEach(function(item){additionPrice=0;item.additionList.forEach(function(addition){additionPrice+=addition.price*addition.quantity});total+=item.quantity*(item.price+additionPrice)});if("COURIER"===this.cart.deliveryType){var freeDelivery=this.cart.configuration.delivery.courier.minimumPaymentForFreeDelivery,isTotalLessOrEqualThenFreeDeliveryOrder=total<=freeDelivery;this.deliveryPrice=isTotalLessOrEqualThenFreeDeliveryOrder?cart.configuration.delivery.courier.deliveryPrice:0;if(isTotalLessOrEqualThenFreeDeliveryOrder){total+=this.cart.configuration.delivery.courier.deliveryPrice}}else{this.deliveryPrice=0}var isClientPaysProcessingCommission="CREDITCARD"===this.cart.paymentType&&this.cart.configuration.payment.creditCard.clientPaysProcessingCommission;if(isClientPaysProcessingCommission){total+=total*this.cart.configuration.payment.creditCard.paymentComission}return this.roundToTwo(total)}},{key:"roundToTwo",value:function roundToTwo(num){return+(Math.round(num+"e+2")+"e-2")}},{key:"_computeProductsTotal",value:function _computeProductsTotal(items){var total=0;items.forEach(function(item){return total+=item.quantity*item.price});total+=this._computeAdditionsTotal(items);return total}},{key:"_computeAdditionsTotal",value:function _computeAdditionsTotal(items){var additionsTotal=0;items.forEach(function(item){item.additionList.forEach(function(addition){additionsTotal+=addition.price*addition.quantity})});return additionsTotal}},{key:"_calculatePaymentOnlineCommission",value:function _calculatePaymentOnlineCommission(total,paymentType,paymentConfig){if(!this.cart.configuration)return;var isCreditCardSelected="CREDITCARD"===paymentType,commissionAmount=0;if(paymentConfig.clientPaysProcessingCommission&&isCreditCardSelected){commissionAmount=total*paymentConfig.paymentComission}return this.roundToTwo(commissionAmount)}},{key:"_validateAndGeocodeAddress",value:function _validateAndGeocodeAddress(event){this._validateAndSendClientAddressInfo(event);var address=this.cart.client.address;if(address.street&&address.building){this._geocode()}}},{key:"_geocode",value:function(){var _geocode2=babelHelpers.asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2(){var response,results,firstResult,_location;return regeneratorRuntime.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return this._sendGeocodeRequest();case 2:response=_context2.sent;_context2.prev=3;results=response.results;firstResult=results[0];_location=firstResult.geometry.location;_context2.next=9;return this.updateCartWithAddressLocation(_location);case 9:this.cart=_context2.sent;return _context2.abrupt("return",this.cart);case 13:_context2.prev=13;_context2.t0=_context2["catch"](3);this.errorMessage="".concat(this.mapErrorMessage," <a href=\"").concat(this.hostname,"/").concat(this.language,"/selectaddress\">").concat(this.mapLabel,"</a>.");case 16:case"end":return _context2.stop();}}},_callee2,this,[[3,13]])}));function _geocode(){return _geocode2.apply(this,arguments)}return _geocode}()},{key:"getGeocodeData",value:function(){var _getGeocodeData=babelHelpers.asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee3(address){var url,response;return regeneratorRuntime.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:url="https://maps.googleapis.com/maps/api/geocode/json?key=".concat(this.googleMapsApiKey,"&address=").concat(address);_context3.next=3;return fetch(url);case 3:response=_context3.sent;_context3.next=6;return response.json();case 6:return _context3.abrupt("return",_context3.sent);case 7:case"end":return _context3.stop();}}},_callee3,this)}));function getGeocodeData(_x){return _getGeocodeData.apply(this,arguments)}return getGeocodeData}()},{key:"updateCartWithAddressLocation",value:function(){var _updateCartWithAddressLocation=babelHelpers.asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee4(location){var params,url,response;return regeneratorRuntime.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:params="?lat=".concat(location.lat,"&lng=").concat(location.lng).concat(this.addCartIdParamIfAvailable(!1));url=this._generateRequestUrl("/api/cart/address/info",params);_context4.next=4;return fetch(url,{method:"PUT"});case 4:response=_context4.sent;_context4.next=7;return response.json();case 7:return _context4.abrupt("return",_context4.sent);case 8:case"end":return _context4.stop();}}},_callee4,this)}));function updateCartWithAddressLocation(_x2){return _updateCartWithAddressLocation.apply(this,arguments)}return updateCartWithAddressLocation}()},{key:"_sendGeocodeRequest",value:function(){var _sendGeocodeRequest2=babelHelpers.asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee5(){var cartAddress,address;return regeneratorRuntime.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:cartAddress=this.cart.client.address;address="".concat(cartAddress.street," ").concat(cartAddress.building);_context5.next=4;return this.getGeocodeData(address);case 4:return _context5.abrupt("return",_context5.sent);case 5:case"end":return _context5.stop();}}},_callee5,this)}));function _sendGeocodeRequest(){return _sendGeocodeRequest2.apply(this,arguments)}return _sendGeocodeRequest}()},{key:"_validateAndSendClientInfo",value:function _validateAndSendClientInfo(event){var targetElement=event.target;if(targetElement.value){var params="?".concat(targetElement.id,"=").concat(targetElement.value).concat(this.addCartIdParamIfAvailable(!1));this._generateRequest("PUT",this._generateRequestUrl("/api/cart/client/info",params))}}},{key:"_validateAndSendClientAddressInfo",value:function _validateAndSendClientAddressInfo(event){var targetElement=event.target;if(targetElement.validate()&&targetElement.value){var params="?".concat(targetElement.id,"=").concat(targetElement.value).concat(this.addCartIdParamIfAvailable(!1));this._generateRequest("PUT",this._generateRequestUrl("/api/cart/address/info",params))}}},{key:"_validateAndSendClientPostInfo",value:function _validateAndSendClientPostInfo(event){var targetElement=event.target;if(targetElement.validate()&&targetElement.value){var params="?".concat(targetElement.id,"=").concat(targetElement.value).concat(this.addCartIdParamIfAvailable(!1));this._generateRequest("PUT",this._generateRequestUrl("/api/cart/post/info",params))}}},{key:"_onDeliveryTypeChange",value:function _onDeliveryTypeChange(event,data){var params="?deliverytype=".concat(data.value).concat(this.addCartIdParamIfAvailable(!1));this._generateRequest("PUT",this._generateRequestUrl("/api/cart/delivery",params))}},{key:"_onPaymentTypeChange",value:function _onPaymentTypeChange(event,data){var params="?paymenttype=".concat(data.value).concat(this.addCartIdParamIfAvailable(!1));this._generateRequest("PUT",this._generateRequestUrl("/api/cart/payment",params))}},{key:"_isAddressCardVisible",value:function _isAddressCardVisible(deliveryType){var isCourier="COURIER"===deliveryType,isPostService="POSTSERVICE"===deliveryType;return isCourier||isPostService}},{key:"_isCourierDeliveryType",value:function _isCourierDeliveryType(deliveryType){return"COURIER"===deliveryType}}],[{key:"template",get:function get(){// language=HTML
return html(_templateObject26_6bf96330d65d11eaa5e0898854dcb572())}},{key:"properties",get:function get(){return{language:String,cart:{type:Object,value:{items:[]}},cartId:{type:String,value:""},hostname:{type:String,value:""},errorMessage:String,total:{type:Number,computed:"_calculateTotal(cart)"},errorMessagePleaseWriteLabel:String,errorMessagePleaseChooseDeliveryLabel:String,errorMessagePleaseChoosePaymentLabel:String,errorMessagePleaseMinimumDeliveryLabel:String,errorMessageFillInfo:String,buttonNextLabel:String,deliveryTypeLabel:String,paymentTypeLabel:String,customerLabel:String,amountProductsLabel:String,deliveryLabel:String,generalPaymentLabel:String,customerNameLabel:String,customerPhoneLabel:String,customerEmailLabel:String,customerCommentLabel:String,addressGeneralLabel:String,pageSelectAddressPlaceholderStreet:String,pageSelectAddressPlaceholderHouse:String,addressEntranceLabel:String,addressEntranceCodeLabel:String,addressFloorLabel:String,addressApartmentLabel:String,mapChooseYourPlaceLabel:String,mapLabel:String,mapErrorMessage:String,basketEmptyLabel:String,startShoppingLabel:String,courierLabel:String,currencyLabel:{type:String,value:"USD"},isMakeOrderRequestRunning:{type:Boolean,value:!1},googleMapsApiKey:{type:String,value:"AIzaSyAuKg9jszEEgoGfUlIqmd4n9czbQsgcYRM"}}}}]);return WiseShoppingCartContainer}(PolymerElement);window.customElements.define("wise-shopping-cart-container",WiseShoppingCartContainer)});