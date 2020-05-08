import React, { useState, useEffect } from "react";
import { IonSlides, IonSlide, IonButton, IonIcon } from "@ionic/react";
import { connect } from "../../data/connect";
import { play } from "ionicons/icons";
import SprintServices from "../../services/sprint";
import "./index.css";
import { Link } from "react-router-dom";

interface Sprint {
  id: number;
  title: string;
  subtitle: string;
  link?: string;
  order?: number;
  updatedAt: string;
  createdAt: string;
}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

interface SprintProps extends OwnProps, StateProps, DispatchProps {}

const Sprint: React.FC<SprintProps> = () => {
  const [sprints, setSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    (async function () {
      const res = await SprintServices.getSprints();
      if (res.data.sprints) setSprints(res.data.sprints);
    })();
  }, []);

  return sprints.length ? (
    <IonSlides
      className="sprint"
      pager={true}
      // options={{
      //   pagination: {
      //     el: ".sprint .swiper-pagination",
      //     dynamicBullets: true,
      //     dynamicMainBullets: 4,
      //   },
      // }}
    >
      {sprints.map((sprint: Sprint) => {
        return (
          <IonSlide className="sprint__slide" key={sprint.id}>
            <div
              className="sprint__wrap"
              style={{
                backgroundImage: `url(assets/img/sprint_1.jpg)`,
              }}
            >
              <div>
                <p className="sprint__title">{sprint.title}</p>
                <p className="sprint__subtitle">{sprint.subtitle}</p>
                {sprint.link && (
                  <Link to={sprint.link}>
                    <IonButton
                      fill="outline"
                      size="small"
                      className="sprint__btn"
                    >
                      Більше
                      <IonIcon icon={play}></IonIcon>
                    </IonButton>
                  </Link>
                )}
              </div>
            </div>
          </IonSlide>
        );
      })}
    </IonSlides>
  ) : (
    <div></div>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  component: Sprint,
});
