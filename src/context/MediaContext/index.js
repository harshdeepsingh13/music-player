import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import actions from './actions';
import {useToastContext} from "../ToastContext";

export const MediaContext = createContext({});

export const useMediaContext = () => useContext(MediaContext);

const MediaContextProvider = ({children}) => {

	const [state, setState] = useState({media: []});

	const [fetchMediaLoader, setFetchMediaLoader] = useState(false);
	const [mediaActionsLoader, setMediaActionsLoader] = useState({loader: false, ids: []});
	const [uploadMediaLoader, setUploadMediaLoader] = useState(false);

	const {pushToast} = useToastContext();

	const updateMediaActionsLoader = useCallback((loader, id) => {
		setMediaActionsLoader(prevState => {
			if (loader) {
				prevState.ids.push(id);
				return {loader, ids: prevState.ids}
			} else {
				const toRemoveIndex = prevState.ids.findIndex(i => i === id);
				const ids = prevState.ids.filter(i => i === id);
				return {
					loader: !ids.length,
					ids: [...prevState.ids.slice(0, toRemoveIndex), ...prevState.ids.slice(toRemoveIndex + 1)]
				}
			}
		})
	}, []);

	const updateState = useCallback((updatedData, toClear = false) => {
		setState((prevState => (toClear ? {} : {...prevState, ...updatedData})))
	}, [setState]);

	const enhancedActions = useMemo(() => actions(
		state,
		updateState,
		{setFetchMediaLoader, updateMediaActionsLoader, setUploadMediaLoader},
		pushToast
	), [state, updateState]);


	const value = useMemo(() => ({
		actions: enhancedActions,
		state,
		loaders: {fetchMediaLoader, mediaActionsLoader, uploadMediaLoader}
	}), [enhancedActions, state, fetchMediaLoader, mediaActionsLoader, uploadMediaLoader]);

	return <>
		<MediaContext.Provider value={value}>
			{children}
		</MediaContext.Provider>
	</>
};

export default MediaContextProvider;
