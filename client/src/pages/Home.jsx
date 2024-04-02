import React, { useState, useEffect, useRef } from "react";
import {
    makeStyles,
    useTheme,
    AppBar,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {
    Row, Col, ListGroup
} from "react-bootstrap";
import Category from "../components/Category";

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
var mScroll = false, totalClicks = 0;

function Home() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(1);

    const scrollToSpecialComponent = (id, index) => {
        let currentClickNumber = totalClicks
        mScroll = true;
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveCategory(index + 1);
        setTimeout(() => {
            if (totalClicks === currentClickNumber + 1) mScroll = false
        }, 1000);
        totalClicks++;
    };

    const getProducts = () => {
        const tempProducts = []
        for (let i = 0; i < 20; i++) {
            tempProducts.push({
                name: "Shoe No" + (i + 1),
                price: Math.floor(Math.random() * 10000) / 10,
                url: ""
            })
        }
        setProducts(tempProducts);

        const tempCategories = []
        for (let i = 0; i < 5; i++) {
            tempCategories.push("Category " + (i + 1))
        }
        setCategories(tempCategories);
    }

    const handleScroll = () => {
        if (mScroll) return
        console.log("scrolling...")
        const view = document.getElementById(`viewPort`)
        const categoryRefs = categories.map((_, index) => document.getElementById(`category-${index + 1}`));
        if (!categoryRefs || categoryRefs.length == 0) return
        console.log("categoryRefs...", categoryRefs[0].offsetTop)
        console.log("scrollPosition...", view.offsetTop + view.scrollTop)
        for (let i = categoryRefs.length - 1; i >= 0; i--) {
            const categoryRef = categoryRefs[i];
            if (categoryRef.offsetTop <= view.offsetTop + view.scrollTop) {
                setActiveCategory(i + 1);
                break;
            }
        }
    };

    useEffect(() => {
        getProducts();
    }, [])

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
                <Col lg={2} className="border p-0">
                    <ListGroup className="w-100" variant="flush" defaultActiveKey="#link1">
                        {categories.map((type, index) => (
                            <ListGroup.Item
                                key={index}
                                onClick={() => scrollToSpecialComponent(`category-${index + 1}`, index)}
                                action
                                active={activeCategory === index + 1}
                                href={`#link${index + 1}`}
                            >
                                {type}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col lg="10" className="">
                    <div id="viewPort" onScroll={handleScroll} className="border" style={{ position: 'relative', overflowX: 'hidden', overflowY: 'scroll', height: '700px' }}>
                        <h3 className="p-4">FASTLANE 2.0 Product</h3>
                        <p className="ps-4">Fast Lane orders are produced in just 1-Week, almost 4 times faster than standard MTO orders. However, Fast Lane customizing options are slightly limited, especially regarding materials.</p>
                        {categories.map((type, index) => (
                            <div key={index} id={`category-${index + 1}`}>
                                <Category type={type} products={products} />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Home;
