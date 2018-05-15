<?php
/**
 * Dashboard plugin for Craft CMS
 *
 * Dashboard_Text Widget
 *
 * --snip--
 * Dashboard widgets allow you to display information in the Admin CP Dashboard.  Adding new types of widgets to
 * the dashboard couldn’t be easier in Craft
 *
 * https://craftcms.com/docs/plugins/widgets
 * --snip--
 *
 * @author    Designosource
 * @copyright Copyright (c) 2018 Designosource
 * @link      http://www.designosource.be
 * @package   Dashboard
 * @since     1.0.0
 */
namespace Craft;
class Dashboard_TextWidget extends BaseWidget
{
    /**
     * Returns the name of the widget name.
     *
     * @return mixed
     */
    public function getName()
    {
        return Craft::t('Welkom');
    }
    /**
     * getBodyHtml() does just what it says: it returns your widget’s body HTML. We recommend that you store the
     * actual HTML in a template, and load it via craft()->templates->render().
     *
     * @return mixed
     */
    public function getBodyHtml()
    {
        // Include our Javascript & CSS
        craft()->templates->includeCssResource('dashboard/css/widgets/Dashboard_TextWidget.css');
        craft()->templates->includeJsResource('dashboard/js/widgets/Dashboard_TextWidget.js');
        /* -- Variables to pass down to our rendered template */
        $variables = array();
        return craft()->templates->render('dashboard/widgets/Dashboard_TextWidget_Body', $variables);
    }
    /**
     * Returns how many columns the widget will span in the Admin CP
     *
     * @return int
     */
    public function getColspan()
    {
        return 1;
    }
}