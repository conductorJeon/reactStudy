export default function Footer() {
    return (
        <>
        <footer className="mastfoot pb-5 bg-white section-padding pb-0">
            <div className="inner container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="footer-widget pr-lg-5 pr-0">
                            <img src="img/logo.png" className="img-fluid footer-logo mb-3" alt="" />
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et obcaecati quisquam id sit omnis explicabo voluptate aut placeat, soluta, nisi ea magni facere, itaque incidunt modi? Magni, et voluptatum dolorem.</p>
                                <nav className="nav nav-mastfoot justify-content-start">
                                    <a className="nav-link" href="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a className="nav-link" href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a className="nav-link" href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </nav>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="footer-widget px-lg-5 px-0">
                            <h4>Open Hours</h4>
                            <ul className="list-unstyled open-hours">
                                <li className="d-flex justify-content-between"><span>Monday</span><span>9:00 - 24:00</span></li>
                                <li className="d-flex justify-content-between"><span>Tuesday</span><span>9:00 - 24:00</span></li>
                                <li className="d-flex justify-content-between"><span>Wednesday</span><span>9:00 - 24:00</span></li>
                                <li className="d-flex justify-content-between"><span>Thursday</span><span>9:00 - 24:00</span></li>
                                <li className="d-flex justify-content-between"><span>Friday</span><span>9:00 - 02:00</span></li>
                                <li className="d-flex justify-content-between"><span>Saturday</span><span>9:00 - 02:00</span></li>
                                <li className="d-flex justify-content-between"><span>Sunday</span><span> Closed</span></li>
                            </ul>
                        </div>

                    </div>

                    <div className="col-lg-4">
                        <div className="footer-widget pl-lg-5 pl-0">
                            <h4>Newsletter</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <form id="newsletter">
                                <div className="form-group">
                                    <input type="email" className="form-control" id="emailNewsletter" aria-describedby="emailNewsletter" placeholder="Enter email" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </form>
                        </div>

                    </div>
                    <div className="col-md-12 d-flex align-items-center">
                        <p className="mx-auto text-center mb-0">Copyright 2019. All Right Reserved. Design by <a href="https://gettemplates.co" target="_blank">GetTemplates</a></p>
                    </div>

                </div>
            </div>
        </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script src="%PUBLIC_URL%/vendor/bootstrap/popper.min.js"></script>
    <script src="%PUBLIC_URL%/vendor/bootstrap/bootstrap.min.js"></script>
    <script src="%PUBLIC_URL%/vendor/select2/select2.min.js "></script>
    <script src="%PUBLIC_URL%/vendor/owlcarousel/owl.carousel.min.js"></script>
    <script src="https://cdn.rawgit.com/noelboss/featherlight/1.7.13/release/featherlight.min.js"></script>
    <script src="%PUBLIC_URL%/vendor/stellar/jquery.stellar.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.1/js/tempusdominus-bootstrap-4.min.js"></script>

    <script src="%PUBLIC_URL%/js/app.min.js "></script>
        </>
    )
}