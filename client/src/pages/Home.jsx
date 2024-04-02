import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    makeStyles,
    useTheme,
    AppBar,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUserById } from "./../actions/user";
import Product from "../components/Product";
import {
    Button, Row, Col, Nav, ListGroup
} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
    },
    button: {
        margin: theme.spacing(1),
    },
    table: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
}));

function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.users?.loading);
    const users = useSelector((state) => state.users?.items);
    const [userId, setUserId] = useState("");
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const getProducts = () => {
        const tempProducts = []
        for (let i = 0; i < 20; i++) {
            tempProducts.push({
                name: "Shoe No" + (i + 1),
                price: Math.floor(Math.random() * 10000) / 10,
                url: ""
            })
            setProducts(tempProducts)
        }
        const tempCategories = []
        for (let i = 0; i < 5; i++) {
            tempCategories.push("Category " + (i + 1))
        }
        setCategories(tempCategories)
        console.log(tempCategories)
    }
    useEffect(() => {
        getProducts();
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        console.log('loading', loading)
        if (!loading) {
            setOpen(loading);
        }
    }, [loading]);

    const openDialog = (_id) => {
        setOpen(true);
        setUserId(_id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmDelete = () => {
        dispatch(deleteUserById(userId));
    };
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        You can find best boots here
                    </Typography>
                </Toolbar>
            </AppBar>
            <Row className="m-0 p-0">
                <Col md={2}>
                </Col>
                <Col className="py-4" md={10}>
                    <h1>Choose Your Style</h1>
                </Col>
            </Row>
            <Row className="m-0 p-0">
                <Col md={2} className="border p-0">
                    <ListGroup variant="flush" defaultActiveKey="#link1">
                        <ListGroup.Item action href="#link1">
                            Navigation Item1
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            Navigation Item2
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link3">
                            Navigation Item3
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link4">
                            Navigation Item4
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link5">
                            Navigation Item5
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col className="">
                    <div className="border" style={{ position: 'relative', overflowX: 'hidden', overflowY: 'scroll', height: '700px' }}>
                        <h3 className="p-4">FASTLANE 2.0 Product</h3>
                        <p className="ps-4">Fast Lane orders are produced in just 1-Week, almost 4 times faster than standard MTO orders.However, Fast Lane customizing options are slightly limited, especially regarding materials.</p>

                        {categories.map((type, index) => <div key={index} >
                            <h4 className="px-2 pt-2">{type}</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>

                                {
                                    products.map((item, idx) => <Product key={idx} name={item.name} price={item.price} />)
                                }
                            </div>
                        </div>
                        )}

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Home;
