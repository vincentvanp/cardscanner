/**
 * Importign react and react routing
 */
import React, { Component } from 'react';
import {
    Routes,
    Route,
    BrowserRouter,
    Link,
    Navigate,
    Outlet
} from "react-router-dom";

/**
 * Importing views 
 */
import ActiveLessonView from '../views/ActiveLessonView';
import DashboardView from '../views/DashboardView';
import LoginView from '../views/LoginView';
import PreviousLessonsView from '../views/PreviousLessonsView';
import PreviousLessonDetailView from '../views/PreviousLessonDetailView';
import LayoutView from '../views/LayoutView';


/**
 * Routing for the app
 * 
 * @returns Routes
 */
const MainRouter = () => {
    return (
        <Routes>
            <Route exact path="/login" element={<LoginView />} />

            <Route path="/" element={<Private />} >
                <Route path="active-lesson" element={<LayoutView Component={<ActiveLessonView />} />} />
                <Route path="dashboard" element={<LayoutView Component={<DashboardView />} />} />
                <Route path="previous-lessons" element={<LayoutView Component={<PreviousLessonsView />} />} />
                <Route path="previous-lessons/:lessonId" element={<LayoutView Component={<PreviousLessonDetailView />} />} />
            </Route>

            <Route path='*' element={<Navigate replace to="/dashboard" />} />

            {/* <Route exact path='/lessons' element={<MainContent />} />
            <Route exact path='/lesson-board' element={<ActiveLesson />} />
            <Route path="/" element={<Home />} /> */}
        </Routes>
    );
};

/**
 * Checks logged in outhentication
 * 
 * @returns child of route|redirects to login page
 */
function Private() {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

/**
 * Logged in user authentication
 * 
 * @returns true|false
 */
function useAuth() {
    return true;
}
export default MainRouter;