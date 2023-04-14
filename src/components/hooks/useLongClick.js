import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const useLongClick = ({
	                      threshold,
	                      whileClick,
	                      thresholdBetweenIterations,
	                      onFinish,
	                      onStart,
	                      normalClick
                      }) => {

	const [isLongPressActive, setIsLongPressActive] = useState(false);
	const [timeoutId, setTimeoutId] = useState(undefined);

	useEffect(() => {
		let interval = undefined;
		if (isLongPressActive) {
			interval = setInterval(() => {
				return whileClick();
			}, thresholdBetweenIterations)
		} else {
			interval && clearInterval(interval);
		}
		return () => {
			interval && clearInterval(interval);
		}
	}, [isLongPressActive]);

	const onMouseDown = useCallback(() => {
		const timeout = setTimeout(
			() => {
				onStart && onStart();
				setIsLongPressActive(true)
			},
			threshold
		);
		setTimeoutId(timeout);
	}, [threshold]);

	const onMouseUp = useCallback(() => {
		clearTimeout(timeoutId);
		if (isLongPressActive) {
			setIsLongPressActive(false);
			onFinish && onFinish();
		} else {
			normalClick && normalClick();
		}
	}, [timeoutId, isLongPressActive])

	return {
		onMouseDown: () => {
			onMouseDown();
		},
		onMouseUp: () => {
			onMouseUp();
		}
	}

};

useLongClick.propTypes = {
	threshold: PropTypes.number,
	thresholdBetweenIterations: PropTypes.number,
	whileClick: PropTypes.func.isRequired,
	onFinish: PropTypes.func,
	onStart: PropTypes.func,
	normalClick: PropTypes.func
};
useLongClick.defaultProps = {
	threshold: 400,
	thresholdBetweenIterations: 1000
};

export default useLongClick;
