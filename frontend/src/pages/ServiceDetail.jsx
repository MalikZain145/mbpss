import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Phone, ArrowRight, Clock, Shield, MessageSquare } from 'lucide-react';
import './ServiceDetail.css';

const serviceData = {
  'epc-residential': {
    title:'EPC — Residential', subtitle:'Energy Performance Certificate for Residential Properties',
    duration:'1-2 hours', validity:'10 years',
    description:'An Energy Performance Certificate (EPC) is a legal requirement whenever a residential property is built, sold, or rented. It rates the energy efficiency from A (most efficient) to G (least efficient) and provides improvement recommendations.',
    features:['Full energy efficiency assessment','A–G energy rating with environmental impact rating','Estimated energy bills and savings','Improvement recommendations with projected costs','Registered on the national EPC register','Certificate issued same day'],
    legal:'All properties must have a valid EPC before being marketed for sale or let. Landlords must achieve a minimum EPC rating of E under the Minimum Energy Efficiency Standards (MEES).',
    faq:[
      { q:'When do I need an EPC?', a:'You need an EPC when selling or renting a property, when a new building is constructed, or when significant modifications are made.' },
      { q:'How long does the assessment take?', a:'Most residential assessments take 45 minutes to 2 hours depending on the size of the property.' },
    ]
  },
  'epc-commercial': {
    title:'EPC — Commercial', subtitle:'Energy Performance Certificate for Commercial Buildings',
    duration:'2-4 hours', validity:'10 years',
    description:'A Commercial EPC is required for all non-domestic buildings when sold, let or constructed. It assesses energy performance and is essential for compliance with MEES regulations for commercial landlords.',
    features:['Non-domestic energy assessment by accredited assessor','A–G energy rating for the building','Improvement recommendations with costs','Registered on the national EPC register','Full compliance with MEES regulations','Certificate issued promptly'],
    legal:'Commercial landlords must ensure their properties meet minimum energy efficiency standards. Since 2023, commercial properties must have a minimum EPC rating of E to be legally let.',
    faq:[{ q:'Do commercial properties need an EPC?', a:'Yes. All commercial properties need a valid EPC when sold, let, or constructed — with some limited exemptions for listed buildings.' }]
  },
  'floorplan': {
    title:'Floorplan (2D & 3D)', subtitle:'Professional Floorplans for Property Listings & Marketing',
    duration:'1-2 hours', validity:'Permanent',
    description:'Our professional floorplan service produces accurate 2D and 3D floorplans for residential and commercial properties. Used by estate agents, landlords, developers and architects for listings, planning applications and marketing materials.',
    features:['Accurate measurements of every room','2D schematic floorplan with room dimensions','3D rendered floorplan available','Delivered digitally within 24 hours','Suitable for Rightmove, Zoopla and OnTheMarket','Available for residential, commercial and new build'],
    legal:'Floorplans are increasingly expected in property listings and can significantly increase buyer and tenant enquiries. They are required by some local authorities for planning submissions.',
    faq:[
      { q:'What is the difference between 2D and 3D floorplans?', a:'A 2D floorplan is a top-down schematic view with dimensions. A 3D floorplan shows the same layout in a rendered perspective view, giving a more realistic impression of the space.' },
    ]
  },
  'inventory': {
    title:'Inventory Report', subtitle:'Detailed Check-In and Check-Out Reports',
    duration:'2-3 hours', validity:'Per tenancy',
    description:'Our comprehensive inventory reports document the full condition and contents of a property at the start and end of each tenancy. Timestamped photographs and detailed written descriptions protect both landlords and tenants in any deposit dispute.',
    features:['Full room-by-room written condition report','Timestamped photographs of every room and item','Check-in and check-out reports available','Schedule of condition for fixtures and fittings','Accepted by all major deposit protection schemes','Delivered digitally within 24 hours'],
    legal:'A professional inventory report is the best defence against deposit disputes. Without one, landlords may be unable to make deductions from the deposit through a deposit protection scheme.',
    faq:[{ q:'When should I get an inventory done?', a:'The check-in inventory should be done before or on the day of tenancy start. The check-out should be done after the tenant vacates but before the property is cleaned.' }]
  },
  'legionella': {
    title:'Legionella Risk Assessment', subtitle:'Protect Tenants and Meet Your Legal Obligations',
    duration:'1-2 hours', validity:'Annual review recommended',
    description:'Landlords have a legal duty under the Health and Safety at Work Act 1974 to assess the risk of Legionella bacteria in their rental properties. Our qualified assessors carry out a thorough inspection of all water systems and provide a written risk assessment.',
    features:['Full inspection of all water systems and outlets','Written risk assessment report','Identification of risk areas and control measures','Recommendations for remedial action','Suitable for single lets and HMOs','Annual review reminder service'],
    legal:'HSE ACOP L8 and HSG274 place a legal duty on landlords to manage Legionella risk. Failure to comply can result in prosecution and significant penalties.',
    faq:[{ q:'Does every landlord need a Legionella assessment?', a:'Yes. All landlords with residential rental properties are legally required to carry out a Legionella risk assessment under the Health and Safety at Work Act 1974.' }]
  },
  'pat-testing': {
    title:'PAT Testing', subtitle:'Portable Appliance Testing for Residential & Commercial Properties',
    duration:'1-3 hours', validity:'Annual recommended',
    description:'PAT (Portable Appliance Testing) involves visual inspection and electronic testing of portable electrical appliances to ensure they are safe to use. Essential for landlords, offices and commercial premises.',
    features:['Visual inspection of all appliances and leads','Electronic pass/fail testing','Appliance labelling with test date','Full written report with pass/fail results','Certificate of testing','Suitable for all property types'],
    legal:'While PAT testing is not explicitly required by law, landlords have a duty under the Landlords and Tenants Act 1985 and the Electrical Equipment (Safety) Regulations 1994 to ensure all electrical equipment supplied is safe.',
    faq:[{ q:'How often should PAT testing be done?', a:'Most landlords carry out PAT testing annually. The HSE recommends the frequency depends on the risk environment — annually for rental properties is standard practice.' }]
  },
  'fire-risk': {
    title:'Fire Risk Assessment', subtitle:'Statutory Fire Risk Assessment & Action Plan',
    duration:'2-3 hours', validity:'Annual review recommended',
    description:'A Fire Risk Assessment is a legal requirement for all non-domestic premises and HMO properties. Our qualified assessors identify fire hazards, evaluate risks and provide a prioritised action plan.',
    features:['Comprehensive survey of premises','Identification of all fire hazards and risks','Assessment of existing fire safety measures','Prioritised written action plan','Full written report within 48 hours','Suitable for residential HMOs and all commercial premises'],
    legal:'Under the Regulatory Reform (Fire Safety) Order 2005, all non-domestic premises and HMOs must have a written fire risk assessment carried out by a competent person.',
    faq:[{ q:'Who needs a fire risk assessment?', a:'All employers, owners and occupiers of non-domestic premises, plus landlords of HMOs with five or more occupants, must have a written fire risk assessment.' }]
  },
  'sap-epc': {
    title:'SAP EPC (New & Converted Build)', subtitle:'Standard Assessment Procedure Energy Calculations',
    duration:'Desk-based', validity:'On completion',
    description:'A SAP EPC is required for all newly built homes and converted properties as part of Building Regulations compliance (Part L). Our accredited SAP assessors provide calculations at design stage and on completion.',
    features:['Design-stage SAP calculations','Predicted Energy Assessment (PEA)','On-completion EPC issued','Full compliance with Part L Building Regulations','Suitable for new build and conversion projects','Fast turnaround for developers'],
    legal:'All new build and converted residential properties require a SAP EPC under Part L of the Building Regulations. The EPC must be lodged on the national register before occupation.',
    faq:[{ q:'What is the difference between a SAP EPC and a standard EPC?', a:'A standard EPC is for existing properties. A SAP EPC uses the Standard Assessment Procedure and is calculated at design stage for new builds and conversions.' }]
  },
  'water-calculations': {
    title:'Water Calculations (Part G)', subtitle:'Water Usage Calculations for New & Converted Build',
    duration:'Desk-based', validity:'On completion',
    description:'Part G of the Building Regulations requires new build and converted properties to demonstrate that water consumption does not exceed 125 litres per person per day (or 110 litres in some areas). Our calculations ensure full compliance.',
    features:['Full Part G water efficiency calculations','Compliance with Building Regulations Part G','Suitable for new build and conversion projects','Fast desk-based turnaround','Certificate provided for Building Control','Available for all sizes of development'],
    legal:'Part G Water Efficiency requirements apply to all new dwellings and are required as part of the Building Regulations sign-off process.',
    faq:[{ q:'Do I need water calculations for a conversion?', a:'Yes. Water calculations are required for both new build and converted residential properties as part of Building Regulations compliance.' }]
  },
  'hmo-licence': {
    title:'HMO / Additional / Selective Licence', subtitle:'Licence Application Support for Landlords',
    duration:'Varies', validity:'5 years (typical)',
    description:'We assist landlords with the full HMO licensing process — from initial assessment of whether a licence is needed, through preparing and submitting the application, to ensuring full compliance with local authority requirements.',
    features:['Assessment of licensing requirement','Mandatory, additional and selective licence support','Full application preparation and submission','Compliance guidance and documentation','Liaison with local authority on your behalf','HMO management plan preparation if required'],
    legal:'Landlords operating an HMO with 5 or more occupants forming 2 or more households over 3 storeys must hold a mandatory HMO licence. Additional and selective licensing schemes vary by local authority.',
    faq:[
      { q:'What is the difference between mandatory, additional and selective licensing?', a:'Mandatory licensing applies to large HMOs nationally. Additional licensing is imposed by councils on smaller HMOs. Selective licensing can apply to all rental properties in a designated area.' },
    ]
  },
  'eviction': {
    title:'Eviction Support', subtitle:'Professional Eviction Support for Landlords',
    duration:'Varies', validity:'Per case',
    description:'Our eviction support service helps landlords navigate the complex process of recovering possession of their property. We prepare Section 8 and Section 21 notices, advise on the correct grounds for eviction, and provide documentation to support court proceedings.',
    features:['Assessment of grounds for eviction','Section 8 notice preparation','Section 21 notice preparation','Guidance through the possession process','Documentation for court proceedings','Advice on rent arrears and tenant disputes'],
    legal:'Landlords must follow the correct legal process to evict a tenant. Serving an incorrect notice or failing to follow proper procedure can invalidate the eviction and expose landlords to legal liability.',
    faq:[
      { q:'What is the difference between a Section 8 and Section 21 notice?', a:'A Section 21 is a no-fault eviction notice requiring 2 months notice. A Section 8 is served where the tenant has breached the tenancy agreement, such as rent arrears.' },
    ]
  },
};

