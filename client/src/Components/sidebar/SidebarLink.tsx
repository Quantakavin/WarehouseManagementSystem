import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { selectCurrentTab } from '../../app/reducers/SidebarSlice';

interface SidebarLink {
    url: string,
    name: string,
    icon: React.ReactNode
  }

const SidebarLink: React.FC<SidebarLink> = ({url, name, icon}) => {
  const navigate = useNavigate();
  const currenttab = useAppSelector(selectCurrentTab)

    return(
      <div className="sidebartabcontainer" style={{background: currenttab===name? "#3F4D65": "transparent"  }}>
      <button onClick={() => navigate(url)} className="buttonremovestyling" style={{flex: 1, marginLeft: "10%", marginTop: 8, marginBottom: 8, textAlign: "left"}}>{icon} {name}</button>
      </div>
    )
}

export default SidebarLink;