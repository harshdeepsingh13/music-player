import React from 'react';
import ToastContextProvider from "./ToastContext";
import AuthenticationContextProvider from "./AuthenticationContext";
import UserContextProvider from "./UserContext";

const GlobalContextProvider = ({children}) => {
	return <>
		<AuthenticationContextProvider>
			<ToastContextProvider>
				<UserContextProvider>
					{children}
				</UserContextProvider>
			</ToastContextProvider>
		</AuthenticationContextProvider>
	</>
};

export default GlobalContextProvider