const defaultService = {
  title:'Property Service', subtitle:'Professional Property Services',
  duration:'Varies', validity:'Varies',
  description:'MBPSS provides professional property services across London and the UK. Contact us to discuss your specific requirements.',
  features:['Qualified and accredited professionals','Fast turnaround times','Competitive fixed pricing','Full compliance with UK legislation','Excellent customer support'],
  legal:'All our services comply with current UK legislation.',
  faq:[]
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceData[slug] || {
    ...defaultService,
    title: slug?.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ') || 'Service'
  };

  return (
    <div className="service-detail-page">
      <section className="page-hero">
        <div className="page-hero-bg"/>
        <div className="container page-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/services">Services</Link><span>/</span>
            <span>{service.title}</span>
          </div>
          <h1 className="page-title" style={{marginTop:'12px'}}>{service.title}</h1>
          <p>{service.subtitle}</p>
        </div>
      </section>

      <section className="sd-body">
        <div className="container sd-inner">
          <div className="sd-main">
            <div className="sd-meta-bar">
              <div className="sd-meta-item"><Clock size={18}/>  <div><span>Duration</span><strong>{service.duration}</strong></div></div>
              <div className="sd-meta-item"><Shield size={18}/> <div><span>Validity</span><strong>{service.validity}</strong></div></div>
              <div className="sd-meta-item"><MessageSquare size={18}/> <div><span>Pricing</span><strong>Contact for a Quote</strong></div></div>
            </div>
            <h2>Overview</h2>
            <p className="sd-desc">{service.description}</p>
            <h2>What's Included</h2>
            <ul className="sd-features">
              {service.features.map((f,i)=>(
                <li key={i}><Check size={18}/><span>{f}</span></li>
              ))}
            </ul>
            <div className="sd-legal">
              <Shield size={18}/>
              <div><strong>Legal Requirements</strong><p>{service.legal}</p></div>
            </div>
            {service.faq.length>0 && (
              <>
                <h2>FAQs</h2>
                <div className="sd-faq">
                  {service.faq.map((f,i)=>(
                    <div key={i} className="sd-faq-item"><h4>{f.q}</h4><p>{f.a}</p></div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="sd-sidebar">
            <div className="sd-cta-card">
              <h3>Book This Service</h3>
              <div className="sd-price-display">
                <span>Pricing</span>
                <strong>Contact for a Quote</strong>
              </div>
              <Link to={`/quote?service=${encodeURIComponent(service.title)}`} className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                Book & Pay Online <ArrowRight size={16}/>
              </Link>
              <a href="tel:+447540387542" className="btn-outline" style={{width:'100%',justifyContent:'center',marginTop:'10px'}}>
                <Phone size={16}/> +44 7540 387542
              </a>
              <div className="sd-guarantees">
                {['Fixed pricing — no hidden fees','Fast turnaround','Fully accredited assessors','100% compliance guaranteed'].map((g,i)=>(
                  <div key={i} className="sd-guarantee"><Check size={14}/><span>{g}</span></div>
                ))}
              </div>
            </div>
            <div className="sd-related">
              <h4>You May Also Need</h4>
              <Link to="/services/epc-residential" className="related-link">EPC (Residential) <ArrowRight size={14}/></Link>
              <Link to="/services/floorplan"       className="related-link">Floorplan (2D & 3D) <ArrowRight size={14}/></Link>
              <Link to="/services/inventory"       className="related-link">Inventory Report <ArrowRight size={14}/></Link>
              <Link to="/services/fire-risk"       className="related-link">Fire Risk Assessment <ArrowRight size={14}/></Link>
              <Link to="/services/legionella"      className="related-link">Legionella Risk Assessment <ArrowRight size={14}/></Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
