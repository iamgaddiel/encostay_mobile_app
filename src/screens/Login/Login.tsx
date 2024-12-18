import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
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
// TODO: set up forget password for app.
// import RenderPasswordResetModal from "../../components/RenderPasswordResetModal/RenderPasswordResetModal";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LoginInputs } from "../../@types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { authenticate } from "../../helpers/authSDK";
import { saveData } from "../../helpers/storageSDKs";
import {
  USER,
} from "../../helpers/keys";
import Loader from "../../components/Loader";





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
    <>
      <IonToast
        icon={warning}
        position="top"
        message={toast.message}
        isOpen={toast.isOpen}
        onDidDismiss={() => setToast({ isOpen: false, message: "" })}
        color={"danger"}
        duration={4000}
      />

      <Loader isOpen={loading} />

      {/* 
        ===================================================
        =====================[ Authentication Form ] ======
        ===================================================
        */}

      <section className="mt-5 ion-padding">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <IonGrid fixed>
            {/* Email */}
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="6" sizeLg="6">
                <IonItem lines="none" className="ion-no-padding">
                  <IonInput
                    type="email"
                    placeholder="Enter your Email"
                    label="Email"
                    labelPlacement="floating"
                    inputMode="email"
                    {...register("email", { required: true })}
                    autofocus
                  />
                </IonItem>
                {errors.email && (
                  <small className="text-danger">This field is required</small>
                )}
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="6" sizeLg="6">
                <hr className="ion-no-padding ion-no-margin" />
              </IonCol>
            </IonRow>
            {/* Password */}
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="6" sizeLg="6">
                <IonItem lines="none" className="ion-no-padding">
                  <IonInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    label="Password"
                    labelPlacement="floating"
                    {...register("password", { required: true })}
                  >
                    <IonInputPasswordToggle slot="end" color={"warning"} />
                  </IonInput>
                </IonItem>

                {errors.password && (
                  <small className="text-danger">This field is required</small>
                )}
              </IonCol>
            </IonRow>
            {/* Button */}
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="2" sizeLg="3">
                  <IonButton
                    expand="block"
                    shape="round"
                    className="nm_btn yellow_fill mt-4 w-100"
                    mode="ios"
                    type="submit"
                  >
                    Login
                  </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

        </form>
      </section>


      {/* 
        ===================================================
        =====================[ Social Media Links] ========
        ===================================================
        */}
      <section className="mt-4">


        <IonGrid fixed className="mt-3">
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="3">
              <OrSeperator speratorText="Or login with" className="" />
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="6" sizeMd="3" sizeLg="2">
              <IonButton shape="round" className="" color={"light"} mode="ios" expand="block">
                <IonImg src={GoogleLogo} className="w-25 ion-margin-end" />
                Google
              </IonButton>
            </IonCol>
            <IonCol size="6" sizeMd="3" sizeLg="2">
              <IonButton shape="round" className="fb_btn" color={"primary"} mode="ios" expand="block">
                <IonImg src={FacebookLogo} className="w-25 ion-margin-end" />
                Facebook
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

      </section>
    </>
  );
};

export default Login;
