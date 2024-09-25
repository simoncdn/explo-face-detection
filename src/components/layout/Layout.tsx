import { useState } from "react";
import { Model, models } from "@/constant/model";
import Main from "@/pages/Main";

export default function Layout() {
  const [model, setModel] = useState<Model>();

  function addModel(modelId: string) {
    const findedModel = models.find((model) => model.id === modelId);

    if (!findedModel) {
      throw new Error(`Model with id ${modelId} not found`);
    }

    setModel(findedModel);
  }

  return (
    <div className="layout">
      <h2 className="text-4xl font-bold py-6 text-center">Auto crop explo</h2>
      <Main model={model} addModel={addModel} />,
    </div>
  );
}
