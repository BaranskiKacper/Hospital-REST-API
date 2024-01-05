"use client";

import styled from "styled-components";
import { MenuOption } from "@/layout/header/MenuOption";
import React from "react";

const HeaderContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  height: 80,
});

export const Header = () => {
  return (
    <HeaderContainer>
      <MenuOption href="/">Home</MenuOption>
      <MenuOption href="/doctors">Doctors</MenuOption>
    </HeaderContainer>
  );
};
