import data from '/data/db.json'
import { Profile } from '@/js/components/mainLeft/profile';
import { Sidebar } from '@/js/components/mainLeft/sidebar';
import { create_post } from '@/js/components/mainLeft/createPost';

import { Highline } from '@/js/components/mainMiddle/highline';
import { create_post as create_simple_post } from '@/js/components/mainMiddle/createPost';
import { CardList } from '@/js/components/mainMiddle/cardList';

import { create_message } from '@/js/components/mainRight/message';
import { FriendList } from '@/js/components/mainRight/friendList';
import { RequestList } from '@/js/components/mainRight/requestList';

/* --- Navbar --- */
export const navbar = document.querySelector("nav");
export const navbar_container = navbar.querySelector(".container");
export const navbar_container_logo = navbar_container.querySelector('.logo');
export const navbar_container_searchBar = navbar_container.querySelector(".search-bar")
export const navbar_container_create = navbar_container.querySelector(".create")
export const navbar_container_create_img = navbar_container.querySelector("img")

/* --- Main --- */
export const main = document.querySelector("main");
export const main_container = main.querySelector(".container");

/* --- Main Left --- */
export const left = main_container.querySelector('.main-left');
export const left_profile = new Profile(data.profile).dom;
export const left_sidebar = new Sidebar(data.sidebar).dom;
export const left_sidebar_post = create_post()


/* --- Main Middle --- */
export const middle = main_container.querySelector('.main-middle');
export const middle_highline = new Highline(data.highline).dom;
export const middle_create_post = create_simple_post(data.profile)
export const cardList = new CardList();
export const middle_cardList = cardList.dom;


/* --- Main Right --- */
export const right = main_container.querySelector('.main-right');
export const right_message = create_message()
export const right_friendList = new FriendList(data.message).dom;
export const right_requestList = new RequestList(data.request).dom;
