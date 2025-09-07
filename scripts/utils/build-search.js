const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

class SearchIndexBuilder {
  constructor() {
    this.contentDir = path.join(__dirname, '../../content');
    this.outputPath = path.join(__dirname, '../../docs/data/search-index.json');
    this.dbPath = path.join(__dirname, '../../database/search-index.json');
  }

  async build() {
    console.log('🔍 Building search index...');
    
    const searchIndex = [];
    
    // Process help documentation
    await this.processDirectory(
      path.join(this.contentDir, 'help'),
      'help',
      searchIndex
    );
    
    // Process ideas
    await this.processDirectory(
      path.join(this.contentDir, 'ideas'),
      'ideas',
      searchIndex
    );
    
    // Process marketplace
    await this.processDirectory(
      path.join(this.contentDir, 'marketplace'),
      'marketplace',
      searchIndex
    );
    
    // Process official docs
    await this.processDirectory(
      path.join(this.contentDir, 'official'),
      'api',
      searchIndex
    );
    
    // Ensure output directories exist
    await fs.ensureDir(path.dirname(this.outputPath));
    await fs.ensureDir(path.dirname(this.dbPath));
    
    // Save search index
    await fs.writeJson(this.outputPath, searchIndex, { spaces: 2 });
    await fs.writeJson(this.dbPath, searchIndex, { spaces: 2 });
    
    console.log(`✅ Search index built with ${searchIndex.length} documents`);
    return searchIndex.length;
  }

