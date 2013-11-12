'''
Created on Mar 6, 2013

@author: kpaskov
'''
from frontend.config import backend_url

#Interaction Links
def interaction_page_link(bioent):
    return '/locus/' + str(bioent) + '/interaction'

def interaction_overview_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/interaction_overview'
def interaction_details_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/interaction_details?callback=?'
def interaction_graph_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/interaction_graph?callback=?'
def interaction_resources_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/interaction_resources?callback=?'

#Regulation Links
def regulation_page_link(bioent):
    return '/locus/' + str(bioent) + '/regulation'

def regulation_overview_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/regulation_overview'
def regulation_details_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/regulation_details?callback=?'
def regulation_target_enrichment_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/regulation_target_enrichment?callback=?'
def regulation_graph_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/regulation_graph?callback=?'

#Protein Links
def protein_domain_details_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/protein_domain_details?callback=?'
def binding_site_details_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/binding_site_details?callback=?'

#On the fly links
def analyze_link():
    return '/analyze'
def download_reference_link():
    return '/download_citations'
def go_enrichment_link(backend_start):
    return backend_start + '/go_enrichment'
def enrichment_link():
    return '/enrichment'
def download_citations_link():
    return '/download_citations'
def download_table_link():
    return '/download_table'
def download_image_link():
    return '/download_image'

#Literature Links
def literature_page_link(bioent):
    return '/locus/' + str(bioent) + '/literature'

def literature_overview_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/literature_overview'
def literature_details_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/literature_details?callback=?'
def literature_graph_link(backend_start, bioent):
    return backend_start + '/locus/' + str(bioent) + '/literature_graph?callback=?'
    
#Bioentity links
def bioentity_overview_link(backend_start, bioent):
    return backend_start + '/locus/' + bioent + '/overview'
def tab_link(backend_start, bioent):
    return backend_start + '/locus/' + bioent + '/tabs?callback=?'

#List links
def bioent_list_link(backend_start):
    return backend_start + '/bioentity_list'
def citation_list_link(backend_start):
    return backend_start + '/reference_list'


    

