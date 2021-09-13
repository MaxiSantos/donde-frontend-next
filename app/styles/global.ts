import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'FontAwesome';
    src: url('/fonts/fontawesome-webfont.eot?v=4.6.3');
    src: url('/fonts/fontawesome-webfont.eot?#iefix&v=4.6.3') format('embedded-opentype'), url('/fonts/fontawesome-webfont.woff2?v=4.6.3') format('woff2'), url('/fonts/fontawesome-webfont.woff?v=4.6.3') format('woff'), url('/fonts/fontawesome-webfont.ttf?v=4.6.3') format('truetype'), url('/fonts/fontawesome-webfont.svg?v=4.6.3#fontawesomeregular') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  input,
  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="number"],
  textarea,
  select {
    height: 51px;
    line-height: 51px;
    padding: 0 20px;
    outline: none;
    font-size: 15px;
    color: #808080;
    margin: 0 0 16px 0;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    display: block;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.06);
    font-weight: 500;
    opacity: 1;
    border-radius: 3px;
  }

  input:-webkit-autofill:focus,
  input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #fff inset !important;
      -webkit-text-fill-color: #808080 !important;
  }

  select {
    padding: 15px 18px;
    cursor: pointer;
  }

  input {
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }

  input:focus,
  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="email"]:focus,
  input[type="number"]:focus,
  textarea:focus {
    color: #808080;
    transition: box-shadow 0.2s !important;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.07);
    border: 1px solid #d8d8d8;
    opacity: 1;
  }

  input[type="submit"] {
    border: none;
    padding: 11px 18px;
    width: auto;
  }

  input[type="checkbox"] { display: inline; }

  input[type="radio"] {
    width: 15px;
    height: 15px;
    cursor: pointer;
    box-shadow: none;
  }

  /* Input Placeholder Color */
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #888;
    opacity: 1;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #888;
    opacity: 1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #888;
    opacity: 1;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #888;
    opacity: 1;
  }

  textarea {
    height: auto;
    line-height: 27px;
    padding: 20px;
    min-height: 130px;
    transition: none !important;
    min-width: 100%;
  }

  label,
  legend {
    display: block;
    font-weight: bold;
    font-size: 15px;
    font-weight: normal;
    margin-bottom: 8px;
  }


  label span,
  legend span {
    font-weight: normal;
    font-size: 14px;
    color: #444;
  }

  fieldset {
      padding: 0;
      border: none;
  }


  a, button { outline: none !important; }
  a:focus,
  a:hover { text-decoration: none; color: #333;}
  img { max-width: 100%; }

  button.button,
input[type="button"],
input[type="submit"],
a.button.border,
a.button {
	background-color: #66676b;
	top: 0;
	padding: 9px 20px;
	color: #fff;
	position: relative;
	font-size: 15px;
	font-weight: 600;
	display: inline-block;
	transition: all 0.2s ease-in-out;
	cursor: pointer;
	margin-right: 6px;
	overflow: hidden;
	border: none;
	border-radius: 50px;
}


input[type="button"],
input[type="submit"] {
	line-height: 32px;
}

button.button:before,
a.button:before {
	width: 100%;
	height: 100%;
	content: "";
	display: block;
	background-color: #fff;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
	transition: all 0.2s;
}


button.button:hover:before,
a.button:hover:before {
	opacity: 0.1;
}

a.button.white {
	background-color: #fff;
	color: #333;
}

button.button { line-height: 26px; }

/* Border Button Style */
a.button.border:before { display: none; }

a.button.border {
	background-color: transparent;
	color: #66676b;
	border: 1px solid #66676b;
	padding: 9px 21px;
}

a.button.border:hover {
	background-color: #66676b;
	color: #fff;
	opacity: 1;
}

a.button.border.white {
	border-color: #fff;
	color: #fff;
}

a.button.border.white:hover {
	background-color: #fff;
	color: #66676b;
}

/* Full Width Button */
button.button.fullwidth,
a.button.fullwidth {
	width: 100%;
	text-align: center;
}

a.button.white.border:hover { color: #333; }

.button i { padding-right: 4px; }

.centered-content { text-align: center; }
.centered-content .button { min-width: 130px;  }

a.button.border { font-weight:500; }


/* Icon Box #2
------------------------------------- */
.icon-box-2 {
	text-align: center;
	margin-top: 45px;
	position: relative;
}

.icon-box-2 i {
	width: 120px;
	height: 80px;
	background-color: #fff;
	border-radius: 50%;
	line-height: 80px;
	font-size: 60px;
	display: inline-block;
	margin-bottom: 10px;
	text-align: center;
	overflow: hidden;
	color: #66676b;
	position: relative;
	z-index: 11;
}

.icon-box-2 span {
	color: #666;
	text-transform: uppercase;
	font-size: 14px;
	font-weight: 500;
}

.icon-box-2 h4 {
	margin: 4px 0;
	line-height: 26px;
}

.icon-box-2 h3 {
	margin: 4px 0;
	line-height: 26px;
	font-size: 19px;
	font-weight: 500;
}

.icon-box-2 p {
	margin-top: 15px;
	font-size: 16px;
	margin-bottom: 20px
}

section.fullwidth .icon-box-2 p {
	margin-bottom: 0px;
}

.icon-box-2.with-line:before {
	content: "";
	height: 1px;
	width: 100%;
	position: absolute;
	left: 50%;
	top: 40px;
	background: #e9e9e9;
	display: block;
	z-index: 9;
}


section.fullwidth .icon-box-2 {
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.07);
    padding: 40px;
    background: #fff;
    border-radius: 4px;
    transition: 0.4s;
    cursor: default;
    margin: 20px 0;
}

section.fullwidth .icon-box-2.with-line:before { display: none; }

section.fullwidth .icon-box-2 i {
    background-color: rgba(102, 103, 107, 0.07);
    width: 90px;
    height: 90px;
    line-height: 90px;
    font-size: 38px;
}

section.fullwidth .icon-box-2:hover {
    transform: translateY(-8px);
}


/* Icon Box #3
------------------------------------- */
.icon-box-3 {
	text-align: left;
	padding-left: 90px;
	position: relative;
	width: 100%;
	display: inline-block;
	margin: 20px 0;
}

/* Edge Icon Box */
.icon-box-3 h4 {
	font-size: 18px;
	font-weight: 600;
}

.icon-box-3 i {
	font-size: 54px;
	color: #333;
	height: 60px;
	margin: 10px 0;
	display: inline-block;
	height: 100%;
	position: absolute;
	left: 0;
}

.icon-box-3 p {
	color: rgba(51,51,51,0.7);
	margin-top: 3px;
	display: inline-block;
}


/* Rounded */
.icon-box-1.rounded i,
.icon-box-2.rounded i,
.icon-box-3.rounded i {
	width: 110px;
	height: 110px;
	background-color: #666;
	border-radius: 50%;
	color: #fff;
	line-height: 110px;
	font-size: 50px;
	display: inline-block;
	margin-bottom: 20px;
	text-align: center;
	overflow: hidden;
}

.rounded i:before {
	position: relative;
	z-index: 11;
}



/* Background Animation */
.icon-box-1.rounded i,
.icon-box-2.rounded i,
.icon-box-3.rounded i{
	transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
	transform: translate3d(0,0,0) rotate(0);
}

body .icon-box-1.rounded:hover i,
body .icon-box-2.rounded:hover i,
body .icon-box-3.rounded:hover i {
	color: #fff;
}


/* Icon Box Shadow Animation*/
.icon-box-1.rounded i:after,
.icon-box-2.rounded i:after,
.icon-box-3.rounded i:after {
	content: "";
	width: 120%;
	height: 0px;
	display: inline-block;
	position: absolute;
	top: 0;
	right: 0;
	background-color: #fff;
	z-index: 8;
	transition: height 0.3s ease-in-out, opacity 0.3s ease-out;
	opacity: 0;
	transform: translate3d(50%,-50%,0) scale(1) rotate(45deg);
}

.icon-box-1.rounded:hover i:after,
.icon-box-2.rounded:hover i:after,
.icon-box-3.rounded:hover i:after { height: 145%; opacity: 0.1; }


/* Dark and Light Icon Box Styles */
.icon-box-1.rounded.dark i,
.icon-box-2.rounded.dark i,
.icon-box-3.rounded.dark i{
	background-color: #222;
}

.icon-box-1.rounded.light i,
.icon-box-2.rounded.light i,
.icon-box-3.rounded.light i{
	color: #333;
	background-color: #f2f2f2;
}

.icon-box-3.rounded {
	padding-left: 120px;
}

.icon-box-3.rounded i {
	width: 90px;
	height: 90px;
	font-size: 40px;
	line-height: 90px;
}

/* White colors */
body .white-text {color: #fff; }

.white-text .icon-box-1 p,
.white-text .icon-box-2 p,
.white-text .icon-box-3 p,
.white-text .icon-box-4 p { color: rgba(255,255,255,0.85); }

.white-text h1,
.white-text h2,
.white-text h3,
.white-text h4,
.white-text h5,
.white-text .icon-box-1 h4,
.white-text .icon-box-2 h4,
.white-text .icon-box-3 h4,
.white-text .icon-box-4 h4,
.white-text .icon-box-1 i,
.white-text .icon-box-2 i,
.white-text .icon-box-3 i,
.white-text .icon-box-4 i { color: #fff; }


@media (max-width: 1659px) {
	.icon-box-3.rounded { padding-left: 110px; }

	.icon-box-3.rounded i {
		width: 80px;
		height: 80px;
		font-size: 38px;
		line-height: 80px;
	}
}

`;
