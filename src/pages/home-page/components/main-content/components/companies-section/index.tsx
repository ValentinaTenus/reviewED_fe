import { Company } from '~/common/types/index';

import { ItemsContainer, ItemsContentWrapperSection, ItemsHeader } from '../index';
import { CompanyCard } from './components/index';

import styles from './styles.module.scss';

type CompaniesSectionProperties = {
  companies: Company[];
  screenWidth: number;
};

const CompaniesSection: React.FC<CompaniesSectionProperties> = ({
  companies,screenWidth
}) => {

  return (
    <ItemsContainer >
      <ItemsHeader header='TOP Компанії' screenWidth={screenWidth}/>
      <ItemsContentWrapperSection className={styles['items_section']}>
        {companies.map((company) => (
          <CompanyCard company={company} key={company.id}/>
        ))}
      </ItemsContentWrapperSection>
    </ItemsContainer>
  )
};

export { CompaniesSection };