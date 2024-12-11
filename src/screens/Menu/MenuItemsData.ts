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
                    icon: IconPack.EXCLUSIVE,
                },
                {
                    id: strings.orderHistory,
                    method: strings.orderHistory,
                    icon: IconPack.ORDER_HISTORY,
                },
            ],
        },
        {
            title: 'About us',
            values: [
                {
                    id: strings.aboutUs,
                    method: strings.aboutUs,
                    icon: IconPack.ABOUT,
                },
                {
                    id: strings.privacyPolicy,
                    method: strings.privacyPolicy,
                    icon: IconPack.PRIVACY_POLICY,
                },
                {
                    id: strings.termsCondition,
                    method: strings.termsCondition,
                    icon: IconPack.TERMS_CONDITIONS,
                },
            ],
        },
        {
            title: 'share',
            values: [
                {
                    id: strings.shareApp,
                    method: strings.shareApp,
                    icon: IconPack.SHARE,
                },
                {
                    id: strings.rateApp,
                    method: strings.rateApp,
                    icon: IconPack.RATE,
                },

            ],
        },
        {
            title: 'Help',
            values: [
                {
                    id: strings.connectWithUs,
                    method: strings.connectWithUs,
                    icon: IconPack.HEADPHONE,
                },
                {
                    id: strings.deleteAccount,
                    method: strings.deleteAccount,
                    icon: IconPack.DELETE_ACCOUNT,
                },
            ],
        },
        {
            title: 'Logout',
            values: [
                {
                    id: strings.logout,
                    method: strings.logout,
                    icon: IconPack.LOGOUT,
                },
            ],
        },
    ];
}
