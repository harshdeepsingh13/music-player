import React, {useEffect, useRef, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LOADER_ORIENTATION, ROUTE_PATH} from "../../config";
import {useUserContext} from "../../context/UserContext";
import Loader from "../Loader";
import {getUserDetailsLS} from "../../services/localStorage";

const Header = props => {

	const [name, setName] = useState("");

	const {actions: {fetchUserDetails}, loaders: {fetchUserDetailsLoader}, state: {userDetails}} = useUserContext();
	const isMounted = useRef(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isMounted.current) {
			const userDetailsLS = getUserDetailsLS()
			if (!(userDetails || userDetailsLS?.name)) {
				const successCallback = ({name}) => setName(name);
				fetchUserDetails(successCallback);
			} else
				setName(userDetails?.name || userDetailsLS?.name || "Error")
			isMounted.current = true;
		}
	}, [userDetails])

	return <>
		<Navbar className={"header-container"} bg="dark" expand="lg" variant={"dark"}>
			<Container>
				<Navbar.Brand onClick={() => navigate(ROUTE_PATH.INDEX)}>
					<h2 style={{textAlign: "center"}}>Header Under Development</h2>
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
									<NavDropdown title={name} id="basic-nav-dropdown">
										<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.2">
											Another action
										</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
										<NavDropdown.Divider/>
										<NavDropdown.Item href="#action/3.4">
											Separated link
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
