import React, {useEffect, useRef, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {Container, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LOADER_ORIENTATION, ROUTE_PATH} from "../../config";
import {useUserContext} from "../../context/UserContext";
import Loader from "../Loader";
import {getUserDetailsLS} from "../../services/localStorage";
import {useAuthenticationContext} from "../../context/AuthenticationContext";
import {faArrowRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LogoBanner from "../../assets/images/logo-banner.png"

const Header = props => {

	const [name, setName] = useState("");
	const [rollbackSeconds, setRollbackSeconds] = useState(0);

	const {actions, loaders, state} = useUserContext();
	const {fetchUserDetails, updateUser} = actions;
	const {fetchUserDetailsLoader} = loaders;
	const {userDetails} = state;

	const {logoutUser} = useAuthenticationContext();
	const isMounted = useRef(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isMounted.current) {
			const userDetailsLS = getUserDetailsLS();
			if (!(userDetails || userDetailsLS?.name || userDetailsLS?.rollbackSeconds)) {
				const successCallback = ({name, rollbackSeconds}) => {
					setName(name);
					setRollbackSeconds(rollbackSeconds)
				};
				fetchUserDetails(successCallback);
			} else {
				setName(userDetails?.name || userDetailsLS?.name || "Error")
				setRollbackSeconds(userDetails?.rollbackSeconds || userDetailsLS?.rollbackSeconds || 0)
			}
			isMounted.current = true;
		}
	}, [userDetails])

	const onRollbackChange = ({target: {value}}) => {
		const successCallback = ({rollbackSeconds}) => {
			setRollbackSeconds(rollbackSeconds)
		};
		updateUser({rollbackSeconds: value}, successCallback);
	}

	return <>
		<Navbar className={"header-container"} expand="lg">
			<Container>
				<Navbar.Brand onClick={() => navigate(ROUTE_PATH.INDEX)}>
					<h2 style={{textAlign: "center"}} className={"logo-banner-container"}>
						<img src={LogoBanner} alt="Unconventional Player Logo" className={"logo-banner"}/>
					</h2>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className={"me-auto"}>
					</Nav>
					<Nav>
						{
							fetchUserDetailsLoader ?
								<Loader
									message={"Fetching User Details"}
									orientation={LOADER_ORIENTATION.HORIZONTAL}
									variant={"dark"}
								/> :
								<>
									<Nav.Link className={"rollback-seconds-container"}>
										<FontAwesomeIcon icon={faArrowRotateLeft}/>
										Seconds
										<Form.Select name="rollback-seconds" id="rollback-seconds"
										             value={rollbackSeconds} onChange={onRollbackChange}>
											<option value="5">5</option>
											<option value="10">10</option>
											<option value="15">15</option>
											<option value="20">20</option>
										</Form.Select>
									</Nav.Link>
									<NavDropdown title={name} id="basic-nav-dropdown">
										{/*<NavDropdown.Divider/>*/}
										<NavDropdown.Item onClick={logoutUser}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	</>
};

Header.propTypes = {
	props: PropTypes.object
};
Header.defaultProps = {
	props: {}
};

export default Header
