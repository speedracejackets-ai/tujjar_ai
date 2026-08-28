import { FooterCopyright, Section } from 'astro-boilerplate-components';

import { AppConfig } from '@/utils/AppConfig';

const Footer = () => (
  <Section>
    <FooterCopyright site_name={AppConfig.site_name} />
    <p className="text-sm">
      All rights reserved by <a target="_blank" rel="noopener noreferrer" className=' font-semibold' href="https://github.com/ixartz">Ixartz</a> • Distributed by <a target="_blank" rel="noopener noreferrer" className='hover:text-green-600 transition-colors duration-200 font-semibold' href="https://themewagon.com">ThemeWagon</a>
    </p>
  </Section>
);

export { Footer };
