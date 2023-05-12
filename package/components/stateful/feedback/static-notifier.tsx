import React, { FC, useState } from "react";

import { AutoNotificationRenderer, useAutoNotification } from "@hooks";

export interface StaticNotifierProps {
  render?: AutoNotificationRenderer;
}

const defaultRenderer = () => ({});

export const StaticNotifier: FC<StaticNotifierProps> = ({ render }) => {
  const [content, setContent] = useState<AutoNotificationRenderer | undefined>(render);

  useAutoNotification({
    condition: content != null,
    clearCondition: () => setContent(undefined),
    render: content || defaultRenderer,
  });

  return null;
};
