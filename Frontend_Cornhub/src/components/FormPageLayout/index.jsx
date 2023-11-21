import React from "react";
import classnames from "classnames";

import Button from "../Button";

export default function FormPageLayout(props) {
  const { title, loading, handleSave, containerClass } = props;

  return (
    <div>
      <div className="flex justify-between p-6 pt-0 mb-8 border-b border-labelText">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button
          label="Save"
          type="submit"
          onClick={handleSave}
          loading={loading}
        />
      </div>
      <div className={classnames("lg:pl-6 lg:pr-32", containerClass)}>
        {props.children}
      </div>
    </div>
  );
}