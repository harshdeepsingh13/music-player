import React from 'react';
import ToastContextProvider from "./ToastContext";
import AuthenticationContextProvider from "./AuthenticationContext";
import UserContextProvider from "./UserContext";
import MediaContextProvider from "./MediaContext";

const GlobalContextProvider = ({children}) => {
	return <>
		<AuthenticationContextProvider>
			<ToastContextProvider>
				<UserContextProvider>
					<MediaContextProvider>
						{children}
					</MediaContextProvider>
				</UserContextProvider>
			</ToastContextProvider>
		</AuthenticationContextProvider>
	</>
};

export default GlobalContextProvider
