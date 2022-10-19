import { mut } from '@/cms/mut';
import { STemplates_Props, ST_PageAsideMenu } from '@/cms/page-sections';
import {
  AsideMenu,
  AsideMenuContent,
} from '@/components/ui/aside-menu/aside-menu';
import { MarkdownContent } from '@/components/ui/react-markdown/MarkdownContent';
import { useSharedData } from '@/store';
import { useEffect } from 'react';
import { HasPlansPricing } from '../pricing/HasPlansPricing';

export function ST_PageAsideMenusFC({
  items,
}: STemplates_Props<ST_PageAsideMenu>) {
  const { locale } = useSharedData();

  return (
    <AsideMenu>
      {items.map((aside, i) => {
        const { translations, id, plan_pricing, plan_pricing_contents } = mut(
          aside.item,
          locale
        );
        return (
          <AsideMenuContent
            key={id}
            menuTitle={translations?.menu_name || 'Menu-' + i}
            title={translations?.title}
          >
            <div className='markdown__content mb-5'>
              <MarkdownContent>
                {translations?.markdown_content || ''}
              </MarkdownContent>
            </div>

            <HasPlansPricing
              plan_pricing={plan_pricing}
              contents={plan_pricing_contents}
            />
          </AsideMenuContent>
        );
      })}
    </AsideMenu>
  );
}
