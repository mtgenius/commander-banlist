import React from 'react';
import { GitHubIcon } from '..';
import styled from 'styled-components';

const Copyright = styled.div`
  line-height: 2em;
  padding-top: 0.75em;
  text-align: center;
`;

const Link = styled.a`
  color: #f0f0f0;
  text-decoration: underline;
  margin-left: 0.333em;
`;

export default function Footer(): JSX.Element {
  return (
    <Copyright>
      <section>
        &copy; 2018-{new Date().getFullYear()}
        <Link
          href="https://charlesstover.com/"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="Charles Stover's portfolio"
        >
          Charles Stover
        </Link>
        ,
        <Link
          href="https://mtgeni.us/"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="MTGeni.us"
        >
          MTGeni.us
        </Link>
      </section>
      <section>
        <GitHubIcon />
        <Link
          href="https://github.com/mtgenius/commander-banlist"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="Commander Banlist on GitHub"
        >
          Commander Banlist
        </Link>
        ,
        <Link
          href="https://github.com/mtgenius/commander-banlist-api"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="Commander Banlist API on GitHub"
        >
          Commander Banlist API
        </Link>
      </section>
    </Copyright>
  );
}
