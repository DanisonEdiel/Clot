import { defineStore } from 'pinia';
import { ref } from 'vue';

export const checkoutStore = defineStore(
    'checkout-store',
    () => {
        const token = ref('');
        const productId = ref();
        const url = ref('');
        const redirectRouterName = ref();

        const setRedirectRouterName = (newRedirect: string) => {
            redirectRouterName.value = newRedirect;
        };
        const setToken = (newToken: string) => {
            token.value = newToken;
        };
        const setProductId = (newProductId: number) => {
            productId.value = newProductId;
        };
        const setUrl = (newUrl: string) => {
            url.value = newUrl;
        };
        const clear = () => {
            token.value = '';
            productId.value = undefined;
            url.value = '';
            redirectRouterName.value = undefined;
        };
        return {
            token,
            productId,
            redirectRouterName,
            url,

            setRedirectRouterName,
            setToken,
            setProductId,
            setUrl,
            clear
        };
    },
    { persist: true }
);
