/**
 * @file HamburgerMenu.js
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './HamburgerMenu.module.css'

const HamburgerMenu = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const [active, setActive] = useState(false)

  let color = 'rgb(32, 32, 32)'

  return (
    <Tag
      className={`${styles.hamburger_menu} ${
        styles[`hamburger_menu__${variant}`]
      } ${className}`}
    >
      <div
        role="button"
        aria-label="Open menu"
        aria-pressed="false"
        tabIndex="0"
        className="hamburger-menu outer-container focus:outline-none focus:shadow-none"
        onClick={() => setActive(!active)}
      >
        <div className="inner-container menu">
          <div
            className={`${
              active ? 'line-0 l0' : 'line-0-inactive l0-inactive'
            }`}
          ></div>
          <div
            className={`${
              active ? 'line-1 l1' : 'line-1-inactive l1-inactive'
            }`}
          ></div>
          <div
            className={`${
              active ? 'line-2 l2' : 'line-2-inactive l2-inactive'
            }`}
          ></div>
        </div>
      </div>
      <style jsx>{`
        *,
        *:after,
        *:before {
          box-sizing: border-box;
        }

        .outer-container {
          position: fixed;
          right: 1.3rem;
          top: 1.5rem;
          z-index: 99999;
          cursor: pointer;
          width: 4rem;
          height: 4rem;
          padding: 0.8rem;
        }

        @media (min-width: 768px) {
          .outer-container {
            top: 3rem;
            right: 3rem;
          }
        }

        .menu {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          -webkit-box-pack: justify;
          justify-content: space-between;
          width: 2.4rem;
          height: 2.4rem;
        }

        .l0-inactive {
          height: 0.3rem;
          width: 2.4rem;
          background: transparent;
          position: relative;
          transition: transform 0.2s ease 0s;
          transform-origin: 0% 50%;
        }
        .l0-inactive::before {
          content: ' ';
          display: block;
          width: 2.4rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: ${color};
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l1-inactive {
          position: relative;
          height: 0.3rem;
          width: 2.4rem;
          background: transparent;
          transition: transform 0.2s ease 0s;
          transform-origin: 0% 50%;
        }
        .l1-inactive::before {
          content: ' ';
          display: block;
          width: 1.8rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: ${color};
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }
        .l1-inactive::after {
          content: ' ';
          display: block;
          position: absolute;
          background: ${color};
          right: 0px;
          height: 0.3rem;
          width: 1.8rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l2-inactive {
          height: 0.3rem;
          width: 2.4rem;
          align-self: auto;
          background: transparent;
          position: relative;
          transition: transform 0.2s ease 0s;
          transform-origin: 100% 50%;
        }
        .l2-inactive::before {
          content: ' ';
          display: block;
          width: 1.8rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          transform-origin: 0% 50%;
          border-radius: 0.2rem;
          background: ${color};
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }
        .l2-inactive::after {
          content: ' ';
          display: block;
          position: absolute;
          background: ${color};
          right: 0px;
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        /* Active state */
        .l0 {
          height: 0.3rem;
          width: 3.4rem;
          background: transparent;
          position: relative;
          transition: transform 0.2s ease 0s;
          transform: rotate(45deg) translate(-0.1rem, -0.1rem);
          transform-origin: 0% 50%;
        }

        .l0::before {
          content: ' ';
          display: block;
          width: 1.7rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: ${color};
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l1 {
          position: relative;
          height: 0.3rem;
          width: 3.4rem;
          background: transparent;
          transform: rotate(-45deg) translate(-0.8rem, 0.8rem);
          transition: transform 0.2s ease 0s;
          transform-origin: 0% 50%;
        }

        .l1::before {
          content: ' ';
          display: block;
          width: 1.8rem;
          height: 0.3rem;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 0.2rem;
          background: ${color};
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l1::after {
          content: ' ';
          display: block;
          position: absolute;
          background: ${color};
          right: 0px;
          height: 0.3rem;
          width: 1.8rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l2 {
          height: 0.3rem;
          width: 3.4rem;
          align-self: flex-end;
          background: transparent;
          transform: rotate(45deg) translate(0.1rem, 0.1rem);
          transition: transform 0.2s ease 0s;
          transform-origin: 100% 50%;
        }

        .l2::before {
          content: '';
          display: block;
          width: 1.3rem;
          height: 0.3rem;
          position: absolute;
          left: 50%;
          top: 0px;
          transform: translate(-0.15rem, 0%);
          transform-origin: 0% 50%;
          border-radius: 0.2rem;
          background: ${color};
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .l2::after {
          content: ' ';
          display: block;
          position: absolute;
          background: ${color};
          right: 0px;
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 0.2rem;
          transition: width 0.2s ease 0s, background 0.2s ease 0s;
        }

        .menu:hover .line-2::before {
          width: 0.3rem;
        }

        .menu:hover .line-0::before,
        .menu:hover .line-1::before,
        .menu:hover .line-1::after,
        .menu:hover .line-2::after {
          width: 1.3rem;
        }

        .menu:hover .line-0-inactive::before,
        .menu:hover .line-1-inactive::before,
        .menu:hover .line-1-inactive::after,
        .menu:hover .line-2-inactive::after {
          width: 1.8rem;
        }

        .menu:hover .line-2::before {
          width: 0.3rem;
        }
      `}</style>
    </Tag>
  )
}

HamburgerMenu.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

HamburgerMenu.defaultProps = {
  tagName: 'div',
  className: 'fixed z-10 transform scale-75 absolute top-0 right-0 pr-20',
  variant: 'default',
  children: '',
}

export default HamburgerMenu
