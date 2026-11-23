NECROMANCER STORY - SELECTED FUNCTIONS
Source: all_functions.txt
Found targets: 27/66


###########################################################################
# SEARCH TARGET: LogoScene::init
###########################################################################

========================================
FUNCTION: init
ADDRESS: 00482748
========================================

/* LogoScene::init() */

undefined8 __thiscall LogoScene::init(LogoScene *this)

{
  long *plVar1;
  long lVar2;
  undefined8 local_30;
  long local_28;
  
  lVar2 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_28 = lVar2;
  cocos2d::LayerColor::initWithColor((LayerColor *)this,(Color4B *)&DAT_00c68e98);
  CommonSystem::SetParent((Layer *)this);
  cocos2d::Node::schedule((_func_void_float *)this);
  plVar1 = (long *)AtlasMgr::GetImg("ui/logo.png");
  *(long **)(this + 0x418) = plVar1;
  local_30 = 0x4361000043c80000;
  (**(code **)(*plVar1 + 0x98))(plVar1,&local_30);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x418),0);
  (**(code **)(**(long **)(this + 0x418) + 0x490))(*(long **)(this + 0x418),0);
  *(undefined4 *)(this + 0x424) = 0;
  *(undefined4 *)(this + 0x428) = 0;
  *(undefined4 *)(this + 0x42c) = 0;
  this[0x420] = (LogoScene)0x1;
  CommonSystem::SetTip(2);
  if (lVar2 != local_28) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: LogoScene::onEnter
###########################################################################

========================================
FUNCTION: onEnter
ADDRESS: 00482924
========================================

/* LogoScene::onEnter() */

void __thiscall LogoScene::onEnter(LogoScene *this)

{
  long lVar1;
  code *pcVar2;
  long lVar3;
  undefined *local_70;
  undefined *puStack_68;
  undefined8 local_60;
  LogoScene *pLStack_58;
  long *local_50;
  long local_38;
  
  lVar3 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar3;
  cocos2d::Node::onEnter((Node *)this);
  lVar1 = cocos2d::EventListenerTouchAllAtOnce::create();
  *(long *)(this + 0x410) = lVar1;
  local_70 = PTR_vtable_00c434a8 + 0x10;
  puStack_68 = PTR_TouchEnded_00c415c0;
  local_60 = 0;
  pLStack_58 = this;
  local_50 = (long *)&local_70;
  std::__ndk1::
  function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
  ::swap((function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
          *)&local_70,(function *)(lVar1 + 0x100));
  if ((undefined **)local_50 == &local_70) {
    pcVar2 = *(code **)(*local_50 + 0x20);
  }
  else {
    if (local_50 == (long *)0x0) goto LAB_004829b0;
    pcVar2 = *(code **)(*local_50 + 0x28);
  }
  (*pcVar2)();
LAB_004829b0:
  lVar1 = cocos2d::Director::getInstance();
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(lVar1 + 0xb0),*(EventListener **)(this + 0x410),(Node *)this);
  if (lVar3 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: LogoScene::onExit
###########################################################################

========================================
FUNCTION: onExit
ADDRESS: 00482a14
========================================

/* LogoScene::onExit() */

void __thiscall LogoScene::onExit(LogoScene *this)

{
  long lVar1;
  
  cocos2d::Node::onExit((Node *)this);
  lVar1 = cocos2d::Director::getInstance();
  cocos2d::EventDispatcher::removeEventListener
            (*(EventDispatcher **)(lVar1 + 0xb0),*(EventListener **)(this + 0x410));
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: CreateScene
ADDRESS: 00415720
========================================

void MainMenuScene::CreateScene(void)

{
  (*(code *)PTR_CreateScene_00c38278)();
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: Run
ADDRESS: 00436d44
========================================

/* ActionGoToMainMenu::Run() */

undefined8 ActionGoToMainMenu::Run(void)

{
  Director *this;
  Scene *pSVar1;
  
  this = (Director *)cocos2d::Director::getInstance();
  pSVar1 = (Scene *)MainMenuScene::CreateScene();
  cocos2d::Director::replaceScene(this,pSVar1);
  return 1;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: MenuCallBack
ADDRESS: 00458ba4
========================================

/* CreditScene::MenuCallBack(cocos2d::Ref*) */

void CreditScene::MenuCallBack(Ref *param_1)

{
  Director *this;
  Scene *pSVar1;
  
  this = (Director *)cocos2d::Director::getInstance();
  pSVar1 = (Scene *)MainMenuScene::CreateScene();
  cocos2d::Director::replaceScene(this,pSVar1);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: onKeyReleased
ADDRESS: 004591b0
========================================

/* CreditScene::onKeyReleased(cocos2d::EventKeyboard::KeyCode, cocos2d::Event*) */

void __thiscall CreditScene::onKeyReleased(undefined8 param_1,int param_2,long param_3)

{
  Director *this;
  Scene *pSVar1;
  
  if ((param_2 == 6) && (*(undefined1 *)(param_3 + 0x28) = 1, PTR_g_Common_00c44818[2] == '\0')) {
    this = (Director *)cocos2d::Director::getInstance();
    pSVar1 = (Scene *)MainMenuScene::CreateScene();
    cocos2d::Director::replaceScene(this,pSVar1);
    return;
  }
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: Close
ADDRESS: 0045fb38
========================================

/* GameScene::Close() */

void GameScene::Close(void)

{
  undefined *puVar1;
  long *plVar2;
  Director *this;
  Scene *pSVar3;
  
  puVar1 = PTR_g_Common_00c44818;
  if (PTR_g_Common_00c44818[0x72] == '\0') {
    if (PTR_g_Common_00c44818[0x65] == '\0') {
      this = (Director *)cocos2d::Director::getInstance();
      pSVar3 = (Scene *)LobbyScene::CreateScene();
    }
    else {
      PTR_g_Common_00c44818[3] = 1;
      puVar1[0x65] = 0;
      this = (Director *)cocos2d::Director::getInstance();
      pSVar3 = (Scene *)MainMenuScene::CreateScene();
    }
  }
  else {
    plVar2 = (long *)User::Ins();
    (**(code **)(*plVar2 + 0x270))();
    this = (Director *)cocos2d::Director::getInstance();
    pSVar3 = (Scene *)HardcoreLobbyScene::CreateScene();
  }
  cocos2d::Director::replaceScene(this,pSVar3);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: onKeyReleased
ADDRESS: 0046a900
========================================

/* HardcoreLobbyScene::onKeyReleased(cocos2d::EventKeyboard::KeyCode, cocos2d::Event*) */

void __thiscall HardcoreLobbyScene::onKeyReleased(HardcoreLobbyScene *this,int param_2,long param_3)

{
  ulong uVar1;
  Director *this_00;
  Scene *pSVar2;
  
  if (param_2 != 6) {
    return;
  }
  *(undefined1 *)(param_3 + 0x28) = 1;
  uVar1 = (**(code **)(**(long **)(this + 0x428) + 0x178))();
  if ((uVar1 & 1) == 0) {
    this_00 = (Director *)cocos2d::Director::getInstance();
    pSVar2 = (Scene *)MainMenuScene::CreateScene();
    cocos2d::Director::replaceScene(this_00,pSVar2);
    return;
  }
                    /* WARNING: Could not recover jumptable at 0x0046a94c. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (**(code **)(**(long **)(this + 0x428) + 0x170))(*(long **)(this + 0x428),0);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: MenuCallBack
ADDRESS: 0046bf98
========================================

/* HardcoreLobbyScene::MenuCallBack(cocos2d::Ref*) */

void __thiscall HardcoreLobbyScene::MenuCallBack(HardcoreLobbyScene *this,Ref *param_1)

{
  code *pcVar1;
  undefined *puVar2;
  undefined *puVar3;
  bool bVar4;
  int iVar5;
  uint uVar6;
  int iVar7;
  uint uVar8;
  undefined4 uVar9;
  undefined4 uVar10;
  ulong uVar11;
  undefined8 uVar12;
  Director *this_00;
  Scene *pSVar13;
  long *plVar14;
  undefined8 uVar15;
  long lVar16;
  int local_40;
  int local_3c;
  long local_38;
  
  lVar16 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar16;
  iVar5 = (**(code **)(*(long *)param_1 + 0x2b8))(param_1);
  puVar3 = PTR_g_StageData_00c41cc8;
  puVar2 = PTR_g_UserData_00c41478;
  switch(iVar5) {
  case 0:
    this_00 = (Director *)cocos2d::Director::getInstance();
    pSVar13 = (Scene *)MainMenuScene::CreateScene();
    break;
  case 1:
    plVar14 = (long *)User::Ins(PTR_g_Common_00c44818[0x72]);
    (**(code **)(*plVar14 + 0x270))();
    this_00 = (Director *)cocos2d::Director::getInstance();
    pSVar13 = (Scene *)InventoryScene::CreateScene();
    break;
  case 2:
    uVar6 = StageData::Valid((StageData *)PTR_g_StageData_00c41cc8);
    if (((uVar6 & 1) == 0) &&
       (uVar11 = UserData::ConsumeStamina((UserData *)PTR_g_UserData_00c41478), (uVar11 & 1) == 0))
    goto switchD_0046bff8_default;
    plVar14 = (long *)User::Ins(PTR_g_Common_00c44818[0x72]);
    (**(code **)(*plVar14 + 0x270))();
    uVar6 = *(uint *)PTR_g_Hard_00c41970;
    uVar8 = *(uint *)(PTR_g_Hard_00c41970 + 4);
    bVar4 = *(uint *)(PTR_g_Hard_00c41970 + 8) != (uVar8 + uVar6 ^ 0x3edd3b2d);
    if (bVar4) {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 0046c3d8 to 0046c3e3 has its CatchHandler @ 0046c4a0 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    if (bVar4 || (int)(uVar8 ^ uVar6) < 0x1a) {
      uVar9 = HardcoreData::GetAct();
      uVar10 = HardcoreData::GetState();
      StageMgr::OpenStage((StageMgr *)PTR_stageMgr_00c430c8,uVar9,uVar10);
      if (lVar16 == local_38) {
        CommonSystem::ShowAD_Normal();
        return;
      }
      goto LAB_0046c498;
    }
    goto LAB_0046c3f4;
  case 3:
    local_40 = 0;
    local_3c = 0;
    UserData::GetStamina((UserData *)PTR_g_UserData_00c41478,&local_3c,&local_40);
    plVar14 = *(long **)(this + 0x428);
    pcVar1 = *(code **)(*plVar14 + 0x170);
    uVar6 = (**(code **)(*plVar14 + 0x178))(plVar14);
    (*pcVar1)(plVar14,~uVar6 & 1);
    uVar11 = (**(code **)(**(long **)(this + 0x428) + 0x178))();
    iVar5 = local_3c;
    if (((uVar11 & 1) != 0) &&
       (iVar7 = UserData::GetMaxStamina((UserData *)PTR_g_UserData_00c41478), iVar5 == iVar7)) {
      (**(code **)(**(long **)(this + 0x428) + 0x170))(*(long **)(this + 0x428),0);
      CommonSystem::ShowSystemMsg(0x3e,0x18,0);
    }
  default:
switchD_0046bff8_default:
    if (lVar16 == local_38) {
      return;
    }
    goto LAB_0046c498;
  case 4:
    if (*(uint *)(PTR_g_UserData_00c41478 + 0x9c) ==
        (*(uint *)(PTR_g_UserData_00c41478 + 0x98) + *(uint *)(PTR_g_UserData_00c41478 + 0x94) ^
        0x3edd3b2d)) {
      uVar6 = *(uint *)(PTR_g_UserData_00c41478 + 0x98) ^ *(uint *)(PTR_g_UserData_00c41478 + 0x94);
      if (199 < (int)uVar6) {
        uVar8 = rand();
        uVar6 = uVar8 ^ uVar6 - 200;
        *(uint *)(puVar2 + 0x94) = uVar6;
        *(uint *)(puVar2 + 0x98) = uVar8;
        *(uint *)(puVar2 + 0x9c) = uVar6 + uVar8 ^ 0x3edd3b2d;
        iVar5 = UserData::GetMaxStamina((UserData *)puVar2);
        if (lVar16 == local_38) {
          CommonSystem::AddStamina(iVar5);
          return;
        }
        goto LAB_0046c498;
      }
    }
    else {
LAB_0046c364:
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
    goto LAB_0046c374;
  case 5:
    if (lVar16 != local_38) goto LAB_0046c498;
    uVar12 = 3;
    goto LAB_0046c484;
  case 6:
    if (lVar16 == local_38) {
                    /* WARNING: Could not recover jumptable at 0x0046c27c. Too many branches */
                    /* WARNING: Treating indirect jump as call */
      (**(code **)(**(long **)(this + 0x428) + 0x170))(*(long **)(this + 0x428),0);
      return;
    }
    goto LAB_0046c498;
  case 7:
  case 8:
    uVar11 = StageData::Valid((StageData *)PTR_g_StageData_00c41cc8);
    if ((uVar11 & 1) == 0) {
LAB_0046c038:
      if (lVar16 != local_38) goto LAB_0046c498;
      uVar12 = 0x3e;
      uVar15 = 0x1e;
      goto LAB_0046c388;
    }
    if (*(uint *)(puVar3 + 0x2c) ==
        (*(uint *)(puVar3 + 0x28) + *(uint *)(puVar3 + 0x24) ^ 0x3edd3b2d)) {
      if ((float)(*(uint *)(puVar3 + 0x28) ^ *(uint *)(puVar3 + 0x24)) != 0.0) goto LAB_0046c038;
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
    puVar2 = PTR_g_UserData_00c41478;
    if (iVar5 != 8) {
      if (lVar16 == local_38) {
        uVar12 = 4;
LAB_0046c484:
        CommonSystem::ShowAD(uVar12);
        return;
      }
      goto LAB_0046c498;
    }
    if (*(uint *)(PTR_g_UserData_00c41478 + 0x9c) !=
        (*(uint *)(PTR_g_UserData_00c41478 + 0x98) + *(uint *)(PTR_g_UserData_00c41478 + 0x94) ^
        0x3edd3b2d)) goto LAB_0046c364;
    uVar6 = *(uint *)(PTR_g_UserData_00c41478 + 0x98) ^ *(uint *)(PTR_g_UserData_00c41478 + 0x94);
    if (0x1d < (int)uVar6) {
      uVar8 = rand();
      uVar6 = uVar8 ^ uVar6 - 0x1e;
      *(uint *)(puVar2 + 0x94) = uVar6;
      *(uint *)(puVar2 + 0x98) = uVar8;
      *(uint *)(puVar2 + 0x9c) = uVar6 + uVar8 ^ 0x3edd3b2d;
      if (lVar16 == local_38) {
        StageData::RepairShield((StageData *)PTR_g_StageData_00c41cc8);
        return;
      }
      goto LAB_0046c498;
    }
LAB_0046c374:
    if (lVar16 == local_38) {
      uVar12 = 0x11;
      uVar15 = 3;
LAB_0046c388:
      CommonSystem::ShowSystemMsg(uVar12,uVar15,0);
      return;
    }
    goto LAB_0046c498;
  case 9:
    plVar14 = (long *)User::Ins(PTR_g_Common_00c44818[0x72]);
    (**(code **)(*plVar14 + 0x270))();
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 0046c2c0 to 0046c2cb has its CatchHandler @ 0046c49c */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
LAB_0046c3f4:
    if (lVar16 == local_38) {
      StageMgr::OpenStage((StageMgr *)PTR_stageMgr_00c430c8,7,0);
      return;
    }
    goto LAB_0046c498;
  }
  if (lVar16 == local_38) {
    cocos2d::Director::replaceScene(this_00,pSVar13);
    return;
  }
LAB_0046c498:
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: onKeyReleased
ADDRESS: 00480648
========================================

/* LobbyScene::onKeyReleased(cocos2d::EventKeyboard::KeyCode, cocos2d::Event*) */

void __thiscall LobbyScene::onKeyReleased(LobbyScene *this,int param_2,long param_3)

{
  ulong uVar1;
  Director *this_00;
  Scene *pSVar2;
  
  if (param_2 != 6) {
    return;
  }
  *(undefined1 *)(param_3 + 0x28) = 1;
  uVar1 = (**(code **)(**(long **)(this + 0x450) + 0x178))();
  if ((uVar1 & 1) == 0) {
    this_00 = (Director *)cocos2d::Director::getInstance();
    pSVar2 = (Scene *)MainMenuScene::CreateScene();
    cocos2d::Director::replaceScene(this_00,pSVar2);
    return;
  }
                    /* WARNING: Could not recover jumptable at 0x00480694. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (**(code **)(**(long **)(this + 0x450) + 0x170))(*(long **)(this + 0x450),0);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: MenuCallBack
ADDRESS: 00481660
========================================

/* LobbyScene::MenuCallBack(cocos2d::Ref*) */

void __thiscall LobbyScene::MenuCallBack(LobbyScene *this,Ref *param_1)

{
  code *pcVar1;
  undefined *puVar2;
  bool bVar3;
  bool bVar4;
  uint uVar5;
  int iVar6;
  uint uVar7;
  int iVar8;
  long *plVar9;
  ulong uVar10;
  Director *this_00;
  Scene *pSVar11;
  undefined8 uVar12;
  char *pcVar13;
  undefined8 uVar14;
  uint uVar15;
  long lVar16;
  int local_50;
  int local_4c;
  long local_48;
  
  lVar16 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar16;
  uVar5 = (**(code **)(*(long *)param_1 + 0x2b8))(param_1);
  puVar2 = PTR_g_UserData_00c41478;
  switch(uVar5) {
  case 0:
    this_00 = (Director *)cocos2d::Director::getInstance();
    pSVar11 = (Scene *)MainMenuScene::CreateScene();
    goto LAB_00481730;
  default:
    plVar9 = (long *)(**(code **)(*(long *)this + 0x228))(this,uVar5 + 199);
    uVar10 = (**(code **)(*plVar9 + 0x178))();
    puVar2 = PTR_g_UserData_00c41478;
    if ((uVar10 & 1) != 0) {
      if (*(uint *)(PTR_g_UserData_00c41478 + 0x30) ==
          (*(uint *)(PTR_g_UserData_00c41478 + 0x2c) + *(uint *)(PTR_g_UserData_00c41478 + 0x28) ^
          0x3edd3b2d)) {
        uVar7 = *(uint *)(PTR_g_UserData_00c41478 + 0x2c) ^
                *(uint *)(PTR_g_UserData_00c41478 + 0x28);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar7 = 0;
      }
      uVar15 = *(uint *)(this + 0x410);
      if (uVar7 == uVar15) {
        if (*(uint *)(puVar2 + 0x24) ==
            (*(uint *)(puVar2 + 0x20) + *(uint *)(puVar2 + 0x1c) ^ 0x3edd3b2d)) {
          uVar15 = *(uint *)(puVar2 + 0x20) ^ *(uint *)(puVar2 + 0x1c);
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar7 = *(uint *)(this + 0x410);
          uVar15 = 0;
        }
        bVar3 = uVar15 == uVar5;
        uVar15 = uVar7;
      }
      else {
        bVar3 = false;
      }
      if (uVar15 == 1) {
        uVar7 = *(uint *)(PTR_g_Common_00c44818 + 4);
        uVar15 = *(uint *)(PTR_g_Common_00c44818 + 8);
        bVar4 = *(uint *)(PTR_g_Common_00c44818 + 0xc) != (uVar15 + uVar7 ^ 0x3edd3b2d);
        if (bVar4) {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
        }
        if (bVar4 || (uVar15 ^ uVar7) != 1) goto joined_r0x00481a6c;
      }
      else {
joined_r0x00481a6c:
        if ((bVar3) &&
           (uVar10 = UserData::ConsumeStamina((UserData *)PTR_g_UserData_00c41478),
           (uVar10 & 1) == 0)) goto LAB_00481b18;
      }
      if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
         (iVar8 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar8 != 0)) {
                    /* try { // try from 00481ac8 to 00481ad3 has its CatchHandler @ 00481b44 */
        StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
        __cxa_guard_release(PTR_stageMgr_00c43eb0);
      }
      StageMgr::OpenStage((StageMgr *)PTR_stageMgr_00c430c8,*(undefined4 *)(this + 0x410),uVar5);
      if (lVar16 == local_48) {
        CommonSystem::ShowAD_Normal();
        return;
      }
      break;
    }
    uVar12 = 0x3e;
    uVar14 = 0;
    goto LAB_0048199c;
  case 6:
    this_00 = (Director *)cocos2d::Director::getInstance();
    pSVar11 = (Scene *)InventoryScene::CreateScene();
LAB_00481730:
    if (lVar16 == local_48) {
      cocos2d::Director::replaceScene(this_00,pSVar11);
      return;
    }
    break;
  case 7:
    if (lVar16 == local_48) {
      iVar8 = *(int *)(this + 0x410) + -1;
LAB_00481788:
      SetAct(this,iVar8);
      return;
    }
    break;
  case 8:
    if (lVar16 == local_48) {
      iVar8 = *(int *)(this + 0x410) + 1;
      goto LAB_00481788;
    }
    break;
  case 9:
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar8 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar8 != 0)) {
                    /* try { // try from 004817c8 to 004817d3 has its CatchHandler @ 00481b40 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    if (lVar16 == local_48) {
      StageMgr::OpenStage((StageMgr *)PTR_stageMgr_00c430c8,9,0);
      return;
    }
    break;
  case 10:
    local_50 = 0;
    local_4c = 0;
    UserData::GetStamina((UserData *)PTR_g_UserData_00c41478,&local_4c,&local_50);
    plVar9 = *(long **)(this + 0x450);
    pcVar1 = *(code **)(*plVar9 + 0x170);
    uVar5 = (**(code **)(*plVar9 + 0x178))(plVar9);
    (*pcVar1)(plVar9,~uVar5 & 1);
    uVar10 = (**(code **)(**(long **)(this + 0x450) + 0x178))();
    iVar8 = local_4c;
    if (((uVar10 & 1) != 0) &&
       (iVar6 = UserData::GetMaxStamina((UserData *)PTR_g_UserData_00c41478), iVar8 == iVar6)) {
      (**(code **)(**(long **)(this + 0x450) + 0x170))(*(long **)(this + 0x450),0);
      pcVar13 = (char *)GameMsg::Get(0x3e,0x18);
      CommonSystem::ShowSystemMsg(pcVar13,false);
    }
LAB_00481b18:
    if (lVar16 == local_48) {
      return;
    }
    break;
  case 0xb:
    if (*(uint *)(PTR_g_UserData_00c41478 + 0x9c) ==
        (*(uint *)(PTR_g_UserData_00c41478 + 0x98) + *(uint *)(PTR_g_UserData_00c41478 + 0x94) ^
        0x3edd3b2d)) {
      uVar5 = *(uint *)(PTR_g_UserData_00c41478 + 0x98) ^ *(uint *)(PTR_g_UserData_00c41478 + 0x94);
      if (199 < (int)uVar5) {
        uVar7 = rand();
        uVar5 = uVar7 ^ uVar5 - 200;
        *(uint *)(puVar2 + 0x94) = uVar5;
        *(uint *)(puVar2 + 0x98) = uVar7;
        *(uint *)(puVar2 + 0x9c) = uVar5 + uVar7 ^ 0x3edd3b2d;
        iVar8 = UserData::GetMaxStamina((UserData *)puVar2);
        if (lVar16 == local_48) {
          CommonSystem::AddStamina(iVar8);
          return;
        }
        break;
      }
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
    uVar12 = 0x11;
    uVar14 = 3;
LAB_0048199c:
    pcVar13 = (char *)GameMsg::Get(uVar12,uVar14);
    if (lVar16 == local_48) {
      CommonSystem::ShowSystemMsg(pcVar13,false);
      return;
    }
    break;
  case 0xc:
    if (lVar16 == local_48) {
      CommonSystem::ShowAD(3);
      return;
    }
    break;
  case 0xd:
    if (lVar16 == local_48) {
                    /* WARNING: Could not recover jumptable at 0x00481974. Too many branches */
                    /* WARNING: Treating indirect jump as call */
      (**(code **)(**(long **)(this + 0x450) + 0x170))(*(long **)(this + 0x450),0);
      return;
    }
  }
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: OnUpdate
ADDRESS: 0048282c
========================================

/* WARNING: Removing unreachable block (ram,0x004828c0) */
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* LogoScene::OnUpdate(float) */

void __thiscall LogoScene::OnUpdate(LogoScene *this,float param_1)

{
  Director *this_00;
  Scene *pSVar1;
  long *plVar2;
  float fVar3;
  
  if (_DAT_009c4f80 < (double)param_1) {
    return;
  }
  CommonSystem::FrameMove(param_1);
  fVar3 = *(float *)(this + 0x424) + param_1;
  *(float *)(this + 0x424) = fVar3;
  if (fVar3 <= 4.0) {
    if (1.0 <= fVar3) {
      if (fVar3 <= 2.0) {
        return;
      }
      plVar2 = *(long **)(this + 0x418);
      fVar3 = *(float *)(this + 0x428) + param_1 * DAT_009c3d48;
      if (fVar3 <= 0.0) {
        fVar3 = 0.0;
      }
    }
    else {
      plVar2 = *(long **)(this + 0x418);
      fVar3 = param_1 * DAT_009c48b4 + *(float *)(this + 0x428);
    }
    *(float *)(this + 0x428) = fVar3;
                    /* WARNING: Could not recover jumptable at 0x00482910. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    (**(code **)(*plVar2 + 0x490))(plVar2,(int)fVar3);
    return;
  }
  this_00 = (Director *)cocos2d::Director::getInstance();
  pSVar1 = (Scene *)MainMenuScene::CreateScene();
  cocos2d::Director::replaceScene(this_00,pSVar1);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: TouchEnded
ADDRESS: 004829e8
========================================

/* LogoScene::TouchEnded(std::__ndk1::vector<cocos2d::Touch*,
   std::__ndk1::allocator<cocos2d::Touch*> > const&, cocos2d::Event*) */

void LogoScene::TouchEnded(vector *param_1,Event *param_2)

{
  Director *this;
  Scene *pSVar1;
  
  this = (Director *)cocos2d::Director::getInstance();
  pSVar1 = (Scene *)MainMenuScene::CreateScene();
  cocos2d::Director::replaceScene(this,pSVar1);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::CreateScene
###########################################################################

========================================
FUNCTION: CreateScene
ADDRESS: 00482b50
========================================

/* MainMenuScene::CreateScene() */

long * MainMenuScene::CreateScene(void)

{
  long *plVar1;
  undefined8 uVar2;
  
  plVar1 = (long *)cocos2d::Scene::create();
  uVar2 = create();
  (**(code **)(*plVar1 + 0x208))(plVar1,uVar2);
  return plVar1;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::onExit
###########################################################################

========================================
FUNCTION: onExit
ADDRESS: 004853b4
========================================

/* MainMenuScene::onExit() */

void __thiscall MainMenuScene::onExit(MainMenuScene *this)

{
  if (*(MainMenuScene **)PTR_g_main_menu_00c40e40 == this) {
    *(undefined8 *)PTR_g_main_menu_00c40e40 = 0;
  }
  cocos2d::Node::onExit((Node *)this);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::UpdateProgress
###########################################################################

========================================
FUNCTION: UpdateProgress
ADDRESS: 0041bda0
========================================

void __thiscall MainMenuScene::UpdateProgress(MainMenuScene *this)

{
  (*(code *)PTR_UpdateProgress_00c3b5b8)();
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::UpdateProgress
###########################################################################

========================================
FUNCTION: UpdateProgress
ADDRESS: 00482c44
========================================

/* MainMenuScene::UpdateProgress() */

void __thiscall MainMenuScene::UpdateProgress(MainMenuScene *this)

{
  int iVar1;
  int iVar2;
  char *param3;
  size_t __n;
  User *this_00;
  undefined *puVar3;
  int iVar4;
  long *plVar5;
  void *__dest;
  ulong uVar6;
  long lVar7;
  code *pcVar8;
  ulong local_90;
  size_t local_88;
  void *local_80;
  char local_78 [32];
  long local_58;
  
  puVar3 = PTR_g_UserData_00c41478;
  lVar7 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_78[0x18] = '\0';
  local_78[0x19] = '\0';
  local_78[0x1a] = '\0';
  local_78[0x1b] = '\0';
  local_78[0x1c] = '\0';
  local_78[0x1d] = '\0';
  local_78[0x10] = '\0';
  local_78[0x11] = '\0';
  local_78[0x12] = '\0';
  local_78[0x13] = '\0';
  local_78[0x14] = '\0';
  local_78[0x15] = '\0';
  local_78[0x16] = '\0';
  local_78[0x17] = '\0';
  local_78[8] = '\0';
  local_78[9] = '\0';
  local_78[10] = '\0';
  local_78[0xb] = '\0';
  local_78[0xc] = '\0';
  local_78[0xd] = '\0';
  local_78[0xe] = '\0';
  local_78[0xf] = '\0';
  local_78[0] = '\0';
  local_78[1] = '\0';
  local_78[2] = '\0';
  local_78[3] = '\0';
  local_78[4] = '\0';
  local_78[5] = '\0';
  local_78[6] = '\0';
  local_78[7] = '\0';
  local_58 = lVar7;
  if (*(uint *)(PTR_g_UserData_00c41478 + 0x18) ==
      (*(uint *)(PTR_g_UserData_00c41478 + 0x14) + *(uint *)(PTR_g_UserData_00c41478 + 0x10) ^
      0x3edd3b2d)) {
    if ((*(uint *)(PTR_g_UserData_00c41478 + 0x14) ^ *(uint *)(PTR_g_UserData_00c41478 + 0x10)) != 4
       ) goto LAB_00482cd0;
    iVar2 = 100;
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
LAB_00482cd0:
    if (*(uint *)(puVar3 + 0x78) ==
        (*(int *)(puVar3 + 0x74) + *(int *)(puVar3 + 0x70) ^ 0x3edd3b2dU)) {
      if (*(int *)(puVar3 + 0x74) == *(int *)(puVar3 + 0x70)) {
        iVar2 = 0;
      }
      else {
        if (*(uint *)(puVar3 + 0x24) ==
            (*(uint *)(puVar3 + 0x20) + *(uint *)(puVar3 + 0x1c) ^ 0x3edd3b2d)) {
          iVar2 = (*(uint *)(puVar3 + 0x20) ^ *(uint *)(puVar3 + 0x1c)) - 0x23;
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          iVar2 = -0x23;
        }
        if (*(uint *)(puVar3 + 0x30) ==
            (*(uint *)(puVar3 + 0x2c) + *(uint *)(puVar3 + 0x28) ^ 0x3edd3b2d)) {
          iVar4 = (*(uint *)(puVar3 + 0x2c) ^ *(uint *)(puVar3 + 0x28)) * 5;
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          iVar4 = 0;
        }
        iVar1 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
        iVar2 = iVar2 + iVar4 + iVar1 * 0x22;
      }
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      iVar2 = 0;
    }
  }
  param3 = (char *)GameMsg::Get(0x45,2);
  sprintf(local_78,"%d%% %s",iVar2,param3);
  plVar5 = *(long **)(this + 0x450);
  pcVar8 = *(code **)(*plVar5 + 0x580);
  local_88 = 0;
  local_80 = (void *)0x0;
  local_90 = 0;
  __n = strlen(local_78);
  if (0xffffffffffffffef < __n) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (__n < 0x17) {
    __dest = (void *)((ulong)&local_90 | 1);
    local_90 = CONCAT71(local_90._1_7_,(char)(__n << 1));
    if (__n != 0) goto LAB_00482e24;
  }
  else {
    uVar6 = __n + 0x10 & 0xfffffffffffffff0;
    __dest = operator_new(uVar6);
    local_90 = uVar6 | 1;
    local_88 = __n;
    local_80 = __dest;
LAB_00482e24:
    memcpy(__dest,local_78,__n);
  }
  *(undefined1 *)((long)__dest + __n) = 0;
                    /* try { // try from 00482e38 to 00482e43 has its CatchHandler @ 00482ff0 */
  (*pcVar8)(plVar5,&local_90);
  if ((local_90 & 1) != 0) {
    operator_delete(local_80);
  }
  iVar2 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
  plVar5 = *(long **)(this + 0x428);
  if (iVar2 == 1) {
    (**(code **)(*plVar5 + 0x80))(DAT_009c57b4,plVar5);
    (**(code **)(**(long **)(this + 0x428) + 0x4c0))(*(long **)(this + 0x428),PTR_WHITE_00c437b0);
    pcVar8 = *(code **)(**(long **)(this + 0x430) + 0x80);
LAB_00482f24:
    (*pcVar8)(DAT_009c4890);
    (**(code **)(**(long **)(this + 0x430) + 0x4c0))(*(long **)(this + 0x430),PTR_GRAY_00c41738);
    pcVar8 = *(code **)(**(long **)(this + 0x438) + 0x80);
    if (iVar2 == 3) {
      (*pcVar8)(DAT_009c57b4);
      plVar5 = *(long **)(this + 0x438);
      pcVar8 = *(code **)(*plVar5 + 0x4c0);
      puVar3 = PTR_WHITE_00c437b0;
      goto LAB_00482fa4;
    }
  }
  else {
    (**(code **)(*plVar5 + 0x80))(DAT_009c4890,plVar5);
    (**(code **)(**(long **)(this + 0x428) + 0x4c0))(*(long **)(this + 0x428),PTR_GRAY_00c41738);
    pcVar8 = *(code **)(**(long **)(this + 0x430) + 0x80);
    if (iVar2 != 2) goto LAB_00482f24;
    (*pcVar8)(DAT_009c57b4);
    (**(code **)(**(long **)(this + 0x430) + 0x4c0))(*(long **)(this + 0x430),PTR_WHITE_00c437b0);
    pcVar8 = *(code **)(**(long **)(this + 0x438) + 0x80);
  }
  (*pcVar8)(DAT_009c4890);
  plVar5 = *(long **)(this + 0x438);
  pcVar8 = *(code **)(*plVar5 + 0x4c0);
  puVar3 = PTR_GRAY_00c41738;
LAB_00482fa4:
  (*pcVar8)(plVar5,puVar3);
  this_00 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
  User::Ready(this_00,false);
  if (lVar7 != local_58) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::UpdateProgress
###########################################################################

========================================
FUNCTION: FrameMove
ADDRESS: 004d24dc
========================================

/* PlayService::FrameMove(float) */

void PlayService::FrameMove(float param_1)

{
  undefined *puVar1;
  long in_x0;
  ulong uVar2;
  char *pcVar3;
  uchar *puVar4;
  
  if (*(int *)(in_x0 + 0x20) == 4) {
    JNI_CloudConnect();
    *(undefined4 *)(in_x0 + 0x20) = 5;
  }
  else {
    puVar4 = *(uchar **)(in_x0 + 0x28);
    if (puVar4 != (uchar *)0x0) {
      if (*(char *)(in_x0 + 0x39) == '\0') {
        PTR_g_Common_00c44818[0x30] = 0;
      }
      else {
        *(undefined1 *)(in_x0 + 0x39) = 0;
      }
      puVar1 = PTR_g_UserData_00c41478;
      uVar2 = UserData::LoadFromData
                        ((UserData *)PTR_g_UserData_00c41478,puVar4,*(int *)(in_x0 + 0x30),true);
      if ((uVar2 & 1) == 0) {
        pcVar3 = (char *)GameMsg::Get(0x3e,0x1a);
        CommonSystem::ShowSystemMsg(pcVar3,false);
      }
      else {
        pcVar3 = (char *)GameMsg::Get(0x3e,8);
        CommonSystem::ShowSystemMsg(pcVar3,false);
        if (*(MainMenuScene **)PTR_g_main_menu_00c40e40 != (MainMenuScene *)0x0) {
          MainMenuScene::UpdateProgress(*(MainMenuScene **)PTR_g_main_menu_00c40e40);
        }
        if (*(uint *)(puVar1 + 0xb4) ==
            (*(int *)(puVar1 + 0xb0) + *(int *)(puVar1 + 0xac) ^ 0x3edd3b2dU)) {
          if (*(int *)(puVar1 + 0xb0) != *(int *)(puVar1 + 0xac)) {
            UserData::ShowExpendSlot(SUB81(PTR_g_UserData_00c41478,0));
          }
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
        }
        UserData::Save((UserData *)PTR_g_UserData_00c41478,false);
      }
      if (*(void **)(in_x0 + 0x28) != (void *)0x0) {
        operator_delete(*(void **)(in_x0 + 0x28));
      }
      *(undefined8 *)(in_x0 + 0x28) = 0;
    }
    if (*(int *)(in_x0 + 0x34) == 6) {
      *(undefined4 *)(in_x0 + 0x34) = 0;
      CheckAchievement();
      return;
    }
  }
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::UpdateProgress
###########################################################################

========================================
FUNCTION: MenuCallback
ADDRESS: 004db618
========================================

/* SettingLayer::MenuCallback(cocos2d::Ref*) */

void __thiscall SettingLayer::MenuCallback(SettingLayer *this,Ref *param_1)

{
  undefined *puVar1;
  int iVar2;
  uint uVar3;
  ulong uVar4;
  long *plVar5;
  char *pcVar6;
  undefined8 uVar7;
  code *UNRECOVERED_JUMPTABLE;
  
  if (PTR_g_Common_00c44818[0x30] == '\0') {
    iVar2 = (**(code **)(*(long *)param_1 + 0x2b8))(param_1);
    uVar4 = (**(code **)(**(long **)(this + 0x3b8) + 0x178))(*(long **)(this + 0x3b8));
    if ((uVar4 & 1) != 0) {
      if (iVar2 != 7) {
        if (iVar2 != 6) {
          return;
        }
        UserData::ManualReset((UserData *)PTR_g_UserData_00c41478);
        if (*(MainMenuScene **)PTR_g_main_menu_00c40e40 != (MainMenuScene *)0x0) {
          MainMenuScene::UpdateProgress(*(MainMenuScene **)PTR_g_main_menu_00c40e40);
        }
      }
      plVar5 = *(long **)(this + 0x3b8);
      uVar7 = 0;
      UNRECOVERED_JUMPTABLE = *(code **)(*plVar5 + 0x170);
LAB_004db6a4:
                    /* WARNING: Could not recover jumptable at 0x004db6ac. Too many branches */
                    /* WARNING: Treating indirect jump as call */
      (*UNRECOVERED_JUMPTABLE)(plVar5,uVar7);
      return;
    }
    if (iVar2 == 9) {
      CheckCoupon(this);
    }
    else if (iVar2 == 10) {
      (**(code **)(**(long **)(this + 0x3a0) + 0x170))(*(long **)(this + 0x3a0),0);
    }
    uVar3 = (**(code **)(**(long **)(this + 0x3a0) + 0x178))();
    if ((uVar3 & 1) == 0) {
      switch(iVar2) {
      case 0:
        MainMenuScene::MenuProc(*(MainMenuScene **)PTR_g_main_menu_00c40e40,9);
        return;
      case 3:
        if (*(uint *)(PTR_g_UserData_00c41478 + 0x78) ==
            (*(uint *)(PTR_g_UserData_00c41478 + 0x74) + *(uint *)(PTR_g_UserData_00c41478 + 0x70) ^
            0x3edd3b2d)) {
          if (4 < (int)(*(uint *)(PTR_g_UserData_00c41478 + 0x74) ^
                       *(uint *)(PTR_g_UserData_00c41478 + 0x70))) {
            if (((*PTR_ins_00c40c88 & 1) == 0) &&
               (iVar2 = __cxa_guard_acquire(PTR_ins_00c40c88), puVar1 = PTR_ins_00c40c90, iVar2 != 0
               )) {
              *(undefined8 *)(PTR_ins_00c40c90 + 0x28) = 0;
              *(undefined4 *)(puVar1 + 0x34) = 0;
              *(undefined2 *)(puVar1 + 0x38) = 0;
              *(undefined2 *)(puVar1 + 4) = 0;
              *(undefined4 *)puVar1 = 0;
              *(undefined4 *)(puVar1 + 0x20) = 0;
              *(undefined8 *)(puVar1 + 0x10) = 0;
              *(undefined8 *)(puVar1 + 0x18) = 0;
              *(undefined8 *)(puVar1 + 8) = 0;
              __cxa_atexit(PTR__PlayService_00c40a30,puVar1,PTR_DAT_00c41ab0);
              __cxa_guard_release(PTR_ins_00c40c88);
            }
            PlayService::SaveCloud((PlayService *)PTR_ins_00c40c90,false);
            return;
          }
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
        }
        uVar7 = 0xb;
LAB_004db888:
        pcVar6 = (char *)GameMsg::Get(0x3e,uVar7);
        CommonSystem::ShowSystemMsg(pcVar6,false);
        return;
      case 4:
        if (*(uint *)(PTR_g_UserData_00c41478 + 0x78) ==
            (*(uint *)(PTR_g_UserData_00c41478 + 0x74) + *(uint *)(PTR_g_UserData_00c41478 + 0x70) ^
            0x3edd3b2d)) {
          if (4 < (int)(*(uint *)(PTR_g_UserData_00c41478 + 0x74) ^
                       *(uint *)(PTR_g_UserData_00c41478 + 0x70))) {
            uVar7 = 9;
            goto LAB_004db888;
          }
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
        }
        if (((*PTR_ins_00c40c88 & 1) == 0) &&
           (iVar2 = __cxa_guard_acquire(PTR_ins_00c40c88), puVar1 = PTR_ins_00c40c90, iVar2 != 0)) {
          *(undefined8 *)(PTR_ins_00c40c90 + 0x28) = 0;
          *(undefined4 *)(puVar1 + 0x34) = 0;
          *(undefined2 *)(puVar1 + 0x38) = 0;
          *(undefined2 *)(puVar1 + 4) = 0;
          *(undefined4 *)puVar1 = 0;
          *(undefined4 *)(puVar1 + 0x20) = 0;
          *(undefined8 *)(puVar1 + 0x10) = 0;
          *(undefined8 *)(puVar1 + 0x18) = 0;
          *(undefined8 *)(puVar1 + 8) = 0;
          __cxa_atexit(PTR__PlayService_00c40a30,puVar1,PTR_DAT_00c41ab0);
          __cxa_guard_release(PTR_ins_00c40c88);
        }
        PlayService::LoadCloud((PlayService *)PTR_ins_00c40c90,false);
        return;
      case 5:
        plVar5 = *(long **)(this + 0x3b8);
        uVar7 = 1;
        UNRECOVERED_JUMPTABLE = *(code **)(*plVar5 + 0x170);
        goto LAB_004db6a4;
      case 8:
        (**(code **)(**(long **)(this + 0x3a0) + 0x170))(*(long **)(this + 0x3a0),1);
        UserData::Save((UserData *)PTR_g_UserData_00c41478,true);
        return;
      }
    }
  }
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::UpdateProgress
###########################################################################

========================================
FUNCTION: onHttpRequestCompleted
ADDRESS: 004dc060
========================================

/* SettingLayer::onHttpRequestCompleted(cocos2d::network::HttpClient*,
   cocos2d::network::HttpResponse*) */

void __thiscall
SettingLayer::onHttpRequestCompleted(SettingLayer *this,HttpClient *param_1,HttpResponse *param_2)

{
  uint uVar1;
  uint uVar2;
  uint uVar3;
  void *__src;
  char cVar4;
  undefined *puVar5;
  undefined *puVar6;
  undefined5 uVar7;
  undefined8 uVar8;
  uint uVar9;
  uint uVar10;
  uint uVar11;
  int iVar12;
  char *pcVar13;
  TimeGMT *pTVar14;
  User *this_00;
  EquipItem *pEVar15;
  long lVar16;
  uint uVar17;
  TimeGMT TVar18;
  uint uVar19;
  size_t sVar20;
  byte bVar21;
  long lVar22;
  TimeGMT aTStack_1c0 [16];
  TimeGMT local_1b0 [24];
  undefined8 local_198;
  int local_190 [4];
  TimeGMT local_180 [4];
  undefined1 uStack_17c;
  undefined1 uStack_178;
  char local_80 [24];
  long local_68;
  
  puVar6 = PTR_g_Common_00c44818;
  lVar22 = *(long *)PTR___stack_chk_guard_00c419a0;
  PTR_g_Common_00c44818[0x30] = 0;
  local_68 = lVar22;
  if (param_2 == (HttpResponse *)0x0) {
LAB_004dc108:
    *(undefined4 *)(puVar6 + 0x54) = 0x15;
  }
  else {
    iVar12 = *(int *)(param_2 + 0x68);
    if ((iVar12 != 200) || (param_2[0x30] == (HttpResponse)0x0)) {
      *(undefined4 *)(puVar6 + 0x54) = 0x15;
      pcVar13 = (char *)MyUtil::IntToStr(iVar12);
      if (lVar22 == local_68) {
        cocos2d::MessageBox("http err",pcVar13);
        return;
      }
      goto LAB_004dcca0;
    }
    __src = *(void **)(param_2 + 0x50);
    sVar20 = *(long *)(param_2 + 0x58) - (long)__src;
    pcVar13 = operator_new__(sVar20 + 1);
    pcVar13[sVar20] = '\0';
    memcpy(pcVar13,__src,sVar20);
    TimeGMT::TimeGMT((TimeGMT *)local_190,pcVar13);
    operator_delete__(pcVar13);
    iVar12 = local_190[0] + -2000;
    uVar10 = local_190[0] - 0x7e1;
    local_190[0] = iVar12;
    if (0x21 < uVar10) goto LAB_004dc108;
    pcVar13 = (char *)cocos2d::ui::EditBox::getText(*(EditBox **)(this + 0x3b0));
    sVar20 = strlen(pcVar13);
    uVar8 = local_198;
    if (sVar20 != 0x10) {
LAB_004dcc6c:
      local_198 = uVar8;
      *(undefined4 *)(puVar6 + 0x54) = 0x12;
      goto LAB_004dcc74;
    }
    local_198 = 0;
    local_80[0x10] = 0;
    local_80[0] = '\0';
    local_80[1] = '\0';
    local_80[2] = '\0';
    local_80[3] = '\0';
    local_80[4] = '\0';
    local_80[5] = '\0';
    local_80[6] = '\0';
    local_80[7] = '\0';
    local_80[8] = '\0';
    local_80[9] = '\0';
    local_80[10] = '\0';
    local_80[0xb] = '\0';
    local_80[0xc] = '\0';
    local_80[0xd] = '\0';
    local_80[0xe] = '\0';
    local_80[0xf] = '\0';
    CHidingString::MakeStr
              ((CHidingString *)PTR_g_HideStr_00c42a40,local_80,0x3e,0x3c,0x3a,0x38,0x36,0x34,0x30,
               0x2a,0x26,0x20,0x1c,0x1a,0x18,0x12,0x10,0xe,10);
    puVar5 = PTR_g_UserData_00c41478;
    lVar16 = 0;
    pcVar13 = pcVar13 + 1;
    do {
      cVar4 = pcVar13[-1];
      if (local_80[0] == cVar4) {
        TVar18 = (TimeGMT)0x0;
      }
      else if (local_80[1] == cVar4) {
        TVar18 = (TimeGMT)0x10;
      }
      else if (local_80[2] == cVar4) {
        TVar18 = (TimeGMT)0x20;
      }
      else if (local_80[3] == cVar4) {
        TVar18 = (TimeGMT)0x30;
      }
      else if (local_80[4] == cVar4) {
        TVar18 = (TimeGMT)0x40;
      }
      else if (local_80[5] == cVar4) {
        TVar18 = (TimeGMT)0x50;
      }
      else if (local_80[6] == cVar4) {
        TVar18 = (TimeGMT)0x60;
      }
      else if (local_80[7] == cVar4) {
        TVar18 = (TimeGMT)0x70;
      }
      else if (local_80[8] == cVar4) {
        TVar18 = (TimeGMT)0x80;
      }
      else if (local_80[9] == cVar4) {
        TVar18 = (TimeGMT)0x90;
      }
      else if (local_80[10] == cVar4) {
        TVar18 = (TimeGMT)0xa0;
      }
      else if (local_80[0xb] == cVar4) {
        TVar18 = (TimeGMT)0xb0;
      }
      else if (local_80[0xc] == cVar4) {
        TVar18 = (TimeGMT)0xc0;
      }
      else if (local_80[0xd] == cVar4) {
        TVar18 = (TimeGMT)0xd0;
      }
      else if (local_80[0xe] == cVar4) {
        TVar18 = (TimeGMT)0xe0;
      }
      else {
        TVar18 = (TimeGMT)0xf0;
        if (local_80[0xf] != cVar4) {
          TVar18 = (TimeGMT)0x0;
        }
      }
      cVar4 = *pcVar13;
      if (local_80[0] == cVar4) {
        bVar21 = 0;
LAB_004dc448:
        TVar18 = (TimeGMT)(bVar21 | (byte)TVar18);
      }
      else {
        if (local_80[1] == cVar4) {
          bVar21 = 1;
          goto LAB_004dc448;
        }
        if (local_80[2] == cVar4) {
          bVar21 = 2;
          goto LAB_004dc448;
        }
        if (local_80[3] == cVar4) {
          bVar21 = 3;
          goto LAB_004dc448;
        }
        if (local_80[4] == cVar4) {
          bVar21 = 4;
          goto LAB_004dc448;
        }
        if (local_80[5] == cVar4) {
          bVar21 = 5;
          goto LAB_004dc448;
        }
        if (local_80[6] == cVar4) {
          bVar21 = 6;
          goto LAB_004dc448;
        }
        if (local_80[7] == cVar4) {
          bVar21 = 7;
          goto LAB_004dc448;
        }
        if (local_80[8] == cVar4) {
          bVar21 = 8;
          goto LAB_004dc448;
        }
        if (local_80[9] == cVar4) {
          bVar21 = 9;
          goto LAB_004dc448;
        }
        if (local_80[10] == cVar4) {
          bVar21 = 10;
          goto LAB_004dc448;
        }
        if (local_80[0xb] == cVar4) {
          bVar21 = 0xb;
          goto LAB_004dc448;
        }
        if (local_80[0xc] == cVar4) {
          bVar21 = 0xc;
          goto LAB_004dc448;
        }
        if (local_80[0xd] == cVar4) {
          bVar21 = 0xd;
          goto LAB_004dc448;
        }
        if (local_80[0xe] == cVar4) {
          bVar21 = 0xe;
          goto LAB_004dc448;
        }
        if (local_80[0xf] == cVar4) {
          bVar21 = 0xf;
          goto LAB_004dc448;
        }
      }
      local_1b0[lVar16 + 0x18] = TVar18;
      uVar8 = local_198;
      lVar16 = lVar16 + 1;
      pcVar13 = pcVar13 + 2;
    } while (lVar16 != 8);
    uVar10 = local_198._5_1_ ^ 0x56;
    uVar9 = (uint)local_198._1_1_ ^ uVar10 + 1;
    uVar17 = (uint)local_198._6_2_;
    uVar19 = (uint)(byte)local_198;
    uVar11 = uVar19 ^ uVar10;
    uVar1 = (uint)local_198._2_1_ ^ uVar10 + 2;
    uVar2 = (uint)local_198._3_1_ ^ uVar10 + 3;
    uVar3 = (uint)local_198._4_1_ ^ uVar10 + 4;
    local_198._0_3_ = CONCAT12((char)uVar1,CONCAT11((char)uVar9,(char)uVar11));
    local_198._5_3_ = SUB83(uVar8,5);
    local_198._0_5_ = CONCAT14((char)uVar3,CONCAT13((char)uVar2,(undefined3)local_198));
    uVar7 = (undefined5)local_198;
    uVar8 = local_198;
    if (uVar11 + (uVar9 & 0xff) + (uVar1 & 0xff) + (uVar2 & 0xff) + (uVar3 & 0xff) !=
        (uVar17 ^ 0x4a7c)) goto LAB_004dcc6c;
    if (uVar11 < 0x65) {
      if (*(uint *)(PTR_g_UserData_00c41478 + 0x78) ==
          (*(uint *)(PTR_g_UserData_00c41478 + 0x74) + *(uint *)(PTR_g_UserData_00c41478 + 0x70) ^
          0x3edd3b2d)) {
        if (4 < (int)(*(uint *)(PTR_g_UserData_00c41478 + 0x74) ^
                     *(uint *)(PTR_g_UserData_00c41478 + 0x70))) {
          TimeGMT::TimeGMT(local_180,uVar9 & 0xff,uVar1 & 0xff,uVar2 & 0xff,0);
          TimeGMT::AddDay(local_1b0,uVar3 & 0xff);
          uVar9 = TimeGMT::operator<(local_1b0,(TimeGMT *)local_190);
          if ((uVar9 & 1) == 0) {
            uVar9 = TimeGMT::operator<((TimeGMT *)local_190,local_180);
            if ((uVar9 & 1) == 0) {
              TimeGMT::TimeGMT(aTStack_1c0,(uint)(byte)puVar5[0xf4],(uint)(byte)puVar5[0xf5],
                               (uint)(byte)puVar5[0xf6],0);
              uVar9 = TimeGMT::operator<(aTStack_1c0,local_180);
              if ((uVar9 & 1) != 0) {
                uVar9 = uVar11 * 10;
                *(TimeGMT *)(puVar5 + 0xf4) = local_180[0];
                puVar5[0xf5] = uStack_17c;
                puVar5[0xf6] = uStack_178;
                if (uVar19 != uVar10) goto switchD_004dc5c8_caseD_65;
                goto switchD_004dc5c8_default;
              }
              *(undefined4 *)(puVar6 + 0x54) = 0x13;
            }
            else {
              *(undefined4 *)(puVar6 + 0x54) = 0x16;
            }
          }
          else {
            *(undefined4 *)(puVar6 + 0x54) = 0x11;
          }
          goto LAB_004dcc74;
        }
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
      }
      *(undefined4 *)(puVar6 + 0x54) = 0xb;
      goto LAB_004dcc74;
    }
    local_198._3_2_ = SUB52(uVar7,3);
    local_198 = uVar8;
    if (uVar11 < 0x6a) {
      uVar10 = (uint)local_198._1_2_;
      uVar9 = (uint)local_198._3_2_;
      uVar10 = UserData::CheckCouponID((UserData *)PTR_g_UserData_00c41478,uVar10,uVar9);
      puVar5 = PTR_g_UserData_00c41478;
      if ((uVar10 & 1) == 0) {
LAB_004dc6c4:
        *(undefined4 *)(puVar6 + 0x54) = 0x14;
        goto LAB_004dcc74;
      }
      UserData::MakeCouponID((UserData *)PTR_g_UserData_00c41478);
      SetCouponID(this);
      uVar9 = 100;
      switch(uVar11) {
      case 0x65:
        break;
      case 0x66:
        uVar9 = 0x226;
        break;
      case 0x67:
        uVar9 = 0x960;
        break;
      case 0x68:
        uVar9 = 13000;
        break;
      case 0x69:
        uVar10 = rand();
        *(uint *)(puVar5 + 0xac) = uVar10 ^ 1;
        *(uint *)(puVar5 + 0xb0) = uVar10;
        *(uint *)(puVar5 + 0xb4) = (uVar10 ^ 1) + uVar10 ^ 0x3edd3b2d;
        UserData::ShowExpendSlot(SUB81(puVar5,0));
        if (*(uint *)(puVar5 + 0x9c) ==
            (*(uint *)(puVar5 + 0x98) + *(uint *)(puVar5 + 0x94) ^ 0x3edd3b2d)) {
          uVar10 = (*(uint *)(puVar5 + 0x98) ^ *(uint *)(puVar5 + 0x94)) + 500;
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar10 = 500;
        }
        uVar9 = rand();
        *(uint *)(puVar5 + 0x94) = uVar9 ^ uVar10;
        *(uint *)(puVar5 + 0x98) = uVar9;
        *(uint *)(puVar5 + 0x9c) = (uVar9 ^ uVar10) + uVar9 ^ 0x3edd3b2d;
        pTVar14 = (TimeGMT *)GameMsg::Get(0x3e,0x1b);
        goto LAB_004dc964;
      default:
        goto switchD_004dc5c8_default;
      }
switchD_004dc5c8_caseD_65:
      puVar6 = PTR_g_UserData_00c41478;
      if (*(uint *)(PTR_g_UserData_00c41478 + 0x9c) ==
          (*(uint *)(PTR_g_UserData_00c41478 + 0x98) + *(uint *)(PTR_g_UserData_00c41478 + 0x94) ^
          0x3edd3b2d)) {
        uVar10 = *(uint *)(PTR_g_UserData_00c41478 + 0x98) ^
                 *(uint *)(PTR_g_UserData_00c41478 + 0x94);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar10 = 0;
      }
      uVar11 = rand();
      uVar10 = uVar11 ^ uVar10 + uVar9;
      *(uint *)(puVar6 + 0x94) = uVar10;
      *(uint *)(puVar6 + 0x98) = uVar11;
      *(uint *)(puVar6 + 0x9c) = uVar10 + uVar11 ^ 0x3edd3b2d;
      memset(local_180,0,0x100);
      pcVar13 = (char *)GameMsg::Get(0x3e,0x10);
      sprintf((char *)local_180,pcVar13,(ulong)uVar9);
      pTVar14 = local_180;
LAB_004dc964:
      CommonSystem::ShowSystemMsg((char *)pTVar14,false);
    }
    else {
      if (0x59 < (uVar11 + 0x69 & 0xff)) goto LAB_004dcc6c;
      uVar10 = (uint)local_198._1_2_;
      uVar9 = (uint)local_198._3_2_;
      uVar10 = UserData::CheckCouponID((UserData *)PTR_g_UserData_00c41478,uVar10,uVar9);
      if ((uVar10 & 1) == 0) goto LAB_004dc6c4;
      if (uVar11 < 0xb0) {
        uVar10 = rand();
        *(uint *)(puVar5 + 0x10) = uVar10 ^ 1;
        *(uint *)(puVar5 + 0x14) = uVar10;
        *(uint *)(puVar5 + 0x18) = (uVar10 ^ 1) + uVar10 ^ 0x3edd3b2d;
        uVar9 = rand();
        uVar10 = uVar9 ^ (int)(uVar11 - 0x97) % 5 + 1U;
        *(uint *)(puVar5 + 0x1c) = uVar10;
        *(uint *)(puVar5 + 0x20) = uVar9;
        *(uint *)(puVar5 + 0x24) = uVar10 + uVar9 ^ 0x3edd3b2d;
        uVar9 = rand();
        uVar10 = uVar9 ^ (int)(uVar11 - 0x97) / 5 + 1U;
        *(uint *)(puVar5 + 0x28) = uVar10;
        *(uint *)(puVar5 + 0x2c) = uVar9;
        *(uint *)(puVar5 + 0x30) = uVar10 + uVar9 ^ 0x3edd3b2d;
        uVar10 = (int)((float)(int)(uVar11 - 0x96) / 1.25) + 1;
LAB_004dca68:
        uVar9 = rand();
        *(uint *)(puVar5 + 0x74) = uVar9;
        uVar10 = uVar9 ^ uVar10;
      }
      else if (uVar11 - 0xb4 == 0) {
        uVar10 = rand();
        *(uint *)(puVar5 + 0x10) = uVar10 ^ 2;
        *(uint *)(puVar5 + 0x14) = uVar10;
        *(uint *)(puVar5 + 0x18) = (uVar10 ^ 2) + uVar10 ^ 0x3edd3b2d;
        uVar10 = rand();
        *(uint *)(puVar5 + 0x1c) = uVar10 ^ 1;
        *(uint *)(puVar5 + 0x20) = uVar10;
        *(uint *)(puVar5 + 0x24) = (uVar10 ^ 1) + uVar10 ^ 0x3edd3b2d;
        iVar12 = rand();
        *(int *)(puVar5 + 0x28) = iVar12;
        *(int *)(puVar5 + 0x2c) = iVar12;
        *(uint *)(puVar5 + 0x30) = iVar12 << 1 ^ 0x3edd3b2d;
        uVar9 = rand();
        *(uint *)(puVar5 + 0x74) = uVar9;
        uVar10 = uVar9 ^ 0x15;
      }
      else {
        if (uVar11 < 0xce) {
          uVar10 = rand();
          *(uint *)(puVar5 + 0x10) = uVar10 ^ 2;
          *(uint *)(puVar5 + 0x14) = uVar10;
          *(uint *)(puVar5 + 0x18) = (uVar10 ^ 2) + uVar10 ^ 0x3edd3b2d;
          uVar9 = rand();
          uVar10 = uVar9 ^ (int)(uVar11 - 0xb5) % 5 + 1U;
          *(uint *)(puVar5 + 0x1c) = uVar10;
          *(uint *)(puVar5 + 0x20) = uVar9;
          *(uint *)(puVar5 + 0x24) = uVar10 + uVar9 ^ 0x3edd3b2d;
          uVar9 = rand();
          uVar10 = uVar9 ^ (int)(uVar11 - 0xb5) / 5 + 1U;
          *(uint *)(puVar5 + 0x28) = uVar10;
          *(uint *)(puVar5 + 0x2c) = uVar9;
          *(uint *)(puVar5 + 0x30) = uVar10 + uVar9 ^ 0x3edd3b2d;
          uVar10 = (int)((float)(int)(uVar11 - 0xb4) / 1.25) + 0x15;
          goto LAB_004dca68;
        }
        if (uVar11 - 0xd2 == 0) {
          uVar10 = rand();
          *(uint *)(puVar5 + 0x10) = uVar10 ^ 3;
          *(uint *)(puVar5 + 0x14) = uVar10;
          *(uint *)(puVar5 + 0x18) = (uVar10 ^ 3) + uVar10 ^ 0x3edd3b2d;
          uVar10 = rand();
          *(uint *)(puVar5 + 0x1c) = uVar10 ^ 1;
          *(uint *)(puVar5 + 0x20) = uVar10;
          *(uint *)(puVar5 + 0x24) = (uVar10 ^ 1) + uVar10 ^ 0x3edd3b2d;
          iVar12 = rand();
          *(int *)(puVar5 + 0x28) = iVar12;
          *(int *)(puVar5 + 0x2c) = iVar12;
          *(uint *)(puVar5 + 0x30) = iVar12 << 1 ^ 0x3edd3b2d;
          uVar9 = rand();
          *(uint *)(puVar5 + 0x74) = uVar9;
          uVar10 = uVar9 ^ 0x28;
        }
        else {
          if (uVar11 < 0xec) {
            uVar10 = rand();
            *(uint *)(puVar5 + 0x10) = uVar10 ^ 3;
            *(uint *)(puVar5 + 0x14) = uVar10;
            *(uint *)(puVar5 + 0x18) = (uVar10 ^ 3) + uVar10 ^ 0x3edd3b2d;
            uVar9 = rand();
            uVar10 = uVar9 ^ (int)(uVar11 - 0xd3) % 5 + 1U;
            *(uint *)(puVar5 + 0x1c) = uVar10;
            *(uint *)(puVar5 + 0x20) = uVar9;
            *(uint *)(puVar5 + 0x24) = uVar10 + uVar9 ^ 0x3edd3b2d;
            uVar9 = rand();
            uVar10 = uVar9 ^ (int)(uVar11 - 0xd3) / 5 + 1U;
            *(uint *)(puVar5 + 0x28) = uVar10;
            *(uint *)(puVar5 + 0x2c) = uVar9;
            *(uint *)(puVar5 + 0x30) = uVar10 + uVar9 ^ 0x3edd3b2d;
            uVar10 = (int)((float)(int)(uVar11 - 0xd2) / 1.25) + 0x28;
            goto LAB_004dca68;
          }
          uVar8 = local_198;
          if (uVar11 != 0xf0) goto LAB_004dcc6c;
          uVar10 = rand();
          *(uint *)(puVar5 + 4) = uVar10 ^ 1;
          *(uint *)(puVar5 + 8) = uVar10;
          *(uint *)(puVar5 + 0xc) = (uVar10 ^ 1) + uVar10 ^ 0x3edd3b2d;
          uVar10 = rand();
          *(uint *)(puVar5 + 0x10) = uVar10 ^ 3;
          *(uint *)(puVar5 + 0x14) = uVar10;
          *(uint *)(puVar5 + 0x18) = (uVar10 ^ 3) + uVar10 ^ 0x3edd3b2d;
          uVar10 = rand();
          *(uint *)(puVar5 + 0x28) = uVar10 ^ 5;
          *(uint *)(puVar5 + 0x2c) = uVar10;
          *(uint *)(puVar5 + 0x30) = (uVar10 ^ 5) + uVar10 ^ 0x3edd3b2d;
          uVar10 = rand();
          *(uint *)(puVar5 + 0x1c) = uVar10 ^ 5;
          *(uint *)(puVar5 + 0x20) = uVar10;
          *(uint *)(puVar5 + 0x24) = (uVar10 ^ 5) + uVar10 ^ 0x3edd3b2d;
          uVar9 = rand();
          *(uint *)(puVar5 + 0x74) = uVar9;
          uVar10 = uVar9 ^ 0x3c;
        }
      }
      *(uint *)(puVar5 + 0x70) = uVar10;
      *(uint *)(puVar5 + 0x78) = uVar10 + uVar9 ^ 0x3edd3b2d;
      iVar12 = rand();
      *(int *)(puVar5 + 0x34) = iVar12;
      *(int *)(puVar5 + 0x38) = iVar12;
      *(uint *)(puVar5 + 0x3c) = iVar12 << 1 ^ 0x3edd3b2d;
      iVar12 = rand();
      *(int *)(puVar5 + 0x40) = iVar12;
      *(int *)(puVar5 + 0x44) = iVar12;
      *(uint *)(puVar5 + 0x48) = iVar12 << 1 ^ 0x3edd3b2d;
      iVar12 = rand();
      *(int *)(puVar5 + 0x4c) = iVar12;
      *(int *)(puVar5 + 0x50) = iVar12;
      *(uint *)(puVar5 + 0x54) = iVar12 << 1 ^ 0x3edd3b2d;
      iVar12 = rand();
      *(int *)(puVar5 + 0x58) = iVar12;
      *(int *)(puVar5 + 0x5c) = iVar12;
      *(uint *)(puVar5 + 0x60) = iVar12 << 1 ^ 0x3edd3b2d;
      if (*(uint *)(puVar5 + 0x78) ==
          (*(uint *)(puVar5 + 0x74) + *(uint *)(puVar5 + 0x70) ^ 0x3edd3b2d)) {
        uVar10 = *(uint *)(puVar5 + 0x74) ^ *(uint *)(puVar5 + 0x70);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar10 = 0;
      }
      uVar9 = rand();
      *(uint *)(puVar5 + 100) = uVar9 ^ uVar10;
      *(uint *)(puVar5 + 0x68) = uVar9;
      *(uint *)(puVar5 + 0x6c) = (uVar9 ^ uVar10) + uVar9 ^ 0x3edd3b2d;
      iVar12 = 0;
      do {
        this_00 = (User *)User::Ins(puVar6[0x72]);
        pEVar15 = operator_new(0x580);
        if (*(uint *)(puVar5 + 0x18) ==
            (*(uint *)(puVar5 + 0x14) + *(uint *)(puVar5 + 0x10) ^ 0x3edd3b2d)) {
          uVar10 = *(uint *)(puVar5 + 0x14) ^ *(uint *)(puVar5 + 0x10);
        }
        else {
                    /* try { // try from 004dcb54 to 004dcbab has its CatchHandler @ 004dcca4 */
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar10 = 0;
        }
        if (*(uint *)(puVar5 + 0x30) ==
            (*(uint *)(puVar5 + 0x2c) + *(uint *)(puVar5 + 0x28) ^ 0x3edd3b2d)) {
          uVar9 = *(uint *)(puVar5 + 0x2c) ^ *(uint *)(puVar5 + 0x28);
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar9 = 0;
        }
        EquipItem::EquipItem(pEVar15,iVar12,uVar10,uVar9,4,1);
        User::Equip(this_00,pEVar15);
        iVar12 = iVar12 + 1;
      } while (iVar12 < 7);
      MainMenuScene::UpdateProgress(*(MainMenuScene **)PTR_g_main_menu_00c40e40);
    }
switchD_004dc5c8_default:
    CommonSystem::QuickSave();
    (**(code **)(**(long **)(this + 0x3a0) + 0x170))(*(long **)(this + 0x3a0),0);
  }
LAB_004dcc74:
  if (lVar22 == local_68) {
    return;
  }
LAB_004dcca0:
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: CommonSystem::Init
###########################################################################

========================================
FUNCTION: Init
ADDRESS: 00425b10
========================================

void CommonSystem::Init(void)

{
  (*(code *)PTR_Init_00c40470)();
  return;
}


###########################################################################
# SEARCH TARGET: CommonSystem::Init
###########################################################################

========================================
FUNCTION: applicationDidFinishLaunching
ADDRESS: 00447e54
========================================

/* AppDelegate::applicationDidFinishLaunching() */

undefined8 AppDelegate::applicationDidFinishLaunching(void)

{
  undefined *puVar1;
  int iVar2;
  Director *this;
  Scene *pSVar3;
  GLView *pGVar4;
  long lVar5;
  undefined1 auStack_58 [8];
  basic_string local_50;
  undefined7 uStack_4f;
  char cStack_48;
  undefined7 uStack_47;
  char cStack_40;
  undefined1 uStack_3f;
  undefined6 uStack_3e;
  long local_38;
  
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar5;
  this = (Director *)cocos2d::Director::getInstance();
  pGVar4 = *(GLView **)(this + 0x108);
  if (pGVar4 == (GLView *)0x0) {
    uStack_3e = 0;
    local_50 = (basic_string)0x20;
    uStack_47 = s_NecromancerStory_009c471a._8_7_;
    cStack_40 = s_NecromancerStory_009c471a[0xf];
    uStack_4f = s_NecromancerStory_009c471a._0_7_;
    cStack_48 = s_NecromancerStory_009c471a[7];
    uStack_3f = 0;
                    /* try { // try from 00447eac to 00447eb7 has its CatchHandler @ 00447fe4 */
    pGVar4 = (GLView *)cocos2d::GLViewImpl::create(&local_50);
    if (((byte)local_50 & 1) != 0) {
      operator_delete((void *)CONCAT62(uStack_3e,CONCAT11(uStack_3f,cStack_40)));
    }
    cocos2d::Director::setOpenGLView(this,pGVar4);
  }
  cocos2d::Director::setAnimationInterval(this,DAT_009c46e4);
  (**(code **)(*(long *)pGVar4 + 0xc0))(DAT_009c46e8,DAT_009c46ec,pGVar4,2);
  (**(code **)(*(long *)pGVar4 + 0x48))(auStack_58,pGVar4);
  CommonSystem::Init();
  if (((*PTR_ins_00c40c88 & 1) == 0) &&
     (iVar2 = __cxa_guard_acquire(PTR_ins_00c40c88), puVar1 = PTR_ins_00c40c90, iVar2 != 0)) {
    *(undefined8 *)(PTR_ins_00c40c90 + 0x28) = 0;
    *(undefined4 *)(puVar1 + 0x34) = 0;
    *(undefined2 *)(puVar1 + 0x38) = 0;
    *(undefined2 *)(puVar1 + 4) = 0;
    *(undefined4 *)puVar1 = 0;
    *(undefined4 *)(puVar1 + 0x20) = 0;
    *(undefined8 *)(puVar1 + 0x10) = 0;
    *(undefined8 *)(puVar1 + 0x18) = 0;
    *(undefined8 *)(puVar1 + 8) = 0;
    __cxa_atexit(PTR__PlayService_00c40a30,puVar1,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_ins_00c40c88);
  }
  PlayService::Login((PlayService *)PTR_ins_00c40c90);
  UserData::Init((UserData *)PTR_g_UserData_00c41478);
  cocos2d::Device::setKeepScreenOn(true);
  pSVar3 = (Scene *)LogoScene::CreateScene();
  cocos2d::Director::runWithScene(this,pSVar3);
  if (lVar5 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: CommonSystem::Init
###########################################################################

========================================
FUNCTION: Init
ADDRESS: 00455670
========================================

/* CommonSystem::Init() */

void CommonSystem::Init(void)

{
  undefined4 uVar1;
  undefined4 uVar2;
  undefined4 uVar3;
  undefined *puVar4;
  undefined *puVar5;
  int iVar6;
  time_t tVar7;
  Layer *this;
  SpriteFrameCache *this_00;
  Director *this_01;
  Size *pSVar8;
  Wait *this_02;
  long *plVar9;
  SquareBox *pSVar10;
  uint3 *puVar11;
  undefined8 uVar12;
  size_t sVar13;
  long lVar14;
  char *pcVar15;
  void *pvVar16;
  code *pcVar17;
  ulong uVar18;
  long lVar19;
  ulong local_1a8;
  size_t local_1a0;
  void *local_198;
  ulong local_190;
  size_t local_188;
  void *local_180;
  ulong local_178;
  size_t local_170;
  void *local_168;
  float local_160 [2];
  basic_string local_158;
  char acStack_157 [5];
  undefined2 uStack_152;
  char local_150;
  char acStack_14f [5];
  undefined1 uStack_14a;
  undefined1 uStack_149;
  void *local_148;
  float local_140 [2];
  basic_string local_138;
  char acStack_137 [5];
  undefined2 uStack_132;
  char local_130;
  char acStack_12f [5];
  undefined1 uStack_12a;
  undefined1 uStack_129;
  void *local_128;
  long alStack_120 [4];
  long *local_100;
  long alStack_f0 [4];
  long *local_d0;
  long alStack_c0 [4];
  long *local_a0;
  long local_88;
  
  lVar19 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_88 = lVar19;
  tVar7 = time((time_t *)0x0);
  srand((uint)tVar7);
  this = operator_new(800);
                    /* try { // try from 004556c0 to 004556c3 has its CatchHandler @ 00455cf8 */
  cocos2d::Layer::Layer(this);
  puVar5 = PTR_m_main_layer_00c44500;
  *(Layer **)PTR_m_main_layer_00c44500 = this;
  cocos2d::Ref::retain((Ref *)this);
  this_00 = (SpriteFrameCache *)cocos2d::SpriteFrameCache::getInstance();
  uStack_129 = 0;
  local_128 = (void *)0x0;
  local_138 = (basic_string)0x1a;
  acStack_12f[0] = s_img_img_plist_009c4c12[8];
  acStack_12f[1] = s_img_img_plist_009c4c12[9];
  acStack_12f[2] = s_img_img_plist_009c4c12[10];
  acStack_12f[3] = s_img_img_plist_009c4c12[0xb];
  acStack_12f[4] = s_img_img_plist_009c4c12[0xc];
  acStack_137[0] = s_img_img_plist_009c4c12[0];
  acStack_137[1] = s_img_img_plist_009c4c12[1];
  acStack_137[2] = s_img_img_plist_009c4c12[2];
  acStack_137[3] = s_img_img_plist_009c4c12[3];
  acStack_137[4] = s_img_img_plist_009c4c12[4];
  uStack_132 = s_img_img_plist_009c4c12._5_2_;
  local_130 = s_img_img_plist_009c4c12[7];
  uStack_12a = 0;
                    /* try { // try from 00455708 to 0045570f has its CatchHandler @ 00455cfc */
  cocos2d::SpriteFrameCache::addSpriteFramesWithFile(this_00,&local_138);
  if (((byte)local_138 & 1) != 0) {
    operator_delete(local_128);
  }
  this_01 = (Director *)cocos2d::Director::getInstance();
  pSVar8 = (Size *)cocos2d::Director::getWinSize(this_01);
  cocos2d::Size::Size((Size *)local_140,pSVar8);
  this_02 = operator_new(0x540);
                    /* try { // try from 00455740 to 00455743 has its CatchHandler @ 00455d18 */
  Effect::Wait::Wait(this_02);
  puVar4 = PTR_m_wait_sprite_00c41ff0;
  uVar1 = DAT_009c3d68;
  lVar14 = *(long *)this_02;
  *(Wait **)PTR_m_wait_sprite_00c41ff0 = this_02;
  uVar3 = DAT_009c4ba8;
  (**(code **)(lVar14 + 200))(uVar1,DAT_009c4ba8,this_02);
  (**(code **)(**(long **)puVar5 + 0x210))(*(long **)puVar5,*(undefined8 *)puVar4,0x65);
  uStack_149 = 0;
  local_148 = (void *)0x0;
  local_158 = (basic_string)0x1a;
  acStack_14f[0] = s_img_noise_png_009c4c20[8];
  acStack_14f[1] = s_img_noise_png_009c4c20[9];
  acStack_14f[2] = s_img_noise_png_009c4c20[10];
  acStack_14f[3] = s_img_noise_png_009c4c20[0xb];
  acStack_14f[4] = s_img_noise_png_009c4c20[0xc];
  acStack_157[0] = s_img_noise_png_009c4c20[0];
  acStack_157[1] = s_img_noise_png_009c4c20[1];
  acStack_157[2] = s_img_noise_png_009c4c20[2];
  acStack_157[3] = s_img_noise_png_009c4c20[3];
  acStack_157[4] = s_img_noise_png_009c4c20[4];
  uStack_152 = s_img_noise_png_009c4c20._5_2_;
  local_150 = s_img_noise_png_009c4c20[7];
  uStack_14a = 0;
                    /* try { // try from 004557bc to 004557c3 has its CatchHandler @ 00455d2c */
  plVar9 = (long *)cocos2d::Sprite::create(&local_158);
  puVar4 = PTR_m_noise_00c43fd8;
  *(long **)PTR_m_noise_00c43fd8 = plVar9;
  if (((byte)local_158 & 1) != 0) {
    operator_delete(local_148);
    plVar9 = *(long **)puVar4;
  }
  (**(code **)(*plVar9 + 0x148))(plVar9,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)puVar5 + 0x210))(*(long **)puVar5,*(undefined8 *)puVar4,100);
  plVar9 = (long *)AtlasMgr::GetImg("ui/triangle.png");
  puVar4 = PTR_m_skip_img_00c42f70;
  *(long **)PTR_m_skip_img_00c42f70 = plVar9;
  local_160[0] = local_140[0] * 0.5;
  local_160[1] = 50.0;
  (**(code **)(*plVar9 + 0x98))(plVar9,local_160);
  (**(code **)(**(long **)puVar4 + 0x180))(DAT_009c4bac);
  (**(code **)(**(long **)puVar4 + 0x80))(0x3f000000);
  (**(code **)(**(long **)puVar5 + 0x208))(*(long **)puVar5,*(undefined8 *)puVar4);
  pSVar10 = operator_new(0x530);
                    /* try { // try from 0045589c to 004558bb has its CatchHandler @ 00455cf4 */
  puVar11 = (uint3 *)GetColor(4);
  SquareBox::SquareBox(pSVar10,(ulong)*puVar11,0xff);
  puVar4 = PTR_m_fade_sprite_00c425c8;
  uVar2 = DAT_009c46e8;
  lVar14 = *(long *)pSVar10;
  *(SquareBox **)PTR_m_fade_sprite_00c425c8 = pSVar10;
  (**(code **)(lVar14 + 0x90))(uVar2,DAT_009c46ec,pSVar10);
  (**(code **)(**(long **)puVar4 + 200))(uVar1,uVar3);
  (**(code **)(**(long **)puVar5 + 0x210))(*(long **)puVar5,*(undefined8 *)puVar4,2);
  plVar9 = (long *)AtlasMgr::GetImg("ui/marker.png");
  puVar4 = PTR_m_marker_00c448d0;
  uVar1 = DAT_009c4bb0;
  *(long **)PTR_m_marker_00c448d0 = plVar9;
  (**(code **)(*plVar9 + 0x180))(uVar1);
  plVar9 = *(long **)puVar4;
  pcVar17 = *(code **)(*plVar9 + 0x4c0);
  uVar12 = GetColor(0xe);
  (*pcVar17)(plVar9,uVar12);
  (**(code **)(**(long **)puVar5 + 0x208))(*(long **)puVar5,*(undefined8 *)puVar4);
  Settings::Init((Settings *)PTR_g_Settings_00c440f0);
  ChangeLanguage();
  iVar6 = 0;
  do {
    sprintf(&DAT_00c66cb0,"effect/%d.ogg",iVar6);
    local_170 = 0;
    local_168 = (void *)0x0;
    local_178 = 0;
    sVar13 = strlen(&DAT_00c66cb0);
    if (0xffffffffffffffef < sVar13) {
                    /* WARNING: Subroutine does not return */
      std::__ndk1::__basic_string_common<true>::__throw_length_error();
    }
    if (sVar13 < 0x17) {
      local_178 = CONCAT71(local_178._1_7_,(char)(sVar13 << 1));
      pvVar16 = (void *)((ulong)&local_178 | 1);
      if (sVar13 != 0) goto LAB_00455a10;
    }
    else {
      uVar18 = sVar13 + 0x10 & 0xfffffffffffffff0;
      pvVar16 = operator_new(uVar18);
      local_178 = uVar18 | 1;
      local_170 = sVar13;
      local_168 = pvVar16;
LAB_00455a10:
      memcpy(pvVar16,&DAT_00c66cb0,sVar13);
    }
    *(undefined1 *)((long)pvVar16 + sVar13) = 0;
    local_d0 = (long *)0x0;
                    /* try { // try from 00455a28 to 00455a33 has its CatchHandler @ 00455ca8 */
    cocos2d::experimental::AudioEngine::preload(&local_178,alStack_f0);
    if (local_d0 == alStack_f0) {
      pcVar17 = *(code **)(*local_d0 + 0x20);
LAB_00455a58:
      (*pcVar17)();
    }
    else if (local_d0 != (long *)0x0) {
      pcVar17 = *(code **)(*local_d0 + 0x28);
      goto LAB_00455a58;
    }
    if ((local_178 & 1) != 0) {
      operator_delete(local_168);
    }
    iVar6 = iVar6 + 1;
  } while (iVar6 < 0x1e);
  pcVar15 = *(char **)PTR__str_bgm_main_00c42bd0;
  local_188 = 0;
  local_180 = (void *)0x0;
  local_190 = 0;
  sVar13 = strlen(pcVar15);
  if (0xffffffffffffffef < sVar13) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (sVar13 < 0x17) {
    pvVar16 = (void *)((ulong)&local_190 | 1);
    local_190 = CONCAT71(local_190._1_7_,(char)(sVar13 << 1));
    if (sVar13 != 0) goto LAB_00455ae0;
  }
  else {
    uVar18 = sVar13 + 0x10 & 0xfffffffffffffff0;
    pvVar16 = operator_new(uVar18);
    local_190 = uVar18 | 1;
    local_188 = sVar13;
    local_180 = pvVar16;
LAB_00455ae0:
    memcpy(pvVar16,pcVar15,sVar13);
  }
  *(undefined1 *)((long)pvVar16 + sVar13) = 0;
  local_100 = (long *)0x0;
                    /* try { // try from 00455af8 to 00455b07 has its CatchHandler @ 00455d50 */
  cocos2d::experimental::AudioEngine::preload(&local_190,alStack_120);
  if (local_100 == alStack_120) {
    pcVar17 = *(code **)(*local_100 + 0x20);
LAB_00455b2c:
    (*pcVar17)();
  }
  else if (local_100 != (long *)0x0) {
    pcVar17 = *(code **)(*local_100 + 0x28);
    goto LAB_00455b2c;
  }
  if ((local_190 & 1) != 0) {
    operator_delete(local_180);
  }
  pcVar15 = *(char **)PTR__str_bgm_battle_00c420d8;
  local_1a0 = 0;
  local_198 = (void *)0x0;
  local_1a8 = 0;
  sVar13 = strlen(pcVar15);
  if (0xffffffffffffffef < sVar13) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (sVar13 < 0x17) {
    pvVar16 = (void *)((ulong)&local_1a8 | 1);
    local_1a8 = CONCAT71(local_1a8._1_7_,(char)(sVar13 << 1));
    if (sVar13 != 0) goto LAB_00455ba8;
  }
  else {
    uVar18 = sVar13 + 0x10 & 0xfffffffffffffff0;
    pvVar16 = operator_new(uVar18);
    local_1a8 = uVar18 | 1;
    local_1a0 = sVar13;
    local_198 = pvVar16;
LAB_00455ba8:
    memcpy(pvVar16,pcVar15,sVar13);
  }
  *(undefined1 *)((long)pvVar16 + sVar13) = 0;
  local_a0 = (long *)0x0;
                    /* try { // try from 00455bc0 to 00455bcf has its CatchHandler @ 00455d74 */
  cocos2d::experimental::AudioEngine::preload(&local_1a8,alStack_c0);
  if (local_a0 == alStack_c0) {
    pcVar17 = *(code **)(*local_a0 + 0x20);
  }
  else {
    if (local_a0 == (long *)0x0) goto LAB_00455bf8;
    pcVar17 = *(code **)(*local_a0 + 0x28);
  }
  (*pcVar17)();
LAB_00455bf8:
  if ((local_1a8 & 1) != 0) {
    operator_delete(local_198);
  }
  if (((*PTR_gameMsg_00c44980 & 1) == 0) &&
     (iVar6 = __cxa_guard_acquire(PTR_gameMsg_00c44980), iVar6 != 0)) {
                    /* try { // try from 00455c2c to 00455c37 has its CatchHandler @ 00455dec */
    GameMsg::GameMsg((GameMsg *)PTR_gameMsg_00c42820);
    __cxa_atexit(PTR__GameMsg_00c414c0,PTR_gameMsg_00c42820,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_gameMsg_00c44980);
  }
  GameMsg::CheckFont();
  if (lVar19 != local_88) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: SetParent
ADDRESS: 0041b210
========================================

void CommonSystem::SetParent(Layer *param_1)

{
  (*(code *)PTR_SetParent_00c3aff0)();
  return;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: SetParent
ADDRESS: 00456634
========================================

/* CommonSystem::SetParent(cocos2d::Layer*) */

void CommonSystem::SetParent(Layer *param_1)

{
  undefined *puVar1;
  long *plVar2;
  
  puVar1 = PTR_m_skip_img_00c42f70;
  *(Layer **)PTR_m_CurrentScene_00c420f0 = param_1;
  plVar2 = *(long **)puVar1;
  *PTR_m_need_skip_00c43f58 = 0;
  (**(code **)(*plVar2 + 0x170))(plVar2,0);
  MsgBox::Hide(*(MsgBox **)PTR_m_sysmsg_00c44f48);
  puVar1 = PTR_m_main_layer_00c44500;
  (**(code **)(**(long **)PTR_m_main_layer_00c44500 + 0x270))();
  (**(code **)(*(long *)param_1 + 0x210))(param_1,*(undefined8 *)puVar1,10000);
  (**(code **)(**(long **)PTR_m_fade_sprite_00c425c8 + 0x170))
            (*(long **)PTR_m_fade_sprite_00c425c8,0);
  plVar2 = *(long **)PTR_m_wait_sprite_00c41ff0;
  *(undefined4 *)PTR_m_fade_time_00c41ed8 = 0;
  (**(code **)(*plVar2 + 0x170))(plVar2,0);
  (**(code **)(**(long **)PTR_m_marker_00c448d0 + 0x170))(*(long **)PTR_m_marker_00c448d0,0);
  (**(code **)(**(long **)PTR_m_title_00c44998 + 0x170))(*(long **)PTR_m_title_00c44998,0);
                    /* WARNING: Could not recover jumptable at 0x00456754. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (**(code **)(**(long **)PTR_m_tip_00c42418 + 0x170))(*(long **)PTR_m_tip_00c42418,0);
  return;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: init
ADDRESS: 00458bd0
========================================

/* CreditScene::init() */

undefined8 __thiscall CreditScene::init(CreditScene *this)

{
  int iVar1;
  long *plVar2;
  char *__s;
  char *__format;
  undefined8 uVar3;
  EventListener *pEVar4;
  code *pcVar5;
  long lVar6;
  undefined1 auStack_b0 [12];
  undefined4 local_a4;
  undefined8 local_a0;
  undefined8 local_98;
  undefined8 local_90;
  undefined8 local_88;
  undefined *local_80;
  undefined8 uStack_78;
  undefined8 local_70;
  CreditScene *pCStack_68;
  undefined **local_60;
  long local_48;
  
  lVar6 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar6;
  cocos2d::LayerColor::initWithColor((LayerColor *)this,(Color4B *)&DAT_00c67150);
  CommonSystem::SetParent((Layer *)this);
  cocos2d::Node::schedule((_func_void_float *)this);
  plVar2 = (long *)AtlasMgr::GetImg("ui/logo.png");
  *(long **)(this + 0x420) = plVar2;
  local_88 = 0x4120000044458000;
  (**(code **)(*plVar2 + 0x98))(plVar2,&local_88);
  local_90 = 0x3f800000;
  (**(code **)(**(long **)(this + 0x420) + 0x148))(*(long **)(this + 0x420),&local_90);
  (**(code **)(**(long **)(this + 0x420) + 0x80))(0x3f000000);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x420),0);
  iVar1 = *(int *)PTR_g_UserData_00c41478;
  __s = operator_new__(0x800);
  __format = (char *)GameMsg::Get(0x46,0);
  sprintf(__s,__format,(ulong)(uint)(iVar1 / 0xe10),(ulong)(uint)((iVar1 / 0x3c) % 0x3c));
  uVar3 = MakeLabel(__s,0x19,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(undefined8 *)(this + 0x428) = uVar3;
  operator_delete__(__s);
  local_98 = 0x3f8000003f000000;
  (**(code **)(**(long **)(this + 0x428) + 0x148))(*(long **)(this + 0x428),&local_98);
  local_a0 = 0x43c80000;
  (**(code **)(**(long **)(this + 0x428) + 0x98))(*(long **)(this + 0x428),&local_a0);
  (**(code **)(**(long **)(this + 0x428) + 0x370))(auStack_b0);
  *(undefined4 *)(this + 0x438) = local_a4;
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x428),1);
  *(undefined8 *)(this + 0x430) = 0;
  *(undefined4 *)(this + 0x43c) = 0;
  this[0x418] = (CreditScene)0x0;
  pEVar4 = (EventListener *)cocos2d::EventListenerKeyboard::create();
  local_80 = PTR_vtable_00c41d98 + 0x10;
  uStack_78 = 0x620;
  local_70 = 1;
  pCStack_68 = this;
  local_60 = &local_80;
  std::__ndk1::function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)>::swap
            ((function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)> *)&local_80,
             (function *)(pEVar4 + 0xd0));
  if (local_60 == &local_80) {
    pcVar5 = *(code **)(*local_60 + 0x20);
  }
  else {
    if (local_60 == (undefined **)0x0) goto LAB_00458e2c;
    pcVar5 = *(code **)(*local_60 + 0x28);
  }
  (*pcVar5)();
LAB_00458e2c:
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(this + 0x1f0),pEVar4,(Node *)this);
  if (lVar6 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: init
ADDRESS: 0045dcb0
========================================

/* GameScene::init() */

undefined8 __thiscall GameScene::init(GameScene *this)

{
  uint uVar1;
  undefined4 uVar2;
  undefined *puVar3;
  undefined *puVar4;
  undefined *puVar5;
  undefined *puVar6;
  undefined *puVar7;
  undefined *puVar8;
  int iVar9;
  Director *this_00;
  Size *pSVar10;
  MsgBox *pMVar11;
  char *pcVar12;
  Label *pLVar13;
  MenuItem *pMVar14;
  undefined8 uVar15;
  long *plVar16;
  SquareBox *pSVar17;
  Node *pNVar18;
  long *plVar19;
  User *pUVar20;
  long lVar21;
  EventListener *pEVar22;
  undefined4 uVar23;
  code *pcVar24;
  uint3 local_278 [2];
  undefined4 local_270;
  undefined4 uStack_26c;
  undefined8 local_268;
  float local_260;
  float local_25c;
  float local_258;
  float local_254;
  undefined8 local_250;
  uint3 local_248 [2];
  undefined4 local_240;
  undefined4 uStack_23c;
  undefined4 local_238;
  undefined4 uStack_234;
  undefined8 local_230;
  undefined4 local_228;
  undefined4 local_224;
  undefined8 local_220;
  float local_218;
  float local_214;
  undefined *local_210;
  undefined *puStack_208;
  undefined8 local_200;
  GameScene *pGStack_1f8;
  undefined **local_1f0;
  undefined *local_1e0;
  undefined *puStack_1d8;
  undefined8 local_1d0;
  GameScene *pGStack_1c8;
  undefined **local_1c0;
  undefined *local_1b0;
  undefined *puStack_1a8;
  undefined8 local_1a0;
  GameScene *pGStack_198;
  undefined **local_190;
  undefined *local_180;
  undefined *puStack_178;
  undefined8 local_170;
  GameScene *pGStack_168;
  undefined **local_160;
  undefined *local_150;
  undefined *puStack_148;
  undefined8 local_140;
  GameScene *pGStack_138;
  undefined **local_130;
  undefined *local_120;
  undefined *puStack_118;
  undefined8 local_110;
  GameScene *pGStack_108;
  undefined **local_100;
  undefined *local_f0;
  undefined *puStack_e8;
  undefined8 local_e0;
  GameScene *pGStack_d8;
  undefined **local_d0;
  undefined *local_c0;
  undefined8 uStack_b8;
  undefined8 local_b0;
  GameScene *pGStack_a8;
  undefined **local_a0;
  long local_88;
  
  local_88 = *(long *)PTR___stack_chk_guard_00c419a0;
  this[799] = (GameScene)0x1;
  this[0x394] = (GameScene)0x1;
  puVar3 = PTR_g_GameScene_00c41fb0;
  this[0x324] = (GameScene)0x0;
  this[0x395] = (GameScene)0x0;
  *(undefined4 *)(this + 0x390) = 0;
  *(undefined8 *)(this + 0x378) = 0;
  *(undefined4 *)(this + 0x370) = 0;
  this[0x31d] = (GameScene)0x0;
  this[0x31e] = (GameScene)0x0;
  *(GameScene **)puVar3 = this;
  cocos2d::Layer::init((Layer *)this);
  CommonSystem::SetParent((Layer *)this);
  this_00 = (Director *)cocos2d::Director::getInstance();
  pSVar10 = (Size *)cocos2d::Director::getWinSize(this_00);
  cocos2d::Size::Size((Size *)&local_218,pSVar10);
  pMVar11 = operator_new(0x360);
                    /* try { // try from 0045dd4c to 0045dd57 has its CatchHandler @ 0045efdc */
  MsgBox::MsgBox(pMVar11,0x1e,0x10);
  *(MsgBox **)(this + 0x3a0) = pMVar11;
  (**(code **)(*(long *)this + 0x210))(this,pMVar11,9);
  pMVar11 = *(MsgBox **)(this + 0x3a0);
  pcVar12 = (char *)GameMsg::Get(0x45,3);
  MsgBox::Show(pMVar11,pcVar12,0);
  (**(code **)(**(long **)(this + 0x3a0) + 0x80))(0x3f800000);
  uVar23 = DAT_009c588c;
  (**(code **)(**(long **)(this + 0x3a0) + 200))(DAT_009c588c,DAT_009c3d64);
  (**(code **)(**(long **)(this + 0x3a0) + 0x170))(*(long **)(this + 0x3a0),0);
  local_220 = 0x4361000043c80000;
  pLVar13 = (Label *)MakeLabel(0,0x3a,0,0x19,&local_220);
  *(Label **)(this + 0x3f8) = pLVar13;
  cocos2d::Label::setAlignment(pLVar13,1,*(undefined4 *)(pLVar13 + 0x454));
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x3f8),6);
  (**(code **)(**(long **)(this + 0x3f8) + 0x170))(*(long **)(this + 0x3f8),0);
  pcVar12 = (char *)GameMsg::Get(5,5);
  puVar7 = PTR_vtable_00c446f8;
  puVar3 = PTR_MenuCallBack_00c411e0;
  local_228 = 0;
  local_224 = 0x43e10000;
  local_f0 = PTR_vtable_00c446f8 + 0x10;
  puStack_e8 = PTR_MenuCallBack_00c411e0;
  local_e0 = 0;
                    /* try { // try from 0045de7c to 0045de93 has its CatchHandler @ 0045efe0 */
  pGStack_d8 = this;
  local_d0 = &local_f0;
  pMVar14 = (MenuItem *)
            MyUtil::MakeLabelBtn(pcVar12,0x19,1000,(Vec2 *)&local_228,(function *)&local_f0);
  if (local_d0 == &local_f0) {
    pcVar24 = *(code **)(*local_d0 + 0x20);
LAB_0045deb8:
    (*pcVar24)();
  }
  else if (local_d0 != (undefined **)0x0) {
    pcVar24 = *(code **)(*local_d0 + 0x28);
    goto LAB_0045deb8;
  }
  local_230 = 0x3f80000000000000;
  (**(code **)(*(long *)pMVar14 + 0x148))(pMVar14,&local_230);
  pcVar12 = (char *)GameMsg::Get(0x45,7);
  local_120 = puVar7 + 0x10;
  local_238 = 0x43960000;
  uStack_234 = 0x43610000;
  puStack_118 = puVar3;
  local_110 = 0;
                    /* try { // try from 0045df04 to 0045df17 has its CatchHandler @ 0045eff8 */
  pGStack_108 = this;
  local_100 = &local_120;
  uVar15 = MyUtil::MakeLabelBtn(pcVar12,0x19,0x3eb,(Vec2 *)&local_238,(function *)&local_120);
  *(undefined8 *)(this + 0x3b0) = uVar15;
  if (local_100 == &local_120) {
    pcVar24 = *(code **)(*local_100 + 0x20);
LAB_0045df40:
    (*pcVar24)();
  }
  else if (local_100 != (undefined **)0x0) {
    pcVar24 = *(code **)(*local_100 + 0x28);
    goto LAB_0045df40;
  }
  pcVar12 = (char *)GameMsg::Get(0x45,8);
  local_150 = puVar7 + 0x10;
  local_240 = 0x43fa0000;
  uStack_23c = 0x43610000;
  puStack_148 = puVar3;
  local_140 = 0;
                    /* try { // try from 0045df70 to 0045df83 has its CatchHandler @ 0045f010 */
  pGStack_138 = this;
  local_130 = &local_150;
  uVar15 = MyUtil::MakeLabelBtn(pcVar12,0x19,0x3ee,(Vec2 *)&local_240,(function *)&local_150);
  *(undefined8 *)(this + 0x3b8) = uVar15;
  if (local_130 == &local_150) {
    pcVar24 = *(code **)(*local_130 + 0x20);
LAB_0045dfac:
    (*pcVar24)();
  }
  else if (local_130 != (undefined **)0x0) {
    pcVar24 = *(code **)(*local_130 + 0x28);
    goto LAB_0045dfac;
  }
  (**(code **)(**(long **)(this + 0x3b0) + 0x170))(*(long **)(this + 0x3b0),0);
  (**(code **)(**(long **)(this + 0x3b8) + 0x170))(*(long **)(this + 0x3b8),0);
  plVar16 = (long *)cocos2d::Menu::create
                              (pMVar14,*(undefined8 *)(this + 0x3b0),*(undefined8 *)(this + 0x3b8),0
                              );
  *(long **)(this + 0x398) = plVar16;
  (**(code **)(*plVar16 + 0x98))(plVar16,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x398),8);
  pMVar11 = operator_new(0x360);
                    /* try { // try from 0045e028 to 0045e033 has its CatchHandler @ 0045f028 */
  MsgBox::MsgBox(pMVar11,0x19,0x10);
  *(MsgBox **)(this + 0x3a8) = pMVar11;
  (**(code **)(*(long *)this + 0x210))(this,pMVar11,9);
  pMVar11 = *(MsgBox **)(this + 0x3a8);
  pcVar12 = (char *)GameMsg::Get(0x45,10);
  MsgBox::Show(pMVar11,pcVar12,0);
  (**(code **)(**(long **)(this + 0x3a8) + 0x80))(0x3f800000);
  uVar2 = DAT_009c3d68;
  (**(code **)(**(long **)(this + 0x3a8) + 200))(uVar23,DAT_009c3d68);
  *(undefined4 *)(this + 0x3c0) = 0;
  (**(code **)(**(long **)(this + 0x3a8) + 0x170))(*(long **)(this + 0x3a8),0);
  uVar15 = cocos2d::Layer::create();
  *(undefined8 *)(this + 0x380) = uVar15;
  pSVar17 = operator_new(0x530);
                    /* try { // try from 0045e0d0 to 0045e0fb has its CatchHandler @ 0045efcc */
  cocos2d::Color3B::Color3B((Color3B *)local_248,'\0','\0','\0');
  SquareBox::SquareBox(pSVar17,(ulong)local_248[0],0x96);
  (**(code **)(*(long *)pSVar17 + 0x90))(uVar2,DAT_009c3d70,pSVar17);
  (**(code **)(**(long **)(this + 0x380) + 0x208))(*(long **)(this + 0x380),pSVar17);
  pNVar18 = (Node *)MakeLabel(0,0x3e,2,0x1e,PTR_ZERO_00c41d10);
  local_180 = puVar7 + 0x10;
  puStack_178 = puVar3;
  local_170 = 0;
                    /* try { // try from 0045e15c to 0045e167 has its CatchHandler @ 0045f03c */
  pGStack_168 = this;
  local_160 = &local_180;
  pMVar14 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar18,(function *)&local_180);
  if (local_160 == &local_180) {
    pcVar24 = *(code **)(*local_160 + 0x20);
LAB_0045e18c:
    (*pcVar24)();
  }
  else if (local_160 != (undefined **)0x0) {
    pcVar24 = *(code **)(*local_160 + 0x28);
    goto LAB_0045e18c;
  }
  (**(code **)(*(long *)pMVar14 + 0x2c0))(pMVar14,0x3ec);
  puVar8 = PTR_g_Common_00c44818;
  uVar23 = 0x1d;
  if (PTR_g_Common_00c44818[0x72] == '\0') {
    uVar23 = 3;
  }
  pNVar18 = (Node *)MakeLabel(0,0x3e,uVar23,0x1e,PTR_ZERO_00c41d10);
  local_1b0 = puVar7 + 0x10;
  puStack_1a8 = puVar3;
  local_1a0 = 0;
                    /* try { // try from 0045e1ec to 0045e1f7 has its CatchHandler @ 0045f054 */
  pGStack_198 = this;
  local_190 = &local_1b0;
  plVar16 = (long *)cocos2d::MenuItemLabel::create(pNVar18,(function *)&local_1b0);
  if (local_190 == &local_1b0) {
    pcVar24 = *(code **)(*local_190 + 0x20);
LAB_0045e21c:
    (*pcVar24)();
  }
  else if (local_190 != (undefined **)0x0) {
    pcVar24 = *(code **)(*local_190 + 0x28);
    goto LAB_0045e21c;
  }
  (**(code **)(*plVar16 + 0x2c0))(plVar16,0x3eb);
  pNVar18 = (Node *)MakeLabel(0,0x45,4,0x1e,PTR_ZERO_00c41d10);
  local_1e0 = puVar7 + 0x10;
  puStack_1d8 = puVar3;
  local_1d0 = 0;
                    /* try { // try from 0045e268 to 0045e273 has its CatchHandler @ 0045f06c */
  pGStack_1c8 = this;
  local_1c0 = &local_1e0;
  plVar19 = (long *)cocos2d::MenuItemLabel::create(pNVar18,(function *)&local_1e0);
  if (local_1c0 == &local_1e0) {
    pcVar24 = *(code **)(*local_1c0 + 0x20);
LAB_0045e298:
    (*pcVar24)();
  }
  else if (local_1c0 != (undefined **)0x0) {
    pcVar24 = *(code **)(*local_1c0 + 0x28);
    goto LAB_0045e298;
  }
  (**(code **)(*plVar19 + 0x2c0))(plVar19,0x3f0);
  puVar6 = PTR_stageMgr_00c43eb0;
  if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
     (iVar9 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar9 != 0)) {
                    /* try { // try from 0045e2d4 to 0045e2df has its CatchHandler @ 0045f0c0 */
    StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
    __cxa_guard_release(PTR_stageMgr_00c43eb0);
  }
  puVar5 = PTR_stageMgr_00c430c8;
  uVar1 = *(uint *)(*(long *)PTR_stageMgr_00c430c8 + 0x388);
  if (uVar1 - 1 < 5) {
    (**(code **)(*(long *)pMVar14 + 200))(0,DAT_009c48b0,pMVar14);
    (**(code **)(*plVar16 + 200))(0,DAT_009c5890,plVar16);
    (**(code **)(*plVar19 + 200))(0,0,plVar19);
  }
  else {
    (**(code **)(*(long *)pMVar14 + 200))(0,DAT_009c3d60,pMVar14);
    (**(code **)(*plVar16 + 200))(0,DAT_009c3d4c,plVar16);
    (**(code **)(*plVar19 + 0x170))(plVar19,0);
  }
  plVar16 = (long *)cocos2d::Menu::create(pMVar14,plVar16,plVar19,0);
  (**(code **)(*plVar16 + 0x98))(plVar16,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x380) + 0x210))(*(long **)(this + 0x380),plVar16,8);
  (**(code **)(**(long **)(this + 0x380) + 200))(uVar2,DAT_009c4ba8);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x380),10);
  (**(code **)(**(long **)(this + 0x380) + 0x170))(*(long **)(this + 0x380),0);
  pUVar20 = (User *)User::Ins(puVar8[0x72]);
  iVar9 = UserData::GetAct((UserData *)PTR_g_UserData_00c41478);
  User::SetSkill(pUVar20,iVar9);
  puVar4 = PTR_joy_00c41bc0;
  if (((*PTR_joy_00c41bc0 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0))
  {
                    /* try { // try from 0045e47c to 0045e487 has its CatchHandler @ 0045f0c4 */
    GameUI::GameUI((GameUI *)PTR_joy_00c42890);
    __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_joy_00c41bc0);
  }
  GameUI::SetVisible((GameUI *)PTR_joy_00c42890,1,1);
  if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045e4e0 to 0045e4eb has its CatchHandler @ 0045f0c8 */
    GameUI::GameUI((GameUI *)PTR_joy_00c42890);
    __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_joy_00c41bc0);
  }
  GameUI::SetVisible((GameUI *)PTR_joy_00c42890,2,1);
  if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045e544 to 0045e54f has its CatchHandler @ 0045f0cc */
    GameUI::GameUI((GameUI *)PTR_joy_00c42890);
    __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_joy_00c41bc0);
  }
  GameUI::SetVisible((GameUI *)PTR_joy_00c42890,3,1);
  if ((uVar1 < 9) && ((1 << (ulong)(uVar1 & 0x1f) & 0x13eU) != 0)) {
    if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045e5c4 to 0045e5cf has its CatchHandler @ 0045f0f4 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,10,1);
    if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045e628 to 0045e633 has its CatchHandler @ 0045f0f8 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,0xb,1);
    if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045e68c to 0045e697 has its CatchHandler @ 0045f0fc */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::UpdateExpBar((GameUI *)PTR_joy_00c42890);
  }
  else {
    pUVar20 = (User *)User::Ins(puVar8[0x72]);
    User::SetSkill(pUVar20,0);
    if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045ef1c to 0045ef27 has its CatchHandler @ 0045f104 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,10,0);
    if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045ef80 to 0045ef8b has its CatchHandler @ 0045f108 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,0xb,0);
  }
  if (uVar1 == 9) {
    if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045e6f0 to 0045e6fb has its CatchHandler @ 0045f100 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::UpdateExpBar((GameUI *)PTR_joy_00c42890);
    plVar16 = (long *)AtlasMgr::GetImg("ui/heart.png");
    *(long **)(this + 0x3d0) = plVar16;
    uVar23 = DAT_009c5894;
    (**(code **)(*plVar16 + 200))(DAT_009c3d58,DAT_009c5894);
    (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x3d0),1);
    plVar16 = (long *)AtlasMgr::GetImg("ui/heart.png");
    *(long **)(this + 0x3d8) = plVar16;
    (**(code **)(*plVar16 + 200))(DAT_009c48ec,uVar23);
    (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x3d8),1);
    plVar16 = (long *)AtlasMgr::GetImg("ui/heart.png");
    *(long **)(this + 0x3e0) = plVar16;
    (**(code **)(*plVar16 + 200))(DAT_009c48e8,uVar23);
    (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x3e0),1);
  }
  plVar16 = (long *)AtlasMgr::GetImg("stage/sky.png");
  *(long **)(this + 0x348) = plVar16;
  local_250 = 0x3f80000000000000;
  (**(code **)(*plVar16 + 0x148))(plVar16,&local_250);
  uVar23 = DAT_009c4884;
  (**(code **)(**(long **)(this + 0x348) + 0x60))(DAT_009c4884);
  local_258 = local_218 * 0.0;
  local_254 = local_214;
  (**(code **)(**(long **)(this + 0x348) + 0x98))(*(long **)(this + 0x348),&local_258);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x348),0);
  plVar16 = (long *)AtlasMgr::GetImg("stage/sky.png");
  *(long **)(this + 0x350) = plVar16;
  local_250 = 0x3f80000000000000;
  (**(code **)(*plVar16 + 0x148))(plVar16,&local_250);
  (**(code **)(**(long **)(this + 0x350) + 0x60))(uVar23);
  local_258 = local_218;
  local_254 = local_214;
  (**(code **)(**(long **)(this + 0x350) + 0x98))(*(long **)(this + 0x350),&local_258);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x350),0);
  plVar16 = (long *)AtlasMgr::GetImg("stage/moon.png");
  *(long **)(this + 0x358) = plVar16;
  (**(code **)(*plVar16 + 0x80))(0x40400000);
  local_25c = local_214 + DAT_009c5898;
  local_260 = local_218;
  (**(code **)(**(long **)(this + 0x358) + 0x98))(*(long **)(this + 0x358),&local_260);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x358),1);
  *(undefined4 *)(this + 0x364) = 0x42c80000;
  if (((*puVar6 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar9 != 0)) {
                    /* try { // try from 0045e96c to 0045e977 has its CatchHandler @ 0045f0d0 */
    StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
    __cxa_guard_release(PTR_stageMgr_00c43eb0);
  }
  if (*(int *)(*(long *)puVar5 + 0x38c) == 5) {
    this[0x394] = (GameScene)0x0;
  }
  pcVar24 = *(code **)(*(long *)this + 0x210);
  if (((*puVar6 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar9 != 0)) {
                    /* try { // try from 0045e9bc to 0045e9c7 has its CatchHandler @ 0045f0d4 */
    StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
    __cxa_guard_release(PTR_stageMgr_00c43eb0);
  }
  (*pcVar24)(this,*(undefined8 *)puVar5,2);
  plVar16 = (long *)AtlasMgr::GetImg("effect/low_hp.png");
  *(long **)(this + 0x368) = plVar16;
  (**(code **)(*plVar16 + 0x148))(plVar16,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x368) + 0x80))(0x41200000);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x368),5);
  (**(code **)(**(long **)(this + 0x368) + 0x170))(*(long **)(this + 0x368),0);
  cocos2d::Node::schedule((_func_void_float *)this);
  pcVar24 = *(code **)(*(long *)this + 0x210);
  if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045ea80 to 0045ea8b has its CatchHandler @ 0045f0ec */
    GameUI::GameUI((GameUI *)PTR_joy_00c42890);
    __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_joy_00c41bc0);
  }
  (*pcVar24)(this,PTR_joy_00c42890,4);
  local_268 = 0x41f0000000000000;
  uVar15 = MakeLabel("",0x14,(Vec2 *)&local_268,0.0);
  *(undefined8 *)(this + 0x420) = uVar15;
  pcVar12 = (char *)GameMsg::Get(0x45,0xc);
  local_210 = puVar7 + 0x10;
  local_270 = 0;
  uStack_26c = 0xc1f00000;
  puStack_208 = puVar3;
  local_200 = 0;
                    /* try { // try from 0045eb14 to 0045eb2b has its CatchHandler @ 0045f084 */
  pGStack_1f8 = this;
  local_1f0 = &local_210;
  pMVar14 = (MenuItem *)
            MyUtil::MakeLabelBtn(pcVar12,0x19,0x3f1,(Vec2 *)&local_270,(function *)&local_210);
  if (local_1f0 == &local_210) {
    pcVar24 = *(code **)(*local_1f0 + 0x20);
LAB_0045eb50:
    (*pcVar24)();
  }
  else if (local_1f0 != (undefined **)0x0) {
    pcVar24 = *(code **)(*local_1f0 + 0x28);
    goto LAB_0045eb50;
  }
  plVar16 = (long *)AtlasMgr::GetImg("ui/box.png");
  *(long **)(this + 0x428) = plVar16;
  (**(code **)(*plVar16 + 0x80))(DAT_009c57b4);
  pSVar17 = operator_new(0x530);
                    /* try { // try from 0045eb84 to 0045ebaf has its CatchHandler @ 0045efd0 */
  cocos2d::Color3B::Color3B((Color3B *)local_278,'\0','\0','\0');
  SquareBox::SquareBox(pSVar17,(ulong)local_278[0],0x96);
  (**(code **)(*(long *)pSVar17 + 0x90))(DAT_009c589c,DAT_009c58a0,pSVar17);
  plVar16 = (long *)cocos2d::Menu::create(pMVar14,0);
  (**(code **)(*plVar16 + 0x98))(plVar16,PTR_ZERO_00c41d10);
  plVar19 = (long *)cocos2d::Layer::create();
  *(long **)(this + 0x418) = plVar19;
  (**(code **)(*plVar19 + 200))(DAT_009c58a4,DAT_009c58a8);
  (**(code **)(**(long **)(this + 0x418) + 0x208))(*(long **)(this + 0x418),pSVar17);
  (**(code **)(**(long **)(this + 0x418) + 0x210))(*(long **)(this + 0x418),plVar16,1);
  (**(code **)(**(long **)(this + 0x418) + 0x210))
            (*(long **)(this + 0x418),*(undefined8 *)(this + 0x420),1);
  plVar16 = (long *)cocos2d::Layer::create();
  *(long **)(this + 0x410) = plVar16;
  (**(code **)(*plVar16 + 0x208))(plVar16,*(undefined8 *)(this + 0x428));
  (**(code **)(**(long **)(this + 0x410) + 0x208))
            (*(long **)(this + 0x410),*(undefined8 *)(this + 0x418));
  lVar21 = User::Ins(puVar8[0x72]);
  plVar16 = *(long **)(lVar21 + 0x43a8);
  (**(code **)(*plVar16 + 0x270))(plVar16);
  (**(code **)(**(long **)(this + 0x410) + 0x210))(*(long **)(this + 0x410),plVar16,1);
  (**(code **)(*plVar16 + 0x170))(plVar16,1);
  *(undefined4 *)(this + 0x40c) = 0xffffffff;
  (**(code **)(**(long **)(this + 0x418) + 0x170))(*(long **)(this + 0x418),0);
  (**(code **)(**(long **)(this + 0x428) + 0x170))(*(long **)(this + 0x428),0);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x410),10);
  (**(code **)(**(long **)(this + 0x410) + 0x170))(*(long **)(this + 0x410),0);
  (**(code **)(**(long **)(this + 0x380) + 0xd8))(uVar2);
  *(undefined4 *)(this + 0x40c) = 0xffffffff;
  (**(code **)(**(long **)(this + 0x418) + 0x170))(*(long **)(this + 0x418),0);
  (**(code **)(**(long **)(this + 0x428) + 0x170))(*(long **)(this + 0x428),0);
  if (((*puVar4 & 1) == 0) && (iVar9 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar9 != 0)) {
                    /* try { // try from 0045ed88 to 0045ed93 has its CatchHandler @ 0045f0f0 */
    GameUI::GameUI((GameUI *)PTR_joy_00c42890);
    __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_joy_00c41bc0);
  }
  GameUI::ShowSkillCost((GameUI *)PTR_joy_00c42890);
  SetSceneMode(this,0);
  pEVar22 = (EventListener *)cocos2d::EventListenerKeyboard::create();
  puVar3 = PTR_vtable_00c449f8;
  local_c0 = PTR_vtable_00c449f8 + 0x10;
  uStack_b8 = 0x618;
  local_b0 = 1;
  pGStack_a8 = this;
  local_a0 = &local_c0;
  std::__ndk1::function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)>::swap
            ((function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)> *)&local_c0,
             (function *)(pEVar22 + 0xa0));
  if (local_a0 == &local_c0) {
    (**(code **)(*local_a0 + 0x20))();
    lVar21 = *(long *)PTR___stack_chk_guard_00c419a0;
  }
  else {
    lVar21 = *(long *)PTR___stack_chk_guard_00c419a0;
    if (local_a0 != (undefined **)0x0) {
      (**(code **)(*local_a0 + 0x28))();
    }
  }
  local_c0 = puVar3 + 0x10;
  uStack_b8 = 0x620;
  local_b0 = 1;
  pGStack_a8 = this;
  local_a0 = &local_c0;
  std::__ndk1::function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)>::swap
            ((function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)> *)&local_c0,
             (function *)(pEVar22 + 0xd0));
  if (local_a0 == &local_c0) {
    pcVar24 = *(code **)(*local_a0 + 0x20);
  }
  else {
    if (local_a0 == (undefined **)0x0) goto LAB_0045eea0;
    pcVar24 = *(code **)(*local_a0 + 0x28);
  }
  (*pcVar24)();
LAB_0045eea0:
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(this + 0x1f0),pEVar22,(Node *)this);
  CommonSystem::Fade(true);
  if (lVar21 != local_88) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: init
ADDRESS: 0046ab5c
========================================

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* HardcoreLobbyScene::init() */

undefined8 __thiscall HardcoreLobbyScene::init(HardcoreLobbyScene *this)

{
  undefined8 *puVar1;
  int iVar2;
  float fVar3;
  undefined4 uVar4;
  undefined4 uVar5;
  undefined4 uVar6;
  undefined *puVar7;
  undefined *puVar8;
  uint uVar9;
  int iVar10;
  EventListener *pEVar11;
  char *pcVar12;
  MenuItem *pMVar13;
  long *plVar14;
  float *pfVar15;
  long *plVar16;
  undefined8 uVar17;
  long *plVar18;
  Sprite *pSVar19;
  Soul *this_00;
  ulong uVar20;
  undefined4 *puVar21;
  long lVar22;
  Node *pNVar23;
  Node *pNVar24;
  long *plVar25;
  long *plVar26;
  long *plVar27;
  long *plVar28;
  SquareBox *pSVar29;
  Character *this_01;
  Label *pLVar30;
  uint3 *puVar31;
  ulong uVar32;
  code *pcVar33;
  byte *pbVar34;
  uint param2;
  uint uVar35;
  undefined8 *puVar36;
  float fVar37;
  float fVar38;
  undefined4 uVar39;
  undefined8 local_338;
  undefined8 local_330;
  undefined8 local_328;
  undefined8 local_320;
  undefined8 local_318;
  undefined8 local_310;
  undefined8 local_308;
  float local_300 [2];
  undefined8 local_2f8;
  undefined8 local_2f0;
  Character *local_2e8;
  undefined8 local_2e0;
  undefined8 local_2d8;
  undefined8 local_2d0;
  undefined8 local_2c8;
  undefined8 local_2c0;
  undefined8 uStack_2b8;
  undefined8 local_2a8;
  undefined8 local_2a0;
  undefined8 local_298;
  undefined8 local_290;
  undefined8 local_288;
  undefined8 local_280;
  undefined8 local_278;
  float local_270 [2];
  undefined8 local_268;
  undefined8 local_260;
  undefined8 local_258;
  undefined8 local_250;
  char acStack_243 [100];
  char acStack_1df [255];
  undefined *local_e0;
  undefined *puStack_d8;
  undefined8 local_d0;
  HardcoreLobbyScene *pHStack_c8;
  undefined **local_c0;
  long local_a8;
  
  puVar7 = PTR_g_Common_00c44818;
  local_a8 = *(long *)PTR___stack_chk_guard_00c419a0;
  PTR_g_Common_00c44818[0x72] = 1;
  uVar9 = rand();
  *(uint *)(puVar7 + 8) = uVar9;
  puVar8 = PTR_g_instance_00c44bd8;
  *(uint *)(puVar7 + 4) = uVar9 ^ 3;
  *(HardcoreLobbyScene **)puVar8 = this;
  *(uint *)(puVar7 + 0xc) = (uVar9 ^ 3) + uVar9 ^ 0x3edd3b2d;
  puVar7[0x65] = 0;
  CommonSystem::SaveCheck();
  cocos2d::LayerColor::initWithColor((LayerColor *)this,(Color4B *)&DAT_00c68578);
  CommonSystem::SetParent((Layer *)this);
  pEVar11 = (EventListener *)cocos2d::EventListenerKeyboard::create();
  local_e0 = PTR_vtable_00c41b18 + 0x10;
  puStack_d8 = (undefined *)0x620;
  local_d0 = 1;
  pHStack_c8 = this;
  local_c0 = &local_e0;
  std::__ndk1::function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)>::swap
            ((function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)> *)&local_e0,
             (function *)(pEVar11 + 0xd0));
  if (local_c0 == &local_e0) {
    pcVar33 = *(code **)(*local_c0 + 0x20);
LAB_0046ac58:
    (*pcVar33)();
  }
  else if (local_c0 != (undefined **)0x0) {
    pcVar33 = *(code **)(*local_c0 + 0x28);
    goto LAB_0046ac58;
  }
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(this + 0x1f0),pEVar11,(Node *)this);
  local_c0 = &local_e0;
  local_e0 = PTR_vtable_00c445f8 + 0x10;
  puStack_d8 = PTR_MenuCallBack_00c43c90;
  local_d0 = 0;
  pHStack_c8 = this;
                    /* try { // try from 0046ac90 to 0046ae77 has its CatchHandler @ 0046bf04 */
  pcVar12 = (char *)GameMsg::Get(5,5);
  local_250 = 0x43e1000000000000;
  pMVar13 = (MenuItem *)
            MyUtil::MakeLabelBtn(pcVar12,0x19,0,(Vec2 *)&local_250,(function *)&local_e0);
  local_258 = 0x3f80000000000000;
  (**(code **)(*(long *)pMVar13 + 0x148))(pMVar13,&local_258);
  pcVar12 = (char *)GameMsg::Get(5,6);
  local_260 = 0x43e1000044480000;
  plVar14 = (long *)MyUtil::MakeLabelBtn(pcVar12,0x19,1,(Vec2 *)&local_260,(function *)&local_e0);
  local_268 = 0x3f8000003f800000;
  (**(code **)(*plVar14 + 0x148))(plVar14,&local_268);
  pfVar15 = (float *)(**(code **)(*plVar14 + 0x168))(plVar14);
  fVar3 = DAT_009c46e8;
  local_270[0] = (DAT_009c46e8 - *pfVar15) + -10.0;
  local_270[1] = 445.0;
  plVar16 = (long *)MyUtil::MakeSpriteBtn("ui/stamina_bar.png",3,local_270,&local_e0,0xffffffff,0);
  local_278 = 0x3f8000003f800000;
  (**(code **)(*plVar16 + 0x148))(plVar16,&local_278);
  local_280 = 0x41700000420c0000;
  uVar17 = MakeLabel("",0x14,(Vec2 *)&local_280,0.0);
  *(undefined8 *)(this + 0x438) = uVar17;
  local_288 = 0x41700000425c0000;
  plVar18 = (long *)MakeLabel("",0x14,(Vec2 *)&local_288,0.0);
  *(long **)(this + 0x440) = plVar18;
  local_290 = 0x3f00000000000000;
  (**(code **)(*plVar18 + 0x148))(plVar18,&local_290);
  (**(code **)(*plVar16 + 0x208))(plVar16,*(undefined8 *)(this + 0x438));
  (**(code **)(*plVar16 + 0x208))(plVar16,*(undefined8 *)(this + 0x440));
  pSVar19 = (Sprite *)AtlasMgr::GetImg("ui/stamina.png");
  (**(code **)(*(long *)pSVar19 + 200))(0x41700000,0x41700000,pSVar19);
  (**(code **)(*plVar16 + 0x210))(plVar16,pSVar19,1);
  this_00 = operator_new(0x540);
                    /* try { // try from 0046ae78 to 0046ae83 has its CatchHandler @ 0046bf64 */
  Effect::Soul::Soul(this_00,pSVar19);
  *(Soul **)(this + 0x430) = this_00;
  pcVar33 = *(code **)(*(long *)this_00 + 0x98);
                    /* try { // try from 0046ae98 to 0046b003 has its CatchHandler @ 0046bf04 */
  uVar17 = (**(code **)(*(long *)pSVar19 + 0xb0))(pSVar19);
  (*pcVar33)(this_00,uVar17);
  (**(code **)(*plVar16 + 0x210))(plVar16,*(undefined8 *)(this + 0x430),2);
  uVar20 = StageData::Valid((StageData *)PTR_g_StageData_00c41cc8);
  if ((uVar20 & 1) == 0) {
    pcVar12 = (char *)GameMsg::Get(1,2);
    local_2a0 = 0x428200004428c000;
    plVar18 = (long *)MyUtil::MakeLabelBtn(pcVar12,0x19,2,(Vec2 *)&local_2a0,(function *)&local_e0);
    plVar25 = (long *)AtlasMgr::GetImg("ui/stamina.png");
    pcVar33 = *(code **)(*plVar25 + 200);
    puVar21 = (undefined4 *)(**(code **)(*plVar18 + 0x168))(plVar18);
    uVar39 = *puVar21;
    lVar22 = (**(code **)(*plVar18 + 0x168))(plVar18);
    (*pcVar33)(uVar39,*(float *)(lVar22 + 4) * 0.5,plVar25);
    (**(code **)(*plVar18 + 0x210))(plVar18,plVar25,1);
  }
  else {
    pcVar12 = (char *)GameMsg::Get(0x3e,2);
    local_298 = 0x428200004428c000;
    plVar18 = (long *)MyUtil::MakeLabelBtn(pcVar12,0x19,2,(Vec2 *)&local_298,(function *)&local_e0);
  }
  local_2a8 = 0x433400004428c000;
  uVar17 = MakeLabel(0,1,6,0x14,&local_2a8);
  (**(code **)(*(long *)this + 0x208))(this,uVar17);
  uStack_2b8 = _UNK_009c5f78;
  local_2c0 = _DAT_009c5f70;
  pcVar12 = (char *)GameMsg::Get(0x10,4);
                    /* try { // try from 0046b004 to 0046b1f7 has its CatchHandler @ 0046bf14 */
  pNVar23 = (Node *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*(long *)pNVar23 + 0x490))(pNVar23,0xb4);
  pNVar24 = (Node *)AtlasMgr::GetImg("ui/box.png");
  plVar25 = (long *)cocos2d::MenuItemSprite::create(pNVar23,pNVar24,(function *)&local_e0);
  uVar39 = DAT_009c57b4;
  (**(code **)(*plVar25 + 0x90))(DAT_009c57b4,0x3f000000,plVar25);
  (**(code **)(*plVar25 + 0x2c0))(plVar25,7);
  plVar26 = (long *)MakeLabel(pcVar12,0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  (**(code **)(*plVar25 + 0x210))(plVar25,plVar26,0);
  (**(code **)(*plVar26 + 0x98))(plVar26,&local_2c0);
  uVar4 = DAT_009c5f50;
  (**(code **)(*plVar26 + 0x90))(DAT_009c5f50,0x40000000,plVar26);
  pNVar23 = (Node *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*(long *)pNVar23 + 0x490))(pNVar23,0xb4);
  pNVar24 = (Node *)AtlasMgr::GetImg("ui/box.png");
  plVar26 = (long *)cocos2d::MenuItemSprite::create(pNVar23,pNVar24,(function *)&local_e0);
  (**(code **)(*plVar26 + 0x90))(uVar39,0x3f000000,plVar26);
  (**(code **)(*plVar26 + 0x2c0))(plVar26,8);
  plVar27 = (long *)MakeLabel("30",0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  (**(code **)(*plVar26 + 0x210))(plVar26,plVar27,0);
  (**(code **)(*plVar27 + 0x98))(plVar27,(ulong)&local_2c0 | 8);
  (**(code **)(*plVar27 + 0x90))(uVar4,0x40000000,plVar27);
  plVar28 = (long *)AtlasMgr::GetImg("item/0/gem.png");
  (**(code **)(*plVar28 + 200))(0xc1400000,0x41000000,plVar28);
  (**(code **)(*plVar27 + 0x208))(plVar27,plVar28);
  uVar39 = DAT_009c48f0;
                    /* try { // try from 0046b200 to 0046b28b has its CatchHandler @ 0046bf04 */
  (**(code **)(*plVar25 + 200))(DAT_009c5f54,DAT_009c48f0,plVar25);
  (**(code **)(*plVar26 + 200))(DAT_009c5f58,uVar39,plVar26);
  plVar14 = (long *)cocos2d::Menu::create(pMVar13,plVar14,plVar16,plVar18,plVar25,plVar26,0);
  (**(code **)(*plVar14 + 0x98))(plVar14,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x210))(this,plVar14,100);
  memset(acStack_1df,0,0xff);
  if (*(uint *)(PTR_g_Hard_00c41970 + 8) ==
      (*(uint *)(PTR_g_Hard_00c41970 + 4) + *(uint *)PTR_g_Hard_00c41970 ^ 0x3edd3b2d)) {
    if ((int)(*(uint *)(PTR_g_Hard_00c41970 + 4) ^ *(uint *)PTR_g_Hard_00c41970) < 0x1a)
    goto LAB_0046b348;
                    /* try { // try from 0046b2c8 to 0046b3ef has its CatchHandler @ 0046bf04 */
    pNVar23 = (Node *)MakeLabel(0,5,0x14,0x14,PTR_ZERO_00c41d10);
    plVar16 = (long *)cocos2d::MenuItemLabel::create(pNVar23,(function *)&local_e0);
    (**(code **)(*plVar16 + 0x2c0))(plVar16,9);
    (**(code **)(*plVar16 + 200))(DAT_009c5f5c,0x41c80000,plVar16);
    (**(code **)(*plVar14 + 0x208))(plVar14,plVar16);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
LAB_0046b348:
    pcVar12 = (char *)GameMsg::Get(1,3);
    uVar20 = HardcoreData::GetAct();
    uVar32 = HardcoreData::GetState();
    sprintf(acStack_1df,pcVar12,uVar20 & 0xffffffff,uVar32 & 0xffffffff);
    local_2c8 = 0x41c800004428c000;
    uVar17 = MakeLabel(acStack_1df,0x14,(Vec2 *)&local_2c8,0.0);
    (**(code **)(*(long *)this + 0x208))(this,uVar17);
  }
  plVar14 = (long *)cocos2d::Layer::create();
  *(long **)(this + 0x428) = plVar14;
  (**(code **)(*plVar14 + 200))(DAT_009c5f60,DAT_009c5f64);
  pSVar29 = operator_new(0x530);
                    /* try { // try from 0046b404 to 0046b40f has its CatchHandler @ 0046bf70 */
  SquareBox::SquareBox(pSVar29,(ulong)*(uint3 *)PTR_BLACK_00c42fc0,0xe6);
  uVar4 = DAT_009c48b8;
                    /* try { // try from 0046b418 to 0046b60f has its CatchHandler @ 0046bf04 */
  (**(code **)(*(long *)pSVar29 + 0x90))(DAT_009c46ec,DAT_009c48b8,pSVar29);
  (**(code **)(**(long **)(this + 0x428) + 0x208))(*(long **)(this + 0x428),pSVar29);
  local_2d0 = 0x42c8000000000000;
  uVar17 = MakeLabel(0,4,0,0x19,&local_2d0);
  (**(code **)(**(long **)(this + 0x428) + 0x208))(*(long **)(this + 0x428),uVar17);
  pNVar23 = (Node *)MakeLabel(0,4,1,0x19,PTR_ZERO_00c41d10);
  pMVar13 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar23,(function *)&local_e0);
  (**(code **)(*(long *)pMVar13 + 200))(0,0x41f00000,pMVar13);
  (**(code **)(*(long *)pMVar13 + 0x2c0))(pMVar13,4);
  pNVar23 = (Node *)MakeLabel(0,4,2,0x19,PTR_ZERO_00c41d10);
  plVar14 = (long *)cocos2d::MenuItemLabel::create(pNVar23,(function *)&local_e0);
  (**(code **)(*plVar14 + 200))(0,0xc1f00000,plVar14);
  (**(code **)(*plVar14 + 0x2c0))(plVar14,5);
  pcVar12 = (char *)GameMsg::Get(4,3);
  local_2d8 = 0xc2c8000000000000;
  uVar17 = MyUtil::MakeLabelBtn(pcVar12,0x14,6,(Vec2 *)&local_2d8,(function *)&local_e0);
  plVar14 = (long *)cocos2d::Menu::create(pMVar13,plVar14,uVar17,0);
  (**(code **)(*plVar14 + 0x98))(plVar14,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x428) + 0x210))(*(long **)(this + 0x428),plVar14,1);
  (**(code **)(**(long **)(this + 0x428) + 0x170))(*(long **)(this + 0x428),0);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x428),10);
  pcVar12 = (char *)GameMsg::Get(1,0);
  local_2e0 = 0x43d2000043c80000;
  uVar17 = MakeLabel(pcVar12,0x1e,(Vec2 *)&local_2e0,0.0);
  *(undefined8 *)(this + 0x418) = uVar17;
  (**(code **)(*(long *)this + 0x208))(this,uVar17);
  pSVar29 = operator_new(0x530);
  puVar7 = PTR_WHITE_00c437b0;
                    /* try { // try from 0046b624 to 0046b62f has its CatchHandler @ 0046bf74 */
  SquareBox::SquareBox(pSVar29,(ulong)*(uint3 *)PTR_WHITE_00c437b0,0xff);
                    /* try { // try from 0046b638 to 0046b68b has its CatchHandler @ 0046bf04 */
  (**(code **)(*(long *)pSVar29 + 0x50))(fVar3,pSVar29);
  fVar37 = DAT_009c3d68;
  (**(code **)(*(long *)pSVar29 + 200))(DAT_009c3d68,*(undefined4 *)PTR_line_1_00c43c48,pSVar29);
  (**(code **)(*(long *)this + 0x208))(this,pSVar29);
  pSVar29 = operator_new(0x530);
                    /* try { // try from 0046b698 to 0046b6a3 has its CatchHandler @ 0046bf78 */
  SquareBox::SquareBox(pSVar29,(ulong)*(uint3 *)puVar7,0xff);
                    /* try { // try from 0046b6ac to 0046b71f has its CatchHandler @ 0046bf04 */
  (**(code **)(*(long *)pSVar29 + 0x50))(fVar3,pSVar29);
  (**(code **)(*(long *)pSVar29 + 200))(fVar37,*(undefined4 *)PTR_line_2_00c44548,pSVar29);
  (**(code **)(*(long *)this + 0x208))(this,pSVar29);
  plVar14 = (long *)cocos2d::Layer::create();
  *(long **)(this + 0x450) = plVar14;
  (**(code **)(*plVar14 + 200))(0,DAT_009c5f68);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x450));
  uVar6 = DAT_009c5f6c;
  uVar5 = DAT_009c5898;
  uVar39 = DAT_009c3d4c;
  puVar36 = *(undefined8 **)PTR_g_Ancestors_00c41cb8;
  puVar1 = *(undefined8 **)(PTR_g_Ancestors_00c41cb8 + 8);
  if (puVar36 == puVar1) {
    uVar9 = 0;
  }
  else {
    uVar9 = 0;
    iVar10 = 100;
    do {
      pbVar34 = (byte *)*puVar36;
                    /* try { // try from 0046b770 to 0046b77b has its CatchHandler @ 0046befc */
      this_01 = operator_new(0x4320);
                    /* try { // try from 0046b77c to 0046b78b has its CatchHandler @ 0046bf1c */
      Character::Character(this_01,0,0x1000);
      local_2e8 = this_01;
                    /* try { // try from 0046b798 to 0046b7c3 has its CatchHandler @ 0046befc */
      (**(code **)(*(long *)this_01 + 200))(uVar39,uVar5,this_01);
      Character::SetAbility(this_01,0,1);
      Character::Fill(this_01,true);
                    /* try { // try from 0046b7c8 to 0046b84b has its CatchHandler @ 0046bf0c */
      Character::Equip(this_01,0,pbVar34[0x10],0xffffffff);
      Character::Equip(this_01,1,pbVar34[0x11],0xffffffff);
      if (pbVar34[0x12] != 0) {
        Character::Equip(this_01,2,pbVar34[0x12],0xffffffff);
      }
      if (pbVar34[0x13] != 0) {
        Character::Equip(this_01,3,pbVar34[0x13],0xffffffff);
      }
      if (pbVar34[0x14] != 0) {
        Character::Equip(this_01,4,pbVar34[0x14],0xffffffff);
      }
      if (pbVar34[0x15] != 0) {
        Character::Equip(this_01,5,pbVar34[0x15],0xffffffff);
      }
                    /* try { // try from 0046b84c to 0046b8bb has its CatchHandler @ 0046befc */
      plVar14 = (long *)cocos2d::Layer::create();
      (**(code **)(*plVar14 + 200))((float)iVar10,0,plVar14);
      (**(code **)(*plVar14 + 0x208))(plVar14,this_01);
      plVar16 = (long *)AtlasMgr::GetImg("ui/box.png");
      (**(code **)(*plVar16 + 0x80))(uVar6,plVar16);
      (**(code **)(*plVar14 + 0x210))(plVar14,plVar16,0xffffffff);
      memset(acStack_243,0,100);
                    /* try { // try from 0046b8cc to 0046b9c3 has its CatchHandler @ 0046befc */
      pcVar12 = (char *)GameMsg::Get(1,7);
      uVar9 = uVar9 + 1;
      if (*pbVar34 < 0x1a) {
        iVar2 = *pbVar34 - 1;
        uVar20 = (ulong)(iVar2 / 5 + 1);
        uVar32 = (ulong)(iVar2 % 5 + 1);
      }
      else {
        uVar20 = 5;
        uVar32 = 5;
      }
      sprintf(acStack_243,pcVar12,(ulong)uVar9,uVar20,uVar32);
      local_2f0 = 0x42b4000000000000;
      plVar16 = (long *)MakeLabel(acStack_243,0xf,(Vec2 *)&local_2f0,5.0);
      local_2f8 = 0x3f80000000000000;
      (**(code **)(*plVar16 + 0x148))(plVar16,&local_2f8);
      (**(code **)(*plVar14 + 0x208))(plVar14,plVar16);
      if (*(undefined8 **)(this + 0x460) == *(undefined8 **)(this + 0x468)) {
        std::__ndk1::vector<Character*,std::__ndk1::allocator<Character*>>::
        __push_back_slow_path<Character*const&>
                  ((vector<Character*,std::__ndk1::allocator<Character*>> *)(this + 0x458),
                   &local_2e8);
      }
      else {
        **(undefined8 **)(this + 0x460) = this_01;
        *(long *)(this + 0x460) = *(long *)(this + 0x460) + 8;
      }
      (**(code **)(**(long **)(this + 0x450) + 0x208))(*(long **)(this + 0x450),plVar14);
      puVar36 = puVar36 + 1;
      iVar10 = iVar10 + 200;
    } while (puVar1 != puVar36);
  }
                    /* try { // try from 0046b9dc to 0046baff has its CatchHandler @ 0046bf04 */
  pcVar12 = (char *)GameMsg::Get(1,1);
  puVar8 = PTR_WHITE_00c437b0;
  puVar7 = PTR_g_Hard_00c41970;
  local_300[1] = 0.0;
  local_300[0] = fVar37;
  if (uVar9 != 0) {
    local_300[0] = (float)(int)uVar9 * DAT_009c3d64 + fVar37;
  }
  pLVar30 = (Label *)MakeLabel(pcVar12,0x14,(Vec2 *)local_300,10.0);
  cocos2d::Label::setAlignment(pLVar30,1,*(undefined4 *)(pLVar30 + 0x454));
  (**(code **)(**(long **)(this + 0x450) + 0x208))(*(long **)(this + 0x450),pLVar30);
  fVar37 = (float)(int)(uVar9 + 4) * DAT_009c3d48 + fVar3;
  if (0.0 < fVar37) {
    fVar37 = 0.0;
  }
  *(float *)(this + 0x480) = fVar37;
  fVar38 = (float)(**(code **)(**(long **)(this + 0x450) + 0xe0))();
  if (fVar38 <= 0.0) {
    if (*(float *)(this + 0x480) <= fVar38) {
      fVar37 = fVar37 + fVar3;
      if (0.0 < fVar37) {
        fVar37 = 0.0;
      }
      (**(code **)(**(long **)(this + 0x450) + 0xd8))(fVar37 + fVar38);
    }
    else {
      (**(code **)(**(long **)(this + 0x450) + 0xd8))(*(float *)(this + 0x480));
      *(undefined4 *)(this + 0x478) = 0;
    }
  }
  else {
    (**(code **)(**(long **)(this + 0x450) + 0xd8))(0);
    *(undefined4 *)(this + 0x478) = 0;
  }
  *(undefined4 *)(this + 0x47c) = 0;
  pSVar29 = operator_new(0x530);
                    /* try { // try from 0046bb0c to 0046bb17 has its CatchHandler @ 0046bf84 */
  SquareBox::SquareBox(pSVar29,(ulong)*(uint3 *)puVar8,0);
                    /* try { // try from 0046bb18 to 0046bb23 has its CatchHandler @ 0046bf04 */
  pSVar29 = operator_new(0x530);
                    /* try { // try from 0046bb30 to 0046bb3b has its CatchHandler @ 0046bf88 */
  SquareBox::SquareBox(pSVar29,(ulong)*(uint3 *)puVar8,0);
                    /* try { // try from 0046bb3c to 0046bbb3 has its CatchHandler @ 0046bf04 */
  plVar14 = (long *)cocos2d::Layer::create();
  (**(code **)(*plVar14 + 200))(uVar4,0x41200000,plVar14);
  (**(code **)(*(long *)this + 0x210))(this,plVar14,0);
  if (*(uint *)(puVar7 + 0x8c) == (*(uint *)(puVar7 + 0x88) + *(uint *)(puVar7 + 0x84) ^ 0x3edd3b2d)
     ) {
    param2 = *(uint *)(puVar7 + 0x88) ^ *(uint *)(puVar7 + 0x84);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    param2 = 0;
  }
  pSVar29 = operator_new(0x530);
                    /* try { // try from 0046bbb4 to 0046bbd3 has its CatchHandler @ 0046bf5c */
  puVar31 = (uint3 *)GetColor(0xc);
  SquareBox::SquareBox(pSVar29,(ulong)*puVar31,0x96);
  local_308 = 0;
                    /* try { // try from 0046bbe0 to 0046bc2f has its CatchHandler @ 0046bf04 */
  (**(code **)(*(long *)pSVar29 + 0x148))(pSVar29,&local_308);
  fVar3 = DAT_009c3d70;
  (**(code **)(*(long *)pSVar29 + 0x90))(DAT_009c3d70,0x41200000,pSVar29);
  (**(code **)(*plVar14 + 0x210))(plVar14,pSVar29,0);
  pSVar29 = operator_new(0x530);
                    /* try { // try from 0046bc30 to 0046bc4f has its CatchHandler @ 0046bf60 */
  puVar31 = (uint3 *)GetColor(0);
  SquareBox::SquareBox(pSVar29,(ulong)*puVar31,0xff);
  local_310 = 0;
                    /* try { // try from 0046bc5c to 0046be83 has its CatchHandler @ 0046bf04 */
  (**(code **)(*(long *)pSVar29 + 0x148))(pSVar29,&local_310);
  puVar7 = PTR_g_Hard_00c41970;
  iVar10 = HardcoreData::GetNextDeathLevelExp((HardcoreData *)PTR_g_Hard_00c41970);
  (**(code **)(*(long *)pSVar29 + 0x90))
            (((float)(int)param2 / (float)iVar10) * fVar3,0x41200000,pSVar29);
  (**(code **)(*plVar14 + 0x210))(plVar14,pSVar29,1);
  if (*(uint *)(puVar7 + 0x80) == (*(uint *)(puVar7 + 0x7c) + *(uint *)(puVar7 + 0x78) ^ 0x3edd3b2d)
     ) {
    uVar35 = *(uint *)(puVar7 + 0x7c) ^ *(uint *)(puVar7 + 0x78);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar35 = 0;
  }
  pcVar12 = (char *)GameMsg::Get(1,5);
  sprintf(acStack_1df,pcVar12,(ulong)uVar35,(ulong)(uVar35 * 10));
  local_318 = 0x4198000000000000;
  plVar16 = (long *)MakeLabel(acStack_1df,0xf,(Vec2 *)&local_318,0.0);
  local_320 = 0;
  (**(code **)(*plVar16 + 0x148))(plVar16,&local_320);
  (**(code **)(*plVar14 + 0x208))(plVar14,plVar16);
  iVar10 = HardcoreData::GetNextDeathLevelExp((HardcoreData *)PTR_g_Hard_00c41970);
  sprintf(acStack_1df,"%d / %d",param2,iVar10);
  local_328 = 0x40e0000043160000;
  plVar16 = (long *)MakeLabel(acStack_1df,0xf,(Vec2 *)&local_328,0.0);
  (**(code **)(*plVar16 + 0x5a0))(plVar16,PTR_BLACK_00c44220,2);
  (**(code **)(*plVar14 + 0x210))(plVar14,plVar16,1);
  pcVar12 = (char *)GameMsg::Get(1,8);
  uVar20 = HardcoreData::GetRunePoint();
  uVar32 = HardcoreData::GetDeathPoint();
  sprintf(acStack_1df,pcVar12,(ulong)(uVar9 + 1),uVar20 & 0xffffffff,uVar32 & 0xffffffff);
  local_330 = 0x428c000000000000;
  plVar16 = (long *)MakeLabel(acStack_1df,0xf,(Vec2 *)&local_330,5.0);
  local_338 = 0;
  (**(code **)(*plVar16 + 0x148))(plVar16,&local_338);
  (**(code **)(*plVar14 + 0x208))(plVar14,plVar16);
  this[0x475] = (HardcoreLobbyScene)0x0;
  this[0x474] = (HardcoreLobbyScene)0x0;
  *(undefined4 *)(this + 0x478) = 0;
  cocos2d::Node::schedule((_func_void_float *)this);
  if (local_c0 == &local_e0) {
    pcVar33 = *(code **)(*local_c0 + 0x20);
  }
  else {
    if (local_c0 == (undefined **)0x0) goto LAB_0046beb0;
    pcVar33 = *(code **)(*local_c0 + 0x28);
  }
  (*pcVar33)();
LAB_0046beb0:
  if (*(long *)PTR___stack_chk_guard_00c419a0 != local_a8) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: init
ADDRESS: 00475924
========================================

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* InventoryScene::init() */

undefined8 __thiscall InventoryScene::init(InventoryScene *this)

{
  undefined4 uVar1;
  undefined4 uVar2;
  undefined *puVar3;
  undefined *puVar4;
  int iVar5;
  uint uVar6;
  Director *this_00;
  Size *pSVar7;
  char *pcVar8;
  MenuItem *pMVar9;
  long *plVar10;
  User *this_01;
  undefined8 *puVar11;
  User *pUVar12;
  SquareBox *pSVar13;
  uint3 *puVar14;
  float *pfVar15;
  long lVar16;
  Node *pNVar17;
  Node *pNVar18;
  long *plVar19;
  EventListener *pEVar20;
  undefined8 uVar21;
  long lVar22;
  code *pcVar23;
  ulong uVar24;
  undefined4 local_238;
  float local_234;
  undefined8 local_230;
  undefined8 local_228;
  undefined4 local_220;
  float fStack_21c;
  undefined4 local_218;
  float local_214;
  float local_20c;
  undefined4 local_208;
  float local_204;
  undefined8 local_200;
  undefined8 local_1f8;
  undefined8 local_1f0;
  undefined8 local_1e8;
  undefined8 local_1e0;
  undefined8 local_1d8;
  undefined8 local_1d0;
  undefined8 local_1c8;
  undefined8 local_1c0;
  undefined8 local_1b8;
  undefined8 local_1b0;
  undefined8 local_1a8;
  undefined8 local_1a0;
  float local_198;
  float fStack_194;
  float local_190;
  float fStack_18c;
  undefined8 local_188;
  undefined8 local_180;
  undefined8 local_178;
  undefined8 local_170;
  undefined8 local_168;
  undefined8 local_160;
  undefined8 local_158;
  undefined8 local_150;
  Size aSStack_148 [8];
  undefined8 local_140;
  undefined8 uStack_138;
  undefined8 uStack_130;
  undefined8 uStack_128;
  MenuItem *local_120 [4];
  undefined *local_100;
  undefined *puStack_f8;
  undefined8 local_f0;
  InventoryScene *pIStack_e8;
  undefined **local_e0;
  undefined *local_d0;
  undefined8 uStack_c8;
  undefined8 local_c0;
  InventoryScene *pIStack_b8;
  undefined **local_b0;
  
  puVar3 = PTR_selected_item_00c43ff8;
  lVar22 = *(long *)PTR___stack_chk_guard_00c419a0;
  *(InventoryScene **)PTR_g_ins_00c43418 = this;
  *(undefined8 *)(puVar3 + 0x10) = 0;
  *(undefined8 *)(puVar3 + 0x18) = 0;
  *(undefined8 *)puVar3 = 0;
  *(undefined8 *)(puVar3 + 8) = 0;
  *(undefined8 *)(this + 0x898) = 0;
  *(undefined4 *)(this + 0x410) = 0;
  cocos2d::LayerColor::initWithColor((LayerColor *)this,(Color4B *)&DAT_00c68680);
  CommonSystem::SetParent((Layer *)this);
  this_00 = (Director *)cocos2d::Director::getInstance();
  pSVar7 = (Size *)cocos2d::Director::getWinSize(this_00);
  cocos2d::Size::Size(aSStack_148,pSVar7);
  local_e0 = &local_100;
  local_100 = PTR_vtable_00c43020 + 0x10;
  puStack_f8 = PTR_MenuCallBack_00c41dc8;
  local_f0 = 0;
  pIStack_e8 = this;
                    /* try { // try from 004759d4 to 00475c73 has its CatchHandler @ 00476cbc */
  pcVar8 = (char *)GameMsg::Get(5,7);
  local_150 = 0x43e1000000000000;
  pMVar9 = (MenuItem *)
           MyUtil::MakeLabelBtn(pcVar8,0x19,-1,(Vec2 *)&local_150,(function *)&local_100);
  local_158 = 0x3f80000000000000;
  (**(code **)(*(long *)pMVar9 + 0x148))(pMVar9,&local_158);
  plVar10 = (long *)cocos2d::Menu::create(pMVar9,0);
  (**(code **)(*plVar10 + 0x98))(plVar10,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x210))(this,plVar10,100);
  puVar4 = PTR_g_Common_00c44818;
  this_01 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
  puVar11 = (undefined8 *)(**(code **)(*(long *)this_01 + 0xb0))(this_01);
  *(undefined8 *)(this + 0x4c8) = *puVar11;
  *(undefined4 *)(this + 0x4f0) = *(undefined4 *)(this_01 + 0x41e8);
  uVar21 = *(undefined8 *)(this_01 + 0x41d8);
  *(undefined8 *)(this + 0x4e8) = *(undefined8 *)(this_01 + 0x41e0);
  *(undefined8 *)(this + 0x4e0) = uVar21;
  uVar21 = *(undefined8 *)(this_01 + 0x41c8);
  *(undefined8 *)(this + 0x4d8) = *(undefined8 *)(this_01 + 0x41d0);
  *(undefined8 *)(this + 0x4d0) = uVar21;
  *(undefined4 *)(this + 0x4f8) = *(undefined4 *)(this_01 + 0x41f0);
  User::Ready(this_01,false);
  local_160 = 0x4366000042f00000;
  (**(code **)(*(long *)this_01 + 0x98))(this_01,&local_160);
  (**(code **)(*(long *)this + 0x210))(this,this_01,0);
  User::Ins(puVar4[0x72]);
  pcVar8 = (char *)User::GetLevelExpStr();
  plVar10 = (long *)MakeLabel(pcVar8,0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(long **)(this + 0x420) = plVar10;
  uVar1 = DAT_009c3d64;
  (**(code **)(*plVar10 + 200))(DAT_009c6aa8,DAT_009c3d64);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x420),1);
  if (((byte)this_01[0x4318] & 1) == 0) {
    pUVar12 = this_01 + 0x4319;
  }
  else {
    pUVar12 = *(User **)(this_01 + 0x4328);
  }
  plVar10 = (long *)MakeLabel((char *)pUVar12,0xf,(Vec2 *)PTR_ZERO_00c41d10,5.0);
  *(long **)(this + 0x428) = plVar10;
  local_168 = 0x3f80000000000000;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_168);
  local_170 = 0x43d9800043938000;
  (**(code **)(**(long **)(this + 0x428) + 0x98))(*(long **)(this + 0x428),&local_170);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x428),1);
  if (((byte)this_01[0x4330] & 1) == 0) {
    pUVar12 = this_01 + 0x4331;
  }
  else {
    pUVar12 = *(User **)(this_01 + 0x4340);
  }
  plVar10 = (long *)MakeLabel((char *)pUVar12,0xf,(Vec2 *)PTR_ZERO_00c41d10,5.0);
  *(long **)(this + 0x430) = plVar10;
  local_178 = 0x3f80000000000000;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_178);
  local_180 = 0x43d9800043c08000;
  (**(code **)(**(long **)(this + 0x430) + 0x98))(*(long **)(this + 0x430),&local_180);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x430),1);
  pSVar13 = operator_new(0x530);
                    /* try { // try from 00475c74 to 00475c93 has its CatchHandler @ 00476d04 */
  puVar14 = (uint3 *)GetColor(5);
  SquareBox::SquareBox(pSVar13,(ulong)*puVar14,0x96);
  local_188 = 0x3f80000000000000;
                    /* try { // try from 00475ca4 to 0047603f has its CatchHandler @ 00476cbc */
  (**(code **)(*(long *)pSVar13 + 0x148))(pSVar13,&local_188);
  uVar2 = DAT_009c6aac;
  (**(code **)(*(long *)pSVar13 + 0x90))(DAT_009c6aac,DAT_009c6ab0,pSVar13);
  pcVar23 = *(code **)(*(long *)pSVar13 + 0x98);
  pfVar15 = (float *)(**(code **)(**(long **)(this + 0x428) + 0xb0))();
  local_190 = *pfVar15 + -5.0;
  fStack_18c = pfVar15[1] + 10.0;
  (*pcVar23)(pSVar13,&local_190);
  (**(code **)(*(long *)this + 0x210))(this,pSVar13,0);
  *(undefined8 *)puVar3 = 0;
  plVar10 = *(long **)(this_01 + 0x43a8);
  *(long **)(this + 0x4a0) = plVar10;
  (**(code **)(*plVar10 + 0x170))(plVar10,1);
  *(undefined8 *)(this + 0x4c0) = *(undefined8 *)(this_01 + 0x43a0);
  puVar3 = PTR_g_InvenSkill_00c434c8;
  uVar21 = *(undefined8 *)(this_01 + 0x43b0);
  *(InventoryScene **)(this + 0x4b8) = this + 0x510;
  *(undefined8 *)(this + 0x4a8) = uVar21;
  *(undefined **)(this + 0x4b0) = puVar3;
  MakeShop((int)this);
  pfVar15 = (float *)(**(code **)(**(long **)(this + 0x4b8) + 0xb0))();
  local_198 = *pfVar15 + DAT_009c3d5c;
  fStack_194 = pfVar15[1] + DAT_009c6ab4;
  plVar10 = (long *)AtlasMgr::GetImg("item/0/gold.png");
  (**(code **)(*plVar10 + 0x98))(plVar10,&local_198);
  local_1a0 = 0x3e99999a00000000;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_1a0);
  (**(code **)(*(long *)this + 0x208))(this,plVar10);
  puVar3 = PTR_g_UserData_00c41478;
  iVar5 = UserData::GetGold((UserData *)PTR_g_UserData_00c41478);
  pcVar8 = (char *)MyUtil::IntToStr(iVar5);
  plVar10 = (long *)MakeLabel(pcVar8,0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(long **)(this + 0x458) = plVar10;
  local_198 = local_198 + 28.0;
  (**(code **)(*plVar10 + 0x98))(plVar10,&local_198);
  (**(code **)(**(long **)(this + 0x458) + 0x148))(*(long **)(this + 0x458),PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x458));
  plVar10 = (long *)AtlasMgr::GetImg("item/0/gem.png");
  local_198 = local_198 + DAT_009c48c8;
  (**(code **)(*plVar10 + 0x98))(plVar10,&local_198);
  local_1a8 = 0;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_1a8);
  (**(code **)(*(long *)this + 0x208))(this,plVar10);
  if (*(uint *)(puVar3 + 0x9c) == (*(uint *)(puVar3 + 0x98) + *(uint *)(puVar3 + 0x94) ^ 0x3edd3b2d)
     ) {
    uVar6 = *(uint *)(puVar3 + 0x98) ^ *(uint *)(puVar3 + 0x94);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar6 = 0;
  }
  pcVar8 = (char *)MyUtil::IntToStr(uVar6);
  plVar10 = (long *)MakeLabel(pcVar8,0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(long **)(this + 0x460) = plVar10;
  local_198 = local_198 + 25.0;
  (**(code **)(*plVar10 + 0x98))(plVar10,&local_198);
  (**(code **)(**(long **)(this + 0x460) + 0x148))(*(long **)(this + 0x460),PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x460));
  uVar21 = MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(undefined8 *)(this + 0x8c0) = uVar21;
  (**(code **)(**(long **)(this + 0x458) + 0x208))(*(long **)(this + 0x458),uVar21);
  uVar21 = MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(undefined8 *)(this + 0x8c8) = uVar21;
  (**(code **)(**(long **)(this + 0x460) + 0x208))(*(long **)(this + 0x460),uVar21);
  plVar10 = (long *)MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(long **)(this + 0x468) = plVar10;
  (**(code **)(*plVar10 + 200))(DAT_009c6ab8,DAT_009c5894);
  SetSkillPointString(this);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x468));
                    /* try { // try from 0047604c to 004760b7 has its CatchHandler @ 00476cfc */
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x4a0),1);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x4a8),1);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x4b0),1);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x4b8),1);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x4c0),1);
                    /* try { // try from 004760b8 to 004762b7 has its CatchHandler @ 00476cbc */
  SkillInven::UpdateInfo((SkillInven *)PTR_g_InvenSkill_00c434c8);
  lVar16 = User::Ins(puVar4[0x72]);
  RuneInven::UpdateInfo(*(RuneInven **)(lVar16 + 0x43b0));
  plVar10 = (long *)MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(long **)(this + 0x438) = plVar10;
  local_1b0 = 0x3f8000003f000000;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_1b0);
  local_1b8 = 0x436b000043c58000;
  (**(code **)(**(long **)(this + 0x438) + 0x98))(*(long **)(this + 0x438),&local_1b8);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x438),1);
  plVar10 = (long *)MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,5.0);
  *(long **)(this + 0x440) = plVar10;
  local_1c0 = 0x3f80000000000000;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_1c0);
  local_1c8 = 0x4348000043938000;
  (**(code **)(**(long **)(this + 0x440) + 0x98))(*(long **)(this + 0x440),&local_1c8);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x440),1);
  plVar10 = (long *)MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(long **)(this + 0x448) = plVar10;
  local_1d0 = 0x3f8000003f000000;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_1d0);
  local_1d8 = 0x43d7000043c58000;
  (**(code **)(**(long **)(this + 0x448) + 0x98))(*(long **)(this + 0x448),&local_1d8);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x448),1);
  plVar10 = (long *)MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,5.0);
  *(long **)(this + 0x450) = plVar10;
  local_1e0 = 0x3f80000000000000;
  (**(code **)(*plVar10 + 0x148))(plVar10,&local_1e0);
  local_1e8 = 0x43c5800043960000;
  (**(code **)(**(long **)(this + 0x450) + 0x98))(*(long **)(this + 0x450),&local_1e8);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x450),1);
  pSVar13 = operator_new(0x530);
                    /* try { // try from 004762b8 to 004762d7 has its CatchHandler @ 00476d10 */
  puVar14 = (uint3 *)GetColor(5);
  SquareBox::SquareBox(pSVar13,(ulong)*puVar14,0x96);
  local_1f0 = 0x3f80000000000000;
                    /* try { // try from 004762e8 to 00476367 has its CatchHandler @ 00476cbc */
  (**(code **)(*(long *)pSVar13 + 0x148))(pSVar13,&local_1f0);
  (**(code **)(*(long *)pSVar13 + 0x90))(uVar2,DAT_009c6abc,pSVar13);
  local_1f8 = 0x4375000043910000;
  (**(code **)(*(long *)pSVar13 + 0x98))(pSVar13,&local_1f8);
  (**(code **)(*(long *)this + 0x210))(this,pSVar13,0);
  plVar10 = (long *)cocos2d::Layer::create();
  *(long **)(this + 0x8d0) = plVar10;
  (**(code **)(*plVar10 + 200))(DAT_009c3d70,uVar1);
  puVar3 = PTR_ZERO_00c41d10;
  local_120[2] = (MenuItem *)0x0;
  local_120[3] = (MenuItem *)0x0;
  local_120[0] = (MenuItem *)0x0;
  local_120[1] = (MenuItem *)0x0;
  lVar16 = 0;
  do {
                    /* try { // try from 004763b4 to 004764a7 has its CatchHandler @ 00476cac */
    pNVar17 = (Node *)MakeLabel((&PTR_DAT_00bd8b10)[lVar16],0x14,(Vec2 *)puVar3,0.0);
    pMVar9 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar17,(function *)&local_100);
    local_120[lVar16] = pMVar9;
    (**(code **)(*(long *)pMVar9 + 0xe8))((float)(int)lVar16 * -25.0,pMVar9);
    local_200 = 0x3f00000000000000;
    (**(code **)(*(long *)pMVar9 + 0x148))(pMVar9,&local_200);
    (**(code **)(*(long *)pMVar9 + 0x2c0))(pMVar9,lVar16 + 100U & 0xffffffff);
    pSVar7 = (Size *)(**(code **)(*(long *)pMVar9 + 0x168))(pMVar9);
    cocos2d::Size::Size((Size *)&local_208,pSVar7);
    local_208 = 0x432a0000;
    (**(code **)(*(long *)pMVar9 + 0x160))(pMVar9,&local_208);
    (**(code **)(*(long *)pNVar17 + 0xd8))(0x41f00000,pNVar17);
    plVar10 = (long *)AtlasMgr::GetImg("ui/round.png");
    (**(code **)(*plVar10 + 200))(0x41200000,local_204 * 0.5,plVar10);
    (**(code **)(*(long *)pMVar9 + 0x208))(pMVar9,plVar10);
    lVar16 = lVar16 + 1;
  } while (lVar16 < 4);
                    /* try { // try from 004764bc to 004765d3 has its CatchHandler @ 00476cbc */
  plVar10 = (long *)cocos2d::Menu::create(local_120[0],local_120[1],local_120[2],local_120[3],0);
  puVar3 = PTR_g_Common_00c44818;
  (**(code **)(*plVar10 + 0x98))(plVar10,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x8d0) + 0x208))(*(long **)(this + 0x8d0),plVar10);
  plVar10 = (long *)AtlasMgr::GetImg("ui/point.png");
  *(long **)(this + 0x8d8) = plVar10;
  pcVar23 = *(code **)(*plVar10 + 200);
  uVar21 = (**(code **)(*(long *)local_120[*(int *)(puVar3 + 0x84)] + 0xf0))();
  (*pcVar23)(0x41200000,uVar21,plVar10);
  (**(code **)(**(long **)(this + 0x8d0) + 0x208))
            (*(long **)(this + 0x8d0),*(undefined8 *)(this + 0x8d8));
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x8d0));
  (**(code **)(**(long **)(this + 0x8d0) + 0x170))(*(long **)(this + 0x8d0),0);
  plVar10 = (long *)AtlasMgr::GetImg("ui/box.png");
  *(long **)(this + 0x500) = plVar10;
  (**(code **)(*plVar10 + 0x170))(plVar10,0);
  uVar1 = DAT_009c57b4;
  (**(code **)(**(long **)(this + 0x500) + 0x80))(DAT_009c57b4);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x500),0);
  puVar3 = PTR_ZERO_00c41d10;
  uVar2 = DAT_009c5f50;
  uStack_138 = _UNK_009c6ad8;
  local_140 = _DAT_009c6ad0;
  uStack_128 = 0x420c0000420c0000;
  uStack_130 = 0x420c0000420c0000;
  uVar24 = 0;
  puVar11 = &local_140;
  do {
                    /* try { // try from 00476628 to 00476703 has its CatchHandler @ 00476cb4 */
    pNVar17 = (Node *)AtlasMgr::GetImg("ui/box.png");
    (**(code **)(*(long *)pNVar17 + 0x490))(pNVar17,0xb4);
    pNVar18 = (Node *)AtlasMgr::GetImg("ui/box.png");
    plVar10 = (long *)cocos2d::MenuItemSprite::create(pNVar17,pNVar18,(function *)&local_100);
    *(long **)(this + uVar24 * 8 + 0x470) = plVar10;
    (**(code **)(*plVar10 + 0x90))(uVar1,0x3f000000);
    (**(code **)(**(long **)(this + uVar24 * 8 + 0x470) + 0x2c0))
              (*(long **)(this + uVar24 * 8 + 0x470),uVar24 & 0xffffffff);
    plVar10 = (long *)MakeLabel("",(&DAT_009c6ae0)[uVar24],(Vec2 *)puVar3,0.0);
    (**(code **)(**(long **)(this + uVar24 * 8 + 0x470) + 0x218))
              (*(long **)(this + uVar24 * 8 + 0x470),plVar10,0,0);
    (**(code **)(*plVar10 + 0x98))(plVar10,puVar11);
    (**(code **)(*plVar10 + 0x90))(uVar2,0x40000000,plVar10);
    (**(code **)(**(long **)(this + uVar24 * 8 + 0x470) + 0x170))
              (*(long **)(this + uVar24 * 8 + 0x470),0);
    uVar24 = uVar24 + 1;
    puVar11 = puVar11 + 1;
  } while ((long)uVar24 < 4);
                    /* try { // try from 00476714 to 00476883 has its CatchHandler @ 00476cbc */
  plVar10 = (long *)AtlasMgr::GetImg("item/0/gold.png");
  (**(code **)(*plVar10 + 200))(0xc1400000,0x41000000,plVar10);
  plVar19 = (long *)(**(code **)(**(long **)(this + 0x470) + 0x228))(*(long **)(this + 0x470),0);
  (**(code **)(*plVar19 + 0x208))(plVar19,plVar10);
  plVar10 = (long *)AtlasMgr::GetImg("item/0/gem.png");
  (**(code **)(*plVar10 + 200))(0xc1400000,0x41000000,plVar10);
  plVar19 = (long *)(**(code **)(**(long **)(this + 0x478) + 0x228))(*(long **)(this + 0x478),0);
  (**(code **)(*plVar19 + 0x208))(plVar19,plVar10);
  (**(code **)(**(long **)(this + 0x470) + 200))(DAT_009c6ac0,0x41c80000);
  uVar2 = DAT_009c58ac;
  (**(code **)(**(long **)(this + 0x478) + 200))(DAT_009c58ac,0x41c80000);
  (**(code **)(**(long **)(this + 0x480) + 200))(DAT_009c6a0c,0x41c80000);
  (**(code **)(**(long **)(this + 0x488) + 200))(uVar2,0x41c80000);
  plVar10 = (long *)cocos2d::Menu::create
                              (*(MenuItem **)(this + 0x470),*(undefined8 *)(this + 0x478),
                               *(undefined8 *)(this + 0x480),*(undefined8 *)(this + 0x488),0);
  (**(code **)(*(long *)pSVar13 + 0x370))(&local_218,pSVar13);
  local_220 = local_218;
  fStack_21c = local_214;
  (**(code **)(*plVar10 + 0x98))(plVar10,&local_220);
  (**(code **)(*(long *)this + 0x210))(this,plVar10,100);
                    /* try { // try from 00476884 to 00476a63 has its CatchHandler @ 00476cf4 */
  pNVar17 = (Node *)AtlasMgr::GetImg("ui/box.png");
  pNVar18 = (Node *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*(long *)pNVar18 + 0x80))(uVar1,pNVar18);
  (**(code **)(*(long *)pNVar18 + 0xd8))(0xc0600000,pNVar18);
  plVar10 = (long *)cocos2d::MenuItemSprite::create(pNVar17,pNVar18,(function *)&local_100);
  *(long **)(this + 0x490) = plVar10;
  (**(code **)(*plVar10 + 0x60))(0x3f000000);
  (**(code **)(**(long **)(this + 0x490) + 0x2c0))(*(long **)(this + 0x490),10);
  pcVar8 = (char *)GameMsg::Get(0x10,0);
  plVar10 = (long *)MakeLabel(pcVar8,0x14,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  (**(code **)(**(long **)(this + 0x490) + 0x218))(*(long **)(this + 0x490),plVar10,0,0);
  uVar2 = DAT_009c68b8;
  (**(code **)(*plVar10 + 200))(DAT_009c68b8,DAT_009c68b8,plVar10);
  (**(code **)(*plVar10 + 0x60))(0x40000000,plVar10);
  pNVar17 = (Node *)AtlasMgr::GetImg("ui/box.png");
  pNVar18 = (Node *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*(long *)pNVar18 + 0x80))(uVar1,pNVar18);
  (**(code **)(*(long *)pNVar18 + 0xd8))(0xc0600000,pNVar18);
  plVar10 = (long *)cocos2d::MenuItemSprite::create(pNVar17,pNVar18,(function *)&local_100);
  *(long **)(this + 0x498) = plVar10;
  (**(code **)(*plVar10 + 0x60))(0x3f000000);
  (**(code **)(**(long **)(this + 0x498) + 0x2c0))(*(long **)(this + 0x498),0xb);
  pcVar8 = (char *)GameMsg::Get(0x10,1);
  plVar10 = (long *)MakeLabel(pcVar8,0x14,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  (**(code **)(**(long **)(this + 0x498) + 0x218))(*(long **)(this + 0x498),plVar10,0,0);
  (**(code **)(*plVar10 + 200))(uVar2,uVar2,plVar10);
  (**(code **)(*plVar10 + 0x60))(0x40000000,plVar10);
                    /* try { // try from 00476a6c to 00476bab has its CatchHandler @ 00476cbc */
  cocos2d::Rect::operator=((Rect *)&local_218,(Rect *)(*(long *)(this_01 + 0x43a8) + 0x33c));
  local_228 = 0x418c000042200000;
  (**(code **)(**(long **)(this + 0x490) + 0x98))(*(long **)(this + 0x490),&local_228);
  local_230 = 0x418c000042f00000;
  (**(code **)(**(long **)(this + 0x498) + 0x98))(*(long **)(this + 0x498),&local_230);
  plVar10 = (long *)cocos2d::Menu::create
                              (*(MenuItem **)(this + 0x490),*(undefined8 *)(this + 0x498),0);
  local_234 = local_214 + local_20c;
  local_238 = local_218;
  (**(code **)(*plVar10 + 0x98))(plVar10,&local_238);
  (**(code **)(*(long *)this + 0x210))(this,plVar10,0);
  if (*(int *)(this + 0x410) != 10) {
    *(undefined4 *)(this + 0x410) = 10;
    (**(code **)(**(long **)(this + 0x4a8) + 0x170))(*(long **)(this + 0x4a8),0);
    (**(code **)(**(long **)(this + 0x4a0) + 0x170))(*(long **)(this + 0x4a0),1);
    if ((*(long *)PTR_selected_item_00c43ff8 != 0) &&
       (*(int *)(*(long *)(PTR_selected_item_00c43ff8 + 8) + 0x328) == 1)) {
      SelectItem(this,(BaseItem *)0x0);
    }
    (**(code **)(**(long **)(this + 0x490) + 0x490))(*(long **)(this + 0x490),0xff);
    (**(code **)(**(long **)(this + 0x498) + 0x490))(*(long **)(this + 0x498),100);
  }
  pEVar20 = (EventListener *)cocos2d::EventListenerKeyboard::create();
  local_d0 = PTR_vtable_00c42590 + 0x10;
  uStack_c8 = 0x620;
  local_c0 = 1;
  pIStack_b8 = this;
  local_b0 = &local_d0;
  std::__ndk1::function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)>::swap
            ((function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)> *)&local_d0,
             (function *)(pEVar20 + 0xd0));
  if (local_b0 == &local_d0) {
    pcVar23 = *(code **)(*local_b0 + 0x20);
  }
  else {
    if (local_b0 == (undefined **)0x0) goto LAB_00476c04;
    pcVar23 = *(code **)(*local_b0 + 0x28);
  }
  (*pcVar23)();
LAB_00476c04:
                    /* try { // try from 00476c08 to 00476c27 has its CatchHandler @ 00476cbc */
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(this + 0x1f0),pEVar20,(Node *)this);
  cocos2d::Node::schedule((_func_void_float *)this);
  if (local_e0 == &local_100) {
    (**(code **)(*local_e0 + 0x20))();
    lVar16 = *(long *)PTR___stack_chk_guard_00c419a0;
  }
  else {
    lVar16 = *(long *)PTR___stack_chk_guard_00c419a0;
    if (local_e0 != (undefined **)0x0) {
      (**(code **)(*local_e0 + 0x28))();
    }
  }
  if (lVar16 != lVar22) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: init
ADDRESS: 004807b0
========================================

/* LobbyScene::init() */

undefined8 __thiscall LobbyScene::init(LobbyScene *this)

{
  int iVar1;
  bool bVar2;
  float fVar3;
  float fVar4;
  undefined *puVar5;
  undefined *puVar6;
  undefined *puVar7;
  int iVar8;
  int iVar9;
  EventListener *pEVar10;
  char *pcVar11;
  MenuItem *pMVar12;
  long *plVar13;
  float *pfVar14;
  long *plVar15;
  undefined8 uVar16;
  long *plVar17;
  Sprite *pSVar18;
  Soul *this_00;
  SquareBox *pSVar19;
  Node *pNVar20;
  long lVar21;
  size_t sVar22;
  Label *pLVar23;
  undefined8 uVar24;
  BreakingSprite *pBVar25;
  undefined4 uVar26;
  uint uVar27;
  code *pcVar28;
  long lVar29;
  uint uVar30;
  ulong uVar31;
  ulong uVar32;
  int iVar33;
  undefined8 local_1e8;
  undefined8 local_1e0;
  float local_1d8 [2];
  undefined8 local_1d0;
  undefined8 local_1c8;
  undefined8 local_1c0;
  undefined8 local_1b8;
  undefined8 local_1b0;
  undefined8 local_1a8;
  undefined8 local_1a0;
  undefined8 local_198;
  undefined8 local_190;
  undefined8 local_188;
  float local_180 [2];
  undefined8 local_178;
  undefined8 local_170;
  undefined8 local_168;
  undefined8 local_160;
  char local_154 [4];
  MenuItem *local_150 [5];
  char local_124 [100];
  undefined *local_c0;
  undefined *puStack_b8;
  undefined8 local_b0;
  LobbyScene *pLStack_a8;
  undefined **local_a0;
  long local_88;
  
  puVar5 = PTR_g_Common_00c44818;
  local_88 = *(long *)PTR___stack_chk_guard_00c419a0;
  *(LobbyScene **)PTR_g_instance_00c40e98 = this;
  puVar5[0x65] = 0;
  CommonSystem::SaveCheck();
  cocos2d::LayerColor::initWithColor((LayerColor *)this,(Color4B *)&DAT_00c68e70);
  CommonSystem::SetParent((Layer *)this);
  pEVar10 = (EventListener *)cocos2d::EventListenerKeyboard::create();
  local_c0 = PTR_vtable_00c42c80 + 0x10;
  puStack_b8 = (undefined *)0x620;
  local_b0 = 1;
  pLStack_a8 = this;
  local_a0 = &local_c0;
  std::__ndk1::function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)>::swap
            ((function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)> *)&local_c0,
             (function *)(pEVar10 + 0xd0));
  if (local_a0 == &local_c0) {
    pcVar28 = *(code **)(*local_a0 + 0x20);
LAB_0048087c:
    (*pcVar28)();
  }
  else if (local_a0 != (undefined **)0x0) {
    pcVar28 = *(code **)(*local_a0 + 0x28);
    goto LAB_0048087c;
  }
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(this + 0x1f0),pEVar10,(Node *)this);
  local_a0 = &local_c0;
  local_c0 = PTR_vtable_00c40e70 + 0x10;
  puStack_b8 = PTR_MenuCallBack_00c40b18;
  local_b0 = 0;
  pLStack_a8 = this;
                    /* try { // try from 004808b4 to 00480a9b has its CatchHandler @ 004815e4 */
  pcVar11 = (char *)GameMsg::Get(5,5);
  local_160 = 0x43e1000000000000;
  pMVar12 = (MenuItem *)
            MyUtil::MakeLabelBtn(pcVar11,0x19,0,(Vec2 *)&local_160,(function *)&local_c0);
  local_168 = 0x3f80000000000000;
  (**(code **)(*(long *)pMVar12 + 0x148))(pMVar12,&local_168);
  pcVar11 = (char *)GameMsg::Get(5,6);
  local_170 = 0x43e1000044480000;
  plVar13 = (long *)MyUtil::MakeLabelBtn(pcVar11,0x19,6,(Vec2 *)&local_170,(function *)&local_c0);
  local_178 = 0x3f8000003f800000;
  (**(code **)(*plVar13 + 0x148))(plVar13,&local_178);
  pfVar14 = (float *)(**(code **)(*plVar13 + 0x168))(plVar13);
  local_180[0] = (DAT_009c46e8 - *pfVar14) + -10.0;
  local_180[1] = 445.0;
  plVar15 = (long *)MyUtil::MakeSpriteBtn("ui/stamina_bar.png",10,local_180,&local_c0,0xffffffff,0);
  local_188 = 0x3f8000003f800000;
  (**(code **)(*plVar15 + 0x148))(plVar15,&local_188);
  local_190 = 0x41700000420c0000;
  uVar16 = MakeLabel("",0x14,(Vec2 *)&local_190,0.0);
  *(undefined8 *)(this + 0x460) = uVar16;
  local_198 = 0x41700000425c0000;
  plVar17 = (long *)MakeLabel("",0x14,(Vec2 *)&local_198,0.0);
  *(long **)(this + 0x468) = plVar17;
  local_1a0 = 0x3f00000000000000;
  (**(code **)(*plVar17 + 0x148))(plVar17,&local_1a0);
  (**(code **)(*plVar15 + 0x208))(plVar15,*(undefined8 *)(this + 0x460));
  (**(code **)(*plVar15 + 0x208))(plVar15,*(undefined8 *)(this + 0x468));
  pSVar18 = (Sprite *)AtlasMgr::GetImg("ui/stamina.png");
  (**(code **)(*(long *)pSVar18 + 200))(0x41700000,0x41700000,pSVar18);
  (**(code **)(*plVar15 + 0x210))(plVar15,pSVar18,1);
  this_00 = operator_new(0x540);
                    /* try { // try from 00480a9c to 00480aa7 has its CatchHandler @ 0048162c */
  Effect::Soul::Soul(this_00,pSVar18);
  *(Soul **)(this + 0x458) = this_00;
  pcVar28 = *(code **)(*(long *)this_00 + 0x98);
                    /* try { // try from 00480abc to 00480b5f has its CatchHandler @ 004815e4 */
  uVar16 = (**(code **)(*(long *)pSVar18 + 0xb0))(pSVar18);
  (*pcVar28)(this_00,uVar16);
  (**(code **)(*plVar15 + 0x210))(plVar15,*(undefined8 *)(this + 0x458),2);
  plVar13 = (long *)cocos2d::Menu::create(pMVar12,plVar13,plVar15,0);
  (**(code **)(*plVar13 + 0x98))(plVar13,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x210))(this,plVar13,100);
  plVar13 = (long *)cocos2d::Layer::create();
  *(long **)(this + 0x450) = plVar13;
  (**(code **)(*plVar13 + 200))(DAT_009c5f60,DAT_009c5f64);
  pSVar19 = operator_new(0x530);
                    /* try { // try from 00480b74 to 00480b7f has its CatchHandler @ 00481638 */
  SquareBox::SquareBox(pSVar19,(ulong)*(uint3 *)PTR_BLACK_00c42fc0,0xe6);
                    /* try { // try from 00480b88 to 00480d2b has its CatchHandler @ 004815e4 */
  (**(code **)(*(long *)pSVar19 + 0x90))(DAT_009c46ec,DAT_009c48b8,pSVar19);
  (**(code **)(**(long **)(this + 0x450) + 0x208))(*(long **)(this + 0x450),pSVar19);
  local_1a8 = 0x42c8000000000000;
  uVar16 = MakeLabel(0,4,0,0x19,&local_1a8);
  (**(code **)(**(long **)(this + 0x450) + 0x208))(*(long **)(this + 0x450),uVar16);
  pNVar20 = (Node *)MakeLabel(0,4,1,0x19,PTR_ZERO_00c41d10);
  pMVar12 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar20,(function *)&local_c0);
  (**(code **)(*(long *)pMVar12 + 200))(0,0x41f00000,pMVar12);
  (**(code **)(*(long *)pMVar12 + 0x2c0))(pMVar12,0xb);
  pNVar20 = (Node *)MakeLabel(0,4,2,0x19,PTR_ZERO_00c41d10);
  plVar13 = (long *)cocos2d::MenuItemLabel::create(pNVar20,(function *)&local_c0);
  (**(code **)(*plVar13 + 200))(0,0xc1f00000,plVar13);
  (**(code **)(*plVar13 + 0x2c0))(plVar13,0xc);
  pcVar11 = (char *)GameMsg::Get(4,3);
  local_1b0 = 0xc2c8000000000000;
  uVar16 = MyUtil::MakeLabelBtn(pcVar11,0x14,0xd,(Vec2 *)&local_1b0,(function *)&local_c0);
  plVar13 = (long *)cocos2d::Menu::create(pMVar12,plVar13,uVar16,0);
  (**(code **)(*plVar13 + 0x98))(plVar13,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x450) + 0x210))(*(long **)(this + 0x450),plVar13,1);
  (**(code **)(**(long **)(this + 0x450) + 0x170))(*(long **)(this + 0x450),0);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x450),10);
  memset(local_124,0,100);
                    /* try { // try from 00480d40 to 00480fc7 has its CatchHandler @ 004815e4 */
  lVar21 = User::Ins(puVar5[0x72]);
  lVar29 = *(long *)(*(long *)(lVar21 + 0x43a8) + 0x368);
  uVar32 = *(long *)(*(long *)(lVar21 + 0x43a8) + 0x370) - lVar29;
  iVar8 = (int)(uVar32 >> 3);
  if (iVar8 < 1) {
    iVar33 = 0;
  }
  else {
    uVar31 = 0;
    iVar33 = 0;
    do {
      if (uVar31 < (uVar32 >> 3 & 0xffffffff)) {
        lVar21 = *(long *)(lVar29 + uVar31 * 8);
      }
      else {
        lVar21 = 0;
      }
      uVar31 = uVar31 + 1;
      if (lVar21 != 0) {
        iVar33 = iVar33 + 1;
      }
    } while ((long)uVar31 < (long)iVar8);
    if (iVar33 == 0) {
      iVar33 = 0;
    }
    else {
      pcVar11 = (char *)GameMsg::Get(0x45,4);
      iVar8 = UserData::GetInvenSize((UserData *)PTR_g_UserData_00c41478);
      sprintf(local_124,"%s %d/%d\n",pcVar11,iVar33,iVar8);
    }
  }
  puVar5 = PTR_g_UserData_00c41478;
  if (*(uint *)(PTR_g_UserData_00c41478 + 0x6c) ==
      (*(int *)(PTR_g_UserData_00c41478 + 0x68) + *(int *)(PTR_g_UserData_00c41478 + 100) ^
      0x3edd3b2dU)) {
    if (*(int *)(PTR_g_UserData_00c41478 + 0x68) != *(int *)(PTR_g_UserData_00c41478 + 100)) {
      sVar22 = strlen(local_124);
      pcVar11 = (char *)GameMsg::Get(0x10,0xc);
      if (*(uint *)(puVar5 + 0x6c) ==
          (*(uint *)(puVar5 + 0x68) + *(uint *)(puVar5 + 100) ^ 0x3edd3b2d)) {
        uVar30 = *(uint *)(puVar5 + 0x68) ^ *(uint *)(puVar5 + 100);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar30 = 0;
      }
      sprintf(local_124 + sVar22,"%s %d\n",pcVar11,uVar30);
    }
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
  }
  if (local_124[0] != '\0') {
    local_1b8 = 0x43c3000044458000;
    pLVar23 = (Label *)MakeLabel(local_124,0xf,(Vec2 *)&local_1b8,5.0);
    cocos2d::Label::setAlignment(pLVar23,2,*(undefined4 *)(pLVar23 + 0x454));
    local_1c0 = 0x3f8000003f800000;
    (**(code **)(*(long *)pLVar23 + 0x148))(pLVar23,&local_1c0);
    (**(code **)(*(long *)this + 0x208))(this,pLVar23);
  }
  if (7 < iVar33) goto LAB_00480f74;
  if (*(uint *)(puVar5 + 0x6c) == (*(uint *)(puVar5 + 0x68) + *(uint *)(puVar5 + 100) ^ 0x3edd3b2d))
  {
    if (0 < (int)(*(uint *)(puVar5 + 0x68) ^ *(uint *)(puVar5 + 100))) {
      if (*(uint *)(puVar5 + 0x3c) ==
          (*(int *)(puVar5 + 0x38) + *(int *)(puVar5 + 0x34) ^ 0x3edd3b2dU)) {
        if (*(int *)(puVar5 + 0x38) != *(int *)(puVar5 + 0x34)) goto LAB_00480f88;
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
      }
LAB_00480f74:
      local_1c8 = 0x43b90000442f0000;
      CommonSystem::ShowMarker((Vec2 *)&local_1c8);
    }
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
  }
LAB_00480f88:
  local_1d0 = 0x43c8000043c80000;
  uVar16 = MakeLabel("",0x1e,(Vec2 *)&local_1d0,0.0);
  *(undefined8 *)(this + 0x418) = uVar16;
  (**(code **)(*(long *)this + 0x208))(this,uVar16);
  puVar5 = PTR_ZERO_00c41d10;
  fVar4 = DAT_009c4880;
  fVar3 = DAT_009c3d68;
  local_150[3] = (MenuItem *)0x0;
  local_150[4] = (MenuItem *)0x0;
  local_150[1] = (MenuItem *)0x0;
  local_150[2] = (MenuItem *)0x0;
  local_150[0] = (MenuItem *)0x0;
  uVar32 = 0;
  do {
    iVar8 = (int)uVar32;
    uVar31 = uVar32 + 1;
    local_1d8[0] = (float)(iVar8 + -2) * fVar4 + fVar3;
    local_1d8[1] = 130.0;
    uVar26 = 0xffffffff;
    if (uVar32 == 4) {
      uVar26 = 1;
    }
                    /* try { // try from 0048103c to 0048110b has its CatchHandler @ 004815dc */
    pMVar12 = (MenuItem *)
              MyUtil::MakeSpriteBtn("ui/box.png",uVar31 & 0xffffffff,local_1d8,&local_c0,uVar26,0);
    local_150[uVar32] = pMVar12;
    local_154[2] = 0;
    local_154[0] = '\0';
    local_154[1] = '\0';
    sprintf(local_154,"%d",(int)uVar31);
    plVar13 = (long *)MakeLabel(local_154,0x28,(Vec2 *)puVar5,0.0);
    (**(code **)(*plVar13 + 0x98))(plVar13,local_1d8);
    (**(code **)(*plVar13 + 0x2c0))(plVar13,iVar8 + 200);
    (**(code **)(*(long *)this + 0x208))(this,plVar13);
    plVar13 = (long *)AtlasMgr::GetImg("ui/lock.png");
    (**(code **)(*plVar13 + 0x98))(plVar13,local_1d8);
    (**(code **)(*plVar13 + 0x2c0))(plVar13,iVar8 + 100);
    (**(code **)(*(long *)this + 0x208))(this,plVar13);
    uVar32 = uVar31;
  } while ((long)uVar31 < 5);
  local_1e0 = 0x43898000428c0000;
                    /* try { // try from 00481128 to 0048117f has its CatchHandler @ 00481624 */
  uVar16 = MyUtil::MakeSpriteBtn("ui/triangle.png",7,&local_1e0,&local_c0,0xffffffff,0);
  local_1e0 = 0x4389800044368000;
  uVar24 = MyUtil::MakeSpriteBtn("ui/triangle.png",8,&local_1e0,&local_c0,0xffffffff,1);
                    /* try { // try from 00481180 to 0048131f has its CatchHandler @ 004815e4 */
  pcVar11 = (char *)GameMsg::Get(3,0);
  puVar7 = PTR_g_Common_00c44818;
  puVar5 = PTR_g_UserData_00c41478;
  local_1e8 = 0x4302000044318000;
  plVar13 = (long *)MyUtil::MakeLabelBtn(pcVar11,0x19,9,(Vec2 *)&local_1e8,(function *)&local_c0);
  *(long **)(this + 0x448) = plVar13;
  (**(code **)(*plVar13 + 0x170))(plVar13,0);
  plVar13 = (long *)cocos2d::Menu::create
                              (local_150[0],local_150[1],local_150[2],local_150[3],local_150[4],
                               uVar16,uVar24,*(undefined8 *)(this + 0x448),0);
  (**(code **)(*plVar13 + 0x98))(plVar13,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x208))(this,plVar13);
  plVar13 = (long *)AtlasMgr::GetImg("ui/stamina.png");
  *(long **)(this + 0x470) = plVar13;
  (**(code **)(*plVar13 + 0xe8))(fVar4);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x470));
  *(undefined4 *)(this + 0x410) = 0;
  *(undefined8 *)(this + 0x440) = 0;
  *(undefined8 *)(this + 0x438) = 0;
  *(undefined8 *)(this + 0x430) = 0;
  *(undefined8 *)(this + 0x428) = 0;
  *(undefined8 *)(this + 0x420) = 0;
  uVar27 = (uint)*(undefined8 *)(puVar7 + 0x10);
  uVar30 = (uint)((ulong)*(undefined8 *)(puVar7 + 0x10) >> 0x20);
  if (*(uint *)(puVar7 + 0x18) == (uVar30 + uVar27 ^ 0x3edd3b2d)) {
    uVar30 = uVar30 ^ uVar27;
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar30 = 0;
  }
  SetAct(this,uVar30);
  if (puVar7[1] != '\0') {
    puVar7[100] = 0;
    puVar7[1] = 0;
    pcVar28 = *(code **)(*(long *)this + 0x228);
    if (*(uint *)(puVar5 + 0x24) ==
        (*(uint *)(puVar5 + 0x20) + *(uint *)(puVar5 + 0x1c) ^ 0x3edd3b2d)) {
      uVar30 = *(uint *)(puVar5 + 0x20) ^ *(uint *)(puVar5 + 0x1c);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar30 = 0;
    }
    plVar13 = (long *)(*pcVar28)(this,uVar30 + 99);
    pBVar25 = operator_new(0x4e0);
                    /* try { // try from 00481320 to 00481333 has its CatchHandler @ 00481648 */
    BreakingSprite::BreakingSprite(pBVar25,plVar13,8,1);
    pcVar28 = *(code **)(*(long *)pBVar25 + 0x98);
                    /* try { // try from 00481344 to 0048136b has its CatchHandler @ 004815e4 */
    uVar16 = (**(code **)(*plVar13 + 0xb0))(plVar13);
    (*pcVar28)(pBVar25,uVar16);
    (**(code **)(*(long *)this + 0x208))(this,pBVar25);
  }
  if (*(uint *)(puVar5 + 0x18) == (*(uint *)(puVar5 + 0x14) + *(uint *)(puVar5 + 0x10) ^ 0x3edd3b2d)
     ) {
                    /* try { // try from 00481390 to 004813ff has its CatchHandler @ 00481658 */
    if (((((*(uint *)(puVar5 + 0x14) ^ *(uint *)(puVar5 + 0x10)) != 3) ||
         ((lVar21 = RuneInven::GetEquipRune((RuneInven *)PTR_g_InvenRune_00c41fe8,0), lVar21 != 0 &&
          (*(int *)(lVar21 + 0x550) == 3)))) ||
        ((lVar21 = RuneInven::GetEquipRune((RuneInven *)PTR_g_InvenRune_00c41fe8,1), lVar21 != 0 &&
         (*(int *)(lVar21 + 0x550) == 3)))) ||
       (((lVar21 = RuneInven::GetEquipRune((RuneInven *)PTR_g_InvenRune_00c41fe8,2), lVar21 != 0 &&
         (*(int *)(lVar21 + 0x550) == 3)) ||
        ((lVar21 = RuneInven::GetEquipRune((RuneInven *)PTR_g_InvenRune_00c41fe8,3), lVar21 != 0 &&
         (*(int *)(lVar21 + 0x550) == 3)))))) goto LAB_00481428;
    bVar2 = true;
  }
  else {
                    /* try { // try from 00481418 to 0048156b has its CatchHandler @ 0048161c */
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
LAB_00481428:
    bVar2 = false;
  }
  CommonSystem::BlinkTip(true);
  puVar5 = PTR_g_UserData_00c41478;
  iVar8 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
  puVar6 = PTR_g_UserData_00c41478;
  if (iVar8 == 2) {
    iVar9 = *(int *)(puVar5 + 0xa0);
    iVar1 = *(int *)(puVar5 + 0xa4);
    if (*(uint *)(puVar5 + 0xa8) == (iVar1 + iVar9 ^ 0x3edd3b2dU)) {
      iVar8 = 0x11;
      if (iVar1 == iVar9) {
        iVar8 = 0x12;
      }
      if (!(bool)(bVar2 | iVar1 == iVar9)) goto LAB_0048148c;
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      iVar8 = 0x12;
    }
  }
  else if (bVar2) {
    iVar8 = 0x11;
  }
  else {
LAB_0048148c:
    if (puVar7[100] == '\0') {
      if (iVar33 < 8) {
        iVar8 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
        if (iVar8 == 1) {
          if (*(uint *)(puVar6 + 0x30) ==
              (*(uint *)(puVar6 + 0x2c) + *(uint *)(puVar6 + 0x28) ^ 0x3edd3b2d)) {
            if ((*(uint *)(puVar6 + 0x2c) ^ *(uint *)(puVar6 + 0x28)) == 5) {
              iVar8 = 6;
              goto LAB_00481550;
            }
          }
          else {
            SafeVarMgr::Get();
            SafeVarMgr::BanHack();
          }
        }
        iVar9 = GameMsg::GetTypeSize(0x47);
        iVar8 = rand();
        CommonSystem::BlinkTip(false);
        iVar33 = 0;
        if (iVar9 != 0) {
          iVar33 = iVar8 / iVar9;
        }
        iVar8 = iVar8 - iVar33 * iVar9;
      }
      else {
        iVar8 = 0;
      }
    }
    else {
      iVar8 = 1;
      (**(code **)(**(long **)(this + 0x448) + 0x170))(*(long **)(this + 0x448),1);
    }
  }
LAB_00481550:
  CommonSystem::SetTip(iVar8);
  cocos2d::Node::schedule((_func_void_float *)this);
  if (local_a0 == &local_c0) {
    pcVar28 = *(code **)(*local_a0 + 0x20);
  }
  else {
    if (local_a0 == (undefined **)0x0) goto LAB_00481598;
    pcVar28 = *(code **)(*local_a0 + 0x28);
  }
  (*pcVar28)();
LAB_00481598:
  if (*(long *)PTR___stack_chk_guard_00c419a0 != local_88) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: CommonSystem::SetParent
###########################################################################

========================================
FUNCTION: init
ADDRESS: 00483010
========================================

/* MainMenuScene::init() */

undefined8 __thiscall MainMenuScene::init(MainMenuScene *this)

{
  undefined4 uVar1;
  char cVar2;
  undefined4 uVar3;
  undefined4 uVar4;
  undefined *puVar5;
  undefined *puVar6;
  undefined *puVar7;
  int iVar8;
  int iVar9;
  Director *this_00;
  Size *pSVar10;
  long *plVar11;
  undefined8 uVar12;
  MenuItem *pMVar13;
  long *plVar14;
  Node *pNVar15;
  SquareBox *pSVar16;
  char *pcVar17;
  SettingLayer *this_01;
  float *pfVar18;
  undefined8 uVar19;
  EventListener *pEVar20;
  code *pcVar21;
  ulong uVar22;
  int iVar23;
  long lVar24;
  long lVar25;
  float fVar26;
  float fVar27;
  float fVar28;
  undefined8 local_3d8;
  undefined8 local_3d0;
  undefined8 local_3c8;
  undefined8 local_3c0;
  undefined8 local_3b8;
  undefined8 local_3b0;
  undefined8 local_3a8;
  undefined8 local_3a0;
  undefined8 local_398;
  undefined8 local_390;
  undefined8 local_388;
  Size aSStack_380 [4];
  float local_37c;
  float local_378;
  float local_374;
  uint3 local_370 [2];
  float local_368;
  float local_364;
  float local_360;
  float fStack_35c;
  undefined8 local_358;
  undefined8 local_350;
  undefined8 local_348;
  undefined8 local_340;
  undefined8 local_338;
  undefined8 local_330;
  undefined8 local_328;
  undefined8 local_320;
  float local_318;
  float fStack_314;
  float local_310;
  float fStack_30c;
  Color3B aCStack_308 [8];
  undefined8 local_300;
  float local_2f8;
  float local_2f4;
  char acStack_2f0 [256];
  long *local_1f0 [6];
  MenuItem *local_1c0 [13];
  MenuItem *local_158 [5];
  undefined *local_130;
  undefined *local_128;
  undefined8 local_120;
  MainMenuScene *local_118;
  undefined **local_110;
  char local_f8 [24];
  undefined *local_e0;
  undefined8 uStack_d8;
  undefined8 local_d0;
  MainMenuScene *pMStack_c8;
  undefined **local_c0;
  long local_a8;
  
  local_a8 = *(long *)PTR___stack_chk_guard_00c419a0;
  PTR_g_Common_00c44818[0x72] = 0;
  cocos2d::LayerColor::initWithColor((LayerColor *)this,(Color4B *)&DAT_00c68eb8);
  CommonSystem::SetParent((Layer *)this);
  this_00 = (Director *)cocos2d::Director::getInstance();
  pSVar10 = (Size *)cocos2d::Director::getWinSize(this_00);
  cocos2d::Size::Size((Size *)&local_2f8,pSVar10);
  local_f8[0x10] = '\0';
  local_f8[0x11] = '\0';
  local_f8[0x12] = '\0';
  local_f8[0x13] = '\0';
  local_f8[0] = '\0';
  local_f8[1] = '\0';
  local_f8[2] = '\0';
  local_f8[3] = '\0';
  local_f8[4] = '\0';
  local_f8[5] = '\0';
  local_f8[6] = '\0';
  local_f8[7] = '\0';
  local_f8[8] = '\0';
  local_f8[9] = '\0';
  local_f8[10] = '\0';
  local_f8[0xb] = '\0';
  local_f8[0xc] = '\0';
  local_f8[0xd] = '\0';
  local_f8[0xe] = '\0';
  local_f8[0xf] = '\0';
  sprintf(local_f8,"ver %d.%d.%d",(uint)DAT_00c68ebc,(uint)DAT_00c68ebd,(uint)DAT_00c68ebe);
  local_300 = 0x40a0000040a00000;
  plVar11 = (long *)MakeLabel(local_f8,0xc,(Vec2 *)&local_300,0.0);
  (**(code **)(*plVar11 + 0x148))(plVar11,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x208))(this,plVar11);
  fVar26 = local_2f8 * 0.5;
  fVar28 = local_2f4 / DAT_009c48e4;
  plVar11 = (long *)AtlasMgr::GetImg("ui/title.png");
  pcVar21 = *(code **)(*plVar11 + 0x4c0);
  cocos2d::Color3B::Color3B(aCStack_308,200,200,200);
  (*pcVar21)(plVar11,aCStack_308);
  local_310 = fVar26;
  fStack_30c = fVar28;
  (**(code **)(*plVar11 + 0x98))(plVar11,&local_310);
  (**(code **)(*(long *)this + 0x210))(this,plVar11,0);
  plVar11 = (long *)AtlasMgr::GetImg("ui/title_efx.png");
  *(long **)(this + 0x410) = plVar11;
  local_318 = fVar26;
  fStack_314 = fVar28;
  (**(code **)(*plVar11 + 0x98))(plVar11,&local_318);
  (**(code **)(**(long **)(this + 0x410) + 0x490))(*(long **)(this + 0x410),0);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x410),0);
  local_320 = 0x4396000043c80000;
  plVar11 = (long *)MakeLabel(0,0x45,0,0xf,&local_320);
  pcVar21 = *(code **)(*plVar11 + 0x4c0);
  uVar12 = GetColor(0xf);
  (*pcVar21)(plVar11,uVar12);
  (**(code **)(*(long *)this + 0x208))(this,plVar11);
  local_328 = 0x4396000044098000;
  uVar12 = MakeLabel("",0xf,(Vec2 *)&local_328,0.0);
  *(undefined8 *)(this + 0x450) = uVar12;
  (**(code **)(*(long *)this + 0x208))(this,uVar12);
  cocos2d::Node::schedule((_func_void_float *)this);
  local_110 = &local_130;
  local_130 = PTR_vtable_00c41210 + 0x10;
  local_128 = PTR_MenuCallback_00c42d88;
  local_120 = 0;
  local_330 = 0x4320000000000000;
                    /* try { // try from 004832bc to 00483483 has its CatchHandler @ 00484580 */
  local_118 = this;
  pMVar13 = (MenuItem *)
            MyUtil::MakeSpriteBtn("ui/facebook.png",0x17,&local_330,&local_130,0xffffffff,0);
  local_338 = 0x42c8000000000000;
  plVar11 = (long *)MyUtil::MakeSpriteBtn("ui/achieve.png",0x15,&local_338,&local_130,0xffffffff,0);
  local_340 = 0x4220000000000000;
  plVar14 = (long *)MyUtil::MakeSpriteBtn("ui/rank.png",0x16,&local_340,&local_130,0xffffffff,0);
  local_348 = 0xc000000041b80000;
  uVar12 = MakeLabel(0,5,0x10,0xb,&local_348);
  (**(code **)(*plVar11 + 0x208))(plVar11,uVar12);
  local_350 = 0xc000000041b80000;
  uVar12 = MakeLabel(0,5,0x11,0xb,&local_350);
  (**(code **)(*plVar14 + 0x208))(plVar14,uVar12);
  local_358 = 0xc0e0000041900000;
  uVar12 = MakeLabel(0,5,0x12,0xb,&local_358);
  (**(code **)(*(long *)pMVar13 + 0x208))(pMVar13,uVar12);
  plVar11 = (long *)cocos2d::Menu::create(pMVar13,plVar11,plVar14,0);
  (**(code **)(*plVar11 + 200))(DAT_009c7c10,DAT_009c48b8,plVar11);
  (**(code **)(*(long *)this + 0x208))(this,plVar11);
  local_158[4] = (MenuItem *)0x0;
  local_158[3] = (MenuItem *)0x0;
  local_158[2] = (MenuItem *)0x0;
  local_158[1] = (MenuItem *)0x0;
  local_158[0] = (MenuItem *)0x0;
  pNVar15 = (Node *)MakeLabel(0,1,0,0x1e,PTR_ZERO_00c41d10);
  plVar11 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
  (**(code **)(*plVar11 + 0x2c0))(plVar11,0xc);
  puVar6 = PTR_ZERO_00c41d10;
  fVar28 = DAT_009c6a08;
  fVar26 = DAT_009c48f4;
  uVar22 = 0;
  fVar27 = local_2f4 * 0.5 + 20.0;
  do {
    while( true ) {
                    /* try { // try from 004834c4 to 00483547 has its CatchHandler @ 0048354c */
      pNVar15 = (Node *)MakeLabel(0,5,uVar22 & 0xffffffff,0x1e,puVar6);
      pMVar13 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
      local_158[uVar22] = pMVar13;
      local_360 = local_2f8 * 0.5;
      fStack_35c = fVar27;
      (**(code **)(*(long *)pMVar13 + 0x98))(pMVar13,&local_360);
      (**(code **)(*(long *)pMVar13 + 0x2c0))(pMVar13,uVar22 & 0xffffffff);
      puVar7 = PTR_g_Settings_00c440f0;
      fVar27 = fVar27 + fVar26;
      if (uVar22 != 0) break;
      (**(code **)(*plVar11 + 200))(local_2f8 * 0.5,fVar27,plVar11);
      fVar27 = fVar27 + fVar28;
      uVar22 = 1;
    }
    uVar22 = uVar22 + 1;
  } while ((long)uVar22 < 5);
                    /* try { // try from 0048356c to 004836d3 has its CatchHandler @ 00484580 */
  pNVar15 = (Node *)MakeLabel((&PTR_s_English_00bde2c0)[*(uint *)(PTR_g_Settings_00c440f0 + 8)],0x19
                              ,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  plVar14 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
  (**(code **)(*plVar14 + 200))(DAT_009c7c14,0x41f00000,plVar14);
  (**(code **)(*plVar14 + 0x2c0))(plVar14,0x19);
  pSVar10 = (Size *)(**(code **)(*plVar14 + 0x168))(plVar14);
  cocos2d::Size::Size((Size *)&local_368,pSVar10);
  local_368 = local_368 + 20.0;
  local_364 = local_364 + 20.0;
  (**(code **)(*plVar14 + 0x160))(plVar14,&local_368);
  (**(code **)(*(long *)pNVar15 + 0xe8))(0x41a00000,pNVar15);
  plVar11 = (long *)cocos2d::Menu::create
                              (local_158[0],plVar11,local_158[1],local_158[2],local_158[3],
                               local_158[4],plVar14,0);
  *(long **)(this + 0x418) = plVar11;
  (**(code **)(*plVar11 + 0x98))(plVar11,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x418));
  plVar11 = (long *)cocos2d::Layer::create();
  *(long **)(this + 0x460) = plVar11;
  uVar4 = DAT_009c48f0;
  uVar3 = DAT_009c3d68;
  (**(code **)(*plVar11 + 200))(DAT_009c3d68,DAT_009c48f0);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x460));
  (**(code **)(**(long **)(this + 0x460) + 0x170))(*(long **)(this + 0x460),0);
  pSVar16 = operator_new(0x530);
                    /* try { // try from 004836d4 to 004836ff has its CatchHandler @ 00484598 */
  cocos2d::Color3B::Color3B((Color3B *)local_370,'\0','\0','\0');
  SquareBox::SquareBox(pSVar16,(ulong)local_370[0],0x96);
                    /* try { // try from 00483708 to 00483733 has its CatchHandler @ 00484580 */
  (**(code **)(*(long *)pSVar16 + 0x90))(DAT_009c3d6c,DAT_009c589c,pSVar16);
  (**(code **)(**(long **)(this + 0x460) + 0x208))(*(long **)(this + 0x460),pSVar16);
  puVar6 = PTR_ZERO_00c41d10;
  uVar1 = *(undefined4 *)(puVar7 + 8);
  lVar24 = 0;
  do {
    pcVar17 = (&PTR_s_English_00bde2c0)[lVar24];
    iVar23 = (int)lVar24;
    *(int *)(puVar7 + 8) = iVar23;
                    /* try { // try from 0048375c to 004837d7 has its CatchHandler @ 00484578 */
    pNVar15 = (Node *)MakeLabel(pcVar17,0x19,(Vec2 *)puVar6,0.0);
    pMVar13 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
    local_1c0[lVar24] = pMVar13;
    (**(code **)(*(long *)pMVar13 + 0x2c0))(pMVar13,lVar24 + 0x1aU & 0xffffffff);
    iVar9 = iVar23 + 3;
    if (-1 < iVar23) {
      iVar9 = iVar23;
    }
    (**(code **)(*(long *)pMVar13 + 200))
              ((float)((iVar23 % 4) * 0x8c + -0xd2),(float)((iVar9 >> 2) * -0x37 + 100),pMVar13);
    lVar24 = lVar24 + 1;
  } while (lVar24 < 0xd);
  *(undefined4 *)(puVar7 + 8) = uVar1;
                    /* try { // try from 004837ec to 004837f7 has its CatchHandler @ 00484580 */
  plVar11 = (long *)cocos2d::Menu::create(local_1c0[0],0);
                    /* try { // try from 00483804 to 004838e7 has its CatchHandler @ 00484588 */
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[1]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[2]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[3]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[4]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[5]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[6]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[7]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[8]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[9]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[10]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[0xb]);
  (**(code **)(*plVar11 + 0x208))(plVar11,local_1c0[0xc]);
                    /* try { // try from 004838f0 to 0048391f has its CatchHandler @ 00484580 */
  (**(code **)(*plVar11 + 0x98))(plVar11,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x460) + 0x208))(*(long **)(this + 0x460),plVar11);
  this_01 = operator_new(0x3d0);
                    /* try { // try from 00483920 to 00483927 has its CatchHandler @ 0048459c */
  SettingLayer::SettingLayer(this_01);
  *(SettingLayer **)(this + 0x448) = this_01;
                    /* try { // try from 00483934 to 004839df has its CatchHandler @ 00484580 */
  (**(code **)(*(long *)this_01 + 200))(uVar3,uVar4,this_01);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x448),10);
  (**(code **)(**(long **)(this + 0x448) + 0x170))(*(long **)(this + 0x448),0);
  uVar12 = cocos2d::Layer::create();
  *(undefined8 *)(this + 0x420) = uVar12;
  local_1f0[5] = (long *)0x0;
  local_1f0[4] = (long *)0x0;
  local_1f0[3] = (long *)0x0;
  local_1f0[2] = (long *)0x0;
  local_1f0[1] = (long *)0x0;
  local_1f0[0] = (long *)0x0;
  plVar11 = (long *)MakeLabel(0,5,8,0x1e,PTR_ZERO_00c41d10);
  (**(code **)(*plVar11 + 200))(uVar3,DAT_009c7c18,plVar11);
  (**(code **)(**(long **)(this + 0x420) + 0x208))(*(long **)(this + 0x420),plVar11);
  puVar6 = PTR_ZERO_00c41d10;
  fVar27 = DAT_009c7c1c;
  fVar28 = DAT_009c5890;
  fVar26 = DAT_009c3d5c;
  lVar25 = 0;
  lVar24 = 0;
  iVar9 = -0xfa;
  do {
                    /* try { // try from 00483a28 to 00483c13 has its CatchHandler @ 00484540 */
    pNVar15 = (Node *)MakeLabel(0x41200000,5,lVar25 + 9U & 0xffffffff,0x14,puVar6);
    cocos2d::Label::setAlignment((Label *)pNVar15,1,*(undefined4 *)(pNVar15 + 0x454));
    plVar11 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
    *(long **)(this + lVar24 * 8 + 0x428) = plVar11;
    (**(code **)(*plVar11 + 0x2c0))(plVar11,(int)lVar24 + 6);
    local_378 = (float)iVar9;
    local_374 = -60.0;
    (**(code **)(**(long **)(this + lVar24 * 8 + 0x428) + 0x98))
              (*(long **)(this + lVar24 * 8 + 0x428),&local_378);
    (**(code **)(*(long *)pNVar15 + 0xe8))(0x41a00000,pNVar15);
    pSVar10 = (Size *)(**(code **)(**(long **)(this + lVar24 * 8 + 0x428) + 0x168))();
    cocos2d::Size::Size(aSStack_380,pSVar10);
    local_37c = local_37c + 20.0;
    (**(code **)(**(long **)(this + lVar24 * 8 + 0x428) + 0x160))
              (*(long **)(this + lVar24 * 8 + 0x428),aSStack_380);
    plVar11 = (long *)MakeLabel(0,5,(int)(lVar25 + 9U) + 1,0xf,puVar6);
    pcVar21 = *(code **)(*plVar11 + 200);
    pfVar18 = (float *)(**(code **)(*(long *)pNVar15 + 0x168))(pNVar15);
    (*pcVar21)(*pfVar18 * 0.5,0xc1700000,plVar11);
    (**(code **)(*(long *)pNVar15 + 0x208))(pNVar15,plVar11);
    local_374 = local_374 + fVar28;
    pNVar15 = (Node *)MakeLabel(0,5,0x13,0x12,puVar6);
    plVar11 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
    local_1f0[lVar25] = plVar11;
    (**(code **)(*plVar11 + 0x2c0))(plVar11,(int)lVar25 + 0xf);
    (**(code **)(*local_1f0[lVar25] + 200))(local_378 + fVar27,local_374);
    (**(code **)(*local_1f0[lVar25] + 0x170))(local_1f0[lVar25],0);
    pNVar15 = (Node *)MakeLabel(0,5,0x14,0x12,puVar6);
    plVar11 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
    local_1f0[lVar25 + 1] = plVar11;
    (**(code **)(*plVar11 + 0x2c0))(plVar11,(int)lVar25 + 0x10);
    (**(code **)(*local_1f0[lVar25 + 1] + 200))(local_378 + fVar26,local_374);
    (**(code **)(*local_1f0[lVar25 + 1] + 0x170))(local_1f0[lVar25 + 1],0);
    lVar24 = lVar24 + 1;
    lVar25 = lVar25 + 2;
    iVar9 = iVar9 + 0xfa;
  } while (lVar24 < 3);
  iVar9 = (int)lVar25 + 9;
                    /* try { // try from 00483c2c to 00483c8f has its CatchHandler @ 00484580 */
  pNVar15 = (Node *)MakeLabel(0,5,iVar9,0x1e,PTR_ZERO_00c41d10);
  puVar7 = PTR_g_Common_00c44818;
  plVar11 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
  (**(code **)(*plVar11 + 0x2c0))(plVar11,9);
  local_388 = 0xc32a000000000000;
  (**(code **)(*plVar11 + 0x98))(plVar11,&local_388);
  puVar6 = PTR_g_UserData_00c41478;
  if (*(uint *)(PTR_g_UserData_00c41478 + 0xc) ==
      (*(int *)(PTR_g_UserData_00c41478 + 8) + *(int *)(PTR_g_UserData_00c41478 + 4) ^ 0x3edd3b2dU))
  {
    if (*(int *)(PTR_g_UserData_00c41478 + 8) == *(int *)(PTR_g_UserData_00c41478 + 4))
    goto LAB_00483d54;
                    /* try { // try from 00483ccc to 00483d37 has its CatchHandler @ 00483d3c */
    (**(code **)(*local_1f0[0] + 0x170))(local_1f0[0],1);
    (**(code **)(*local_1f0[1] + 0x170))(local_1f0[1],1);
    (**(code **)(*local_1f0[2] + 0x170))(local_1f0[2],1);
    (**(code **)(*local_1f0[3] + 0x170))(local_1f0[3],1);
    (**(code **)(*local_1f0[4] + 0x170))(local_1f0[4],1);
    (**(code **)(*local_1f0[5] + 0x170))(local_1f0[5],1);
  }
  else {
                    /* try { // try from 00483d44 to 00483d63 has its CatchHandler @ 00484580 */
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
LAB_00483d54:
    puVar5 = PTR_g_UserData_00c41478;
    iVar8 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
    iVar23 = iVar8 + -1;
    if (iVar8 < 2) {
      if (iVar8 == 1) {
        if (*(uint *)(puVar5 + 0x30) ==
            (*(uint *)(puVar5 + 0x2c) + *(uint *)(puVar5 + 0x28) ^ 0x3edd3b2d)) {
          if (0 < (int)(*(uint *)(puVar5 + 0x2c) ^ *(uint *)(puVar5 + 0x28))) {
            (**(code **)(*local_1f0[0] + 0x170))(local_1f0[0],1);
          }
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
        }
        goto LAB_00483ef4;
      }
    }
    else {
                    /* try { // try from 00483d7c to 00483ef3 has its CatchHandler @ 00484590 */
      (**(code **)(*local_1f0[0] + 0x170))(local_1f0[0],1);
      (**(code **)(*local_1f0[1] + 0x170))(local_1f0[1],1);
    }
    if (iVar23 < 2) {
      if (iVar23 == 1) {
        if (*(uint *)(puVar5 + 0x30) ==
            (*(uint *)(puVar5 + 0x2c) + *(uint *)(puVar5 + 0x28) ^ 0x3edd3b2d)) {
          if (0 < (int)(*(uint *)(puVar5 + 0x2c) ^ *(uint *)(puVar5 + 0x28))) {
            (**(code **)(*local_1f0[2] + 0x170))(local_1f0[2],1);
          }
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
        }
      }
    }
    else {
      (**(code **)(*local_1f0[2] + 0x170))(local_1f0[2],1);
      (**(code **)(*local_1f0[3] + 0x170))(local_1f0[3],1);
      if (iVar23 < 3) {
        if (*(uint *)(puVar5 + 0x30) ==
            (*(uint *)(puVar5 + 0x2c) + *(uint *)(puVar5 + 0x28) ^ 0x3edd3b2d)) {
          if (0 < (int)(*(uint *)(puVar5 + 0x2c) ^ *(uint *)(puVar5 + 0x28))) {
            (**(code **)(*local_1f0[4] + 0x170))(local_1f0[4],1);
          }
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
        }
      }
      else {
        (**(code **)(*local_1f0[4] + 0x170))(local_1f0[4],1);
        (**(code **)(*local_1f0[5] + 0x170))(local_1f0[5],1);
      }
    }
  }
LAB_00483ef4:
                    /* try { // try from 00483f18 to 0048418f has its CatchHandler @ 00484580 */
  uVar12 = cocos2d::Menu::create
                     (*(MenuItem **)(this + 0x428),*(undefined8 *)(this + 0x430),
                      *(undefined8 *)(this + 0x438),plVar11,local_1f0[0],local_1f0[1],local_1f0[2],
                      local_1f0[3],local_1f0[4],local_1f0[5],0);
  (**(code **)(**(long **)(this + 0x420) + 0x208))(*(long **)(this + 0x420),uVar12);
  (**(code **)(*(long *)this + 0x218))(this,*(undefined8 *)(this + 0x420),0,5);
  (**(code **)(**(long **)(this + 0x420) + 0x170))(*(long **)(this + 0x420),0);
  uVar12 = cocos2d::Layer::create();
  *(undefined8 *)(this + 0x440) = uVar12;
  pNVar15 = (Node *)MakeLabel(0,5,iVar9,0x1e,PTR_ZERO_00c41d10);
  plVar11 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
  local_390 = 0xc32a000000000000;
  (**(code **)(*plVar11 + 0x98))(plVar11,&local_390);
  (**(code **)(*plVar11 + 0x2c0))(plVar11,9);
  pNVar15 = (Node *)MakeLabel(0,3,2,0x1e,PTR_ZERO_00c41d10);
  pMVar13 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
  local_398 = 0xc2f00000c3160000;
  (**(code **)(*(long *)pMVar13 + 0x98))(pMVar13,&local_398);
  (**(code **)(*(long *)pMVar13 + 0x2c0))(pMVar13,10);
  pNVar15 = (Node *)MakeLabel(0,3,2,0x1e,PTR_ZERO_00c41d10);
  plVar14 = (long *)cocos2d::MenuItemLabel::create(pNVar15,(function *)&local_130);
  local_3a0 = 0xc2f0000043160000;
  (**(code **)(*plVar14 + 0x98))(plVar14,&local_3a0);
  (**(code **)(*plVar14 + 0x2c0))(plVar14,0xb);
  plVar11 = (long *)cocos2d::Menu::create(pMVar13,plVar14,plVar11,0);
  (**(code **)(*plVar11 + 0x98))(plVar11,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),plVar11);
  (**(code **)(**(long **)(this + 0x440) + 200))(uVar3,DAT_009c4ba8);
  local_3a8 = 0x41f0000000000000;
  uVar12 = MakeLabel(0,3,7,0x19,&local_3a8);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),uVar12);
  local_3b0 = 0xc1a00000c3160000;
  uVar12 = MakeLabel(0,3,0,0x19,&local_3b0);
  local_3b8 = 0xc1a0000043160000;
  uVar19 = MakeLabel(0,3,1,0x19,&local_3b8);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),uVar12);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),uVar19);
  memset(acStack_2f0,0,0x100);
                    /* try { // try from 004841a0 to 00484447 has its CatchHandler @ 00484580 */
  pcVar17 = (char *)GameMsg::Get(3,3);
  if (*(uint *)(puVar6 + 0xe4) == (*(uint *)(puVar6 + 0xe0) + *(uint *)(puVar6 + 0xdc) ^ 0x3edd3b2d)
     ) {
    uVar22 = (ulong)(*(uint *)(puVar6 + 0xe0) ^ *(uint *)(puVar6 + 0xdc));
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar22 = 0;
  }
  sprintf(acStack_2f0,pcVar17,uVar22);
  local_3c0 = 0xc28c0000c3160000;
  uVar12 = MakeLabel(acStack_2f0,0x14,(Vec2 *)&local_3c0,0.0);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),uVar12);
  pcVar17 = (char *)GameMsg::Get(3,3);
  if (*(uint *)(puVar6 + 0xcc) == (*(uint *)(puVar6 + 200) + *(uint *)(puVar6 + 0xc4) ^ 0x3edd3b2d))
  {
    uVar22 = (ulong)(*(uint *)(puVar6 + 200) ^ *(uint *)(puVar6 + 0xc4));
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar22 = 0;
  }
  sprintf(acStack_2f0,pcVar17,uVar22);
  local_3c8 = 0xc28c000043160000;
  uVar12 = MakeLabel(acStack_2f0,0x14,(Vec2 *)&local_3c8,0.0);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),uVar12);
  local_3d0 = 0xc2200000c3160000;
  uVar12 = MakeLabel(0,3,5,0xf,&local_3d0);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),uVar12);
  local_3d8 = 0xc220000043160000;
  uVar12 = MakeLabel(0,3,6,0xf,&local_3d8);
  (**(code **)(**(long **)(this + 0x440) + 0x208))(*(long **)(this + 0x440),uVar12);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x440),10);
  (**(code **)(**(long **)(this + 0x440) + 0x170))(*(long **)(this + 0x440),0);
  cVar2 = puVar7[2];
  *(MainMenuScene **)PTR_g_main_menu_00c40e40 = this;
  if (cVar2 != '\0') {
    puVar7[2] = 0;
    this[0x458] = (MainMenuScene)0x1;
    CommonSystem::HideSceen(true);
    if (*(int *)(puVar7 + 0x7c) == 0) {
      if (((*PTR_ins_00c40c88 & 1) == 0) &&
         (iVar9 = __cxa_guard_acquire(PTR_ins_00c40c88), puVar5 = PTR_ins_00c40c90, iVar9 != 0)) {
        *(undefined8 *)(PTR_ins_00c40c90 + 0x28) = 0;
        *(undefined4 *)(puVar5 + 0x34) = 0;
        *(undefined2 *)(puVar5 + 0x38) = 0;
        *(undefined2 *)(puVar5 + 4) = 0;
        *(undefined4 *)puVar5 = 0;
        *(undefined4 *)(puVar5 + 0x20) = 0;
        *(undefined8 *)(puVar5 + 0x10) = 0;
        *(undefined8 *)(puVar5 + 0x18) = 0;
        *(undefined8 *)(puVar5 + 8) = 0;
        __cxa_atexit(PTR__PlayService_00c40a30,puVar5,PTR_DAT_00c41ab0);
        __cxa_guard_release(PTR_ins_00c40c88);
      }
      PlayService::CheckAchievement((PlayService *)PTR_ins_00c40c90,0);
      if (*(uint *)(puVar6 + 0x18) ==
          (*(uint *)(puVar6 + 0x14) + *(uint *)(puVar6 + 0x10) ^ 0x3edd3b2d)) {
        iVar9 = (*(uint *)(puVar6 + 0x14) ^ *(uint *)(puVar6 + 0x10)) - 1;
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        iVar9 = -1;
      }
      CommonSystem::OpenMarketMenu(iVar9);
    }
  }
  puVar7[0x78] = 0;
  *(undefined4 *)(puVar7 + 0x7c) = 0;
  SndMgr::PlayBGM(1);
  CommonSystem::ShowBottomMenu();
  pEVar20 = (EventListener *)cocos2d::EventListenerKeyboard::create();
  local_e0 = PTR_vtable_00c42698 + 0x10;
  uStack_d8 = 0x620;
  local_d0 = 1;
  pMStack_c8 = this;
  local_c0 = &local_e0;
  std::__ndk1::function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)>::swap
            ((function<void(cocos2d::EventKeyboard::KeyCode,cocos2d::Event*)> *)&local_e0,
             (function *)(pEVar20 + 0xd0));
  if (local_c0 == &local_e0) {
    pcVar21 = *(code **)(*local_c0 + 0x20);
  }
  else {
    if (local_c0 == (undefined **)0x0) goto LAB_004844a0;
    pcVar21 = *(code **)(*local_c0 + 0x28);
  }
  (*pcVar21)();
LAB_004844a0:
                    /* try { // try from 004844a4 to 004844b7 has its CatchHandler @ 00484580 */
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(this + 0x1f0),pEVar20,(Node *)this);
  UpdateProgress(this);
  if (local_110 == &local_130) {
    (**(code **)(*local_110 + 0x20))();
    lVar24 = *(long *)PTR___stack_chk_guard_00c419a0;
  }
  else {
    lVar24 = *(long *)PTR___stack_chk_guard_00c419a0;
    if (local_110 != (undefined **)0x0) {
      (**(code **)(*local_110 + 0x28))();
    }
  }
  if (lVar24 != local_a8) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: GetImg
ADDRESS: 0041f790
========================================

void AtlasMgr::GetImg(char *param_1)

{
  (*(code *)PTR_GetImg_00c3d2b0)();
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: Character
ADDRESS: 004480b0
========================================

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* Character::Character(CharacterType, int) */

void __thiscall Character::Character(Character *this,uint param_2,uint param_3)

{
  Sprite *this_00;
  undefined *puVar1;
  PartOfBody *pPVar2;
  PartOfBody *pPVar3;
  Character *pCVar4;
  char *param0;
  PartOfBody *pPVar5;
  PartOfBody *pPVar6;
  PartOfBody *pPVar7;
  PartOfBody *pPVar8;
  PartOfBody *pPVar9;
  PartOfBody *pPVar10;
  Character *pCVar11;
  Character *pCVar12;
  Character *pCVar13;
  uint uVar14;
  undefined *puVar15;
  int iVar16;
  undefined8 uVar17;
  long *plVar18;
  size_t sVar19;
  MsgBox *pMVar20;
  long lVar21;
  code *pcVar22;
  char *param2;
  undefined8 local_1a0;
  undefined8 local_198;
  undefined8 local_190;
  undefined8 local_188;
  undefined8 local_180;
  undefined8 local_178;
  undefined8 local_170;
  undefined8 local_168;
  undefined8 local_160;
  undefined8 local_158;
  undefined8 local_150;
  undefined8 local_148;
  undefined8 local_140;
  undefined8 local_138;
  undefined4 local_130;
  undefined4 uStack_12c;
  undefined8 local_128;
  undefined8 uStack_120;
  undefined8 local_118;
  undefined8 uStack_110;
  undefined8 local_108;
  undefined8 uStack_100;
  undefined4 local_f8;
  undefined4 uStack_f4;
  undefined8 local_f0;
  undefined8 uStack_e8;
  undefined8 uStack_e0;
  undefined8 uStack_d8;
  char local_d0 [8];
  undefined2 local_c8;
  undefined1 local_c6;
  
  lVar21 = *(long *)PTR___stack_chk_guard_00c419a0;
  cocos2d::Layer::Layer((Layer *)this);
  this_00 = (Sprite *)(this + 0x340);
  puVar1 = PTR_vtable_00c43238 + 0x10;
  *(undefined4 *)(this + 800) = 0;
  *(undefined4 *)(this + 0x324) = 0xffffffff;
  this[0x328] = (Character)0x1;
  *(undefined **)this = puVar1;
                    /* try { // try from 00448118 to 00448123 has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite(this_00);
  puVar15 = PTR_vtable_00c41700;
  puVar1 = PTR_vtable_00c41700 + 0x10;
  *(undefined **)(this + 0x638) = PTR_vtable_00c41700 + 0x688;
  *(undefined **)(this + 0x340) = puVar1;
  puVar1 = PTR_texture_00c43478;
                    /* try { // try from 0044814c to 0044815b has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)this_00,*(Rect **)PTR_texture_00c43478);
                    /* try { // try from 00448160 to 00448167 has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x870));
  *(undefined **)(this + 0xb68) = puVar15 + 0x688;
  *(undefined **)(this + 0x870) = puVar15 + 0x10;
                    /* try { // try from 0044817c to 0044818b has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x870),*(Rect **)puVar1);
                    /* try { // try from 00448190 to 00448197 has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0xda0));
  *(undefined **)(this + 0x1098) = puVar15 + 0x688;
  *(undefined **)(this + 0xda0) = puVar15 + 0x10;
                    /* try { // try from 004481ac to 004481bb has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0xda0),*(Rect **)puVar1);
                    /* try { // try from 004481c4 to 004481cb has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x12d0));
  *(undefined **)(this + 0x15c8) = puVar15 + 0x688;
  *(undefined **)(this + 0x12d0) = puVar15 + 0x10;
                    /* try { // try from 004481e0 to 004481ef has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x12d0),*(Rect **)puVar1);
                    /* try { // try from 004481f8 to 004481ff has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x1800));
  *(undefined **)(this + 0x1af8) = puVar15 + 0x688;
  *(undefined **)(this + 0x1800) = puVar15 + 0x10;
                    /* try { // try from 00448214 to 00448223 has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x1800),*(Rect **)puVar1);
                    /* try { // try from 0044822c to 00448233 has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x1d30));
  *(undefined **)(this + 0x2028) = puVar15 + 0x688;
  *(undefined **)(this + 0x1d30) = puVar15 + 0x10;
                    /* try { // try from 00448248 to 00448257 has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x1d30),*(Rect **)puVar1);
                    /* try { // try from 00448260 to 00448267 has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x2260));
  *(undefined **)(this + 0x2558) = puVar15 + 0x688;
  *(undefined **)(this + 0x2260) = puVar15 + 0x10;
                    /* try { // try from 0044827c to 0044828b has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x2260),*(Rect **)puVar1);
                    /* try { // try from 00448294 to 0044829b has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x2790));
  *(undefined **)(this + 0x2a88) = puVar15 + 0x688;
  *(undefined **)(this + 0x2790) = puVar15 + 0x10;
                    /* try { // try from 004482b0 to 004482bf has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x2790),*(Rect **)puVar1);
                    /* try { // try from 004482c8 to 004482cf has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x2cc0));
  *(undefined **)(this + 0x2fb8) = puVar15 + 0x688;
  *(undefined **)(this + 0x2cc0) = puVar15 + 0x10;
                    /* try { // try from 004482e4 to 004482f3 has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x2cc0),*(Rect **)puVar1);
                    /* try { // try from 004482fc to 00448303 has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x31f0));
  *(undefined **)(this + 0x34e8) = puVar15 + 0x688;
  *(undefined **)(this + 0x31f0) = puVar15 + 0x10;
                    /* try { // try from 00448318 to 00448327 has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x31f0),*(Rect **)puVar1);
                    /* try { // try from 00448330 to 00448337 has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x3720));
  *(undefined **)(this + 0x3a18) = puVar15 + 0x688;
  *(undefined **)(this + 0x3720) = puVar15 + 0x10;
                    /* try { // try from 0044834c to 0044835b has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x3720),*(Rect **)puVar1);
                    /* try { // try from 00448364 to 0044836b has its CatchHandler @ 0044935c */
  cocos2d::Sprite::Sprite((Sprite *)(this + 0x3c50));
  *(undefined **)(this + 0x3f48) = puVar15 + 0x688;
  *(undefined **)(this + 0x3c50) = puVar15 + 0x10;
                    /* try { // try from 00448380 to 0044838f has its CatchHandler @ 00449364 */
  cocos2d::Sprite::initWithTexture((Texture2D *)(this + 0x3c50),*(Rect **)puVar1);
                    /* try { // try from 004483a0 to 0044842f has its CatchHandler @ 004493ac */
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x41a0));
  iVar16 = rand();
  *(int *)(this + 0x41a4) = iVar16;
  *(int *)(this + 0x41a0) = iVar16;
  *(uint *)(this + 0x41a8) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x41ac));
  iVar16 = rand();
  *(int *)(this + 0x41b0) = iVar16;
  *(int *)(this + 0x41ac) = iVar16;
  *(uint *)(this + 0x41b4) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x41b8));
  iVar16 = rand();
  *(int *)(this + 0x41bc) = iVar16;
  *(int *)(this + 0x41b8) = iVar16;
  pCVar4 = this + 0x41c4;
  *(uint *)(this + 0x41c0) = iVar16 << 1 ^ 0x3edd3b2d;
  *(uint *)pCVar4 = param_3;
                    /* try { // try from 00448460 to 00448463 has its CatchHandler @ 004493f8 */
  MotionInfo::Reset((MotionInfo *)(this + 0x41c8));
  *(undefined4 *)(this + 0x41f0) = 1;
  *(undefined8 *)(this + 0x41fc) = 0;
  *(undefined8 *)(this + 0x41f4) = 0;
                    /* try { // try from 0044848c to 0044866b has its CatchHandler @ 00449314 */
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x4208));
  iVar16 = rand();
  *(int *)(this + 0x420c) = iVar16;
  *(int *)(this + 0x4208) = iVar16;
  *(uint *)(this + 0x4210) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x4214));
  iVar16 = rand();
  *(int *)(this + 0x4218) = iVar16;
  *(int *)(this + 0x4214) = iVar16;
  *(uint *)(this + 0x421c) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x4220));
  iVar16 = rand();
  *(int *)(this + 0x4224) = iVar16;
  *(int *)(this + 0x4220) = iVar16;
  *(uint *)(this + 0x4228) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x422c));
  iVar16 = rand();
  *(int *)(this + 0x4230) = iVar16;
  *(int *)(this + 0x422c) = iVar16;
  *(uint *)(this + 0x4234) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x4238));
  iVar16 = rand();
  *(int *)(this + 0x423c) = iVar16;
  *(int *)(this + 0x4238) = iVar16;
  *(uint *)(this + 0x4240) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x4244));
  iVar16 = rand();
  *(int *)(this + 0x4248) = iVar16;
  *(int *)(this + 0x4244) = iVar16;
  *(uint *)(this + 0x424c) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x4250));
  iVar16 = rand();
  *(int *)(this + 0x4254) = iVar16;
  *(int *)(this + 0x4250) = iVar16;
  *(uint *)(this + 0x4258) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x425c));
  iVar16 = rand();
  *(int *)(this + 0x4260) = iVar16;
  *(int *)(this + 0x425c) = iVar16;
  *(uint *)(this + 0x4264) = iVar16 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 17000));
  iVar16 = rand();
  *(int *)(this + 0x426c) = iVar16;
  *(int *)(this + 17000) = iVar16;
  *(uint *)(this + 0x4270) = iVar16 << 1 ^ 0x3edd3b2d;
  *(uint *)(this + 0x4274) = param_2;
  *(undefined4 *)(this + 0x4284) = 0;
  *(undefined8 *)(this + 0x42a8) = 0;
  *(undefined8 *)(this + 0x42a0) = 0;
  *(undefined8 *)(this + 0x4298) = 0;
  *(undefined8 *)(this + 0x4290) = 0;
  *(undefined4 *)(this + 0x42b0) = 0xffffffff;
  *(undefined4 *)(this + 0x42c0) = 0;
  this[0x42c4] = (Character)0x0;
  *(undefined4 *)(this + 0x42c8) = 0;
  *(undefined4 *)(this + 0x42cc) = 0;
  *(undefined4 *)(this + 0x42d4) = 0;
  this[0x4308] = (Character)0x0;
  *(undefined2 *)(this + 0x4314) = 0;
  *(undefined8 *)(this + 0x430c) = 0;
                    /* try { // try from 004486f4 to 00448737 has its CatchHandler @ 004493f4 */
  iVar16 = rand();
  *(int *)(this + 0x41a4) = iVar16;
  *(int *)(this + 0x41a0) = iVar16;
  *(uint *)(this + 0x41a8) = iVar16 << 1 ^ 0x3edd3b2d;
  iVar16 = rand();
  *(int *)(this + 0x41b0) = iVar16;
  *(int *)(this + 0x41ac) = iVar16;
  *(uint *)(this + 0x41b4) = iVar16 << 1 ^ 0x3edd3b2d;
  iVar16 = rand();
  *(int *)(this + 0x41bc) = iVar16;
  *(int *)(this + 0x41b8) = iVar16;
  *(uint *)(this + 0x41c0) = iVar16 << 1 ^ 0x3edd3b2d;
  if (-1 < (char)this[0x41c5]) {
    *(undefined4 *)(this + 0x324) = 0;
  }
  param2 = (char *)0x0;
  *(undefined4 *)(this + 0x42bc) = 0;
  *(undefined8 *)(this + 0x42b4) = 0;
  *(undefined8 *)(this + 0x4300) = 0;
  *(undefined8 *)(this + 0x42f8) = 0;
  *(undefined8 *)(this + 0x42f0) = 0;
  *(undefined8 *)(this + 0x42e8) = 0;
  *(undefined8 *)(this + 0x42e0) = 0;
  *(undefined8 *)(this + 0x42d8) = 0;
  if (param_2 < 8) {
    param2 = (&PTR_DAT_00bce5f0)[(int)param_2];
  }
  *(undefined8 *)(this + 0x4188) = 0;
  *(undefined8 *)(this + 0x4198) = 0;
  *(undefined8 *)(this + 0x4190) = 0;
                    /* try { // try from 004487c0 to 00448de3 has its CatchHandler @ 00449164 */
  (**(code **)(*(long *)this + 0x4f8))(this);
  uVar17 = cocos2d::SpriteBatchNode::createWithTexture(*(Texture2D **)puVar1,0x1d);
  *(undefined8 *)(this + 0x330) = uVar17;
  (**(code **)(*(long *)this + 0x208))(this,uVar17);
  (**(code **)(*(long *)this + 0x148))(this,PTR_ZERO_00c41d10);
  (**(code **)(*(long *)this + 0x160))(this,PTR_ZERO_00c427b0);
  cocos2d::Ref::autorelease((Ref *)this);
  plVar18 = (long *)AtlasMgr::GetImg("stage/shadow.png");
  *(long **)(this + 0x4180) = plVar18;
  (**(code **)(*plVar18 + 0x80))(0x40000000);
  (**(code **)(**(long **)(this + 0x330) + 0x218))
            (*(long **)(this + 0x330),*(undefined8 *)(this + 0x4180),0xffffff9c,100);
  local_c6 = 0;
  local_c8 = 0x2f72;
  local_d0[0] = s_character__009c4ada[0];
  local_d0[1] = s_character__009c4ada[1];
  local_d0[2] = s_character__009c4ada[2];
  local_d0[3] = s_character__009c4ada[3];
  local_d0[4] = s_character__009c4ada[4];
  local_d0[5] = s_character__009c4ada[5];
  local_d0[6] = s_character__009c4ada[6];
  local_d0[7] = s_character__009c4ada[7];
  sVar19 = strlen(local_d0);
  param0 = local_d0 + sVar19;
  sprintf(param0,"%s/%s.png",param2,"trunk");
  uVar17 = AtlasMgr::GetImg(local_d0);
  PartOfBody::SetSprite((PartOfBody *)this_00,uVar17,0);
  sprintf(param0,"%s/%s.png",param2,"head");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar2 = (PartOfBody *)(this + 0x870);
  PartOfBody::SetSprite(pPVar2,uVar17,0);
  sprintf(param0,"%s/%s.png",param2,"arm");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar3 = (PartOfBody *)(this + 0xda0);
  PartOfBody::SetSprite(pPVar3,uVar17,0);
  sprintf(param0,"%s/%s.png",param2,"arm");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar5 = (PartOfBody *)(this + 0x1d30);
  PartOfBody::SetSprite(pPVar5,uVar17,0);
  sprintf(param0,"%s/%s.png",param2,"hand");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar6 = (PartOfBody *)(this + 0x12d0);
  PartOfBody::SetSprite(pPVar6,uVar17,0);
  if (param_2 == 0) {
    sprintf(param0,"%s/%s.png",param2,"hand2");
    uVar17 = AtlasMgr::GetImg(local_d0);
    PartOfBody::SetSprite((PartOfBody *)(this + 0x2260),uVar17,0);
  }
  else {
    sprintf(param0,"%s/%s.png",param2,"hand");
    uVar17 = AtlasMgr::GetImg(local_d0);
    PartOfBody::SetSprite((PartOfBody *)(this + 0x2260),uVar17,0);
  }
  sprintf(param0,"%s/%s.png",param2,"leg");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar7 = (PartOfBody *)(this + 0x2cc0);
  PartOfBody::SetSprite(pPVar7,uVar17,0);
  sprintf(param0,"%s/%s.png",param2,"leg");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar8 = (PartOfBody *)(this + 0x3720);
  PartOfBody::SetSprite(pPVar8,uVar17,0);
  sprintf(param0,"%s/%s.png",param2,"foot");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar9 = (PartOfBody *)(this + 0x31f0);
  PartOfBody::SetSprite(pPVar9,uVar17,0);
  sprintf(param0,"%s/%s.png",param2,"foot");
  uVar17 = AtlasMgr::GetImg(local_d0);
  pPVar10 = (PartOfBody *)(this + 0x3c50);
  PartOfBody::SetSprite(pPVar10,uVar17,0);
  (**(code **)(**(long **)(this + 0x330) + 0x208))(*(long **)(this + 0x330),this_00);
  (**(code **)(*(long *)this_00 + 0x210))(this_00,pPVar2,0);
  (**(code **)(*(long *)this_00 + 0x210))(this_00,pPVar3,0x14);
  (**(code **)(*(long *)this_00 + 0x210))(this_00,pPVar5,0xffffffe2);
  (**(code **)(*(long *)this_00 + 0x210))(this_00,pPVar7,0);
  (**(code **)(*(long *)this_00 + 0x210))(this_00,pPVar8,0xffffffe2);
  (**(code **)(*(long *)pPVar3 + 0x210))(pPVar3,pPVar6,0);
  pCVar11 = this + 0x2260;
  (**(code **)(*(long *)(this + 0x1d30) + 0x210))(pPVar5,pCVar11,0);
  (**(code **)(*(long *)pPVar7 + 0x210))(pPVar7,pPVar9,0);
  (**(code **)(*(long *)pPVar8 + 0x210))(pPVar8,pPVar10,0);
  pCVar12 = this + 0x1800;
  (**(code **)(*(long *)(this + 0x12d0) + 0x210))(pPVar6,pCVar12,10);
  pCVar13 = this + 0x2790;
  (**(code **)(*(long *)(this + 0x2260) + 0x210))(pCVar11,pCVar13,0);
  local_138 = 0x3f0f5c293edc28f6;
  (**(code **)(*(long *)this_00 + 0x148))(this_00,&local_138);
  local_140 = 0x3e99999a3e99999a;
  (**(code **)(*(long *)pPVar2 + 0x148))(pPVar2,&local_140);
  local_148 = 0x3f428f5c3f000000;
  (**(code **)(*(long *)pPVar3 + 0x148))(pPVar3,&local_148);
  local_150 = 0x3f428f5c3f000000;
  (**(code **)(*(long *)pPVar5 + 0x148))(pPVar5,&local_150);
  local_158 = 0x3f59999a3edc28f6;
  (**(code **)(*(long *)pPVar6 + 0x148))(pPVar6,&local_158);
  local_160 = 0x3f59999a3edc28f6;
  (**(code **)(*(long *)pCVar11 + 0x148))(pCVar11,&local_160);
  local_168 = 0x3f47ae143ee147ae;
  (**(code **)(*(long *)pPVar7 + 0x148))(pPVar7,&local_168);
  local_170 = 0x3f47ae143ee147ae;
  (**(code **)(*(long *)pPVar8 + 0x148))(pPVar8,&local_170);
  local_178 = 0x3f68f5c33f0ccccd;
  (**(code **)(*(long *)pPVar9 + 0x148))(pPVar9,&local_178);
  local_180 = 0x3f68f5c33f0ccccd;
  (**(code **)(*(long *)pPVar10 + 0x148))(pPVar10,&local_180);
  local_188 = 0x3e4ccccd3f07ae14;
  (**(code **)(*(long *)pCVar13 + 0x148))(pCVar13,&local_188);
  local_190 = 0x3f051eb83f051eb8;
  (**(code **)(*(long *)pCVar12 + 0x148))(pCVar12,&local_190);
  local_130 = (undefined4)DAT_00c60930;
  uStack_12c = DAT_00c60930._4_4_;
  uStack_120 = _UNK_009c4768;
  local_128 = _DAT_009c4760;
  uStack_110 = _UNK_009c4778;
  local_118 = _DAT_009c4770;
  uStack_100 = _UNK_009c4788;
  local_108 = _DAT_009c4780;
  local_f8 = 0x419f3333;
  uStack_f4 = 0x41733333;
  uStack_e8 = _UNK_009c4798;
  local_f0 = _DAT_009c4790;
  uStack_d8 = _UNK_009c47a8;
  uStack_e0 = _DAT_009c47a0;
                    /* try { // try from 00448e50 to 00448f4b has its CatchHandler @ 004493a8 */
  (**(code **)(*(long *)(this + 0x340) + 0x98))(this + 0x340,&local_130);
  (**(code **)(*(long *)pPVar2 + 0x98))(pPVar2,&local_128);
  (**(code **)(*(long *)pPVar3 + 0x98))(pPVar3,&uStack_120);
  (**(code **)(*(long *)pPVar6 + 0x98))(pPVar6,&local_118);
  (**(code **)(*(long *)pCVar12 + 0x98))(pCVar12,&uStack_110);
  (**(code **)(*(long *)pPVar5 + 0x98))(pPVar5,&local_108);
  (**(code **)(*(long *)pCVar11 + 0x98))(pCVar11,&uStack_100);
  (**(code **)(*(long *)pCVar13 + 0x98))(pCVar13,&local_f8);
  (**(code **)(*(long *)pPVar7 + 0x98))(pPVar7,&local_f0);
  (**(code **)(*(long *)pPVar9 + 0x98))(pPVar9,&uStack_e8);
  (**(code **)(*(long *)pPVar8 + 0x98))(pPVar8,&uStack_e0);
  (**(code **)(*(long *)pPVar10 + 0x98))(pPVar10,&uStack_d8);
                    /* try { // try from 00448f4c to 0044902b has its CatchHandler @ 00449164 */
  plVar18 = (long *)AtlasMgr::GetImg("ui/white.png");
  *(long **)(this + 0x4188) = plVar18;
  local_198 = 0x3f000000;
  (**(code **)(*plVar18 + 0x148))(plVar18,&local_198);
  (**(code **)(**(long **)(this + 0x4188) + 0x60))(0x40a00000);
  (**(code **)(**(long **)(this + 0x330) + 0x208))
            (*(long **)(this + 0x330),*(undefined8 *)(this + 0x4188));
  *(undefined8 *)(this + 0x4190) = 0;
  plVar18 = (long *)AtlasMgr::GetImg("ui/white.png");
  *(long **)(this + 0x4198) = plVar18;
  local_1a0 = 0x3f000000;
  (**(code **)(*plVar18 + 0x148))(plVar18,&local_1a0);
  (**(code **)(**(long **)(this + 0x4198) + 0x60))(0x40a00000);
  (**(code **)(**(long **)(this + 0x330) + 0x208))
            (*(long **)(this + 0x330),*(undefined8 *)(this + 0x4198));
  (**(code **)(**(long **)(this + 0x4198) + 0x170))(*(long **)(this + 0x4198),0);
  if (*(long **)(this + 0x4298) != (long *)0x0) {
    (**(code **)(**(long **)(this + 0x4298) + 0x270))();
  }
  pMVar20 = operator_new(0x360);
                    /* try { // try from 0044902c to 0044903b has its CatchHandler @ 00449400 */
  MsgBox::MsgBox(pMVar20,0x14,0x10);
  *(MsgBox **)(this + 0x4298) = pMVar20;
                    /* try { // try from 00449048 to 0044912b has its CatchHandler @ 00449164 */
  (**(code **)(*(long *)this + 0x208))(this,pMVar20);
  Reset(this);
  uVar14 = *(uint *)pCVar4;
  if ((uVar14 >> 0xc & 1) == 0) {
    if ((uVar14 >> 10 & 1) == 0) {
      *(uint *)pCVar4 = uVar14 & 0xfffffbff;
      plVar18 = *(long **)(this + 0x4188);
      pcVar22 = *(code **)(*plVar18 + 0x4c0);
      uVar17 = GetColor(0);
      (*pcVar22)(plVar18,uVar17);
    }
    else {
      *(uint *)pCVar4 = uVar14 | 0x400;
      plVar18 = *(long **)(this + 0x4188);
      pcVar22 = *(code **)(*plVar18 + 0x4c0);
      uVar17 = GetColor(1);
      (*pcVar22)(plVar18,uVar17);
    }
  }
  if (((byte)this[0x41c5] >> 3 & 1) == 0) {
    SetMotion(this,2,0);
  }
  else {
    if (*(int *)(this + 0x4274) == 6) {
      SetMotion(this,0x2e,1);
    }
    else {
      SetMotion(this,0x18,1);
    }
    (**(code **)(*(long *)this + 0x668))(this);
  }
  if (*(long *)PTR___stack_chk_guard_00c419a0 != lVar21) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: SetMarker
ADDRESS: 0044aaf4
========================================

/* Character::SetMarker(Color) */

void __thiscall Character::SetMarker(Character *this,undefined4 param_2)

{
  long *plVar1;
  code *UNRECOVERED_JUMPTABLE;
  undefined8 uVar2;
  
  plVar1 = *(long **)(this + 0x4290);
  if (plVar1 == (long *)0x0) {
    plVar1 = (long *)AtlasMgr::GetImg("ui/up.png");
    *(long **)(this + 0x4290) = plVar1;
    (**(code **)(*plVar1 + 0x180))(DAT_009c488c);
    (**(code **)(**(long **)(this + 0x330) + 0x208))
              (*(long **)(this + 0x330),*(undefined8 *)(this + 0x4290));
    plVar1 = *(long **)(this + 0x4290);
  }
  (**(code **)(*plVar1 + 0x170))(plVar1,1);
  plVar1 = *(long **)(this + 0x4290);
  UNRECOVERED_JUMPTABLE = *(code **)(*plVar1 + 0x4c0);
  uVar2 = GetColor(param_2);
                    /* WARNING: Could not recover jumptable at 0x0044ab90. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (*UNRECOVERED_JUMPTABLE)(plVar1,uVar2);
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: GetImg
ADDRESS: 00455e04
========================================

/* AtlasMgr::GetImg(char const*) */

long * AtlasMgr::GetImg(char *param_1)

{
  undefined *puVar1;
  size_t __n;
  long *plVar2;
  undefined8 uVar3;
  void *__dest;
  ulong uVar4;
  long lVar5;
  ulong local_60;
  size_t local_58;
  void *local_50;
  long local_48;
  
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_58 = 0;
  local_50 = (void *)0x0;
  local_60 = 0;
  local_48 = lVar5;
  __n = strlen(param_1);
  if (0xffffffffffffffef < __n) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (__n < 0x17) {
    __dest = (void *)((ulong)&local_60 | 1);
    local_60 = CONCAT71(local_60._1_7_,(char)(__n << 1));
    if (__n == 0) goto LAB_00455e98;
  }
  else {
    uVar4 = __n + 0x10 & 0xfffffffffffffff0;
    __dest = operator_new(uVar4);
    local_60 = uVar4 | 1;
    local_58 = __n;
    local_50 = __dest;
  }
  memcpy(__dest,param_1,__n);
LAB_00455e98:
  *(undefined1 *)((long)__dest + __n) = 0;
                    /* try { // try from 00455e9c to 00455ea7 has its CatchHandler @ 00455f0c */
  plVar2 = (long *)cocos2d::Sprite::createWithSpriteFrameName((basic_string *)&local_60);
  if ((local_60 & 1) != 0) {
    operator_delete(local_50);
  }
  puVar1 = PTR_texture_00c43478;
  if (*(long *)PTR_texture_00c43478 == 0) {
    uVar3 = (**(code **)(*plVar2 + 0x548))(plVar2);
    *(undefined8 *)puVar1 = uVar3;
  }
  if (lVar5 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return plVar2;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: Run
ADDRESS: 0045aa0c
========================================

/* Effect::Snow::Run() */

void __thiscall Effect::Snow::Run(Snow *this)

{
  Sprite *pSVar1;
  long *plVar2;
  ulong uVar3;
  uint uVar4;
  long lVar5;
  int iVar6;
  Sprite *local_60;
  long local_58;
  
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_58 = lVar5;
  if (*(long *)(this + 0x538) - *(long *)(this + 0x530) == 8) {
    uVar4 = 0xff;
    iVar6 = 6;
    do {
      uVar4 = (uVar4 & 0xff) - 0x28;
      pSVar1 = (Sprite *)AtlasMgr::GetImg("effect/snowflake.png");
      local_60 = pSVar1;
      (**(code **)(*(long *)pSVar1 + 0x490))(pSVar1,uVar4);
      if (*(undefined8 **)(this + 0x538) == *(undefined8 **)(this + 0x540)) {
        std::__ndk1::vector<cocos2d::Sprite*,std::__ndk1::allocator<cocos2d::Sprite*>>::
        __push_back_slow_path<cocos2d::Sprite*const&>
                  ((vector<cocos2d::Sprite*,std::__ndk1::allocator<cocos2d::Sprite*>> *)
                   (this + 0x530),&local_60);
      }
      else {
        **(undefined8 **)(this + 0x538) = pSVar1;
        *(long *)(this + 0x538) = *(long *)(this + 0x538) + 8;
      }
      plVar2 = (long *)(**(code **)(*(long *)this + 0x260))(this);
      (**(code **)(*plVar2 + 0x210))(plVar2,pSVar1,1);
      iVar6 = iVar6 + -1;
    } while (iVar6 != 0);
  }
  *(undefined4 *)(this + 0x548) = 0;
  (**(code **)(*(long *)this + 0x170))(this,1);
  uVar3 = cocos2d::Node::isScheduled((Node *)this,(_func_void_float *)PTR_Schedule_00c44348);
  if ((uVar3 & 1) == 0) {
    if (lVar5 == local_58) {
      cocos2d::Node::schedule((_func_void_float *)this);
      return;
    }
  }
  else if (lVar5 == local_58) {
    return;
  }
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: GameUI
ADDRESS: 00470714
========================================

/* GameUI::GameUI() */

void __thiscall GameUI::GameUI(GameUI *this)

{
  vector<Btn*,std::__ndk1::allocator<Btn*>> *this_00;
  undefined4 uVar1;
  undefined *puVar2;
  long *plVar3;
  long *plVar4;
  undefined8 uVar5;
  Btn *pBVar6;
  long lVar7;
  SquareBox *pSVar8;
  uint3 *puVar9;
  SquareBox *pSVar10;
  long *plVar11;
  ulong unaff_x24;
  float fVar12;
  float fVar13;
  float fVar14;
  float fVar15;
  undefined4 local_148;
  float local_144;
  undefined8 local_140;
  undefined8 local_138;
  undefined8 local_130;
  undefined8 local_128;
  undefined8 local_120;
  undefined8 local_118;
  Btn *local_110;
  undefined8 local_108;
  Btn *local_100;
  undefined8 local_f8;
  Btn *local_f0;
  undefined8 local_e8;
  Btn *local_e0;
  undefined8 local_d8;
  Btn *local_d0;
  undefined8 local_c8;
  Btn *local_c0;
  undefined8 local_b8;
  Btn *local_b0;
  undefined8 local_a8;
  Btn *local_a0;
  long local_98;
  
  local_98 = *(long *)PTR___stack_chk_guard_00c419a0;
  cocos2d::Layer::Layer((Layer *)this);
  *(undefined **)this = PTR_vtable_00c42240 + 0x10;
                    /* try { // try from 0047076c to 00470773 has its CatchHandler @ 004712a8 */
  cocos2d::Rect::Rect((Rect *)(this + 800));
  *(undefined8 *)(this + 0x3a8) = 0;
  *(undefined8 *)(this + 0x360) = 0;
  *(undefined8 *)(this + 0x358) = 0;
  *(undefined8 *)(this + 0x350) = 0;
  *(undefined8 *)(this + 0x348) = 0;
  *(undefined8 *)(this + 0x340) = 0;
  *(undefined8 *)(this + 0x338) = 0;
  *(undefined8 *)(this + 0x3c8) = 0;
  *(undefined8 *)(this + 0x3c0) = 0;
  *(undefined8 *)(this + 0x3b8) = 0;
  *(undefined8 *)(this + 0x3b0) = 0;
                    /* try { // try from 004707a8 to 0047087f has its CatchHandler @ 004711ec */
  (**(code **)(*(long *)this + 0x4f8))(this);
  cocos2d::Ref::retain((Ref *)this);
  plVar3 = (long *)cocos2d::Layer::create();
  puVar2 = PTR_STICK_POS_00c42480;
  (**(code **)(*plVar3 + 0x98))(plVar3,PTR_STICK_POS_00c42480);
  (**(code **)(*(long *)this + 0x218))(this,plVar3,1000,9);
  plVar4 = (long *)AtlasMgr::GetImg("ui/joystick_prop.png");
  (**(code **)(*plVar3 + 0x208))(plVar3,plVar4);
  (**(code **)(*plVar4 + 0x490))(plVar4,100);
  uVar5 = AtlasMgr::GetImg("ui/joystick_ball.png");
  *(undefined8 *)(this + 0x330) = uVar5;
  (**(code **)(*plVar3 + 0x208))(plVar3,uVar5);
  fVar12 = *(float *)puVar2;
  fVar14 = *(float *)(puVar2 + 4);
  cocos2d::Rect::setRect((Rect *)(this + 800),0.0,0.0,fVar12 + fVar12,fVar14 + fVar14);
  pBVar6 = operator_new(0x360);
  local_a8 = 0x42480000443b8000;
                    /* try { // try from 00470890 to 004708a7 has its CatchHandler @ 004712b0 */
  Btn::Btn(pBVar6,1,&local_a8,"ui/A.png");
  local_a0 = pBVar6;
  if (*(undefined8 **)(this + 0x340) == *(undefined8 **)(this + 0x348)) {
                    /* try { // try from 004708d4 to 00470907 has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              ((vector<Btn*,std::__ndk1::allocator<Btn*>> *)(this + 0x338),&local_a0);
  }
  else {
    **(undefined8 **)(this + 0x340) = pBVar6;
    *(long *)(this + 0x340) = *(long *)(this + 0x340) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,1);
  pBVar6 = operator_new(0x360);
  local_b8 = 0x43020000443b8000;
                    /* try { // try from 00470918 to 0047092f has its CatchHandler @ 004712b4 */
  Btn::Btn(pBVar6,2,&local_b8,"ui/D.png");
  local_b0 = pBVar6;
  if (*(undefined8 **)(this + 0x340) == *(undefined8 **)(this + 0x348)) {
                    /* try { // try from 00470958 to 0047098b has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              ((vector<Btn*,std::__ndk1::allocator<Btn*>> *)(this + 0x338),&local_b0);
  }
  else {
    **(undefined8 **)(this + 0x340) = pBVar6;
    *(long *)(this + 0x340) = *(long *)(this + 0x340) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,2);
  pBVar6 = operator_new(0x360);
  local_c8 = 0x4248000044278000;
                    /* try { // try from 0047099c to 004709b3 has its CatchHandler @ 004712b8 */
  Btn::Btn(pBVar6,3,&local_c8,"ui/K.png");
  this_00 = (vector<Btn*,std::__ndk1::allocator<Btn*>> *)(this + 0x350);
  local_c0 = pBVar6;
  if (*(undefined8 **)(this + 0x358) == *(undefined8 **)(this + 0x360)) {
                    /* try { // try from 004709e0 to 00470aa7 has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              (this_00,&local_c0);
  }
  else {
    **(undefined8 **)(this + 0x358) = pBVar6;
    *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,3);
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,1);
  fVar14 = DAT_009c3d60;
  fVar12 = DAT_009c3d4c;
  fVar13 = *(float *)(lVar7 + 0x350) + DAT_009c3d60;
  fVar15 = *(float *)(lVar7 + 0x354) + DAT_009c3d60;
  *(float *)(lVar7 + 0x34c) = *(float *)(lVar7 + 0x34c) + DAT_009c3d4c;
  *(float *)(lVar7 + 0x350) = fVar13;
  *(float *)(lVar7 + 0x354) = fVar15;
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,2);
  *(float *)(lVar7 + 0x350) = *(float *)(lVar7 + 0x350) + fVar14;
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,3);
  *(float *)(lVar7 + 0x354) = *(float *)(lVar7 + 0x354) + fVar14;
  *(float *)(lVar7 + 0x34c) = *(float *)(lVar7 + 0x34c) + fVar12;
  pBVar6 = operator_new(0x360);
  local_d8 = 0x4234000044138000;
                    /* try { // try from 00470ab8 to 00470acf has its CatchHandler @ 004712bc */
  Btn::Btn(pBVar6,4,&local_d8,"skill/revival.png");
  local_d0 = pBVar6;
  if (*(undefined8 **)(this + 0x358) == *(undefined8 **)(this + 0x360)) {
                    /* try { // try from 00470af8 to 00470b2b has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              (this_00,&local_d0);
  }
  else {
    **(undefined8 **)(this + 0x358) = pBVar6;
    *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,4);
  pBVar6 = operator_new(0x360);
  local_e8 = 0x4234000044048000;
                    /* try { // try from 00470b3c to 00470b53 has its CatchHandler @ 004712c0 */
  Btn::Btn(pBVar6,5,&local_e8,"skill/rage.png");
  local_e0 = pBVar6;
  if (*(undefined8 **)(this + 0x358) == *(undefined8 **)(this + 0x360)) {
                    /* try { // try from 00470b7c to 00470baf has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              (this_00,&local_e0);
  }
  else {
    **(undefined8 **)(this + 0x358) = pBVar6;
    *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,5);
  pBVar6 = operator_new(0x360);
  local_f8 = 0x4234000043eb0000;
                    /* try { // try from 00470bbc to 00470bd3 has its CatchHandler @ 004712c4 */
  Btn::Btn(pBVar6,6,&local_f8,"skill/confuse.png");
  local_f0 = pBVar6;
  if (*(undefined8 **)(this + 0x358) == *(undefined8 **)(this + 0x360)) {
                    /* try { // try from 00470bfc to 00470c2f has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              (this_00,&local_f0);
  }
  else {
    **(undefined8 **)(this + 0x358) = pBVar6;
    *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,6);
  pBVar6 = operator_new(0x360);
  local_108 = 0x4234000043cd0000;
                    /* try { // try from 00470c3c to 00470c53 has its CatchHandler @ 004712c8 */
  Btn::Btn(pBVar6,7,&local_108,"skill/rage_all.png");
  local_100 = pBVar6;
  if (*(undefined8 **)(this + 0x358) == *(undefined8 **)(this + 0x360)) {
                    /* try { // try from 00470c7c to 00470caf has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              (this_00,&local_100);
  }
  else {
    **(undefined8 **)(this + 0x358) = pBVar6;
    *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,7);
  pBVar6 = operator_new(0x360);
  local_118 = 0x4234000043af0000;
                    /* try { // try from 00470cbc to 00470cd3 has its CatchHandler @ 004712cc */
  Btn::Btn(pBVar6,8,&local_118,"skill/avatar.png");
  local_110 = pBVar6;
  if (*(undefined8 **)(this + 0x358) == *(undefined8 **)(this + 0x360)) {
                    /* try { // try from 00470cfc to 00470d23 has its CatchHandler @ 004711ec */
    std::__ndk1::vector<Btn*,std::__ndk1::allocator<Btn*>>::__push_back_slow_path<Btn*const&>
              (this_00,&local_110);
  }
  else {
    **(undefined8 **)(this + 0x358) = pBVar6;
    *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
  }
  (**(code **)(*(long *)this + 0x218))(this,pBVar6,100,8);
                    /* try { // try from 00470d2c to 00470de7 has its CatchHandler @ 00471290 */
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,4);
  *(float *)(lVar7 + 0x34c) = *(float *)(lVar7 + 0x34c) + fVar12;
  *(float *)(lVar7 + 0x354) = *(float *)(lVar7 + 0x354) + fVar14;
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,5);
  *(float *)(lVar7 + 0x34c) = *(float *)(lVar7 + 0x34c) + fVar12;
  *(float *)(lVar7 + 0x354) = *(float *)(lVar7 + 0x354) + fVar14;
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,6);
  *(float *)(lVar7 + 0x34c) = *(float *)(lVar7 + 0x34c) + fVar12;
  *(float *)(lVar7 + 0x354) = *(float *)(lVar7 + 0x354) + fVar14;
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,7);
  *(float *)(lVar7 + 0x34c) = *(float *)(lVar7 + 0x34c) + fVar12;
  *(float *)(lVar7 + 0x354) = *(float *)(lVar7 + 0x354) + fVar14;
  lVar7 = (**(code **)(*(long *)this + 0x228))(this,8);
  *(float *)(lVar7 + 0x354) = *(float *)(lVar7 + 0x354) + fVar14;
  *(float *)(lVar7 + 0x34c) = *(float *)(lVar7 + 0x34c) + fVar12;
                    /* try { // try from 00470e00 to 00470e2f has its CatchHandler @ 004711ec */
  plVar3 = (long *)cocos2d::Layer::create();
  (**(code **)(*(long *)this + 0x218))(this,plVar3,0,0xb);
  pSVar8 = operator_new(0x530);
                    /* try { // try from 00470e30 to 00470e4f has its CatchHandler @ 00471298 */
  puVar9 = (uint3 *)GetColor(0xc);
  SquareBox::SquareBox(pSVar8,(ulong)*puVar9,0x96);
  local_120 = 0;
                    /* try { // try from 00470e5c to 00470ebb has its CatchHandler @ 004711ec */
  (**(code **)(*(long *)pSVar8 + 0x148))(pSVar8,&local_120);
  (**(code **)(*(long *)pSVar8 + 0x90))(DAT_009c46e8,0x41200000,pSVar8);
  (**(code **)(*(long *)pSVar8 + 0xe8))(0x40000000,pSVar8);
  (**(code **)(*plVar3 + 0x210))(plVar3,pSVar8,0);
  pSVar10 = operator_new(0x530);
                    /* try { // try from 00470ebc to 00470edb has its CatchHandler @ 0047129c */
  puVar9 = (uint3 *)GetColor(0);
  SquareBox::SquareBox(pSVar10,(ulong)*puVar9,0xff);
  *(SquareBox **)(this + 0x368) = pSVar10;
  local_128 = 0;
                    /* try { // try from 00470eec to 00470fbb has its CatchHandler @ 004711ec */
  (**(code **)(*(long *)pSVar10 + 0x148))(pSVar10,&local_128);
  (**(code **)(*(long *)pSVar8 + 0x218))(pSVar8,*(undefined8 *)(this + 0x368),1,1);
  local_130 = 0x4110000043c80000;
  plVar11 = (long *)MakeLabel("",0xf,(Vec2 *)&local_130,0.0);
  *(long **)(this + 0x370) = plVar11;
  (**(code **)(*plVar11 + 0x5a0))(plVar11,PTR_BLACK_00c44220,2);
  (**(code **)(*plVar3 + 0x210))(plVar3,*(undefined8 *)(this + 0x370),1);
  UpdateExpBar(this);
  plVar3 = (long *)cocos2d::Layer::create();
  (**(code **)(*plVar3 + 200))(DAT_009c4880,DAT_009c68a4,plVar3);
  (**(code **)(*(long *)this + 0x218))(this,plVar3,0,10);
  puVar2 = PTR_BLACK_00c44220;
  uVar1 = DAT_009c68a8;
  lVar7 = 0;
  fVar12 = 0.0;
  do {
                    /* try { // try from 00470fe8 to 00470ff3 has its CatchHandler @ 004711c8 */
    pSVar8 = operator_new(0x530);
                    /* try { // try from 00470ff4 to 0047101f has its CatchHandler @ 004711d0 */
    puVar9 = (uint3 *)GetColor(0xc);
    unaff_x24 = (ulong)*puVar9 | unaff_x24 & 0xffffffffff000000;
    SquareBox::SquareBox(pSVar8,unaff_x24,0x96);
    local_138 = 0;
                    /* try { // try from 0047102c to 0047109f has its CatchHandler @ 004711c8 */
    (**(code **)(*(long *)pSVar8 + 0x148))(pSVar8,&local_138);
    (**(code **)(*(long *)pSVar8 + 0x90))(uVar1,0x41200000,pSVar8);
    (**(code **)(*(long *)pSVar8 + 0x490))(pSVar8,0x96);
    (**(code **)(*(long *)pSVar8 + 200))(0,fVar12,pSVar8);
    (**(code **)(*plVar3 + 0x210))(plVar3,pSVar8,0);
    pSVar10 = operator_new(0x530);
                    /* try { // try from 004710ac to 004710d3 has its CatchHandler @ 004711dc */
    puVar9 = (uint3 *)GetColor((&DAT_009c69ec)[lVar7]);
    plVar4 = (long *)((ulong)*puVar9 | (ulong)plVar4 & 0xffffffffff000000);
    SquareBox::SquareBox(pSVar10,plVar4,0xff);
    *(SquareBox **)(this + lVar7 * 8 + 0x378) = pSVar10;
    local_140 = 0;
                    /* try { // try from 004710e8 to 00471173 has its CatchHandler @ 004711c8 */
    (**(code **)(*(long *)pSVar10 + 0x148))(pSVar10,&local_140);
    (**(code **)(**(long **)(this + lVar7 * 8 + 0x378) + 0x490))
              (*(long **)(this + lVar7 * 8 + 0x378),0x96);
    (**(code **)(*(long *)pSVar8 + 0x208))(pSVar8,*(undefined8 *)(this + lVar7 * 8 + 0x378));
    local_144 = fVar12 + 5.0;
    local_148 = 0x430c0000;
    plVar11 = (long *)MakeLabel("",0xf,(Vec2 *)&local_148,0.0);
    *(long **)(this + lVar7 * 8 + 0x390) = plVar11;
    (**(code **)(*plVar11 + 0x5a0))(plVar11,puVar2,2);
    (**(code **)(*plVar3 + 0x210))(plVar3,*(undefined8 *)(this + lVar7 * 8 + 0x390),1);
    fVar12 = fVar12 + -15.0;
    lVar7 = lVar7 + 1;
  } while (lVar7 < 3);
  if (*(long *)PTR___stack_chk_guard_00c419a0 != local_98) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: SkillMarker
ADDRESS: 00471eb8
========================================

/* GameUI::SkillMarker() */

void __thiscall GameUI::SkillMarker(GameUI *this)

{
  long *plVar1;
  long *plVar2;
  undefined8 *puVar3;
  long lVar4;
  undefined4 local_40;
  float fStack_3c;
  long local_38;
  
  lVar4 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar4;
  plVar1 = (long *)(**(code **)(*(long *)this + 0x228))(this,4);
  if (*(long *)(this + 0x3c8) == 0) {
    plVar2 = (long *)AtlasMgr::GetImg("ui/up.png");
    *(long **)(this + 0x3c8) = plVar2;
    (**(code **)(*plVar2 + 0x180))(DAT_009c488c);
    (**(code **)(**(long **)(this + 0x3c8) + 0x80))(0x40000000);
    (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x3c8));
  }
  puVar3 = (undefined8 *)(**(code **)(*plVar1 + 0xb0))(plVar1);
  _local_40 = CONCAT44((float)((ulong)*puVar3 >> 0x20) + DAT_009c68ac,(int)*puVar3);
  (**(code **)(**(long **)(this + 0x3c8) + 0x98))(*(long **)(this + 0x3c8),&local_40);
  (**(code **)(**(long **)(this + 0x3c8) + 0x170))(*(long **)(this + 0x3c8),1);
  *(undefined4 *)(this + 0x3d0) = 0;
  if (lVar4 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: Btn
ADDRESS: 004721d0
========================================

/* Btn::Btn(ControllTag, cocos2d::Vec2 const&, char const*) */

void __thiscall Btn::Btn(Btn *this,int param_2,float *param_3,char *param_4)

{
  undefined *puVar1;
  long *plVar2;
  Size *pSVar3;
  Vec2 *pVVar4;
  code *pcVar5;
  long lVar6;
  float fVar7;
  float local_90;
  float fStack_8c;
  float local_88;
  float fStack_84;
  float local_80;
  float fStack_7c;
  undefined8 local_78;
  Size aSStack_70 [8];
  Rect aRStack_68 [16];
  long local_58;
  
  lVar6 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_58 = lVar6;
  cocos2d::Layer::Layer((Layer *)this);
  puVar1 = PTR_vtable_00c43518;
  *(int *)(this + 800) = param_2;
  *(undefined4 *)(this + 0x330) = 0;
  *(undefined **)this = puVar1 + 0x10;
                    /* try { // try from 0047222c to 0047247b has its CatchHandler @ 004724a4 */
  cocos2d::Rect::Rect((Rect *)(this + 0x348));
  (**(code **)(*(long *)this + 0x98))(this,param_3);
  plVar2 = (long *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*(long *)this + 0x208))(this,plVar2);
  (**(code **)(*plVar2 + 0x370))(aRStack_68,plVar2);
  cocos2d::Rect::operator=((Rect *)(this + 0x348),aRStack_68);
  if (param_2 - 4U < 5) {
    (**(code **)(*(long *)this + 0x80))(DAT_009c48e0,this);
    fVar7 = (float)(**(code **)(*(long *)this + 0x88))(this);
    cocos2d::Size::operator*((Size *)(this + 0x350),fVar7);
    cocos2d::Size::operator=((Size *)(this + 0x350),aSStack_70);
    (**(code **)(*(long *)this + 0x170))(this,0);
    local_78 = 0xc1f0000000000000;
    plVar2 = (long *)MakeLabel("",0xf,(Vec2 *)&local_78,0.0);
    *(long **)(this + 0x340) = plVar2;
    pcVar5 = *(code **)(*plVar2 + 0x80);
    fVar7 = (float)(**(code **)(*(long *)this + 0x88))(this);
    (*pcVar5)(1.0 / fVar7,plVar2);
    (**(code **)(**(long **)(this + 0x340) + 0x5a0))(*(long **)(this + 0x340),PTR_BLACK_00c44220,2);
    (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x340),1);
  }
  cocos2d::Size::operator/((Size *)(this + 0x350),2.0);
  fVar7 = param_3[1];
  *(float *)(this + 0x348) = *param_3 - local_80;
  *(float *)(this + 0x34c) = fVar7 - fStack_7c;
  pSVar3 = (Size *)(**(code **)(*(long *)this + 0x168))(this);
  cocos2d::Size::Size((Size *)&local_88,pSVar3);
  plVar2 = (long *)AtlasMgr::GetImg(param_4);
  *(long **)(this + 0x328) = plVar2;
  local_90 = local_88 * 0.5;
  fStack_8c = fStack_84 * 0.5;
  (**(code **)(*plVar2 + 0x98))(plVar2,&local_90);
  (**(code **)(**(long **)(this + 0x328) + 0x490))(*(long **)(this + 0x328),0x96);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x328));
  (**(code **)(*(long *)this + 0x490))(this,100);
  pVVar4 = (Vec2 *)(**(code **)(**(long **)(this + 0x328) + 0xb0))();
  plVar2 = (long *)MakeLabel("",0x19,pVVar4,0.0);
  *(long **)(this + 0x338) = plVar2;
  (**(code **)(*plVar2 + 0x170))(plVar2,0);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this + 0x338));
  if (lVar6 != local_58) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: FaceFrame
ADDRESS: 004728b8
========================================

/* FaceFrame::FaceFrame(Character*, int) */

void __thiscall FaceFrame::FaceFrame(FaceFrame *this,Character *param_1,int param_2)

{
  undefined *puVar1;
  long *plVar2;
  SpriteFrame *pSVar3;
  undefined8 uVar4;
  SquareBox *pSVar5;
  uint3 *puVar6;
  long lVar7;
  code *pcVar8;
  float fVar9;
  undefined8 local_60;
  char local_58 [16];
  long local_48;
  
  lVar7 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar7;
  cocos2d::Layer::Layer((Layer *)this);
  puVar1 = PTR_vtable_00c44400;
  *(Character **)(this + 800) = param_1;
  *(undefined **)this = puVar1 + 0x10;
                    /* try { // try from 00472910 to 00472a0f has its CatchHandler @ 00472b80 */
  plVar2 = (long *)(**(code **)(*(long *)(param_1 + 0x870) + 0x228))(param_1 + 0x870,0);
  pSVar3 = (SpriteFrame *)(**(code **)(*plVar2 + 0x5a8))();
  plVar2 = (long *)cocos2d::Sprite::createWithSpriteFrame(pSVar3);
  if ((*(byte *)(*(long *)(this + 800) + 0x41c6) >> 2 & 1) != 0) {
    (**(code **)(*plVar2 + 0x4c0))(plVar2,PTR_BLACK_00c42fc0);
  }
  (**(code **)(*(long *)this + 0x210))(this,plVar2,0);
  plVar2 = (long *)(**(code **)(*(long *)(*(long *)(this + 800) + 0x870) + 0x228))
                             (*(long *)(this + 800) + 0x870,1);
  if (plVar2 != (long *)0x0) {
    pSVar3 = (SpriteFrame *)(**(code **)(*plVar2 + 0x5a8))();
    uVar4 = cocos2d::Sprite::createWithSpriteFrame(pSVar3);
    (**(code **)(*(long *)this + 0x208))(this,uVar4);
  }
  plVar2 = (long *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*plVar2 + 0x50))(DAT_009c48dc,plVar2);
  (**(code **)(*plVar2 + 0x60))(DAT_009c48e0,plVar2);
  (**(code **)(*(long *)this + 0x210))(this,plVar2,0xffffffff);
  pSVar5 = operator_new(0x530);
                    /* try { // try from 00472a10 to 00472a2f has its CatchHandler @ 00472b94 */
  puVar6 = (uint3 *)GetColor(0);
  SquareBox::SquareBox(pSVar5,(ulong)*puVar6,0xff);
  *(SquareBox **)(this + 0x328) = pSVar5;
                    /* try { // try from 00472a3c to 00472b5b has its CatchHandler @ 00472b80 */
  (**(code **)(*(long *)pSVar5 + 0x148))(pSVar5,PTR_ZERO_00c41d10);
  (**(code **)(**(long **)(this + 0x328) + 200))(0x41e00000,DAT_009c68b4);
  (**(code **)(**(long **)(this + 0x328) + 0x50))(0x40a00000);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x328),1);
  local_58[8] = '\0';
  local_58[9] = '\0';
  local_58[0] = '\0';
  local_58[1] = '\0';
  local_58[2] = '\0';
  local_58[3] = '\0';
  local_58[4] = '\0';
  local_58[5] = '\0';
  local_58[6] = '\0';
  local_58[7] = '\0';
  sprintf(local_58,"Lv.%d",*(int *)(*(long *)(this + 800) + 0x4204));
  local_60 = 0xc188000000000000;
  plVar2 = (long *)MakeLabel(local_58,0xf,(Vec2 *)&local_60,0.0);
  (**(code **)(*plVar2 + 0x5a0))(plVar2,PTR_BLACK_00c44220,2);
  (**(code **)(*(long *)this + 0x208))(this,plVar2);
  plVar2 = *(long **)(this + 0x328);
  pcVar8 = *(code **)(*plVar2 + 0x60);
  fVar9 = (float)Character::GetPointRate(*(Character **)(this + 800),0);
  (*pcVar8)(fVar9 * DAT_009c68b0,plVar2);
  (**(code **)(*(long *)this + 200))(DAT_009c68b8,(float)(param_2 * -0x35 + 0x16b),this);
  if (lVar7 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: Setting
ADDRESS: 004731d4
========================================

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* Inventory::Setting() */

void __thiscall Inventory::Setting(Inventory *this)

{
  code *pcVar1;
  undefined4 uVar2;
  float fVar3;
  int iVar4;
  Node *pNVar5;
  long *plVar6;
  SquareBox *pSVar7;
  BaseItem *pBVar8;
  RuneSlot *this_00;
  char *pcVar9;
  float *pfVar10;
  int iVar11;
  uint uVar12;
  long lVar13;
  long lVar14;
  long lVar15;
  float fVar16;
  float fVar17;
  undefined8 local_158;
  float local_150;
  float fStack_14c;
  uint3 local_148 [2];
  Node *local_140;
  Node *local_138;
  undefined8 local_130;
  float local_128;
  float fStack_124;
  undefined8 local_c0;
  undefined8 uStack_b8;
  undefined8 local_b0;
  undefined8 uStack_a8;
  undefined8 local_a0;
  undefined8 uStack_98;
  undefined8 local_90;
  
  uVar2 = DAT_009c48e0;
  fVar16 = DAT_009c48b0;
  lVar14 = *(long *)PTR___stack_chk_guard_00c419a0;
  uVar12 = *(uint *)(this + 0x328);
  if (uVar12 == 4) {
    uStack_b8 = _UNK_009c6a38;
    local_c0 = _DAT_009c6a30;
    uStack_a8 = _UNK_009c6a48;
    local_b0 = _DAT_009c6a40;
    lVar15 = 0;
    uStack_98 = _UNK_009c6a58;
    local_a0 = _DAT_009c6a50;
    local_90 = 0x41200000;
    do {
      pNVar5 = (Node *)AtlasMgr::GetImg("ui/box.png");
      (**(code **)(**(long **)(this + 800) + 0x210))(*(long **)(this + 800),pNVar5,0);
      memset(&local_128,0,100);
      sprintf((char *)&local_128,"ui/inv_%s.png",*(char **)((long)&PTR_s_weapon_00bd7730 + lVar15));
      plVar6 = (long *)AtlasMgr::GetImg((char *)&local_128);
      local_130 = 0x420c0000420c0000;
      (**(code **)(*plVar6 + 0x98))(plVar6,&local_130);
      (**(code **)(*(long *)pNVar5 + 0x218))(pNVar5,plVar6,0,0);
      (**(code **)(*(long *)pNVar5 + 0x80))(uVar2,pNVar5);
      (**(code **)(*(long *)pNVar5 + 0x98))(pNVar5,(long)&local_c0 + lVar15);
      local_138 = pNVar5;
      if (*(undefined8 **)(this + 0x358) < *(undefined8 **)(this + 0x360)) {
        **(undefined8 **)(this + 0x358) = pNVar5;
        *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
      }
      else {
        std::__ndk1::vector<cocos2d::Node*,std::__ndk1::allocator<cocos2d::Node*>>::
        __push_back_slow_path<cocos2d::Node*>
                  ((vector<cocos2d::Node*,std::__ndk1::allocator<cocos2d::Node*>> *)(this + 0x350),
                   &local_138);
      }
      lVar15 = lVar15 + 8;
    } while (lVar15 != 0x38);
    cocos2d::Size::setSize((Size *)(this + 0x344),DAT_009c6a10,DAT_009c6a14);
    fVar16 = *(float *)(this + 0x334) + DAT_009c6a18;
    *(float *)(this + 0x340) = *(float *)(this + 0x338) + DAT_009c6a18;
    *(float *)(this + 0x33c) = fVar16;
    lVar15 = *(long *)PTR___stack_chk_guard_00c419a0;
  }
  else {
    iVar4 = *(int *)(this + 0x330);
    if (0 < iVar4) {
      iVar11 = *(int *)(this + 0x32c);
      uVar12 = 0;
      do {
        if (0 < iVar11) {
          iVar4 = 0;
          do {
            pNVar5 = (Node *)AtlasMgr::GetImg("ui/box.png");
            local_128 = (float)iVar4 * fVar16;
            fStack_124 = (float)(int)(*(int *)(this + 0x330) + ~uVar12) * fVar16;
            (**(code **)(*(long *)pNVar5 + 0x98))(pNVar5,&local_128);
            (**(code **)(**(long **)(this + 800) + 0x210))(*(long **)(this + 800),pNVar5,0);
            local_140 = pNVar5;
            if (*(undefined8 **)(this + 0x358) < *(undefined8 **)(this + 0x360)) {
              **(undefined8 **)(this + 0x358) = pNVar5;
              *(long *)(this + 0x358) = *(long *)(this + 0x358) + 8;
            }
            else {
              std::__ndk1::vector<cocos2d::Node*,std::__ndk1::allocator<cocos2d::Node*>>::
              __push_back_slow_path<cocos2d::Node*>
                        ((vector<cocos2d::Node*,std::__ndk1::allocator<cocos2d::Node*>> *)
                         (this + 0x350),&local_140);
            }
            iVar11 = *(int *)(this + 0x32c);
            iVar4 = iVar4 + 1;
          } while (iVar4 < iVar11);
          iVar4 = *(int *)(this + 0x330);
        }
        uVar12 = uVar12 + 1;
      } while ((int)uVar12 < iVar4);
      uVar12 = *(uint *)(this + 0x328);
    }
    if (uVar12 == 0) {
      pSVar7 = operator_new(0x530);
                    /* try { // try from 004734a0 to 004734cb has its CatchHandler @ 00473948 */
      cocos2d::Color3B::Color3B((Color3B *)local_148,'\0','\0','\0');
      SquareBox::SquareBox(pSVar7,(ulong)local_148[0],0x96);
      (**(code **)(*(long *)pSVar7 + 0x90))(DAT_009c589c,DAT_009c48b0,pSVar7);
      uVar2 = DAT_009c6a0c;
      (**(code **)(*(long *)pSVar7 + 0xd8))(DAT_009c6a0c,pSVar7);
      (**(code **)(*(long *)this + 0x218))(this,pSVar7,1,1);
      plVar6 = (long *)AtlasMgr::GetImg("ui/lock.png");
      (**(code **)(*plVar6 + 0xd8))(uVar2);
      (**(code **)(*(long *)this + 0x218))(this,plVar6,2,2);
      uVar12 = *(uint *)(this + 0x328);
    }
    lVar15 = lVar14;
    if (1 < uVar12) {
      AddTitle(this);
    }
  }
  if (*(int *)(this + 0x328) == 1) {
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 00473628 to 00473633 has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,0,0);
    InsertItem(this,pBVar8,0);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 00473650 to 0047365b has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,1,0);
    InsertItem(this,pBVar8,1);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 00473678 to 00473683 has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,2,0);
    InsertItem(this,pBVar8,2);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 004736a0 to 004736ab has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,3,0);
    InsertItem(this,pBVar8,3);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 004736c8 to 004736d3 has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,4,0);
    InsertItem(this,pBVar8,4);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 004736f0 to 004736fb has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,5,0);
    InsertItem(this,pBVar8,5);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 00473718 to 00473723 has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,6,0);
    InsertItem(this,pBVar8,6);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 00473740 to 0047374b has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,7,0);
    InsertItem(this,pBVar8,7);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 00473768 to 00473773 has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,8,0);
    InsertItem(this,pBVar8,8);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 00473790 to 0047379b has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,9,0);
    InsertItem(this,pBVar8,9);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 004737b8 to 004737c3 has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,10,0);
    InsertItem(this,pBVar8,10);
    pBVar8 = operator_new(0x5a0);
                    /* try { // try from 004737e0 to 004737eb has its CatchHandler @ 0047393c */
    RuneItem::RuneItem((RuneItem *)pBVar8,0xb,0);
    InsertItem(this,pBVar8,0xb);
    iVar4 = UserData::GetRuneSlot((UserData *)PTR_g_UserData_00c41478);
    fVar3 = DAT_009c6a1c;
    fVar16 = DAT_009c68b8;
    lVar13 = 0;
    do {
      plVar6 = *(long **)(*(long *)(this + 0x350) + lVar13 * 8 + 0x60);
      pcVar1 = *(code **)(*plVar6 + 0xe8);
      fVar17 = (float)(**(code **)(*plVar6 + 0xf0))(plVar6);
      (*pcVar1)(fVar17 + -5.0,plVar6);
      this_00 = operator_new(0x540);
                    /* try { // try from 00473868 to 0047386b has its CatchHandler @ 00473930 */
      RuneSlot::RuneSlot(this_00,lVar13 < iVar4);
      InsertItem(this,(BaseItem *)this_00,(int)lVar13 + 0xc);
      pcVar9 = (char *)GameMsg::Get(0x10,0xd);
      pfVar10 = (float *)(**(code **)(*plVar6 + 0xb0))(plVar6);
      local_150 = *pfVar10 + fVar3;
      fStack_14c = pfVar10[1] + fVar16;
      plVar6 = (long *)MakeLabel(pcVar9,0xf,(Vec2 *)&local_150,0.0);
      local_158 = 0x3f8000003f800000;
      (**(code **)(*plVar6 + 0x148))(plVar6,&local_158);
      (**(code **)(*(long *)this + 0x210))(this,plVar6,1);
      lVar13 = lVar13 + 1;
    } while (lVar13 < 4);
  }
  else if (*(int *)(this + 0x328) == 2) {
    pBVar8 = operator_new(0x550);
                    /* try { // try from 00473594 to 0047359b has its CatchHandler @ 00473940 */
    SkillItem::SkillItem((SkillItem *)pBVar8,0);
    InsertItem(this,pBVar8,0);
    pBVar8 = operator_new(0x550);
                    /* try { // try from 004735b8 to 004735bf has its CatchHandler @ 00473940 */
    SkillItem::SkillItem((SkillItem *)pBVar8,1);
    InsertItem(this,pBVar8,1);
    pBVar8 = operator_new(0x550);
                    /* try { // try from 004735dc to 004735e3 has its CatchHandler @ 00473940 */
    SkillItem::SkillItem((SkillItem *)pBVar8,2);
    InsertItem(this,pBVar8,2);
    pBVar8 = operator_new(0x550);
                    /* try { // try from 00473600 to 00473607 has its CatchHandler @ 00473940 */
    SkillItem::SkillItem((SkillItem *)pBVar8,3);
    InsertItem(this,pBVar8,3);
  }
  if (lVar15 != lVar14) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: AddTitle
ADDRESS: 00473e28
========================================

/* Inventory::AddTitle() */

void __thiscall Inventory::AddTitle(Inventory *this)

{
  long *plVar1;
  long *plVar2;
  char *pcVar3;
  long lVar4;
  undefined8 local_48;
  undefined4 local_40;
  float local_3c;
  long local_38;
  
  lVar4 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar4;
  if (*(long *)(this + 0x370) != *(long *)(this + 0x368)) {
    plVar1 = (long *)(**(code **)(*(long *)this + 0x228))(this,3);
    if (plVar1 == (long *)0x0) {
      plVar1 = (long *)AtlasMgr::GetImg("ui/box.png");
      local_3c = *(float *)(this + 0x348) + DAT_009c6a20;
      local_40 = 0x40a00000;
      (**(code **)(*plVar1 + 0x98))(plVar1,&local_40);
      (**(code **)(*plVar1 + 0x60))(0x3f000000,plVar1);
      (**(code **)(*(long *)this + 0x218))(this,plVar1,0,3);
    }
    plVar2 = (long *)(**(code **)(*plVar1 + 0x228))(plVar1,4);
    if (plVar2 != (long *)0x0) {
      (**(code **)(*plVar2 + 0x270))();
    }
    pcVar3 = (char *)GameMsg::Get(0x10,*(undefined4 *)(this + 0x328));
    plVar2 = (long *)MakeLabel(pcVar3,0x14,(Vec2 *)PTR_ZERO_00c41d10,0.0);
    local_48 = 0x420c0000420c0000;
    (**(code **)(*plVar2 + 0x98))(plVar2,&local_48);
    (**(code **)(*plVar2 + 0x60))(0x40000000,plVar2);
    (**(code **)(*plVar1 + 0x218))(plVar1,plVar2,0,4);
  }
  if (lVar4 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: GetItemImg
ADDRESS: 0047a864
========================================

/* GetItemImg(EquipmentType, int, char const*) */

void GetItemImg(ulong param_1,int param_2,char *param_3)

{
  long lVar1;
  char acStack_9c [100];
  long local_38;
  
  lVar1 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar1;
  if (param_2 == 6) {
    AtlasMgr::GetImg("item/6/legend_sword.png");
    return;
  }
  memset(acStack_9c,0,100);
  if (param_3 == (char *)0x0) {
    param_3 = (&PTR_s_weapon_00bd9b10)[param_1 & 0xffffffff];
  }
  sprintf(acStack_9c,"item/%d/%s.png",param_2,param_3);
  AtlasMgr::GetImg(acStack_9c);
  if (lVar1 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: ShopItem
ADDRESS: 0047a9b4
========================================

/* ShopItem::ShopItem(ShopItem::Type) */

void __thiscall ShopItem::ShopItem(ShopItem *this,uint param_2)

{
  undefined *puVar1;
  undefined *puVar2;
  int iVar3;
  int iVar4;
  uint uVar5;
  uint uVar6;
  undefined8 uVar7;
  long *plVar8;
  Label *pLVar9;
  Color3B *pCVar10;
  char *pcVar11;
  code *pcVar12;
  long lVar13;
  undefined8 local_180;
  Color3B aCStack_178 [8];
  undefined8 local_170;
  Color4B aCStack_168 [8];
  Color4B aCStack_160 [8];
  char acStack_158 [256];
  long local_58;
  
  lVar13 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_58 = lVar13;
  cocos2d::Sprite::Sprite((Sprite *)this);
  puVar2 = PTR_texture_00c43478;
  puVar1 = PTR_vtable_00c42810 + 0x10;
  *(undefined **)(this + 0x2f8) = PTR_vtable_00c42810 + 0x6a8;
  *(undefined4 *)(this + 0x534) = 2;
  *(undefined **)this = puVar1;
                    /* try { // try from 0047aa18 to 0047aa2f has its CatchHandler @ 0047b080 */
  cocos2d::Sprite::initWithTexture((Texture2D *)this,*(Rect **)puVar2);
  cocos2d::Ref::autorelease((Ref *)this);
  puVar1 = PTR_vtable_00c40d20;
  *(uint *)(this + 0x538) = param_2;
  *(undefined **)this = puVar1 + 0x10;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
                    /* try { // try from 0047aa4c to 0047aa67 has its CatchHandler @ 0047b07c */
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x53c));
  iVar3 = rand();
  *(int *)(this + 0x540) = iVar3;
  *(int *)(this + 0x53c) = iVar3;
  *(uint *)(this + 0x544) = iVar3 << 1 ^ 0x3edd3b2d;
                    /* try { // try from 0047aa84 to 0047ab2b has its CatchHandler @ 0047afcc */
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x548));
  iVar3 = rand();
  *(int *)(this + 0x54c) = iVar3;
  *(int *)(this + 0x548) = iVar3;
  *(uint *)(this + 0x550) = iVar3 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x554));
  iVar3 = rand();
  *(int *)(this + 0x558) = iVar3;
  *(int *)(this + 0x554) = iVar3;
  *(uint *)(this + 0x55c) = iVar3 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x560));
  iVar3 = rand();
  *(int *)(this + 0x564) = iVar3;
  *(int *)(this + 0x560) = iVar3;
  *(uint *)(this + 0x568) = iVar3 << 1 ^ 0x3edd3b2d;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x56c));
  iVar3 = rand();
  *(int *)(this + 0x570) = iVar3;
  *(int *)(this + 0x56c) = iVar3;
  *(uint *)(this + 0x574) = iVar3 << 1 ^ 0x3edd3b2d;
  if (2 < (int)param_2) {
                    /* try { // try from 0047ab44 to 0047ab57 has its CatchHandler @ 0047b004 */
    cocos2d::Node::schedule((_func_void_float *)this);
  }
                    /* try { // try from 0047ab58 to 0047ab97 has its CatchHandler @ 0047b00c */
  iVar3 = rand();
  *(int *)(this + 0x54c) = iVar3;
  *(int *)(this + 0x548) = iVar3;
  *(uint *)(this + 0x550) = iVar3 << 1 ^ 0x3edd3b2d;
  iVar3 = rand();
  *(int *)(this + 0x558) = iVar3;
  *(int *)(this + 0x554) = iVar3;
  *(uint *)(this + 0x55c) = iVar3 << 1 ^ 0x3edd3b2d;
  iVar3 = rand();
  *(int *)(this + 0x564) = iVar3;
  *(int *)(this + 0x560) = iVar3;
  *(uint *)(this + 0x568) = iVar3 << 1 ^ 0x3edd3b2d;
  iVar3 = rand();
  *(int *)(this + 0x570) = iVar3;
  *(int *)(this + 0x56c) = iVar3;
  *(uint *)(this + 0x574) = iVar3 << 1 ^ 0x3edd3b2d;
                    /* try { // try from 0047aba8 to 0047abc7 has its CatchHandler @ 0047b004 */
  iVar3 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
  iVar4 = UserData::GetAct((UserData *)PTR_g_UserData_00c41478);
  memset(acStack_158,0,0x100);
  if (6 < param_2) {
    pcVar11 = (char *)0x0;
    goto LAB_0047ad74;
  }
  switch(param_2) {
  case 0:
    uVar6 = *(uint *)(PTR_g_gold_price_00c41768 + (long)(iVar4 + -1) * 4 + (long)(iVar3 + -1) * 0x14
                     );
                    /* try { // try from 0047ac18 to 0047af8b has its CatchHandler @ 0047b004 */
    uVar5 = rand();
    *(uint *)(this + 0x548) = uVar5 ^ uVar6;
    *(uint *)(this + 0x54c) = uVar5;
    *(uint *)(this + 0x550) = (uVar5 ^ uVar6) + uVar5 ^ 0x3edd3b2d;
    pcVar11 = "chest/normal.png";
    break;
  case 1:
    uVar6 = *(uint *)(PTR_g_gem_price_00c42cb0 + (long)(iVar4 + -1) * 4 + (long)(iVar3 + -1) * 0x14)
    ;
    uVar5 = rand();
    *(uint *)(this + 0x554) = uVar5 ^ uVar6;
    *(uint *)(this + 0x558) = uVar5;
    *(uint *)(this + 0x55c) = (uVar5 ^ uVar6) + uVar5 ^ 0x3edd3b2d;
    pcVar11 = "chest/premium.png";
    break;
  case 2:
    uVar6 = rand();
    *(uint *)(this + 0x554) = uVar6 ^ 200;
    *(uint *)(this + 0x558) = uVar6;
    *(uint *)(this + 0x55c) = (uVar6 ^ 200) + uVar6 ^ 0x3edd3b2d;
    pcVar11 = "chest/rune.png";
    break;
  case 3:
    uVar6 = rand();
    *(uint *)(this + 0x56c) = uVar6 ^ 1;
    pcVar11 = "chest/ad.png";
    *(uint *)(this + 0x570) = uVar6;
    *(uint *)(this + 0x574) = (uVar6 ^ 1) + uVar6 ^ 0x3edd3b2d;
    break;
  case 4:
    plVar8 = (long *)AtlasMgr::GetImg("item/0/gem.png");
    (**(code **)(*(long *)this + 0x218))(this,plVar8,1,0);
    local_170 = 0xc1a00000;
    (**(code **)(*plVar8 + 0x98))(plVar8,&local_170);
    plVar8 = (long *)MakeLabel(0,10,2,0xf,PTR_ZERO_00c41d10);
    (**(code **)(*plVar8 + 200))(0x41000000,0,plVar8);
    (**(code **)(*(long *)this + 0x208))(this,plVar8);
    uVar6 = rand();
    goto LAB_0047af8c;
  case 5:
    uVar7 = GameMsg::Get(0x43,8);
    sprintf(acStack_158,"%s\n1",uVar7);
    pLVar9 = (Label *)MakeLabel(acStack_158,0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
    cocos2d::Label::setAlignment(pLVar9,1,*(undefined4 *)(pLVar9 + 0x454));
    pcVar12 = *(code **)(*(long *)pLVar9 + 0x590);
    (**(code **)(*(long *)this + 0x678))(this);
    pCVar10 = (Color3B *)GetColor();
    cocos2d::Color4B::Color4B(aCStack_160,pCVar10,0xff);
    (*pcVar12)(pLVar9,aCStack_160);
    (**(code **)(*(long *)pLVar9 + 0x180))(DAT_009c48a8,pLVar9);
    (**(code **)(*(long *)this + 0x208))(this,pLVar9);
    uVar6 = rand();
    goto LAB_0047af8c;
  case 6:
    uVar7 = GameMsg::Get(0x43,8);
    sprintf(acStack_158,"%s\n2",uVar7);
    pLVar9 = (Label *)MakeLabel(acStack_158,0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
    cocos2d::Label::setAlignment(pLVar9,1,*(undefined4 *)(pLVar9 + 0x454));
    pcVar12 = *(code **)(*(long *)pLVar9 + 0x590);
    (**(code **)(*(long *)this + 0x678))(this);
    pCVar10 = (Color3B *)GetColor();
    cocos2d::Color4B::Color4B(aCStack_168,pCVar10,0xff);
    (*pcVar12)(pLVar9,aCStack_168);
    (**(code **)(*(long *)pLVar9 + 0x180))(DAT_009c48a8,pLVar9);
    (**(code **)(*(long *)this + 0x208))(this,pLVar9);
    uVar6 = rand();
LAB_0047af8c:
    *(uint *)(this + 0x564) = uVar6;
    *(uint *)(this + 0x560) = uVar6 ^ 1;
    *(uint *)(this + 0x568) = (uVar6 ^ 1) + uVar6 ^ 0x3edd3b2d;
    goto LAB_0047afa4;
  }
LAB_0047ad74:
  uVar7 = AtlasMgr::GetImg(pcVar11);
  (**(code **)(*(long *)this + 0x218))(this,uVar7,1,0);
  plVar8 = (long *)AtlasMgr::GetImg(pcVar11);
  pcVar12 = *(code **)(*plVar8 + 0x4c0);
  cocos2d::Color3B::Color3B(aCStack_178,'\0','\0','\0');
  (*pcVar12)(plVar8,aCStack_178);
  (**(code **)(*plVar8 + 0x490))(plVar8,0x96);
  local_180 = 0xc0a00000c0a00000;
  (**(code **)(*plVar8 + 0x98))(plVar8,&local_180);
  (**(code **)(*(long *)this + 0x218))(this,plVar8,0xffffffff,1);
LAB_0047afa4:
  if (lVar13 != local_58) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: InstantItem
ADDRESS: 0047b9dc
========================================

/* InstantItem::InstantItem(ItemType, int) */

void __thiscall InstantItem::InstantItem(InstantItem *this,int param_2,uint param_3)

{
  undefined *puVar1;
  undefined *puVar2;
  int iVar3;
  uint uVar4;
  undefined8 uVar5;
  long *plVar6;
  char *pcVar7;
  code *pcVar8;
  long lVar9;
  undefined8 local_58;
  Color3B aCStack_50 [8];
  long local_48;
  
  lVar9 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar9;
  cocos2d::Sprite::Sprite((Sprite *)this);
  puVar1 = PTR_vtable_00c42810;
  *(int *)(this + 0x534) = param_2;
  puVar2 = PTR_texture_00c43478;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
  *(undefined **)this = puVar1 + 0x10;
                    /* try { // try from 0047ba3c to 0047ba53 has its CatchHandler @ 0047bbe0 */
  cocos2d::Sprite::initWithTexture((Texture2D *)this,*(Rect **)puVar2);
  cocos2d::Ref::autorelease((Ref *)this);
  *(undefined4 *)(this + 0x54c) = 0;
  puVar1 = PTR_vtable_00c42870;
  *(undefined8 *)(this + 0x544) = 0;
  *(undefined8 *)(this + 0x53c) = 0;
  *(undefined **)this = puVar1 + 0x10;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
                    /* try { // try from 0047ba80 to 0047ba9b has its CatchHandler @ 0047bbdc */
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x550));
  iVar3 = rand();
  *(int *)(this + 0x554) = iVar3;
  *(int *)(this + 0x550) = iVar3;
  *(uint *)(this + 0x558) = iVar3 << 1 ^ 0x3edd3b2d;
                    /* try { // try from 0047bab4 to 0047bb97 has its CatchHandler @ 0047bbbc */
  uVar4 = rand();
  *(uint *)(this + 0x550) = uVar4 ^ param_3;
  *(uint *)(this + 0x554) = uVar4;
  *(uint *)(this + 0x558) = (uVar4 ^ param_3) + uVar4 ^ 0x3edd3b2d;
  if (param_2 - 5U < 6) {
    pcVar7 = (&PTR_s_item_0_gold_png_00bdc520)[(int)(param_2 - 5U)];
  }
  else {
    pcVar7 = (char *)0x0;
  }
  uVar5 = AtlasMgr::GetImg(pcVar7);
  (**(code **)(*(long *)this + 0x218))(this,uVar5,1,0);
  plVar6 = (long *)AtlasMgr::GetImg(pcVar7);
  pcVar8 = *(code **)(*plVar6 + 0x4c0);
  cocos2d::Color3B::Color3B(aCStack_50,'\0','\0','\0');
  (*pcVar8)(plVar6,aCStack_50);
  (**(code **)(*plVar6 + 0x490))(plVar6,0x96);
  local_58 = 0xc0a00000c0a00000;
  (**(code **)(*plVar6 + 0x98))(plVar6,&local_58);
  (**(code **)(*(long *)this + 0x218))(this,plVar6,0xffffffff,1);
  if (lVar9 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: RuneSlot
ADDRESS: 0047bcac
========================================

/* RuneSlot::RuneSlot(bool) */

void __thiscall RuneSlot::RuneSlot(RuneSlot *this,bool param_1)

{
  undefined *puVar1;
  undefined *puVar2;
  undefined8 uVar3;
  long *plVar4;
  
  cocos2d::Sprite::Sprite((Sprite *)this);
  puVar2 = PTR_texture_00c43478;
  puVar1 = PTR_vtable_00c42810 + 0x10;
  *(undefined **)(this + 0x2f8) = PTR_vtable_00c42810 + 0x6a8;
  *(undefined4 *)(this + 0x534) = 4;
  *(undefined **)this = puVar1;
                    /* try { // try from 0047bcf0 to 0047bd07 has its CatchHandler @ 0047bda4 */
  cocos2d::Sprite::initWithTexture((Texture2D *)this,*(Rect **)puVar2);
  cocos2d::Ref::autorelease((Ref *)this);
  puVar1 = PTR_vtable_00c41b20;
  this[0x538] = (RuneSlot)param_1;
  *(undefined **)this = puVar1 + 0x10;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
                    /* try { // try from 0047bd28 to 0047bd93 has its CatchHandler @ 0047bda0 */
  uVar3 = AtlasMgr::GetImg("rune/mark.png");
  (**(code **)(*(long *)this + 0x210))(this,uVar3,0);
  if (!param_1) {
    plVar4 = (long *)AtlasMgr::GetImg("ui/lock.png");
    (**(code **)(*plVar4 + 0x80))(0x3f000000,plVar4);
    (**(code **)(*(long *)this + 0x218))(this,plVar4,1,100);
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: RuneItem
ADDRESS: 0047be1c
========================================

/* RuneItem::RuneItem(RuneType, bool) */

void __thiscall RuneItem::RuneItem(RuneItem *this,undefined4 param_2,byte param_3)

{
  undefined *puVar1;
  undefined4 uVar2;
  undefined *puVar3;
  int iVar4;
  int iVar5;
  long *plVar6;
  long *plVar7;
  long lVar8;
  code *pcVar9;
  undefined8 local_d8;
  Color3B aCStack_d0 [4];
  char acStack_cc [100];
  long local_68;
  
  lVar8 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_68 = lVar8;
  cocos2d::Sprite::Sprite((Sprite *)this);
  puVar3 = PTR_texture_00c43478;
  puVar1 = PTR_vtable_00c42810 + 0x10;
  *(undefined **)(this + 0x2f8) = PTR_vtable_00c42810 + 0x6a8;
  *(undefined4 *)(this + 0x534) = 1;
  *(undefined **)this = puVar1;
                    /* try { // try from 0047be88 to 0047be9f has its CatchHandler @ 0047c124 */
  cocos2d::Sprite::initWithTexture((Texture2D *)this,*(Rect **)puVar3);
  cocos2d::Ref::autorelease((Ref *)this);
  *(undefined4 *)(this + 0x54c) = 0;
  puVar1 = PTR_vtable_00c42938;
  *(undefined8 *)(this + 0x544) = 0;
  *(undefined8 *)(this + 0x53c) = 0;
  *(undefined **)this = puVar1 + 0x10;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
  *(undefined4 *)(this + 0x550) = param_2;
                    /* try { // try from 0047bed0 to 0047beeb has its CatchHandler @ 0047c100 */
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x554));
  iVar4 = rand();
  *(int *)(this + 0x558) = iVar4;
  *(int *)(this + 0x554) = iVar4;
  *(uint *)(this + 0x55c) = iVar4 << 1 ^ 0x3edd3b2d;
                    /* try { // try from 0047bf04 to 0047bf1f has its CatchHandler @ 0047c104 */
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(this + 0x560));
  iVar5 = rand();
  iVar4 = *(int *)(this + 0x550);
  *(int *)(this + 0x564) = iVar5;
  *(int *)(this + 0x560) = iVar5;
  *(undefined8 *)(this + 0x590) = 0;
  *(undefined8 *)(this + 0x580) = 0;
  *(uint *)(this + 0x568) = iVar5 << 1 ^ 0x3edd3b2d;
  *(undefined8 *)(this + 0x578) = 0;
  *(undefined8 *)(this + 0x570) = 0;
  this[0x598] = (RuneItem)(param_3 & 1);
  if (iVar4 == -1) {
                    /* try { // try from 0047bf54 to 0047bf57 has its CatchHandler @ 0047c0e0 */
    iVar4 = rand();
    iVar4 = iVar4 % 0xb;
    *(int *)(this + 0x550) = iVar4;
  }
  memset(acStack_cc,0,100);
  sprintf(acStack_cc,"rune/%d.png",iVar4);
                    /* try { // try from 0047bfa4 to 0047c0b3 has its CatchHandler @ 0047c0e0 */
  plVar6 = (long *)AtlasMgr::GetImg(acStack_cc);
  (**(code **)(*(long *)this + 0x218))(this,plVar6,0,0);
  plVar7 = (long *)AtlasMgr::GetImg(acStack_cc);
  pcVar9 = *(code **)(*plVar7 + 0x4c0);
  cocos2d::Color3B::Color3B(aCStack_d0,'\0','\0','\0');
  (*pcVar9)(plVar7,aCStack_d0);
  (**(code **)(*plVar7 + 0x490))(plVar7,0x96);
  local_d8 = 0xc0a00000c0a00000;
  (**(code **)(*plVar7 + 0x98))(plVar7,&local_d8);
  (**(code **)(*(long *)this + 0x218))(this,plVar7,0xffffffff,1);
  uVar2 = DAT_009c7250;
  if (this[0x598] == (RuneItem)0x0) {
    (**(code **)(*plVar6 + 0x490))(plVar6,100);
    (**(code **)(*plVar7 + 0x170))(plVar7,0);
  }
  else {
    (**(code **)(*plVar6 + 0x80))(DAT_009c7250,plVar6);
    (**(code **)(*plVar7 + 0x80))(uVar2,plVar7);
  }
  if (lVar8 != local_68) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: SkillItem
ADDRESS: 0047d370
========================================

/* SkillItem::SkillItem(PassiveSkill) */

void __thiscall SkillItem::SkillItem(SkillItem *this,uint param_2)

{
  undefined *puVar1;
  undefined *puVar2;
  char *pcVar3;
  undefined8 uVar4;
  long *plVar5;
  
  cocos2d::Sprite::Sprite((Sprite *)this);
  puVar2 = PTR_texture_00c43478;
  puVar1 = PTR_vtable_00c42810 + 0x10;
  *(undefined **)(this + 0x2f8) = PTR_vtable_00c42810 + 0x6a8;
  *(undefined4 *)(this + 0x534) = 3;
  *(undefined **)this = puVar1;
                    /* try { // try from 0047d3b4 to 0047d3cb has its CatchHandler @ 0047d48c */
  cocos2d::Sprite::initWithTexture((Texture2D *)this,*(Rect **)puVar2);
  cocos2d::Ref::autorelease((Ref *)this);
  puVar1 = PTR_vtable_00c416d8;
  pcVar3 = (char *)0x0;
  *(undefined8 *)(this + 0x538) = 0;
  *(uint *)(this + 0x540) = param_2;
  *(undefined8 *)(this + 0x548) = 0;
  *(undefined **)this = puVar1 + 0x10;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
  if (param_2 < 4) {
    pcVar3 = (&PTR_s_skill_revival_png_00bdc550)[(int)param_2];
  }
                    /* try { // try from 0047d408 to 0047d47b has its CatchHandler @ 0047d488 */
  uVar4 = AtlasMgr::GetImg(pcVar3);
  (**(code **)(*(long *)this + 0x218))(this,uVar4,1,0);
  plVar5 = (long *)MakeLabel("",0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  *(long **)(this + 0x538) = plVar5;
  (**(code **)(*plVar5 + 200))(0,0xc1b80000);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x538),2);
  SetLevelMsg(this);
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: EquipItem
ADDRESS: 0047dc38
========================================

/* EquipItem::EquipItem(EquipmentType, int, int, ItemQuality, bool) */

void __thiscall
EquipItem::EquipItem
          (EquipItem *this,uint param_2,undefined4 param_3,int param_4,undefined4 param_5,
          uint param_6)

{
  undefined *puVar1;
  undefined *puVar2;
  int iVar3;
  int iVar4;
  int iVar5;
  undefined8 uVar6;
  long *plVar7;
  code *pcVar8;
  long lVar9;
  float fVar10;
  float fVar11;
  undefined8 local_f0;
  uint uStack_e8;
  uint uStack_e4;
  uint local_e0;
  undefined8 local_d8;
  Color3B aCStack_d0 [4];
  char acStack_cc [100];
  long local_68;
  
  lVar9 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_68 = lVar9;
  cocos2d::Sprite::Sprite((Sprite *)this);
  puVar1 = PTR_vtable_00c42810;
  *(undefined4 *)(this + 0x534) = 0;
  puVar2 = PTR_texture_00c43478;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
  *(undefined **)this = puVar1 + 0x10;
                    /* try { // try from 0047dcac to 0047dcc3 has its CatchHandler @ 0047e140 */
  cocos2d::Sprite::initWithTexture((Texture2D *)this,*(Rect **)puVar2);
  cocos2d::Ref::autorelease((Ref *)this);
  *(undefined4 *)(this + 0x54c) = 0;
  *(undefined8 *)(this + 0x544) = 0;
  puVar1 = PTR_vtable_00c44898;
  *(undefined8 *)(this + 0x53c) = 0;
  *(undefined4 *)(this + 0x55c) = param_5;
  *(uint *)(this + 0x550) = param_2;
  *(undefined4 *)(this + 0x554) = param_3;
  *(int *)(this + 0x558) = param_4;
  *(undefined8 *)(this + 0x570) = 0;
  *(undefined8 *)(this + 0x568) = 0;
  *(undefined8 *)(this + 0x560) = 0;
  *(undefined **)this = puVar1 + 0x10;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x6a8;
  if (param_4 == 6) {
    *(undefined4 *)(this + 0x55c) = 5;
                    /* try { // try from 0047dd20 to 0047dd2f has its CatchHandler @ 0047e134 */
    uVar6 = AtlasMgr::GetImg("item/6/legend_sword.png");
  }
  else {
    memset(acStack_cc,0,100);
    sprintf(acStack_cc,"item/%d/%s.png",param_4,(&PTR_s_weapon_00bd9b10)[param_2]);
                    /* try { // try from 0047dd64 to 0047dd9f has its CatchHandler @ 0047e134 */
    uVar6 = AtlasMgr::GetImg(acStack_cc);
  }
  (**(code **)(*(long *)this + 0x218))(this,uVar6,1,0);
  if (param_4 == 6) {
    plVar7 = (long *)AtlasMgr::GetImg("item/6/legend_sword.png");
  }
  else {
    memset(acStack_cc,0,100);
    sprintf(acStack_cc,"item/%d/%s.png",param_4,(&PTR_s_weapon_00bd9b10)[param_2]);
                    /* try { // try from 0047ddd4 to 0047de7b has its CatchHandler @ 0047e134 */
    plVar7 = (long *)AtlasMgr::GetImg(acStack_cc);
  }
  pcVar8 = *(code **)(*plVar7 + 0x4c0);
  cocos2d::Color3B::Color3B(aCStack_d0,'\0','\0','\0');
  (*pcVar8)(plVar7,aCStack_d0);
  (**(code **)(*plVar7 + 0x490))(plVar7,0x96);
  local_d8 = 0xc0a00000c0a00000;
  (**(code **)(*plVar7 + 0x98))(plVar7,&local_d8);
  (**(code **)(*(long *)this + 0x218))(this,plVar7,0xffffffff,1);
  local_f0 = 0xff;
  SafeVarMgr::Get();
  SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)&uStack_e8);
  uStack_e8 = rand();
  local_e0 = uStack_e8 << 1 ^ 0x3edd3b2d;
  if (*(int *)(this + 0x550) == 0) {
    uVar6 = 6;
    local_f0 = CONCAT44(local_f0._4_4_,6);
  }
  else if (*(int *)(this + 0x550) == 6) {
    uVar6 = 8;
    local_f0 = CONCAT44(local_f0._4_4_,8);
  }
  else {
    uVar6 = 0;
    local_f0 = (ulong)local_f0._4_4_ << 0x20;
  }
  uStack_e4 = uStack_e8;
                    /* try { // try from 0047dec4 to 0047dfdb has its CatchHandler @ 0047e13c */
  fVar10 = (float)GameData::GetItemAbillity(uVar6,param_3,*(undefined4 *)(this + 0x558),0);
  uStack_e4 = rand();
  uStack_e8 = uStack_e4 ^ (uint)fVar10;
  local_e0 = uStack_e8 + uStack_e4 ^ 0x3edd3b2d;
  switch(*(undefined4 *)(this + 0x55c)) {
  case 0:
    uStack_e4 = rand();
    fVar11 = DAT_009c7250;
    break;
  case 1:
    uStack_e4 = rand();
    fVar11 = DAT_009c48dc;
    break;
  default:
    goto switchD_0047df0c_caseD_2;
  case 3:
    uStack_e4 = rand();
    fVar11 = DAT_009c57b4;
    break;
  case 4:
    uStack_e4 = rand();
    fVar11 = DAT_009c4884;
    break;
  case 5:
    uStack_e4 = rand();
    fVar11 = DAT_009c7254;
  }
  uStack_e8 = (uint)(fVar10 * fVar11) ^ uStack_e4;
  local_e0 = uStack_e8 + uStack_e4 ^ 0x3edd3b2d;
switchD_0047df0c_caseD_2:
  plVar7 = *(long **)(this + 0x568);
  if (plVar7 == *(long **)(this + 0x570)) {
    std::__ndk1::vector<ItemAbility,std::__ndk1::allocator<ItemAbility>>::
    __push_back_slow_path<ItemAbility_const&>
              ((vector<ItemAbility,std::__ndk1::allocator<ItemAbility>> *)(this + 0x560),
               (ItemAbility *)&local_f0);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::AddVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)(plVar7 + 1));
    iVar3 = rand();
    *(int *)(plVar7 + 1) = iVar3;
    *(int *)((long)plVar7 + 0xc) = iVar3;
    *(uint *)(plVar7 + 2) = iVar3 << 1 ^ 0x3edd3b2d;
    *(uint *)(plVar7 + 2) = local_e0;
    plVar7[1] = CONCAT44(uStack_e4,uStack_e8);
    *plVar7 = local_f0;
    *(long *)(this + 0x568) = *(long *)(this + 0x568) + 0x14;
  }
  if ((param_6 & 1) != 0) {
    iVar3 = -1;
    while( true ) {
                    /* try { // try from 0047dff8 to 0047e07b has its CatchHandler @ 0047e080 */
      iVar4 = GameData::GetOptionCnt(*(int *)(this + 0x55c));
      iVar3 = iVar3 + 1;
      if (iVar4 <= iVar3) break;
      if (*(int *)(this + 0x55c) == 5) {
        iVar4 = 5;
      }
      else if (*(int *)(this + 0x55c) < 3) {
        iVar4 = 0;
      }
      else {
        iVar4 = rand();
        iVar4 = iVar4 % 5 + 1;
      }
      iVar5 = rand();
      AddOption(this,iVar5 % 9,iVar4);
    }
  }
                    /* try { // try from 0047e0d8 to 0047e0ef has its CatchHandler @ 0047e148 */
  SafeVarMgr::Get();
  SafeVarMgr::DelVar((SafeVarMgr *)PTR_ins_00c43690,(SafeVarBase *)&uStack_e8);
  if (lVar9 != local_68) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: MakeSpriteBtn
ADDRESS: 004d1aec
========================================

/* MyUtil::MakeSpriteBtn(char const*, int, cocos2d::Vec2 const&, std::__ndk1::function<void
   (cocos2d::Ref*)> const&, Color, bool) */

long * MyUtil::MakeSpriteBtn
                 (char *param_1,undefined4 param_2,undefined8 param_3,function *param_4,int param_5,
                 uint param_6)

{
  Sprite *this;
  Sprite *this_00;
  undefined8 uVar1;
  long *plVar2;
  code *pcVar3;
  
  this = (Sprite *)AtlasMgr::GetImg(param_1);
  (**(code **)(*(long *)this + 0x490))(this,0xb4);
  this_00 = (Sprite *)AtlasMgr::GetImg(param_1);
  if (param_5 != -1) {
    pcVar3 = *(code **)(*(long *)this + 0x4c0);
    uVar1 = GetColor(param_5);
    (*pcVar3)(this,uVar1);
    pcVar3 = *(code **)(*(long *)this_00 + 0x4c0);
    uVar1 = GetColor(param_5);
    (*pcVar3)(this_00,uVar1);
  }
  if ((param_6 & 1) != 0) {
    cocos2d::Sprite::setFlippedX(this,true);
    cocos2d::Sprite::setFlippedX(this_00,true);
  }
  plVar2 = (long *)cocos2d::MenuItemSprite::create((Node *)this,(Node *)this_00,param_4);
  (**(code **)(*plVar2 + 0x98))(plVar2,param_3);
  (**(code **)(*plVar2 + 0x2c0))(plVar2,param_2);
  return plVar2;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: TextBtn
ADDRESS: 004d1cc8
========================================

/* TextBtn::TextBtn(char const*, int, int, int, cocos2d::Vec2 const&, std::__ndk1::function<void
   (cocos2d::Ref*)> const&) */

void __thiscall
TextBtn::TextBtn(TextBtn *this,char *param_1,int param_2,int param_3,int param_4,Vec2 *param_5,
                function *param_6)

{
  Node *pNVar1;
  Node *pNVar2;
  long *plVar3;
  
  cocos2d::Node::Node((Node *)this);
  *(undefined8 *)(this + 0x330) = 0;
  this[0x2f8] = (TextBtn)0x0;
  this[0x2f9] = (TextBtn)0x0;
  *(undefined8 *)(this + 800) = 0;
  *(undefined8 *)(this + 0x340) = 0;
  *(undefined8 *)(this + 0x338) = 0;
  *(undefined **)this = PTR_vtable_00c42d98 + 0x10;
                    /* try { // try from 004d1d14 to 004d1de3 has its CatchHandler @ 004d1df8 */
  pNVar1 = (Node *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*(long *)pNVar1 + 0x490))(pNVar1,0xb4);
  pNVar2 = (Node *)AtlasMgr::GetImg("ui/box.png");
  (**(code **)(*(long *)pNVar1 + 0x90))(0x3f800000,0x3f000000,pNVar1);
  (**(code **)(*(long *)pNVar2 + 0x90))(0x3f800000,0x3f000000,pNVar2);
  cocos2d::MenuItemSprite::initWithNormalSprite
            ((MenuItemSprite *)this,pNVar1,pNVar2,(Node *)0x0,param_6);
  plVar3 = (long *)MakeLabel(&DAT_00a191b7,param_2,(Vec2 *)PTR_ZERO_00c41d10,0.0);
  (**(code **)(*plVar3 + 200))(DAT_009c68b8,DAT_009c58b4,plVar3);
  (**(code **)(*(long *)this + 0x208))(this,plVar3);
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: Stage
ADDRESS: 004dd070
========================================

/* Stage::Stage(ACT, int) */

void __thiscall Stage::Stage(Stage *this,undefined4 param_2,undefined4 param_3)

{
  float fVar1;
  undefined *puVar2;
  ScriptMgr *pSVar3;
  undefined8 uVar4;
  Director *this_00;
  Size *pSVar5;
  long *plVar6;
  User *this_01;
  SquareBox *pSVar7;
  uint3 *puVar8;
  long lVar9;
  undefined4 uVar10;
  User *local_78;
  undefined4 local_70;
  float local_6c;
  undefined8 local_68;
  Size aSStack_60 [4];
  float local_5c;
  long local_58;
  
  lVar9 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_58 = lVar9;
  cocos2d::Layer::Layer((Layer *)this);
  puVar2 = PTR_vtable_00c42db0;
  *(undefined4 *)(this + 0x328) = 0;
  this[0x32c] = (Stage)0x0;
  *(undefined8 *)(this + 0x368) = 0;
  *(undefined8 *)(this + 0x360) = 0;
  *(undefined **)this = puVar2 + 0x10;
  *(undefined8 *)(this + 0x358) = 0;
                    /* try { // try from 004dd0d4 to 004dd0df has its CatchHandler @ 004dd5ac */
  pSVar3 = operator_new(0x40);
                    /* try { // try from 004dd0e0 to 004dd0ef has its CatchHandler @ 004dd5b4 */
  ScriptMgr::ScriptMgr(pSVar3,param_2,param_3);
  *(ScriptMgr **)(this + 0x370) = pSVar3;
  *(undefined4 *)(this + 0x378) = 0;
  *(undefined4 *)(this + 0x388) = param_2;
  *(undefined4 *)(this + 0x38c) = param_3;
  *(undefined8 *)(this + 0x3a8) = 0;
  *(undefined8 *)(this + 0x3a0) = 0;
  *(undefined8 *)(this + 0x398) = 0;
  *(undefined8 *)(this + 1000) = 0;
  *(undefined4 *)(this + 0x3c4) = 0;
  *(undefined4 *)(this + 0x3b0) = 0xffffffff;
  *(undefined8 *)(this + 0x3bc) = 0;
  *(undefined8 *)(this + 0x3b4) = 0;
  *(undefined8 *)(this + 0x3d0) = 0;
  *(undefined2 *)(this + 0x3e0) = 0;
  *(undefined8 *)(this + 0x3d8) = 0;
                    /* try { // try from 004dd140 to 004dd193 has its CatchHandler @ 004dd518 */
  (**(code **)(*(long *)this + 0x4f8))(this);
  uVar4 = cocos2d::SpriteBatchNode::createWithTexture(*(Texture2D **)PTR_texture_00c43478,0x1d);
  *(undefined8 *)(this + 0x380) = uVar4;
  (**(code **)(*(long *)this + 0x208))(this,uVar4);
  cocos2d::Ref::autorelease((Ref *)this);
  this_00 = (Director *)cocos2d::Director::getInstance();
  pSVar5 = (Size *)cocos2d::Director::getWinSize(this_00);
  cocos2d::Size::Size(aSStack_60,pSVar5);
                    /* try { // try from 004dd194 to 004dd377 has its CatchHandler @ 004dd520 */
  plVar6 = (long *)AtlasMgr::GetImg("stage/grass.png");
  *(long **)(this + 0x338) = plVar6;
  local_68 = 0x3f80000000000000;
  (**(code **)(*plVar6 + 0x148))(plVar6,&local_68);
  fVar1 = DAT_00a19bc0;
  local_6c = local_5c + DAT_00a19bc0;
  local_70 = 0;
  (**(code **)(**(long **)(this + 0x338) + 0x98))(*(long **)(this + 0x338),&local_70);
  (**(code **)(**(long **)(this + 0x338) + 0x60))(0x3fc00000);
  (**(code **)(**(long **)(this + 0x380) + 0x208))
            (*(long **)(this + 0x380),*(undefined8 *)(this + 0x338));
  plVar6 = (long *)AtlasMgr::GetImg("stage/grass.png");
  *(long **)(this + 0x340) = plVar6;
  local_68 = 0x3f80000000000000;
  (**(code **)(*plVar6 + 0x148))(plVar6,&local_68);
  local_6c = local_5c + fVar1;
  local_70 = 0x43960000;
  (**(code **)(**(long **)(this + 0x340) + 0x98))(*(long **)(this + 0x340),&local_70);
  (**(code **)(**(long **)(this + 0x340) + 0x60))(0x3fc00000);
  (**(code **)(**(long **)(this + 0x380) + 0x208))
            (*(long **)(this + 0x380),*(undefined8 *)(this + 0x340));
  plVar6 = (long *)AtlasMgr::GetImg("stage/grass.png");
  *(long **)(this + 0x348) = plVar6;
  local_68 = 0x3f80000000000000;
  (**(code **)(*plVar6 + 0x148))(plVar6,&local_68);
  local_6c = local_5c + fVar1;
  local_70 = 0x44160000;
  (**(code **)(**(long **)(this + 0x348) + 0x98))(*(long **)(this + 0x348),&local_70);
  (**(code **)(**(long **)(this + 0x348) + 0x60))(0x3fc00000);
  (**(code **)(**(long **)(this + 0x380) + 0x208))
            (*(long **)(this + 0x380),*(undefined8 *)(this + 0x348));
  plVar6 = (long *)AtlasMgr::GetImg("stage/grass.png");
  *(long **)(this + 0x350) = plVar6;
  local_68 = 0x3f80000000000000;
  (**(code **)(*plVar6 + 0x148))(plVar6,&local_68);
  local_6c = local_5c + fVar1;
  local_70 = 0x44610000;
  (**(code **)(**(long **)(this + 0x350) + 0x98))(*(long **)(this + 0x350),&local_70);
  (**(code **)(**(long **)(this + 0x350) + 0x60))(0x3fc00000);
  (**(code **)(**(long **)(this + 0x380) + 0x208))
            (*(long **)(this + 0x380),*(undefined8 *)(this + 0x350));
                    /* try { // try from 004dd384 to 004dd473 has its CatchHandler @ 004dd518 */
  this_01 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
  (**(code **)(*(long *)this_01 + 0x270))(this_01);
  (**(code **)(*(long *)this + 0x208))(this,this_01);
  (**(code **)(*(long *)this + 0x208))(this,*(undefined8 *)(this_01 + 0x4378));
  User::Ready(this_01,true);
  plVar6 = (long *)AtlasMgr::GetImg("stage/chr_round.png");
  *(long **)(this + 800) = plVar6;
  (**(code **)(*plVar6 + 0x170))(plVar6,0);
  (**(code **)(**(long **)(this + 0x380) + 0x210))
            (*(long **)(this + 0x380),*(undefined8 *)(this + 800),1);
  if (*(char *)(*(long *)(this_01 + 0x4378) + 0x328) != '\0') {
    this_01[0x438c] = (User)0x1;
  }
  local_78 = this_01;
  if (*(undefined8 **)(this + 0x360) < *(undefined8 **)(this + 0x368)) {
    **(undefined8 **)(this + 0x360) = this_01;
    *(long *)(this + 0x360) = *(long *)(this + 0x360) + 8;
  }
  else {
    std::__ndk1::vector<Character*,std::__ndk1::allocator<Character*>>::
    __push_back_slow_path<Character*>
              ((vector<Character*,std::__ndk1::allocator<Character*>> *)(this + 0x358),
               (Character **)&local_78);
  }
  uVar10 = (**(code **)(*(long *)this_01 + 0xe0))(this_01);
  *(undefined4 *)(this + 0x3bc) = uVar10;
  pSVar7 = operator_new(0x530);
                    /* try { // try from 004dd474 to 004dd493 has its CatchHandler @ 004dd598 */
  puVar8 = (uint3 *)GetColor(4);
  SquareBox::SquareBox(pSVar7,(ulong)*puVar8,100);
  *(SquareBox **)(this + 0x3c8) = pSVar7;
                    /* try { // try from 004dd4a0 to 004dd4ef has its CatchHandler @ 004dd518 */
  (**(code **)(*(long *)pSVar7 + 0x90))(DAT_009c46e8,DAT_009c46ec,pSVar7);
  (**(code **)(**(long **)(this + 0x3c8) + 200))(DAT_009c3d68,DAT_009c4ba8);
  (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x3c8),1000);
  if (lVar9 != local_58) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: OpenPortal
ADDRESS: 004dd7e8
========================================

/* Stage::OpenPortal(float) */

void __thiscall Stage::OpenPortal(Stage *this,float param_1)

{
  int iVar1;
  long *plVar2;
  Director *this_00;
  long lVar3;
  long *plVar4;
  long lVar5;
  code *pcVar6;
  float fVar7;
  undefined4 in_register_00005004;
  ulong uVar8;
  undefined8 local_50;
  long local_48;
  
  uVar8 = CONCAT44(in_register_00005004,param_1);
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar5;
  if (*(long *)(this + 1000) == 0) {
    plVar2 = (long *)AtlasMgr::GetImg("effect/portal.png");
    *(long **)(this + 1000) = plVar2;
    local_50 = 0x3ecccccd3f000000;
    (**(code **)(*plVar2 + 0x148))(plVar2,&local_50);
    if (param_1 == 0.0) {
      plVar2 = (long *)User::Ins(PTR_g_Common_00c44818[0x72]);
      fVar7 = (float)(**(code **)(*plVar2 + 0xe0))();
      uVar8 = (ulong)(uint)(fVar7 + DAT_009c3d64);
    }
    plVar2 = *(long **)(this + 1000);
    pcVar6 = *(code **)(*plVar2 + 200);
    if (((*PTR_g_MaxY_00c418f8 & 1) == 0) &&
       (iVar1 = __cxa_guard_acquire(PTR_g_MaxY_00c418f8), iVar1 != 0)) {
                    /* try { // try from 004dd8b0 to 004dd8b7 has its CatchHandler @ 004dd978 */
      this_00 = (Director *)cocos2d::Director::getInstance();
      lVar3 = cocos2d::Director::getWinSize(this_00);
      *(float *)PTR_g_MaxY_00c41e38 = *(float *)(lVar3 + 4) + DAT_009c3d48;
      __cxa_guard_release(PTR_g_MaxY_00c418f8);
    }
    (*pcVar6)(uVar8,*(undefined4 *)PTR_g_MaxY_00c41e38,plVar2);
    (**(code **)(**(long **)(this + 1000) + 0x80))(0);
    plVar4 = *(long **)(this + 0x380);
    plVar2 = *(long **)(this + 1000);
    pcVar6 = *(code **)(*plVar4 + 0x210);
    fVar7 = (float)(**(code **)(*plVar2 + 0xf0))(plVar2);
    (*pcVar6)(plVar4,plVar2,(int)(DAT_009c4888 - fVar7));
    SndMgr::PlayEffect(0x10);
  }
  if (lVar5 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: AtlasMgr::GetImg
###########################################################################

========================================
FUNCTION: FUN_004e033c
ADDRESS: 004e033c
========================================

void FUN_004e033c(float param_1,_func_void_float *param_2)

{
  int iVar1;
  long *plVar2;
  long lVar3;
  float fVar4;
  char *local_60 [4];
  char *local_40;
  long local_38;
  
  lVar3 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar3;
  local_60[1] = "skill/rage.png";
  local_60[0] = "skill/revival.png";
  local_60[3] = "skill/rage_all.png";
  local_60[2] = "skill/confuse.png";
  local_40 = "skill/avatar.png";
  fVar4 = *(float *)(param_2 + 0x324);
  if (fVar4 == 0.0) {
    if (*(long **)(param_2 + 0x330) != (long *)0x0) {
      (**(code **)(**(long **)(param_2 + 0x330) + 0x270))();
    }
    plVar2 = (long *)AtlasMgr::GetImg(local_60[*(int *)(param_2 + 0x328)]);
    *(long **)(param_2 + 0x330) = plVar2;
    (**(code **)(*plVar2 + 0x80))(0);
    (**(code **)(*(long *)param_2 + 0x208))(param_2,*(undefined8 *)(param_2 + 0x330));
    fVar4 = *(float *)(param_2 + 0x324);
  }
  *(float *)(param_2 + 0x324) = fVar4 + param_1;
  (**(code **)(**(long **)(param_2 + 0x330) + 0xd8))((fVar4 + param_1) * *(float *)(param_2 + 800));
  fVar4 = *(float *)(param_2 + 0x324);
  if (0.5 < fVar4) {
    fVar4 = 1.0 - fVar4;
  }
  (**(code **)(**(long **)(param_2 + 0x330) + 0x80))(fVar4 + fVar4);
  if (1.0 <= *(float *)(param_2 + 0x324)) {
    iVar1 = *(int *)(param_2 + 0x328);
    *(undefined4 *)(param_2 + 0x324) = 0;
    *(int *)(param_2 + 0x328) = iVar1 + 1;
    if (iVar1 + 1 == 5) {
      cocos2d::Node::unschedule(param_2);
      (**(code **)(*(long *)param_2 + 0x270))(param_2);
    }
  }
  if (lVar3 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: MakeLabel
###########################################################################

========================================
FUNCTION: MakeLabel
ADDRESS: 0040a6c0
========================================

void MakeLabel(char *param_1,int param_2,Vec2 *param_3,float param_4)

{
  (*(code *)PTR_MakeLabel_00c32a48)(param_1,param_2);
  return;
}


###########################################################################
# SEARCH TARGET: MakeLabel
###########################################################################

========================================
FUNCTION: MakeLabel
ADDRESS: 004195b0
========================================

void MakeLabel(void)

{
  (*(code *)PTR_MakeLabel_00c3a1c0)();
  return;
}


###########################################################################
# SEARCH TARGET: MakeLabel
###########################################################################

========================================
FUNCTION: MakeLabel
ADDRESS: 004d163c
========================================

/* MakeLabel(char const*, int, cocos2d::Vec2 const&, float) */

Label * MakeLabel(char *param_1,int param_2,Vec2 *param_3,float param_4)

{
  int iVar1;
  size_t sVar2;
  Label *this;
  char *__s;
  void *pvVar3;
  ulong uVar4;
  long lVar5;
  ulong local_98;
  size_t local_90;
  void *local_88;
  ulong local_80;
  size_t local_78;
  void *local_70;
  long local_68;
  
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  iVar1 = *(int *)(PTR_g_Settings_00c440f0 + 8);
  if (iVar1 == 1) {
    __s = "font/korean.ttf";
  }
  else if (iVar1 == 10) {
    __s = "font/china_t.ttf";
    param_4 = param_4 + (float)param_2 * DAT_009c55a8;
  }
  else if (iVar1 == 5) {
    __s = "font/japan.ttf";
    param_4 = param_4 + (float)param_2 * DAT_00a1916c;
  }
  else {
    param_2 = param_2 + -1;
    param_4 = param_4 + (float)param_2 * DAT_00a19170;
    __s = "font/font.ttf";
  }
  local_78 = 0;
  local_70 = (void *)0x0;
  local_80 = 0;
  local_68 = lVar5;
  sVar2 = strlen(param_1);
  if (0xffffffffffffffef < sVar2) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (sVar2 < 0x17) {
    pvVar3 = (void *)((ulong)&local_80 | 1);
    local_80 = CONCAT71(local_80._1_7_,(char)(sVar2 << 1));
    if (sVar2 != 0) goto LAB_004d1768;
  }
  else {
    uVar4 = sVar2 + 0x10 & 0xfffffffffffffff0;
    pvVar3 = operator_new(uVar4);
    local_80 = uVar4 | 1;
    local_78 = sVar2;
    local_70 = pvVar3;
LAB_004d1768:
    memcpy(pvVar3,param_1,sVar2);
  }
  *(undefined1 *)((long)pvVar3 + sVar2) = 0;
  local_90 = 0;
  local_88 = (void *)0x0;
  local_98 = 0;
  sVar2 = strlen(__s);
  if (0xffffffffffffffef < sVar2) {
                    /* try { // try from 004d1890 to 004d1897 has its CatchHandler @ 004d189c */
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (sVar2 < 0x17) {
    pvVar3 = (void *)((ulong)&local_98 | 1);
    local_98 = CONCAT71(local_98._1_7_,(char)(sVar2 << 1));
    if (sVar2 == 0) goto LAB_004d17e8;
  }
  else {
    uVar4 = sVar2 + 0x10 & 0xfffffffffffffff0;
                    /* try { // try from 004d17c0 to 004d17cb has its CatchHandler @ 004d189c */
    pvVar3 = operator_new(uVar4);
    local_98 = uVar4 | 1;
    local_90 = sVar2;
    local_88 = pvVar3;
  }
  memcpy(pvVar3,__s,sVar2);
LAB_004d17e8:
  *(undefined1 *)((long)pvVar3 + sVar2) = 0;
                    /* try { // try from 004d17f0 to 004d180f has its CatchHandler @ 004d18a4 */
  this = (Label *)cocos2d::Label::createWithTTF
                            ((float)param_2,&local_80,&local_98,PTR_ZERO_00c427b0,0,0);
  if ((local_98 & 1) != 0) {
    operator_delete(local_88);
  }
  if ((local_80 & 1) != 0) {
    operator_delete(local_70);
  }
  if (param_4 != 0.0) {
    cocos2d::Label::setLineSpacing(this,param_4);
  }
  (**(code **)(*(long *)this + 0x98))(this,param_3);
  if (lVar5 != local_68) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return this;
}


###########################################################################
# SEARCH TARGET: MakeLabel
###########################################################################

========================================
FUNCTION: MakeLabel
ADDRESS: 004d18d4
========================================

/* MakeLabel(MsgType, int, int, cocos2d::Vec2 const&, float) */

void MakeLabel(float param_1,undefined8 param_2,undefined8 param_3,int param_4,Vec2 *param_5)

{
  char *pcVar1;
  
  pcVar1 = (char *)GameMsg::Get();
  MakeLabel(pcVar1,param_4,param_5,param_1);
  return;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 0041a3f0
========================================

void __thiscall cocos2d::Node::getColor(Node *this)

{
  (*(code *)PTR_getColor_00c3a8e0)();
  return;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: GetColor
ADDRESS: 00420770
========================================

void GetColor(void)

{
  (*(code *)PTR_GetColor_00c3daa0)();
  return;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 00422c60
========================================

void __thiscall cocos2d::NavMeshDebugDraw::getColor(NavMeshDebugDraw *this,uint param_1)

{
  (*(code *)PTR_getColor_00c3ed18)(this,param_1);
  return;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: GetColor
ADDRESS: 0044ab94
========================================

/* GetColor(Color) */

undefined * GetColor(int param_1)

{
  undefined *puVar1;
  int iVar2;
  
  if (((*PTR_colors_00c42ca8 & 1) == 0) &&
     (iVar2 = __cxa_guard_acquire(PTR_colors_00c42ca8), puVar1 = PTR_colors_00c44200, iVar2 != 0)) {
                    /* try { // try from 0044abc8 to 0044ad37 has its CatchHandler @ 0044ad64 */
    cocos2d::Color3B::Color3B((Color3B *)PTR_colors_00c44200,'\0',0x96,'\0');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 3),0xaa,'\0','\0');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 6),0xff,0xff,'\0');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 9),'\0','\0',0xaa);
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0xc),'\x1e','\x1e','\x1e');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0xf),'2','2','2');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x12),'P',0xff,'P');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x15),'2','x',0xff);
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x18),'d','d','d');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x1b),'P','P',0xff);
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x1e),200,200,'P');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x21),0xff,200,'d');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x24),'x','x','x');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x27),200,200,0xff);
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x2a),0xff,'\0','\0');
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x2d),0xaa,0xaa,0xaa);
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x30),0xff,0xff,0xff);
    cocos2d::Color3B::Color3B((Color3B *)(puVar1 + 0x33),'\0','\0','\0');
    __cxa_guard_release(PTR_colors_00c42ca8);
  }
  return PTR_colors_00c44200 + (long)param_1 + (long)param_1 * 2;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 00574e70
========================================

/* cocos2d::__LayerRGBA::getColor() const */

void __thiscall cocos2d::__LayerRGBA::getColor(__LayerRGBA *this)

{
  Node::getColor((Node *)this);
  return;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 00574ef0
========================================

/* non-virtual thunk to cocos2d::__LayerRGBA::getColor() const */

void __thiscall cocos2d::__LayerRGBA::getColor(__LayerRGBA *this)

{
  Node::getColor((Node *)(this + -800));
  return;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 00580ea8
========================================

/* cocos2d::Node::getColor() const */

Node * __thiscall cocos2d::Node::getColor(Node *this)

{
  return this + 0x21d;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 005814f4
========================================

/* cocos2d::__NodeRGBA::getColor() const */

__NodeRGBA * __thiscall cocos2d::__NodeRGBA::getColor(__NodeRGBA *this)

{
  return this + 0x21d;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 0058169c
========================================

/* non-virtual thunk to cocos2d::__NodeRGBA::getColor() const */

__NodeRGBA * __thiscall cocos2d::__NodeRGBA::getColor(__NodeRGBA *this)

{
  return this + -0xdb;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 0064e658
========================================

/* cocos2d::NavMeshDebugDraw::getColor(unsigned int) */

void __thiscall cocos2d::NavMeshDebugDraw::getColor(NavMeshDebugDraw *this,uint param_1)

{
  uint uVar1;
  Vec4 *in_x8;
  long lVar2;
  Vec4 aVStack_38 [16];
  long local_28;
  
  uVar1 = (uint)this;
  lVar2 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_28 = lVar2;
  Vec4::Vec4(aVStack_38,(float)(uVar1 & 0xff),(float)(uVar1 >> 8 & 0xff),
             (float)(uVar1 >> 0x10 & 0xff),(float)(uVar1 >> 0x18));
                    /* try { // try from 0064e6a4 to 0064e6af has its CatchHandler @ 0064e6e4 */
  Vec4::Vec4(in_x8,aVStack_38);
                    /* try { // try from 0064e6b0 to 0064e6bf has its CatchHandler @ 0064e6ec */
  Vec4::scale(in_x8,DAT_00a487fc);
  Vec4::~Vec4(aVStack_38);
  if (lVar2 != local_28) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: GetColor
###########################################################################

========================================
FUNCTION: getColor
ADDRESS: 00681524
========================================

/* cocos2d::AtlasNode::getColor() const */

AtlasNode * __thiscall cocos2d::AtlasNode::getColor(AtlasNode *this)

{
  AtlasNode *pAVar1;
  
  if (this[800] == (AtlasNode)0x0) {
    pAVar1 = (AtlasNode *)Node::getColor((Node *)this);
    return pAVar1;
  }
  return this + 0x310;
}


###########################################################################
# SEARCH TARGET: UserData::Init
###########################################################################

========================================
FUNCTION: Init
ADDRESS: 0041d6a0
========================================

void __thiscall UserData::Init(UserData *this)

{
  (*(code *)PTR_Init_00c3c238)();
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Init
###########################################################################

========================================
FUNCTION: Init
ADDRESS: 004e8460
========================================

/* UserData::Init() */

void __thiscall UserData::Init(UserData *this)

{
  undefined *puVar1;
  long lVar2;
  undefined8 local_60;
  undefined8 local_58;
  undefined8 local_50;
  long local_48;
  
  lVar2 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar2;
  HardcoreData::Init((HardcoreData *)PTR_g_Hard_00c41970);
  puVar1 = PTR_g_InvenEquip_00c42e20;
  local_50 = 0x4370000042480000;
  Inventory::Init((Inventory *)PTR_g_InvenEquip_00c42e20,4,7,1,&local_50);
  cocos2d::Ref::retain((Ref *)puVar1);
  puVar1 = PTR_g_InvenNormal_00c43f08;
  local_58 = 0x4234000044090000;
  Inventory::Init((Inventory *)PTR_g_InvenNormal_00c43f08,0,4,4,&local_58);
  cocos2d::Ref::retain((Ref *)puVar1);
  puVar1 = PTR_g_InvenRune_00c41fe8;
  Inventory::Init((Inventory *)PTR_g_InvenRune_00c41fe8,1,4,4,&local_58);
  cocos2d::Ref::retain((Ref *)puVar1);
  puVar1 = PTR_g_InvenSkill_00c434c8;
  local_58 = CONCAT44(0x43b90000,(undefined4)local_58);
  Inventory::Init((Inventory *)PTR_g_InvenSkill_00c434c8,2,4,1,&local_58);
  cocos2d::Ref::retain((Ref *)puVar1);
  Reset(this);
  Load(this);
  puVar1 = PTR_g_InvenEquip_Temp_00c43f30;
  local_60 = 0x4370000042480000;
  Inventory::Init((Inventory *)PTR_g_InvenEquip_Temp_00c43f30,4,7,1,&local_60);
  cocos2d::Ref::retain((Ref *)puVar1);
  *PTR_g_Common_00c44818 = 1;
  if (lVar2 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Load
###########################################################################

========================================
FUNCTION: Load
ADDRESS: 0041b570
========================================

void __thiscall UserData::Load(UserData *this)

{
  (*(code *)PTR_Load_00c3b1a0)();
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Load
###########################################################################

========================================
FUNCTION: Load
ADDRESS: 004e67c0
========================================

/* UserData::Load() */

void __thiscall UserData::Load(UserData *this)

{
  bool bVar1;
  bool bVar2;
  undefined *this_00;
  uint uVar3;
  int iVar4;
  int iVar5;
  long *plVar6;
  uchar *puVar7;
  ulong uVar8;
  char *pcVar9;
  ulong uVar10;
  code *pcVar11;
  byte local_128 [16];
  void *local_118;
  Data aDStack_110 [16];
  byte local_100 [16];
  void *local_f0;
  byte local_e8 [16];
  void *local_d8;
  Data aDStack_d0 [16];
  byte local_c0 [16];
  void *local_b0;
  __ndk1 local_a8 [16];
  void *local_98;
  undefined8 local_90;
  undefined8 uStack_88;
  undefined4 local_80;
  undefined8 local_78;
  undefined4 local_70;
  long local_68;
  
  local_68 = *(long *)PTR___stack_chk_guard_00c419a0;
  plVar6 = (long *)cocos2d::FileUtils::getInstance();
  (**(code **)(*plVar6 + 0xa0))(local_a8);
  this_00 = PTR_g_HideStr_00c42a40;
  bVar2 = false;
  iVar5 = 0;
  uVar10 = 2;
  do {
    pcVar9 = (char *)0x41;
    local_70 = 0;
    local_78 = 0;
    CHidingString::MakeStr
              ((CHidingString *)this_00,(char *)&local_78,0x41,0x29,0x35,0xd,uVar10,0x42,0x37,0x3d,
               0x17,10);
                    /* try { // try from 004e6868 to 004e6887 has its CatchHandler @ 004e6be0 */
    plVar6 = (long *)cocos2d::FileUtils::getInstance();
    pcVar11 = *(code **)(*plVar6 + 0x128);
    std::__ndk1::operator+(local_a8,(basic_string *)&local_78,pcVar9);
                    /* try { // try from 004e6888 to 004e6897 has its CatchHandler @ 004e6bf8 */
    uVar3 = (*pcVar11)(plVar6,local_c0);
    if ((local_c0[0] & 1) != 0) {
      operator_delete(local_b0);
    }
    if ((uVar3 & 1) != 0) {
                    /* try { // try from 004e68b0 to 004e68cf has its CatchHandler @ 004e6be0 */
      plVar6 = (long *)cocos2d::FileUtils::getInstance();
      pcVar11 = *(code **)(*plVar6 + 0x28);
      std::__ndk1::operator+(local_a8,(basic_string *)&local_78,pcVar9);
                    /* try { // try from 004e68d0 to 004e68df has its CatchHandler @ 004e6c10 */
      (*pcVar11)(aDStack_d0,plVar6,local_e8);
      if ((local_e8[0] & 1) != 0) {
        operator_delete(local_d8);
      }
                    /* try { // try from 004e68f0 to 004e69c7 has its CatchHandler @ 004e6be8 */
      puVar7 = (uchar *)cocos2d::Data::getBytes(aDStack_d0);
      uVar3 = cocos2d::Data::isNull(aDStack_d0);
      if ((uVar3 & 1) == 0) {
        iVar4 = cocos2d::Data::getSize(aDStack_d0);
        uVar8 = LoadFromData(this,puVar7,iVar4,false);
        if ((uVar8 & 1) == 0) {
          bVar1 = true;
        }
        else if (*(uint *)(this + 0x78) ==
                 (*(int *)(this + 0x74) + *(int *)(this + 0x70) ^ 0x3edd3b2dU)) {
          if (*(int *)(this + 0x74) == *(int *)(this + 0x70)) goto LAB_004e6978;
LAB_004e69a8:
          bVar1 = false;
          bVar2 = true;
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
LAB_004e6978:
          if (*(uint *)(this + 0xc) == (*(int *)(this + 8) + *(int *)(this + 4) ^ 0x3edd3b2dU)) {
            if (*(int *)(this + 8) != *(int *)(this + 4)) goto LAB_004e69a8;
            bVar1 = true;
          }
          else {
            SafeVarMgr::Get();
            SafeVarMgr::BanHack();
            bVar1 = true;
          }
        }
      }
      else {
        bVar1 = true;
      }
      cocos2d::Data::~Data(aDStack_d0);
      if (!bVar1) break;
    }
    iVar5 = iVar5 + 1;
    uVar10 = (ulong)((int)uVar10 - 1);
  } while (iVar5 < 2);
  if (bVar2) {
LAB_004e6b30:
    if (*(uint *)(this + 0xb4) == (*(int *)(this + 0xb0) + *(int *)(this + 0xac) ^ 0x3edd3b2dU)) {
      if (*(int *)(this + 0xb0) != *(int *)(this + 0xac)) {
                    /* try { // try from 004e6b58 to 004e6b97 has its CatchHandler @ 004e6c28 */
        EquipInven::ShowExpendSlot(SUB81(PTR_g_InvenNormal_00c43f08,0));
        EquipInven::ShowExpendSlot(SUB81(PTR_g_HardInvN_00c41a58,0));
      }
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
  }
  else {
    local_80 = 0;
    local_90 = 0;
    uStack_88 = 0;
    pcVar9 = (char *)0x41;
    CHidingString::MakeStr
              ((CHidingString *)PTR_g_HideStr_00c42a40,(char *)&local_90,0x41,0x3b,0x3d,0x39,0x29,
               0x15,0x1f,0x42,0x37,0x3d,0x17,10);
                    /* try { // try from 004e6a54 to 004e6a73 has its CatchHandler @ 004e6c28 */
    plVar6 = (long *)cocos2d::FileUtils::getInstance();
    pcVar11 = *(code **)(*plVar6 + 0x128);
    std::__ndk1::operator+(local_a8,(basic_string *)&local_90,pcVar9);
                    /* try { // try from 004e6a74 to 004e6a83 has its CatchHandler @ 004e6c54 */
    uVar10 = (*pcVar11)(plVar6,local_100);
    if ((local_100[0] & 1) != 0) {
      operator_delete(local_f0);
    }
    if ((uVar10 & 1) != 0) {
                    /* try { // try from 004e6a98 to 004e6ab7 has its CatchHandler @ 004e6c28 */
      plVar6 = (long *)cocos2d::FileUtils::getInstance();
      pcVar11 = *(code **)(*plVar6 + 0x28);
      std::__ndk1::operator+(local_a8,(basic_string *)&local_90,pcVar9);
                    /* try { // try from 004e6ab8 to 004e6ac7 has its CatchHandler @ 004e6c6c */
      (*pcVar11)(aDStack_110,plVar6,local_128);
      if ((local_128[0] & 1) != 0) {
        operator_delete(local_118);
      }
                    /* try { // try from 004e6ad8 to 004e6b1f has its CatchHandler @ 004e6c48 */
      puVar7 = (uchar *)cocos2d::Data::getBytes(aDStack_110);
      uVar3 = cocos2d::Data::isNull(aDStack_110);
      if ((uVar3 & 1) == 0) {
        iVar5 = cocos2d::Data::getSize(aDStack_110);
        uVar3 = LoadFromData(this,puVar7,iVar5,false);
        cocos2d::Data::~Data(aDStack_110);
        if ((uVar3 & 1) != 0) goto LAB_004e6b30;
      }
      else {
        cocos2d::Data::~Data(aDStack_110);
      }
    }
    Reset(this);
  }
  if (((byte)local_a8[0] & 1) != 0) {
    operator_delete(local_98);
  }
  if (*(long *)PTR___stack_chk_guard_00c419a0 != local_68) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Save
###########################################################################

========================================
FUNCTION: Save
ADDRESS: 0041b160
========================================

void __thiscall UserData::Save(UserData *this,bool param_1)

{
  (*(code *)PTR_Save_00c3af98)(this,param_1);
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Save
###########################################################################

========================================
FUNCTION: SaveCheck
ADDRESS: 004565b8
========================================

/* CommonSystem::SaveCheck() */

void CommonSystem::SaveCheck(void)

{
  undefined *this;
  
  this = PTR_g_UserData_00c41478;
  if (*(float *)PTR_m_lazy_save_00c40b00 == 0.0) {
    return;
  }
  *(undefined4 *)PTR_m_lazy_save_00c40b00 = 0;
  UserData::Save((UserData *)this,false);
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Save
###########################################################################

========================================
FUNCTION: QuickSave
ADDRESS: 004565e4
========================================

/* CommonSystem::QuickSave() */

void CommonSystem::QuickSave(void)

{
  undefined *this;
  
  this = PTR_g_UserData_00c41478;
  *(undefined4 *)PTR_m_lazy_save_00c40b00 = 0;
  UserData::Save((UserData *)this,false);
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Save
###########################################################################

========================================
FUNCTION: FrameMove
ADDRESS: 004567ac
========================================

/* CommonSystem::FrameMove(float) */

void CommonSystem::FrameMove(float param_1)

{
  char cVar1;
  undefined *puVar2;
  undefined *puVar3;
  undefined *puVar4;
  undefined *puVar5;
  uint uVar6;
  int iVar7;
  int iVar8;
  char *pcVar9;
  ulong uVar10;
  long *plVar11;
  Director *this;
  code *pcVar12;
  uint uVar13;
  float fVar14;
  float fVar15;
  
  puVar3 = PTR_g_Common_00c44818;
  if (*(int *)(PTR_g_Common_00c44818 + 0x34) == 3) {
    pcVar9 = (char *)GameMsg::Get(0x3e,4);
    fVar14 = (float)MsgBox::Show(*(MsgBox **)PTR_m_sysmsg_00c44f48,pcVar9,1);
    *PTR_m_need_skip_00c43f58 = 0;
    *(float *)PTR_m_skip_wait_00c42660 = fVar14 / 3.0;
    SndMgr::PlayEffect(0x15);
    *(undefined4 *)(puVar3 + 0x34) = 0;
  }
  if (*(int *)PTR_m_cur_bgm_00c436f8 == 1) {
    fVar14 = (float)cocos2d::experimental::AudioEngine::getCurrentTime(DAT_00c67130);
    if (fVar14 == DAT_00c67134) {
      fVar14 = *(float *)PTR_m_bgm_time_00c41ee0 + param_1;
    }
    else {
      DAT_00c67134 = fVar14;
    }
    *(float *)PTR_m_bgm_time_00c41ee0 = fVar14;
  }
  DAT_00c45024 = DAT_00c45024 + param_1;
  if (1.0 <= DAT_00c45024) {
    DAT_00c45024 = DAT_00c45024 + -1.0;
    uVar6 = rand();
    srand(uVar6);
    uVar6 = UnityAdsIsInitialized();
    if ((uVar6 & 1) == 0) {
      UnityAdsInit("1300079",0);
    }
    *(int *)PTR_g_UserData_00c41478 = *(int *)PTR_g_UserData_00c41478 + 1;
    InAppPurchase::InitCheck((InAppPurchase *)PTR_g_IAP_00c42088);
  }
  *(float *)(puVar3 + 0x20) = param_1;
  SafeVarMgr::Get();
  SafeVarMgr::ChangeKeys((SafeVarMgr *)PTR_ins_00c43690);
  if (((*PTR_ins_00c40c88 & 1) == 0) &&
     (iVar7 = __cxa_guard_acquire(PTR_ins_00c40c88), puVar2 = PTR_ins_00c40c90, iVar7 != 0)) {
    *(undefined8 *)(PTR_ins_00c40c90 + 0x28) = 0;
    *(undefined4 *)(puVar2 + 0x34) = 0;
    *(undefined2 *)(puVar2 + 0x38) = 0;
    *(undefined2 *)(puVar2 + 4) = 0;
    *(undefined4 *)puVar2 = 0;
    *(undefined4 *)(puVar2 + 0x20) = 0;
    *(undefined8 *)(puVar2 + 0x10) = 0;
    *(undefined8 *)(puVar2 + 0x18) = 0;
    *(undefined8 *)(puVar2 + 8) = 0;
    __cxa_atexit(PTR__PlayService_00c40a30,puVar2,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_ins_00c40c88);
  }
  PlayService::FrameMove(param_1);
  if (-1 < *(int *)(puVar3 + 0x54)) {
    pcVar9 = (char *)GameMsg::Get(0x3e);
    fVar14 = (float)MsgBox::Show(*(MsgBox **)PTR_m_sysmsg_00c44f48,pcVar9,1);
    *PTR_m_need_skip_00c43f58 = 0;
    *(float *)PTR_m_skip_wait_00c42660 = fVar14 / 3.0;
    SndMgr::PlayEffect(0x15);
    *(undefined4 *)(puVar3 + 0x54) = 0xffffffff;
  }
  uVar6 = (uint)*(undefined8 *)(puVar3 + 0x38);
  uVar13 = (uint)((ulong)*(undefined8 *)(puVar3 + 0x38) >> 0x20);
  if (*(uint *)(puVar3 + 0x40) == (uVar13 + uVar6 ^ 0x3edd3b2d)) {
    if ((uVar13 ^ uVar6) == 1) {
      iVar7 = rand();
      *(int *)(puVar3 + 0x38) = iVar7;
      *(int *)(puVar3 + 0x3c) = iVar7;
      *(uint *)(puVar3 + 0x40) = iVar7 << 1 ^ 0x3edd3b2d;
      RewardAD();
    }
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
  }
  if (*(uint *)(puVar3 + 0x4c) == (*(uint *)(puVar3 + 0x48) + *(uint *)(puVar3 + 0x44) ^ 0x3edd3b2d)
     ) {
    if ((*(uint *)(puVar3 + 0x48) ^ *(uint *)(puVar3 + 0x44)) == 1) {
      iVar7 = rand();
      *(int *)(puVar3 + 0x44) = iVar7;
      *(int *)(puVar3 + 0x48) = iVar7;
      *(uint *)(puVar3 + 0x4c) = iVar7 << 1 ^ 0x3edd3b2d;
      InAppPurchase::CheckPurchase((InAppPurchase *)PTR_g_IAP_00c42088);
    }
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
  }
  puVar2 = PTR_m_wait_sprite_00c41ff0;
  cVar1 = puVar3[0x30];
  uVar10 = (**(code **)(**(long **)PTR_m_wait_sprite_00c41ff0 + 0x178))();
  puVar5 = PTR_m_fade_sprite_00c425c8;
  if (cVar1 == '\0') {
    if ((uVar10 & 1) != 0) {
      Effect::EffectBase::SetSchedule(*(EffectBase **)puVar2,false);
      (**(code **)(**(long **)PTR_m_fade_sprite_00c425c8 + 0x170))
                (*(long **)PTR_m_fade_sprite_00c425c8,0);
    }
  }
  else if ((uVar10 & 1) == 0) {
    (**(code **)(**(long **)PTR_m_fade_sprite_00c425c8 + 0x170))
              (*(long **)PTR_m_fade_sprite_00c425c8,1);
    (**(code **)(**(long **)puVar5 + 0x490))(*(long **)puVar5,0x96);
    Effect::Wait::Run(*(Wait **)puVar2);
  }
  puVar2 = PTR_m_marker_00c448d0;
  uVar10 = (**(code **)(**(long **)PTR_m_marker_00c448d0 + 0x178))();
  fVar14 = DAT_009c48b4;
  if ((uVar10 & 1) != 0) {
    plVar11 = *(long **)puVar2;
    fVar15 = *(float *)PTR_m_marker_time_00c43c40 - param_1;
    if (fVar15 <= 0.0) {
      fVar15 = 1.0;
    }
    *(float *)PTR_m_marker_time_00c43c40 = fVar15;
    (**(code **)(*plVar11 + 0x490))(plVar11,(int)(fVar15 * fVar14));
  }
  puVar2 = PTR_m_lazy_save_00c40b00;
  if ((*(float *)PTR_m_lazy_save_00c40b00 != 0.0) &&
     (fVar14 = *(float *)PTR_m_lazy_save_00c40b00 - param_1,
     *(float *)PTR_m_lazy_save_00c40b00 = fVar14, fVar14 <= 0.0)) {
    *(undefined4 *)puVar2 = 0;
    UserData::Save((UserData *)PTR_g_UserData_00c41478,false);
  }
  puVar2 = PTR_play_check_00c44178;
  fVar14 = DAT_009c4894;
  *(undefined8 *)(PTR_play_check_00c44178 + 0x16) = 0;
  *(undefined8 *)(puVar2 + 0x10) = 0;
  DAT_00c66df0 = DAT_00c66df0 + param_1;
  *(undefined8 *)(puVar2 + 8) = 0;
  *(undefined8 *)puVar2 = 0;
  if (fVar14 < DAT_00c66df0) {
    DAT_00c66df0 = 0.0;
    iVar7 = rand();
    iVar8 = rand();
    plVar11 = *(long **)PTR_m_noise_00c43fd8;
    if (plVar11 == (long *)0x0) {
      this = (Director *)cocos2d::Director::getInstance();
      cocos2d::Director::end(this);
      return;
    }
    (**(code **)(*plVar11 + 200))((float)-(iVar7 % 100),(float)-(iVar8 % 100),plVar11);
  }
  puVar5 = PTR_m_need_skip_00c43f58;
  puVar2 = PTR_m_skip_wait_00c42660;
  if ((*PTR_m_need_skip_00c43f58 == '\0') ||
     (fVar14 = *(float *)PTR_m_skip_wait_00c42660,
     *(float *)PTR_m_skip_wait_00c42660 = fVar14 - param_1, puVar4 = PTR_g_GameScene_00c41fb0,
     0.0 < fVar14 - param_1)) {
    MsgBox::FrameMove(*(MsgBox **)PTR_m_sysmsg_00c44f48,param_1);
  }
  else {
    *(undefined4 *)puVar2 = 0;
    puVar2 = PTR_m_skip_img_00c42f70;
    if (*(char *)(*(long *)puVar4 + 0x38c) != '\0') {
      *puVar5 = 0;
      plVar11 = *(long **)puVar2;
      (**(code **)(*plVar11 + 0x170))(plVar11,0);
      MsgBox::Hide(*(MsgBox **)PTR_m_sysmsg_00c44f48);
      return;
    }
    (**(code **)(**(long **)PTR_m_skip_img_00c42f70 + 0x170))(*(long **)PTR_m_skip_img_00c42f70,1);
    plVar11 = *(long **)puVar2;
    fVar15 = *(float *)PTR_m_skip_img_opacity_00c42858 - param_1 * DAT_009c48b4;
    fVar14 = DAT_009c48b4;
    if (DAT_009c4bb4 <= fVar15) {
      fVar14 = fVar15;
    }
    *(float *)PTR_m_skip_img_opacity_00c42858 = fVar14;
    (**(code **)(*plVar11 + 0x490))(plVar11,(int)fVar14);
  }
  puVar5 = PTR_m_fade_sprite_00c425c8;
  puVar2 = PTR_m_fade_time_00c41ed8;
  fVar14 = *(float *)PTR_m_fade_time_00c41ed8;
  if (fVar14 <= 0.0) {
    if (fVar14 < 0.0) {
      plVar11 = *(long **)PTR_m_fade_sprite_00c425c8;
      fVar15 = 0.0;
      if (fVar14 + param_1 < 0.0) {
        fVar15 = fVar14 + param_1;
      }
      *(float *)PTR_m_fade_time_00c41ed8 = fVar15;
      (**(code **)(*plVar11 + 0x490))(plVar11,(int)((fVar15 + 2.0) * DAT_009c4bb4));
    }
  }
  else {
    (**(code **)(**(long **)PTR_m_fade_sprite_00c425c8 + 0x490))
              (*(long **)PTR_m_fade_sprite_00c425c8,(int)(fVar14 * DAT_009c4bb4));
    fVar14 = *(float *)puVar2;
    *(float *)puVar2 = fVar14 - param_1;
    if (fVar14 - param_1 <= 0.0) {
      (**(code **)(**(long **)puVar5 + 0x170))(*(long **)puVar5,0);
      *(undefined4 *)puVar2 = 0;
    }
  }
  puVar2 = PTR_m_title_00c44998;
  uVar10 = (**(code **)(**(long **)PTR_m_title_00c44998 + 0x178))();
  if ((uVar10 & 1) != 0) {
    fVar14 = *(float *)(puVar3 + 0x1c) + *(float *)PTR_m_title_time_00c42768;
    *(float *)PTR_m_title_time_00c42768 = fVar14;
    if (fVar14 <= 1.0) {
      plVar11 = *(long **)puVar2;
      iVar7 = (int)(fVar14 * DAT_009c48b4);
      pcVar12 = *(code **)(*plVar11 + 0x490);
    }
    else if (fVar14 <= 3.0) {
      plVar11 = *(long **)puVar2;
      iVar7 = 0xff;
      pcVar12 = *(code **)(*plVar11 + 0x490);
    }
    else {
      plVar11 = *(long **)puVar2;
      if (fVar14 <= 4.0) {
        pcVar12 = *(code **)(*plVar11 + 0x490);
        iVar7 = (int)(DAT_009c48b4 - (fVar14 + -3.0) * DAT_009c48b4);
      }
      else {
        iVar7 = 0;
        pcVar12 = *(code **)(*plVar11 + 0x170);
      }
    }
    (*pcVar12)(plVar11,iVar7);
  }
  puVar2 = PTR_m_system_mini_00c42540;
  uVar10 = (**(code **)(**(long **)PTR_m_system_mini_00c42540 + 0x178))();
  puVar3 = PTR_m_system_mini_time_00c414c8;
  if (((uVar10 & 1) != 0) &&
     (fVar14 = *(float *)PTR_m_system_mini_time_00c414c8,
     *(float *)PTR_m_system_mini_time_00c414c8 = fVar14 - param_1, fVar14 - param_1 <= 0.0)) {
    plVar11 = *(long **)puVar2;
    *(undefined4 *)puVar3 = 0;
    (**(code **)(*plVar11 + 0x170))(plVar11,0);
  }
  if (*(float *)PTR_m_tip_blink_00c409d0 == 0.0) {
    return;
  }
  fVar14 = *(float *)PTR_m_tip_blink_00c409d0 - param_1;
  if (fVar14 <= 0.0) {
    fVar14 = 1.0;
  }
  plVar11 = *(long **)PTR_m_tip_00c42418;
  *(float *)PTR_m_tip_blink_00c409d0 = fVar14;
                    /* WARNING: Could not recover jumptable at 0x00456f8c. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (**(code **)(*plVar11 + 0x490))(plVar11,(int)(fVar14 * DAT_009c48b4));
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Save
###########################################################################

========================================
FUNCTION: HeroDeadScript
ADDRESS: 00460fe0
========================================

/* GameScene::HeroDeadScript() */

void __thiscall GameScene::HeroDeadScript(GameScene *this)

{
  int iVar1;
  undefined *puVar2;
  uint uVar3;
  undefined4 uVar4;
  undefined4 uVar5;
  undefined *puVar6;
  int iVar7;
  uint uVar8;
  char *pcVar9;
  undefined8 uVar10;
  SquareBox *pSVar11;
  long *plVar12;
  Size *pSVar13;
  Node *pNVar14;
  MenuItem *pMVar15;
  float *pfVar16;
  uint uVar17;
  uint uVar18;
  code *pcVar19;
  long lVar20;
  MenuItem **ppMVar21;
  long lVar22;
  float fVar23;
  float fVar24;
  undefined8 local_1f8;
  undefined8 local_1f0;
  uint3 local_1e8 [2];
  undefined *local_1e0;
  undefined *local_1d8;
  undefined8 uStack_1d0;
  GameScene *local_1c8;
  undefined **local_1c0;
  Size aSStack_1b0 [4];
  float local_1ac;
  MenuItem *local_b0 [3];
  long local_98;
  
  puVar6 = PTR_g_Common_00c44818;
  puVar2 = PTR_g_UserData_00c41478;
  lVar20 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_98 = lVar20;
  if (PTR_g_Common_00c44818[0x72] == '\0') {
    if (this[799] != (GameScene)0x0) {
      if (*(uint *)(PTR_g_UserData_00c41478 + 0x78) ==
          (*(uint *)(PTR_g_UserData_00c41478 + 0x74) + *(uint *)(PTR_g_UserData_00c41478 + 0x70) ^
          0x3edd3b2d)) {
        uVar18 = *(uint *)(PTR_g_UserData_00c41478 + 0x74) ^
                 *(uint *)(PTR_g_UserData_00c41478 + 0x70);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar18 = 0;
      }
      iVar7 = GameData::GetLevelUpExp(uVar18);
      fVar24 = (float)iVar7 * DAT_009c4894;
      *(float *)(this + 0x390) = fVar24;
      uVar17 = *(uint *)(puVar2 + 0x7c);
      uVar8 = *(uint *)(puVar2 + 0x80);
      uVar18 = uVar8 + uVar17 ^ 0x3edd3b2d;
      if (*(uint *)(puVar2 + 0x84) == uVar18) {
        fVar23 = (float)(uVar8 ^ uVar17);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        fVar24 = *(float *)(this + 0x390);
        uVar17 = *(uint *)(puVar2 + 0x7c);
        uVar8 = *(uint *)(puVar2 + 0x80);
        uVar18 = *(uint *)(puVar2 + 0x84);
        fVar23 = 0.0;
      }
      uVar3 = uVar8 + uVar17 ^ 0x3edd3b2d;
      if (fVar24 <= fVar23) {
        if (uVar18 == uVar3) {
          fVar23 = (float)(uVar8 ^ uVar17);
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          fVar23 = 0.0;
        }
        uVar8 = rand();
        uVar18 = (uint)(fVar23 - fVar24) ^ uVar8;
        *(uint *)(puVar2 + 0x7c) = uVar18;
        *(uint *)(puVar2 + 0x80) = uVar8;
        uVar18 = uVar18 + uVar8;
      }
      else {
        if (uVar18 == uVar3) {
          uVar8 = uVar8 ^ uVar17;
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar8 = 0;
        }
        *(uint *)(this + 0x390) = uVar8;
        iVar7 = rand();
        *(int *)(puVar2 + 0x7c) = iVar7;
        *(int *)(puVar2 + 0x80) = iVar7;
        uVar18 = iVar7 << 1;
      }
      *(uint *)(puVar2 + 0x84) = uVar18 ^ 0x3edd3b2d;
      UserData::Save((UserData *)puVar2,false);
      if (((*PTR_joy_00c41bc0 & 1) == 0) &&
         (iVar7 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar7 != 0)) {
                    /* try { // try from 004611f4 to 004611ff has its CatchHandler @ 00461658 */
        GameUI::GameUI((GameUI *)PTR_joy_00c42890);
        __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
        __cxa_guard_release(PTR_joy_00c41bc0);
      }
      GameUI::Show((GameUI *)PTR_joy_00c42890,false);
      if (this[0x394] == (GameScene)0x0) {
        puVar6[100] = 1;
        this[0x395] = (GameScene)0x1;
      }
      else {
        this[0x394] = (GameScene)0x0;
        uVar10 = cocos2d::Layer::create();
        *(undefined8 *)(this + 0x378) = uVar10;
        pSVar11 = operator_new(0x530);
                    /* try { // try from 00461258 to 00461283 has its CatchHandler @ 00461644 */
        cocos2d::Color3B::Color3B((Color3B *)local_1e8,'\0','\0','\0');
        SquareBox::SquareBox(pSVar11,(ulong)local_1e8[0],0x96);
        uVar4 = DAT_009c3d68;
        (**(code **)(*(long *)pSVar11 + 0x90))(DAT_009c3d68,DAT_009c3d68,pSVar11);
        (**(code **)(**(long **)(this + 0x378) + 0x210))(*(long **)(this + 0x378),pSVar11,0);
        pcVar9 = (char *)GameMsg::Get(0x3f,0);
        local_1f0 = 0x4302000000000000;
        plVar12 = (long *)MakeLabel(pcVar9,0x28,(Vec2 *)&local_1f0,0.0);
        iVar7 = 1;
        pcVar19 = *(code **)(*plVar12 + 0x4c0);
        uVar10 = GetColor(1);
        (*pcVar19)(plVar12,uVar10);
        (**(code **)(*plVar12 + 0x5a0))(plVar12,PTR_BLACK_00c44220,4);
        (**(code **)(**(long **)(this + 0x378) + 0x210))(*(long **)(this + 0x378),plVar12,1);
        uVar5 = DAT_009c58b4;
        local_b0[1] = (MenuItem *)0x0;
        local_b0[2] = (MenuItem *)0x0;
        local_b0[0] = (MenuItem *)0x0;
        lVar22 = 0;
        lVar20 = 0;
        ppMVar21 = local_b0;
        puVar2 = PTR_vtable_00c446f8 + 0x10;
        do {
          if (lVar22 == 0) {
            memset(aSStack_1b0,0,0x100);
            pcVar9 = (char *)GameMsg::Get(0x3f,iVar7);
            uVar18 = 0;
            if (*(int *)(PTR_g_UserData_00c41478 + 0x108) != 0x155c) {
              uVar18 = 0x1e;
            }
            sprintf((char *)aSStack_1b0,pcVar9,(ulong)uVar18);
            pSVar13 = aSStack_1b0;
          }
          else {
            pSVar13 = (Size *)GameMsg::Get(0x3f,iVar7);
          }
          pNVar14 = (Node *)MakeLabel((char *)pSVar13,0x19,(Vec2 *)PTR_ZERO_00c41d10,0.0);
          local_1d8 = PTR_MenuCallBack_00c411e0;
          uStack_1d0 = 0;
                    /* try { // try from 00461404 to 0046140f has its CatchHandler @ 00461604 */
          local_1e0 = puVar2;
          local_1c8 = this;
          local_1c0 = &local_1e0;
          pMVar15 = (MenuItem *)cocos2d::MenuItemLabel::create(pNVar14,(function *)&local_1e0);
          iVar1 = iVar7 + 1;
          *ppMVar21 = pMVar15;
          if (local_1c0 == &local_1e0) {
            pcVar19 = *(code **)(*local_1c0 + 0x20);
LAB_0046143c:
            (*pcVar19)();
          }
          else if (local_1c0 != (undefined **)0x0) {
            pcVar19 = *(code **)(*local_1c0 + 0x28);
            goto LAB_0046143c;
          }
          (**(code **)(*(long *)pMVar15 + 0x2c0))(pMVar15,(int)lVar20 + 0x3e9);
          (**(code **)(*(long *)pMVar15 + 0xe8))((float)(int)lVar22,pMVar15);
          iVar7 = iVar7 + 2;
          pcVar9 = (char *)GameMsg::Get(0x3f,iVar1);
          plVar12 = (long *)MakeLabel(pcVar9,0xf,(Vec2 *)PTR_ZERO_00c41d10,0.0);
          pcVar19 = *(code **)(*plVar12 + 200);
          pfVar16 = (float *)(**(code **)(*(long *)pNVar14 + 0x168))(pNVar14);
          (*pcVar19)(*pfVar16 * 0.5,0xc1200000,plVar12);
          (**(code **)(*(long *)pNVar14 + 0x208))(pNVar14,plVar12);
          pSVar13 = (Size *)(**(code **)(*(long *)pMVar15 + 0x168))(pMVar15);
          cocos2d::Size::Size(aSStack_1b0,pSVar13);
          local_1ac = local_1ac + 20.0;
          (**(code **)(*(long *)pNVar14 + 0xe8))(uVar5,pNVar14);
          (**(code **)(*(long *)pMVar15 + 0x160))(pMVar15,aSStack_1b0);
          lVar20 = lVar20 + 1;
          lVar22 = lVar22 + -0x46;
          ppMVar21 = ppMVar21 + 1;
        } while (lVar20 < 3);
        plVar12 = (long *)cocos2d::Menu::create(local_b0[0],local_b0[1],local_b0[2],0);
        local_1f8 = 0x4248000000000000;
        (**(code **)(*plVar12 + 0x98))(plVar12,&local_1f8);
        (**(code **)(**(long **)(this + 0x378) + 0x210))(*(long **)(this + 0x378),plVar12,1);
        (**(code **)(**(long **)(this + 0x378) + 200))(uVar4,DAT_009c4ba8);
        (**(code **)(*(long *)this + 0x210))(this,*(undefined8 *)(this + 0x378),7);
        lVar20 = *(long *)PTR___stack_chk_guard_00c419a0;
      }
    }
    if (lVar20 == local_98) {
      return;
    }
  }
  else {
    this[0x395] = (GameScene)0x1;
    pcVar9 = (char *)GameMsg::Get(1,4);
    CommonSystem::ShowSystemMini(pcVar9);
    if (lVar20 == local_98) {
      HardcoreData::Death((HardcoreData *)PTR_g_Hard_00c41970);
      return;
    }
  }
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: UserData::Save
###########################################################################

========================================
FUNCTION: LevelClear
ADDRESS: 004dda30
========================================

/* Stage::LevelClear() */

void Stage::LevelClear(void)

{
  undefined *puVar1;
  undefined *puVar2;
  undefined *puVar3;
  bool bVar4;
  uint uVar5;
  int iVar6;
  uint uVar7;
  Director *this;
  Scene *pSVar8;
  long lVar9;
  long lVar10;
  RuneItem *this_00;
  
  puVar1 = PTR_g_UserData_00c41478;
  uVar5 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
  puVar3 = PTR_g_Common_00c44818;
  if (*(uint *)(PTR_g_Common_00c44818 + 0xc) ==
      (*(uint *)(PTR_g_Common_00c44818 + 8) + *(uint *)(PTR_g_Common_00c44818 + 4) ^ 0x3edd3b2d)) {
    uVar7 = *(uint *)(PTR_g_Common_00c44818 + 8) ^ *(uint *)(PTR_g_Common_00c44818 + 4);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar7 = 0;
  }
  if (uVar5 == uVar7) {
    uVar5 = *(uint *)(puVar1 + 0x10);
    uVar7 = *(uint *)(puVar1 + 0x14);
    bVar4 = *(uint *)(puVar1 + 0x18) != (uVar7 + uVar5 ^ 0x3edd3b2d);
    if (bVar4) {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
    puVar1 = PTR_g_UserData_00c41478;
    if ((bVar4 || (uVar7 ^ uVar5) != 4) && (puVar3[0x72] == '\0')) {
      iVar6 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
      uVar5 = rand();
      if (iVar6 == 3) {
        *(uint *)(puVar1 + 8) = uVar5;
        puVar2 = PTR_g_InvenRune_00c41fe8;
        *(uint *)(puVar1 + 4) = uVar5 ^ 1;
        lVar10 = *(long *)(puVar2 + 0x370);
        lVar9 = *(long *)(puVar2 + 0x368);
        *(uint *)(puVar1 + 0xc) = (uVar5 ^ 1) + uVar5 ^ 0x3edd3b2d;
        if ((uint)((ulong)(lVar10 - lVar9) >> 3) < 0xc) {
          this_00 = (RuneItem *)0x0;
        }
        else {
          this_00 = *(RuneItem **)(lVar9 + 0x58);
        }
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
        RuneItem::AddCnt(this_00);
      }
      else {
        *(uint *)(puVar1 + 0x1c) = uVar5 ^ 1;
        *(uint *)(puVar1 + 0x20) = uVar5;
        *(uint *)(puVar1 + 0x24) = (uVar5 ^ 1) + uVar5 ^ 0x3edd3b2d;
        iVar6 = rand();
        *(int *)(puVar1 + 0x28) = iVar6;
        *(int *)(puVar1 + 0x2c) = iVar6;
        *(uint *)(puVar1 + 0x30) = iVar6 << 1 ^ 0x3edd3b2d;
      }
      if (*(uint *)(puVar1 + 0x18) ==
          (*(uint *)(puVar1 + 0x14) + *(uint *)(puVar1 + 0x10) ^ 0x3edd3b2d)) {
        uVar5 = (*(uint *)(puVar1 + 0x14) ^ *(uint *)(puVar1 + 0x10)) + 1;
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar5 = 1;
      }
      uVar7 = rand();
      *(uint *)(puVar1 + 0x10) = uVar7 ^ uVar5;
      *(uint *)(puVar1 + 0x14) = uVar7;
      *(uint *)(puVar1 + 0x18) = (uVar7 ^ uVar5) + uVar7 ^ 0x3edd3b2d;
    }
  }
  puVar1 = PTR_g_UserData_00c41478;
  UserData::Save((UserData *)PTR_g_UserData_00c41478,false);
  UserData::BackupData((UserData *)puVar1);
  puVar3[2] = 1;
  this = (Director *)cocos2d::Director::getInstance();
  pSVar8 = (Scene *)CreditScene::CreateScene();
  cocos2d::Director::replaceScene(this,pSVar8);
  return;
}


###########################################################################
# SEARCH TARGET: UserData::Save
###########################################################################

========================================
FUNCTION: Save
ADDRESS: 004e6210
========================================

/* UserData::Save(bool) */

void __thiscall UserData::Save(UserData *this,bool param_1)

{
  undefined *puVar1;
  uchar *puVar2;
  long *plVar3;
  char *pcVar4;
  long lVar5;
  code *pcVar6;
  byte local_a0 [16];
  void *local_90;
  byte local_88 [16];
  void *local_78;
  __ndk1 local_70 [16];
  void *local_60;
  Data aDStack_58 [16];
  int local_48;
  basic_string abStack_42 [10];
  long local_38;
  
  puVar1 = PTR_g_Common_00c44818;
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar5;
  if (*(int *)(PTR_g_Common_00c44818 + 0x7c) == 0) {
    if (!param_1) {
      if (*(uint *)(this + 0x78) == (*(int *)(this + 0x74) + *(int *)(this + 0x70) ^ 0x3edd3b2dU)) {
        if (*(int *)(this + 0x74) == *(int *)(this + 0x70)) goto LAB_004e628c;
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
LAB_004e628c:
        if (*(uint *)(this + 0xc) != (*(int *)(this + 8) + *(int *)(this + 4) ^ 0x3edd3b2dU)) {
          SafeVarMgr::Get();
          if (lVar5 == local_38) {
            SafeVarMgr::BanHack();
            return;
          }
          goto LAB_004e6474;
        }
        if (*(int *)(this + 8) == *(int *)(this + 4)) goto LAB_004e6420;
      }
      if (puVar1[3] == '\0') goto LAB_004e6420;
    }
    local_48 = 0;
    puVar2 = (uchar *)GetSaveData(this,&local_48,false);
    cocos2d::Data::Data(aDStack_58);
                    /* try { // try from 004e62d8 to 004e633f has its CatchHandler @ 004e6478 */
    cocos2d::Data::copy(aDStack_58,puVar2,(long)local_48);
    pcVar4 = (char *)0x41;
    CHidingString::MakeStr
              ((CHidingString *)PTR_g_HideStr_00c42a40,(char *)abStack_42,0x41,0x29,0x35,0xd,1,0x42,
               0x37,0x3d,0x17,10);
    plVar3 = (long *)cocos2d::FileUtils::getInstance();
    (**(code **)(*plVar3 + 0xa0))(local_70);
                    /* try { // try from 004e6340 to 004e635f has its CatchHandler @ 004e646c */
    plVar3 = (long *)cocos2d::FileUtils::getInstance();
    pcVar6 = *(code **)(*plVar3 + 0xe8);
    std::__ndk1::operator+(local_70,abStack_42,pcVar4);
                    /* try { // try from 004e6360 to 004e636f has its CatchHandler @ 004e6480 */
    (*pcVar6)(plVar3,aDStack_58,local_88);
    if ((local_88[0] & 1) != 0) {
      operator_delete(local_78);
    }
    pcVar4 = (char *)0x41;
    CHidingString::MakeStr
              ((CHidingString *)PTR_g_HideStr_00c42a40,(char *)abStack_42,0x41,0x29,0x35,0xd,2,0x42,
               0x37,0x3d,0x17,10);
                    /* try { // try from 004e63c8 to 004e63e7 has its CatchHandler @ 004e646c */
    plVar3 = (long *)cocos2d::FileUtils::getInstance();
    pcVar6 = *(code **)(*plVar3 + 0xe8);
    std::__ndk1::operator+(local_70,abStack_42,pcVar4);
                    /* try { // try from 004e63e8 to 004e63f7 has its CatchHandler @ 004e6494 */
    (*pcVar6)(plVar3,aDStack_58,local_a0);
    if ((local_a0[0] & 1) != 0) {
      operator_delete(local_90);
    }
    if (((byte)local_70[0] & 1) != 0) {
      operator_delete(local_60);
    }
    cocos2d::Data::~Data(aDStack_58);
  }
LAB_004e6420:
  if (lVar5 == local_38) {
    return;
  }
LAB_004e6474:
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: UserData::GetGold
###########################################################################

========================================
FUNCTION: GetGold
ADDRESS: 0041fe70
========================================

void __thiscall UserData::GetGold(UserData *this)

{
  (*(code *)PTR_GetGold_00c3d620)();
  return;
}


###########################################################################
# SEARCH TARGET: UserData::GetGold
###########################################################################

========================================
FUNCTION: SellItem
ADDRESS: 00478974
========================================

/* InventoryScene::SellItem() */

void __thiscall InventoryScene::SellItem(InventoryScene *this)

{
  undefined *puVar1;
  int iVar2;
  char *pcVar3;
  long lVar4;
  User *this_00;
  long *plVar5;
  size_t __n;
  EquipItem *this_01;
  void *__dest;
  ulong uVar6;
  long lVar7;
  code *pcVar8;
  ulong local_70;
  size_t local_68;
  void *local_60;
  long local_58;
  
  puVar1 = PTR_selected_item_00c43ff8;
  lVar7 = *(long *)PTR___stack_chk_guard_00c419a0;
  this_01 = *(EquipItem **)PTR_selected_item_00c43ff8;
  local_58 = lVar7;
  if (*(int *)(this_01 + 0x558) == 6) {
    pcVar3 = (char *)GameMsg::Get(0x11,7);
    if (lVar7 == local_58) {
      CommonSystem::ShowSystemMsg(pcVar3,false);
      return;
    }
    goto LAB_00478b98;
  }
  iVar2 = EquipItem::GetPrice(this_01);
  UserData::AddGold((UserData *)PTR_g_UserData_00c41478,iVar2);
  SndMgr::PlayEffect(0xf);
  cocos2d::Ref::retain((Ref *)this_01);
  if (*(int *)(*(long *)(puVar1 + 8) + 0x328) == 4) {
    this_00 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
    User::DeleteEquipItem(this_00,*(int *)(puVar1 + 0x10),false);
  }
  else if (*(int *)(*(long *)(puVar1 + 8) + 0x328) == 0) {
    lVar4 = User::Ins(PTR_g_Common_00c44818[0x72]);
    Inventory::DeleteItem(*(Inventory **)(lVar4 + 0x43a8),*(int *)(puVar1 + 0x10));
  }
  puVar1 = PTR_g_Common_00c44818;
  if (*(long **)(PTR_g_Common_00c44818 + 0x68) != (long *)0x0) {
    (**(code **)(**(long **)(PTR_g_Common_00c44818 + 0x68) + 0x270))();
  }
  *(EquipItem **)(puVar1 + 0x68) = this_01;
  plVar5 = (long *)User::Ins(puVar1[0x72]);
  (**(code **)(*plVar5 + 0x208))(plVar5,this_01);
  (**(code **)(*(long *)this_01 + 0x170))(this_01,0);
  plVar5 = *(long **)(this + 0x458);
  pcVar8 = *(code **)(*plVar5 + 0x580);
  iVar2 = UserData::GetGold((UserData *)PTR_g_UserData_00c41478);
  pcVar3 = (char *)MyUtil::IntToStr(iVar2);
  local_68 = 0;
  local_60 = (void *)0x0;
  local_70 = 0;
  __n = strlen(pcVar3);
  if (0xffffffffffffffef < __n) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (__n < 0x17) {
    __dest = (void *)((ulong)&local_70 | 1);
    local_70 = CONCAT71(local_70._1_7_,(char)(__n << 1));
    if (__n != 0) goto LAB_00478b30;
  }
  else {
    uVar6 = __n + 0x10 & 0xfffffffffffffff0;
    __dest = operator_new(uVar6);
    local_70 = uVar6 | 1;
    local_68 = __n;
    local_60 = __dest;
LAB_00478b30:
    memcpy(__dest,pcVar3,__n);
  }
  *(undefined1 *)((long)__dest + __n) = 0;
                    /* try { // try from 00478b44 to 00478b4f has its CatchHandler @ 00478ba4 */
  (*pcVar8)(plVar5,&local_70);
  if ((local_70 & 1) != 0) {
    operator_delete(local_60);
  }
  SelectItem(this,(BaseItem *)0x0);
  CommonSystem::LazySave();
  if (lVar7 == local_58) {
    return;
  }
LAB_00478b98:
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: UserData::GetGold
###########################################################################

========================================
FUNCTION: ReSellItem
ADDRESS: 004793dc
========================================

/* InventoryScene::ReSellItem() */

void __thiscall InventoryScene::ReSellItem(InventoryScene *this)

{
  undefined *puVar1;
  int iVar2;
  int iVar3;
  long lVar4;
  undefined8 uVar5;
  EquipItem *this_00;
  
  puVar1 = PTR_g_Common_00c44818;
  this_00 = *(EquipItem **)(PTR_g_Common_00c44818 + 0x68);
  if (this_00 == (EquipItem *)0x0) {
    return;
  }
  lVar4 = User::Ins(PTR_g_Common_00c44818[0x72]);
  iVar2 = EquipInven::FindEmptySlot(*(EquipInven **)(lVar4 + 0x43a8));
  if (iVar2 == -1) {
    uVar5 = 0;
  }
  else {
    iVar2 = UserData::GetGold((UserData *)PTR_g_UserData_00c41478);
    iVar3 = EquipItem::GetPrice(this_00);
    if (iVar3 <= iVar2) {
      iVar2 = EquipItem::GetPrice(this_00);
      UserData::AddGold((UserData *)PTR_g_UserData_00c41478,-iVar2);
      (**(code **)(*(long *)this_00 + 0x170))(this_00,1);
      (**(code **)(*(long *)this_00 + 0x270))(this_00);
      GiveBuyItem(this,(BaseItem *)this_00);
      UpdateMoney(this);
      *(undefined8 *)(puVar1 + 0x68) = 0;
      SelectItem(this,(BaseItem *)0x0);
      return;
    }
    uVar5 = 2;
  }
  CommonSystem::ShowSystemMsg(0x11,uVar5,0);
  return;
}


###########################################################################
# SEARCH TARGET: UserData::GetGold
###########################################################################

========================================
FUNCTION: UpdateMoney
ADDRESS: 004798ec
========================================

/* InventoryScene::UpdateMoney() */

void __thiscall InventoryScene::UpdateMoney(InventoryScene *this)

{
  undefined *puVar1;
  int iVar2;
  uint uVar3;
  char *pcVar4;
  size_t sVar5;
  long *plVar6;
  ulong uVar7;
  void *pvVar8;
  long lVar9;
  code *pcVar10;
  ulong local_98;
  size_t local_90;
  void *local_88;
  ulong local_80;
  size_t local_78;
  void *local_70;
  long local_68;
  
  puVar1 = PTR_g_UserData_00c41478;
  lVar9 = *(long *)PTR___stack_chk_guard_00c419a0;
  plVar6 = *(long **)(this + 0x458);
  pcVar10 = *(code **)(*plVar6 + 0x580);
  local_68 = lVar9;
  iVar2 = UserData::GetGold((UserData *)PTR_g_UserData_00c41478);
  pcVar4 = (char *)MyUtil::IntToStr(iVar2);
  local_78 = 0;
  local_70 = (void *)0x0;
  local_80 = 0;
  sVar5 = strlen(pcVar4);
  if (0xffffffffffffffef < sVar5) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (sVar5 < 0x17) {
    pvVar8 = (void *)((ulong)&local_80 | 1);
    local_80 = CONCAT71(local_80._1_7_,(char)(sVar5 << 1));
    if (sVar5 != 0) goto LAB_0047999c;
  }
  else {
    uVar7 = sVar5 + 0x10 & 0xfffffffffffffff0;
    pvVar8 = operator_new(uVar7);
    local_80 = uVar7 | 1;
    local_78 = sVar5;
    local_70 = pvVar8;
LAB_0047999c:
    memcpy(pvVar8,pcVar4,sVar5);
  }
  *(undefined1 *)((long)pvVar8 + sVar5) = 0;
                    /* try { // try from 004799b0 to 004799bb has its CatchHandler @ 00479adc */
  (*pcVar10)(plVar6,&local_80);
  if ((local_80 & 1) != 0) {
    operator_delete(local_70);
  }
  plVar6 = *(long **)(this + 0x460);
  pcVar10 = *(code **)(*plVar6 + 0x580);
  if (*(uint *)(puVar1 + 0x9c) == (*(uint *)(puVar1 + 0x98) + *(uint *)(puVar1 + 0x94) ^ 0x3edd3b2d)
     ) {
    uVar3 = *(uint *)(puVar1 + 0x98) ^ *(uint *)(puVar1 + 0x94);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar3 = 0;
  }
  pcVar4 = (char *)MyUtil::IntToStr(uVar3);
  local_90 = 0;
  local_88 = (void *)0x0;
  local_98 = 0;
  sVar5 = strlen(pcVar4);
  if (0xffffffffffffffef < sVar5) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (sVar5 < 0x17) {
    pvVar8 = (void *)((ulong)&local_98 | 1);
    local_98 = CONCAT71(local_98._1_7_,(char)(sVar5 << 1));
    if (sVar5 == 0) goto LAB_00479a84;
  }
  else {
    uVar7 = sVar5 + 0x10 & 0xfffffffffffffff0;
    pvVar8 = operator_new(uVar7);
    local_98 = uVar7 | 1;
    local_90 = sVar5;
    local_88 = pvVar8;
  }
  memcpy(pvVar8,pcVar4,sVar5);
LAB_00479a84:
  *(undefined1 *)((long)pvVar8 + sVar5) = 0;
                    /* try { // try from 00479a88 to 00479a93 has its CatchHandler @ 00479af8 */
  (*pcVar10)(plVar6,&local_98);
  if ((local_98 & 1) != 0) {
    operator_delete(local_88);
  }
  CommonSystem::SaveCheck();
  if (lVar9 != local_68) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: UserData::GetGold
###########################################################################

========================================
FUNCTION: GetGold
ADDRESS: 004e8204
========================================

/* UserData::GetGold() */

uint __thiscall UserData::GetGold(UserData *this)

{
  uint uVar1;
  uint uVar2;
  uint uVar3;
  
  if (PTR_g_Common_00c44818[0x72] == '\0') {
    uVar1 = *(uint *)(this + 0x88);
    uVar2 = *(uint *)(this + 0x8c);
    uVar3 = *(uint *)(this + 0x90);
  }
  else {
    uVar1 = *(uint *)(PTR_g_Hard_00c41970 + 0x60);
    uVar2 = *(uint *)(PTR_g_Hard_00c41970 + 100);
    uVar3 = *(uint *)(PTR_g_Hard_00c41970 + 0x68);
  }
  if (uVar3 == (uVar2 + uVar1 ^ 0x3edd3b2d)) {
    return uVar2 ^ uVar1;
  }
  SafeVarMgr::Get();
  SafeVarMgr::BanHack();
  return 0;
}


###########################################################################
# SEARCH TARGET: GameScene::CreateScene
###########################################################################

========================================
FUNCTION: CreateScene
ADDRESS: 004249a0
========================================

void GameScene::CreateScene(void)

{
  (*(code *)PTR_CreateScene_00c3fbb8)();
  return;
}


###########################################################################
# SEARCH TARGET: GameScene::CreateScene
###########################################################################

========================================
FUNCTION: CreateScene
ADDRESS: 0045d870
========================================

/* GameScene::CreateScene() */

long * GameScene::CreateScene(void)

{
  long *plVar1;
  undefined8 uVar2;
  code *pcVar3;
  
  plVar1 = (long *)cocos2d::Scene::create();
  pcVar3 = *(code **)(*plVar1 + 0x208);
  uVar2 = create();
  (*pcVar3)(plVar1,uVar2);
  return plVar1;
}


###########################################################################
# SEARCH TARGET: GameScene::CreateScene
###########################################################################

========================================
FUNCTION: OpenStage
ADDRESS: 004e0714
========================================

/* StageMgr::OpenStage(ACT, int) */

void __thiscall StageMgr::OpenStage(StageMgr *this,uint param_2,uint param_3)

{
  undefined *puVar1;
  undefined *puVar2;
  StageMgr SVar3;
  uint uVar4;
  int iVar5;
  Stage *pSVar6;
  Director *this_00;
  Scene *pSVar7;
  uint uVar8;
  
  puVar1 = PTR_g_Common_00c44818;
  *(int *)(PTR_g_Common_00c44818 + 0x88) = *(int *)(PTR_g_Common_00c44818 + 0x88) + -1;
  puVar2 = PTR_g_UserData_00c41478;
  uVar4 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
  if (*(uint *)(puVar1 + 0xc) == (*(uint *)(puVar1 + 8) + *(uint *)(puVar1 + 4) ^ 0x3edd3b2d)) {
    uVar8 = *(uint *)(puVar1 + 8) ^ *(uint *)(puVar1 + 4);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar8 = 0;
  }
  if (uVar4 == uVar8) {
    if (*(uint *)(puVar2 + 0x30) ==
        (*(uint *)(puVar2 + 0x2c) + *(uint *)(puVar2 + 0x28) ^ 0x3edd3b2d)) {
      uVar4 = *(uint *)(puVar2 + 0x2c) ^ *(uint *)(puVar2 + 0x28);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar4 = 0;
    }
    if (uVar4 == param_2) {
      if (*(uint *)(puVar2 + 0x24) ==
          (*(uint *)(puVar2 + 0x20) + *(uint *)(puVar2 + 0x1c) ^ 0x3edd3b2d)) {
        uVar4 = *(uint *)(puVar2 + 0x20) ^ *(uint *)(puVar2 + 0x1c);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar4 = 0;
      }
      SVar3 = (StageMgr)(uVar4 == param_3);
    }
    else {
      SVar3 = (StageMgr)0x0;
    }
  }
  else {
    SVar3 = (StageMgr)0x0;
  }
  this[8] = SVar3;
  *(undefined4 *)(puVar1 + 0x74) = 0;
  iVar5 = rand();
  *(int *)(puVar1 + 0x58) = iVar5;
  *(int *)(puVar1 + 0x5c) = iVar5;
  puVar2 = PTR_ctrl_00c443d8;
  *(uint *)(puVar1 + 0x60) = iVar5 << 1 ^ 0x3edd3b2d;
  if (((*puVar2 & 1) == 0) &&
     (iVar5 = __cxa_guard_acquire(PTR_ctrl_00c443d8), puVar2 = PTR_ctrl_00c42e40, iVar5 != 0)) {
    puVar1 = PTR_ctrl_00c42e40 + 0x38;
    *(undefined4 *)(PTR_ctrl_00c42e40 + 4) = 0;
    *(undefined4 *)(puVar2 + 8) = 0;
    *(undefined4 *)(puVar2 + 0x20) = 0;
    *(undefined4 *)(puVar2 + 0x24) = 0;
    memset(puVar1,0,0xff);
    __cxa_guard_release(PTR_ctrl_00c443d8);
  }
  InputMgr::Reset((InputMgr *)PTR_ctrl_00c42e40);
  if (((*PTR_joy_00c41bc0 & 1) == 0) && (iVar5 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar5 != 0))
  {
                    /* try { // try from 004e08c4 to 004e08cf has its CatchHandler @ 004e097c */
    GameUI::GameUI((GameUI *)PTR_joy_00c42890);
    __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_joy_00c41bc0);
  }
  GameUI::UpdateFaceFrame((GameUI *)PTR_joy_00c42890,true);
  pSVar6 = operator_new(0x3f0);
                    /* try { // try from 004e0914 to 004e091f has its CatchHandler @ 004e0968 */
  Stage::Stage(pSVar6,param_2,param_3);
  *(Stage **)this = pSVar6;
  this_00 = (Director *)cocos2d::Director::getInstance();
  pSVar7 = (Scene *)GameScene::CreateScene();
  cocos2d::Director::replaceScene(this_00,pSVar7);
  StageData::Load((StageData *)PTR_g_StageData_00c41cc8);
  Stage::FrameMove(*(Stage **)this,0.0);
  return;
}


###########################################################################
# SEARCH TARGET: GameScene::onEnter
###########################################################################

========================================
FUNCTION: onEnter
ADDRESS: 0045fc54
========================================

/* GameScene::onEnter() */

void __thiscall GameScene::onEnter(GameScene *this)

{
  undefined *puVar1;
  long lVar2;
  code *pcVar3;
  long lVar4;
  undefined *local_70;
  undefined *puStack_68;
  undefined8 local_60;
  GameScene *pGStack_58;
  long *local_50;
  long local_38;
  
  lVar4 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar4;
  cocos2d::Node::onEnter((Node *)this);
  lVar2 = cocos2d::EventListenerTouchAllAtOnce::create();
  *(long *)(this + 0x328) = lVar2;
  puVar1 = PTR_vtable_00c42438;
  local_70 = PTR_vtable_00c42438 + 0x10;
  puStack_68 = PTR_TouchBegan_00c42830;
  local_60 = 0;
  pGStack_58 = this;
  local_50 = (long *)&local_70;
  std::__ndk1::
  function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
  ::swap((function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
          *)&local_70,(function *)(lVar2 + 0xa0));
  if ((undefined **)local_50 == &local_70) {
    pcVar3 = *(code **)(*local_50 + 0x20);
LAB_0045fcdc:
    (*pcVar3)();
  }
  else if (local_50 != (long *)0x0) {
    pcVar3 = *(code **)(*local_50 + 0x28);
    goto LAB_0045fcdc;
  }
  local_70 = puVar1 + 0x10;
  puStack_68 = PTR_TouchMoved_00c41050;
  local_60 = 0;
  pGStack_58 = this;
  local_50 = (long *)&local_70;
  std::__ndk1::
  function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
  ::swap((function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
          *)&local_70,(function *)(*(long *)(this + 0x328) + 0xd0));
  if ((undefined **)local_50 == &local_70) {
    pcVar3 = *(code **)(*local_50 + 0x20);
LAB_0045fd30:
    (*pcVar3)();
  }
  else if (local_50 != (long *)0x0) {
    pcVar3 = *(code **)(*local_50 + 0x28);
    goto LAB_0045fd30;
  }
  local_70 = puVar1 + 0x10;
  puStack_68 = PTR_TouchEnded_00c43f90;
  local_60 = 0;
  pGStack_58 = this;
  local_50 = (long *)&local_70;
  std::__ndk1::
  function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
  ::swap((function<void(std::__ndk1::vector<cocos2d::Touch*,std::__ndk1::allocator<cocos2d::Touch*>>const&,cocos2d::Event*)>
          *)&local_70,(function *)(*(long *)(this + 0x328) + 0x100));
  if ((undefined **)local_50 == &local_70) {
    pcVar3 = *(code **)(*local_50 + 0x20);
  }
  else {
    if (local_50 == (long *)0x0) goto LAB_0045fd88;
    pcVar3 = *(code **)(*local_50 + 0x28);
  }
  (*pcVar3)();
LAB_0045fd88:
  lVar2 = cocos2d::Director::getInstance();
  cocos2d::EventDispatcher::addEventListenerWithSceneGraphPriority
            (*(EventDispatcher **)(lVar2 + 0xb0),*(EventListener **)(this + 0x328),(Node *)this);
  if (lVar4 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: GameScene::onExit
###########################################################################

========================================
FUNCTION: onExit
ADDRESS: 00460488
========================================

/* GameScene::onExit() */

void __thiscall GameScene::onExit(GameScene *this)

{
  long lVar1;
  
  *(undefined8 *)PTR_g_GameScene_00c41fb0 = 0;
  lVar1 = cocos2d::Director::getInstance();
  cocos2d::EventDispatcher::removeEventListener
            (*(EventDispatcher **)(lVar1 + 0xb0),*(EventListener **)(this + 0x328));
  CommonSystem::HideSystemMsg();
  cocos2d::Node::onExit((Node *)this);
  if (*(float *)(this + 0x390) != 0.0) {
    *(undefined4 *)(PTR_g_Common_00c44818 + 0x54) = 0x19;
  }
  return;
}


###########################################################################
# SEARCH TARGET: Character::Attack
###########################################################################

========================================
FUNCTION: Attack
ADDRESS: 00423dd0
========================================

void __thiscall Character::Attack(Character *this,bool param_1)

{
  (*(code *)PTR_Attack_00c3f5d0)(this,param_1);
  return;
}


###########################################################################
# SEARCH TARGET: Character::Attack
###########################################################################

========================================
FUNCTION: Attack
ADDRESS: 0044b2cc
========================================

/* Character::Attack(bool) */

undefined8 __thiscall Character::Attack(Character *this,bool param_1)

{
  undefined *__s;
  uint uVar1;
  undefined *puVar2;
  int iVar3;
  Character *pCVar4;
  int *piVar5;
  
  piVar5 = *(int **)(this + 0x41c8);
  if ((piVar5 != (int *)0x0) && (*piVar5 != 0)) {
    if ((*(byte *)(*(long *)(piVar5 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 1) != 0) {
      return 0;
    }
    uVar1 = *(uint *)(*(long *)(piVar5 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c);
    if ((uVar1 >> 4 & 1) != 0) {
      if ((uVar1 >> 0xd & 1) == 0) {
        return 0;
      }
      if (!param_1) {
        return 0;
      }
      goto LAB_0044b3b4;
    }
  }
  if (!param_1) {
    if (((*piVar5 == 8) && (*(long *)(this + 0x42a0) != 0)) &&
       (**(int **)(*(long *)(this + 0x42a0) + 0x41c8) == 7)) {
      SetMotion(this,9,0);
      *(undefined4 *)(this + 0x41d4) = 0x3dcccccd;
      return 1;
    }
    iVar3 = rand();
    SetMotion(this,iVar3 % 2 + 9,0);
    return 1;
  }
LAB_0044b3b4:
  SetMotion(this,0xb,0);
  if (((*PTR_ctrl_00c443d8 & 1) == 0) &&
     (iVar3 = __cxa_guard_acquire(PTR_ctrl_00c443d8), puVar2 = PTR_ctrl_00c42e40, iVar3 != 0)) {
    __s = PTR_ctrl_00c42e40 + 0x38;
    *(undefined4 *)(PTR_ctrl_00c42e40 + 4) = 0;
    *(undefined4 *)(puVar2 + 8) = 0;
    *(undefined4 *)(puVar2 + 0x20) = 0;
    *(undefined4 *)(puVar2 + 0x24) = 0;
    memset(__s,0,0xff);
    __cxa_guard_release(PTR_ctrl_00c443d8);
  }
  pCVar4 = (Character *)InputMgr::GetCharacter((InputMgr *)PTR_ctrl_00c42e40);
  if (pCVar4 != this) {
    *(undefined4 *)(this + 0x428c) = 0x40000000;
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: Character::Attack
###########################################################################

========================================
FUNCTION: ProcBTN
ADDRESS: 0046ffec
========================================

/* GameUI::ProcBTN(ControllTag, bool) */

undefined8 __thiscall GameUI::ProcBTN(GameUI *this,int param_2,ulong param_3)

{
  undefined *__s;
  undefined *puVar1;
  int iVar2;
  long lVar3;
  long *plVar4;
  undefined8 uVar5;
  ulong uVar6;
  User *pUVar7;
  int *piVar8;
  undefined4 uVar9;
  Character *this_00;
  
  if (((*PTR_ctrl_00c443d8 & 1) == 0) &&
     (iVar2 = __cxa_guard_acquire(PTR_ctrl_00c443d8), puVar1 = PTR_ctrl_00c42e40, iVar2 != 0)) {
    __s = PTR_ctrl_00c42e40 + 0x38;
    *(undefined4 *)(PTR_ctrl_00c42e40 + 4) = 0;
    *(undefined4 *)(puVar1 + 8) = 0;
    *(undefined4 *)(puVar1 + 0x20) = 0;
    *(undefined4 *)(puVar1 + 0x24) = 0;
    memset(__s,0,0xff);
    __cxa_guard_release(PTR_ctrl_00c443d8);
  }
  this_00 = *(Character **)(PTR_ctrl_00c42e40 + 0x138);
  if (this_00 == (Character *)0x0) {
    uVar5 = 0;
  }
  else if (this_00[0x328] == (Character)0x0) {
    uVar5 = 0;
  }
  else {
    lVar3 = (**(code **)(*(long *)this + 0x228))(this,param_2);
    if (lVar3 == 0) {
      uVar5 = 0;
    }
    else {
      plVar4 = (long *)__dynamic_cast(lVar3,PTR_typeinfo_00c438a8,PTR_typeinfo_00c44700,0);
      if (plVar4 == (long *)0x0) {
        uVar5 = 0;
      }
      else {
        uVar9 = 0xffffffff;
        if ((param_3 & 1) == 0) {
          uVar9 = 100;
        }
        (**(code **)(*plVar4 + 0x490))(plVar4,uVar9);
        if ((param_3 & 1) != 0) {
          if (*(float *)(plVar4 + 0x66) != 0.0) {
            piVar8 = *(int **)(this_00 + 0x41c8);
            if (((piVar8 == (int *)0x0) || (*piVar8 == 0)) ||
               ((*(byte *)(*(long *)(piVar8 + 2) + (long)*(int *)(this_00 + 0x41d0) * 0x50 + 0x3c) &
                1) == 0)) {
              uVar5 = GameMsg::Get(0x13,4);
              Character::Talk(this_00,uVar5,1);
              return 0;
            }
            return 0;
          }
          if (param_2 == 3) {
            if (((byte)this_00[0x41c4] >> 3 & 1) != 0) {
              uVar6 = Character::Attack(this_00,true);
              if ((uVar6 & 1) == 0) {
                return 1;
              }
              StartCoolTime(this,3);
            }
          }
          else if (param_2 == 2) {
            piVar8 = *(int **)(this_00 + 0x41c8);
            if (((piVar8 != (int *)0x0) && (*piVar8 != 0)) &&
               ((*(byte *)(*(long *)(piVar8 + 2) + (long)*(int *)(this_00 + 0x41d0) * 0x50 + 0x3c) &
                1) != 0)) {
              return 0;
            }
            Character::Defense(this_00);
          }
          else if (param_2 == 1) {
            Character::A_Btn_Proc(this_00);
          }
          else {
            pUVar7 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
            User::TrySkill(pUVar7,param_2 + -4);
          }
        }
        uVar5 = 1;
      }
    }
  }
  return uVar5;
}


###########################################################################
# SEARCH TARGET: Character::Attack
###########################################################################

========================================
FUNCTION: HeroAI
ADDRESS: 004e26e8
========================================

/* User::HeroAI(float) */

void __thiscall User::HeroAI(User *this,float param_1)

{
  User *pUVar1;
  User *pUVar2;
  undefined *puVar3;
  undefined *puVar4;
  bool bVar5;
  int iVar6;
  uint uVar7;
  ulong uVar8;
  undefined4 *puVar9;
  int *piVar10;
  float fVar11;
  
  if (*(float *)(this + 0x4284) == 0.0) {
    bVar5 = false;
  }
  else {
    bVar5 = *(char *)(*(long *)PTR_g_GameScene_00c41fb0 + 0x38c) == '\0';
  }
  pUVar1 = this + 0x438c;
  if ((!bVar5) && (*pUVar1 == (User)0x0)) {
    return;
  }
  pUVar2 = this + 0x428c;
  fVar11 = *(float *)pUVar2;
  *(float *)pUVar2 = fVar11 - param_1;
  piVar10 = *(int **)(this + 0x41c8);
  if (piVar10 != (int *)0x0) {
    if (((*piVar10 != 0) &&
        ((*(uint *)(*(long *)(piVar10 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) >> 0xb & 1
         ) != 0)) && (fVar11 - param_1 <= 0.0)) {
      *(undefined4 *)pUVar2 = 0x40200000;
      Character::Attack((Character *)this,true);
      piVar10 = *(int **)(this + 0x41c8);
      if (piVar10 == (int *)0x0) goto LAB_004e27d0;
    }
    if ((*piVar10 != 0) &&
       ((*(byte *)(*(long *)(piVar10 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) >> 4 & 1)
        != 0)) {
      return;
    }
  }
LAB_004e27d0:
  pUVar2 = this + 0x4278;
  fVar11 = *(float *)pUVar2 - param_1;
  if (fVar11 <= 0.0) {
    fVar11 = 0.0;
  }
  *(float *)pUVar2 = fVar11;
  if ((PTR_g_AIFlag_00c43b38[1] == '\0') && (*pUVar1 != (User)0x0)) {
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar6 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar6 != 0)) {
                    /* try { // try from 004e2828 to 004e2833 has its CatchHandler @ 004e29a4 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    uVar7 = Stage::AutoPickupProc(*(Stage **)PTR_stageMgr_00c430c8);
    if ((uVar7 & 1) != 0) {
      return;
    }
  }
  uVar8 = Character::FindEnemy((Character *)this);
  puVar4 = PTR_stageMgr_00c43eb0;
  if ((uVar8 & 1) == 0) {
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar6 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar6 != 0)) {
                    /* try { // try from 004e28cc to 004e28d7 has its CatchHandler @ 004e29a0 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    puVar3 = PTR_stageMgr_00c430c8;
    if ((*(long *)(*(long *)PTR_stageMgr_00c430c8 + 1000) != 0) && (*pUVar1 != (User)0x0)) {
      if (((*puVar4 & 1) == 0) && (iVar6 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar6 != 0))
      {
                    /* try { // try from 004e291c to 004e2927 has its CatchHandler @ 004e29a8 */
        StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
        __cxa_guard_release(PTR_stageMgr_00c43eb0);
      }
      puVar9 = (undefined4 *)(**(code **)(**(long **)(*(long *)puVar3 + 1000) + 0xb0))();
      Character::SetMovePosition(*puVar9,puVar9[1],this,5);
      return;
    }
  }
  else if ((*(float *)pUVar2 == 0.0) &&
          (uVar8 = Character::CanAttack((Character *)this), (uVar8 & 1) != 0)) {
    uVar8 = Character::CheckReach((Character *)this,*(Character **)(this + 0x42a0));
    if ((uVar8 & 1) == 0) {
      *(undefined4 *)pUVar2 = 0x3dcccccd;
      Character::MoveToTarget((Character *)this);
      return;
    }
    Character::Attack((Character *)this,false);
    return;
  }
  return;
}


###########################################################################
# SEARCH TARGET: Character::Die
###########################################################################

========================================
FUNCTION: Die
ADDRESS: 00413390
========================================

void __thiscall Character::Die(Character *this)

{
  (*(code *)PTR_Die_00c370b0)();
  return;
}


###########################################################################
# SEARCH TARGET: Character::Die
###########################################################################

========================================
FUNCTION: Die
ADDRESS: 00452e78
========================================

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* Character::Die() */

void __thiscall Character::Die(Character *this)

{
  Character *pCVar1;
  uint uVar2;
  int iVar3;
  undefined *puVar4;
  undefined *puVar5;
  bool bVar6;
  uint uVar7;
  long *plVar8;
  uint uVar9;
  GameScene *this_00;
  float fVar10;
  float fVar11;
  
  *(undefined4 *)(this + 0x42c8) = 0;
  *(undefined4 *)(this + 0x4284) = 0;
  plVar8 = *(long **)(this + 0x4290);
  *(undefined4 *)(this + 0x324) = 0xffffffff;
  if (plVar8 != (long *)0x0) {
    (**(code **)(*plVar8 + 0x170))(plVar8,0);
  }
  fVar10 = 0.0;
  (**(code **)(*(long *)this + 0x660))(0,this,0);
  (**(code **)(*(long *)this + 0x660))(0,this,1);
  (**(code **)(*(long *)this + 0x660))(0,this,2);
  pCVar1 = this + 0x41c4;
  uVar9 = *(uint *)pCVar1;
  if ((uVar9 >> 0xb & 1) == 0) {
    *(undefined8 *)(this + 0x42a0) = 0;
  }
  if ((uVar9 >> 0x12 & 1) == 0) {
    *(undefined4 *)(this + 0x42b0) = 0xf;
  }
  if ((uVar9 & 0x4400) == 0x4400) {
    DropItem(this);
    if (PTR_g_Common_00c44818[0x72] == '\0') {
      fVar11 = (float)GameData::GetMobExp(*(int *)(this + 0x4274),*(int *)(this + 0x4204));
    }
    else {
      if (DAT_00c60a70 == 0.0) {
        uRam0000000000c60a78 = _UNK_009c4818;
        _DAT_00c60a70 = _DAT_009c4810;
        uRam0000000000c60a88 = _UNK_009c4828;
        _DAT_00c60a80 = _DAT_009c4820;
        uRam0000000000c60a98 = _UNK_009c4838;
        _DAT_00c60a90 = _DAT_009c4830;
        uRam0000000000c60aa8 = _UNK_009c4848;
        _DAT_00c60aa0 = _DAT_009c4840;
        uRam0000000000c60ab8 = _UNK_009c4858;
        _DAT_00c60ab0 = _DAT_009c4850;
        uRam0000000000c60ac8 = _UNK_009c4868;
        _DAT_00c60ac0 = _DAT_009c4860;
        DAT_00c60ad0 = 0x4407b339;
      }
      fVar11 = (float)(&DAT_00c60a58)
                      [(long)*(int *)(this + 0x4204) + (long)*(int *)(this + 0x4274) * 5];
      if (*(uint *)(PTR_g_Hard_00c41970 + 0x80) ==
          (*(uint *)(PTR_g_Hard_00c41970 + 0x7c) + *(uint *)(PTR_g_Hard_00c41970 + 0x78) ^
          0x3edd3b2d)) {
        fVar10 = (float)(int)(*(uint *)(PTR_g_Hard_00c41970 + 0x7c) ^
                             *(uint *)(PTR_g_Hard_00c41970 + 0x78));
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
      }
      fVar11 = fVar11 + fVar11 * (fVar10 / 10.0);
    }
    UserData::AddExp((UserData *)PTR_g_UserData_00c41478,fVar11);
    uVar9 = *(uint *)pCVar1;
  }
  if (((uVar9 >> 0x12 & 1) != 0) && (*(int *)(this + 0x4274) == 0)) {
    uVar9 = uVar9 | 0x100000;
    *(undefined4 *)(this + 0x4288) = 0x3f800000;
    *(uint *)pCVar1 = uVar9;
  }
  puVar5 = PTR_g_Common_00c44818;
  if ((uVar9 & 0x480) == 0x480) {
    iVar3 = *(int *)(&DAT_009c4b74 + (long)*(int *)(this + 0x4274) * 4);
    if (*(uint *)(PTR_g_Common_00c44818 + 0x2c) ==
        (*(uint *)(PTR_g_Common_00c44818 + 0x28) + *(uint *)(PTR_g_Common_00c44818 + 0x24) ^
        0x3edd3b2d)) {
      uVar9 = *(uint *)(PTR_g_Common_00c44818 + 0x28) ^ *(uint *)(PTR_g_Common_00c44818 + 0x24);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar9 = 0;
    }
    uVar7 = rand();
    *(uint *)(puVar5 + 0x28) = uVar7;
    puVar4 = PTR_g_GameScene_00c41fb0;
    uVar9 = uVar7 ^ uVar9 + iVar3;
    *(uint *)(puVar5 + 0x24) = uVar9;
    this_00 = *(GameScene **)puVar4;
    *(uint *)(puVar5 + 0x2c) = uVar9 + uVar7 ^ 0x3edd3b2d;
  }
  else {
    if ((uVar9 >> 0x1c & 1) == 0) goto LAB_004531d4;
    uVar7 = *(uint *)(PTR_g_Common_00c44818 + 0x24);
    uVar2 = *(uint *)(PTR_g_Common_00c44818 + 0x28);
    bVar6 = *(uint *)(PTR_g_Common_00c44818 + 0x2c) != (uVar2 + uVar7 ^ 0x3edd3b2d);
    if ((uVar9 >> 8 & 1) == 0) {
      if (bVar6) {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar9 = 1;
      }
      else {
        uVar9 = (uVar2 ^ uVar7) + 1;
      }
    }
    else if (bVar6) {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar9 = 5;
    }
    else {
      uVar9 = (uVar2 ^ uVar7) + 5;
    }
    uVar7 = rand();
    *(uint *)(puVar5 + 0x24) = uVar7 ^ uVar9;
    *(uint *)(puVar5 + 0x28) = uVar7;
    *(uint *)(puVar5 + 0x2c) = (uVar7 ^ uVar9) + uVar7 ^ 0x3edd3b2d;
    *(undefined4 *)(this + 0x4288) = 0x3f800000;
    *(uint *)pCVar1 = *(uint *)pCVar1 | 0x100000;
    this_00 = *(GameScene **)PTR_g_GameScene_00c41fb0;
  }
  GameScene::UpdateArenaPoint(this_00);
LAB_004531d4:
  *(uint *)pCVar1 = *(uint *)pCVar1 & 0xffffd3ff | 0x800;
  return;
}


###########################################################################
# SEARCH TARGET: Character::Die
###########################################################################

========================================
FUNCTION: Die
ADDRESS: 004e43ac
========================================

/* User::Die() */

void __thiscall User::Die(User *this)

{
  Character::Die((Character *)this);
  GameScene::HeroDeadScript(*(GameScene **)PTR_g_GameScene_00c41fb0);
  return;
}


###########################################################################
# SEARCH TARGET: MainMenuScene::onKeyReleased
###########################################################################

========================================
FUNCTION: onKeyReleased
ADDRESS: 00484db4
========================================

/* MainMenuScene::onKeyReleased(cocos2d::EventKeyboard::KeyCode, cocos2d::Event*) */

void __thiscall MainMenuScene::onKeyReleased(MainMenuScene *this,int param_2,long param_3)

{
  uint uVar1;
  
  if (((param_2 == 6) && (*(undefined1 *)(param_3 + 0x28) = 1, PTR_g_Common_00c44818[0x30] == '\0'))
     && (uVar1 = (**(code **)(**(long **)(this + 0x418) + 0x178))(), (uVar1 & 1) == 0)) {
    (**(code **)(**(long **)(this + 0x460) + 0x170))(*(long **)(this + 0x460),0);
    (**(code **)(**(long **)(this + 0x420) + 0x170))(*(long **)(this + 0x420),0);
    (**(code **)(**(long **)(this + 0x440) + 0x170))(*(long **)(this + 0x440),0);
    (**(code **)(**(long **)(this + 0x418) + 0x170))(*(long **)(this + 0x418),1);
                    /* WARNING: Could not recover jumptable at 0x00484e70. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    (**(code **)(**(long **)(this + 0x448) + 0x170))(*(long **)(this + 0x448),0);
    return;
  }
  return;
}


###########################################################################
# SEARCH TARGET: GameScene::onKeyPressed
###########################################################################

========================================
FUNCTION: onKeyPressed
ADDRESS: 004604e8
========================================

/* GameScene::onKeyPressed(cocos2d::EventKeyboard::KeyCode, cocos2d::Event*) */

void GameScene::onKeyPressed(undefined8 param_1,undefined4 param_2)

{
  undefined *__s;
  undefined *puVar1;
  int iVar2;
  
  if (((*PTR_ctrl_00c443d8 & 1) == 0) &&
     (iVar2 = __cxa_guard_acquire(PTR_ctrl_00c443d8), puVar1 = PTR_ctrl_00c42e40, iVar2 != 0)) {
    __s = PTR_ctrl_00c42e40 + 0x38;
    *(undefined4 *)(PTR_ctrl_00c42e40 + 4) = 0;
    *(undefined4 *)(puVar1 + 8) = 0;
    *(undefined4 *)(puVar1 + 0x20) = 0;
    *(undefined4 *)(puVar1 + 0x24) = 0;
    memset(__s,0,0xff);
    __cxa_guard_release(PTR_ctrl_00c443d8);
  }
  InputMgr::SetKeyboard((InputMgr *)PTR_ctrl_00c42e40,param_2,1);
  return;
}


###########################################################################
# SEARCH TARGET: GameScene::onKeyReleased
###########################################################################

========================================
FUNCTION: onKeyReleased
ADDRESS: 00460564
========================================

/* GameScene::onKeyReleased(cocos2d::EventKeyboard::KeyCode, cocos2d::Event*) */

void __thiscall GameScene::onKeyReleased(GameScene *this,int param_2,long param_3)

{
  undefined *__s;
  undefined *puVar1;
  int iVar2;
  ulong uVar3;
  undefined8 uVar4;
  
  if (((*PTR_ctrl_00c443d8 & 1) == 0) &&
     (iVar2 = __cxa_guard_acquire(PTR_ctrl_00c443d8), puVar1 = PTR_ctrl_00c42e40, iVar2 != 0)) {
    __s = PTR_ctrl_00c42e40 + 0x38;
    *(undefined4 *)(PTR_ctrl_00c42e40 + 4) = 0;
    *(undefined4 *)(puVar1 + 8) = 0;
    *(undefined4 *)(puVar1 + 0x20) = 0;
    *(undefined4 *)(puVar1 + 0x24) = 0;
    memset(__s,0,0xff);
    __cxa_guard_release(PTR_ctrl_00c443d8);
  }
  InputMgr::SetKeyboard((InputMgr *)PTR_ctrl_00c42e40,param_2,0);
  if (param_2 != 6) {
    return;
  }
  *(undefined1 *)(param_3 + 0x28) = 1;
  uVar3 = (**(code **)(**(long **)(this + 0x380) + 0x178))();
  if ((uVar3 & 1) == 0) {
    uVar4 = 1000;
  }
  else {
    uVar4 = 0x3ec;
  }
  MenuProc(this,uVar4);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayBGM
###########################################################################

========================================
FUNCTION: PlayBGM
ADDRESS: 0041fc30
========================================

void SndMgr::PlayBGM(void)

{
  (*(code *)PTR_PlayBGM_00c3d500)();
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayBGM
###########################################################################

========================================
FUNCTION: Run
ADDRESS: 00435700
========================================

/* ActionMusic::Run() */

undefined8 __thiscall ActionMusic::Run(ActionMusic *this)

{
  SndMgr::PlayBGM(*(undefined4 *)(this + 8));
  return 1;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayBGM
###########################################################################

========================================
FUNCTION: PlayBGM
ADDRESS: 00457d24
========================================

/* SndMgr::PlayBGM(BGM) */

void SndMgr::PlayBGM(int param_1)

{
  undefined *puVar1;
  int iVar2;
  User *pUVar3;
  size_t sVar4;
  char *pcVar5;
  void *pvVar6;
  ulong uVar7;
  long lVar8;
  ulong local_78;
  size_t local_70;
  void *local_68;
  ulong local_60;
  size_t local_58;
  void *local_50;
  long local_48;
  
  lVar8 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar8;
  pUVar3 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
  iVar2 = User::GetRuneAbility(pUVar3,0xb);
  if ((iVar2 == 1) || (*(int *)PTR_m_cur_bgm_00c436f8 == param_1)) goto LAB_00457f0c;
  *(int *)PTR_m_cur_bgm_00c436f8 = param_1;
  iVar2 = DAT_00c67130;
  *(undefined4 *)PTR_m_bgm_time_00c41ee0 = 0;
  cocos2d::experimental::AudioEngine::stop(iVar2);
  if (param_1 == 2) {
    pcVar5 = *(char **)PTR__str_bgm_battle_00c420d8;
    local_70 = 0;
    local_68 = (void *)0x0;
    local_78 = 0;
    sVar4 = strlen(pcVar5);
    if (0xffffffffffffffef < sVar4) {
                    /* WARNING: Subroutine does not return */
      std::__ndk1::__basic_string_common<true>::__throw_length_error();
    }
    if (sVar4 < 0x17) {
      pvVar6 = (void *)((ulong)&local_78 | 1);
      local_78 = CONCAT71(local_78._1_7_,(char)(sVar4 << 1));
      if (sVar4 != 0) goto LAB_00457ec8;
    }
    else {
      uVar7 = sVar4 + 0x10 & 0xfffffffffffffff0;
      pvVar6 = operator_new(uVar7);
      local_78 = uVar7 | 1;
      local_70 = sVar4;
      local_68 = pvVar6;
LAB_00457ec8:
      memcpy(pvVar6,pcVar5,sVar4);
    }
    puVar1 = PTR_g_Settings_00c440f0;
    *(undefined1 *)((long)pvVar6 + sVar4) = 0;
                    /* try { // try from 00457ee8 to 00457ef7 has its CatchHandler @ 00457f58 */
    DAT_00c67130 = cocos2d::experimental::AudioEngine::play2d
                             ((basic_string *)&local_78,true,*(float *)puVar1,(AudioProfile *)0x0);
    if ((local_78 & 1) == 0) goto LAB_00457f0c;
    pvVar6 = local_68;
  }
  else {
    if (param_1 != 1) goto LAB_00457f0c;
    pcVar5 = *(char **)PTR__str_bgm_main_00c42bd0;
    local_58 = 0;
    local_50 = (void *)0x0;
    local_60 = 0;
    sVar4 = strlen(pcVar5);
    if (0xffffffffffffffef < sVar4) {
                    /* WARNING: Subroutine does not return */
      std::__ndk1::__basic_string_common<true>::__throw_length_error();
    }
    if (sVar4 < 0x17) {
      pvVar6 = (void *)((ulong)&local_60 | 1);
      local_60 = CONCAT71(local_60._1_7_,(char)(sVar4 << 1));
      if (sVar4 != 0) goto LAB_00457e64;
    }
    else {
      uVar7 = sVar4 + 0x10 & 0xfffffffffffffff0;
      pvVar6 = operator_new(uVar7);
      local_60 = uVar7 | 1;
      local_58 = sVar4;
      local_50 = pvVar6;
LAB_00457e64:
      memcpy(pvVar6,pcVar5,sVar4);
    }
    puVar1 = PTR_g_Settings_00c440f0;
    *(undefined1 *)((long)pvVar6 + sVar4) = 0;
                    /* try { // try from 00457e84 to 00457e93 has its CatchHandler @ 00457f44 */
    DAT_00c67130 = cocos2d::experimental::AudioEngine::play2d
                             ((basic_string *)&local_60,true,*(float *)puVar1,(AudioProfile *)0x0);
    if ((local_60 & 1) == 0) goto LAB_00457f0c;
    pvVar6 = local_50;
  }
  operator_delete(pvVar6);
LAB_00457f0c:
  if (lVar8 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayBGM
###########################################################################

========================================
FUNCTION: Run
ADDRESS: 004d5b00
========================================

/* ActionArena::Run() */

undefined8 __thiscall ActionArena::Run(ActionArena *this)

{
  undefined *puVar1;
  float fVar2;
  undefined *puVar3;
  bool bVar4;
  int iVar5;
  uint uVar6;
  uint uVar7;
  int iVar8;
  long *plVar9;
  Character *pCVar10;
  undefined8 uVar11;
  int iVar12;
  long lVar13;
  GameScene *this_00;
  code *pcVar14;
  undefined8 *puVar15;
  undefined8 *puVar16;
  uint uVar17;
  uint uVar18;
  int iVar19;
  long lVar20;
  undefined4 uVar21;
  float fVar22;
  float fVar23;
  undefined4 uVar24;
  Character *local_e8;
  char acStack_dc [100];
  long local_78;
  
  lVar20 = *(long *)PTR___stack_chk_guard_00c419a0;
  iVar5 = *(int *)(this + 0x1c);
  local_78 = lVar20;
  if (iVar5 == 0) {
    plVar9 = (long *)User::Ins(PTR_g_Common_00c44818[0x72]);
    (**(code **)(*plVar9 + 0xd8))(0);
    puVar1 = PTR_stageMgr_00c43eb0;
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 004d5b84 to 004d5b8f has its CatchHandler @ 004d639c */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    puVar3 = PTR_stageMgr_00c430c8;
    lVar13 = *(long *)PTR_stageMgr_00c430c8;
    *(undefined4 *)(lVar13 + 0x3dc) = 0x43d70000;
    *(undefined4 *)(lVar13 + 0x3d8) = 0xc3d70000;
    if (((*puVar1 & 1) == 0) && (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 004d5bd4 to 004d5bdf has its CatchHandler @ 004d63a0 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    *(undefined1 *)(*(long *)puVar3 + 0x32c) = 1;
    if (((*puVar1 & 1) == 0) && (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 004d5c14 to 004d5c1f has its CatchHandler @ 004d63a4 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    Stage::SetMovePos(*(Stage **)puVar3,DAT_009c3d78,1.0);
    SndMgr::PlayBGM(2);
    iVar5 = *(int *)(this + 0x1c) + 1;
    *(int *)(this + 0x1c) = iVar5;
  }
  if (iVar5 == 1) {
    iVar5 = rand();
    puVar3 = PTR_g_Common_00c44818;
    puVar1 = PTR_g_GameScene_00c41fb0;
    *(int *)(PTR_g_Common_00c44818 + 0x28) = iVar5;
    this_00 = *(GameScene **)puVar1;
    *(int *)(puVar3 + 0x24) = iVar5;
    *(uint *)(puVar3 + 0x2c) = iVar5 << 1 ^ 0x3edd3b2d;
    GameScene::UpdateArenaPoint(this_00);
    puVar3[0x70] = 0;
    *(undefined4 *)(this + 8) = 2;
    *(undefined4 *)(this + 0xc) = 1;
    *(undefined4 *)(this + 0x10) = 0;
    *(undefined8 *)(this + 0x14) = 0;
    iVar5 = *(int *)(this + 0x1c) + 1;
    *(int *)(this + 0x1c) = iVar5;
  }
  puVar1 = PTR_g_Common_00c44818;
  if (((iVar5 == 2) &&
      (lVar13 = User::Ins(PTR_g_Common_00c44818[0x72]), (*(byte *)(lVar13 + 0x41c5) >> 3 & 1) != 0))
     && (**(int **)(lVar13 + 0x41c8) == 0x18)) {
    *(int *)(this + 0x1c) = *(int *)(this + 0x1c) + 1;
    if (*(uint *)(puVar1 + 0x2c) ==
        (*(uint *)(puVar1 + 0x28) + *(uint *)(puVar1 + 0x24) ^ 0x3edd3b2d)) {
      uVar17 = *(uint *)(puVar1 + 0x28) ^ *(uint *)(puVar1 + 0x24);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar17 = 0;
    }
    uVar6 = rand();
    puVar3 = PTR_g_UserData_00c41478;
    uVar17 = uVar6 ^ uVar17;
    uVar7 = uVar17 + uVar6 ^ 0x3edd3b2d;
    *(uint *)(PTR_g_UserData_00c41478 + 0xd0) = uVar17;
    *(uint *)(puVar3 + 0xd4) = uVar6;
    *(uint *)(puVar3 + 0xd8) = uVar7;
    if (*(uint *)(puVar3 + 0xcc) ==
        (*(uint *)(puVar3 + 200) + *(uint *)(puVar3 + 0xc4) ^ 0x3edd3b2d)) {
      uVar18 = *(uint *)(puVar3 + 200) ^ *(uint *)(puVar3 + 0xc4);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar17 = *(uint *)(puVar3 + 0xd0);
      uVar6 = *(uint *)(puVar3 + 0xd4);
      uVar7 = *(uint *)(puVar3 + 0xd8);
      uVar18 = 0;
    }
    if (uVar7 == (uVar6 + uVar17 ^ 0x3edd3b2d)) {
      uVar6 = uVar6 ^ uVar17;
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar6 = 0;
    }
    if ((int)uVar18 < (int)uVar6) {
      if (*(uint *)(puVar1 + 0x2c) ==
          (*(uint *)(puVar1 + 0x28) + *(uint *)(puVar1 + 0x24) ^ 0x3edd3b2d)) {
        uVar17 = *(uint *)(puVar1 + 0x28) ^ *(uint *)(puVar1 + 0x24);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar17 = 0;
      }
      uVar7 = rand();
      *(uint *)(puVar3 + 0xc4) = uVar7 ^ uVar17;
      *(uint *)(puVar3 + 200) = uVar7;
      *(uint *)(puVar3 + 0xcc) = (uVar7 ^ uVar17) + uVar7 ^ 0x3edd3b2d;
    }
    if (((*PTR_ins_00c40c88 & 1) == 0) &&
       (iVar5 = __cxa_guard_acquire(PTR_ins_00c40c88), puVar3 = PTR_ins_00c40c90, iVar5 != 0)) {
      *(undefined8 *)(PTR_ins_00c40c90 + 0x28) = 0;
      *(undefined4 *)(puVar3 + 0x34) = 0;
      *(undefined2 *)(puVar3 + 0x38) = 0;
      *(undefined2 *)(puVar3 + 4) = 0;
      *(undefined4 *)puVar3 = 0;
      *(undefined4 *)(puVar3 + 0x20) = 0;
      *(undefined8 *)(puVar3 + 0x10) = 0;
      *(undefined8 *)(puVar3 + 0x18) = 0;
      *(undefined8 *)(puVar3 + 8) = 0;
      __cxa_atexit(PTR__PlayService_00c40a30,puVar3,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_ins_00c40c88);
    }
    PlayService::SubmitScore((PlayService *)PTR_ins_00c40c90,0);
    CommonSystem::QuickSave();
    GameScene::ShowRetryBtn(*(GameScene **)PTR_g_GameScene_00c41fb0,true);
    pCVar10 = (Character *)User::Ins(puVar1[0x72]);
    Character::Revival(pCVar10);
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 004d5ecc to 004d5ed7 has its CatchHandler @ 004d63a8 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    puVar16 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x360);
    for (puVar15 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x358); puVar15 != puVar16;
        puVar15 = puVar15 + 1) {
      pCVar10 = (Character *)*puVar15;
      if (((((byte)pCVar10[0x41c5] >> 1 & 1) == 0) && (*(float *)(pCVar10 + 0x4288) <= 0.0)) &&
         (pCVar10[0x328] != (Character)0x0)) {
        Character::FadeOut(pCVar10);
      }
    }
  }
  if (*(int *)(this + 0x1c) == 3) {
    if (PTR_g_Common_00c44818[0x70] != '\0') {
      PTR_g_Common_00c44818[0x70] = 0;
      *(undefined4 *)(this + 0x1c) = 1;
    }
  }
  else {
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 004d5f88 to 004d5f93 has its CatchHandler @ 004d6398 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    fVar2 = DAT_00a19320;
    fVar23 = DAT_009c68a4;
    puVar16 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x360);
    puVar1 = PTR_g_Common_00c44818;
    for (puVar15 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x358);
        PTR_g_Common_00c44818 = puVar1, puVar15 != puVar16; puVar15 = puVar15 + 1) {
      plVar9 = (long *)*puVar15;
      if ((((*(byte *)((long)plVar9 + 0x41c5) >> 3 & 1) == 0) && (*(float *)(plVar9 + 0x851) <= 0.0)
          ) && ((char)plVar9[0x65] != '\0')) {
        fVar22 = (float)(**(code **)(*plVar9 + 0xe0))(plVar9);
        if (fVar2 <= fVar22) {
          fVar22 = (float)(**(code **)(*plVar9 + 0xe0))(plVar9);
          if (fVar22 <= fVar23) goto LAB_004d604c;
          pcVar14 = *(code **)(*plVar9 + 0xd8);
          fVar22 = fVar23;
        }
        else {
          pcVar14 = *(code **)(*plVar9 + 0xd8);
          fVar22 = fVar2;
        }
        (*pcVar14)(fVar22,plVar9);
      }
LAB_004d604c:
      puVar1 = PTR_g_Common_00c44818;
    }
    if (*(int *)(this + 0x14) == 0) {
      for (plVar9 = *(long **)(this + 0x20); plVar9 != *(long **)(this + 0x28); plVar9 = plVar9 + 1)
      {
        lVar13 = *plVar9;
        if (*(char *)(lVar13 + 0x328) != '\0') {
          uVar17 = *(uint *)(lVar13 + 0x41c4);
          if ((uVar17 >> 0xb & 1) == 0) {
            uVar17 = uVar17 >> 10 & 1;
          }
          else {
            if (**(int **)(lVar13 + 0x41c8) == 0x18) goto LAB_004d6314;
            uVar17 = uVar17 & 0x400;
          }
          if (uVar17 != 0) goto LAB_004d635c;
        }
LAB_004d6314:
      }
      iVar5 = *(int *)(this + 0x18);
      *(undefined4 *)(this + 0x14) = 6;
      *(int *)(this + 0x18) = iVar5 + 1;
      memset(acStack_dc,0,100);
      sprintf(acStack_dc,"Wave %d",iVar5 + 1);
      CommonSystem::SetTitle(acStack_dc);
    }
    else {
      plVar9 = (long *)User::Ins(puVar1[0x72]);
      (**(code **)(*plVar9 + 0xe0))();
      fVar23 = *(float *)(*(long *)PTR_g_scriptMgr_00c44dd0 + 0x30) + *(float *)(this + 0x10);
      *(float *)(this + 0x10) = fVar23;
      if (1.0 <= fVar23) {
        *(undefined4 *)(this + 0x10) = 0;
        *(int *)(this + 0x14) = *(int *)(this + 0x14) + -1;
        pCVar10 = (Character *)User::Ins(puVar1[0x72]);
        uVar11 = MyUtil::IntToStr(*(int *)(this + 0x14));
        Character::Talk(pCVar10,uVar11,2);
      }
      if (*(int *)(this + 0x14) == 0) {
        if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
           (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 004d6104 to 004d610f has its CatchHandler @ 004d63ac */
          StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
          __cxa_guard_release(PTR_stageMgr_00c43eb0);
        }
        puVar16 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x360);
        for (puVar15 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x358); puVar15 != puVar16;
            puVar15 = puVar15 + 1) {
          pCVar10 = (Character *)*puVar15;
          if (((((byte)pCVar10[0x41c5] >> 3 & 1) != 0) && (*(float *)(pCVar10 + 0x4288) <= 0.0)) &&
             (pCVar10[0x328] != (Character)0x0)) {
            Character::FadeOut(pCVar10);
          }
        }
        lVar13 = *(long *)(this + 0x20);
        lVar20 = *(long *)(this + 0x28);
        if (lVar20 != lVar13) {
          *(ulong *)(this + 0x28) = lVar20 + (~((lVar20 + -8) - lVar13) & 0xfffffffffffffff8U);
        }
        uVar11 = *(undefined8 *)(this + 8);
        if (0 < (int)uVar11) {
          iVar5 = 0;
          iVar19 = 1;
          do {
            iVar12 = (int)uVar11;
            if (iVar12 < 0) {
              iVar12 = iVar12 + 1;
            }
            uVar21 = 0xfffffdda;
            if (iVar5 < iVar12 >> 1) {
              uVar21 = 0x226;
            }
            if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
               (iVar8 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar8 != 0)) {
                    /* try { // try from 004d6200 to 004d620b has its CatchHandler @ 004d6394 */
              StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
              __cxa_guard_release(PTR_stageMgr_00c43eb0);
            }
            uVar24 = *(undefined4 *)(&DAT_00a1932c + (ulong)(iVar5 < iVar12 >> 1) * 4);
            pCVar10 = (Character *)
                      Stage::CreateMob(*(Stage **)PTR_stageMgr_00c430c8,*(undefined4 *)(this + 0xc),
                                       5,uVar21,0x96,0x48f);
            local_e8 = pCVar10;
            Character::AddMovePosition(uVar24,0,pCVar10,7);
            if (*(long **)(this + 0x28) == *(long **)(this + 0x30)) {
              std::__ndk1::vector<Character*,std::__ndk1::allocator<Character*>>::
              __push_back_slow_path<Character*const&>
                        ((vector<Character*,std::__ndk1::allocator<Character*>> *)(this + 0x20),
                         &local_e8);
            }
            else {
              **(long **)(this + 0x28) = (long)pCVar10;
              *(long *)(this + 0x28) = *(long *)(this + 0x28) + 8;
            }
            *(int *)(pCVar10 + 0x324) = iVar19;
            uVar11 = *(undefined8 *)(this + 8);
            bVar4 = iVar19 != 1;
            iVar19 = 3;
            if (bVar4) {
              iVar19 = 1;
            }
            iVar5 = iVar5 + 1;
          } while (iVar5 < (int)uVar11);
        }
        iVar5 = (int)((ulong)uVar11 >> 0x20);
        *(int *)(this + 0xc) = iVar5 + 1;
        lVar20 = *(long *)PTR___stack_chk_guard_00c419a0;
        if (4 < iVar5) {
          *(int *)(this + 8) = (int)uVar11 + 1;
          *(undefined4 *)(this + 0xc) = 1;
        }
      }
    }
  }
LAB_004d635c:
  if (lVar20 != local_78) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayBGM
###########################################################################

========================================
FUNCTION: Run
ADDRESS: 004d7230
========================================

/* ActionTraning::Run() */

undefined8 __thiscall ActionTraning::Run(ActionTraning *this)

{
  undefined4 uVar1;
  undefined8 *puVar2;
  long *plVar3;
  undefined *puVar4;
  undefined *puVar5;
  undefined *puVar6;
  bool bVar7;
  uint uVar8;
  uint uVar9;
  uint uVar10;
  int iVar11;
  int iVar12;
  int iVar13;
  User *this_00;
  DropingItem *pDVar14;
  Vec2 *pVVar15;
  char *pcVar16;
  undefined8 uVar17;
  ulong uVar18;
  long *plVar19;
  long *plVar21;
  long *plVar20;
  long lVar22;
  uint uVar23;
  undefined8 *puVar24;
  Character *pCVar25;
  Stage *this_01;
  long lVar26;
  float fVar27;
  float fVar28;
  Character *local_178;
  undefined8 local_170;
  char acStack_168 [256];
  long local_68;
  
  puVar6 = PTR_g_Common_00c44818;
  puVar4 = PTR_g_UserData_00c41478;
  lVar26 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_68 = lVar26;
  switch(*(undefined4 *)(this + 8)) {
  case 0:
    *(undefined4 *)(this + 8) = 1;
    puVar4 = PTR_g_Common_00c44818;
    this_00 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
    User::SetTrainingAbility(this_00);
    lVar22 = User::Ins(puVar4[0x72]);
    *(long *)(this + 0x20) = lVar22;
    *(uint *)(lVar22 + 0x41c4) = *(uint *)(lVar22 + 0x41c4) | 0x400000;
    if (((*PTR_joy_00c41bc0 & 1) == 0) &&
       (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d72e8 to 004d72f3 has its CatchHandler @ 004d8330 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,0xb,1);
    puVar6 = PTR_stageMgr_00c43eb0;
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar13 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar13 != 0)) {
                    /* try { // try from 004d7354 to 004d735f has its CatchHandler @ 004d8334 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    puVar5 = PTR_stageMgr_00c430c8;
    lVar22 = *(long *)PTR_stageMgr_00c430c8;
    *(undefined4 *)(lVar22 + 0x3dc) = 0x44480000;
    *(undefined4 *)(lVar22 + 0x3d8) = 0x3f800000;
    if (((*puVar6 & 1) == 0) && (iVar13 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar13 != 0))
    {
                    /* try { // try from 004d73a4 to 004d73af has its CatchHandler @ 004d8338 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    *(undefined1 *)(*(long *)puVar5 + 0x32c) = 1;
    pcVar16 = (char *)GameMsg::Get(3,0);
    CommonSystem::SetTitle(pcVar16);
    SndMgr::PlayBGM(0);
    if (((*puVar6 & 1) == 0) && (iVar13 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar13 != 0))
    {
                    /* try { // try from 004d73fc to 004d7407 has its CatchHandler @ 004d833c */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    lVar22 = Stage::CreateMob(*(Stage **)puVar5,4,5,400,200,0x108000);
    *(long *)(this + 0x28) = lVar22;
    *(undefined4 *)(lVar22 + 0x324) = 0xffffffff;
    Character::Equip(*(Character **)(this + 0x20),0,0,0xffffffff);
    Character::Fill(*(Character **)(this + 0x20),true);
    iVar13 = rand();
    *(int *)(puVar4 + 0x24) = iVar13;
    *(int *)(puVar4 + 0x28) = iVar13;
    *(uint *)(puVar4 + 0x2c) = iVar13 << 1 ^ 0x3edd3b2d;
    uVar8 = rand();
    *(uint *)(puVar4 + 0x58) = uVar8 ^ 3;
    *(uint *)(puVar4 + 0x5c) = uVar8;
    *(uint *)(puVar4 + 0x60) = (uVar8 ^ 3) + uVar8 ^ 0x3edd3b2d;
    *(undefined4 *)(this + 0xc) = 0;
    *(undefined4 *)(this + 0x10) = 0;
    *(undefined4 *)(this + 0x14) = 0;
    *(undefined4 *)(this + 0x18) = 0xffffffff;
    *(undefined4 *)(this + 0x1c) = 0x3fc00000;
    puVar4 = PTR_g_GameScene_00c41fb0;
    GameScene::ResetHeart(*(GameScene **)PTR_g_GameScene_00c41fb0);
    GameScene::UpdateArenaPoint(*(GameScene **)puVar4);
    local_170 = 0x42c8000000000000;
    (**(code **)(**(long **)(this + 0x20) + 0x98))(*(long **)(this + 0x20),&local_170);
    Character::SetMovePosition(DAT_009c48f0,DAT_009c4880,*(undefined8 *)(this + 0x20),5);
    break;
  default:
    if (*(uint *)(PTR_g_Common_00c44818 + 0x60) ==
        (*(int *)(PTR_g_Common_00c44818 + 0x5c) + *(int *)(PTR_g_Common_00c44818 + 0x58) ^
        0x3edd3b2dU)) {
      if (*(int *)(PTR_g_Common_00c44818 + 0x5c) != *(int *)(PTR_g_Common_00c44818 + 0x58)) {
        fVar27 = (float)(**(code **)(**(long **)(this + 0x20) + 0xe0))();
        fVar28 = (float)(**(code **)(**(long **)(this + 0x28) + 0xe0))();
        Character::SetDirection(*(Character **)(this + 0x28),fVar28 <= fVar27,0);
        if (*(int *)(this + 8) == 2) {
          if (*(float *)(*(long *)(*(long *)(this + 0x28) + 0x4298) + 0x334) < 0.5) {
            *(undefined4 *)(this + 8) = 3;
          }
          break;
        }
        fVar27 = *(float *)(this + 0xc);
        if (*(int *)(this + 8) == 1) {
          fVar27 = *(float *)(*(long *)PTR_g_scriptMgr_00c44dd0 + 0x30) + fVar27;
          *(float *)(this + 0xc) = fVar27;
          if (fVar27 <= 1.0) break;
          pCVar25 = *(Character **)(this + 0x28);
          *(undefined8 *)(this + 8) = 2;
          uVar17 = GameMsg::Get(0x3b,0);
        }
        else {
          bVar7 = *(float *)(*(long *)(*(long *)(this + 0x28) + 0x4298) + 0x334) < 0.5;
          if (*(int *)(this + 0x10) == 0) {
            if (bVar7) {
              iVar11 = GameMsg::GetTypeSize(0x3c);
              iVar12 = rand();
              pCVar25 = *(Character **)(this + 0x28);
              iVar13 = 0;
              if (iVar11 != 0) {
                iVar13 = iVar12 / iVar11;
              }
              uVar17 = GameMsg::Get(0x3c,iVar12 - iVar13 * iVar11);
              Character::Talk(pCVar25,uVar17,1);
              fVar27 = *(float *)(this + 0xc);
            }
            fVar27 = fVar27 - *(float *)(*(long *)PTR_g_scriptMgr_00c44dd0 + 0x30);
            *(float *)(this + 0xc) = fVar27;
            if (0.0 < fVar27) break;
            *(undefined4 *)(this + 0xc) = *(undefined4 *)(this + 0x1c);
            if (*(int *)(this + 0x14) != 0) {
              *(int *)(this + 0x14) = *(int *)(this + 0x14) + -1;
              uVar1 = 0x1000050f;
              if (*(int *)(this + 0x18) != 4) {
                uVar1 = 0x1000040f;
              }
              if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
                 (iVar13 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar13 != 0)) {
                    /* try { // try from 004d7e68 to 004d7e73 has its CatchHandler @ 004d8378 */
                StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
                __cxa_guard_release(PTR_stageMgr_00c43eb0);
              }
              pCVar25 = (Character *)
                        Stage::CreateMob(*(Stage **)PTR_stageMgr_00c430c8,1,
                                         *(undefined4 *)
                                          (&DAT_00a19390 + (long)*(int *)(this + 0x18) * 4),900,100,
                                         uVar1);
              local_178 = pCVar25;
              if (*(int *)(this + 0x18) == 1) {
                Character::Equip(pCVar25,3,4,0xffffffff);
                Character::Equip(pCVar25,5,4,0xffffffff);
              }
              *(undefined4 *)(pCVar25 + 0x324) = 7;
              if (*(undefined8 **)(this + 0x38) == *(undefined8 **)(this + 0x40)) {
                std::__ndk1::vector<Character*,std::__ndk1::allocator<Character*>>::
                __push_back_slow_path<Character*const&>
                          ((vector<Character*,std::__ndk1::allocator<Character*>> *)(this + 0x30),
                           &local_178);
              }
              else {
                **(undefined8 **)(this + 0x38) = pCVar25;
                *(long *)(this + 0x38) = *(long *)(this + 0x38) + 8;
              }
              break;
            }
            plVar19 = *(long **)(this + 0x30);
            plVar3 = *(long **)(this + 0x38);
            if (plVar19 != plVar3) {
              plVar20 = plVar19;
              do {
                plVar21 = plVar20 + 1;
                if (*(char *)(*plVar20 + 0x328) != '\0') goto LAB_004d7c9c;
                plVar20 = plVar21;
              } while (plVar3 != plVar21);
              if (plVar19 != plVar3) {
                *(ulong *)(this + 0x38) =
                     (long)plVar3 + (~((long)plVar3 + (-8 - (long)plVar19)) & 0xfffffffffffffff8U);
              }
            }
            iVar11 = *(int *)(this + 0x18);
            *(undefined8 *)(this + 0x10) = 0x500000003;
            iVar13 = iVar11 + 1;
            *(int *)(this + 0x18) = iVar13;
            puVar4 = PTR_joy_00c41bc0;
            fVar28 = DAT_009c57b4;
            fVar27 = DAT_009c55a8;
            if (iVar11 < 4) {
              switch(iVar13) {
              case 0:
                goto switchD_004d8040_caseD_0;
              case 1:
                *(float *)(this + 0x1c) = *(float *)(this + 0x1c) + 0.25;
                Character::UnEquip(*(Character **)(this + 0x20),1,0);
                break;
              case 2:
                Character::UnEquip(*(Character **)(this + 0x20),0,0);
                break;
              case 3:
                if (((*PTR_joy_00c41bc0 & 1) == 0) &&
                   (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d809c to 004d80a7 has its CatchHandler @ 004d837c */
                  GameUI::GameUI((GameUI *)PTR_joy_00c42890);
                  __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
                  __cxa_guard_release(PTR_joy_00c41bc0);
                }
                GameUI::SetVisible((GameUI *)PTR_joy_00c42890,1,0);
                if (((*puVar4 & 1) == 0) &&
                   (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d8100 to 004d810b has its CatchHandler @ 004d8380 */
                  GameUI::GameUI((GameUI *)PTR_joy_00c42890);
                  __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
                  __cxa_guard_release(PTR_joy_00c41bc0);
                }
                GameUI::SetVisible((GameUI *)PTR_joy_00c42890,2,0);
                if (((*puVar4 & 1) == 0) &&
                   (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d8164 to 004d816f has its CatchHandler @ 004d8384 */
                  GameUI::GameUI((GameUI *)PTR_joy_00c42890);
                  __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
                  __cxa_guard_release(PTR_joy_00c41bc0);
                }
                GameUI::SetVisible((GameUI *)PTR_joy_00c42890,3,0);
                break;
              case 4:
                if (((*PTR_joy_00c41bc0 & 1) == 0) &&
                   (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d81d4 to 004d81df has its CatchHandler @ 004d8388 */
                  GameUI::GameUI((GameUI *)PTR_joy_00c42890);
                  __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
                  __cxa_guard_release(PTR_joy_00c41bc0);
                }
                GameUI::SetVisible((GameUI *)PTR_joy_00c42890,1,1);
                if (((*puVar4 & 1) == 0) &&
                   (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d8238 to 004d8243 has its CatchHandler @ 004d838c */
                  GameUI::GameUI((GameUI *)PTR_joy_00c42890);
                  __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
                  __cxa_guard_release(PTR_joy_00c41bc0);
                }
                GameUI::SetVisible((GameUI *)PTR_joy_00c42890,2,1);
                if (((*puVar4 & 1) == 0) &&
                   (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d82a0 to 004d82ab has its CatchHandler @ 004d8390 */
                  GameUI::GameUI((GameUI *)PTR_joy_00c42890);
                  __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
                  __cxa_guard_release(PTR_joy_00c41bc0);
                }
                GameUI::SetVisible((GameUI *)PTR_joy_00c42890,3,1);
                Character::Equip(*(Character **)(this + 0x20),0,0,0xffffffff);
                Character::Equip(*(Character **)(this + 0x20),1,0,0xffffffff);
                *(undefined4 *)(this + 0x14) = 1;
              }
            }
            else {
              *(undefined4 *)(this + 0x18) = 0;
              fVar27 = *(float *)(this + 0x1c) + fVar27;
              if (fVar27 <= fVar28) {
                fVar27 = fVar28;
              }
              *(float *)(this + 0x1c) = fVar27;
switchD_004d8040_caseD_0:
              Character::Equip(*(Character **)(this + 0x20),1,0,0xffffffff);
              (**(code **)(**(long **)(this + 0x20) + 0x660))
                        (DAT_009c4880,*(long **)(this + 0x20),2);
            }
            Character::Stand(*(Character **)(this + 0x20),true);
            pCVar25 = *(Character **)(this + 0x28);
            uVar17 = GameMsg::Get(0x3b,*(int *)(this + 0x18) + 1);
            Character::Talk(pCVar25,uVar17,2);
            GameScene::ShowHintBtn
                      (*(GameScene **)PTR_g_GameScene_00c41fb0,*(int *)(this + 0x18) + 9);
            break;
          }
          if (!bVar7) break;
          fVar27 = *(float *)(*(long *)PTR_g_scriptMgr_00c44dd0 + 0x30) + fVar27;
          *(float *)(this + 0xc) = fVar27;
          if (fVar27 < 1.0) break;
          pCVar25 = *(Character **)(this + 0x20);
          iVar13 = *(int *)(this + 0x10) + -1;
          *(undefined4 *)(this + 0xc) = 0;
          *(int *)(this + 0x10) = iVar13;
          uVar17 = MyUtil::IntToStr(iVar13);
        }
LAB_004d78b0:
        Character::Talk(pCVar25,uVar17,2);
        break;
      }
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
    pCVar25 = *(Character **)(this + 0x28);
    *(undefined4 *)(this + 8) = 9;
    uVar17 = GameMsg::Get(0x3d,0);
    Character::Talk(pCVar25,uVar17,2);
    plVar3 = *(long **)(this + 0x38);
    for (plVar19 = *(long **)(this + 0x30); plVar19 != plVar3; plVar19 = plVar19 + 1) {
      lVar22 = *plVar19;
      *(undefined4 *)(lVar22 + 0x324) = 0xffffffff;
      *(uint *)(lVar22 + 0x41c4) = *(uint *)(lVar22 + 0x41c4) | 0x100000;
    }
    if (*(uint *)(puVar6 + 0x2c) ==
        (*(uint *)(puVar6 + 0x28) + *(uint *)(puVar6 + 0x24) ^ 0x3edd3b2d)) {
      uVar8 = *(uint *)(puVar6 + 0x28) ^ *(uint *)(puVar6 + 0x24);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar8 = 0;
    }
    uVar9 = rand();
    puVar4 = PTR_g_UserData_00c41478;
    uVar8 = uVar9 ^ uVar8;
    uVar10 = uVar8 + uVar9 ^ 0x3edd3b2d;
    *(uint *)(PTR_g_UserData_00c41478 + 0xe8) = uVar8;
    *(uint *)(puVar4 + 0xec) = uVar9;
    *(uint *)(puVar4 + 0xf0) = uVar10;
    if (*(uint *)(puVar4 + 0xe4) ==
        (*(uint *)(puVar4 + 0xe0) + *(uint *)(puVar4 + 0xdc) ^ 0x3edd3b2d)) {
      uVar23 = *(uint *)(puVar4 + 0xe0) ^ *(uint *)(puVar4 + 0xdc);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar8 = *(uint *)(puVar4 + 0xe8);
      uVar9 = *(uint *)(puVar4 + 0xec);
      uVar10 = *(uint *)(puVar4 + 0xf0);
      uVar23 = 0;
    }
    if (uVar10 == (uVar9 + uVar8 ^ 0x3edd3b2d)) {
      uVar9 = uVar9 ^ uVar8;
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar9 = 0;
    }
    if ((int)uVar23 < (int)uVar9) {
      if (*(uint *)(puVar6 + 0x2c) ==
          (*(uint *)(puVar6 + 0x28) + *(uint *)(puVar6 + 0x24) ^ 0x3edd3b2d)) {
        uVar8 = *(uint *)(puVar6 + 0x28) ^ *(uint *)(puVar6 + 0x24);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar8 = 0;
      }
      uVar10 = rand();
      *(uint *)(puVar4 + 0xdc) = uVar10 ^ uVar8;
      *(uint *)(puVar4 + 0xe0) = uVar10;
      *(uint *)(puVar4 + 0xe4) = (uVar10 ^ uVar8) + uVar10 ^ 0x3edd3b2d;
    }
    if ((*PTR_ins_00c40c88 & 1) == 0) {
      iVar13 = __cxa_guard_acquire(PTR_ins_00c40c88);
      puVar4 = PTR_ins_00c40c90;
      if (iVar13 != 0) {
        *(undefined8 *)(PTR_ins_00c40c90 + 0x28) = 0;
        *(undefined4 *)(puVar4 + 0x34) = 0;
        *(undefined2 *)(puVar4 + 0x38) = 0;
        *(undefined2 *)(puVar4 + 4) = 0;
        *(undefined4 *)puVar4 = 0;
        *(undefined4 *)(puVar4 + 0x20) = 0;
        *(undefined8 *)(puVar4 + 0x10) = 0;
        *(undefined8 *)(puVar4 + 0x18) = 0;
        *(undefined8 *)(puVar4 + 8) = 0;
        __cxa_atexit(PTR__PlayService_00c40a30,puVar4,PTR_DAT_00c41ab0);
        __cxa_guard_release(PTR_ins_00c40c88);
      }
    }
    PlayService::SubmitScore((PlayService *)PTR_ins_00c40c90,1);
    puVar4 = PTR_joy_00c41bc0;
    if (((*PTR_joy_00c41bc0 & 1) == 0) &&
       (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d7b8c to 004d7b97 has its CatchHandler @ 004d8340 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,1,1);
    if (((*puVar4 & 1) == 0) && (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d7bf0 to 004d7bfb has its CatchHandler @ 004d8344 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,2,1);
    if (((*puVar4 & 1) == 0) && (iVar13 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar13 != 0)) {
                    /* try { // try from 004d7c54 to 004d7c5f has its CatchHandler @ 004d8348 */
      GameUI::GameUI((GameUI *)PTR_joy_00c42890);
      __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
      __cxa_guard_release(PTR_joy_00c41bc0);
    }
    GameUI::SetVisible((GameUI *)PTR_joy_00c42890,3,1);
    break;
  case 9:
    if (0.5 <= *(float *)(*(long *)(*(long *)(this + 0x28) + 0x4298) + 0x334)) break;
    puVar2 = *(undefined8 **)(this + 0x38);
    for (puVar24 = *(undefined8 **)(this + 0x30); puVar24 != puVar2; puVar24 = puVar24 + 1) {
      Character::FadeOut((Character *)*puVar24);
    }
    memset(acStack_168,0,0x100);
    pcVar16 = (char *)GameMsg::Get(0x3d,1);
    if (*(uint *)(PTR_g_Common_00c44818 + 0x2c) ==
        (*(uint *)(PTR_g_Common_00c44818 + 0x28) + *(uint *)(PTR_g_Common_00c44818 + 0x24) ^
        0x3edd3b2d)) {
      uVar18 = (ulong)(*(uint *)(PTR_g_Common_00c44818 + 0x28) ^
                      *(uint *)(PTR_g_Common_00c44818 + 0x24));
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar18 = 0;
    }
    sprintf(acStack_168,pcVar16,uVar18);
    goto LAB_004d7aa0;
  case 10:
    pCVar25 = *(Character **)(this + 0x28);
    if (0.5 <= *(float *)(*(long *)(pCVar25 + 0x4298) + 0x334)) break;
    *(undefined4 *)(this + 8) = 0xb;
    if (*(uint *)(puVar6 + 0x2c) ==
        (*(uint *)(puVar6 + 0x28) + *(uint *)(puVar6 + 0x24) ^ 0x3edd3b2d)) {
      uVar8 = *(uint *)(puVar6 + 0x28) ^ *(uint *)(puVar6 + 0x24);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar8 = 0;
    }
    uVar17 = GameData::TrainingResult(uVar8);
    goto LAB_004d78b0;
  case 0xb:
    if (0.5 <= *(float *)(*(long *)(*(long *)(this + 0x28) + 0x4298) + 0x334)) break;
    iVar13 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
    if (*(uint *)(puVar4 + 0x30) ==
        (*(uint *)(puVar4 + 0x2c) + *(uint *)(puVar4 + 0x28) ^ 0x3edd3b2d)) {
      uVar8 = *(uint *)(puVar4 + 0x2c) ^ *(uint *)(puVar4 + 0x28);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar8 = 0;
    }
    iVar13 = GameData::GetBaseGold(iVar13,uVar8);
    puVar6 = PTR_g_Common_00c44818;
    uVar10 = *(uint *)(PTR_g_Common_00c44818 + 0x24);
    uVar9 = *(uint *)(PTR_g_Common_00c44818 + 0x28);
    uVar8 = uVar9 + uVar10 ^ 0x3edd3b2d;
    if (*(uint *)(PTR_g_Common_00c44818 + 0x2c) == uVar8) {
      uVar23 = uVar9 ^ uVar10;
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar10 = *(uint *)(puVar6 + 0x24);
      uVar9 = *(uint *)(puVar6 + 0x28);
      uVar8 = *(uint *)(puVar6 + 0x2c);
      uVar23 = 0;
    }
    if (uVar8 == (uVar9 + uVar10 ^ 0x3edd3b2d)) {
      fVar27 = (float)(int)(uVar9 ^ uVar10);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      fVar27 = 0.0;
    }
    fVar28 = (float)GameData::GetTrainingExp();
    fVar27 = fVar27 * fVar28 * 0.5;
    if (*(uint *)(puVar4 + 0x78) ==
        (*(uint *)(puVar4 + 0x74) + *(uint *)(puVar4 + 0x70) ^ 0x3edd3b2d)) {
      uVar8 = *(uint *)(puVar4 + 0x74) ^ *(uint *)(puVar4 + 0x70);
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar8 = 0;
    }
    iVar11 = GameData::GetLevelUpExp(uVar8);
    UserData::AddExp((UserData *)PTR_g_UserData_00c41478,fVar27);
    pDVar14 = operator_new(0x560);
                    /* try { // try from 004d79e4 to 004d79ef has its CatchHandler @ 004d831c */
    InstantItem::InstantItem((InstantItem *)pDVar14,5,uVar23 * iVar13);
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar12 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar12 != 0)) {
                    /* try { // try from 004d7a14 to 004d7a1f has its CatchHandler @ 004d8360 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    fVar27 = (fVar27 / (float)iVar11) * DAT_009c4880;
    this_01 = *(Stage **)PTR_stageMgr_00c430c8;
    pVVar15 = (Vec2 *)(**(code **)(**(long **)(this + 0x28) + 0xb0))();
    Stage::DropItem(this_01,pDVar14,pVVar15,true);
    memset(acStack_168,0,0x100);
    pcVar16 = (char *)GameMsg::Get(0x3d,2);
    sprintf(acStack_168,pcVar16,(double)fVar27,(ulong)(uVar23 * iVar13));
LAB_004d7aa0:
    Character::Talk(*(Character **)(this + 0x28),acStack_168,2);
    *(int *)(this + 8) = *(int *)(this + 8) + 1;
    break;
  case 0xc:
    pCVar25 = *(Character **)(this + 0x28);
    if (*(float *)(*(long *)(pCVar25 + 0x4298) + 0x334) < 0.5) {
      uVar17 = GameMsg::Get(0x3d,3);
      Character::Talk(pCVar25,uVar17,2);
      *(int *)(this + 8) = *(int *)(this + 8) + 1;
      GameScene::ShowRetryBtn(*(GameScene **)PTR_g_GameScene_00c41fb0,true);
    }
    break;
  case 0xd:
    if (PTR_g_Common_00c44818[0x70] != '\0') {
      PTR_g_Common_00c44818[0x70] = 0;
      Character::Equip(*(Character **)(this + 0x20),0,0,0xffffffff);
      Character::Fill(*(Character **)(this + 0x20),true);
      iVar13 = rand();
      *(int *)(puVar6 + 0x24) = iVar13;
      *(int *)(puVar6 + 0x28) = iVar13;
      *(uint *)(puVar6 + 0x2c) = iVar13 << 1 ^ 0x3edd3b2d;
      uVar8 = rand();
      *(uint *)(puVar6 + 0x58) = uVar8 ^ 3;
      *(uint *)(puVar6 + 0x5c) = uVar8;
      *(uint *)(puVar6 + 0x60) = (uVar8 ^ 3) + uVar8 ^ 0x3edd3b2d;
      *(undefined4 *)(this + 0xc) = 0;
      *(undefined4 *)(this + 0x10) = 0;
      *(undefined4 *)(this + 0x14) = 0;
      *(undefined4 *)(this + 0x18) = 0xffffffff;
      *(undefined4 *)(this + 0x1c) = 0x3fc00000;
      puVar4 = PTR_g_GameScene_00c41fb0;
      GameScene::ResetHeart(*(GameScene **)PTR_g_GameScene_00c41fb0);
      GameScene::UpdateArenaPoint(*(GameScene **)puVar4);
      *(undefined4 *)(this + 8) = 2;
    }
  }
LAB_004d7c9c:
  if (lVar26 != local_68) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: PlayEffect
ADDRESS: 00414840
========================================

void SndMgr::PlayEffect(void)

{
  (*(code *)PTR_PlayEffect_00c37b08)();
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Run
ADDRESS: 00437244
========================================

/* ActionSound::Run() */

undefined8 __thiscall ActionSound::Run(ActionSound *this)

{
  SndMgr::PlayEffect(*(undefined4 *)(this + 8));
  return 1;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: SetCrowdControl
ADDRESS: 0044941c
========================================

/* Character::SetCrowdControl(CrowdControlType, float) */

void __thiscall Character::SetCrowdControl(undefined4 param_1,Character *this,int param_3)

{
  Character *pCVar1;
  Character *pCVar2;
  int iVar3;
  Electric *this_00;
  Ice *this_01;
  Size *this_02;
  undefined8 uVar4;
  long *plVar5;
  long lVar6;
  long lVar7;
  long lVar8;
  code *pcVar9;
  undefined1 local_80 [8];
  long local_78;
  
  lVar8 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_78 = lVar8;
  if (param_3 == -1) {
    *(undefined4 *)(this + 0x42bc) = 0;
    *(undefined8 *)(this + 0x42b4) = 0;
  }
  else if ((((byte)this[0x41c5] & 1) == 0) && (*(float *)(this + 0x4284) == 0.0)) {
    pCVar1 = this + 0x41c4;
    if (param_3 == 2) {
      if (*(float *)(this + 0x42bc) != 0.0) goto LAB_004497d4;
      if (*(Ice **)(this + 0x42d8) == (Ice *)0x0) {
        lVar7 = 0;
LAB_00449608:
        do {
          lVar6 = lVar7;
          if (lVar6 == 2) {
            lVar7 = 3;
            if (((byte)*pCVar1 >> 5 & 1) == 0) goto LAB_00449608;
          }
          this_01 = operator_new(0x540);
                    /* try { // try from 0044962c to 00449633 has its CatchHandler @ 00449808 */
          Effect::Ice::Ice(this_01,false);
          *(Ice **)(this + lVar6 * 8 + 0x42d8) = this_01;
          iVar3 = (&DAT_009c4b60)[lVar6];
          (**(code **)(*(long *)(this + (long)iVar3 * 0x530 + 0x340) + 0x210))
                    (this + (long)iVar3 * 0x530 + 0x340,this_01,0x68);
          plVar5 = *(long **)(this + lVar6 * 8 + 0x42d8);
          pcVar9 = *(code **)(*plVar5 + 0x98);
          this_02 = (Size *)(**(code **)(*(long *)(this + (long)iVar3 * 0x530 + 0x340) + 0x168))
                                      (this + (long)iVar3 * 0x530 + 0x340);
          cocos2d::Size::operator/(this_02,2.0);
          (*pcVar9)(plVar5,local_80);
          lVar7 = lVar6 + 1;
        } while (lVar6 + 1 < 6);
        (**(code **)(**(long **)(this + 0x42e0) + 0x80))(0x3fc00000);
        if (((byte)*pCVar1 >> 5 & 1) != 0) {
          (**(code **)(**(long **)(this + 0x42e8) + 0x60))(0x3fc00000);
          (**(code **)(**(long **)(this + 0x42e8) + 0xe8))(0x41f00000);
        }
      }
      else {
        Effect::Ice::Run(*(Ice **)(this + 0x42d8));
        if (*(Ice **)(this + 0x42e0) != (Ice *)0x0) {
          Effect::Ice::Run(*(Ice **)(this + 0x42e0));
        }
        if (*(Ice **)(this + 0x42e8) != (Ice *)0x0) {
          Effect::Ice::Run(*(Ice **)(this + 0x42e8));
        }
        if (*(Ice **)(this + 0x42f0) != (Ice *)0x0) {
          Effect::Ice::Run(*(Ice **)(this + 0x42f0));
        }
        if (*(Ice **)(this + 0x42f8) != (Ice *)0x0) {
          Effect::Ice::Run(*(Ice **)(this + 0x42f8));
        }
        if (*(Ice **)(this + 0x4300) != (Ice *)0x0) {
          Effect::Ice::Run(*(Ice **)(this + 0x4300));
        }
      }
      SndMgr::PlayEffect(0x1a);
      *(undefined4 *)(this + 0x42bc) = 0x40200000;
    }
    else if (param_3 == 1) {
      *(undefined4 *)(this + 0x42b8) = 0x40000000;
      *(undefined4 *)(this + 0x42c0) = param_1;
    }
    else if (param_3 == 0) {
      pCVar2 = this + 0x42b4;
      if (*(float *)pCVar2 != 0.0) goto LAB_004497d4;
      SndMgr::PlayEffect(0x1d);
      SetMotion(this,0x14,1);
      MonsterRandomTalk(this,0x26,100,0);
      *(undefined4 *)pCVar2 = param_1;
      this_00 = (Electric *)
                (**(code **)(**(long **)(this + 0x330) + 0x228))(*(long **)(this + 0x330),0x65);
      if (this_00 == (Electric *)0x0) {
        this_00 = operator_new(0x540);
                    /* try { // try from 00449508 to 0044950f has its CatchHandler @ 0044981c */
        Effect::Electric::Electric(this_00,false);
        (**(code **)(*(long *)this_00 + 0xe8))(DAT_009c4880,this_00);
        (**(code **)(*(long *)this_00 + 0x60))(DAT_009c4884,this_00);
        (**(code **)(**(long **)(this + 0x330) + 0x218))(*(long **)(this + 0x330),this_00,10,0x65);
      }
      Effect::Electric::Run(this_00,*(float *)pCVar2);
    }
    if ((*(uint *)pCVar1 >> 0x12 & 1) == 0) {
      if ((*(uint *)pCVar1 >> 0xb & 1) == 0) {
        if (*(float *)(this + 0x4284) <= 0.0) {
          if (*(float *)(this + 0x42b8) == 0.0) {
            uVar4 = 0x10;
            if (*(float *)(this + 0x42bc) != 0.0) {
              *(undefined4 *)(this + 0x42b0) = 0x10;
              uVar4 = 7;
            }
          }
          else {
            *(undefined4 *)(this + 0x42b0) = 0x10;
            uVar4 = 6;
          }
        }
        else {
          uVar4 = 1;
        }
      }
      else {
        uVar4 = 0xc;
      }
    }
    else {
      uVar4 = 0x11;
    }
    uVar4 = GetColor(uVar4);
    (**(code **)(*(long *)this + 0x4c0))(this,uVar4);
    this = this + 0x340;
    lVar7 = 0xc;
    do {
      plVar5 = (long *)(**(code **)(*(long *)this + 0x228))(this,0);
      if (plVar5 != (long *)0x0) {
        (**(code **)(*plVar5 + 0x4c0))(plVar5,uVar4);
      }
      lVar7 = lVar7 + -1;
      this = this + 0x530;
    } while (lVar7 != 0);
  }
LAB_004497d4:
  if (lVar8 != local_78) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: DestroyEquipment
ADDRESS: 0044c34c
========================================

/* Character::DestroyEquipment(BodyType, bool) */

void __thiscall Character::DestroyEquipment(Character *this,int param_2,uint param_3)

{
  int iVar1;
  Sprite *pSVar2;
  
  pSVar2 = (Sprite *)
           (**(code **)(*(long *)(this + (long)param_2 * 0x530 + 0x340) + 0x228))
                     (this + (long)param_2 * 0x530 + 0x340,1);
  if (pSVar2 != (Sprite *)0x0) {
    (**(code **)(*(long *)pSVar2 + 0x170))(pSVar2,0);
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar1 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar1 != 0)) {
                    /* try { // try from 0044c3bc to 0044c3c7 has its CatchHandler @ 0044c408 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    Stage::MakeBreakingSprite(*(Stage **)PTR_stageMgr_00c430c8,pSVar2);
    if ((param_3 & 1) != 0) {
      SndMgr::PlayEffect(8);
      return;
    }
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: IdleTalk
ADDRESS: 0044c440
========================================

/* Character::IdleTalk() */

void __thiscall Character::IdleTalk(Character *this)

{
  uint uVar1;
  int iVar2;
  int iVar3;
  
  if ((*(uint *)(this + 0x41c4) & 0x40400) != 0x400) {
    return;
  }
  iVar3 = *(int *)(this + 0x4204);
  if (iVar3 < 3) {
    iVar2 = rand();
    iVar3 = (iVar2 / 3) * 3;
  }
  else {
    iVar2 = rand();
    if (iVar3 != 3) {
      iVar3 = iVar2 % 3 + 0x25;
      goto LAB_0044c508;
    }
    iVar3 = (iVar2 / 5) * 5;
  }
  iVar3 = (iVar2 - iVar3) + 0x23;
LAB_0044c508:
  SetMotion(this,iVar3,0);
  uVar1 = *(uint *)(this + 0x41c4);
  if (iVar3 + -0x23 == 0) {
    if (((uVar1 >> 0xb & 1) == 0) && (*(float *)(this + 0x42bc) == 0.0)) {
      MsgBox::Show(*(MsgBox **)(this + 0x4298),"zzZ...",1);
      SetPosChatBalloon(this);
      return;
    }
  }
  else if ((uVar1 >> 0xc & 1) == 0) {
    rand();
    SndMgr::PlayEffect(iVar3 + -0x23);
    MonsterRandomTalk(this,iVar3 + -5,100,0);
    return;
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Taming
ADDRESS: 0044d958
========================================

/* Character::Taming() */

void __thiscall Character::Taming(Character *this)

{
  uint *puVar1;
  bool bVar2;
  undefined8 uVar3;
  long lVar4;
  int *piVar5;
  uint uVar6;
  long *plVar7;
  Character *pCVar8;
  code *pcVar9;
  
  lVar4 = *(long *)(this + 0x42a0);
  if (lVar4 == 0) {
    return;
  }
  puVar1 = (uint *)(lVar4 + 0x41c4);
  if (((byte)this[0x41c5] >> 1 & 1) == 0) {
    uVar6 = *puVar1 & 0xffffdfff;
    *puVar1 = uVar6;
  }
  else {
    uVar6 = *puVar1 | 0x2000;
    *puVar1 = uVar6;
    *(undefined4 *)(lVar4 + 800) = 0x40400000;
  }
  if ((uVar6 >> 0xc & 1) == 0) {
    bVar2 = ((byte)this[0x41c5] >> 2 & 1) != 0;
    if (bVar2) {
      *puVar1 = uVar6 | 0x400;
      plVar7 = *(long **)(lVar4 + 0x4188);
      pcVar9 = *(code **)(*plVar7 + 0x4c0);
    }
    else {
      *puVar1 = uVar6 & 0xfffffbff;
      plVar7 = *(long **)(lVar4 + 0x4188);
      pcVar9 = *(code **)(*plVar7 + 0x4c0);
    }
    uVar3 = GetColor(bVar2);
    (*pcVar9)(plVar7,uVar3);
  }
  pCVar8 = *(Character **)(this + 0x42a0);
  piVar5 = *(int **)(pCVar8 + 0x41c8);
  *(undefined4 *)(pCVar8 + 0x324) = 8;
  if (((piVar5 == (int *)0x0) || (*piVar5 == 0)) ||
     (-1 < *(char *)(*(long *)(piVar5 + 2) + (long)*(int *)(pCVar8 + 0x41d0) * 0x50 + 0x3c))) {
    SetMotion(pCVar8,0x22,0);
    pCVar8 = *(Character **)(this + 0x42a0);
  }
  lVar4 = (**(code **)(*(long *)pCVar8 + 0xb0))(pCVar8);
  plVar7 = (long *)(**(code **)(*(long *)pCVar8 + 0x260))(pCVar8);
  if (plVar7 != (long *)0x0) {
    (**(code **)(*plVar7 + 0x2a8))
              (plVar7,pCVar8,
               (*(uint *)(pCVar8 + 0x41c4) >> 0x19 & 1) +
               (int)(DAT_009c4888 - *(float *)(lVar4 + 4)));
  }
  *(undefined8 *)(this + 0x42a0) = 0;
  SndMgr::PlayEffect(0x10);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: BeHit
ADDRESS: 0044e19c
========================================

/* Character::BeHit(Direction, float, AttackType) */

float __thiscall Character::BeHit(float param_1,Character *this,int param_3,int param_4)

{
  Character *pCVar1;
  Character *pCVar2;
  uint uVar3;
  uint uVar4;
  bool bVar5;
  uint uVar6;
  int iVar7;
  long *plVar8;
  SkillItem *this_00;
  Defense *this_01;
  undefined8 uVar9;
  int *piVar10;
  undefined4 uVar11;
  float fVar12;
  float fVar13;
  
  pCVar1 = this + 0x41c4;
  *(uint *)pCVar1 = *(uint *)pCVar1 & 0xffff7fbf;
  *(undefined4 *)(this + 0x42ac) = 0;
  (**(code **)(**(long **)(this + 0x4188) + 0x170))(*(long **)(this + 0x4188),1);
  (**(code **)(**(long **)(this + 0x4198) + 0x170))(*(long **)(this + 0x4198),1);
  if (*(int *)(this + 0x324) - 2U < 2) {
    *(undefined4 *)(this + 0x324) = 1;
  }
  else if ((*(int *)(this + 0x324) == 0) && (PTR_g_AIFlag_00c43b38[1] != '\0')) {
    *(undefined4 *)(this + 0x324) = 1;
  }
  fVar13 = 0.0;
  if ((*(uint *)pCVar1 & 0x10000) == 0) {
    fVar13 = param_1;
  }
  if (param_4 == 3) {
    bVar5 = false;
    *(undefined4 *)(this + 0x427c) = 0;
  }
  else {
    piVar10 = *(int **)(this + 0x41c8);
    if ((((piVar10 != (int *)0x0) && (*piVar10 != 0)) &&
        ((*(byte *)(*(long *)(piVar10 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) >> 1 & 1)
         != 0)) && (*(int *)(this + 0x41f0) != param_3)) {
      uVar6 = *(uint *)(this + 0x41b8);
      uVar3 = *(uint *)(this + 0x41bc);
      if (*(uint *)(this + 0x41c0) == (uVar3 + uVar6 ^ 0x3edd3b2d)) {
        fVar12 = (float)(uVar3 ^ uVar6);
        if ((fVar12 != 0.0) &&
           ((*(float *)(this + 0x42bc) == 0.0 || (this[0x4315] != (Character)0x0)))) {
          pCVar2 = this + 0x427c;
          *(float *)pCVar2 = *(float *)pCVar2 + DAT_009c48c4;
          if (param_4 == 2) {
            SetMotion(this,0x1f,0);
            *(undefined4 *)pCVar2 = 0;
            uVar9 = 0x25;
          }
          else {
            if ((*(uint *)pCVar1 >> 0x1a & 1) == 0) {
              (**(code **)(*(long *)this + 0x660))(fVar12 - fVar13,this,2);
              uVar6 = *(uint *)(this + 0x41b8);
              uVar3 = *(uint *)(this + 0x41bc);
              if (*(uint *)(this + 0x41c0) != (uVar3 + uVar6 ^ 0x3edd3b2d)) {
                SafeVarMgr::Get();
                SafeVarMgr::BanHack();
LAB_0044e880:
                BreakShield(this);
                return 0.0;
              }
              if ((float)(uVar3 ^ uVar6) == 0.0) goto LAB_0044e880;
            }
            SetMotion(this,0xf,0);
            if (((byte)this[0x41c6] >> 1 & 1) != 0) goto LAB_0044e7ec;
            uVar9 = 0x24;
          }
          MonsterRandomTalk(this,uVar9,0x32,0);
LAB_0044e7ec:
          SndMgr::PlayEffect((*(uint *)pCVar1 >> 0x13 & 1) + 9);
          this_01 = (Defense *)
                    (**(code **)(**(long **)(this + 0x330) + 0x228))(*(long **)(this + 0x330),0x67);
          if (this_01 == (Defense *)0x0) {
            this_01 = operator_new(0x540);
                    /* try { // try from 0044e824 to 0044e827 has its CatchHandler @ 0044e88c */
            Effect::Defense::Defense(this_01);
            (**(code **)(*(long *)this_01 + 200))(DAT_009c48c8,DAT_009c4880,this_01);
            (**(code **)(**(long **)(this + 0x330) + 0x218))
                      (*(long **)(this + 0x330),this_01,0x67,0x67);
          }
          Effect::Defense::Run(this_01);
          return 0.0;
        }
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
      }
    }
    *(undefined4 *)(this + 0x427c) = 0;
    if (param_4 == 2) {
      SndMgr::PlayEffect(0x14);
      fVar13 = fVar13 / 3.0;
      bVar5 = true;
    }
    else {
      uVar6 = rand();
      SndMgr::PlayEffect(0xe - (uVar6 & 1));
      bVar5 = false;
    }
  }
  if (((((byte)this[0x41c5] >> 1 & 1) != 0) &&
      (plVar8 = (long *)ScriptMgr::GetCharacter("AVATAR"), plVar8 != (long *)0x0)) &&
     ((char)plVar8[0x65] != '\0')) {
    if ((uint)((ulong)(*(long *)(PTR_g_InvenSkill_00c434c8 + 0x370) -
                      *(long *)(PTR_g_InvenSkill_00c434c8 + 0x368)) >> 3) < 4) {
      this_00 = (SkillItem *)0x0;
    }
    else {
      this_00 = *(SkillItem **)(*(long *)(PTR_g_InvenSkill_00c434c8 + 0x368) + 0x18);
    }
    iVar7 = SkillItem::GetAbility(this_00,-1);
    fVar12 = fVar13 * ((float)iVar7 / DAT_009c4880);
    (**(code **)(*plVar8 + 0x658))(fVar12,plVar8,param_3,3);
    fVar13 = fVar13 - fVar12;
  }
  uVar6 = *(uint *)(this + 0x41a0);
  uVar3 = *(uint *)(this + 0x41a4);
  if (*(uint *)(this + 0x41a8) == (uVar3 + uVar6 ^ 0x3edd3b2d)) {
    fVar12 = (float)(uVar3 ^ uVar6);
    if (fVar12 != 0.0) {
      (**(code **)(*(long *)this + 0x660))(fVar12 - fVar13,this,0);
    }
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
  }
  uVar6 = *(uint *)pCVar1;
  if ((uVar6 >> 0x10 & 1) == 0) {
    uVar3 = *(uint *)(this + 0x41a0);
    uVar4 = *(uint *)(this + 0x41a4);
    if (*(uint *)(this + 0x41a8) == (uVar4 + uVar3 ^ 0x3edd3b2d)) {
      if ((float)(uVar4 ^ uVar3) != 0.0) goto LAB_0044e570;
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      uVar6 = *(uint *)pCVar1;
    }
    if ((uVar6 >> 0xb & 1) == 0) {
      piVar10 = *(int **)(this + 0x41c8);
      if (((piVar10 == (int *)0x0) || (*piVar10 == 0)) ||
         (-1 < *(char *)(*(long *)(piVar10 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c))) {
        *(uint *)(this + 0x41f0) = (uint)(param_3 == 0);
        if (param_3 == 0) {
          uVar11 = 0;
        }
        else {
          uVar11 = DAT_009c488c;
        }
        (**(code **)(**(long **)(this + 0x330) + 0x1d0))(uVar11);
        if ((*(uint *)pCVar1 & 0x840000) == 0x840000) {
          uVar9 = 0x1d;
        }
        else {
          uVar9 = 0x17;
        }
      }
      else {
        uVar9 = 0x19;
      }
      SetMotion(this,uVar9,0);
      (**(code **)(*(long *)this + 0x668))(this);
      goto LAB_0044e748;
    }
  }
LAB_0044e570:
  if (bVar5) {
    if ((*(float *)(this + 0x42bc) < 0.5) || (1.5 <= *(float *)(this + 0x42bc))) goto LAB_0044e5c0;
  }
  else if ((**(int **)(this + 0x41c8) != 0xb) &&
          ((**(int **)(this + 0x41c8) != 0x26 && (*(float *)(this + 0x42bc) == 0.0)))) {
LAB_0044e5c0:
    if (*(int *)(this + 0x324) != 9) {
      piVar10 = *(int **)(this + 0x41c8);
      if (piVar10 == (int *)0x0) {
        iVar7 = 0x1b;
      }
      else if (*piVar10 == 0) {
        iVar7 = 0x1b;
      }
      else {
        iVar7 = (*(uint *)(*(long *)(piVar10 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) >>
                 7 & 1) + 0x1b;
      }
      MonsterRandomTalk(this,iVar7,0x28,0);
      if (bVar5) {
        *(uint *)(this + 0x41f0) = (uint)(param_3 == 0);
        if (param_3 == 0) {
          uVar11 = 0;
        }
        else {
          uVar11 = DAT_009c488c;
        }
        (**(code **)(**(long **)(this + 0x330) + 0x1d0))(uVar11);
        if (((byte)this[0x41c5] & 3) == 0) {
          param_4 = 0x17;
        }
        else {
          param_4 = 0x3b;
        }
      }
      else {
        if (param_4 == 3) goto LAB_0044e748;
        piVar10 = *(int **)(this + 0x41c8);
        if (((piVar10 == (int *)0x0) || (*piVar10 == 0)) ||
           (-1 < *(char *)(*(long *)(piVar10 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c))) {
          if (*(int *)(this + 0x41f0) == param_3) {
            param_4 = param_4 + 0x12;
          }
          else {
            param_4 = param_4 + 0x10;
          }
        }
        else {
          param_4 = 0x19;
        }
      }
      SetMotion(this,param_4,0);
      goto LAB_0044e748;
    }
  }
  *(undefined4 *)(this + 0x42c8) = 0x3e99999a;
LAB_0044e748:
  Blooding(this);
  *(undefined4 *)(this + 0x427c) = 0;
  return fVar13;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: BreakShield
ADDRESS: 0044e8a0
========================================

/* Character::BreakShield() */

void __thiscall Character::BreakShield(Character *this)

{
  User *this_00;
  
  DestroyEquipment(this,4,0);
  SetMotion(this,0xf,1);
  SndMgr::PlayEffect((*(uint *)(this + 0x41c4) >> 0x13 & 1) + 7);
  (**(code **)(*(long *)this + 0x660))(0,this,2);
  *(undefined4 *)(this + 0x427c) = 0;
  if (((byte)this[0x41c5] >> 1 & 1) == 0) {
    return;
  }
  this_00 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
  User::UpdateEffects(this_00);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: ProcAI
ADDRESS: 004511cc
========================================

/* Character::ProcAI(float) */

void __thiscall Character::ProcAI(Character *this,float param_1)

{
  Character *pCVar1;
  int iVar2;
  undefined *puVar3;
  undefined *puVar4;
  bool bVar5;
  uint uVar6;
  int iVar7;
  int iVar8;
  float *pfVar9;
  long lVar10;
  ulong uVar11;
  long *plVar12;
  char *pcVar13;
  Character *pCVar14;
  undefined8 uVar15;
  undefined4 uVar16;
  uint uVar17;
  int *piVar18;
  code *pcVar19;
  Character *pCVar20;
  long *plVar21;
  long lVar22;
  undefined8 *puVar23;
  long *plVar24;
  undefined8 *puVar25;
  float fVar26;
  float fVar27;
  float fVar28;
  float fVar29;
  undefined8 uVar30;
  ushort local_8a;
  long local_88;
  
  lVar22 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_88 = lVar22;
  if ((this[0x328] == (Character)0x0) ||
     (((piVar18 = *(int **)(this + 0x41c8), piVar18 != (int *)0x0 && (*piVar18 != 0)) &&
      ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) >> 4 & 1) !=
       0)))) goto LAB_00452558;
  pCVar20 = this + 0x428c;
  if ((*(float *)pCVar20 != 0.0) &&
     (fVar26 = *(float *)pCVar20 - param_1, *(float *)pCVar20 = fVar26, fVar26 < 0.0)) {
    *(undefined4 *)pCVar20 = 0;
  }
  pCVar1 = this + 0x4278;
  fVar26 = *(float *)pCVar1 - param_1;
  if (fVar26 <= 0.0) {
    fVar26 = 0.0;
  }
  *(float *)pCVar1 = fVar26;
  iVar8 = *(int *)(this + 0x324);
  if (iVar8 != 5) {
    if (iVar8 != 8) {
      if ((iVar8 == 6) && (fVar26 == 0.0)) {
        *(undefined4 *)pCVar1 = 0x3f000000;
        pfVar9 = (float *)(**(code **)(*(long *)this + 0xb0))(this);
        SetMovePosition(*pfVar9 + DAT_009c4904,pfVar9[1] + 0.0,this,5);
      }
      goto LAB_00451494;
    }
    if (PTR_g_AIFlag_00c43b38[1] == '\0') {
      fVar26 = *(float *)(this + 800);
      *(float *)(this + 800) = fVar26 - param_1;
      if (0.0 < fVar26 - param_1) goto LAB_00451494;
      *(undefined8 *)(this + 800) = 0x100000000;
    }
    else {
      *(undefined4 *)(this + 0x324) = 1;
    }
    goto LAB_00452558;
  }
  if (fVar26 == 0.0) {
    *(undefined4 *)pCVar1 = 0x3f000000;
    plVar21 = (long *)User::Ins(PTR_g_Common_00c44818[0x72]);
    fVar26 = (float)(**(code **)(*plVar21 + 0xe0))();
    fVar27 = (float)(**(code **)(*(long *)this + 0xe0))(this);
    pfVar9 = (float *)(**(code **)(*(long *)this + 0xb0))(this);
    if (fVar27 <= fVar26) {
      SetMovePosition(*pfVar9 + DAT_009c48fc,pfVar9[1] + 0.0,this,7);
      if (((*(float *)(this + 0x42bc) == 0.0) && (*(int *)(this + 0x41f0) != 0)) &&
         ((piVar18 = *(int **)(this + 0x41c8), piVar18 == (int *)0x0 ||
          ((*piVar18 == 0 ||
           ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 1) ==
            0)))))) {
        *(int *)(this + 0x41f0) = 0;
        pcVar19 = *(code **)(**(long **)(this + 0x330) + 0x1d0);
        fVar26 = DAT_009c488c;
        goto LAB_00451490;
      }
    }
    else {
      SetMovePosition(*pfVar9 + DAT_009c4900,pfVar9[1] + 0.0,this,7);
      if (((*(float *)(this + 0x42bc) == 0.0) && (*(int *)(this + 0x41f0) != 1)) &&
         ((piVar18 = *(int **)(this + 0x41c8), piVar18 == (int *)0x0 ||
          ((*piVar18 == 0 ||
           ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 1) ==
            0)))))) {
        *(int *)(this + 0x41f0) = 1;
        pcVar19 = *(code **)(**(long **)(this + 0x330) + 0x1d0);
        fVar26 = 0.0;
LAB_00451490:
        (*pcVar19)(fVar26);
      }
    }
  }
LAB_00451494:
  puVar4 = PTR_g_Common_00c44818;
  lVar10 = User::Ins(PTR_g_Common_00c44818[0x72]);
  if ((*(byte *)(lVar10 + 0x41c5) >> 3 & 1) != 0) {
    if ((**(int **)(this + 0x41c8) == 2) && (*(float *)pCVar1 == 0.0)) {
      if (((*(uint *)(this + 0x41c4) & 0x48400) == 0x400) &&
         ((*(uint *)(this + 0x41c4) & 0x200100) != 0x200100)) {
        iVar8 = rand();
        *(float *)pCVar1 = (float)(iVar8 % 10) * DAT_009c4894 + 0.5;
        uVar6 = rand();
        if ((uVar6 & 1) != 0) {
          *(float *)pCVar1 = *(float *)pCVar1 + 1.5;
          iVar8 = rand();
          SetMotion(this,iVar8 % 3 + 0x25,0);
          SndMgr::PlayEffect(iVar8 % 3 + 2);
          if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
             (iVar8 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar8 != 0)) {
                    /* try { // try from 0045168c to 00451697 has its CatchHandler @ 00452590 */
            StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
            __cxa_guard_release(PTR_stageMgr_00c43eb0);
          }
          if (*(int *)(*(long *)PTR_stageMgr_00c430c8 + 0x388) - 1U < 5) {
            if (lVar22 == local_88) {
              MonsterRandomTalk(this,0x23,100,0);
              return;
            }
            goto LAB_0045258c;
          }
        }
      }
    }
    goto LAB_00452558;
  }
  if (*(float *)(this + 0x4284) != 0.0) {
    iVar8 = *(int *)(this + 0x324);
    if (iVar8 + 1U < 2) goto LAB_00451708;
    uVar11 = FindEnemy(this);
    if ((uVar11 & 1) == 0) goto LAB_00451704;
    if ((*(float *)pCVar1 != 0.0) ||
       (((piVar18 = *(int **)(this + 0x41c8), piVar18 != (int *)0x0 && (*piVar18 != 0)) &&
        ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 0x11) !=
         0)))) goto LAB_00452558;
    uVar11 = CheckReach(this,*(Character **)(this + 0x42a0));
    if ((uVar11 & 1) == 0) {
      *(undefined4 *)pCVar1 = 0x3dcccccd;
      *(uint *)(this + 0x41c4) = *(uint *)(this + 0x41c4) | 0x40;
      goto LAB_00451548;
    }
LAB_00451c2c:
    if (lVar22 == local_88) {
      Attack(this,false);
      return;
    }
    goto LAB_0045258c;
  }
LAB_00451704:
  iVar8 = *(int *)(this + 0x324);
LAB_00451708:
  switch(iVar8) {
  case 0:
    if ((((byte)this[0x41c5] >> 5 & 1) == 0) || (*(float *)pCVar1 != 0.0))
    goto switchD_00451724_caseD_3;
    *(undefined4 *)pCVar1 = 0x3f000000;
    plVar21 = (long *)User::Ins(puVar4[0x72]);
    uVar15 = (**(code **)(*plVar21 + 0xe0))();
    fVar26 = (float)(**(code **)(*(long *)this + 0xe0))(this);
    fVar26 = ABS((float)uVar15 - fVar26);
    uVar30 = (**(code **)(*(long *)this + 0xf0))(this);
    if (DAT_009c4880 < fVar26) {
      uVar16 = 7;
      if (fVar26 <= DAT_009c488c) {
        uVar16 = 5;
      }
      if (lVar22 == local_88) {
        SetMovePosition(uVar15,uVar30,this,uVar16);
        return;
      }
      goto LAB_0045258c;
    }
    break;
  case 1:
    if (*(float *)(this + 0x427c) <= 0.0) {
      if (((byte)this[0x41c5] & 1) != 0) {
        *(undefined4 *)(this + 0x324) = 7;
      }
      uVar11 = FindEnemy(this);
      if ((uVar11 & 1) == 0) {
        *(undefined4 *)(this + 0x324) = 0;
      }
      else if ((*(float *)pCVar1 == 0.0) &&
              (((piVar18 = *(int **)(this + 0x41c8), piVar18 == (int *)0x0 || (*piVar18 == 0)) ||
               ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) &
                0x11) == 0)))) {
        uVar11 = CheckReach(this,*(Character **)(this + 0x42a0));
        if ((uVar11 & 1) == 0) {
          *(undefined4 *)pCVar1 = 0x3dcccccd;
          if ((((byte)this[0x41c4] >> 6 & 1) != 0) &&
             (*(float *)(*(long *)(this + 0x4298) + 0x334) < 0.5)) {
            MonsterRandomTalk(this,0x27,0x3c,0);
          }
          goto LAB_00451d40;
        }
        if (**(int **)(this + 0x41c8) != 8) {
          iVar8 = *(int *)(this + 0x4204) + 1;
          iVar7 = rand();
          iVar2 = 0;
          if (iVar8 != 0) {
            iVar2 = iVar7 / iVar8;
          }
          if (iVar7 == iVar2 * iVar8) {
            *(undefined4 *)pCVar1 = 0x3ecccccd;
            SetNextMotion(this);
            goto switchD_00451724_caseD_3;
          }
        }
        goto LAB_00451c2c;
      }
      goto switchD_00451724_caseD_3;
    }
    break;
  case 2:
    if (*(float *)pCVar1 == 0.0) {
      piVar18 = *(int **)(this + 0x41c8);
      if ((((piVar18 == (int *)0x0) || (*piVar18 == 0)) ||
          ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 0x11)
           == 0)) && (((byte)this[0x41c6] >> 4 & 1) == 0)) {
        if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
           (iVar8 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar8 != 0)) {
                    /* try { // try from 00451968 to 00451973 has its CatchHandler @ 00452594 */
          StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
          __cxa_guard_release(PTR_stageMgr_00c43eb0);
        }
        puVar23 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x358);
        puVar25 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x360);
        if (puVar23 != puVar25) {
          do {
            pCVar14 = (Character *)*puVar23;
            piVar18 = *(int **)(pCVar14 + 0x41c8);
            if ((((piVar18 == (int *)0x0) || (*piVar18 == 0)) ||
                (-1 < *(char *)(*(long *)(piVar18 + 2) + (long)*(int *)(pCVar14 + 0x41d0) * 0x50 +
                               0x3c))) && (uVar11 = CheckReach(this,pCVar14), (uVar11 & 1) != 0)) {
              if (*(float *)pCVar20 == 0.0) {
                Attack(this,true);
                if (*(int *)(this + 0x42d4) != 0) {
                  *(int *)(this + 0x42d4) = 1;
                }
                MonsterRandomTalk(this,0x2b,100,0);
              }
              else {
                Attack(this,false);
                *(undefined4 *)(this + 0x324) = 1;
              }
            }
            puVar23 = puVar23 + 1;
          } while (puVar25 != puVar23);
        }
      }
      goto switchD_00451724_caseD_3;
    }
    break;
  default:
    goto switchD_00451724_caseD_3;
  case 4:
    uVar11 = FindEnemy(this);
    if ((uVar11 & 1) == 0) {
      plVar21 = (long *)User::Ins(puVar4[0x72]);
      fVar26 = (float)(**(code **)(*plVar21 + 0xe0))();
      fVar27 = (float)(**(code **)(*(long *)this + 0xe0))(this);
      pfVar9 = (float *)(**(code **)(*(long *)this + 0xb0))(this);
      if (fVar27 <= fVar26) {
        fVar26 = DAT_009c4880;
      }
      else {
        fVar26 = DAT_009c3d50;
      }
      SetMovePosition(*pfVar9 + fVar26,pfVar9[1] + 0.0,this,7);
    }
    else {
      *(undefined4 *)(this + 0x324) = 0;
      uVar15 = 2;
LAB_00451ccc:
      SetMotion(this,uVar15,0);
    }
    goto switchD_00451724_caseD_3;
  case 7:
    if (*(float *)(this + 0x427c) <= 0.0) {
      if (((((byte)this[0x41c5] & 1) != 0) && (*(float *)pCVar20 == 0.0)) &&
         (uVar11 = CheckReach(this,*(Character **)(this + 0x42a0)), (uVar11 & 1) != 0)) {
        local_8a = 0;
        if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
           (iVar8 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar8 != 0)) {
                    /* try { // try from 00451acc to 00451ad7 has its CatchHandler @ 00452598 */
          StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
          __cxa_guard_release(PTR_stageMgr_00c43eb0);
        }
        plVar24 = *(long **)(*(long *)PTR_stageMgr_00c430c8 + 0x360);
        for (plVar21 = *(long **)(*(long *)PTR_stageMgr_00c430c8 + 0x358); plVar21 != plVar24;
            plVar21 = plVar21 + 1) {
          plVar12 = (long *)*plVar21;
          if ((((char)plVar12[0x65] != '\0') &&
              ((*(uint *)((long)plVar12 + 0x41c4) >> 0xb & 1) == 0)) &&
             (((*(uint *)((long)plVar12 + 0x41c4) >> 10 & 1) != ((byte)this[0x41c5] & 4) >> 2 &&
              ((((piVar18 = (int *)plVar12[0x839], piVar18 == (int *)0x0 || (*piVar18 == 0)) ||
                (-1 < *(char *)(*(long *)(piVar18 + 2) + (long)(int)plVar12[0x83a] * 0x50 + 0x3c)))
               && ((Character *)plVar12[0x854] == this)))))) {
            fVar26 = (float)(**(code **)(*plVar12 + 0xe0))();
            fVar27 = (float)(**(code **)(*(long *)this + 0xe0))(this);
            *(undefined1 *)((ulong)&local_8a | (ulong)(fVar26 < fVar27)) = 1;
            if (((local_8a & 0xff) != 0) && (0xff < local_8a)) {
              Attack(this,true);
              if (((byte)this[0x41c5] >> 3 & 1) == 0) {
                *(undefined8 *)(this + 0x42a0) = 0;
              }
              goto LAB_00452558;
            }
          }
        }
      }
      if (((**(int **)(this + 0x41c8) != 0x26) && (uVar11 = FindEnemy(this), (uVar11 & 1) != 0)) &&
         ((*(float *)pCVar1 == 0.0 &&
          (((piVar18 = *(int **)(this + 0x41c8), piVar18 == (int *)0x0 || (*piVar18 == 0)) ||
           ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 0x11)
            == 0)))))) {
        uVar11 = CheckReach(this,*(Character **)(this + 0x42a0));
        if ((uVar11 & 1) == 0) {
          *(undefined4 *)pCVar1 = 0x3dcccccd;
          *(uint *)(this + 0x41c4) = *(uint *)(this + 0x41c4) | 0x40;
LAB_00451548:
          if (lVar22 == local_88) {
            MoveToTarget(this);
            return;
          }
          goto LAB_0045258c;
        }
        goto LAB_00451c2c;
      }
    }
    break;
  case 8:
    if (*(float *)pCVar1 == 0.0) {
      uVar11 = FindEnemy(this);
      if ((uVar11 & 1) == 0) {
        *(undefined4 *)(this + 0x324) = 0;
      }
      else {
        uVar11 = CheckReach(this,*(Character **)(this + 0x42a0));
        if ((uVar11 & 1) == 0) goto LAB_00451d34;
        Attack(this,false);
        *(undefined4 *)pCVar1 = 0x3f000000;
      }
    }
    goto switchD_00451724_caseD_3;
  case 9:
    uVar11 = FindEnemy(this);
    if ((((uVar11 & 1) != 0) && (*(float *)pCVar1 == 0.0)) &&
       ((piVar18 = *(int **)(this + 0x41c8), piVar18 == (int *)0x0 ||
        ((*piVar18 == 0 ||
         ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 0x11)
          == 0)))))) {
      uVar11 = CheckReach(this,*(Character **)(this + 0x42a0));
      if ((uVar11 & 1) != 0) {
        uVar15 = 0x39;
        goto LAB_00451ccc;
      }
LAB_00451d34:
      *(undefined4 *)pCVar1 = 0x3dcccccd;
LAB_00451d40:
      MoveToTarget(this);
    }
switchD_00451724_caseD_3:
    if ((**(uint **)(this + 0x41c8) & 0xfffffffe) == 2) {
      pCVar20 = this + 0x41c4;
      uVar6 = *(uint *)pCVar20;
      if ((uVar6 >> 9 & 1) == 0) {
        iVar8 = *(int *)(this + 0x324);
        if (iVar8 != -1) {
          pCVar14 = this + 0x4280;
          fVar26 = *(float *)pCVar14;
          *(float *)pCVar14 = fVar26 - param_1;
          puVar3 = PTR_g_AIFlag_00c43b38;
          if (fVar26 - param_1 <= 0.0) {
            if (iVar8 == 3) {
              if ((*(int *)(PTR_g_AIFlag_00c43b38 + 8) == 0) || (*PTR_g_AIFlag_00c43b38 != '\0')) {
                iVar8 = *(int *)(PTR_g_AIFlag_00c43b38 + 0x10);
                *(int *)(PTR_g_AIFlag_00c43b38 + 8) = *(int *)(PTR_g_AIFlag_00c43b38 + 8) + 1;
                *puVar3 = 0;
                *(int *)(puVar3 + 0x10) = iVar8 + -1;
                *(undefined4 *)(this + 0x324) = 1;
                uVar6 = *(uint *)pCVar20;
LAB_00451e90:
                *(uint *)pCVar20 = uVar6 | 0x40;
              }
              else {
LAB_00451ebc:
                CheerUp(this);
              }
              goto LAB_0045250c;
            }
            if (iVar8 != 2) {
              if (iVar8 == 0) {
                if (((uVar6 >> 0xf & 1) == 0) && (uVar11 = FindEnemy(this), (uVar11 & 1) != 0)) {
                  iVar8 = MonsterRandomTalk(this,0x1e,100,0x4400);
                  if ((iVar8 == -1) &&
                     ((pcVar13 = (char *)GameMsg::Get(0x45,0xd), ((byte)this[0x41c5] >> 3 & 1) == 0
                      && (*(float *)(this + 0x42bc) == 0.0)))) {
                    MsgBox::Show(*(MsgBox **)(this + 0x4298),pcVar13,1);
                    SetPosChatBalloon(this);
                  }
                  uVar6 = *(uint *)pCVar20;
                  if ((uVar6 >> 8 & 1) == 0) {
                    if ((uVar6 >> 10 & 1) == 0) {
                      uVar17 = 0;
                      *(undefined4 *)(this + 0x324) = 1;
LAB_00452114:
                      *(undefined4 *)pCVar1 = 0x3f000000;
                      *(uint *)pCVar20 = uVar6 | 0x40;
                    }
                    else {
                      iVar8 = rand();
                      uVar17 = iVar8 % 2 + 1;
                      *(uint *)(this + 0x324) = uVar17;
                      if (iVar8 % 2 == 0) {
                        uVar6 = *(uint *)pCVar20;
                        goto LAB_00452114;
                      }
                    }
                    if ((uVar17 & 0xfffffffe) != 2) goto LAB_0045250c;
                  }
                  else {
                    *(undefined4 *)(this + 0x324) = 2;
                  }
                  if (((byte)this[0x41c5] & 1) == 0) {
                    if (*(long *)(this + 0x42a0) == 0) {
                      bVar5 = *(int *)(this + 0x41f0) == 0;
                    }
                    else {
                      WatchTarget(this);
                      fVar26 = (float)(**(code **)(**(long **)(this + 0x42a0) + 0xe0))();
                      fVar27 = (float)(**(code **)(*(long *)this + 0xe0))(this);
                      bVar5 = fVar26 < fVar27;
                    }
                    lVar10 = *(long *)this;
                    fVar27 = DAT_009c3d4c;
                    fVar26 = DAT_009c3d60;
                  }
                  else {
                    if (*(long *)(this + 0x42a0) == 0) {
                      bVar5 = *(int *)(this + 0x41f0) == 0;
                    }
                    else {
                      WatchTarget(this);
                      fVar26 = (float)(**(code **)(**(long **)(this + 0x42a0) + 0xe0))();
                      fVar27 = (float)(**(code **)(*(long *)this + 0xe0))(this);
                      bVar5 = fVar26 < fVar27;
                    }
                    lVar10 = *(long *)this;
                    fVar27 = DAT_009c4908;
                    fVar26 = DAT_009c3d58;
                  }
                  if (!bVar5) {
                    fVar26 = fVar27;
                  }
                  pfVar9 = (float *)(**(code **)(lVar10 + 0xb0))(this);
                  SetMovePosition(fVar26 + *pfVar9,pfVar9[1] + 0.0,this,6);
                  *(undefined4 *)(this + 0x42d4) = 0;
                  *(undefined4 *)pCVar14 = 0;
                  break;
                }
                uVar11 = (**(code **)(*(long *)this + 0x178))(this);
                if (((uVar11 & 1) != 0) && (iVar8 = rand(), iVar8 % 5 == 0)) {
                  IdleTalk(this);
                }
              }
LAB_0045250c:
              iVar8 = rand();
              *(float *)pCVar14 = *(float *)pCVar14 + (float)(iVar8 % 10) * DAT_009c4894 + 0.5;
              break;
            }
            if ((*(int *)(PTR_g_AIFlag_00c43b38 + 0x10) != 0) ||
               (1 < *(int *)(PTR_g_AIFlag_00c43b38 + 0xc))) {
              plVar21 = *(long **)(this + 0x42a0);
              if ((plVar21 == (long *)0x0) || (*(int *)((long)plVar21 + 0x324) != 3)) {
                *(undefined8 *)(this + 0x42a0) = 0;
                if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
                   (iVar8 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar8 != 0)) {
                    /* try { // try from 00451fe4 to 00451fef has its CatchHandler @ 0045259c */
                  StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
                  __cxa_guard_release(PTR_stageMgr_00c43eb0);
                }
                puVar23 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x358);
                puVar25 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x360);
                if (puVar23 != puVar25) {
                  fVar26 = DAT_009c48f8;
                  do {
                    pCVar20 = (Character *)*puVar23;
                    if (((pCVar20 != this) && (((byte)pCVar20[0x41c5] & 1) == 0)) &&
                       ((*(uint *)(pCVar20 + 0x324) & 0xfffffffe) == 2)) {
                      fVar27 = (float)(**(code **)(*(long *)this + 0xe0))(this);
                      fVar28 = (float)(**(code **)(*(long *)pCVar20 + 0xe0))(pCVar20);
                      if (ABS(fVar27 - fVar28) < fVar26) {
                        *(Character **)(this + 0x42a0) = pCVar20;
                        *(undefined4 *)(pCVar20 + 0x324) = 3;
                        fVar26 = ABS(fVar27 - fVar28);
                      }
                    }
                    puVar23 = puVar23 + 1;
                  } while (puVar25 != puVar23);
                }
              }
              else {
                pfVar9 = (float *)(**(code **)(*plVar21 + 0xb0))();
                fVar26 = *pfVar9;
                fVar27 = pfVar9[1];
                fVar28 = DAT_009c3d60;
                if ((fVar27 < DAT_009c3d60) || (fVar28 = DAT_009c3d64, DAT_009c3d64 < fVar27)) {
                  SetMovePosition(fVar26,fVar28,*(undefined8 *)(this + 0x42a0),5);
                  fVar27 = fVar28;
                }
                plVar21 = (long *)User::Ins(puVar4[0x72]);
                fVar28 = (float)(**(code **)(*plVar21 + 0xe0))();
                fVar29 = (float)(**(code **)(*(long *)this + 0xe0))(this);
                fVar26 = fVar26 + (float)(&DAT_009c49bc)[0.0 < fVar29 - fVar28];
                pfVar9 = (float *)(**(code **)(*(long *)this + 0xb0))(this);
                if (((fVar26 != 0.0) && (10.0 <= ABS(*pfVar9 - fVar26))) ||
                   ((fVar27 != 0.0 && (10.0 <= ABS(pfVar9[1] - fVar27))))) {
                  SetMovePosition(fVar26,fVar27,this,7);
                  *(undefined4 *)pCVar14 = 0;
                  break;
                }
                WatchTarget(this);
                MonsterRandomTalk(this,0x28,100,0);
                SetMotion(this,0x28,0);
                lVar10 = *(long *)(this + 0x42a0);
                if (*(float *)(lVar10 + 0x42bc) == 0.0) {
                  iVar8 = *(int *)(this + 0x41f0);
                  if ((*(int *)(lVar10 + 0x41f0) != iVar8) &&
                     (((piVar18 = *(int **)(lVar10 + 0x41c8), piVar18 == (int *)0x0 ||
                       (*piVar18 == 0)) ||
                      ((*(byte *)(*(long *)(piVar18 + 2) + (long)*(int *)(lVar10 + 0x41d0) * 0x50 +
                                 0x3c) & 1) == 0)))) {
                    *(int *)(lVar10 + 0x41f0) = iVar8;
                    if (iVar8 == 1) {
                      fVar26 = 0.0;
                    }
                    else {
                      fVar26 = DAT_009c488c;
                    }
                    (**(code **)(**(long **)(lVar10 + 0x330) + 0x1d0))(fVar26);
                  }
                }
                SetMotion(*(Character **)(this + 0x42a0),0x29,0);
                lVar10 = *(long *)(this + 0x42a0);
                *(undefined4 *)(lVar10 + 0x324) = 1;
                *(undefined4 *)(lVar10 + 0x4280) = 0;
                *(undefined8 *)(this + 0x42a0) = 0;
              }
              goto LAB_0045250c;
            }
            if (*(int *)(PTR_g_AIFlag_00c43b38 + 8) != 0) goto LAB_00451ebc;
            pCVar1 = this + 0x42d4;
            if (*(int *)pCVar1 == 0) {
              *(undefined8 *)(this + 0x42a0) = 0;
            }
            else if (*(int *)pCVar1 == 3) {
              *(int *)pCVar1 = 0;
              *(undefined4 *)(this + 0x324) = 1;
              goto LAB_00451e90;
            }
            uVar11 = FindEnemy(this);
            if ((uVar11 & 1) == 0) {
LAB_004524c0:
              iVar8 = *(int *)pCVar1;
              uVar16 = 0x3f000000;
            }
            else {
              MonsterRandomTalk(this,*(int *)pCVar1 + 0x2a,100,0);
              plVar21 = *(long **)(this + 0x42a0);
              fVar26 = (float)(**(code **)(*(long *)this + 0xe0))(this);
              fVar27 = (float)(**(code **)(*plVar21 + 0xe0))(plVar21);
              if (ABS(fVar26 - fVar27) < DAT_009c46ec) {
                if (*(long *)(this + 0x42a0) == 0) {
                  bVar5 = *(int *)(this + 0x41f0) == 0;
                }
                else {
                  WatchTarget(this);
                  fVar26 = (float)(**(code **)(**(long **)(this + 0x42a0) + 0xe0))();
                  fVar27 = (float)(**(code **)(*(long *)this + 0xe0))(this);
                  bVar5 = fVar26 < fVar27;
                }
                fVar26 = DAT_009c3d60;
                if (!bVar5) {
                  fVar26 = DAT_009c3d4c;
                }
                pfVar9 = (float *)(**(code **)(*(long *)this + 0xb0))(this);
                SetMovePosition(fVar26 + *pfVar9,pfVar9[1] + 0.0,this,6);
                goto LAB_004524c0;
              }
              iVar8 = *(int *)pCVar1;
              uVar16 = 0x40000000;
            }
            *(int *)pCVar1 = iVar8 + 1;
            *(undefined4 *)pCVar14 = uVar16;
          }
        }
      }
    }
  }
LAB_00452558:
  if (lVar22 == local_88) {
    return;
  }
LAB_0045258c:
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Revival
ADDRESS: 00453b1c
========================================

/* Character::Revival() */

void __thiscall Character::Revival(Character *this)

{
  Character *pCVar1;
  uint uVar2;
  long lVar3;
  long *plVar4;
  User *this_00;
  undefined4 uVar5;
  
  *(undefined4 *)(this + 0x324) = 0;
  pCVar1 = this + 0x41c4;
  uVar2 = *(uint *)pCVar1;
  if ((uVar2 & 0x8200) == 0) {
    if (PTR_g_AIFlag_00c43b38[1] == '\0') goto LAB_00453b6c;
    uVar5 = 1;
  }
  else {
    uVar5 = 0xffffffff;
  }
  *(undefined4 *)(this + 0x324) = uVar5;
LAB_00453b6c:
  *(undefined4 *)(this + 0x42ac) = 0;
  *(uint *)pCVar1 = uVar2 & 0xfffff7ff;
  if ((uVar2 >> 0x12 & 1) == 0) {
    *(undefined4 *)(this + 0x42b0) = 0x10;
  }
  Fill(this,false);
  SetMotion(this,0x1a,1);
  lVar3 = (**(code **)(*(long *)this + 0xb0))(this);
  plVar4 = (long *)(**(code **)(*(long *)this + 0x260))(this);
  if (plVar4 != (long *)0x0) {
    (**(code **)(*plVar4 + 0x2a8))
              (plVar4,this,
               (*(uint *)pCVar1 >> 0x19 & 1) + (int)(DAT_009c4888 - *(float *)(lVar3 + 4)));
  }
  SndMgr::PlayEffect(0x10);
  if (((byte)this[0x41c5] >> 1 & 1) == 0) {
    return;
  }
  this_00 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
  User::UpdateEffects(this_00);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Rage
ADDRESS: 00453c40
========================================

/* Character::Rage(float) */

void __thiscall Character::Rage(Character *this,float param_1)

{
  long *plVar1;
  Character *pCVar2;
  undefined8 uVar3;
  long lVar4;
  
  uVar3 = 0x11;
  SndMgr::PlayEffect(0x11);
  *(float *)(this + 0x4284) = param_1;
  if ((*(uint *)(this + 0x41c4) >> 0x12 & 1) == 0) {
    if ((*(uint *)(this + 0x41c4) >> 0xb & 1) == 0) {
      if (param_1 <= 0.0) {
        if (*(float *)(this + 0x42b8) == 0.0) {
          uVar3 = 0x10;
          if (*(float *)(this + 0x42bc) != 0.0) {
            *(undefined4 *)(this + 0x42b0) = 0x10;
            uVar3 = 7;
          }
        }
        else {
          *(undefined4 *)(this + 0x42b0) = 0x10;
          uVar3 = 6;
        }
      }
      else {
        uVar3 = 1;
      }
    }
    else {
      uVar3 = 0xc;
    }
  }
  uVar3 = GetColor(uVar3);
  (**(code **)(*(long *)this + 0x4c0))(this,uVar3);
  pCVar2 = this + 0x340;
  lVar4 = 0xc;
  do {
    plVar1 = (long *)(**(code **)(*(long *)pCVar2 + 0x228))(pCVar2,0);
    if (plVar1 != (long *)0x0) {
      (**(code **)(*plVar1 + 0x4c0))(plVar1,uVar3);
    }
    lVar4 = lVar4 + -1;
    pCVar2 = pCVar2 + 0x530;
  } while (lVar4 != 0);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Rage_Monster
ADDRESS: 00453d4c
========================================

/* Character::Rage_Monster() */

void __thiscall Character::Rage_Monster(Character *this)

{
  undefined8 uVar1;
  long *plVar2;
  undefined4 uVar3;
  Character *pCVar4;
  long lVar5;
  
  uVar3 = 0x11;
  SndMgr::PlayEffect(0x11);
  *(undefined4 *)(this + 0x4284) = 0x40000000;
  if (((*(uint *)(this + 0x41c4) >> 0x12 & 1) == 0) &&
     (uVar3 = 1, (*(uint *)(this + 0x41c4) & 0x800) != 0)) {
    uVar3 = 0xc;
  }
  uVar1 = GetColor(uVar3);
  (**(code **)(*(long *)this + 0x4c0))(this,uVar1);
  pCVar4 = this + 0x340;
  lVar5 = 0xc;
  do {
    plVar2 = (long *)(**(code **)(*(long *)pCVar4 + 0x228))(pCVar4,0);
    if (plVar2 != (long *)0x0) {
      (**(code **)(*plVar2 + 0x4c0))(plVar2,uVar1);
    }
    lVar5 = lVar5 + -1;
    pCVar4 = pCVar4 + 0x530;
  } while (lVar5 != 0);
  *(undefined4 *)(this + 0x4284) = 0x447a0000;
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: HitProc
ADDRESS: 004545b4
========================================

/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* Character::HitProc() */

void __thiscall Character::HitProc(Character *this)

{
  undefined4 uVar1;
  undefined *puVar2;
  undefined *puVar3;
  uint uVar4;
  int iVar5;
  uint uVar6;
  undefined8 *puVar7;
  ulong uVar8;
  float *pfVar9;
  Character *pCVar10;
  byte bVar11;
  int *piVar12;
  GameScene *this_00;
  long *plVar13;
  bool bVar14;
  long lVar15;
  long *plVar16;
  byte bVar17;
  undefined8 *puVar18;
  undefined8 *puVar19;
  long lVar20;
  float fVar21;
  float __x;
  float fVar22;
  undefined8 local_98;
  undefined8 local_90;
  undefined8 uStack_88;
  long local_78;
  
  lVar20 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_78 = lVar20;
  uVar4 = rand();
  SndMgr::PlayEffect(6 - (uVar4 & 1));
  if (((byte)this[0x41c7] >> 1 & 1) == 0) {
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar5 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar5 != 0)) {
                    /* try { // try from 00454634 to 0045463f has its CatchHandler @ 004549a4 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    lVar15 = *(long *)PTR_stageMgr_00c430c8;
    GetAttackRange(this,0);
    cocos2d::Rect::Rect((Rect *)&local_90,(Rect *)&DAT_00c60a58);
    if (((byte)this[0x41c5] >> 1 & 1) != 0) {
      local_90 = CONCAT44((float)((ulong)local_90 >> 0x20) + (float)((ulong)_DAT_009c4870 >> 0x20),
                          (float)local_90 + (float)_DAT_009c4870);
      uStack_88 = CONCAT44((float)((ulong)uStack_88 >> 0x20) + (float)((ulong)_UNK_009c4878 >> 0x20)
                           ,(float)uStack_88 + (float)_UNK_009c4878);
    }
    puVar18 = *(undefined8 **)(lVar15 + 0x358);
    puVar19 = *(undefined8 **)(lVar15 + 0x360);
    if (puVar18 != puVar19) {
      bVar14 = false;
      bVar17 = 0;
      do {
        plVar13 = (long *)*puVar18;
        if ((((plVar13 != (long *)0x0) &&
             (((byte)this[0x41c5] >> 2 & 1) != (*(uint *)((long)plVar13 + 0x41c4) & 0x400) >> 10))
            && ((*(uint *)((long)plVar13 + 0x41c4) & 0x100800) == 0)) &&
           (((char)plVar13[0x65] != '\0' && (*(int *)((long)plVar13 + 0x324) != 8)))) {
          puVar7 = (undefined8 *)(**(code **)(*plVar13 + 0xb0))(plVar13);
          local_98 = *puVar7;
          uVar8 = cocos2d::Rect::containsPoint((Rect *)&local_90,(Vec2 *)&local_98);
          if ((uVar8 & 1) != 0) {
            (**(code **)(*(long *)this + 0x650))(this,plVar13);
            plVar16 = (long *)plVar13[0x854];
            if (plVar16 == (long *)0x0) {
LAB_004547cc:
              if ((*(byte *)((long)plVar13 + 0x41c5) >> 3 & 1) == 0) {
                plVar13[0x854] = (long)this;
              }
            }
            else {
              pfVar9 = (float *)(**(code **)(*(long *)this + 0xb0))(this);
              fVar21 = (pfVar9[1] - local_98._4_4_) + (pfVar9[1] - local_98._4_4_);
              fVar21 = (*pfVar9 - (float)local_98) * (*pfVar9 - (float)local_98) + fVar21 * fVar21;
              fVar22 = SQRT(fVar21);
              if (NAN(fVar22)) {
                fVar22 = sqrtf(fVar21);
              }
              pfVar9 = (float *)(**(code **)(*plVar16 + 0xb0))(plVar16);
              fVar21 = (pfVar9[1] - local_98._4_4_) + (pfVar9[1] - local_98._4_4_);
              __x = (*pfVar9 - (float)local_98) * (*pfVar9 - (float)local_98) + fVar21 * fVar21;
              fVar21 = SQRT(__x);
              if (NAN(fVar21)) {
                fVar21 = sqrtf(__x);
              }
              if (fVar22 < fVar21) goto LAB_004547cc;
            }
            piVar12 = (int *)plVar13[0x839];
            if (piVar12 == (int *)0x0) {
              bVar11 = 0;
            }
            else if (*piVar12 == 0) {
              bVar11 = 0;
            }
            else {
              bVar11 = *(byte *)(*(long *)(piVar12 + 2) + (long)(int)plVar13[0x83a] * 0x50 + 0x3c)
                       >> 1 & 1;
            }
            bVar17 = bVar17 | bVar11;
            bVar14 = true;
          }
        }
        puVar18 = puVar18 + 1;
      } while (puVar19 != puVar18);
      lVar20 = *(long *)PTR___stack_chk_guard_00c419a0;
      if (bVar14) {
        if (((byte)this[0x41c5] & 1) == 0) {
          MonsterRandomTalk(this,0x1a,0x28,0);
        }
        uVar1 = DAT_009c4894;
        if (bVar17 == 0) {
          uVar1 = DAT_009c490c;
        }
        *(undefined4 *)(this + 0x4310) = uVar1;
        goto LAB_00454908;
      }
    }
    puVar3 = PTR_g_Common_00c44818;
    if (*(uint *)(PTR_g_Common_00c44818 + 0x60) ==
        (*(int *)(PTR_g_Common_00c44818 + 0x5c) + *(int *)(PTR_g_Common_00c44818 + 0x58) ^
        0x3edd3b2dU)) {
      if (((*(int *)(PTR_g_Common_00c44818 + 0x5c) != *(int *)(PTR_g_Common_00c44818 + 0x58)) &&
          (*(int *)(this + 0x4204) == 4)) &&
         ((((byte)this[0x41c7] >> 4 & 1) != 0 &&
          (pCVar10 = (Character *)User::Ins(PTR_g_Common_00c44818[0x72]), pCVar10 != this)))) {
        if (*(uint *)(puVar3 + 0x2c) ==
            (*(uint *)(puVar3 + 0x28) + *(uint *)(puVar3 + 0x24) ^ 0x3edd3b2d)) {
          uVar4 = (*(uint *)(puVar3 + 0x28) ^ *(uint *)(puVar3 + 0x24)) + 1;
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar4 = 1;
        }
        uVar6 = rand();
        *(uint *)(puVar3 + 0x28) = uVar6;
        puVar2 = PTR_g_GameScene_00c41fb0;
        *(uint *)(puVar3 + 0x24) = uVar6 ^ uVar4;
        this_00 = *(GameScene **)puVar2;
        *(uint *)(puVar3 + 0x2c) = (uVar6 ^ uVar4) + uVar6 ^ 0x3edd3b2d;
        GameScene::UpdateArenaPoint(this_00);
        *(undefined4 *)(this + 0x4288) = 0x3f800000;
        *(uint *)(this + 0x41c4) = *(uint *)(this + 0x41c4) | 0x100000;
        *(undefined4 *)(this + 0x324) = 0xffffffff;
      }
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
    }
  }
LAB_00454908:
  if (lVar20 != local_78) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: ShowSystemMsg
ADDRESS: 00456fa4
========================================

/* CommonSystem::ShowSystemMsg(char const*, bool) */

void CommonSystem::ShowSystemMsg(char *param_1,bool param_2)

{
  undefined *puVar1;
  float fVar2;
  
  fVar2 = (float)MsgBox::Show(*(MsgBox **)PTR_m_sysmsg_00c44f48,param_1,1);
  puVar1 = PTR_m_skip_wait_00c42660;
  *PTR_m_need_skip_00c43f58 = param_2;
  *(float *)puVar1 = fVar2 / 3.0;
  SndMgr::PlayEffect(0x15);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: RewardAD
ADDRESS: 00457078
========================================

/* CommonSystem::RewardAD() */

void CommonSystem::RewardAD(void)

{
  int iVar1;
  uint uVar2;
  undefined *puVar3;
  char *pcVar4;
  float fVar5;
  double dVar6;
  
  puVar3 = PTR_g_Common_00c44818;
  if (*(int *)(PTR_g_Common_00c44818 + 0x50) != 0) {
    dVar6 = (double)cocos2d::utils::gettime();
    if ((dVar6 < *(double *)PTR_ad_watch_time_00c44b68) ||
       (*(double *)PTR_ad_watch_time_00c44b68 == 0.0)) {
      pcVar4 = (char *)GameMsg::Get(0x3e,5);
      fVar5 = (float)MsgBox::Show(*(MsgBox **)PTR_m_sysmsg_00c44f48,pcVar4,1);
      puVar3 = PTR_m_skip_wait_00c42660;
      *PTR_m_need_skip_00c43f58 = 0;
      *(float *)puVar3 = fVar5 / 3.0;
      SndMgr::PlayEffect(0x15);
      return;
    }
    iVar1 = *(int *)(puVar3 + 0x50);
    *(undefined8 *)PTR_ad_watch_time_00c44b68 = 0;
    uVar2 = iVar1 - 1;
    if (uVar2 < 4) {
                    /* WARNING: Could not recover jumptable at 0x004570e0. Too many branches */
                    /* WARNING: Treating indirect jump as call */
      (*(code *)((long)&switchD_004570e0::switchdataD_009c4bb8 +
                (long)(int)(&switchD_004570e0::switchdataD_009c4bb8)[uVar2]))();
      return;
    }
    *(undefined4 *)(puVar3 + 0x50) = 0;
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: ShowSystemMsg
ADDRESS: 004579cc
========================================

/* CommonSystem::ShowSystemMsg(MsgType, int, bool) */

void CommonSystem::ShowSystemMsg(undefined8 param_1,undefined8 param_2,byte param_3)

{
  undefined *puVar1;
  char *pcVar2;
  float fVar3;
  
  pcVar2 = (char *)GameMsg::Get();
  fVar3 = (float)MsgBox::Show(*(MsgBox **)PTR_m_sysmsg_00c44f48,pcVar2,1);
  puVar1 = PTR_m_skip_wait_00c42660;
  *PTR_m_need_skip_00c43f58 = param_3 & 1;
  *(float *)puVar1 = fVar3 / 3.0;
  SndMgr::PlayEffect(0x15);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: PlayEffect
ADDRESS: 00457b70
========================================

/* SndMgr::PlayEffect(EffectSnd) */

void SndMgr::PlayEffect(int param_1)

{
  undefined *puVar1;
  int iVar2;
  User *pUVar3;
  size_t __n;
  void *__dest;
  ulong uVar4;
  long lVar5;
  ulong local_50;
  size_t local_48;
  void *local_40;
  long local_38;
  
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar5;
  pUVar3 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
  iVar2 = User::GetRuneAbility(pUVar3,0xb);
  if ((iVar2 == 1) || (PTR_play_check_00c44178[param_1] != '\0')) goto LAB_00457c94;
  PTR_play_check_00c44178[param_1] = 1;
  sprintf(&DAT_00c66cb0,"effect/%d.ogg",param_1);
  local_48 = 0;
  local_40 = (void *)0x0;
  local_50 = 0;
  __n = strlen(&DAT_00c66cb0);
  if (0xffffffffffffffef < __n) {
                    /* WARNING: Subroutine does not return */
    std::__ndk1::__basic_string_common<true>::__throw_length_error();
  }
  if (__n < 0x17) {
    __dest = (void *)((ulong)&local_50 | 1);
    local_50 = CONCAT71(local_50._1_7_,(char)(__n << 1));
    if (__n != 0) goto LAB_00457c50;
  }
  else {
    uVar4 = __n + 0x10 & 0xfffffffffffffff0;
    __dest = operator_new(uVar4);
    local_50 = uVar4 | 1;
    local_48 = __n;
    local_40 = __dest;
LAB_00457c50:
    memcpy(__dest,&DAT_00c66cb0,__n);
  }
  puVar1 = PTR_g_Settings_00c440f0;
  *(undefined1 *)((long)__dest + __n) = 0;
                    /* try { // try from 00457c74 to 00457c83 has its CatchHandler @ 00457cc0 */
  cocos2d::experimental::AudioEngine::play2d
            ((basic_string *)&local_50,false,*(float *)(puVar1 + 4),(AudioProfile *)0x0);
  if ((local_50 & 1) != 0) {
    operator_delete(local_40);
  }
LAB_00457c94:
  if (lVar5 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: BreakingSprite
ADDRESS: 0045b938
========================================

/* BreakingSprite::BreakingSprite(cocos2d::Sprite*, EffectSnd, bool) */

void __thiscall
BreakingSprite::BreakingSprite(BreakingSprite *this,long *param_1,int param_3,byte param_4)

{
  Rect *this_00;
  undefined *puVar1;
  Texture2D *pTVar2;
  undefined8 uVar3;
  int iVar4;
  code *pcVar5;
  float fVar6;
  float fVar7;
  float fVar8;
  float fVar9;
  float fVar10;
  
  cocos2d::SpriteBatchNode::SpriteBatchNode((SpriteBatchNode *)this);
  puVar1 = PTR_vtable_00c41058;
  this_00 = (Rect *)(this + 0x4cc);
  *(undefined **)this = PTR_vtable_00c41058 + 0x10;
  *(undefined **)(this + 0x2f8) = puVar1 + 0x568;
  *(undefined8 *)(this + 0x3ac) = 0;
  *(undefined8 *)(this + 0x3a4) = 0;
  *(undefined8 *)(this + 0x3bc) = 0;
  *(undefined8 *)(this + 0x3b4) = 0;
  *(undefined8 *)(this + 0x3cc) = 0;
  *(undefined8 *)(this + 0x3c4) = 0;
  *(undefined4 *)(this + 0x3d4) = 0;
  *(undefined4 *)(this + 0x3d8) = 0;
  *(undefined8 *)(this + 0x3e4) = 0;
  *(undefined8 *)(this + 0x3dc) = 0;
  *(undefined8 *)(this + 0x3f4) = 0;
  *(undefined8 *)(this + 0x3ec) = 0;
  *(undefined8 *)(this + 0x404) = 0;
  *(undefined8 *)(this + 0x3fc) = 0;
  *(undefined8 *)(this + 0x414) = 0;
  *(undefined8 *)(this + 0x40c) = 0;
  *(undefined8 *)(this + 0x424) = 0;
  *(undefined8 *)(this + 0x41c) = 0;
  *(undefined8 *)(this + 0x434) = 0;
  *(undefined8 *)(this + 0x42c) = 0;
  *(undefined8 *)(this + 0x444) = 0;
  *(undefined8 *)(this + 0x43c) = 0;
  *(undefined8 *)(this + 0x454) = 0;
  *(undefined8 *)(this + 0x44c) = 0;
  *(undefined8 *)(this + 0x464) = 0;
  *(undefined8 *)(this + 0x45c) = 0;
  *(undefined8 *)(this + 0x474) = 0;
  *(undefined8 *)(this + 0x46c) = 0;
  *(undefined8 *)(this + 0x484) = 0;
  *(undefined8 *)(this + 0x47c) = 0;
  *(undefined8 *)(this + 0x494) = 0;
  *(undefined8 *)(this + 0x48c) = 0;
  *(undefined8 *)(this + 0x4a4) = 0;
  *(undefined8 *)(this + 0x49c) = 0;
  *(undefined8 *)(this + 0x4b4) = 0;
  *(undefined8 *)(this + 0x4ac) = 0;
  *(undefined4 *)(this + 0x4bc) = 0;
  *(undefined4 *)(this + 0x4c0) = 0;
  this[0x4c8] = (BreakingSprite)(param_4 & 1);
                    /* try { // try from 0045ba34 to 0045baa3 has its CatchHandler @ 0045bd14 */
  cocos2d::Rect::Rect(this_00);
  pTVar2 = (Texture2D *)(**(code **)(*param_1 + 0x548))(param_1);
  cocos2d::SpriteBatchNode::initWithTexture((SpriteBatchNode *)this,pTVar2,0x1d);
  fVar6 = (float)(**(code **)(*param_1 + 0x88))(param_1);
  if (fVar6 != 1.0) {
    pcVar5 = *(code **)(*(long *)this + 0x80);
    (**(code **)(*param_1 + 0x88))(param_1);
    (*pcVar5)(this);
  }
  cocos2d::Rect::operator=(this_00,(Rect *)(param_1 + 0x81));
  fVar8 = *(float *)(this + 0x4cc);
  fVar6 = *(float *)(this + 0x4d4);
  fVar9 = *(float *)(this + 0x4d0);
  fVar7 = *(float *)(this + 0x4d8) / 6.0;
  *(float *)(this + 0x4d8) = fVar7;
  iVar4 = 0;
  *(float *)(this + 0x4d4) = fVar6 / 6.0;
  do {
    *(float *)(this + 0x4d0) = fVar9 + fVar7 * 0.0;
    fVar10 = fVar8 + (fVar6 / 6.0) * (float)iVar4;
    *(float *)(this + 0x4cc) = fVar10;
                    /* try { // try from 0045bb2c to 0045bcb3 has its CatchHandler @ 0045bd00 */
    pTVar2 = (Texture2D *)(**(code **)(*param_1 + 0x548))(param_1);
    uVar3 = cocos2d::Sprite::createWithTexture(pTVar2,this_00,false);
    (**(code **)(*(long *)this + 0x218))(this,uVar3,0,iVar4 + 100);
    *(float *)(this + 0x4d0) = fVar9 + fVar7;
    *(float *)(this + 0x4cc) = fVar10;
    pTVar2 = (Texture2D *)(**(code **)(*param_1 + 0x548))(param_1);
    uVar3 = cocos2d::Sprite::createWithTexture(pTVar2,this_00,false);
    (**(code **)(*(long *)this + 0x218))(this,uVar3,0,iVar4 + 0x6a);
    *(float *)(this + 0x4d0) = fVar9 + fVar7 + fVar7;
    *(float *)(this + 0x4cc) = fVar10;
    pTVar2 = (Texture2D *)(**(code **)(*param_1 + 0x548))(param_1);
    uVar3 = cocos2d::Sprite::createWithTexture(pTVar2,this_00,false);
    (**(code **)(*(long *)this + 0x218))(this,uVar3,0,iVar4 + 0x70);
    *(float *)(this + 0x4d0) = fVar9 + fVar7 * 3.0;
    *(float *)(this + 0x4cc) = fVar10;
    pTVar2 = (Texture2D *)(**(code **)(*param_1 + 0x548))(param_1);
    uVar3 = cocos2d::Sprite::createWithTexture(pTVar2,this_00,false);
    (**(code **)(*(long *)this + 0x218))(this,uVar3,0,iVar4 + 0x76);
    *(float *)(this + 0x4d0) = fVar9 + fVar7 * 4.0;
    *(float *)(this + 0x4cc) = fVar10;
    pTVar2 = (Texture2D *)(**(code **)(*param_1 + 0x548))(param_1);
    uVar3 = cocos2d::Sprite::createWithTexture(pTVar2,this_00,false);
    (**(code **)(*(long *)this + 0x218))(this,uVar3,0,iVar4 + 0x7c);
    *(float *)(this + 0x4d0) = fVar9 + fVar7 * 5.0;
    *(float *)(this + 0x4cc) = fVar10;
    pTVar2 = (Texture2D *)(**(code **)(*param_1 + 0x548))(param_1);
    uVar3 = cocos2d::Sprite::createWithTexture(pTVar2,this_00,false);
    (**(code **)(*(long *)this + 0x218))(this,uVar3,0,iVar4 + 0x82);
    iVar4 = iVar4 + 1;
  } while (iVar4 < 6);
  if (param_3 != -1) {
                    /* try { // try from 0045bcc8 to 0045bcd7 has its CatchHandler @ 0045bd14 */
    SndMgr::PlayEffect(param_3);
  }
  Run(this);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: StaminaUpEfffect
ADDRESS: 0046cef8
========================================

/* HardcoreLobbyScene::StaminaUpEfffect() */

void __thiscall HardcoreLobbyScene::StaminaUpEfffect(HardcoreLobbyScene *this)

{
  Effect::Soul::Run(*(Soul **)(this + 0x430));
  (**(code **)(**(long **)(this + 0x428) + 0x170))(*(long **)(this + 0x428),0);
  SndMgr::PlayEffect(0x11);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Move
ADDRESS: 00474c8c
========================================

/* RuneInven::Move(int, int, bool) */

RuneItem * __thiscall RuneInven::Move(RuneInven *this,int param_1,int param_2,bool param_3)

{
  undefined *puVar1;
  int iVar2;
  uint uVar3;
  RuneSlot *this_00;
  RuneItem *this_01;
  long *plVar4;
  User *pUVar5;
  long lVar6;
  long lVar7;
  uint uVar8;
  long lVar9;
  ulong uVar10;
  
  if ((param_1 < 0xc) && (0xb < param_2)) {
    iVar2 = UserData::GetRuneSlot((UserData *)PTR_g_UserData_00c41478);
    if (param_2 + -0xc < iVar2) {
      if (param_1 == 0xc) {
        lVar6 = *(long *)(this + 0x370);
        lVar9 = *(long *)(this + 0x368);
        lVar7 = 0;
      }
      else {
        lVar6 = *(long *)(this + 0x370);
        lVar9 = *(long *)(this + 0x368);
        if ((uint)param_1 < (uint)((ulong)(lVar6 - lVar9) >> 3)) {
          lVar7 = *(long *)(lVar9 + (ulong)(uint)param_1 * 8);
        }
        else {
          lVar7 = 0;
        }
      }
      uVar10 = (ulong)(lVar6 - lVar9) >> 3 & 0xffffffff;
      if ((uVar10 < 0xd) ||
         ((((*(long *)(lVar9 + 0x60) == 0 ||
            (this_01 = (RuneItem *)
                       __dynamic_cast(*(long *)(lVar9 + 0x60),PTR_typeinfo_00c42680,
                                      PTR_typeinfo_00c42068,0), this_01 == (RuneItem *)0x0)) ||
           (*(int *)(this_01 + 0x550) != param_1)) &&
          ((uVar10 < 0xe ||
           ((((*(long *)(lVar9 + 0x68) == 0 ||
              (this_01 = (RuneItem *)
                         __dynamic_cast(*(long *)(lVar9 + 0x68),PTR_typeinfo_00c42680,
                                        PTR_typeinfo_00c42068,0), this_01 == (RuneItem *)0x0)) ||
             (*(int *)(this_01 + 0x550) != param_1)) &&
            ((uVar10 < 0xf ||
             ((((*(long *)(lVar9 + 0x70) == 0 ||
                (this_01 = (RuneItem *)
                           __dynamic_cast(*(long *)(lVar9 + 0x70),PTR_typeinfo_00c42680,
                                          PTR_typeinfo_00c42068,0), this_01 == (RuneItem *)0x0)) ||
               (*(int *)(this_01 + 0x550) != param_1)) &&
              ((((uVar10 < 0x10 || (*(long *)(lVar9 + 0x78) == 0)) ||
                (this_01 = (RuneItem *)
                           __dynamic_cast(*(long *)(lVar9 + 0x78),PTR_typeinfo_00c42680,
                                          PTR_typeinfo_00c42068,0), this_01 == (RuneItem *)0x0)) ||
               (*(int *)(this_01 + 0x550) != param_1)))))))))))))) {
        plVar4 = *(long **)(lVar9 + (long)param_2 * 8);
        if (plVar4 != (long *)0x0) {
          (**(code **)(*plVar4 + 0x270))();
          *(undefined8 *)(*(long *)(this + 0x368) + (long)param_2 * 8) = 0;
        }
        this_01 = operator_new(0x5a0);
                    /* try { // try from 00474f20 to 00474f2b has its CatchHandler @ 004750e8 */
        RuneItem::RuneItem(this_01,param_1,0);
        if (*(uint *)(lVar7 + 0x55c) ==
            (*(uint *)(lVar7 + 0x558) + *(uint *)(lVar7 + 0x554) ^ 0x3edd3b2d)) {
          uVar8 = *(uint *)(lVar7 + 0x558) ^ *(uint *)(lVar7 + 0x554);
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar8 = 0;
        }
        uVar3 = rand();
        *(uint *)(this_01 + 0x554) = uVar3 ^ uVar8;
        *(uint *)(this_01 + 0x558) = uVar3;
        *(uint *)(this_01 + 0x55c) = (uVar3 ^ uVar8) + uVar3 ^ 0x3edd3b2d;
        if (*(uint *)(lVar7 + 0x568) ==
            (*(uint *)(lVar7 + 0x564) + *(uint *)(lVar7 + 0x560) ^ 0x3edd3b2d)) {
          uVar8 = *(uint *)(lVar7 + 0x564) ^ *(uint *)(lVar7 + 0x560);
        }
        else {
          SafeVarMgr::Get();
          SafeVarMgr::BanHack();
          uVar8 = 0;
        }
        uVar3 = rand();
        *(uint *)(this_01 + 0x560) = uVar3 ^ uVar8;
        *(uint *)(this_01 + 0x564) = uVar3;
        *(uint *)(this_01 + 0x568) = (uVar3 ^ uVar8) + uVar3 ^ 0x3edd3b2d;
        RuneItem::ShowInfo(this_01,true);
        Inventory::InsertItem((Inventory *)this,(BaseItem *)this_01,param_2);
        if (param_3) {
          SndMgr::PlayEffect(0x12);
        }
        puVar1 = PTR_g_Common_00c44818;
        pUVar5 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
        User::SetRuneAbility(pUVar5);
        if (*(int *)(this_01 + 0x550) == 0xb) {
          if (*(uint *)(this_01 + 0x55c) ==
              (*(uint *)(this_01 + 0x558) + *(uint *)(this_01 + 0x554) ^ 0x3edd3b2d)) {
            if (((*(uint *)(this_01 + 0x558) ^ *(uint *)(this_01 + 0x554)) == 5) &&
               (*puVar1 != '\0')) {
              if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
                 (iVar2 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar2 != 0)) {
                    /* try { // try from 00475078 to 00475083 has its CatchHandler @ 004750fc */
                StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
                __cxa_guard_release(PTR_stageMgr_00c43eb0);
              }
              StageMgr::OpenStage((StageMgr *)PTR_stageMgr_00c430c8,7,0);
            }
          }
          else {
            SafeVarMgr::Get();
            SafeVarMgr::BanHack();
          }
        }
      }
    }
    else if (iVar2 + 0xcU < (uint)((ulong)(*(long *)(this + 0x370) - *(long *)(this + 0x368)) >> 3))
    {
      lVar6 = *(long *)(*(long *)(this + 0x368) + (ulong)(iVar2 + 0xcU) * 8);
      if (lVar6 == 0) {
        this_01 = (RuneItem *)0x0;
      }
      else {
        this_01 = (RuneItem *)__dynamic_cast(lVar6,PTR_typeinfo_00c42680,PTR_typeinfo_00c44538,0);
      }
    }
    else {
      this_01 = (RuneItem *)0x0;
    }
  }
  else if ((param_1 < 0xc) || (0xb < param_2)) {
    if ((uint)param_1 < (uint)((ulong)(*(long *)(this + 0x370) - *(long *)(this + 0x368)) >> 3)) {
      this_01 = *(RuneItem **)(*(long *)(this + 0x368) + (ulong)(uint)param_1 * 8);
    }
    else {
      this_01 = (RuneItem *)0x0;
    }
  }
  else {
    plVar4 = *(long **)(*(long *)(this + 0x368) + (long)param_1 * 8);
    if (plVar4 != (long *)0x0) {
      (**(code **)(*plVar4 + 0x270))();
      *(undefined8 *)(*(long *)(this + 0x368) + (long)param_1 * 8) = 0;
    }
    this_00 = operator_new(0x540);
                    /* try { // try from 00474d30 to 00474d37 has its CatchHandler @ 004750dc */
    RuneSlot::RuneSlot(this_00,true);
    Inventory::InsertItem((Inventory *)this,(BaseItem *)this_00,param_1);
    pUVar5 = (User *)User::Ins(PTR_g_Common_00c44818[0x72]);
    User::SetRuneAbility(pUVar5);
    this_01 = (RuneItem *)0x0;
  }
  return this_01;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Buy
ADDRESS: 00478bc0
========================================

/* InventoryScene::Buy(ShopItem*, PayType) */

void __thiscall InventoryScene::Buy(InventoryScene *this,ShopItem *param_1,uint param_3)

{
  vector<BaseItem*,std::__ndk1::allocator<BaseItem*>> *this_00;
  int iVar1;
  int iVar2;
  undefined4 uVar3;
  undefined4 uVar4;
  undefined4 uVar5;
  char *pcVar6;
  ulong uVar7;
  RuneItem *pRVar8;
  EquipItem *pEVar9;
  undefined8 uVar10;
  EquipItem **ppEVar11;
  uint uVar12;
  undefined8 *puVar13;
  long lVar14;
  undefined8 *puVar15;
  ulong uVar16;
  undefined8 *puVar17;
  InventoryScene *pIVar18;
  long lVar19;
  RuneItem *local_70;
  EquipItem *local_68;
  EquipItem *local_60;
  long local_58;
  
  ppEVar11 = (EquipItem **)&local_70;
  uVar16 = (ulong)param_3;
  lVar19 = *(long *)PTR___stack_chk_guard_00c419a0;
  uVar12 = *(uint *)(param_1 + 0x538);
  local_58 = lVar19;
  if (uVar12 < 2) {
    lVar14 = User::Ins(PTR_g_Common_00c44818[0x72]);
    iVar1 = EquipInven::FindEmptySlot(*(EquipInven **)(lVar14 + 0x43a8));
    if (iVar1 != -1) {
LAB_00478ca4:
      if (*(uint *)(param_1 + uVar16 * 0xc + 0x550) ==
          (*(uint *)(param_1 + uVar16 * 0xc + 0x54c) + *(uint *)(param_1 + uVar16 * 0xc + 0x548) ^
          0x3edd3b2d)) {
        uVar12 = *(uint *)(param_1 + uVar16 * 0xc + 0x54c) ^
                 *(uint *)(param_1 + uVar16 * 0xc + 0x548);
      }
      else {
        SafeVarMgr::Get();
        SafeVarMgr::BanHack();
        uVar12 = 0;
      }
      uVar7 = UserData::PayCheck((UserData *)PTR_g_UserData_00c41478,uVar16,uVar12);
      if ((uVar7 & 1) == 0) {
        if (lVar19 == local_58) {
          return;
        }
        goto LAB_004792b0;
      }
      Pay(this,uVar16,uVar12);
      if ((param_3 | 1) == 1) {
        SndMgr::PlayEffect(0xf);
      }
      iVar2 = rand();
      iVar1 = *(int *)(param_1 + 0x538);
      iVar2 = iVar2 % 100;
      if (iVar1 == 0) {
        if (iVar2 == 99) {
          uVar4 = 5;
        }
        else if (iVar2 < 0x5a) {
          uVar4 = 2;
          if (0x3b < iVar2) {
            uVar4 = 3;
          }
        }
        else {
          uVar4 = 4;
        }
        pEVar9 = operator_new(0x580);
                    /* try { // try from 00479198 to 004791ff has its CatchHandler @ 004792c4 */
        iVar1 = rand();
        uVar5 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
        uVar3 = UserData::GetAct((UserData *)PTR_g_UserData_00c41478);
        EquipItem::EquipItem(pEVar9,iVar1 % 7,uVar5,uVar3,uVar4,1);
        puVar13 = *(undefined8 **)(this + 0x8b0);
        local_60 = pEVar9;
        if (*(undefined8 **)(this + 0x8b8) <= puVar13) {
          ppEVar11 = &local_60;
          goto LAB_00479234;
        }
LAB_00479218:
        *puVar13 = pEVar9;
LAB_0047921c:
        *(long *)(this + 0x8b0) = *(long *)(this + 0x8b0) + 8;
      }
      else if (iVar1 == 1) {
        uVar4 = 3;
        if (0x3b < iVar2) {
          uVar4 = 4;
        }
        uVar5 = 5;
        if (iVar2 < 0x5a) {
          uVar5 = uVar4;
        }
        pEVar9 = operator_new(0x580);
                    /* try { // try from 00478e98 to 00478eff has its CatchHandler @ 004792c0 */
        iVar1 = rand();
        uVar4 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
        uVar3 = UserData::GetAct((UserData *)PTR_g_UserData_00c41478);
        EquipItem::EquipItem(pEVar9,iVar1 % 7,uVar4,uVar3,uVar5,1);
        puVar13 = *(undefined8 **)(this + 0x8b0);
        local_68 = pEVar9;
        if (puVar13 < *(undefined8 **)(this + 0x8b8)) goto LAB_00479218;
        ppEVar11 = &local_68;
LAB_00479234:
        std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::
        __push_back_slow_path<BaseItem*>
                  ((vector<BaseItem*,std::__ndk1::allocator<BaseItem*>> *)(this + 0x8a8),
                   (BaseItem **)ppEVar11);
      }
      else if (iVar1 == 2) {
        pRVar8 = operator_new(0x5a0);
                    /* try { // try from 00478dcc to 00478dd7 has its CatchHandler @ 004792b4 */
        RuneItem::RuneItem(pRVar8,0xffffffff,1);
        pIVar18 = this + 0x8b0;
        this_00 = (vector<BaseItem*,std::__ndk1::allocator<BaseItem*>> *)(this + 0x8a8);
        local_70 = pRVar8;
        if (*(undefined8 **)(this + 0x8b0) < *(undefined8 **)(this + 0x8b8)) {
          **(undefined8 **)(this + 0x8b0) = pRVar8;
          *(long *)pIVar18 = *(long *)pIVar18 + 8;
        }
        else {
          std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::
          __push_back_slow_path<BaseItem*>(this_00,(BaseItem **)&local_70);
        }
        pRVar8 = operator_new(0x5a0);
                    /* try { // try from 00478f54 to 00478f5f has its CatchHandler @ 004792b4 */
        RuneItem::RuneItem(pRVar8,0xffffffff,1);
        local_70 = pRVar8;
        if (*(undefined8 **)(this + 0x8b0) < *(undefined8 **)(this + 0x8b8)) {
          **(undefined8 **)(this + 0x8b0) = pRVar8;
          *(long *)pIVar18 = *(long *)pIVar18 + 8;
        }
        else {
          std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::
          __push_back_slow_path<BaseItem*>(this_00,(BaseItem **)&local_70);
        }
        pRVar8 = operator_new(0x5a0);
                    /* try { // try from 00478fa0 to 00478fab has its CatchHandler @ 004792b4 */
        RuneItem::RuneItem(pRVar8,0xffffffff,1);
        local_70 = pRVar8;
        if (*(undefined8 **)(this + 0x8b0) < *(undefined8 **)(this + 0x8b8)) {
          **(undefined8 **)(this + 0x8b0) = pRVar8;
          *(long *)pIVar18 = *(long *)pIVar18 + 8;
        }
        else {
          std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::
          __push_back_slow_path<BaseItem*>(this_00,(BaseItem **)&local_70);
        }
        pRVar8 = operator_new(0x5a0);
                    /* try { // try from 00478fec to 00478ff7 has its CatchHandler @ 004792b4 */
        RuneItem::RuneItem(pRVar8,0xffffffff,1);
        local_70 = pRVar8;
        if (*(undefined8 **)(this + 0x8b0) < *(undefined8 **)(this + 0x8b8)) {
          **(undefined8 **)(this + 0x8b0) = pRVar8;
          *(long *)pIVar18 = *(long *)pIVar18 + 8;
        }
        else {
          std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::
          __push_back_slow_path<BaseItem*>(this_00,(BaseItem **)&local_70);
        }
        pRVar8 = operator_new(0x5a0);
                    /* try { // try from 00479038 to 00479043 has its CatchHandler @ 004792b4 */
        RuneItem::RuneItem(pRVar8,0xffffffff,1);
        local_70 = pRVar8;
        if (*(undefined8 **)(this + 0x8b0) < *(undefined8 **)(this + 0x8b8)) {
          **(undefined8 **)(this + 0x8b0) = pRVar8;
          *(long *)pIVar18 = *(long *)pIVar18 + 8;
        }
        else {
          std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::
          __push_back_slow_path<BaseItem*>(this_00,(BaseItem **)&local_70);
        }
        pRVar8 = operator_new(0x5a0);
                    /* try { // try from 00479084 to 0047908f has its CatchHandler @ 004792b4 */
        RuneItem::RuneItem(pRVar8,0xffffffff,1);
        local_70 = pRVar8;
        if (*(undefined8 **)(this + 0x8b0) < *(undefined8 **)(this + 0x8b8)) {
          **(undefined8 **)(this + 0x8b0) = pRVar8;
          *(long *)pIVar18 = *(long *)pIVar18 + 8;
        }
        else {
          std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::
          __push_back_slow_path<BaseItem*>(this_00,(BaseItem **)&local_70);
        }
        pRVar8 = operator_new(0x5a0);
                    /* try { // try from 004790d0 to 004790db has its CatchHandler @ 004792b4 */
        RuneItem::RuneItem(pRVar8,0xffffffff,1);
        local_70 = pRVar8;
        if (*(undefined8 **)(this + 0x8b8) <= *(undefined8 **)(this + 0x8b0)) {
          goto LAB_00479234;
        }
        **(undefined8 **)(this + 0x8b0) = pRVar8;
        goto LAB_0047921c;
      }
      pIVar18 = this + 0x8b0;
      puVar17 = *(undefined8 **)pIVar18;
      puVar13 = *(undefined8 **)(this + 0x8a8);
      if (*(undefined8 **)(this + 0x8a8) != puVar17) {
        do {
          puVar15 = puVar13 + 1;
          GiveBuyItem(this,(BaseItem *)*puVar13);
          puVar13 = puVar15;
        } while (puVar17 != puVar15);
        lVar14 = *(long *)pIVar18;
        if (lVar14 != *(long *)(this + 0x8a8)) {
          *(ulong *)pIVar18 =
               lVar14 + (~((lVar14 + -8) - *(long *)(this + 0x8a8)) & 0xfffffffffffffff8U);
        }
      }
      if (lVar19 == local_58) {
        UpdateMoney(this);
        return;
      }
      goto LAB_004792b0;
    }
    uVar10 = 0;
  }
  else {
    if (uVar12 == 2) {
      iVar1 = UserData::GetGameLevel((UserData *)PTR_g_UserData_00c41478);
      if ((1 < iVar1) || (PTR_g_Common_00c44818[0x72] != '\0')) goto LAB_00478ca4;
    }
    else if (uVar12 == 3) {
      iVar1 = CommonSystem::GetFreeChestLeftTime();
      if (iVar1 == 0) {
        if (lVar19 == local_58) {
          CommonSystem::ShowAD(2);
          return;
        }
        goto LAB_004792b0;
      }
    }
    else {
      if (*(int *)PTR_g_IAP_00c42088 == 2) {
        if (uVar12 == 5) {
          if (*(uint *)(PTR_g_UserData_00c41478 + 0xb4) !=
              (*(int *)(PTR_g_UserData_00c41478 + 0xb0) + *(int *)(PTR_g_UserData_00c41478 + 0xac) ^
              0x3edd3b2dU)) {
            SafeVarMgr::Get();
            SafeVarMgr::BanHack();
            uVar12 = *(uint *)(param_1 + 0x538);
            goto LAB_00479118;
          }
          if (*(int *)(PTR_g_UserData_00c41478 + 0xb0) == *(int *)(PTR_g_UserData_00c41478 + 0xac))
          goto LAB_00479144;
        }
        else {
LAB_00479118:
          if ((uVar12 != 6) || (*(int *)(PTR_g_UserData_00c41478 + 0x108) != 0x155c)) {
LAB_00479144:
            uVar4 = ShopItem::GetCashType(param_1);
            if (lVar19 == local_58) {
              InAppPurchase::Purchase((InAppPurchase *)PTR_g_IAP_00c42088,uVar4);
              return;
            }
            goto LAB_004792b0;
          }
        }
        uVar10 = 1;
        goto LAB_00478d00;
      }
      if (*(int *)PTR_g_IAP_00c42088 == 3) {
        uVar10 = 9;
        goto LAB_00478d00;
      }
    }
    uVar10 = 6;
  }
LAB_00478d00:
  pcVar6 = (char *)GameMsg::Get(0x11,uVar10);
  if (lVar19 == local_58) {
    CommonSystem::ShowSystemMsg(pcVar6,false);
    return;
  }
LAB_004792b0:
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Upgrade
ADDRESS: 0047cd48
========================================

/* RuneItem::Upgrade() */

void __thiscall RuneItem::Upgrade(RuneItem *this)

{
  uint uVar1;
  int iVar2;
  Soul *this_00;
  Sprite *pSVar3;
  uint uVar4;
  long lVar5;
  
  if (*(uint *)(this + 0x55c) == (*(uint *)(this + 0x558) + *(uint *)(this + 0x554) ^ 0x3edd3b2d)) {
    lVar5 = (long)(int)((*(uint *)(this + 0x558) ^ *(uint *)(this + 0x554)) - 1);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    lVar5 = -1;
  }
  iVar2 = *(int *)(&DAT_009c74dc + lVar5 * 4);
  if (*(uint *)(this + 0x568) == (*(uint *)(this + 0x564) + *(uint *)(this + 0x560) ^ 0x3edd3b2d)) {
    uVar4 = *(uint *)(this + 0x564) ^ *(uint *)(this + 0x560);
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar4 = 0;
  }
  uVar1 = rand();
  uVar4 = uVar1 ^ uVar4 - iVar2;
  *(uint *)(this + 0x560) = uVar4;
  *(uint *)(this + 0x568) = uVar4 + uVar1 ^ 0x3edd3b2d;
  *(uint *)(this + 0x564) = uVar1;
  if (*(uint *)(this + 0x55c) == (*(uint *)(this + 0x558) + *(uint *)(this + 0x554) ^ 0x3edd3b2d)) {
    uVar4 = (*(uint *)(this + 0x558) ^ *(uint *)(this + 0x554)) + 1;
  }
  else {
    SafeVarMgr::Get();
    SafeVarMgr::BanHack();
    uVar4 = 1;
  }
  uVar1 = rand();
  *(uint *)(this + 0x554) = uVar1 ^ uVar4;
  *(uint *)(this + 0x558) = uVar1;
  *(uint *)(this + 0x55c) = (uVar1 ^ uVar4) + uVar1 ^ 0x3edd3b2d;
  ShowInfo(this,true);
  this_00 = (Soul *)(**(code **)(*(long *)this + 0x228))(this,2);
  if (this_00 == (Soul *)0x0) {
    this_00 = operator_new(0x540);
                    /* try { // try from 0047ce9c to 0047ceb3 has its CatchHandler @ 0047cfac */
    pSVar3 = (Sprite *)(**(code **)(*(long *)this + 0x228))(this,0);
    Effect::Soul::Soul(this_00,pSVar3);
    (**(code **)(*(long *)this + 0x218))(this,this_00,3,2);
  }
  Effect::Soul::Run(this_00);
  SndMgr::PlayEffect(0x11);
  SndMgr::PlayEffect(0x10);
  SetLevelupMark(this);
  if (*(int *)(this + 0x550) == 0xb) {
    if (*(uint *)(this + 0x55c) != (*(uint *)(this + 0x558) + *(uint *)(this + 0x554) ^ 0x3edd3b2d))
    {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      return;
    }
    if ((*(uint *)(this + 0x558) ^ *(uint *)(this + 0x554)) == 5) {
      if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
         (iVar2 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar2 != 0)) {
                    /* try { // try from 0047cf48 to 0047cf53 has its CatchHandler @ 0047cfc0 */
        StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
        __cxa_guard_release(PTR_stageMgr_00c43eb0);
      }
      StageMgr::OpenStage((StageMgr *)PTR_stageMgr_00c430c8,7,0);
      return;
    }
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Upgrade
ADDRESS: 0047dad0
========================================

/* SkillItem::Upgrade() */

undefined8 __thiscall SkillItem::Upgrade(SkillItem *this)

{
  undefined *puVar1;
  uint uVar2;
  int iVar3;
  char *pcVar4;
  Soul *this_00;
  Sprite *pSVar5;
  undefined8 uVar6;
  
  puVar1 = PTR_g_UserData_00c41478;
  uVar2 = UserData::GetSkillLevel((UserData *)PTR_g_UserData_00c41478,*(undefined4 *)(this + 0x540))
  ;
  iVar3 = UserData::GetSkillPoint((UserData *)puVar1);
  if (iVar3 <= (int)uVar2) {
    uVar6 = 5;
    goto LAB_0047db60;
  }
  iVar3 = *(int *)(this + 0x540);
  if (iVar3 == 2) {
    iVar3 = UserData::GetAct((UserData *)PTR_g_UserData_00c41478);
    if (1 < iVar3) {
      iVar3 = *(int *)(this + 0x540);
      goto LAB_0047db30;
    }
  }
  else {
LAB_0047db30:
    if ((iVar3 != 3) || (iVar3 = UserData::GetAct((UserData *)PTR_g_UserData_00c41478), 4 < iVar3))
    {
      puVar1 = PTR_g_UserData_00c41478;
      UserData::AddSkillPoint((UserData *)PTR_g_UserData_00c41478,~uVar2);
      UserData::IncreaseSkillLevel((UserData *)puVar1,*(undefined4 *)(this + 0x540));
      this_00 = (Soul *)(**(code **)(*(long *)this + 0x228))(this,2);
      if (this_00 == (Soul *)0x0) {
        this_00 = operator_new(0x540);
                    /* try { // try from 0047dbc4 to 0047dbdb has its CatchHandler @ 0047dc24 */
        pSVar5 = (Sprite *)(**(code **)(*(long *)this + 0x228))(this,0);
        Effect::Soul::Soul(this_00,pSVar5);
        (**(code **)(*(long *)this + 0x218))(this,this_00,100,2);
      }
      Effect::Soul::Run(this_00);
      SndMgr::PlayEffect(0x11);
      SndMgr::PlayEffect(0x10);
      return 1;
    }
  }
  uVar6 = 6;
LAB_0047db60:
  pcVar4 = (char *)GameMsg::Get(0x11,uVar6);
  CommonSystem::ShowSystemMsg(pcVar4,false);
  return 0;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: SetDrop
ADDRESS: 0047e6b8
========================================

/* DropingItem::SetDrop(bool) */

void __thiscall DropingItem::SetDrop(DropingItem *this,bool param_1)

{
  int iVar1;
  long lVar2;
  long *plVar3;
  long lVar4;
  undefined8 local_40;
  long local_38;
  
  lVar4 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar4;
  if (param_1) {
    this[0x538] = (DropingItem)0x1;
    *(undefined4 *)(this + 0x53c) = 0x43fa0000;
    if (*(int *)(this + 0x534) == 10) {
      *(undefined8 *)(this + 0x540) = 0xc2480000;
    }
    else if (*(int *)(this + 0x534) == 9) {
      *(undefined8 *)(this + 0x540) = 0x42c80000;
    }
    else {
      iVar1 = rand();
      *(float *)(this + 0x540) = (float)(iVar1 % 200 + -100);
      iVar1 = rand();
      *(float *)(this + 0x544) = (float)-(iVar1 % 0x32);
    }
    plVar3 = (long *)(**(code **)(*(long *)this + 0x228))(this,1);
    if (plVar3 != (long *)0x0) {
      (**(code **)(*plVar3 + 0x170))(plVar3,0);
    }
    SndMgr::PlayEffect(0x1b);
    if (lVar4 == local_38) {
      cocos2d::Node::schedule((_func_void_float *)this);
      return;
    }
  }
  else {
    local_40 = 0x3f0000003f000000;
    (**(code **)(*(long *)this + 0x148))(this,&local_40);
    plVar3 = *(long **)(this + 0x548);
    if (plVar3 != (long *)0x0) {
      (**(code **)(*plVar3 + 0x170))(plVar3,0);
    }
    plVar3 = (long *)(**(code **)(*(long *)this + 0x228))(this,0);
    (**(code **)(*plVar3 + 0x180))(0);
    plVar3 = (long *)(**(code **)(*(long *)this + 0x228))(this,0);
    (**(code **)(*plVar3 + 0x98))(plVar3,PTR_ZERO_00c41d10);
    lVar2 = (**(code **)(*(long *)this + 0x228))(this,2);
    if (lVar2 != 0) {
      plVar3 = (long *)(**(code **)(*(long *)this + 0x228))(this,2);
      (**(code **)(*plVar3 + 0x170))(plVar3,0);
    }
    plVar3 = (long *)(**(code **)(*(long *)this + 0x228))(this,1);
    if (plVar3 != (long *)0x0) {
      (**(code **)(*plVar3 + 0x180))(0,plVar3);
      (**(code **)(*plVar3 + 0x170))(plVar3,1);
    }
    if (lVar4 == local_38) {
      return;
    }
  }
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: Droping
ADDRESS: 0047e904
========================================

/* DropingItem::Droping(float) */

void DropingItem::Droping(float param_1)

{
  code *pcVar1;
  DropingItem *in_x0;
  long *plVar2;
  undefined8 *puVar3;
  undefined4 uVar4;
  long lVar5;
  float fVar6;
  float fVar7;
  float local_50;
  float fStack_4c;
  long local_48;
  
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  fVar7 = *(float *)(PTR_g_Common_00c44818 + 0x1c);
  local_48 = lVar5;
  if (fVar7 == 0.0) goto LAB_0047ea80;
  plVar2 = (long *)(**(code **)(*(long *)in_x0 + 0x228))();
  pcVar1 = *(code **)(*plVar2 + 0x180);
  fVar6 = (float)(**(code **)(*plVar2 + 0x188))();
  (*pcVar1)(fVar7 * DAT_009c48f8 + fVar6,plVar2);
  puVar3 = (undefined8 *)(**(code **)(*plVar2 + 0xb0))(plVar2);
  _local_50 = CONCAT44(fVar7 * *(float *)(in_x0 + 0x544) + (float)((ulong)*puVar3 >> 0x20) +
                       fVar7 * *(float *)(in_x0 + 0x53c),
                       fVar7 * *(float *)(in_x0 + 0x540) + (float)*puVar3);
  (**(code **)(*plVar2 + 0x98))(plVar2,&local_50);
  *(float *)(in_x0 + 0x53c) = *(float *)(in_x0 + 0x53c) + fVar7 * DAT_009c7258;
  param_1 = (float)(**(code **)(*plVar2 + 0xf0))(plVar2);
  if (*(float *)(in_x0 + 0x544) <= param_1) goto LAB_0047ea80;
  cocos2d::Node::unschedule((_func_void_float *)in_x0);
  switch(*(undefined4 *)(in_x0 + 0x534)) {
  case 0:
    uVar4 = 0x18;
    if (*(int *)(in_x0 + 0x55c) == 5) {
      uVar4 = 0x19;
    }
    break;
  case 1:
  case 8:
    uVar4 = 0x12;
    break;
  default:
    goto switchD_0047ea48_caseD_2;
  case 5:
    uVar4 = 0xf;
    break;
  case 6:
  case 7:
  case 9:
  case 10:
    uVar4 = 0x1c;
  }
  SndMgr::PlayEffect(uVar4);
switchD_0047ea48_caseD_2:
  param_1 = (float)SetDroped(in_x0);
LAB_0047ea80:
  if (lVar5 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail(param_1);
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: PlayDropSound
ADDRESS: 0047eaa8
========================================

/* DropingItem::PlayDropSound() */

void __thiscall DropingItem::PlayDropSound(DropingItem *this)

{
  undefined4 uVar1;
  
  switch(*(undefined4 *)(this + 0x534)) {
  case 0:
    break;
  case 1:
  case 8:
    SndMgr::PlayEffect(0x12);
    return;
  default:
    return;
  case 5:
    SndMgr::PlayEffect(0xf);
    return;
  case 6:
  case 7:
  case 9:
  case 10:
    SndMgr::PlayEffect(0x1c);
    return;
  }
  uVar1 = 0x18;
  if (*(int *)(this + 0x55c) == 5) {
    uVar1 = 0x19;
  }
  SndMgr::PlayEffect(uVar1);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: StaminaUpEfffect
ADDRESS: 0048249c
========================================

/* LobbyScene::StaminaUpEfffect() */

void __thiscall LobbyScene::StaminaUpEfffect(LobbyScene *this)

{
  Effect::Soul::Run(*(Soul **)(this + 0x458));
  (**(code **)(**(long **)(this + 0x450) + 0x170))(*(long **)(this + 0x450),0);
  SndMgr::PlayEffect(0x11);
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: FrameMove
ADDRESS: 004d0ecc
========================================

/* MsgBox::FrameMove(float) */

undefined8 __thiscall MsgBox::FrameMove(MsgBox *this,float param_1)

{
  uint uVar1;
  int iVar2;
  ulong uVar3;
  long *plVar4;
  float fVar5;
  float fVar6;
  undefined4 uVar7;
  
  if (*(float *)(this + 0x334) == 0.0) {
    return 0;
  }
  uVar3 = (**(code **)(*(long *)this + 0x178))(this);
  if ((uVar3 & 1) == 0) {
    return 0;
  }
  if (((byte)this[0x340] & 1) != 0) {
    plVar4 = (long *)(**(code **)(*(long *)this + 0x260))(this);
    fVar5 = (float)(**(code **)(*plVar4 + 0x88))();
    fVar5 = 1.0 / fVar5;
    fVar6 = (float)(**(code **)(*(long *)this + 0x88))(this);
    if (fVar6 < fVar5) {
      fVar6 = (float)(**(code **)(*(long *)this + 0x88))(this);
      fVar6 = param_1 * 10.0 * fVar5 + fVar6;
      if (fVar6 <= fVar5) {
        fVar5 = fVar6;
      }
      (**(code **)(*(long *)this + 0x80))(fVar5,this);
    }
  }
  fVar5 = *(float *)(this + 0x334);
  *(float *)(this + 0x334) = fVar5 - param_1;
  if (fVar5 - param_1 < 0.0) {
    *(undefined4 *)(this + 0x334) = 0;
    (**(code **)(*(long *)this + 0x170))(this,0);
    return 0;
  }
  if (((uint)*(undefined8 *)(this + 0x340) >> 1 & 1) == 0) {
    return 1;
  }
  *(float *)(this + 0x344) = (float)((ulong)*(undefined8 *)(this + 0x340) >> 0x20) - param_1;
  iVar2 = cocos2d::Label::getStringLength(*(Label **)(this + 0x328));
  if (iVar2 <= *(int *)(this + 0x348)) {
    return 1;
  }
  if (0.0 < *(float *)(this + 0x344)) {
    return 1;
  }
  plVar4 = (long *)(**(code **)(**(long **)(this + 0x328) + 0x5c8))();
  uVar1 = *(uint *)(*(long *)(*(long *)(this + 0x328) + 0x3f0) + (long)*(int *)(this + 0x348) * 0x18
                   );
  uVar3 = (ulong)uVar1;
  if (uVar1 < 0x40) {
    if ((1L << (uVar3 & 0x3f) & 0x8000530300000000U) == 0) {
      if ((1L << (uVar3 & 0x3f) & 0x600U) != 0) {
        uVar7 = DAT_009c48bc;
        goto LAB_004d10e4;
      }
      if (uVar3 == 0xd) {
        uVar7 = 0;
        goto LAB_004d10e4;
      }
      goto LAB_004d109c;
    }
  }
  else {
LAB_004d109c:
    if (uVar1 != 0x7e) {
      iVar2 = *(int *)(PTR_g_Settings_00c440f0 + 8);
      uVar7 = DAT_00a19150;
      if ((iVar2 == 1) || (iVar2 == 5)) goto LAB_004d10e4;
      if (iVar2 == 10) {
        uVar7 = DAT_009c4894;
        goto LAB_004d10e4;
      }
    }
  }
  uVar7 = DAT_00a19154;
LAB_004d10e4:
  *(undefined4 *)(this + 0x344) = uVar7;
  *(int *)(this + 0x348) = *(int *)(this + 0x348) + 1;
  if ((plVar4 != (long *)0x0) && (-1 < plVar4[0x61])) {
    SndMgr::PlayEffect(0x12);
    (**(code **)(*plVar4 + 0x170))(plVar4,1);
  }
  return 1;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: PickUpItem
ADDRESS: 004dddcc
========================================

/* Stage::PickUpItem() */

Ref * __thiscall Stage::PickUpItem(Stage *this)

{
  undefined *puVar1;
  int iVar2;
  long lVar3;
  User *this_00;
  undefined8 uVar4;
  Ref *this_01;
  
  puVar1 = PTR_g_Common_00c44818;
  if (*(int *)(this + 0x3b0) == -1) {
    return (Ref *)0x0;
  }
  if (*(long *)(this + 0x3a0) == *(long *)(this + 0x398)) {
    return (Ref *)0x0;
  }
  this_01 = *(Ref **)(*(long *)(this + 0x398) + (long)*(int *)(this + 0x3b0) * 8);
  lVar3 = User::Ins(PTR_g_Common_00c44818[0x72]);
  if ((*(int *)(this_01 + 0x534) == 0) &&
     (iVar2 = EquipInven::FindEmptySlot(*(EquipInven **)(lVar3 + 0x43a8)), iVar2 == -1)) {
    return (Ref *)0x0;
  }
  *(undefined8 *)(*(long *)(this + 0x398) + (long)*(int *)(this + 0x3b0) * 8) = 0;
  cocos2d::Ref::retain(this_01);
  DropingItem::SetDrop((DropingItem *)this_01,false);
  (**(code **)(*(long *)this + 0x280))(this,this_01,0);
  *(undefined4 *)(this + 0x3b0) = 0xffffffff;
  this_00 = (User *)User::Ins(puVar1[0x72]);
  User::TakeNewItem(this_00,(BaseItem *)this_01,true);
  iVar2 = *(int *)(this_01 + 0x534);
  if (iVar2 - 9U < 2) {
LAB_004ddea8:
    uVar4 = 0xb;
  }
  else {
    if (iVar2 == 0) {
      if (((*PTR_joy_00c41bc0 & 1) == 0) &&
         (iVar2 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar2 != 0)) {
                    /* try { // try from 004dded4 to 004ddedf has its CatchHandler @ 004ddf38 */
        GameUI::GameUI((GameUI *)PTR_joy_00c42890);
        __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
        __cxa_guard_release(PTR_joy_00c41bc0);
      }
      GameUI::UpdateInvenState((GameUI *)PTR_joy_00c42890);
    }
    else if (iVar2 == 6) goto LAB_004ddea8;
    uVar4 = 0x18;
  }
  SndMgr::PlayEffect(uVar4);
  return this_01;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: FrameMove
ADDRESS: 004de0a4
========================================

/* Stage::FrameMove(float) */

void __thiscall Stage::FrameMove(Stage *this,float param_1)

{
  undefined *puVar1;
  undefined *puVar2;
  undefined *puVar3;
  int iVar4;
  uint uVar5;
  ulong uVar6;
  long *plVar7;
  undefined8 uVar8;
  float *pfVar9;
  Vec2 *pVVar10;
  Character *pCVar11;
  User *this_00;
  long *plVar12;
  uint uVar13;
  long lVar14;
  code *pcVar15;
  float fVar16;
  Rect aRStack_78 [16];
  long local_68;
  
  lVar14 = *(long *)PTR___stack_chk_guard_00c419a0;
  *(float *)(this + 0x378) = *(float *)(this + 0x378) + param_1;
  local_68 = lVar14;
  uVar6 = ScriptMgr::RunScript(*(ScriptMgr **)(this + 0x370),param_1);
  if (param_1 != 0.0) {
    InteractCharacter(this,param_1);
    MoveWorld(this,param_1);
    CullingCharacter(this);
    ProcCollision();
    puVar2 = PTR_ctrl_00c443d8;
    if (((*PTR_ctrl_00c443d8 & 1) == 0) &&
       (iVar4 = __cxa_guard_acquire(PTR_ctrl_00c443d8), puVar3 = PTR_ctrl_00c42e40, iVar4 != 0)) {
      puVar1 = PTR_ctrl_00c42e40 + 0x38;
      *(undefined4 *)(PTR_ctrl_00c42e40 + 4) = 0;
      *(undefined4 *)(puVar3 + 8) = 0;
      *(undefined4 *)(puVar3 + 0x20) = 0;
      *(undefined4 *)(puVar3 + 0x24) = 0;
      memset(puVar1,0,0xff);
      __cxa_guard_release(PTR_ctrl_00c443d8);
    }
    puVar3 = PTR_ctrl_00c42e40;
    plVar7 = (long *)InputMgr::GetCharacter((InputMgr *)PTR_ctrl_00c42e40);
    plVar12 = *(long **)(this + 800);
    if (plVar7 == (long *)0x0) {
      (**(code **)(*plVar12 + 0x170))(plVar12,0);
    }
    else {
      (**(code **)(*plVar12 + 0x170))(plVar12,1);
      plVar12 = *(long **)(this + 800);
      pcVar15 = *(code **)(*plVar12 + 0x98);
      uVar8 = (**(code **)(*plVar7 + 0xb0))(plVar7);
      (*pcVar15)(plVar12,uVar8);
      if ((*(uint *)((long)plVar7 + 0x41c4) >> 0x19 & 1) == 0) {
        plVar12 = *(long **)(this + 800);
        pcVar15 = *(code **)(*plVar12 + 0x4c0);
        uVar8 = GetColor((*(uint *)((long)plVar7 + 0x41c4) >> 10 & 1) != 0);
        (*pcVar15)(plVar12,uVar8);
      }
      else {
        (**(code **)(**(long **)(this + 800) + 0x4c0))(*(long **)(this + 800),PTR_WHITE_00c437b0);
      }
      fVar16 = 1.0;
      if (0.0 <= *(float *)(this + 0x328) - param_1) {
        fVar16 = *(float *)(this + 0x328) - param_1;
      }
      *(float *)(this + 0x328) = fVar16;
      (**(code **)(**(long **)(this + 800) + 0x490))
                (*(long **)(this + 800),(int)(fVar16 * DAT_009c48b4));
    }
    if (this[0x3e1] != (Stage)0x0) {
      AutoPickupProc(this);
    }
    uVar6 = 0;
    if (*(long **)(this + 1000) != (long *)0x0) {
      fVar16 = (float)(**(code **)(**(long **)(this + 1000) + 0x88))();
      if (fVar16 < DAT_009c4884) {
        fVar16 = param_1 * 3.0 + fVar16;
        if (DAT_009c4884 < fVar16) {
          fVar16 = DAT_009c4884;
        }
        (**(code **)(**(long **)(this + 1000) + 0x80))(fVar16);
      }
      iVar4 = rand();
      uVar6 = (**(code **)(**(long **)(this + 1000) + 0x490))
                        (*(long **)(this + 1000),iVar4 % 0x9c + 100);
      puVar1 = PTR_g_Common_00c44818;
      if ((*(int *)(this + 0x388) != 0) && (*(int *)(this + 0x388) != 7)) {
        if (*(float *)(this + 0x3d0) == 0.0) {
          plVar7 = (long *)User::Ins(PTR_g_Common_00c44818[0x72]);
          pfVar9 = (float *)(**(code **)(*plVar7 + 0xb0))();
          cocos2d::Rect::Rect(aRStack_78,*pfVar9 + -20.0,pfVar9[1] + -20.0,DAT_009c68ac,DAT_009c68ac
                             );
          pVVar10 = (Vec2 *)(**(code **)(**(long **)(this + 1000) + 0xb0))();
          uVar6 = cocos2d::Rect::containsPoint(aRStack_78,pVVar10);
          if ((uVar6 & 1) != 0) {
            this[0x32c] = (Stage)0x1;
            pCVar11 = (Character *)User::Ins(puVar1[0x72]);
            Character::Stand(pCVar11,true);
            if (((*puVar2 & 1) == 0) && (iVar4 = __cxa_guard_acquire(PTR_ctrl_00c443d8), iVar4 != 0)
               ) {
              *(undefined4 *)(puVar3 + 4) = 0;
              *(undefined4 *)(puVar3 + 8) = 0;
              *(undefined4 *)(puVar3 + 0x20) = 0;
              *(undefined4 *)(puVar3 + 0x24) = 0;
              memset(puVar3 + 0x38,0,0xff);
              __cxa_guard_release(PTR_ctrl_00c443d8);
            }
            InputMgr::Reset((InputMgr *)PTR_ctrl_00c42e40);
            if (((*PTR_joy_00c41bc0 & 1) == 0) &&
               (iVar4 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar4 != 0)) {
                    /* try { // try from 004de450 to 004de45b has its CatchHandler @ 004de584 */
              GameUI::GameUI((GameUI *)PTR_joy_00c42890);
              __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
              __cxa_guard_release(PTR_joy_00c41bc0);
            }
            GameUI::Show((GameUI *)PTR_joy_00c42890,false);
            *(float *)(this + 0x3d0) = param_1;
            CommonSystem::Fade(false);
            this_00 = (User *)User::Ins(puVar1[0x72]);
            User::EnableRuneEffect(this_00,false);
            pCVar11 = (Character *)User::Ins(puVar1[0x72]);
            Character::FadeOut(pCVar11);
            SndMgr::PlayEffect(0x10);
            SndMgr::PlayEffect(0x11);
            this[0x3e0] = (Stage)0x1;
            puVar2 = PTR_g_Hard_00c41970;
            if (puVar1[0x72] != '\0') {
              if (*(uint *)(PTR_g_Hard_00c41970 + 8) ==
                  (*(uint *)(PTR_g_Hard_00c41970 + 4) + *(uint *)PTR_g_Hard_00c41970 ^ 0x3edd3b2d))
              {
                uVar13 = (*(uint *)(PTR_g_Hard_00c41970 + 4) ^ *(uint *)PTR_g_Hard_00c41970) + 1;
              }
              else {
                SafeVarMgr::Get();
                SafeVarMgr::BanHack();
                uVar13 = 1;
              }
              uVar5 = rand();
              *(uint *)puVar2 = uVar5 ^ uVar13;
              *(uint *)(puVar2 + 4) = uVar5;
              *(uint *)(puVar2 + 8) = (uVar5 ^ uVar13) + uVar5 ^ 0x3edd3b2d;
              StageData::Reset((StageData *)PTR_g_StageData_00c41cc8);
            }
            uVar6 = UserData::BackupData((UserData *)PTR_g_UserData_00c41478);
          }
        }
        else {
          fVar16 = *(float *)(this + 0x3d0) + param_1;
          *(float *)(this + 0x3d0) = fVar16;
          if (2.5 <= fVar16) {
            uVar6 = *(ulong *)PTR_g_GameScene_00c41fb0;
            if (lVar14 == local_68) {
              GameScene::Close();
              return;
            }
            goto LAB_004de580;
          }
        }
      }
    }
  }
  if (lVar14 == local_68) {
    return;
  }
LAB_004de580:
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail(uVar6);
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: ShockWave
ADDRESS: 004e140c
========================================

/* User::ShockWave() */

void __thiscall User::ShockWave(User *this)

{
  undefined *puVar1;
  int iVar2;
  LevelUpLight *this_00;
  Character *pCVar3;
  undefined8 uVar4;
  int *piVar5;
  Character *this_01;
  undefined8 *puVar6;
  undefined8 *puVar7;
  
  this_00 = (LevelUpLight *)
            (**(code **)(**(long **)(this + 0x330) + 0x228))(*(long **)(this + 0x330),5);
  if (this_00 == (LevelUpLight *)0x0) {
    this_00 = operator_new(0x540);
                    /* try { // try from 004e1454 to 004e1457 has its CatchHandler @ 004e15a8 */
    Effect::LevelUpLight::LevelUpLight(this_00);
    (**(code **)(**(long **)(this + 0x330) + 0x218))(*(long **)(this + 0x330),this_00,1,5);
  }
  Effect::LevelUpLight::Run(this_00);
  SndMgr::PlayEffect(0x11);
  SndMgr::PlayEffect(0x10);
  if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
     (iVar2 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar2 != 0)) {
                    /* try { // try from 004e14b0 to 004e14bb has its CatchHandler @ 004e15bc */
    StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
    __cxa_guard_release(PTR_stageMgr_00c43eb0);
  }
  puVar1 = PTR_g_Common_00c44818;
  puVar7 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x360);
  for (puVar6 = *(undefined8 **)(*(long *)PTR_stageMgr_00c430c8 + 0x358); puVar6 != puVar7;
      puVar6 = puVar6 + 1) {
    this_01 = (Character *)*puVar6;
    if ((((byte)this_01[0x41c5] >> 2 & 1) != 0) &&
       (((piVar5 = *(int **)(this_01 + 0x41c8), piVar5 == (int *)0x0 || (*piVar5 == 0)) ||
        (-1 < *(char *)(*(long *)(piVar5 + 2) + (long)*(int *)(this_01 + 0x41d0) * 0x50 + 0x3c)))))
    {
      pCVar3 = (Character *)Ins(puVar1[0x72]);
      Character::SetTarget(this_01,pCVar3);
      Character::WatchTarget(this_01);
      if (((byte)this_01[0x41c5] & 1) == 0) {
        uVar4 = 0x17;
      }
      else {
        uVar4 = 0x1f;
      }
      Character::SetMotion(this_01,uVar4,0);
      Character::SetTarget(this_01,(Character *)0x0);
    }
  }
  return;
}


###########################################################################
# SEARCH TARGET: SndMgr::PlayEffect
###########################################################################

========================================
FUNCTION: UseSkill
ADDRESS: 004e4990
========================================

/* User::UseSkill(Skill) */

undefined8 __thiscall User::UseSkill(User *this,uint param_2)

{
  int iVar1;
  long lVar2;
  Character *pCVar3;
  ulong uVar4;
  SkillItem *pSVar5;
  undefined8 uVar6;
  undefined4 uVar7;
  int *piVar8;
  float fVar9;
  
  switch(param_2) {
  case 0:
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar1 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar1 != 0)) {
                    /* try { // try from 004e49ec to 004e49f7 has its CatchHandler @ 004e4f84 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    pCVar3 = (Character *)Stage::GetSelectedChr(*(Stage **)PTR_stageMgr_00c430c8);
    *(Character **)(this + 0x42a0) = pCVar3;
    if (pCVar3 == (Character *)0x0) {
      return 0;
    }
    Character::Revival(pCVar3);
    Character::SetEnemy(*(Character **)(this + 0x42a0),false);
    lVar2 = *(long *)(this + 0x42a0);
    if ((*(int *)(lVar2 + 0x4274) == 6) || (*(int *)(lVar2 + 0x4274) == 0)) {
      uVar7 = 0xffffffff;
LAB_004e4c7c:
      *(undefined4 *)(lVar2 + 0x324) = uVar7;
    }
    else {
      *(undefined4 *)(lVar2 + 0x324) = 0;
      *(uint *)(lVar2 + 0x41c4) = *(uint *)(lVar2 + 0x41c4) | 0x2000;
      if (PTR_g_AIFlag_00c43b38[1] != '\0') {
        uVar7 = 1;
        goto LAB_004e4c7c;
      }
    }
    if (*(uint *)(lVar2 + 0x4210) ==
        (*(uint *)(lVar2 + 0x420c) + *(uint *)(lVar2 + 0x4208) ^ 0x3edd3b2d)) {
      fVar9 = (float)(*(uint *)(lVar2 + 0x420c) ^ *(uint *)(lVar2 + 0x4208));
    }
    else {
      SafeVarMgr::Get();
      SafeVarMgr::BanHack();
      fVar9 = 0.0;
    }
    if ((int)((ulong)(*(long *)(PTR_g_InvenSkill_00c434c8 + 0x370) -
                     (long)*(undefined8 **)(PTR_g_InvenSkill_00c434c8 + 0x368)) >> 3) == 0) {
      pSVar5 = (SkillItem *)0x0;
    }
    else {
      pSVar5 = (SkillItem *)**(undefined8 **)(PTR_g_InvenSkill_00c434c8 + 0x368);
    }
    iVar1 = SkillItem::GetAbility(pSVar5,-1);
    fVar9 = fVar9 * (float)iVar1 * DAT_009c48c0;
    (**(code **)(**(long **)(this + 0x42a0) + 0x660))(fVar9,*(long **)(this + 0x42a0),0);
    (**(code **)(**(long **)(this + 0x42a0) + 0x660))(fVar9,*(long **)(this + 0x42a0),2);
    pCVar3 = *(Character **)(this + 0x4378);
    if ((pCVar3[0x328] != (Character)0x0) && (*(long *)(this + 0x4380) == 0)) {
      lVar2 = *(long *)(this + 0x42a0);
      piVar8 = *(int **)(lVar2 + 0x41c8);
      if ((piVar8 != (int *)0x0) &&
         ((*piVar8 != 0 &&
          (*(char *)(*(long *)(piVar8 + 2) + (long)*(int *)(lVar2 + 0x41d0) * 0x50 + 0x3c) < '\0')))
         ) {
        *(undefined1 *)(lVar2 + 0x4308) = 1;
      }
      *(long *)(this + 0x4380) = lVar2;
      Character::SetDirection(pCVar3,*(undefined4 *)(lVar2 + 0x41f0),0);
      *(undefined1 *)(*(long *)(this + 0x4378) + 0x4308) = 1;
      *(undefined4 *)(this + 0x4388) = 0x3f800000;
    }
    piVar8 = *(int **)(this + 0x41c8);
    *(undefined8 *)(this + 0x42a0) = 0;
    if (((piVar8 != (int *)0x0) && (*piVar8 != 0)) &&
       ((*(byte *)(*(long *)(piVar8 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) >> 1 & 1) !=
        0)) goto LAB_004e4e2c;
    if (this[0x438c] != (User)0x0) {
      if (piVar8 != (int *)0x0) goto LAB_004e4e08;
      goto LAB_004e4e2c;
    }
joined_r0x004e4e38:
    if (piVar8 != (int *)0x0) {
LAB_004e4e44:
      if ((*piVar8 != 0) &&
         ((*(uint *)(*(long *)(piVar8 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) & 0x4010)
          == 0x10)) break;
    }
    uVar6 = 0x15;
    goto LAB_004e4e7c;
  case 1:
    if ((uint)((ulong)(*(long *)(PTR_g_InvenSkill_00c434c8 + 0x370) -
                      *(long *)(PTR_g_InvenSkill_00c434c8 + 0x368)) >> 3) < 3) {
      pSVar5 = (SkillItem *)0x0;
    }
    else {
      pSVar5 = *(SkillItem **)(*(long *)(PTR_g_InvenSkill_00c434c8 + 0x368) + 0x10);
    }
    iVar1 = SkillItem::GetAbility(pSVar5,-1);
    fVar9 = (float)iVar1 / DAT_009c4880 + 1.0;
    Character::Rage((Character *)this,fVar9 + fVar9);
    break;
  case 2:
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar1 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar1 != 0)) {
                    /* try { // try from 004e4a98 to 004e4aa3 has its CatchHandler @ 004e4f88 */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    lVar2 = Stage::GetSelectedChr(*(Stage **)PTR_stageMgr_00c430c8);
    *(long *)(this + 0x42a0) = lVar2;
    if (lVar2 == 0) {
      return 0;
    }
    pCVar3 = *(Character **)(this + 0x4378);
    if ((pCVar3[0x328] != (Character)0x0) && (*(long *)(this + 0x4380) == 0)) {
      piVar8 = *(int **)(lVar2 + 0x41c8);
      if ((piVar8 != (int *)0x0) &&
         ((*piVar8 != 0 &&
          (*(char *)(*(long *)(piVar8 + 2) + (long)*(int *)(lVar2 + 0x41d0) * 0x50 + 0x3c) < '\0')))
         ) {
        *(undefined1 *)(lVar2 + 0x4308) = 1;
      }
      *(long *)(this + 0x4380) = lVar2;
      Character::SetDirection(pCVar3,*(undefined4 *)(lVar2 + 0x41f0),0);
      *(undefined1 *)(*(long *)(this + 0x4378) + 0x4308) = 1;
      *(undefined4 *)(this + 0x4388) = 0x3f800000;
    }
    Character::Taming((Character *)this);
    piVar8 = *(int **)(this + 0x41c8);
    if (((piVar8 == (int *)0x0) || (*piVar8 == 0)) ||
       ((*(byte *)(*(long *)(piVar8 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) >> 1 & 1) ==
        0)) {
      if (this[0x438c] == (User)0x0) goto joined_r0x004e4e38;
      if (piVar8 == (int *)0x0) goto LAB_004e4e2c;
LAB_004e4e08:
      if ((*piVar8 != 0) &&
         (*(char *)(*(long *)(piVar8 + 2) + (long)*(int *)(this + 0x41d0) * 0x50 + 0x3c) < '\0'))
      goto LAB_004e4e44;
    }
LAB_004e4e2c:
    uVar6 = 0x3a;
LAB_004e4e7c:
    Character::SetMotion((Character *)this,uVar6,0);
    break;
  case 3:
    if (((*PTR_stageMgr_00c43eb0 & 1) == 0) &&
       (iVar1 = __cxa_guard_acquire(PTR_stageMgr_00c43eb0), iVar1 != 0)) {
                    /* try { // try from 004e4bb4 to 004e4bbf has its CatchHandler @ 004e4f8c */
      StageMgr::StageMgr((StageMgr *)PTR_stageMgr_00c430c8);
      __cxa_guard_release(PTR_stageMgr_00c43eb0);
    }
    pCVar3 = (Character *)Stage::GetSelectedChr(*(Stage **)PTR_stageMgr_00c430c8);
    if (pCVar3 == (Character *)0x0) {
      return 0;
    }
    Character::Rage_Monster(pCVar3);
    break;
  case 4:
    uVar4 = Character::SommonAvatar((Character *)this);
    if ((uVar4 & 1) == 0) {
      return 0;
    }
    SndMgr::PlayEffect(0x10);
  }
  if (((*PTR_joy_00c41bc0 & 1) == 0) && (iVar1 = __cxa_guard_acquire(PTR_joy_00c41bc0), iVar1 != 0))
  {
                    /* try { // try from 004e4ea8 to 004e4eb3 has its CatchHandler @ 004e4f74 */
    GameUI::GameUI((GameUI *)PTR_joy_00c42890);
    __cxa_atexit(PTR__GameUI_00c44310,PTR_joy_00c42890,PTR_DAT_00c41ab0);
    __cxa_guard_release(PTR_joy_00c41bc0);
  }
  GameUI::StartCoolTime((GameUI *)PTR_joy_00c42890,param_2);
  fVar9 = *(float *)(&DAT_00a19d14 + (ulong)param_2 * 4);
  if ((uint)((ulong)(*(long *)(PTR_g_InvenSkill_00c434c8 + 0x370) -
                    *(long *)(PTR_g_InvenSkill_00c434c8 + 0x368)) >> 3) < 2) {
    pSVar5 = (SkillItem *)0x0;
  }
  else {
    pSVar5 = *(SkillItem **)(*(long *)(PTR_g_InvenSkill_00c434c8 + 0x368) + 8);
  }
  iVar1 = SkillItem::GetAbility(pSVar5,-1);
  Character::AddPoint((Character *)-(fVar9 + fVar9 * ((float)iVar1 / DAT_009c3d50)),this,1);
  this[0x4317] = (User)0x1;
  return 1;
}


###########################################################################
# SEARCH TARGET: Inventory::Init
###########################################################################

========================================
FUNCTION: Init
ADDRESS: 004134c0
========================================

void __thiscall Inventory::Init(void)

{
  (*(code *)PTR_Init_00c37148)();
  return;
}


###########################################################################
# SEARCH TARGET: Inventory::Init
###########################################################################

========================================
FUNCTION: Init
ADDRESS: 004670f4
========================================

/* HardcoreData::Init() */

void __thiscall HardcoreData::Init(HardcoreData *this)

{
  float fVar1;
  undefined *puVar2;
  void *pvVar3;
  long lVar4;
  long lVar5;
  float fVar6;
  undefined8 local_48;
  undefined8 local_40;
  long local_38;
  
  lVar5 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_38 = lVar5;
  if ((DAT_00c68558 & 1) == 0) {
    DAT_00c68558 = 1;
    pvVar3 = operator_new__(400);
    fVar1 = DAT_009c57b4;
    lVar4 = 0;
    fVar6 = 10.0;
    *(void **)PTR_g_hard_level_00c40b28 = pvVar3;
    do {
      *(float *)((long)pvVar3 + lVar4) = fVar6;
      puVar2 = PTR_g_HardInvE_00c41d00;
      lVar4 = lVar4 + 4;
      fVar6 = fVar6 * fVar1;
    } while (lVar4 != 400);
    local_40 = 0x4370000042480000;
    Inventory::Init((Inventory *)PTR_g_HardInvE_00c41d00,4,7,1,&local_40);
    cocos2d::Ref::retain((Ref *)puVar2);
    puVar2 = PTR_g_HardInvN_00c41a58;
    local_48 = 0x4234000044090000;
    Inventory::Init((Inventory *)PTR_g_HardInvN_00c41a58,0,4,4,&local_48);
    cocos2d::Ref::retain((Ref *)puVar2);
    puVar2 = PTR_g_HardInvR_00c43f50;
    Inventory::Init((Inventory *)PTR_g_HardInvR_00c43f50,1,4,4,&local_48);
    cocos2d::Ref::retain((Ref *)puVar2);
    puVar2 = PTR_g_HardInvS_00c436e0;
    local_48 = CONCAT44(0x43b90000,(undefined4)local_48);
    Inventory::Init((Inventory *)PTR_g_HardInvS_00c436e0,2,4,1,&local_48);
    cocos2d::Ref::retain((Ref *)puVar2);
    Reset(this,true);
  }
  if (lVar5 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: Inventory::Init
###########################################################################

========================================
FUNCTION: Init
ADDRESS: 00473028
========================================

/* Inventory::Init(InvenType, int, int, cocos2d::Vec2 const&) */

void __thiscall
Inventory::Init(Inventory *this,undefined4 param_2,int param_3,int param_4,undefined8 *param_5)

{
  long lVar1;
  undefined8 uVar2;
  long lVar3;
  ulong uVar4;
  ulong uVar5;
  long lVar6;
  float fVar7;
  undefined8 local_58;
  BaseItem *local_50;
  long local_48;
  
  lVar6 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_48 = lVar6;
  uVar2 = cocos2d::SpriteBatchNode::createWithTexture(*(Texture2D **)PTR_texture_00c43478,0x1d);
  *(undefined8 *)(this + 800) = uVar2;
  (**(code **)(*(long *)this + 0x208))(this,uVar2);
  *(undefined4 *)(this + 0x328) = param_2;
  *(int *)(this + 0x32c) = param_3;
  *(int *)(this + 0x330) = param_4;
  uVar4 = (ulong)(param_4 * param_3);
  *(undefined8 *)(this + 0x334) = *param_5;
  local_50 = (BaseItem *)0x0;
  lVar3 = *(long *)(this + 0x370);
  uVar5 = lVar3 - *(long *)(this + 0x368) >> 3;
  if (uVar4 < uVar5 || uVar4 - uVar5 == 0) {
    if ((uVar4 < uVar5) && (lVar1 = *(long *)(this + 0x368) + uVar4 * 8, lVar3 != lVar1)) {
      *(ulong *)(this + 0x370) = lVar3 + (~((lVar3 + -8) - lVar1) & 0xfffffffffffffff8U);
    }
  }
  else {
    std::__ndk1::vector<BaseItem*,std::__ndk1::allocator<BaseItem*>>::__append
              ((vector<BaseItem*,std::__ndk1::allocator<BaseItem*>> *)(this + 0x368),uVar4 - uVar5,
               &local_50);
    param_3 = *(int *)(this + 0x32c);
    param_4 = *(int *)(this + 0x330);
  }
  cocos2d::Size::setSize
            ((Size *)(this + 0x344),(float)param_3 * DAT_009c48b0,(float)param_4 * DAT_009c48b0);
  fVar7 = *(float *)(this + 0x338) + DAT_009c6a08;
  *(float *)(this + 0x33c) = *(float *)(this + 0x334) + DAT_009c6a08;
  *(float *)(this + 0x340) = fVar7;
  cocos2d::Layer::init((Layer *)this);
  (**(code **)(*(long *)this + 0x98))(this,this + 0x334);
  (**(code **)(*(long *)this + 0x160))(this,PTR_ZERO_00c427b0);
  local_58 = 0x3f80000000000000;
  (**(code **)(*(long *)this + 0x148))(this,&local_58);
  Setting(this);
  if (lVar6 != local_48) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}


###########################################################################
# SEARCH TARGET: Inventory::Init
###########################################################################

========================================
FUNCTION: MakeShop
ADDRESS: 00477000
========================================

/* InventoryScene::MakeShop(int) */

void InventoryScene::MakeShop(int param_1)

{
  Inventory *this;
  BaseItem *pBVar1;
  long lVar2;
  undefined8 local_40;
  long local_38;
  
  this = (Inventory *)((ulong)(uint)param_1 + 0x510);
  lVar2 = *(long *)PTR___stack_chk_guard_00c419a0;
  local_40 = 0x4220000042200000;
  local_38 = lVar2;
  Inventory::Init(this,3,4,2,&local_40);
  pBVar1 = operator_new(0x580);
                    /* try { // try from 00477058 to 0047705f has its CatchHandler @ 00477168 */
  ShopItem::ShopItem((ShopItem *)pBVar1,0);
  Inventory::InsertItem(this,pBVar1,0);
  pBVar1 = operator_new(0x580);
                    /* try { // try from 0047707c to 00477083 has its CatchHandler @ 00477168 */
  ShopItem::ShopItem((ShopItem *)pBVar1,1);
  Inventory::InsertItem(this,pBVar1,1);
  pBVar1 = operator_new(0x580);
                    /* try { // try from 004770a0 to 004770a7 has its CatchHandler @ 00477168 */
  ShopItem::ShopItem((ShopItem *)pBVar1,2);
  Inventory::InsertItem(this,pBVar1,2);
  pBVar1 = operator_new(0x580);
                    /* try { // try from 004770c4 to 004770cb has its CatchHandler @ 00477168 */
  ShopItem::ShopItem((ShopItem *)pBVar1,3);
  Inventory::InsertItem(this,pBVar1,3);
  pBVar1 = operator_new(0x580);
                    /* try { // try from 004770e8 to 004770ef has its CatchHandler @ 00477168 */
  ShopItem::ShopItem((ShopItem *)pBVar1,4);
  Inventory::InsertItem(this,pBVar1,4);
  pBVar1 = operator_new(0x580);
                    /* try { // try from 0047710c to 00477113 has its CatchHandler @ 00477168 */
  ShopItem::ShopItem((ShopItem *)pBVar1,5);
  Inventory::InsertItem(this,pBVar1,5);
  pBVar1 = operator_new(0x580);
                    /* try { // try from 00477130 to 00477137 has its CatchHandler @ 00477168 */
  ShopItem::ShopItem((ShopItem *)pBVar1,6);
  Inventory::InsertItem(this,pBVar1,6);
  if (lVar2 != local_38) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return;
}
