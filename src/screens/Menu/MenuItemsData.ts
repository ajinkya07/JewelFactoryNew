import IconPack from "../../utils/IconPack";
import { strings } from "../../utils/strings";

export const MENU_OPTIONS = () => {
    return [
        {
            title: 'Help',
            values: [
                {
                    id: strings.exclusive,
                    method: strings.exclusive,
                    icon: IconPack.CART,
                },
                {
                    id: strings.orderHistory,
                    method: strings.orderHistory,
                    icon: IconPack.CART,
                },
            ],
        },
        {
            title: 'About us',
            values: [
                {
                    id: strings.aboutUs,
                    method: strings.aboutUs,
                    icon: IconPack.CART,
                },
                {
                    id: strings.privacyPolicy,
                    method: strings.privacyPolicy,
                    icon: IconPack.CART,
                },
                {
                    id: strings.termsCondition,
                    method: strings.termsCondition,
                    icon: IconPack.CART,
                },
            ],
        },
        {
            title: 'share',
            values: [
                {
                    id: strings.shareApp,
                    method: strings.shareApp,
                    icon: IconPack.CART,
                },
                {
                    id: strings.rateApp,
                    method: strings.rateApp,
                    icon: IconPack.CART,
                },

            ],
        },
        {
            title: 'Help',
            values: [
                {
                    id: strings.connectWithUs,
                    method: strings.connectWithUs,
                    icon: IconPack.CART,
                },
                {
                    id: strings.deleteAccount,
                    method: strings.deleteAccount,
                    icon: IconPack.CART,
                },
            ],
        },
        {
            title: 'Logout',
            values: [
                {
                    id: strings.logout,
                    method: strings.logout,
                    icon: IconPack.CART,
                },
            ],
        },
    ];
}
