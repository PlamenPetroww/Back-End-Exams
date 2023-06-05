const { paymentMethodsMap } = require('../constants');


exports.getPaymentMethodsViewData = (selectedPaymentMethod) => {
    const paymentMethods = Object.keys(paymentMethodsMap).map(key => ({
        value: key,
        label: paymentMethodsMap[key],
        isSeletected: selectedPaymentMethod == key,
    }));

    return paymentMethods;
}