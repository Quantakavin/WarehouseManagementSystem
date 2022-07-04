import React, { useState } from "react";

interface SidebarLink {
    url: string,
    name: string,
    icon: React.ReactNode
  }

const SidebarLink: React.FC<SidebarLink> = ({url, name, icon}) => {
    return(<></>)
}

export default SidebarLink;