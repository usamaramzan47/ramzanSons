import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../components/global/theme/Theme';
import sidebarReducer from '../components/global/sidebar/ToggleRedux';
import currentPageReducer from '../components/global/sidebar/CurrentPageRedux';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        sidebar: sidebarReducer,
        currentPage: currentPageReducer,
    },
});

export default store;
