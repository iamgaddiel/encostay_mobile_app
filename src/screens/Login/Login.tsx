import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonRouterLink,
  IonRow,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import OrSeperator from "../../components/OrSeperator/OrSeperator";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  eyeOffOutline,
  eyeOutline,
  logoFacebook,
  logoGoogle,
  warning,
} from "ionicons/icons";

// styles
import "./Login.css";

// images
import Logo from "../../assets/images/login_logo.svg";
import GoogleLogo from "../../assets/images/search.png";
import FacebookLogo from "../../assets/images/facebook.png";

// components
import SpaceBetween from "../../components/style/SpaceBetween";
import RenderPasswordResetModal from "../../components/RenderPasswordResetModal/RenderPasswordResetModal";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginInputs } from "../../@types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { authenticate } from "../../helpers/authSDK";
import { saveData } from "../../helpers/storageSDKs";
import {
  USER,
} from "../../helpers/keys";





const Login = () => {
  // TODO: fix social media buttons
  // TODO: disable continue button for forget password modal until email is inputed
  // TODO: set onChange event for email input so as to disable continue restriction
  // TODO: change logo to Background not IonImage

  // todo: remove this
  const history = useHistory();

  // 3rd party hooks
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  const router = useIonRouter()

  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({ isOpen: false, message: "" });

  const [loading, setLoading] = useState(false);

  // ForgetPassword Modal
  const [showModal, setShowModal] = useState(false);
  const [_, setSlideCount] = useState(0);





  function dismissModal(): void {
    setSlideCount(0);
    setShowModal(false);
  }

  const onSubmitForm: SubmitHandler<LoginInputs> = async ({
    email,
    password,
  }) => {
    setLoading(true);

    const {
      is_authenticated,
      record,
      token,
      message: responseMessage,
    } = await authenticate(email, password);

    // goto home sceen if user is authenticated
    if (is_authenticated) {
      saveData(USER, { token, record });
      history.push("/home");
    }

    setToast({ message: responseMessage!, isOpen: true });
    setLoading(false);
  };


  // redirect to home if user is loged in already
  // if (record?.id) return <Home key={"home"} />;

  return (
    <IonPage>
      <IonContent className="ion-padding" scrollY={false}>
        <IonToast
          icon={warning}
          position="bottom"
          message={toast.message}
          isOpen={toast.isOpen}
          onDidDismiss={() => setToast({ isOpen: false, message: "" })}
          color={"danger"}
          duration={4000}
        />

        <section className="login_logo mx-auto mt-5">
          <IonImg src={Logo} />
        </section>

        {/* 
        ===================================================
        =====================[ Login/Signup Toggle ] ======
        ===================================================
        */}
        <section className="login_nav_btns w-50 mx-auto  ion-margin-top mt-4">
          <SpaceBetween>
            <IonButton className="sm_btn brown_fill" shape="round">
              Login
            </IonButton>
            <IonRouterLink
              routerDirection="forward"
              routerLink="/register"
              className=""
            >
              <small>Sign Up</small>
            </IonRouterLink>
          </SpaceBetween>
        </section>

        {/* 
        ===================================================
        =====================[ Authentication Form ] ======
        ===================================================
        */}

        <section className="mt-2 ion-padding">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            {/* Email */}
            <div className="form_inputs ion-margin-vertical">
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                placeholder="Enter your Email"
                className="mt-2 p-2"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <small className="text-danger">This field is required</small>
              )}
            </div>

            {/* Password */}
            <div className="form_inputs ion-margin-vertical ">
              <IonLabel>Password</IonLabel>
              <IonInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-2 p-2"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <small className="text-danger">This field is required</small>
              )}

              {/* Toggle Password Visibility */}
              <IonIcon
                icon={showPassword ? eyeOutline : eyeOffOutline}
                className="input_icon"
                size="large"
                slot="end"
                onClick={() => setShowPassword(!showPassword)}
              />

              {/* Forget Password  */}
              {loading ? (
                <div className="ion-text-end login_nav_btns">
                  <small className="ion-text-end pt-3">Forget Password?</small>
                </div>
              ) : (
                <div className="ion-text-end login_nav_btns">
                  <small
                    className="ion-text-end pt-3"
                    onClick={() => router.push('/reset_password_request', 'root')}
                  >
                    Forget Password?
                  </small>
                </div>
              )}
            </div>

            {loading ? (
              <IonButton
                expand="block"
                shape="round"
                className="nm_btn yellow_fill mt-4 w-100"
                mode="ios"
                type="submit"
                disabled
              >
                Processing...
              </IonButton>
            ) : (
              <IonButton
                expand="block"
                shape="round"
                className="nm_btn yellow_fill mt-4 w-100"
                mode="ios"
                type="submit"
              >
                Login
              </IonButton>
            )}
          </form>
        </section>


        {/* 
        ===================================================
        =====================[ Social Media Links] ========
        ===================================================
        */}
        <section className="mt-4">
          <OrSeperator speratorText="Or login with" className="" />

          <IonGrid fixed className="mt-3">
            <IonRow>
              <IonCol size="6">
                <IonButton shape="round" className="" color={"light"} mode="ios" expand="block">
                  <IonImg src={GoogleLogo} className="w-25 ion-margin-end" />
                  Google
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton shape="round" className="fb_btn" color={"primary"} mode="ios" expand="block">
                  <IonImg src={FacebookLogo} className="w-25 ion-margin-end" />
                  Facebook
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

        </section>
      </IonContent>
    </IonPage>
  );
};

export default Login;
