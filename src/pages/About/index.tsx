import React from "react";
import { IonContent, IonPage, IonCardContent } from "@ionic/react";
import "./index.scss";
import PageHeader from "../../components/PageHeader";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <IonPage>
      <PageHeader title="about" back />
      <IonContent>
        <IonCardContent>
          <p>
            The Ionic Conference is a one-day conference on featuring talks from
            the Ionic team. It is focused on Ionic applications being built with
            Ionic Framework. This includes migrating apps to the latest version
            of the framework, Angular concepts, Webpack, Sass, and many other
            technologies used in Ionic 2. Tickets are completely sold out, and
            we’re expecting more than 1000 developers – making this the largest
            Ionic conference ever!
          </p>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default About;
