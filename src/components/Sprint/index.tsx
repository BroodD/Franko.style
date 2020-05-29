import React, { useState, useEffect } from "react";
import { IonSlides, IonSlide, IonButton, IonIcon } from "@ionic/react";
import { connect } from "../../data/connect";
import { chevronForward } from "ionicons/icons";
import SprintServices from "../../services/sprint";
import "./index.scss";
import { Link } from "react-router-dom";
import { ISprint } from "../../models/Sprint";

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

interface SprintProps extends OwnProps, StateProps, DispatchProps {}

const Sprint: React.FC<SprintProps> = () => {
  const [sprints, setSprints] = useState<ISprint[]>([]);

  useEffect(() => {
    (async function () {
      const res = await SprintServices.getSprints();
      if (res.data.sprints) setSprints(res.data.sprints);
    })();
  }, []);

  return sprints.length ? (
    <IonSlides className="sprint" pager={true}>
      {sprints.map((sprint: ISprint) => {
        return (
          <IonSlide className="sprint__slide" key={sprint.id}>
            <div
              className="sprint__wrap"
              style={{
                backgroundImage: `url(${sprint.image})`,
              }}
            >
              <div>
                <p className="sprint__title">{sprint.title}</p>
                <p className="sprint__subtitle">{sprint.subtitle}</p>
                {sprint.link && (
                  <Link to={sprint.link}>
                    <IonButton size="small" className="sprint__btn">
                      Більше
                      <IonIcon icon={chevronForward}></IonIcon>
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