  async processDirectory(dirPath, category, searchIndex) {
    try {
      if (!(await fs.pathExists(dirPath))) {
        console.log(`Directory ${dirPath} does not exist, skipping...`);
        return;
      }

      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          // Recursively process subdirectories
          await this.processDirectory(itemPath, category, searchIndex);
        } else if (item.endsWith('.md') && !item.startsWith('_')) {
          await this.processMarkdownFile(itemPath, category, searchIndex);
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dirPath}:`, error.message);
    }
  }

  async processMarkdownFile(filePath, category, searchIndex) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const parsed = matter(content);
      
      // Extract text content (remove markdown)
      const textContent = parsed.content
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.+?)\*/g, '$1') // Remove italic
        .replace(/`(.+?)`/g, '$1') // Remove code
        .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();
      
      const document = {
        id: path.basename(filePath, '.md'),
        title: parsed.data.title || path.basename(filePath, '.md'),
        category: category,
        content: textContent,
        excerpt: textContent.substring(0, 300),
        url: parsed.data.url || '',
        votes: parsed.data.votes || 0,
        status: parsed.data.status || '',
        tags: this.extractTags(parsed.data, textContent),
        lastModified: parsed.data.extracted_at || new Date().toISOString()
      };
      
      searchIndex.push(document);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error.message);
    }
  }

  extractTags(frontmatter, content) {
    const tags = [];
    
    // Add category-specific tags
    if (frontmatter.category) tags.push(frontmatter.category);
    if (frontmatter.board) tags.push(frontmatter.board);
    if (frontmatter.status) tags.push(frontmatter.status);
    
    // Extract common keywords from content
    const keywords = content
      .toLowerCase()
      .match(/\b(api|webhook|integration|automation|funnel|pipeline|contact|lead|campaign|email|sms|calendar|appointment|crm|marketing|sales|reporting|analytics|custom|field|trigger|action|workflow|template|form|landing|page|domain|tracking|conversion|attribution|split|test|segment|tag|note|task|opportunity|deal|invoice|payment|subscription|membership|course|lesson|community|chat|phone|call|recording|voicemail|broadcast|sequence|follow|up|nurture|drip|autoresponder|personalization|dynamic|content|merge|variable|condition|filter|sort|search|import|export|backup|restore|sync|connect|disconnect|settings|permissions|user|role|team|agency|location|business|client|white|label|brand|custom|subdomain|ssl|certificate|security|compliance|gdpr|privacy|policy|terms|service|support|help|documentation|tutorial|guide|video|training|onboard|setup|install|configure|troubleshoot|debug|error|issue|bug|feature|request|feedback|suggestion|improvement|update|changelog|release|version|maintenance|performance|optimization|speed|loading|mobile|responsive|design|theme|customize|widget|embed|iframe|javascript|css|html|code|developer|api|key|token|authentication|authorization|oauth|single|sign|sso|multi|factor|authentication|mfa|password|reset|forgot|login|logout|register|signup|profile|account|billing|subscription|plan|upgrade|downgrade|cancel|refund|charge|credit|debit|payment|gateway|stripe|paypal|square|authorize|net|merchant|processor|bank|account|routing|number|ach|wire|transfer|check|money|order|cash|receipt|invoice|estimate|quote|proposal|contract|agreement|signature|electronic|digital|pdf|download|upload|attach|file|image|photo|picture|gallery|video|audio|recording|podcast|webinar|live|stream|zoom|meeting|conference|call|phone|number|extension|forwarding|voicemail|greeting|hold|music|caller|id|block|do|not|call|list|opt|out|unsubscribe|suppression|bounce|spam|deliverability|reputation|sender|score|authentication|spf|dkim|dmarc|mx|record|dns|domain|hosting|server|cloud|aws|google|microsoft|azure|facebook|instagram|linkedin|twitter|youtube|social|media|platform|channel|account|page|group|event|pixel|tracking|conversion|attribution|utm|parameter|campaign|source|medium|term|content|goal|objective|metric|kpi|dashboard|report|analytics|insight|data|visualization|chart|graph|table|export|import|csv|excel|pdf|email|attachment|template|design|builder|editor|drag|drop|block|element|section|row|column|text|button|image|video|form|input|field|checkbox|radio|select|dropdown|textarea|submit|action|redirect|thank|you|page|confirmation|notification|alert|popup|modal|banner|bar|sticky|floating|exit|intent|scroll|time|delay|trigger|condition|rule|logic|if|then|else|and|or|not|equal|contains|starts|ends|with|greater|less|than|between|empty|filled|clicked|visited|viewed|downloaded|purchased|subscribed|registered|logged|in|out|active|inactive|member|guest|new|returning|visitor|customer|prospect|lead|contact|user|person|individual|company|organization|business|industry|vertical|niche|market|segment|audience|target|demographic|geographic|psychographic|behavioral|interest|hobby|preference|need|want|problem|pain|point|solution|benefit|value|proposition|offer|deal|discount|coupon|promo|code|sale|special|limited|time|urgent|scarcity|social|proof|testimonial|review|rating|star|feedback|comment|reply|like|share|follow|subscribe|join|sign|up|download|learn|more|get|started|free|trial|demo|consultation|quote|estimate|proposal|contact|us|call|now|click|here|buy|purchase|order|add|cart|checkout|payment|secure|guarantee|refund|return|policy|shipping|delivery|fast|quick|easy|simple|step|guide|tutorial|how|to|what|is|why|when|where|who|best|top|most|popular|recommended|featured|new|latest|updated|improved|enhanced|better|faster|easier|cheaper|affordable|expensive|premium|pro|professional|enterprise|business|personal|individual|family|team|group|organization|agency|freelancer|consultant|coach|trainer|speaker|author|blogger|influencer|marketer|salesperson|entrepreneur|startup|small|medium|large|corporate|fortune|500|1000|local|national|international|global|worldwide|online|offline|digital|traditional|modern|classic|vintage|retro|contemporary|future|past|present|history|evolution|trend|innovation|technology|software|hardware|mobile|desktop|tablet|laptop|computer|device|app|application|platform|tool|service|solution|system|process|method|strategy|tactic|technique|approach|framework|model|theory|concept|idea|thought|opinion|belief|value|principle|rule|law|regulation|compliance|standard|best|practice|tip|trick|hack|secret|insider|expert|professional|advanced|beginner|intermediate|basic|fundamental|essential|important|critical|vital|necessary|required|optional|recommended|suggested|preferred|ideal|perfect|excellent|outstanding|exceptional|amazing|awesome|fantastic|great|good|okay|bad|terrible|awful|horrible|worst|best|better|worse|same|different|similar|unique|special|common|rare|unusual|normal|standard|custom|personalized|individual|specific|general|broad|narrow|wide|deep|shallow|high|low|big|small|large|tiny|huge|massive|enormous|gigantic|mini|micro|macro|global|local|regional|national|international|domestic|foreign|internal|external|public|private|personal|professional|business|commercial|non|profit|government|education|healthcare|finance|insurance|real|estate|retail|wholesale|manufacturing|construction|agriculture|technology|telecommunications|transportation|logistics|hospitality|entertainment|media|publishing|legal|consulting|services|products|goods|items|things|stuff|equipment|tools|supplies|materials|resources|assets|inventory|stock|warehouse|distribution|fulfillment|shipping|delivery|logistics|supply|chain|procurement|vendor|supplier|partner|client|customer|prospect|lead|contact|person|individual|human|being|entity|organization|company|business|firm|corporation|enterprise|startup|agency|team|group|department|division|unit|branch|office|location|address|city|state|country|region|area|zone|territory|market|segment|niche|industry|vertical|sector|field|domain|space|category|type|kind|sort|class|group|family|series|collection|set|bundle|package|suite|stack|framework|library|toolkit|resource|guide|manual|handbook|documentation|reference|wiki|knowledge|base|faq|help|support|assistance|service|customer|care|success|satisfaction|happiness|joy|delight|pleasure|fun|entertainment|enjoyment|experience|journey|adventure|discovery|exploration|learning|education|training|development|growth|improvement|progress|advancement|achievement|success|victory|win|triumph|accomplishment|goal|objective|target|aim|purpose|mission|vision|dream|aspiration|hope|wish|desire|want|need|requirement|demand|request|ask|question|inquiry|query|search|find|discover|explore|investigate|research|study|analyze|examine|review|evaluate|assess|measure|test|experiment|try|attempt|effort|work|labor|task|job|project|assignment|responsibility|duty|obligation|commitment|promise|agreement|contract|deal|arrangement|understanding|relationship|connection|bond|tie|link|association|partnership|collaboration|cooperation|teamwork|unity|harmony|balance|equilibrium|stability|consistency|reliability|dependability|trustworthiness|honesty|integrity|authenticity|transparency|openness|clarity|simplicity|ease|convenience|comfort|luxury|premium|quality|excellence|perfection|mastery|expertise|skill|talent|ability|capability|competence|proficiency|efficiency|effectiveness|productivity|performance|results|outcomes|benefits|advantages|pros|positives|strengths|opportunities|possibilities|potential|hope|optimism|confidence|faith|belief|trust|assurance|certainty|security|safety|protection|defense|guard|shield|barrier|wall|boundary|limit|restriction|constraint|rule|regulation|law|policy|procedure|process|system|method|approach|strategy|plan|scheme|program|project|initiative|campaign|effort|activity|action|step|move|decision|choice|option|alternative|solution|answer|response|reaction|feedback|input|output|result|outcome|consequence|effect|impact|influence|change|transformation|evolution|development|growth|progress|improvement|enhancement|upgrade|update|modification|adjustment|adaptation|customization|personalization|individualization|specialization|focus|concentration|attention|mindfulness|awareness|consciousness|realization|understanding|comprehension|knowledge|wisdom|insight|intelligence|smartness|cleverness|brilliance|genius|creativity|innovation|invention|discovery|breakthrough|revolution|disruption|transformation|change|shift|transition|movement|motion|action|activity|energy|power|force|strength|might|muscle|effort|work|labor|toil|struggle|challenge|difficulty|problem|issue|obstacle|barrier|hurdle|roadblock|bottleneck|limitation|constraint|restriction|boundary|border|edge|limit|end|finish|conclusion|completion|achievement|success|victory|win|triumph|celebration|joy|happiness|satisfaction|fulfillment|contentment|peace|calm|serenity|tranquility|relaxation|rest|break|pause|stop|halt|end|finish|complete|done|over|finished|concluded|ended|closed|shut|sealed|locked|secured|protected|safe|sound|healthy|well|good|fine|okay|alright|great|excellent|outstanding|exceptional|amazing|awesome|fantastic|wonderful|marvelous|spectacular|incredible|unbelievable|extraordinary|remarkable|impressive|stunning|breathtaking|beautiful|gorgeous|lovely|pretty|attractive|appealing|charming|delightful|pleasant|enjoyable|fun|entertaining|amusing|interesting|fascinating|captivating|engaging|compelling|persuasive|convincing|influential|powerful|strong|effective|successful|winning|victorious|triumphant|proud|confident|assured|certain|sure|positive|optimistic|hopeful|excited|enthusiastic|passionate|motivated|inspired|driven|determined|focused|committed|dedicated|devoted|loyal|faithful|true|honest|genuine|authentic|real|actual|factual|accurate|correct|right|proper|appropriate|suitable|fit|perfect|ideal|excellent|outstanding|exceptional|superior|premium|high|quality|top|notch|first|class|world|leading|cutting|edge|state|art|modern|contemporary|current|latest|newest|recent|fresh|updated|improved|enhanced|better|superior|advanced|sophisticated|complex|complicated|difficult|challenging|hard|tough|demanding|rigorous|strict|precise|exact|accurate|correct|right|proper|appropriate|suitable|perfect|ideal|excellent|outstanding|exceptional|amazing|awesome|fantastic|great|good|fine|okay|alright|decent|acceptable|satisfactory|adequate|sufficient|enough|plenty|abundant|plentiful|rich|wealthy|prosperous|successful|thriving|flourishing|growing|expanding|developing|progressing|improving|advancing|moving|forward|ahead|up|higher|better|stronger|faster|smarter|wiser|more|knowledgeable|experienced|skilled|talented|capable|competent|qualified|certified|licensed|authorized|approved|endorsed|recommended|suggested|preferred|chosen|selected|picked|handpicked|carefully|chosen|specially|selected|uniquely|designed|custom|made|tailored|personalized|individualized|customized|modified|adjusted|adapted|configured|setup|installed|implemented|deployed|launched|released|published|shared|distributed|delivered|provided|offered|given|presented|shown|displayed|exhibited|demonstrated|illustrated|explained|described|outlined|detailed|specified|defined|clarified|simplified|streamlined|optimized|enhanced|improved|upgraded|updated|modified|changed|transformed|evolved|developed|advanced|progressed|moved|forward|ahead)\b/g) || [];
    
    // Add unique keywords as tags
    const uniqueKeywords = [...new Set(keywords)].slice(0, 10);
    tags.push(...uniqueKeywords);
    
    return [...new Set(tags)]; // Remove duplicates
  }
}

// Run if called directly
if (require.main === module) {
  new SearchIndexBuilder().build()
    .then(count => {
      console.log(`✅ Built search index with ${count} documents`);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = SearchIndexBuilder;