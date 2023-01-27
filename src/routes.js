import {ROUTE_PATH} from "./config";
import SignUp from "./containerComponents/SignUp";
import Home from "./containerComponents/Home";
import Login from "./containerComponents/Login";

export default [
	{path: ROUTE_PATH.INDEX, component: Home, isPrivate: true, isHeader: true},
	{path: ROUTE_PATH.SIGNIN, component: Login},
	{path: ROUTE_PATH.SIGNUP, component: SignUp}
]
