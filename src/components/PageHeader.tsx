import React from "react";
import { useTranslation } from "react-i18next";

interface OwnProps {
  title: string;
}

const PageHeader: React.FC<OwnProps> = ({ title }) => {
  const { t } = useTranslation();
  return <p className="page__title">{t(title)}</p>;
};

export default PageHeader;
