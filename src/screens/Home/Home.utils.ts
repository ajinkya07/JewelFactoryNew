import RootStore from "../../stores/RootStore";

export const navigateToCategoryOrSubCategory = (data: any) => {
    if (data?.subcategory.length === 0) {
        RootStore.appStore.handleScreenNavigation('ProductList', {
            gridData: data,
            title: data.col_name,
        });
    } else if (data.subcategory.length > 0) {
        RootStore.appStore.handleScreenNavigation('Categories', { categoryData: data?.subcategory, isFromSubcategory: true });
    }
}